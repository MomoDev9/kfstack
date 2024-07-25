import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const markdownDir = path.join(process.cwd(), "markdowns");

export async function GET(request, { params }) {
  const { filename } = params;
  const filePath = path.join(markdownDir, `${filename}.md`);

  try {
    const content = fs.readFileSync(filePath, "utf8");
    return NextResponse.json({ content }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}

export async function PUT(request, { params }) {
  const { filename } = params;
  const { author, title, subtitle, content, banner, thumbnail } =
    await request.json();
  const filePath = path.join(markdownDir, `${filename}.md`);

  if (!content) {
    return NextResponse.json({ error: "Content is required" }, { status: 400 });
  }

  if (fs.existsSync(filePath)) {
    const fileContent = matter.stringify(content, {
      author,
      title,
      subtitle,
      banner,
      thumbnail,
    });
    try {
      fs.writeFileSync(filePath, fileContent);
      return NextResponse.json({ message: "File updated" }, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to update markdown file" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
