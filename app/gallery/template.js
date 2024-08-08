import Header from "../components/header";
import Footer from "../components/footer";

export const metadata = {
  title: "Gallery",
};

export default function Gallery({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
