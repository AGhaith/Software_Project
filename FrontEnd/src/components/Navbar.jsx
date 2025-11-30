import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Categories", href: "#categories" },
  { label: "Search", href: "#search" },
  { label: "About", href: "#about" },
];

export const Navbar = () => {
  return (
    <header className="navbar">
      <Link to="/" className="navbar-logo animate-fade-in">
        Localo
      </Link>

      <nav className="navbar-nav animate-fade-in animate-delay">
        {navItems.map((item, index) => (
          <a key={index} href={item.href} className="navbar-link">
            {item.label}
          </a>
        ))}
      </nav>

      <div className="navbar-buttons animate-fade-in animate-delay">
        <Link to="/signin" className="btn btn-outline">
          Log In
        </Link>
        <Link to="/signup" className="btn btn-primary">
          Sign Up
        </Link>
      </div>
    </header>
  );
};
