import { Suspense } from "react";
import Header from "./comp/head";
import Foot from "./comp/foot";
import Footer from "../components/footer";
import { Suspense } from "react";

export const metadata = {
  title: {
    default: "AniBox",
  },
};
export default function anibox({ children }) {
  return (
    <section>
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
        {children}
        <Foot />
        <Footer />
      </Suspense>
    </section>
  );
}
