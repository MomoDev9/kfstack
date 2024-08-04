"use client";

import { useEffect, useState } from "react";

import Head from "next/head";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Carousel from "./components/Carousel";
import Section from "./components/Section";
import axios from "axios";

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
        setBanner(data.slice(1, 6));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchItems();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      <Head>
        <title>AniBox</title>
      </Head>
      <Header />
      <main>
        <Carousel items={banner} />
        <Section name="Trending" data={trending} />
      </main>
      <Footer />
    </div>
  );
}
