import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>© 2025 Muzamilafey. All rights reserved.</p>
      <div className="social-links">
        <a href="https://twitter.com/muzamilafey" target="_blank" rel="noreferrer">
          <i className="fab fa-twitter"></i> twitter
        </a>
        <a href="https://facebook.com/muzamilafey" target="_blank" rel="noreferrer">
          <i className="fab fa-facebook"></i> facebook
        </a>
        <a href="https://instagram.com/muzamilafey" target="_blank" rel="noreferrer">
          <i className="fab fa-instagram"></i> instagram
        </a>
        <a href="https://github.com/Muzamilafey" target="_blank" rel="noreferrer">
          <i className="fab fa-github"></i> github
        </a>
        <a href="https://www.linkedin.com/in/muzamil-mohamed-820b40333/" target="_blank" rel="noreferrer">
          <i className="fab fa-linkedin"></i> linkedin
        </a>
      </div>
    </footer>
  );
};

export default Footer;
