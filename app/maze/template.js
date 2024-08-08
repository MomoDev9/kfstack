import Header from "../components/header";
import Footer from "../components/footer";

export const metadata = {
  title: "Maze",
  description: "Maze Game using tables",
};

export default function Maze({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
