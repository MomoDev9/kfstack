import axios from "axios";
import { NextResponse } from "next/server";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER;
const filePath = (user) =>
  `https://api.github.com/repos/${GITHUB_OWNER}/todo/contents/${user}.json`;

const headers = {
  Authorization: `token ${GITHUB_TOKEN}`,
  Accept: "application/vnd.github.object+json",
};
// const headersPOST = {
//   Authorization: `token ${GITHUB_TOKEN}`,
//   Accept: "application/vnd.github.v3+json",
// };

const createFile = async (user, newContent) => {
  try {
    const response = await axios.put(
      filePath(user),
      {
        message: "Create new todo file",
        content: newContent,
      },
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Failed to create file",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export async function GET(req) {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const user = url.searchParams.get("user");
    const GITHUB_API_URL = filePath(user);

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
      { status: error.response ? error.response.status : 500 }
    );
  }
}

export async function POST(req) {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const user = url.searchParams.get("user");
    const GITHUB_API_URL = filePath(user);
    const newTodo = await req.json();

    try {
      const response = await axios.get(GITHUB_API_URL, { headers });
      const fileContent = Buffer.from(response.data.content, "base64").toString(
        "utf-8"
      );
      const items = JSON.parse(fileContent);

      items.push(newTodo);

      const newContent = Buffer.from(JSON.stringify(items)).toString("base64");

      const updateResponse = await axios.put(
        GITHUB_API_URL,
        {
          message: "Add new todo",
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
      if (error.response && error.response.status === 404) {
        const newContent = Buffer.from(JSON.stringify([newTodo])).toString(
          "base64"
        );
        await createFile(user, newContent);
        return NextResponse.json([], { status: 200 });
      } else {
        throw error;
      }
    }
  } catch (error) {
    console.error(
      "Failed to add todo",
      error.response ? error.response.data : error.message
    );
    return NextResponse.json({ error: "Failed to add todo" }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    const user = url.searchParams.get("user");
    const updatedData = await req.json();

    const GITHUB_API_URL = filePath(user);
    const response = await axios.get(GITHUB_API_URL, { headers });
    const fileContent = Buffer.from(response.data.content, "base64").toString(
      "utf-8"
    );
    const items = JSON.parse(fileContent);

    // Find and update the todo item
    const index = items.findIndex((item) => item.id === parseInt(id, 10));
    if (index === -1) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }
    items[index] = { ...items[index], ...updatedData, id: parseInt(id, 10) };

    const newContent = Buffer.from(JSON.stringify(items)).toString("base64");

    // Update the file on GitHub
    await axios.put(
      GITHUB_API_URL,
      {
        message: "Update todo",
        content: newContent,
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

export async function DELETE(req) {
  try {
    const url = new URL(req.url);
    const user = url.searchParams.get("user");
    const id = url.searchParams.get("id");
    const GITHUB_API_URL = filePath(user);

    // Fetch current todos from GitHub
    const response = await axios.get(GITHUB_API_URL, { headers });
    const fileContent = Buffer.from(response.data.content, "base64").toString(
      "utf-8"
    );
    const todos = JSON.parse(fileContent);

    // Find and remove the todo item
    const updatedTodos = todos.filter((todo) => todo.id !== parseInt(id, 10));

    // Convert updated todos to JSON and encode in base64
    const newContent = Buffer.from(JSON.stringify(updatedTodos)).toString(
      "base64"
    );

    // Update the file on GitHub
    await axios.put(
      GITHUB_API_URL,
      {
        message: "Delete todo",
        content: newContent,
        sha: response.data.sha,
      },
      { headers }
    );

    return NextResponse.json(
      { message: "Todo deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "Failed to delete todo",
      error.response ? error.response.data : error.message
    );
    return NextResponse.json(
      { error: "Failed to delete todo" },
      { status: 500 }
    );
  }
}
