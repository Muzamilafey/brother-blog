import React, { useState } from "react";
import { Link } from "react-router-dom";
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
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>

          {/* Blogs Dropdown */}
          <li
            className="dropdown"
            onMouseEnter={() => setBlogDropdown(true)}
            onMouseLeave={() => setBlogDropdown(false)}
            onClick={() => setBlogDropdown(!blogDropdown)} // toggle for mobile
          >
            <Link to="/blogs">
              Blogs <span className="arrow">▾</span>
            </Link>
            <ul className={`dropdown-menu ${blogDropdown ? "show" : ""}`}>
              <li>
                <Link to="/blogs?category=agriculture">Agriculture</Link>
              </li>
              <li>
                <Link to="/blogs?category=technology">Technology</Link>
              </li>
              <li>
                <Link to="/blogs?category=education">Education</Link>
              </li>
            </ul>
          </li>

          <li>
            <Link to="/contact">Contact</Link>
          </li>

          {/* NEW Donate Link */}
          <li>
            <Link to="/donate">Donate</Link>
          </li>

          <li>
            <Link to="/admin/login">Admin</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
