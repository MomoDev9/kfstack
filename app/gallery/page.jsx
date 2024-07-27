import React from "react";
import Gallery from "./imgGallery";

export default function Home() {
  return (
    <div>
      <div className="flex items-center justify-center my-3">
        <p className="text-3xl border-2 p-2 border-black">
          Wellcome To WuWa Gallery
        </p>
      </div>
      <div className="bg-black py-5">
        <Gallery />
      </div>
    </div>
  );
}
