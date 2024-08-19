"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

export default function UpdateModal({ filename, onClose, setRefresh }) {
  const { data: session } = useSession();
  const [author, setAuthor] = useState("MomoDev");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [banner, setBanner] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [sha, setSha] = useState("");

  useEffect(() => {
    if (filename) {
      fetchFile(filename);
    }
  }, [filename]);

  const fetchFile = async (filename) => {
    try {
      const res = await fetch(`/blog/markdown/${filename}`);
      const data = await res.json();
      setTitle(data.data.title);
      setAuthor(session.user.name);
      setContent(data.content);
      setBanner(data.data.banner);
      setThumbnail(data.data.thumbnail);
      setSha(data.sha);
    } catch (error) {
      console.error("Failed to fetch  file");
      toast.error("Failed to fetch " + filename);
    }
  };
  const updatePost = async () => {
    try {
      const response = await fetch("/blog/markdown", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filename,
          content,
          sha,
          banner,
          thumbnail,
          author,
          title,
        }),
      });

      if (response.ok) {
        toast.success(title.substring(0, 10) + "... updated successfully");
        setRefresh((prev) => !prev);
        onClose();
      } else {
        toast.error("Update failed");
      }
    } catch (error) {
      toast.error("Failed to update" + title + " post");
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Update Post</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            className="mt-1 block w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Content</label>
          <textarea
            className="mt-1 block w-full"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={updatePost}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
