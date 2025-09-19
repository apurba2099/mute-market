import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Navigation items
  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/services", label: "Services" },
    { path: "/portfolio", label: "Portfolio" },
    { path: "/blog", label: "Blog" },
    { path: "/contact", label: "Contact" },
  ];

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close menu on link click
  const handleNavClick = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          {/* Logo */}
          <div className="navbar-logo">
            <NavLink to="/" onClick={() => handleNavClick("/")}>
              <div className="logo-content">
                <span className="logo-text">MUTE</span>
                <span className="logo-subtext">MARKETING</span>
              </div>
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <ul className="navbar-menu">
            {navItems.map((item) => (
              <li key={item.path} className="navbar-item">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `navbar-link ${isActive ? "active" : ""}`
                  }
                  onClick={() => handleNavClick(item.path)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <div className="navbar-cta">
            <NavLink
              to="/contact"
              className="cta-button"
              onClick={() => handleNavClick("/contact")}
            >
              Get Started
            </NavLink>
          </div>

          {/* Mobile Toggle */}
          <div className="mobile-toggle" onClick={toggleMobileMenu}>
            <span className={`bar ${isMobileMenuOpen ? "active" : ""}`}></span>
            <span className={`bar ${isMobileMenuOpen ? "active" : ""}`}></span>
            <span className={`bar ${isMobileMenuOpen ? "active" : ""}`}></span>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? "active" : ""}`}>
          <ul className="mobile-menu-list">
            {navItems.map((item) => (
              <li key={item.path} className="mobile-menu-item">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `mobile-menu-link ${isActive ? "active" : ""}`
                  }
                  onClick={() => handleNavClick(item.path)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li className="mobile-menu-item">
              <NavLink
                to="/contact"
                className="mobile-cta-button"
                onClick={() => handleNavClick("/contact")}
              >
                Get Started
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="mobile-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </>
  );
}

export default Navbar;
