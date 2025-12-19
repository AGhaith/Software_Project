import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./BrandProfile.css";

export default function BrandProfile() {
  return (
    <div className="profile-container">
      <h1 className="profile-title">Brand Profile Management</h1>

      {/* Brand Basic Info */}
      <section className="profile-section">
        <h2>Brand Information</h2>

        <div className="form-group">
          <label>Brand Name</label>
          <input type="text" placeholder="Enter brand name" />
        </div>

        <div className="form-group">
          <label>Category</label>
          <input type="text" placeholder="e.g. Food, Clothing, Tech" />
        </div>
      </section>

      {/* Logo Upload */}
      <section className="profile-section">
        <h2>Brand Logo</h2>

        <div className="form-group">
          <input type="file" />
        </div>
      </section>

      {/* Description */}
      <section className="profile-section">
        <h2>Brand Description</h2>

        <div className="form-group">
          <textarea
            rows="5"
            placeholder="Describe your brand..."
          ></textarea>
        </div>
      </section>

      {/* Contact Details */}
      <section className="profile-section">
        <h2>Contact Details</h2>

        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="brand@email.com" />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input type="text" placeholder="+123 456 7890" />
        </div>

        <div className="form-group">
          <label>Address</label>
          <input type="text" placeholder="Brand address" />
        </div>
      </section>

      {/* Social & Website Links */}
      <section className="profile-section">
        <h2>Website & Social Links</h2>

        <div className="form-group">
          <label>Website</label>
          <input type="url" placeholder="https://yourbrand.com" />
        </div>

        <div className="form-group">
          <label>Instagram</label>
          <input type="url" placeholder="https://instagram.com/yourbrand" />
        </div>

        <div className="form-group">
          <label>Facebook</label>
          <input type="url" placeholder="https://facebook.com/yourbrand" />
        </div>
      </section>

      {/* Save Button */}
      <div className="save-section">
        <button className="save-btn">Save Changes</button>
      </div>
    </div>
  );
}
