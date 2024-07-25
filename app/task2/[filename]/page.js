"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import matter from "gray-matter";

export default function PostPage() {
  const { filename } = useParams();
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (filename) {
      fetchFile(filename);
    }
  }, [filename]);

  const fetchFile = async (filename) => {
    try {
      const res = await fetch(`/task2/markdown/${filename}`);
      const data = await res.json();
      setFile(data.content);
    } catch (error) {
      console.error("Failed to fetch markdown file", error);
    }
  };

  if (!file) {
    return <div>Loading...</div>;
  }

  const { data, content } = matter(file);
  const { author, title, subtitle, banner } = data;

  return (
    <div>
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
      <h3>By: {author}</h3>
      {banner && (
        <img
          src={banner}
          alt={title}
          style={{ width: "100%", height: "auto" }}
        />
      )}
      <div>{content}</div>
    </div>
  );
}
