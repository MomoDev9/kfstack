import toast from "react-hot-toast";
export default function DeleteModal({ delFile, onClose, setRefresh }) {
  const { filename, sha } = delFile;
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

      toast.success("Post " + filename + " deleted successfully");
      onClose();
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error("" + error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
        <p>Are you sure you want to delete this file?</p>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={deletePost.bind(null, filename, sha)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
