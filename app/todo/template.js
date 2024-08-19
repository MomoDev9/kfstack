import { Poppins } from "next/font/google";

import Footer from "../components/footer";
import Header from "../components/header";

const poppins = Poppins({
  weight: ["400", "600", "800"],
  subsets: ["latin"],
});

export default function blog({ children }) {
  return (
    <>
      <Header home={"/"} />
      <main className={poppins.className}>{children}</main>
      <Footer />
    </>
  );
}
