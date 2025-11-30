import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";

export const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    try {
      setIsLoading(true);

      const response = await axios.post(
        "http://localhost:5033/api/Auth/customer/register",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          phoneNumber: formData.phoneNumber,
          address: formData.address
        }
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      alert("Registration successful! Please login.");
      navigate("/");
    } catch (err) {
      setError(err.response?.data || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        {/* Logo */}
        <div className="signup-logo">Localo</div>

        {/* Title */}
        <h1 className="signup-title">Sign Up</h1>

        {/* Full Name */}
        <div className="form-group">
          <label className="form-label">
            Full Name<span className="required-star">*</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        {/* Address */}
        <div className="form-group">
          <label className="form-label">
            Address<span className="required-star">*</span>
          </label>
          <input
            type="text"
            name="address"
            placeholder="123 Main St, City"
            value={formData.address}
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
            name="email"
            placeholder="example@gmail.com"
            value={formData.email}
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
              name="phoneNumber"
              placeholder="+20 _ _ _ _ _ _ _"
              value={formData.phoneNumber}
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
            name="password"
            placeholder="Enter your password"
            value={formData.password}
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
            name="confirmPassword"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        {/* Error */}
        {error && <div className="error-message">{error}</div>}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="submit-button"
          disabled={isLoading}
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </button>

        {/* Sign In Link */}
        <div className="signin-link">
          Already have an account?{" "}
          <Link to="/signin" className="signin-link-text">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};
