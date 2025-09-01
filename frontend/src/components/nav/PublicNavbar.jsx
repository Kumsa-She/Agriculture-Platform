import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function PublicNavbar({ onLogin, onRegister }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="container nav-container">
          <div className="logo">
            <i className="fas fa-leaf text-white logo-icon"></i>
            <span>AgriConnect</span>
          </div>

          {/* Nav Menu */}
          <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <li className="nav-item">
              <Link
                to="/home"
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="fas fa-home"></i>
                <span>Home</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/weather"
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="fas fa-cloud-sun"></i>
                <span>Weather</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/pricing"
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="fas fa-tags"></i>
                <span>Prices</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/support"
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="fas fa-user-graduate"></i>
                <span>Experts</span>
              </Link>
            </li>

            {/* Auth Buttons */}
            <li className="nav-item auth-buttons">
              <a
                href="#"
                className="btn btn-outline"
                onClick={(e) => {
                  e.preventDefault();
                  onLogin();
                  setIsMenuOpen(false); // 👈 close menu after login
                }}
              >
                <i className="fas fa-sign-in-alt"></i> Login
              </a>
              <a
                href="#"
                className="btn"
                onClick={(e) => {
                  e.preventDefault();
                  onRegister();
                  setIsMenuOpen(false); // 👈 close menu after register
                }}
              >
                <i className="fas fa-user-plus"></i> Register
              </a>
            </li>

            {/* Language Selector */}
            <li className="nav-item nav-language">
              <select className="language-toggle" id="languageToggle">
                <option value="en">English</option>
                <option value="am">Amharic</option>
                <option value="om">Oromo</option>
              </select>
            </li>
          </ul>

          {/* Hamburger Menu */}
          <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </div>
        </div>
      </nav>
    </>
  );
}

export default PublicNavbar;
