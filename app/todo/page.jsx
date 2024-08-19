import NoSession from "./component/noSession";

export default function Home() {
  return (
    <div className="flex min-h-[85vh] w-screen bg-gradient-to-b items-center justify-center from-teal-300  to-blue-500">
      <div className="flex flex-col bg-white p-10 rounded-lg">
        <h1 className="text-3xl font-extrabold text-black mb-6">
          Aplikasi Todo List
        </h1>
        <NoSession />
      </div>
    </div>
  );
}
