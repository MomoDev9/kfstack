"use client";
import axios from "axios";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

import Card from "../comp/card";

export default function Search() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const q = useSearchParams().get("q");
  const [p, setP] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSearchResults(q);
        setResults(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    document.title = `Search ${q} - Anibox`;
  }, [p]);
  const fetchSearchResults = async (q) => {
    const response = await axios.get(
      `https://animeapi-askiahnur1.b4a.run/anime?title=${q}&limit=20&page=${p}`
    );
    return response.data;
  };

  const next = () => {
    setP(p + 1);
  };

  const prev = () => {
    setP(p - 1);
  };

  if (loading)
    return (
      <p className="text-center text-white text-3xl bg-black h-screen">
        Loading...
      </p>
    );
  if (error)
    return (
      <p className="text-center text-white text-3xl bg-black h-screen">
        Error: {error}
      </p>
    );
  if (!results.length)
    return (
      <div className="flex flex-col bg-black h-[85vh] items-center justify-center ">
        <p className="text-center text-white text-3xl mt-10">
          {p > 1 ? `End of results` : `Data for ${q} not found`}
        </p>
        {p > 1 ? (
          <div className="flex flex-col justify-center mt-5">
            <span className="font-bold text-white p-2">Page : {p}</span>
            <button
              onClick={prev}
              className=" bg-blue-300 p-2 text-black rounded-xl mt-3"
            >
              Previous
            </button>
          </div>
        ) : null}
      </div>
    );
  return (
    <div className="bg-black text-white min-h-screen">
      <main className="px-16 pt-16 relative w-full">
        <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-700 dark:text-white">
          Search result for {q}
        </h1>
        <h2 className="mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-700 dark:text-white">
          Page : {p}
        </h2>
        <div
          id="result-container"
          className="grid gap-y-10 justify-between gap-x-3 mt-10 mb-10"
          style={{ gridTemplateColumns: "repeat(auto-fill, 14rem)" }}
        >
          {results.map((result) => (
            <Card
              key={result.id}
              item={result}
              title={result.title.romaji || result.title.english}
            />
          ))}
        </div>
        <div className="flex justify-center mx-auto">
          <button
            onClick={prev}
            className={p === 1 ? "hidden font-bold" : "font-bold"}
          >
            Previous
          </button>
          <span className="mx-4 bg-gray-200 p-1 text-black rounded-xl">
            Page : {p}
          </span>
          <button onClick={next} className="font-bold">
            Next
          </button>
        </div>
      </main>
    </div>
  );
}
