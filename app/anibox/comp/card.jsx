import Link from "next/link";

export default function SearchCard({ item, title }) {
  const { id, coverImage, year, genres } = item;
  return (
    <Link href={`/anibox/${id}`} className="snap-start cursor-pointer w-56">
      <div className="w-56 h-80 overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
        <img
          className="block object-cover h-80 w-80"
          src={coverImage}
          alt={title}
        />
      </div>
      <div className="mt-4">
        <p className="text-white">{title}</p>
        <p className="text-sm text-gray-400 mt-1">
          {year ? year + " • " : ""}
          {genres[0]}
        </p>
      </div>
    </Link>
  );
}
