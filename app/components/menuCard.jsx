import Link from "next/link";
import { tasks } from "./data";

export default function MenuCard({
  link,
  title,
  description,
  image,
  subtitle,
}) {
  return (
    <Link
      href={link}
      className="flex items-center bg-white border border-gray-200 rounded-lg shadow  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
    >
      <img
        className="object-cover h-48 w-full rounded-t-lg  md:rounded-none md:rounded-s-lg"
        src={image}
        alt={title}
      />
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        {subtitle ? (
          <h5 className="mb-2 font-bold tracking-tight text-gray-900 dark:text-white">
            {subtitle}
          </h5>
        ) : null}
        <span className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {description}.
        </span>
      </div>
    </Link>
  );
}
