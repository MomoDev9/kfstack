import Link from "next/link";
import Header from "./components/header";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between">
        <Link href="/gallery">
          <img src="https://cdn.icon-icons.com/icons2/2444/PNG/512/galery_image_photo_picture_icon_148669.png" />
          gallery
        </Link>
        <Link href="/blog">
          <img src="http://blog.sribu.com/wp-content/uploads/2014/05/blog-icon.png" />
          blog
        </Link>
        <Link href="/maze">
          <img src="https://imghost.net/ib/tvJXz73VJdohtfo_1723066424.png" />
          maze
        </Link>
        <Link href="/blog">
          <img src="https://imghost.net/ib/hm8czNy2fokUXba_1723066155.jpg" />
          anibox
        </Link>
      </main>
    </>
  );
}
