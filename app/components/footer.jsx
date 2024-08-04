export default function Footer() {
  return (
    <div className="flex text-lg text-black dark:text-white mx-auto ">
      <div className="mx-auto ">
        &copy; {new Date().getFullYear()} This is tasks from{" "}
        <a
          href="https://github.com/MomoDev9/retail-portofolio"
          target="__blank"
          className="hover:underline group ml-1 duration-500"
        >
          KelasFullstack
        </a>{" "}
        created with 🧡 by{" "}
        <a
          href="https://momodev.vercel.app"
          target="__blank"
          className=" font-medium ml-1 hover:underline group"
        >
          <span className="text-blue-500 group-hover:text-pink-500">Momo</span>
          <span className="text-pink-500 group-hover:text-blue-500">Dev</span>
        </a>
      </div>
    </div>
  );
}
