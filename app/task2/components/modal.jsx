"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [files, setFiles] = useState([]);
  const [filename, setFilename] = useState("");
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [banner, setBanner] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    const res = await fetch("/task2/markdown");
    const data = await res.json();
    // console.log(data);
    if (Array.isArray(data)) {
      setFiles(data);
    } else {
      console.error("Expected an array but got", data);
    }
  };

  const createFile = async () => {
    await fetch("/task2/markdown", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        filename,
        author,
        title,
        subtitle,
        content,
        banner,
        thumbnail,
      }),
    });
    fetchFiles();
  };

  return (
    <div>
      <h1>Markdown CRUD</h1>
      <div>
        <input
          type="text"
          placeholder="Filename"
          value={filename}
          onChange={(e) => setFilename(e.target.value)}
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Subtitle"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Banner URL"
          value={banner}
          onChange={(e) => setBanner(e.target.value)}
        />
        <input
          type="text"
          placeholder="Thumbnail URL"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={createFile}>Create</button>
      </div>
      <div>
        <h2>Files</h2>
        <ul>
          a
          {files.map((file) => (
            <li key={file.filename}>
              <h3>{file.filename}</h3>
              <Link href={`/task2/${file.filename.replace(".md", "")}`}>
                <img
                  src={file.thumbnail}
                  alt={file.title}
                  style={{ width: "100px", height: "auto" }}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
