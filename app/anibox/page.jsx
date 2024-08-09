"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

import Carousel from "./comp/carousel";
import Section from "./comp/section";
import Loading from "../components/loading";

export default function Home() {
  const [banner, setBanner] = useState([]);
  const [trending, setTrending] = useState([]);
  const [popularity, setPopularity] = useState([]);
  const [top, setTop] = useState([]);
  const [newest, setNewest] = useState([]);
  const [selectedSection, setSelectedSection] = useState("Trending");
  const [loading, setLoading] = useState(true);

  const listSection = [
    { name: "Trending", data: trending },
    { name: "Popularity", data: popularity },
    { name: "Rating", data: top },
    { name: "Latest", data: newest },
  ];

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get(
          "https://animeapi-askiahnur1.b4a.run/anime?sort=trending"
        );
        const data = res.data;
        setTrending(data);
        setBanner(data.slice(0, 5));

        const popularityRes = await axios.get(
          "https://animeapi-askiahnur1.b4a.run/anime?sort=popularity"
        );
        setPopularity(popularityRes.data);

        const topRes = await axios.get(
          "https://animeapi-askiahnur1.b4a.run/anime?sort=top"
        );
        setTop(topRes.data);

        const newestRes = await axios.get(
          "https://animeapi-askiahnur1.b4a.run/anime?sort=newest"
        );
        setNewest(newestRes.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchItems();
  }, []);

  const sectionData =
    listSection.find((section) => section.name === selectedSection)?.data || [];

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="bg-black text-white min-h-screen">
      <main>
        <Carousel items={banner} />
        <div className="flex mt-6 mb-4">
          {listSection.map((section) => (
            <button
              key={section.name}
              onClick={() => setSelectedSection(section.name)}
              className={`px-4 py-2 mx-2 ${
                selectedSection === section.name ? "bg-gray-700" : "bg-gray-500"
              } rounded`}
            >
              {section.name}
            </button>
          ))}

          <Link
            href="/anibox/top"
            className=" text-white bg-red-500 rounded-lg text-lg ml-auto mr-4 p-2"
          >
            See All by Rating
          </Link>
        </div>
        <Section name={selectedSection} data={sectionData} />
      </main>
    </div>
  );
}
