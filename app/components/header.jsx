export default function Home() {
  return (
    <header>
      <div className="flex flex-row bg-indigo-500 w-screen justify-between items-center mt-1">
        <div className="bg-indigo-100 ml-5 rounded-full">
          <img src="/logo.png" alt="MomoDev" />
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
