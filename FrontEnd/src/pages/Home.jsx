import React from "react";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { FeaturedBrands } from "../components/FeaturedBrands";
import { CategoryList } from "../components/CategoryList";
import { Footer } from "../components/Footer";
import "../App.css";

export const Home = () => {
  return (
    <div style={{
      background: '#fcfcfc',
      overflow: 'hidden',
      width: '100%',
      minWidth: '1431px',
      minHeight: '100vh',
      position: 'relative'
    }}>
      <Navbar />
      <Hero />
      <FeaturedBrands />
      <CategoryList />
      <Footer />
    </div>
  );
};
