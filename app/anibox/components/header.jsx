import Link from "next/link";

export default function Header() {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <Link href="/anibox">
        <p className="font-bold text-xl">AniBox</p>
      </Link>
    </nav>
  );
}
