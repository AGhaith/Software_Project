import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./index.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Categories from "./components/CategoryList";
import FeaturedBrands from "./components/FeaturedBrands";
import Footer from "./components/Footer";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function HomePage() {
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

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}