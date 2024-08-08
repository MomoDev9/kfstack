import Link from "next/link";

export default function Home({ home }) {
  return (
    <header>
      <div className="flex flex-row bg-indigo-500 max-w-screen justify-between items-center h-20">
        <Link
          href="/"
          className="bg-indigo-100 bg-opacity-10 ml-5 rounded-full"
        >
          <img src="/logo.png" alt="MomoDev" className="w-20" />
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
            <Link href="/login">
              <li>Login</li>
            </Link>
          </ul>
        </div>
      </div>
    </header>
  );
}
