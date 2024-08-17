"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Home({ home }) {
  const { data: session } = useSession();
  return (
    <header>
      <div className="flex flex-row bg-indigo-500 max-w-screen justify-between items-center h-20">
        <Link
          href="/"
          className="bg-indigo-100 bg-opacity-10 ml-5 rounded-full"
        >
          <img src="/logo.png" alt="MomoDev" className="w-15 h-15" />
        </Link>
        <div className="text-white text-2xl mr-5">
          <ul className="flex flex-row gap-3">
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
              <>
                {session.user.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <p>{session.user.name}</p>
                )}
              </>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
}
