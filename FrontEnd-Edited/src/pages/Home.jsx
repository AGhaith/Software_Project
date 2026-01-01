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
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    }}>
      <Navbar />
      <div style={{ flex: 1 }}>
        <Hero />
        <FeaturedBrands />
        <CategoryList />
      </div>
      <Footer showCTA={true} />
    </div>
  );
};
