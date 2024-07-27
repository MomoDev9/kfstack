import Image from "next/image";

export default function Home() {
  return (
    <header>
      <div className="flex flex-row bg-indigo-500 max-w-screen justify-between items-center">
        <div className="bg-indigo-100 bg-opacity-10 ml-5 rounded-full">
          <Image src="/logo.png" alt="MomoDev" className="w-20" />
        </div>
        <div className="text-white text-2xl mr-5">
          <ul className="flex flex-row gap-3">
            <li>Home</li>
            <li>About</li>
            <li>Login</li>
          </ul>
        </div>
      </div>
    </header>
  );
}
