import Header from "./comp/head";
import Foot from "./comp/foot";
import Footer from "../components/footer";

export const metadata = {
  title: {
    default: "AniBox",
    template: "%s - AniBox",
  },
};
export default function anibox({ children }) {
  return (
    <section>
      <Header />
      {children}
      <Foot />
      <Footer />
    </section>
  );
}
