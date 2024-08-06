"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import Carousel from "./comp/carousel";
import Section from "./comp/section";

export default function Home() {
  const [banner, setBanner] = useState([]);
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get(
          "https://animeapi-askiahnur1.b4a.run/anime?sort=trending"
        );
        const data = res.data;

        setTrending(data);
        setBanner(data.slice(0, 5));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchItems();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      <main>
        <Carousel items={banner} />
        <Section name="Trending" data={trending} />
      </main>
    </div>
  );
}
