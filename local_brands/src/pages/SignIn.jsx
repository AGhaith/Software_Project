import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignIn.css";

export const SignIn = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const response = await fetch("http://localhost:5033/api/Auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        alert("Invalid email or password");
        setLoading(false);
        return;
      }

      const data = await response.json();

      // Save token
      localStorage.setItem("authToken", data.token);

      // Redirect
      navigate("/");

    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <div className="signin-logo">Localo</div>

        <h1 className="signin-title">Sign In</h1>

        {/* Email */}
        <div className="form-group">
          <label className="form-label">
            Email<span className="required-star">*</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="Example@gmail.com"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        {/* Password */}
        <div className="form-group">
          <label className="form-label">
            Password<span className="required-star">*</span>
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter Your Password"
            value={formData.password}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        {/* Options */}
        <div className="form-options">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="checkbox-input"
            />
            Remember Me
          </label>

          <Link to="/forgot-password" className="forgot-password-link">
            Forgot Password?
          </Link>
        </div>

        {/* Button */}
        <button
          onClick={handleSubmit}
          className="submit-button"
          disabled={loading}
        >
          {loading ? "Loading..." : "Next"}
        </button>

        {/* Social Login */}
        <div className="social-login-section">
          <p className="social-login-text">Other Sign In Options</p>
          <div className="social-buttons">
            <button
              onClick={() => handleSocialLogin("Google")}
              className="social-button google-button"
            >
              Google
            </button>

            <button
              onClick={() => handleSocialLogin("Facebook")}
              className="social-button facebook-button"
            >
              Facebook
            </button>

            <button
              onClick={() => handleSocialLogin("Apple")}
              className="social-button apple-button"
            >
              Apple
            </button>
          </div>
        </div>

        {/* Sign Up */}
        <div className="signup-link">
          Don’t have an account?{" "}
          <Link to="/signup" className="signup-link-text">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};
