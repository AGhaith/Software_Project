import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const callToActions = [
  {
    title: "Register a Brand",
    description:
      "Join a marketplace built for small businesses. Reach customers who value authentic, locally-made products.",
    image: "https://c.animaapp.com/mijkxqh6XSKe3B/img/ellipse-15.png",
  },
  {
    title: "Become a rider",
    description:
      "Enjoy flexibility, freedom and competitive earnings by delivering through Localo.",
    image: "https://c.animaapp.com/mijkxqh6XSKe3B/img/ellipse-13.png",
  },
  {
    title: "Join Customer Service",
    description:
      "Enjoy flexibility, freedom and competitive earnings by delivering through Localo.",
    image: "https://c.animaapp.com/mijkxqh6XSKe3B/img/ellipse-14.png",
  },
];

const footerLinks = [
  { label: "Terms and Conditions", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "FAQ", href: "#" },
  { label: "Contact Us", href: "#" },
];

export const Footer = ({ showCTA = true }) => {
  return (
    <>
      {showCTA && (
        <section className="cta-section">
          <img
            className="cta-vector"
            alt="Vector"
            src="https://c.animaapp.com/mijkxqh6XSKe3B/img/vector-4.svg"
          />

          <div className="cta-heading-container">
            <img
              className="cta-line cta-line-left"
              alt="Line"
              src="https://c.animaapp.com/mijkxqh6XSKe3B/img/line-3.svg"
            />
            <h2 className="cta-heading animate-fade-in animate-delay">
              Now You Can
          </h2>
          <img
            className="cta-line cta-line-right"
            alt="Line"
            src="https://c.animaapp.com/mijkxqh6XSKe3B/img/line-3.svg"
          />
        </div>

        <div className="cta-grid">
          {callToActions.map((cta, index) => (
            <div
              key={index}
              className="cta-item animate-fade-in"
              style={{ "--animation-delay": `${400 + index * 200}ms` }}
            >
              <img className="cta-image" alt={cta.title} src={cta.image} />

              <h3 className="cta-title">{cta.title}</h3>

              <p className="cta-description">{cta.description}</p>

              {cta.title === "Register a Brand" ? (
                <Link to="/register-brand" className="cta-button">
                  Register here
                </Link>
              ) : (
                <button className="cta-button">Register here</button>
              )}
            </div>
          ))}
        </div>
      </section>
      )}

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
    </>
  );
};
