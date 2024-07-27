"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { RiDeleteBin6Line } from "react-icons/ri";
import { VscEdit } from "react-icons/vsc";

import Header from "../components/header";
import Modal from "./components/modal";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [files, setFiles] = useState([]);
  function showAddModal() {
    if (!showModal) {
      document
        .getElementsByTagName("html")[0]
        .classList.add("overflow-y-hidden");
      setShowModal(true);
    } else {
      document
        .getElementsByTagName("html")[0]
        .classList.remove("overflow-y-hidden");
      setShowModal(false);
    }
  }
  function showEditModal() {
    if (!showModal) {
      document
        .getElementsByTagName("html")[0]
        .classList.add("overflow-y-hidden");
      setShowModal(true);
    } else {
      document
        .getElementsByTagName("html")[0]
        .classList.remove("overflow-y-hidden");
      setShowModal(false);
    }
  }
  useEffect(() => {
    fetchFiles();
  }, []);

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
                <i
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
                onClick={showEditModal}
                className="bg-red-300 rounded-br-xl text-2xl hover:bg-red-500"
              >
                <RiDeleteBin6Line className="h-10 w-[100px]" />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>{showModal ? <Modal onClose={showAddModal} /> : null}</div>
    </div>
  );
}
