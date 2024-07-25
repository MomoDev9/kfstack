"use client";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

// import addPost from "../../api/addPost";

export default function Modal({ onClose }) {
  const [authorId, setAuthorId] = useState("1");
  const [title, setTitle] = useState("tt");
  const [subtitle, setSubtitle] = useState("stt");
  const [content, setContent] = useState("ct");
  const [banner, setBanner] = useState("bn");
  const [thumbnail, setThumbnail] = useState("tm");

  const submitData = async (e) => {
    e.preventDefault();
    try {
      const body = { authorId, title, subtitle, content, banner, thumbnail };
      await fetch("/api/addPost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      //   await Router.push("/drafts");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <form
        onSubmit={submitData}
        className="font-general-medium fixed inset-0 z-30 transition-all duration-500"
      >
        <h1>New Draft</h1>
        <input
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-5 py-2 border dark:border-neutral-800 rounded-md text-md bg-secondary-light dark:bg-neutral-700 text-black dark:text-neutral-300"
          id="title"
          name="title"
          type="text"
          placeholder="Title"
          aria-label="Title"
        />
        <input
          className="w-full px-5 py-2 mt-3 border dark:border-neutral-800 rounded-md text-md bg-secondary-light dark:bg-neutral-700 text-black dark:text-neutral-300"
          id="subtitle"
          name="subtitle"
          type="text"
          required=""
          placeholder="Subtitle"
          aria-label="Subtitle"
        />
        <textarea
          className="w-full mt-3 px-5 py-2 border dark:border-neutral-800 rounded-md text-md bg-secondary-light dark:bg-neutral-700 text-black dark:text-neutral-300"
          id="content"
          name="content"
          cols="14"
          rows="6"
          aria-label="Content"
          placeholder="Content"
        ></textarea>

        <button className="bg-blue-300">test</button>
        <div className="flex mt-6 pb-4 sm:pb-1 justify-between">
          <span type="submit" aria-label="Submit Request">
            a{/* <ButtonLink text="Send Request" link="#" /> */}
          </span>
          <span onClick={onClose} type="button">
            b{/* <ButtonClose text="Close" /> */}
          </span>
        </div>
        {/* <input disabled={!content || !title} type="submit" value="Create" />
        <a className="back" href="#" onClick={() => Router.push("/")}>
          or Cancel
        </a> */}
      </form>
      <Toaster position="top-center" />
    </div>
  );
}
