import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Categories from "../components/CategoryList";
import FeaturedBrands from "../components/FeaturedBrands";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Categories />
      <FeaturedBrands />
      <Footer />
    </>
  );
}