import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function PrivateNavbar({ onLogout, user }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    onLogout();
    setIsDropdownOpen(false);
    setIsMenuOpen(false);
  };

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
                to="/expert-dashboard"
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="fas fa-user-graduate"></i>
                <span>Experts</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/shop"
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="fas fa-store"></i>
                <span>Marketplace</span>
              </Link>
            </li>
            <li className="nav-item nav-language">
              <select className="language-toggle" id="languageToggle">
                <option value="en">English</option>
                <option value="am">Amharic</option>
                <option value="om">Oromo</option>
              </select>
            </li>
            <li
              className={`nav-item profile-dropdown ${
                isDropdownOpen ? 'active' : ''
              }`}
              id="profileDropdown"
            >
              <button
                className="profile-btn"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <i className="fas fa-user-circle"></i>
              </button>
              <div className="dropdown-content">
                <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                  <i className="fas fa-user"></i>
                  <span>My Profile</span>
                </Link>
                <Link to="/settings" onClick={() => setIsMenuOpen(false)}>
                  <i className="fas fa-bell"></i>
                  <span>Notifications</span>
                </Link>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogout();
                  }}
                  className="logout"
                  id="logoutBtn"
                >
                  <i className="fas fa-sign-out-alt"></i>
                  <span>Logout</span>
                </a>
              </div>
            </li>
          </ul>

          {/* Hamburger */}
          <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </div>
        </div>
      </nav>
    </>
  );
}

export default PrivateNavbar;
