"use client";

import { useState } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";

import MenuCard from "./components/menuCard";
import Header from "./components/header";
import Footer from "./components/footer";
import { tasks, miniEvents } from "./components/data";

export default function Home() {
  const [activeSection, setActiveSection] = useState(null);

  const handleToggleSection = (section) => {
    setActiveSection((prev) => (prev === section ? null : section));
  };

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-6 min-h-[80vh]">
        <h1
          className={`flex text-3xl font-bold mb-6 cursor-pointer ${
            activeSection === "tasks"
              ? "bg-gray-300 text-black"
              : "bg-gray-700 text-gray-200"
          } p-4 rounded justify-between`}
          onClick={() => handleToggleSection("tasks")}
        >
          Task {activeSection === "tasks" ? <MdExpandLess /> : <MdExpandMore />}
        </h1>
        {activeSection === "tasks" && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <MenuCard key={task.title} {...task} />
            ))}
          </div>
        )}

        <h2
          className={`flex justify-between text-2xl font-bold mb-6 cursor-pointer mt-8 ${
            activeSection === "miniEvents"
              ? "bg-gray-300 text-black"
              : "bg-gray-700 text-gray-200"
          } p-4 rounded`}
          onClick={() => handleToggleSection("miniEvents")}
        >
          Mini Events{" "}
          {activeSection === "tasks" ? <MdExpandLess /> : <MdExpandMore />}
        </h2>
        {activeSection === "miniEvents" && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {miniEvents.map((event) => (
              <MenuCard key={event.title} {...event} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
