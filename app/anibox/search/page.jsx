"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import SearchCard from "../comp/searchCard";

export default function Search() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const q = useSearchParams().get("q");

  document.title = `Search ${q} - Anibox`;
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
  }, []);
  const fetchSearchResults = async (q) => {
    const response = await axios.get(
      `https://animeapi-askiahnur1.b4a.run/anime?title=${q}`
    );
    return response.data;
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!results.length) return <p>Data not found.</p>;
  return (
    <div className="bg-black text-white min-h-screen">
      <main className="px-16 pt-16 relative w-full">
        <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-700 dark:text-white">
          Search result for{" "}
        </h1>

        {/* <SearchCard item={results} /> */}
        <div
          id="result-container"
          className="grid gap-y-10 justify-between gap-x-3 mt-10 mb-10"
          style={{ gridTemplateColumns: "repeat(auto-fill, 14rem)" }}
        >
          {results.map((result) => (
            <SearchCard
              key={result.id}
              item={result}
              title={result.title.romaji || result.title.english}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
