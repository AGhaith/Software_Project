import axios from 'axios';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";

export const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Name: '',
    Address: '',
    Email: '',
    PhoneNumber: '',
    Password: '',
    ConfirmPassword: '',
    ProfilePicture: null
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      ProfilePicture: file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Basic validation (unchanged)
    if (formData.Password !== formData.ConfirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (formData.Password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      setIsLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append('Name', formData.Name);
      formDataToSend.append('Email', formData.Email);
      formDataToSend.append('Password', formData.Password);
      formDataToSend.append('ConfirmPassword', formData.ConfirmPassword);
      formDataToSend.append('PhoneNumber', formData.PhoneNumber);
      formDataToSend.append('Address', formData.Address);
      if (formData.ProfilePicture) {
        formDataToSend.append('ProfilePicture', formData.ProfilePicture);
      }

      const response = await axios.post('http://localhost:5033/api/Auth/customer/register', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Registration response:', response.data);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', 'Customer'); // Set role for customer
      }
      alert('Registration successful! Please login.');
      navigate('/');
    } catch (err) {
      // Improved error handling: display specific backend errors
      const errorData = err.response?.data;
      if (Array.isArray(errorData)) {
        setError(errorData.join(', ')); // Join validation errors
      } else if (errorData?.title) {
        setError(errorData.title);
      } else {
        setError('Registration failed. Please try again.');
      }
      console.error('Registration error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      
      {/* Card */}
      <div className="signup-card">
        {/* Logo */}
        <Link to="/" className="signup-logo">
          Localo
        </Link>

        {/* Title */}
        <h1 className="signup-title">
          Sign Up
        </h1>

        {/* First Name */}
        <div className="form-group">
          <label className="form-label">
            Full Name<span className="required-star">*</span>
          </label>
          <input
            type="text"
            name="Name"
            placeholder="Enter Your Full Name"
            value={formData.Name}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        {/* Last Name */}
        <div className="form-group">
          <label className="form-label">
            Address<span className="required-star">*</span>
          </label>
          <input
            type="text"
            name="Address"
            placeholder="123 Main St, City, Country"
            value={formData.Address}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        {/* Email */}
        <div className="form-group">
          <label className="form-label">
            Email<span className="required-star">*</span>
          </label>
          <input
            type="email"
            name="Email"
            placeholder="Example@gmail.com"
            value={formData.Email}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        {/* Phone Number */}
        <div className="form-group">
          <label className="form-label">
            Phone Number<span className="required-star">*</span>
          </label>
          <div className="phone-input-container">
            <div className="phone-prefix">
              <img 
                src="https://flagcdn.com/w40/eg.png" 
                alt="Egypt flag"
                className="flag-icon"
              />
              <span className="dropdown-arrow">▼</span>
            </div>
            <input
              type="tel"
              name="PhoneNumber"
              placeholder="+20_ _ _ _ _"
              value={formData.PhoneNumber}
              onChange={handleChange}
              className="phone-input"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className="form-group">
          <label className="form-label">
            Password<span className="required-star">*</span>
          </label>
          <input
            type="password"
            name="Password"
            placeholder="Enter your password"
            value={formData.Password}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        {/* Confirm Password */}
        <div className="form-group">
          <label className="form-label">
            Confirm Password<span className="required-star">*</span>
          </label>
          <input
            type="password"
            name="ConfirmPassword"
            placeholder="Confirm your password"
            value={formData.ConfirmPassword}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        {/* Profile Picture */}
        <div className="form-group">
          <label className="form-label">
            Profile Picture
          </label>
          <input
            type="file"
            name="ProfilePicture"
            accept="image/*"
            onChange={handleFileChange}
            className="form-input"
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="submit-button"
          disabled={isLoading}
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </button>

        {/* Sign In Link */}
        <div className="signin-link">
          Already have an account?{' '}
          <Link 
            to="/signin" 
            className="signin-link-text"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};
