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
          sha: file.sha,
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
      { error: "Author, title, and content are required" },
      { status: 400 }
    );
  }

  let filename = slugify(title, { lower: true, strict: true });
  const filePath = `${filename}.md`;

  const fileContent = matter.stringify(content, {
    author,
    title,
    banner,
    thumbnail,
    createdAt,
  });

  const fileContentEncoded = Buffer.from(fileContent).toString("base64");

  try {
    await axios.put(
      `${GITHUB_API_URL}/${filePath}`,
      {
        message: `Create ${filename}.md`,
        content: fileContentEncoded,
      },
      { headers }
    );
    return NextResponse.json({ message: "File created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create markdown file" },
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
  const updatedAt = new Date().toISOString();
  const { author, title, content, banner, thumbnail, sha } =
    await request.json();
  if (!author || !title || !content || !sha) {
    return NextResponse.json(
      { error: "Author, title, content, and sha are required" },
      { status: 400 }
    );
  }

  let filename = slugify(title, { lower: true, strict: true });
  const filePath = `${filename}.md`;

  const fileContent = matter.stringify(content, {
    author,
    title,
    banner,
    thumbnail,
    updatedAt,
  });

  const fileContentEncoded = Buffer.from(fileContent).toString("base64");

  try {
    await axios.put(
      `${GITHUB_API_URL}/${filePath}`,
      {
        message: `Update ${filename}.md`,
        content: fileContentEncoded,
        sha,
      },
      { headers }
    );
    return NextResponse.json({ message: "File updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update markdown file" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  const { filename, sha } = await request.json();
  if (!filename || !sha) {
    return NextResponse.json(
      { error: "Filename and SHA are required" },
      { status: 400 }
    );
  }

  try {
    await axios.delete(`${GITHUB_API_URL}/${filename}`, {
      headers,
      data: {
        message: `Delete ${filename}`,
        sha,
      },
    });
    return NextResponse.json({ message: "File deleted" }, { status: 200 });
  } catch (error) {
    console.error("Failed to delete markdown file:", error);
    return NextResponse.json(
      { error: "Failed to delete markdown file" },
      { status: 500 }
    );
  }
}
