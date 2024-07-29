"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { RiDeleteBin6Line } from "react-icons/ri";
import { VscEdit } from "react-icons/vsc";
import toast, { Toaster } from "react-hot-toast";

import Header from "../components/header";
import Modal from "./components/addModal";

export default function Home() {
  const [showAModal, setShowAModal] = useState(false);
  const [showUModal, setShowUModal] = useState(false);
  const [showDModal, setShowDModal] = useState(false);
  const [files, setFiles] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetchFiles();
  }, [refresh]);

  function showAddModal() {
    if (!showAModal) {
      document
        .getElementsByTagName("html")[0]
        .classList.add("overflow-y-hidden");
      setShowAModal(true);
    } else {
      document
        .getElementsByTagName("html")[0]
        .classList.remove("overflow-y-hidden");
      setShowAModal(false);
    }
  }
  function showEditModal() {
    if (!showUModal) {
      document
        .getElementsByTagName("html")[0]
        .classList.add("overflow-y-hidden");
      setShowUModal(true);
    } else {
      document
        .getElementsByTagName("html")[0]
        .classList.remove("overflow-y-hidden");
      setShowUModal(false);
    }
  }
  const deletePost = async (filename, sha) => {
    try {
      const response = await fetch("/blog/markdown", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ filename, sha }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete post");
      }

      const result = await response.json();
      toast.success("File deleted successfully");
      setRefresh((prev) => !prev);
      console.log(result);
    } catch (error) {
      toast.error("" + error);
    }
  };

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

  return (
    <div className="flex flex-col bg-violet-200 min-h-screen">
      <Header />
      <div
        className="flex cursor-pointer mx-auto bg-indigo-300 p-5 text-white text-lg font-bold my-10 ml-5"
        onClick={showAddModal}
        aria-label="Tambah Post"
      >
        Create Post +
      </div>
      <div className="flex flex-col mx-auto px-4 bg-violet-200">
        <ul className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-10 ">
          {files.map((file) => (
            <li key={file.filename}>
              <Link href={`/blog/${file.filename.replace(".md", "")}`}>
                <img
                  src={file.thumbnail}
                  alt={file.title}
                  className="w-[200px] h-40 object-cover rounded-t-xl hover:rounded-none hover:scale-125 transition-transform duration-300"
                />
              </Link>
              <button
                onClick={showEditModal}
                className="bg-green-300 rounded-bl-xl text-xl hover:bg-green-500"
              >
                <VscEdit className="h-10 w-[100px]" />
              </button>
              <button
                onClick={deletePost.bind(null, file.filename, file.sha)}
                className="bg-red-300 rounded-br-xl text-2xl hover:bg-red-500"
              >
                <RiDeleteBin6Line className="h-10 w-[100px]" />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>{showAModal ? <Modal onClose={showAddModal} /> : null}</div>
      <div>{showUModal ? <Modal onClose={showEditModal} /> : null}</div>
      <Toaster />
    </div>
  );
}
