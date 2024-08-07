"use client";
import { useState, useEffect } from "react";
import axios from "axios";

import Card from "../comp/card";

export default function TopRatedAnime() {
  const [animeData, setAnimeData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const res = await axios.get(
          `https://animeapi-askiahnur1.b4a.run/anime?sort=top&limit=30&page=${page}`
        );
        setAnimeData(res.data);
      } catch (error) {
        console.error("Error fetching top-rated anime:", error);
      }
    };
    fetchAnime();
  }, [page]);

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(page - 1);
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <main className="px-16 pt-16 relative w-full">
        <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-700 dark:text-white">
          Top Rated Anime{" "}
        </h1>

        {/* <SearchCard item={results} /> */}
        <div
          id="result-container"
          className="grid gap-y-10 justify-between gap-x-3 mt-10 mb-10"
          style={{ gridTemplateColumns: "repeat(auto-fill, 14rem)" }}
        >
          {animeData.map((result) => (
            <Card
              key={result.id}
              item={result}
              title={result.title.romaji || result.title.english}
            />
          ))}
        </div>
        <div className="flex justify-center mx-auto">
          <button
            onClick={prevPage}
            className={page === 1 ? "hidden font-bold" : "font-bold"}
          >
            Previous
          </button>
          <span className="mx-4 bg-gray-200 p-1 text-black rounded-xl">
            Page : {page}
          </span>
          <button onClick={nextPage} className="font-bold">
            Next
          </button>
        </div>
      </main>
    </div>
  );
}
