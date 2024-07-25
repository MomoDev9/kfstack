import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const markdownDir = path.join(process.cwd(), "markdowns");

export async function GET() {
  try {
    const files = fs.readdirSync(markdownDir).map((file) => {
      const filePath = path.join(markdownDir, file);
      const content = fs.readFileSync(filePath, "utf8");
      const { data } = matter(content);
      return {
        filename: file,
        ...data,
      };
    });
    return NextResponse.json(files, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to read markdown files" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  const createdAt = new Date().toISOString();
  const { filename, author, title, subtitle, content, banner, thumbnail } =
    await request.json();
  if (!filename || !author || !title || !content) {
    return NextResponse.json(
      { error: "Filename, author, title, and content are required" },
      { status: 400 }
    );
  }
  const filePath = path.join(markdownDir, `${filename}.md`);
  const fileContent = matter.stringify(content, {
    author,
    title,
    subtitle,
    banner,
    thumbnail,
    createdAt,
  });
  try {
    fs.writeFileSync(filePath, fileContent);
    return NextResponse.json({ message: "File created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create markdown file" },
      { status: 500 }
    );
  }
}
