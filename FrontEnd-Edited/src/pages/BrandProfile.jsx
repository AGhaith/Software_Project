import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import "./BrandProfile.css";

export default function BrandProfile() {
  const navigate = useNavigate();
  const [logo, setLogo] = useState("https://c.animaapp.com/mjca9475OOuFH8/img/unsplash-mrvp1c59wko.png");
  const [brandName, setBrandName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [website, setWebsite] = useState("");
  const [categories, setCategories] = useState("");

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLogo(url);
    }
  };

  const handleDeleteLogo = () => {
    setLogo("https://c.animaapp.com/mjca9475OOuFH8/img/unsplash-mrvp1c59wko.png");
  };

  const handleApplyChanges = () => {
    // Local state changes only
    alert('Changes would be saved here in a real application');
  };

  const handleLogout = () => {
    // Clear any user data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    
    // Redirect to home page
    navigate('/');
  };

  return (
    <div className="brand-profile">
      <Navbar />
      
      <div className="profile-container">
        <div className="profile-navigation">
          <Link to={`/brand-detail`} className="nav-link">View Brand</Link>
          <Link to="/category-management" className="nav-link">Manage Categories</Link>
        </div>
        <div className="profile-content">
          <div className="profile-sections">
            <div className="profile-section">
              <h2>Brand Logo & Name</h2>
              <div className="logo-name-container">
                <div 
                  className="profile-logo"
                  style={{ backgroundImage: `url(${logo})` }}
                />
                <div className="name-upload">
                  <input
                    type="text"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    placeholder="Enter brand name"
                    className="brand-name-input"
                  />
                  <div className="upload-buttons">
                    <label className="profile-upload-btn">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="profile-file-input"
                      />
                      Upload Logo
                    </label>
                    <button onClick={handleDeleteLogo} className="profile-delete-btn">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="profile-section">
              <h2>Basic Information</h2>
              <div className="section-fields">
                <div className="profile-field">
                  <label>Category</label>
                  <input 
                    type="text" 
                    value={categories}
                    onChange={(e) => setCategories(e.target.value)}
                    placeholder="e.g. Food, Clothing, Tech" 
                  />
                </div>
                <div className="profile-field">
                  <label>Brand Description</label>
                  <textarea 
                    rows="4" 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your brand..." 
                  />
                </div>
              </div>
            </div>

            <div className="profile-section">
              <h2>Contact Details</h2>
              <div className="section-fields">
                <div className="profile-field">
                  <label>Email</label>
                  <input
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="brand@email.com" 
                  />
                </div>
                <div className="profile-field">
                  <label>Phone</label>
                  <input 
                    type="text" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+123 456 7890" 
                  />
                </div>
                <div className="profile-field">
                  <label>Address</label>
                  <input 
                    type="text" 
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Brand address" 
                  />
                </div>
                <div className="profile-field">
                  <label>Website</label>
                  <input 
                    type="url" 
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://yourbrand.com" 
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="profile-buttons">
            <div className="profile-update-card">
              <p className="profile-update-text">
                Update your brand information carefully
              </p>
              <button onClick={handleApplyChanges} className="profile-apply-btn">
                Apply Changes
              </button>
            </div>

            <button onClick={handleLogout} className="profile-logout-btn">
              <span className="profile-logout-text">Log Out</span>
              <img
                className="profile-logout-icon"
                alt="Logout"
                src="https://c.animaapp.com/mjca9475OOuFH8/img/ant-design-logout-outlined.svg"
              />
            </button>
          </div>
        </div>
      </div>
      
      <Footer showCTA={false} />
    </div>
  );
}
