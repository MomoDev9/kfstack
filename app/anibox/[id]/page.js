"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Head from "next/head";
import axios from "axios";

export default function Details() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  document.title = data?.title.romaji.toLowerCase() + " - Anibox" || "Anibox";

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          // Ganti dengan URL API yang sesuai
          const response = await axios.get(
            `https://animeapi-askiahnur1.b4a.run/anime/${id}`
          );
          setData(response.data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>No data found</p>;

  const {
    title,
    description,
    bannerImage,
    coverImage,
    year,
    format,
    episodes,
    genres,
  } = data;

  return (
    <div className="bg-black text-white min-h-screen">
      <Head>
        <title>{title.romaji}</title>
      </Head>
      <header className="relative">
        <div className="absolute h-96 w-full bg-gradient-to-t from-black z-10"></div>
        <img
          id="banner-image"
          src={bannerImage}
          className="block h-96 w-full object-cover"
          alt=""
        />
      </header>
      <main className="mx-56 flex gap-x-10">
        <div className="left">
          <div className="h-80 w-56">
            <img
              id="cover-image"
              src={coverImage}
              alt=""
              className="block rounded-lg h-80 w-80 object-cover"
            />
          </div>
        </div>
        <div className="right">
          <h1
            id="title"
            className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-500 md:text-5xl lg:text-6xl dark:text-white"
          >
            {title.romaji}
          </h1>
          <div id="info" className="mb-3">
            Year :{" "}
            <span className="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
              {year}
            </span>
          </div>
          Genres :{" "}
          {genres.map((genre, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300"
            >
              {genre}
            </span>
          ))}
          <div id="info" className="mb-3">
            Format :{" "}
            <span className="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
              {format}
            </span>
          </div>
          <div id="info" className="mb-3">
            Episodes :{" "}
            <span className="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
              {episodes ? episodes : "Unknown"}
            </span>
          </div>
          <div dangerouslySetInnerHTML={{ __html: description }} />
        </div>
      </main>
    </div>
  );
}
