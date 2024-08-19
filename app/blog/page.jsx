"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { VscEdit } from "react-icons/vsc";
import { Toaster } from "react-hot-toast";

import AModal from "./components/addModal";
import UModal from "./components/updateModal";
import DModal from "./components/deleteModal";
import Loading from "../components/loading";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [showAModal, setShowAModal] = useState(false);
  const [showUModal, setShowUModal] = useState(false);
  const [showDModal, setShowDModal] = useState(false);
  const [files, setFiles] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [updateData, setUpdateData] = useState(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    fetchFiles();
  }, [refresh]);

  function showAddModal() {
    setShowAModal(!showAModal);
  }

  function showEditModal(filename) {
    setUpdateData(filename);
    setShowUModal(!showUModal);
  }

  function showDeleteModal(file) {
    setUpdateData(file);
    setShowDModal(!showDModal);
  }

  const fetchFiles = async () => {
    const res = await fetch("/blog/markdown");
    const data = await res.json();
    if (Array.isArray(data)) {
      setFiles(data);
      setLoading(false);
    } else {
      console.error("Expected an array but got", data);
    }
  };

  if (loading || status === "loading") {
    return <Loading />;
  }

  return (
    <div className="flex flex-col bg-violet-200 min-h-[85vh]">
      {session && (
        <div
          className="flex cursor-pointer mx-auto bg-indigo-300 p-5 text-white text-lg font-bold my-10 ml-5"
          onClick={showAddModal}
          aria-label="Tambah Post"
        >
          Create Post +
        </div>
      )}
      <div className="flex flex-col mx-auto px-4 bg-violet-200 mt-5">
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 ">
          {files.map((file) => (
            <li key={file.filename}>
              <Link href={`/blog/${file.filename.replace(".md", "")}`}>
                <img
                  src={file.thumbnail}
                  alt={file.title}
                  className="w-[200px] h-40 object-cover rounded-t-xl hover:rounded-none hover:scale-125 transition-transform duration-300"
                />
              </Link>
              {session ? (
                <>
                  <button
                    onClick={() =>
                      showEditModal(file.filename.replace(".md", ""))
                    }
                    className="bg-green-300 rounded-bl-xl text-xl hover:bg-green-500"
                  >
                    <VscEdit className="h-10 w-[100px]" />
                  </button>
                  <button
                    onClick={() =>
                      showDeleteModal({
                        filename: file.filename,
                        sha: file.sha,
                      })
                    }
                    className="bg-red-300 rounded-br-xl text-2xl hover:bg-red-500"
                  >
                    <RiDeleteBin6Line className="h-10 w-[100px]" />
                  </button>
                </>
              ) : (
                <div className="flex bg-green-300 w-[200px] h-10 overflow-hidden items-center rounded-b-xl">
                  <p className="truncate mx-auto">{file.title}</p>
                </div>
              )}
              <div></div>
            </li>
          ))}
        </ul>
      </div>
      <div>
        {showAModal ? (
          <AModal onClose={showAddModal} setRefresh={setRefresh} />
        ) : null}
      </div>
      <div>
        {showUModal && updateData && (
          <UModal
            onClose={showEditModal}
            setRefresh={setRefresh}
            filename={updateData}
          />
        )}
      </div>
      <div>
        {showDModal ? (
          <DModal
            onClose={showDeleteModal}
            delFile={updateData}
            setRefresh={setRefresh}
          />
        ) : null}
      </div>
      <Toaster />
    </div>
  );
}
