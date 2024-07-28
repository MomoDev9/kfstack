import { NextResponse } from "next/server";
import axios from "axios";
import matter from "gray-matter";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO;
const GITHUB_OWNER = process.env.GITHUB_OWNER;
const GITHUB_API_URL = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents`;

const headers = {
  Authorization: `token ${GITHUB_TOKEN}`,
  Accept: "application/vnd.github.v3+json",
};

export async function GET(request, { params }) {
  const { filename } = params;

  if (!filename) {
    return NextResponse.json(
      { error: "Filename is required" },
      { status: 400 }
    );
  }

  try {
    const fileUrl = `${GITHUB_API_URL}/${filename}.md?ref=main`;
    const response = await axios.get(fileUrl, { headers });
    const fileContent = Buffer.from(response.data.content, "base64").toString(
      "utf8"
    );
    const { data, content } = matter(fileContent);

    return NextResponse.json({ data, content }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch file content" },
      { status: 500 }
    );
  }
}
