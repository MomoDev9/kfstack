"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import matter from "gray-matter";

import MarkdownRenderer from "../components/markdownRenderer";
import OtherPosts from "../components/otherPost";
import Head from "next/head";

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
      const res = await fetch(`/blog/markdown/${filename}`);
      const data = await res.json();
      setFile(data);
      document.title = data.data.title;
    } catch (error) {
      console.error("Failed to fetch markdown file", error);
    }
  };

  if (!file) {
    return <div>Loading...</div>;
  }

  const { data, content } = matter(file);
  const { author, title, createdAt, banner, updatedAt } = data;
  return (
    <>
      <Head>
        <title>{title} - Blog</title>
      </Head>
      <div className="flex flex-col mx-0 px-4 bg-violet-200">
        <div className="flex w-full bg-red-700 bg-opacity-40 mt-1">
          <img
            src={banner}
            alt={title}
            className=" h-[300px] object-contain  mx-auto"
          />
        </div>
        <div className="flex flex-col md:flex-row my-10">
          <div className="w-full md:w-3/4">
            <h1 className="text-3xl font-bold mb-2">{title}</h1>
            <h3 className="text-sm text-neutral-500 mb-10">
              By: {author} -{" "}
              {updatedAt
                ? `Last updated on ${new Date(updatedAt).toLocaleDateString()}`
                : `Created on ${new Date(createdAt).toLocaleDateString()}`}
            </h3>
            <MarkdownRenderer content={content} />
          </div>
          <div className="w-full md:w-1/4">
            <OtherPosts currentFile={filename + ".md"} />
          </div>
        </div>
      </div>
    </>
  );
}
