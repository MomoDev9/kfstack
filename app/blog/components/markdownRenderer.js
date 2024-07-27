"use client";
import React from "react";
import Markdown from "react-markdown";
// import rehypeRaw from 'rehype-raw';
// import rehypeSanitize from 'rehype-sanitize';

export default function MarkdownRenderer({ content }) {
  return (
    <div
      className={` prose 
        prose-h1:text-3xl prose-h1:mt-10 prose-h1:mb-3
        prose-p:text-base prose-p:first-letter:ml-5 
        prose-strong:font-bold 
        prose-ul:list-disc marker:text-neutral-400 prose-ul:text-neutral-600 prose-ul:my-0
         prose-h2:border-l-2 prose-h2:pl-3 prose-h2:border-blue-600  prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-3 
         prose-h3:pl-3 prose-h3:border-blue-600  prose-h3:text-xl prose-h3:mt-5 prose-h3:mb-1
`}
    >
      <Markdown children={content} />
    </div>
  );
}
