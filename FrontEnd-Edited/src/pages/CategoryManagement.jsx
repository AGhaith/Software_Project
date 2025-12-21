import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import "./CategoryManagement.css";

export default function CategoryManagement() {
  const currentCategories = ["Food", "Organic", "Local Crafts"];
  const availableCategories = [
    "Clothing",
    "Technology",
    "Beauty",
    "Home Decor",
    "Accessories",
  ];

  return (
    <div className="category-management">
      <Navbar />
      <div className="category-container">
      <h1 className="category-title">Category Management</h1>

      {/* Current Categories */}
      <section className="category-section">
        <h2>Your Categories</h2>

        <div className="category-list">
          {currentCategories.map((cat, index) => (
            <div key={index} className="category-item">
              <span>{cat}</span>
              <button className="remove-btn">Remove</button>
            </div>
          ))}
        </div>
      </section>

      {/* Add Category */}
      <section className="category-section">
        <h2>Add Category</h2>

        <div className="add-category">
          <select>
            <option>Select a category</option>
            {availableCategories.map((cat, index) => (
              <option key={index}>{cat}</option>
            ))}
          </select>

          <button className="add-btn">Add</button>
        </div>
      </section>

      {/* Browse Categories */}
      <section className="category-section">
        <h2>Browse Available Categories</h2>

        <div className="browse-grid">
          {availableCategories.map((cat, index) => (
            <div key={index} className="browse-card">
              {cat}
            </div>
          ))}
        </div>
      </section>
      </div>
      <Footer showCTA={false} />
    </div>
  );
}
