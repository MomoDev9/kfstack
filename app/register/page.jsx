"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";

import Header from "../components/header";
import Footer from "../components/footer";
import Btn from "../components/btn";

export default function Register() {
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (response.ok) {
      const user = await response.json();
      console.log("User registered:", user);
    } else {
      console.error("Failed to register");
    }
  };

  if (session) {
    return (
      <div>
        <p>Welcome, {session.user.name}!</p>
        <button onClick={() => signOut()} className="btn bg-red-600 text-white">
          Sign out
        </button>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="flex  justify-center items-center min-h-[85vh]">
        <div className="flex flex-col bg-indigo-300  shadow-indigo-700 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]">
          <h1 className="text-4xl font-bold text-white ml-5 mt-5">Register</h1>
          <form className="flex flex-col p-5" onSubmit={handleRegister}>
            <label htmlFor="name" className="mx-2 mt-5">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Your Name"
              className="h-10 w-full"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label htmlFor="email" className="mx-2 mt-5">
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Your email"
              className="h-10 w-full"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="password" className="mx-2 mt-5">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Your Password"
              className="h-10 w-full"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="flex justify-center mt-4 w-full">
              <Btn
                text="Register"
                col1="bg-indigo-500"
                col2="bg-gray-700"
                colHover="bg-indigo-700"
                colText="text-white"
              />
            </div>
          </form>

          <div className="my-1 flex items-center">
            <div className="flex-grow border-t border-white"></div>
            <span className="mx-4 text-black">
              Or <span className="hidden lg:inline">Register With</span>
            </span>
            <div className="flex-grow border-t border-white"></div>
          </div>

          <div className="flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-3  my-3 p-5">
            <Btn
              text="Facebook"
              col1="bg-indigo-600"
              col2="bg-amber-400"
              colHover="bg-amber-400"
              colText="text-white"
              colTextHover="text-white"
              onClick={() => {
                signIn("facebook");
              }}
            />
            <Btn
              text="Google"
              col1="bg-amber-400"
              col2="bg-indigo-600"
              colHover="bg-indigo-700"
              colText="text-white"
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
