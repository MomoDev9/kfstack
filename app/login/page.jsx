import Header from "../components/header";
import Footer from "../components/footer";
import Btn from "./btn";

export default function Login() {
  return (
    <>
      <Header />
      <main className="flex  justify-center items-center min-h-[85vh]">
        <div className="flex flex-col bg-indigo-300  shadow-indigo-700 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]">
          <h1 className="text-4xl font-bold text-white ml-5 mt-5">Login</h1>
          <form action="" className="flex flex-col p-5">
            <label htmlFor="username" className="mx-2 mt-5">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Your Username"
              className="h-10 w-full"
              autoComplete="username"
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
            />
            <div className="flex flex-row space-x-3 my-3">
              <Btn
                text="Facebook"
                col1="bg-indigo-600"
                col2="bg-amber-400"
                colHover="bg-amber-400"
                colText="text-white"
                colTextHover="text-white"
              />
              <Btn
                text="Google"
                col1="bg-amber-400"
                col2="bg-indigo-600"
                colHover="bg-indigo-700"
                colText="text-white"
              />
            </div>
            <Btn
              text="Login"
              col1="bg-indigo-500"
              col2="bg-gray-700"
              colHover="bg-indigo-700"
              colText="text-white"
            />
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
