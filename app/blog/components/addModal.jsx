"use client";

import { useState, useEffect } from "react";
import { MdEditor, ModalToolbar } from "md-editor-rt";
import { Toaster, toast } from "react-hot-toast";
import "md-editor-rt/lib/style.css";

export default function Home({ onClose, setRefresh }) {
  const [author, setAuthor] = useState("MomoDev");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [banner, setBanner] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const createFile = async () => {
    const res = await fetch("/blog/markdown", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        author,
        title,
        content,
        banner,
        thumbnail,
      }),
    });
    if (res.ok) {
      toast.success("Successfully created " + title + " post.");
      onClose();
      setRefresh((prev) => !prev);
    } else {
      toast.error("Failed to create " + title + " post.");
    }
  };

  return (
    <div className="bg-black bg-opacity-50 fixed inset-0 w-full h-full z-20 ">
      <main className="flex flex-col items-center justify-center h-screen max-w-screen overflow-auto">
        <div className="container mx-auto z-30 bg-neutral-100 rounded-xl">
          <div className="max-w-[screen-10]   max-h-screen shadow-lg rounded-lg flex flex-col items-center">
            <input
              type="url"
              placeholder="Title / Judul"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-violet-200 text-black border-spacing-1 border-2 rounded-lg w-[90%] border-neutral-300 my-2 h-10 p-2"
            />
            <div className="w-[90%] grid grid-cols-2 gap-x-2 my-2 mx-auto ">
              <input
                type="url"
                placeholder="Banner URL"
                value={banner}
                onChange={(e) => setBanner(e.target.value)}
                className="bg-violet-200 text-black border rounded-lg w-full border-neutral-300 h-10 p-2"
              />
              <input
                type="text"
                placeholder="Thumbnail URL"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                className="bg-violet-200 text-black border rounded-lg w-full border-neutral-300 h-10 p-2"
              />
              <div className="text-sm">* Banner = rectangular/persegi</div>
              <div className="text-sm">
                * Thumbnail = rectangle/persegi panjang
              </div>
            </div>
            <MdEditor
              modelValue={content}
              placeholder="Type The Content Here"
              onChange={setContent}
              style={{
                backgroundColor: "rgba(210, 218, 255, 0.2)",
                width: "90%",
              }}
              defToolbars={<ModalToolbar />}
              preview="false"
              toolbarsExclude={[
                "image",
                "prettier",
                "catalog",
                "github",
                "save",
              ]}
              inputBoxWitdh="80%"
              previewTheme="smart-blue"
              language="en-US"
              onSave={() => createFile()}
            />
          </div>
          <div className="flex my-3 justify-end">
            <button
              onClick={createFile}
              className="bg-green-300 text-lg px-5 font-bold mx-3 rounded-3xl hover:bg-green-500"
            >
              Save
            </button>
            <button
              onClick={onClose}
              className="bg-rose-400 hover:bg-rose-500 text-lg p-3 font-bold mr-5 rounded-3xl"
            >
              Cancel
            </button>
          </div>
        </div>
      </main>

      <Toaster position="top-center" />
    </div>
  );
}
