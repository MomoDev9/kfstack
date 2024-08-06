import { useEffect, useState } from "react";
import Link from "next/link";

export default function Carousel({ items }) {
  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((prevIndex) => {
      return (prevIndex + 1) % items.length;
    });
  };

  const prev = () => {
    setIndex((prevIndex) => {
      return (prevIndex - 1 + items.length) % items.length;
    });
  };

  useEffect(() => {
    if (items.length > 0) {
      const interval = setInterval(next, 3000);
      return () => clearInterval(interval);
    }
  }, [items, next]);

  return (
    <div className="relative">
      <div className="relative h-96 overflow-hidden md:h-96 bg-black">
        {items.map((item, i) => (
          <Link href={`/anibox/${item.id}`} key={i}>
            <div
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out  ${
                i !== index ? "hidden" : ""
              }`}
            >
              <img
                src={
                  item.bannerImage ||
                  "https://via.placeholder.com/800x600?text=No+Image"
                }
                alt={item.title.romaji}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-4">
                <h2 className="text-2xl font-bold">
                  {item.title.english ? item.title.english : item.title.romaji}
                </h2>
                <div
                  dangerouslySetInnerHTML={{
                    __html: item.description.substring(0, 150) + "...",
                  }}
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
      <button
        onClick={prev}
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none pointer-events-auto"
        data-carousel-prev
      >
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10">
          <svg
            aria-hidden="true"
            className="w-10 h-10 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        onClick={next}
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-next
      >
        <span className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10">
          <svg
            aria-hidden="true"
            className="w-10 h-10 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
}
