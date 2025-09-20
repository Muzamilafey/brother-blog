import React, { useState } from "react";
import "./Navbar.css";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [blogDropdown, setBlogDropdown] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="logo">
          <img src={logo} alt="Muzamilafey Logo" />
          <span className="brand-name">Muzamilafey</span>
        </div>

        {/* Hamburger for mobile */}
        <div
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>

        {/* Navigation Links */}
        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>

          {/* Blogs Dropdown */}
          <li
            className="dropdown"
            onMouseEnter={() => setBlogDropdown(true)}
            onMouseLeave={() => setBlogDropdown(false)}
            onClick={() => setBlogDropdown(!blogDropdown)} // toggle for mobile
          >
            <a href="/blogs">
              Blogs <span className="arrow">▾</span>
            </a>
            <ul className={`dropdown-menu ${blogDropdown ? "show" : ""}`}>
              <li><a href="/blogs?category=agriculture">Agriculture</a></li>
              <li><a href="/blogs?category=technology">Technology</a></li>
              <li><a href="/blogs?category=education">Education</a></li>
            </ul>
          </li>

          <li><a href="/contact">Contact</a></li>

          {/* NEW Donate Link */}
          <li><a href="/donate">Donate</a></li>

          <li><a href="/admin/login">Admin</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
