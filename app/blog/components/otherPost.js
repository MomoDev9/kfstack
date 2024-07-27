"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function OtherPost({ currentFile }) {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      const res = await fetch("/blog/markdown");
      const data = await res.json();
      // console.log(data);
      if (Array.isArray(data)) {
        setFiles(data);
      } else {
        console.error("Expected an array but got", data);
      }
    };
    fetchFiles();
  }, []);

  const Posts = files.filter((file) => file.filename !== currentFile);
  return (
    <div className="flex flex-col">
      <div>
        <span className="text-xl">Explore Other Posts</span>
        <hr className="my-5 border-2 border-indigo-300" />
        <ul>
          {Posts.map((file) => (
            <li
              key={file.filename}
              className=" bg-white my-2 border border-indigo-400"
            >
              <Link href={`/blog/${file.filename.replace(".md", "")}`}>
                <div className="flex">
                  <Image
                    src={file.thumbnail}
                    alt={file.title}
                    className="w-36 h-28 object-cover"
                  />
                  <div className="ml-3 flex flex-col mt-2">
                    <span className="text-lg font-bold">{file.title}</span>
                    <span className="text-sm">{file.minicontent}</span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
