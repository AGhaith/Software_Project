import React from "react";
import "./Footer.css";

export const FooterLinks = () => {
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