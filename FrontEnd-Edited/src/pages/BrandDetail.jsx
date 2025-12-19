import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./BrandDetail.css";

export default function BrandDetail() {
  const categories = ["Food", "Organic", "Local Crafts"];

  return (
    <div className="brand-detail-container">
      {/* Header */}
      <div className="brand-header">
        <img
          src="https://via.placeholder.com/120"
          alt="Brand Logo"
          className="brand-logo"
        />
        <div>
          <h1 className="brand-name">Green Valley Market</h1>
          <p className="brand-tagline">Supporting local, living organic</p>
        </div>
      </div>

      {/* Description */}
      <section className="brand-section">
        <h2>About the Brand</h2>
        <p>
          Green Valley Market is a locally owned brand focused on delivering
          fresh, organic, and sustainable food products sourced directly from
          nearby farms. We believe in community-driven commerce and quality
          ingredients.
        </p>
      </section>

      {/* Categories */}
      <section className="brand-section">
        <h2>Categories</h2>
        <div className="category-tags">
          {categories.map((cat, index) => (
            <span key={index} className="category-tag">
              {cat}
            </span>
          ))}
        </div>
      </section>

      {/* Contact Info */}
      <section className="brand-section">
        <h2>Contact Information</h2>
        <p><strong>Email:</strong> contact@greenvalley.com</p>
        <p><strong>Phone:</strong> +123 456 7890</p>
        <p><strong>Website:</strong> www.greenvalleymarket.com</p>
      </section>

      {/* Address */}
      <section className="brand-section">
        <h2>Location</h2>
        <p>123 Local Street, City Name, Country</p>
      </section>

      {/* Social Media */}
      <section className="brand-section">
        <h2>Follow Us</h2>
        <div className="social-links">
          <a href="#">Instagram</a>
          <a href="#">Facebook</a>
          <a href="#">Twitter</a>
        </div>
      </section>

      {/* Reviews (Future) */}
      <section className="brand-section reviews-section">
        <h2>Customer Reviews</h2>
        <p className="coming-soon">⭐ Reviews coming soon</p>
      </section>
    </div>
  );
}
