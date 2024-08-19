import axios from "axios";
import { NextResponse } from "next/server";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER;
const GITHUB_API_URL = `https://api.github.com/repos/${GITHUB_OWNER}/todo/contents/default.json`;
const headers = {
  Authorization: `token ${GITHUB_TOKEN}`,
  Accept: "application/vnd.github.object+json",
};
// const headersPOST = {
//   Authorization: `token ${GITHUB_TOKEN}`,
//   Accept: "application/vnd.github.v3+json",
// };

export async function GET() {
  try {
    const res = await axios.get(GITHUB_API_URL, { headers });

    const base64Content = res.data.content;
    const getContent = Buffer.from(base64Content, "base64").toString("utf-8");

    const items = JSON.parse(getContent);

    return NextResponse.json(items, { status: 200 });
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

export async function POST(req) {
  try {
    const newTodo = await req.json();

    const response = await axios.get(GITHUB_API_URL, { headers });
    console.log("res", response.data.sha);
    const fileContent = Buffer.from(response.data.content, "base64").toString(
      "utf-8"
    );
    console.log(fileContent);
    const items = JSON.parse(fileContent);

    items.push(newTodo);

    const newContent = Buffer.from(JSON.stringify(items)).toString("base64");

    // await axios.put(
    //   GITHUB_API_URL,
    //   {
    //     message: "Add new todo",
    //     content: newContent,
    //     sha: response.data.sha,
    //   },
    //   { headersPOST }
    // );
    const updateResponse = await axios.put(
      GITHUB_API_URL,
      {
        message: "Add new todo on default",
        content: newContent,
        sha: response.data.sha,
      },
      { headers }
    );
    console.log("Update response:", updateResponse.data);

    return NextResponse.json(
      { message: "Todo added successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "Failed to add todo",
      error.response ? error.response.data : error.message
    );
    return NextResponse.json({ error: "Failed to add todo" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const updatedTodo = await req.json();

    // Fetch current todos from GitHub
    const response = await axios.get(GITHUB_API_URL, { headersPOST });
    const fileContent = Buffer.from(response.data.content, "base64").toString(
      "utf-8"
    );
    const todos = JSON.parse(fileContent);

    // Find and update the todo item
    const index = todos.findIndex((todo) => todo.id === parseInt(id, 10));
    if (index === -1) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }
    todos[index] = { ...todos[index], ...updatedTodo };

    // Convert updated todos to JSON and encode in base64
    const updatedContent = Buffer.from(JSON.stringify(todos)).toString(
      "base64"
    );

    // Update the file on GitHub
    await axios.put(
      GITHUB_API_URL,
      {
        message: "Update todo",
        content: updatedContent,
        sha: response.data.sha,
      },
      { headers }
    );

    return NextResponse.json(
      { message: "Todo updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "Failed to update todo",
      error.response ? error.response.data : error.message
    );
    return NextResponse.json(
      { error: "Failed to update todo" },
      { status: 500 }
    );
  }
}
