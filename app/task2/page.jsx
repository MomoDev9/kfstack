"use client";
import { useState } from "react";
import prisma from "../../lib/prisma";
import AddModal from "./component/modalAdd";

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
      <div>
        {showModal ? (
          <AddModal
            onClose={showAddModal}
            onRequest={showAddModal}
            type={"add"}
          />
        ) : null}
        {/* {showModal ? <AddModal onClose={showModal} /> : null} */}
      </div>
    </>
  );
}
