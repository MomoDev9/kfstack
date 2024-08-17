"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

import Header from "../components/header";
import Footer from "../components/footer";
import Btn from "./btn";

export default function Login() {
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result.error) {
      alert(result.error);
    } else {
      window.location.href = "/";
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
          <h1 className="text-4xl font-bold text-white ml-5 mt-5">Login</h1>
          <form className="flex flex-col p-5" onSubmit={handleLogin}>
            <label htmlFor="email" className="mx-2 mt-5">
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Your Email"
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

            <Btn
              text="Login"
              col1="bg-indigo-500"
              col2="bg-gray-700"
              colHover="bg-indigo-700"
              colText="text-white"
            />
          </form>
          <div className="flex flex-row space-x-3 my-3 p-5">
            <Btn
              text="Facebook"
              col1="bg-indigo-600"
              col2="bg-amber-400"
              colHover="bg-amber-400"
              colText="text-white"
              colTextHover="text-white"
              onClick={() => {
                console.log("Facebook sign-in button clicked");
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