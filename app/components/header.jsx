"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

export default function Home({ home }) {
  const { data: session } = useSession();
  const [showLogout, setShowLogout] = useState(false);

  const handleToggleLogout = () => {
    setShowLogout(!showLogout);
  };
  return (
    <header>
      <div className="relative flex flex-row bg-indigo-500 max-w-screen justify-between items-center h-20">
        <Link
          href="/"
          className="bg-indigo-100 bg-opacity-10 ml-5 rounded-full"
        >
          <img src="/logo.png" alt="MomoDev" className="w-15 h-15" />
        </Link>
        <div className="flex items-center text-white text-2xl ">
          <ul className="absolute flex flex-row gap-3 items-center right-0 mr-10">
            <Link href={home || "/"}>
              {" "}
              <li>Home</li>{" "}
            </Link>
            <a href="https://MomoDev.vercel.app">
              <li>About</li>
            </a>
            {!session ? (
              <Link href="/login">
                <li>Login</li>
              </Link>
            ) : (
              <div className="relative right-0 mr-5 flex flex-col items-center">
                <div
                  onClick={handleToggleLogout}
                  className="flex items-center cursor-pointer"
                >
                  {session.user.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name}
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <p className="bg-black/50 p-2 rounded-full text-white">
                      {session.user.name.slice(0, 2).toUpperCase()}
                    </p>
                  )}
                </div>
                {showLogout && (
                  <button
                    onClick={() => signOut()}
                    className="absolute top-14 items-center bg-red-500 p-2 rounded-xl text-white text-sm"
                  >
                    Logout
                  </button>
                )}
              </div>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
}
