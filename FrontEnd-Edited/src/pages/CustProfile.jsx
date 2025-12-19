import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CustProfile.css";

const navItems = [
  { label: "Home", href: "/", isLink: true },
  { label: "Categories", href: "/categories", isLink: true },
  { label: "Search", href: "/search", isLink: true },
  { label: "About", href: "#about", isLink: false },
];

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        Localo
      </Link>

      <div className="navbar-nav">
        {navItems.map((item, index) =>
          item.isLink ? (
            <Link key={index} to={item.href} className="navbar-link">
              {item.label}
            </Link>
          ) : (
            <a key={index} href={item.href} className="navbar-link">
              {item.label}
            </a>
          )
        )}
      </div>

      <div className="navbar-auth">
        {isLoggedIn ? (
          <button onClick={handleLogout} className="navbar-profile-btn">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </button>
        ) : (
          <Link to="/signin" className="navbar-profile-btn" style={{ color: '#ff8500' }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </Link>
        )}
      </div>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-wrapper">
        <div className="footer-content">
          <div className="footer-links">
            <a href="#contact" className="footer-link">Contact Us</a>
            <a href="#privacy" className="footer-link">Privacy Policy</a>
            <a href="#terms" className="footer-link">Terms and Conditions</a>
          </div>

          <div className="footer-social-section">
            <div className="footer-follow">Follow Us On</div>
            <div className="footer-social">
              <img
                alt="Social Media"
                src="https://c.animaapp.com/mjca9475OOuFH8/img/group-6.png"
              />
            </div>
          </div>

          <div className="footer-copyright">©2025 localo.com</div>
        </div>
      </div>
    </footer>
  );
};

const ProfileField = ({ icon, value, type = "text", placeholder, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [fieldValue, setFieldValue] = useState(value);
  const [tempIcon, setTempIcon] = useState(icon);

  const handleSave = () => {
    setIsEditing(false);
    console.log(`Saving ${type}:`, fieldValue);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFieldValue(value);
    setTempIcon(icon); // Reset icon to original
  };

  return (
    <div className="profile-field">
      <img 
        className="profile-field-icon" 
        alt={type} 
        src={tempIcon} 
        onError={(e) => {
          e.target.style.display = 'none';
          e.target.nextSibling.style.marginLeft = '0';
        }}
      />
      {isEditing ? (
        <div className="profile-field-edit-container">
          <input
            type={type}
            value={fieldValue}
            onChange={(e) => setFieldValue(e.target.value)}
            className="profile-field-input"
            placeholder={placeholder}
          />
          <div className="profile-field-edit-actions">
            <button onClick={handleSave} className="profile-field-save">
              <img
                alt="Save"
                src="https://c.animaapp.com/mjca9475OOuFH8/img/material-symbols-check.svg"
              />
            </button>
            <button onClick={handleCancel} className="profile-field-cancel">
              <img
                alt="Cancel"
                src="https://c.animaapp.com/mjca9475OOuFH8/img/material-symbols-close.svg"
              />
            </button>
          </div>
        </div>
      ) : (
        <>
          <span className="profile-field-text">{fieldValue}</span>
          <button 
            onClick={() => setIsEditing(true)} 
            className="profile-field-edit-btn"
          >
            <img
              alt="Edit"
              src="https://c.animaapp.com/mjca9475OOuFH8/img/uil-edit.svg"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentNode.textContent = 'Edit';
              }}
            />
          </button>
        </>
      )}
    </div>
  );
};

const ProfileInfo = () => {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState("https://c.animaapp.com/mjca9475OOuFH8/img/unsplash-mrvp1c59wko.png");
  const [name, setName] = useState("Mohamed Mostafa");

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteAvatar = () => {
    if (window.confirm("Are you sure you want to delete your profile picture?")) {
      setAvatar("https://via.placeholder.com/250x250/ff8500/ffffff?text=No+Photo");
    }
  };

  const handleApplyChanges = () => {
    alert("Changes applied successfully!");
  };

  return (
    <div className="profile-content">
      <div className="profile-left">
        <div className="profile-update-card">
          <p className="profile-update-text">
            Please, update your information carefully
          </p>
          <button onClick={handleApplyChanges} className="profile-apply-btn">
            Apply Changes
          </button>
        </div>

        <div className="profile-joined">
          <div className="profile-joined-label">Joined since</div>
          <div className="profile-joined-date">15 April, 2020</div>
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

      <div className="profile-right">
        <div className="profile-details">
          <h2 className="profile-title">Personal Information</h2>
          
          <div className="profile-avatar-container">
            <div 
              className="profile-avatar"
              style={{ backgroundImage: `url(${avatar})` }}
            />
            <div className="profile-info-side">
              <div className="profile-name">{name}</div>
              <div className="profile-avatar-buttons">
                <label className="profile-upload-btn">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="profile-file-input"
                  />
                  Upload New Picture
                </label>
                <button onClick={handleDeleteAvatar} className="profile-delete-btn">
                  Delete
                </button>
              </div>
            </div>
          </div>

          <div className="profile-fields-container">
            <div className="profile-fields">
              <ProfileField
                icon="https://c.animaapp.com/mjca9475OOuFH8/img/icon-park-solid-edit-name.svg"
                value={name}
                placeholder="Enter your name"
              />
              
              <ProfileField
                icon="https://c.animaapp.com/mjca9475OOuFH8/img/material-symbols-mail.svg"
                value="mo.mostafa1115@gmail.com"
                type="email"
                placeholder="Enter your email"
              />
              
              <ProfileField
                icon="https://c.animaapp.com/mjca9475OOuFH8/img/mdi-location.svg"
                value="6th of October City, Giza, Egypt"
                placeholder="Enter your location"
              />
              
              <ProfileField
                icon="https://c.animaapp.com/mjca9475OOuFH8/img/famicons-call-sharp.svg"
                value="+2011192999"
                type="tel"
                placeholder="Enter your phone number"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CustProfile = () => {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  return (
    <div className="customer-profile">
      <Navbar />
      
      <div className="profile-container">
        <header className="profile-header">
          <h1 className="welcome-text">Welcome, Mohamed</h1>
          <div className="date-text">{formattedDate}</div>
        </header>

        <ProfileInfo />
      </div>
      
      <Footer />
    </div>
  );
};

export default CustProfile;