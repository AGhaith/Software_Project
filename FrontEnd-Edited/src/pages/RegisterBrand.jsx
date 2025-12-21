import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RegisterBrand.css';

export const RegisterBrand = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    description: '',
    phoneNumber: '',
    address: '',
    websiteUrl: '',
    logo: null
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      logo: file
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Brand name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Brand name must be at least 2 characters long';
    } else if (formData.name.trim().length > 50) {
      newErrors.name = 'Brand name must not exceed 50 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else {
      if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters long';
      } else if (!/[A-Z]/.test(formData.password)) {
        newErrors.password = 'Password must contain at least one uppercase letter';
      } else if (!/[a-z]/.test(formData.password)) {
        newErrors.password = 'Password must contain at least one lowercase letter';
      } else if (!/\d/.test(formData.password)) {
        newErrors.password = 'Password must contain at least one digit';
      } else if (!/[\W_]/.test(formData.password)) {
        newErrors.password = 'Password must contain at least one special character';
      }
    }
    
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (formData.description && formData.description.length > 300) {
      newErrors.description = 'Description must not exceed 300 characters';
    }
    
    if (formData.phoneNumber && formData.phoneNumber.trim() && !/^\+?\d{10,15}$/.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = 'Phone number must be valid and contain 10–15 digits';
    }
    
    // Logo is optional file, no validation needed here
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('Name', formData.name);
      formDataToSend.append('Email', formData.email);
      formDataToSend.append('Password', formData.password);
      formDataToSend.append('ConfirmPassword', formData.confirmPassword);
      formDataToSend.append('Description', formData.description || '');
      formDataToSend.append('PhoneNumber', formData.phoneNumber || '');
      formDataToSend.append('Address', formData.address || '');
      formDataToSend.append('WebsiteUrl', formData.websiteUrl || '');
      if (formData.logo) {
        formDataToSend.append('Logo', formData.logo);
      }

      const response = await axios.post('http://localhost:5033/api/Auth/brand/register', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Registration response:', response.data);
      
      // Save token to local storage (handle both Token and token for compatibility)
      const token = response.data.Token || response.data.token;
      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('role', 'Brand');
      }
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        description: '',
        phoneNumber: '',
        address: '',
        websiteUrl: '',
        logo: null
      });
      
      // Show success message
      const successMessage = response.data.Message || response.data.message || 'Brand registered successfully!';
      alert(successMessage);
      
      // Redirect to home page
      navigate('/');
    } catch (error) {
      console.error('Error submitting form:', error);
      
      // Handle different error response formats
      let errorMessage = 'Failed to register brand. Please try again.';
      
      if (error.response) {
        const responseData = error.response.data;
        
        // Backend returns validation errors as an array for BadRequest (400)
        if (Array.isArray(responseData)) {
          errorMessage = responseData.join(', ');
        } 
        // Handle string error messages
        else if (typeof responseData === 'string') {
          errorMessage = responseData;
        }
        // Handle object with error message
        else if (responseData && (responseData.message || responseData.Message || responseData.title)) {
          errorMessage = responseData.message || responseData.Message || responseData.title;
        }
      } else if (error.request) {
        errorMessage = 'Network error. Please check your connection and try again.';
      }
      
      setErrors({ 
        submit: errorMessage
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-brand-container">
      <div className="register-brand-wrapper">
        <div className="register-brand-card">
          <Link to="/" className="register-brand-logo">
            Localo
          </Link>
          
          <h1 className="register-brand-title">
            Register Your Brand
          </h1>

          {errors.submit && (
            <div className="register-brand-error">
              {errors.submit}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="register-brand-form-group">
              <label htmlFor="name">
                Brand Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your brand name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'error' : ''}
              />
              {errors.name && (
                <div className="error-message">{errors.name}</div>
              )}
            </div>

            <div className="register-brand-form-group">
              <label htmlFor="email">
                Email <span className="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="brand@example.com"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && (
                <div className="error-message">{errors.email}</div>
              )}
            </div>

            <div className="register-brand-form-group">
              <label htmlFor="password">
                Password <span className="required">*</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password (min 8 chars, uppercase, lowercase, digit, special char)"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
              />
              {errors.password && (
                <div className="error-message">{errors.password}</div>
              )}
            </div>

            <div className="register-brand-form-group">
              <label htmlFor="confirmPassword">
                Confirm Password <span className="required">*</span>
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? 'error' : ''}
              />
              {errors.confirmPassword && (
                <div className="error-message">{errors.confirmPassword}</div>
              )}
            </div>

            <div className="register-brand-form-group">
              <label htmlFor="description">
                Brand Description
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Tell us about your brand, products, and what makes you unique..."
                value={formData.description}
                onChange={handleChange}
                className={errors.description ? 'error' : ''}
              />
              {errors.description && (
                <div className="error-message">{errors.description}</div>
              )}
            </div>

            <div className="register-brand-form-group">
              <label htmlFor="phoneNumber">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="+201234567890"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={errors.phoneNumber ? 'error' : ''}
              />
              {errors.phoneNumber && (
                <div className="error-message">{errors.phoneNumber}</div>
              )}
            </div>

            <div className="register-brand-form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Enter your business address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div className="register-brand-form-group">
              <label htmlFor="websiteUrl">Website URL</label>
              <input
                type="url"
                id="websiteUrl"
                name="websiteUrl"
                placeholder="https://yourwebsite.com"
                value={formData.websiteUrl}
                onChange={handleChange}
              />
            </div>

            <div className="register-brand-form-group">
              <label htmlFor="logo">Logo</label>
              <input
                type="file"
                id="logo"
                name="logo"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>

            <button 
              type="submit" 
              className="register-brand-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Registering...' : 'Register Brand'}
            </button>
          </form>

          <div className="register-brand-footer">
            <p>
              Already have a brand account?{' '}
              <Link to="/brand-login">Sign in here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};