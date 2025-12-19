import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from 'lucide-react';
import "./Navbar.css";

const navItems = [
  { label: "Home", href: "/", isLink: true },
  { label: "Categories", href: "/categories", isLink: true },
  { label: "Search", href: "/search", isLink: true },
  { label: "About", href: "#about", isLink: false },
];

export const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <header className="navbar">
      <Link to="/" className="navbar-logo animate-fade-in">
        Localo
      </Link>

      <nav className="navbar-nav animate-fade-in animate-delay">
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
      </nav>

      <div className="navbar-buttons animate-fade-in animate-delay">
        {isLoggedIn ? (
          <User size={24} className="user-icon" onClick={handleLogout} />
        ) : (
          <>
            <Link to="/signin" className="btn btn-outline">
              Log In
            </Link>
            <Link to="/signup" className="btn btn-primary">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
};
