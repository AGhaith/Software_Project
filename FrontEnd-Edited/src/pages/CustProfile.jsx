import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import axios from "axios";
import "./CustProfile.css";

const API_BASE_URL = "http://localhost:5033/api/Customers";

const navItems = [
  { label: "Home", href: "/", isLink: true },
  { label: "Categories", href: "/categories", isLink: true },
  { label: "Search", href: "/search", isLink: true },
  { label: "About", href: "#about", isLink: false },
];

const ProfileField = ({ icon, value, type = "text", placeholder, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [fieldValue, setFieldValue] = useState(value || "");

  const handleSave = () => {
    onSave(fieldValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFieldValue(value);
    setIsEditing(false);
  };

  useEffect(() => {
    setFieldValue(value);
  }, [value]);

  return (
    <div className="profile-field">
      <img 
        className="profile-field-icon" 
        alt="field" 
        src={icon}
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
          <span className="profile-field-text">{fieldValue || placeholder}</span>
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

const CustProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "Mohamed Mostafa",
    email: "mo.mostafa1115@gmail.com",
    phone: "+2011192999",
    address: "6th of October City, Giza, Egypt",
    profileImage: "https://c.animaapp.com/mjca9475OOuFH8/img/unsplash-mrvp1c59wko.png"
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // In a real app, you'd get this from your auth context or local storage
  const [currentUserId, setCurrentUserId] = useState("SAMPLE_USER_ID");

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        // In a real app, you'd fetch the current user's data
        // const response = await axios.get(`${API_BASE_URL}/${currentUserId}`);
        // setUser(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load user data. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [currentUserId]);

  const handleUpdateField = async (field, value) => {
    try {
      // In a real app, you'd make an API call to update the user
      // await axios.put(`${API_BASE_URL}/update/${currentUserId}`, {
      //   ...user,
      //   [field]: value
      // });
      
      // Update local state
      setUser(prev => ({ ...prev, [field]: value }));
      console.log(`Updated ${field} to:`, value);
    } catch (err) {
      console.error(`Error updating ${field}:`, err);
      alert(`Failed to update ${field}. Please try again.`);
    }
  };

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
        setUser(prev => ({ ...prev, profileImage: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteAvatar = () => {
    if (window.confirm("Are you sure you want to delete your profile picture?")) {
      setUser(prev => ({ ...prev, profileImage: "https://via.placeholder.com/250x250/ff8500/ffffff?text=No+Photo" }));
    }
  };

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  if (isLoading) {
    return <div className="loading">Loading profile...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="customer-profile">
      <Navbar />
      
      <div className="profile-container">
        <header className="profile-header">
          <h1 className="welcome-text">Welcome, {user.name.split(' ')[0]}</h1>
          <div className="date-text">{formattedDate}</div>
        </header>

        <div className="profile-content">

          {/* Main Content */}
          <div className="profile-right">
            <div className="profile-details">
              <h2 className="profile-title">Personal Information</h2>
              
              <div className="profile-avatar-container">
                <div 
                  className="profile-avatar"
                  style={{ backgroundImage: `url(${user.profileImage})` }}
                />
                <div className="profile-info-side">
                  <div className="profile-name">{user.name}</div>
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
                    value={user.name}
                    placeholder="Enter your name"
                    onSave={(value) => handleUpdateField('name', value)}
                  />
                  
                  <ProfileField
                    icon="https://c.animaapp.com/mjca9475OOuFH8/img/material-symbols-mail.svg"
                    value={user.email}
                    type="email"
                    placeholder="Enter your email"
                    onSave={(value) => handleUpdateField('email', value)}
                  />
                  
                  <ProfileField
                    icon="https://c.animaapp.com/mjca9475OOuFH8/img/mdi-location.svg"
                    value={user.address}
                    placeholder="Enter your location"
                    onSave={(value) => handleUpdateField('address', value)}
                  />
                  
                  <ProfileField
                    icon="https://c.animaapp.com/mjca9475OOuFH8/img/famicons-call-sharp.svg"
                    value={user.phone}
                    type="tel"
                    placeholder="Enter your phone number"
                    onSave={(value) => handleUpdateField('phone', value)}
                  />
                </div>

                {/* Left Sidebar */}
                <div className="profile-left">
                  <div className="profile-update-card">
                    <p className="profile-update-text">
                      Please, update your information carefully
                    </p>
                    <button 
                      className="profile-apply-btn"
                      onClick={() => alert("Changes saved successfully!")}
                    >
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
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer showCTA={false} />
    </div>
  );
};

export default CustProfile;