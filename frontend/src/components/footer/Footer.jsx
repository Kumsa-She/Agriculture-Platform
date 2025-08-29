import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-section">
          <h3>AgriConnect</h3>
          <p>
            Empowering farmers with technology for better yields and market
            access.
          </p>
          <div className="social-links">
            <a href="#">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#">
              <i className="fab fa-telegram"></i>
            </a>
            <a href="#">
              <i className="fab fa-whatsapp"></i>
            </a>
          </div>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Services</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
            <li>
              <a href="#">FAQs</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact Us</h3>
          <ul className="footer-links">
            <li>
              <i className="fas fa-phone"></i> +251 911 234 567
            </li>
            <li>
              <i className="fas fa-envelope"></i> info@agriconnect.et
            </li>
            <li>
              <i className="fas fa-map-marker-alt"></i> Addis Ababa, Ethiopia
            </li>
          </ul>
        </div>
      </div>
      <div className="container copyright">
        <p>&copy; 2025 AgriConnect. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
