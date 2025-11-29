import React from "react";
import { Search } from "lucide-react";
import "./Hero.css";

export const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-gradient-orange" />
      <div className="hero-gradient-teal" />
      <div className="hero-gradient-purple" />

      <div className="hero-badge-container animate-fade-in animate-delay">
        <div className="hero-badge">
          <img
            className="hero-badge-icon"
            alt="Group"
            src="https://c.animaapp.com/mijkxqh6XSKe3B/img/group-2.png"
          />
          <div className="hero-badge-text">
            Trusted by +5000 Users and Brands
          </div>
        </div>
      </div>

      <h1 className="hero-title animate-fade-in animate-delay">
        Discover &amp; Order the Products you love.
      </h1>

      <p className="hero-subtitle animate-fade-in animate-delay">
        Support your community by shopping directly from talented local makers,
        small businesses, and artisans.
      </p>

      <div className="hero-search-container animate-fade-in animate-delay">
        <input
          type="text"
          placeholder="Search for Products, Brands, or Categories"
          className="hero-search-input"
        />
        <button className="hero-search-button">
          <Search className="hero-search-icon" />
        </button>
      </div>
    </section>
  );
};
