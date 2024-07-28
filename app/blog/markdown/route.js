import { NextResponse } from "next/server";
import path from "path";
import matter from "gray-matter";
import slugify from "slugify";
import axios from "axios";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO;
const GITHUB_OWNER = process.env.GITHUB_OWNER;
const GITHUB_API_URL = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents`;

const headers = {
  Authorization: `token ${GITHUB_TOKEN}`,
  Accept: "application/vnd.github.v3+json",
};
export async function GET() {
  try {
    const response = await axios.get(GITHUB_API_URL, { headers });

    const files = await Promise.all(
      response.data.map(async (file) => {
        const fileResponse = await axios.get(file.download_url);
        const { data } = matter(fileResponse.data);
        return {
          filename: file.name,
          path: file.path,
          thumbnail: data.thumbnail || "",
        };
      })
    );
    return NextResponse.json(files, { status: 200 });
  } catch (error) {
    console.error(
      "Failed to fetch files",
      error.response ? error.response.data : error.message
    );

    return NextResponse.json(
      { error: "Failed to fetch files" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  const createdAt = new Date().toISOString();
  const { author, title, content, banner, thumbnail } = await request.json();
  if (!author || !title || !content) {
    return NextResponse.json(
      { error: "Filename, author, title, and content are required" },
      { status: 400 }
    );
  }
  let filename = slugify(title, { lower: true, strict: true });
  let minicontent =
    content.substring(0, 100).replace(/[^a-zA-Z0-9 ]/g, "") + "...";
  const filePath = path.join(markdownDir, `${filename}.md`);
  const fileContent = matter.stringify(content, {
    author,
    title,
    banner,
    thumbnail,
    createdAt,
    minicontent,
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
