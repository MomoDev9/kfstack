"use client";
import { useState } from "react";
import AddModal from "./components/modal";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
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
  return (
    <>
      <div
        className="flex cursor-pointer mb-5 mx-auto"
        onClick={showAddModal}
        aria-label="Tambah Post"
      >
        +
      </div>
      <div>{showModal ? <AddModal onClose={showAddModal} /> : null}</div>
    </>
  );
}
