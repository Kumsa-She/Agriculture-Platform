import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function PrivateNavbar({ onLogout, user }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    onLogout();
    setIsDropdownOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="container nav-container">
          <div className="logo">
            <i className="fas fa-leaf text-white"></i>
            <span>AgriConnect</span>
          </div>
          <ul className="nav-menu">
            <li className="nav-item">
              <Link to="/home" className="nav-link">
                <i className="fas fa-home"></i>
                <span>Home</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/weather" className="nav-link">
                <i className="fas fa-cloud-sun"></i>
                <span>Weather</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/pricing" className="nav-link">
                <i className="fas fa-tags"></i>
                <span>Prices</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/support" className="nav-link">
                <i className="fas fa-user-graduate"></i>
                <span>Experts</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/shop" className="nav-link">
                <i className="fas fa-store"></i>
                <span>Marketplace</span>
              </Link>
            </li>
            <li className="nav-item language-item">
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
                <Link to="/profile">
                  <i className="fas fa-user"></i>
                  <span>My Profile</span>
                </Link>
                <Link to="/settings">
                  <i className="fas fa-cog"></i>
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
          <div className="hamburger">
            <i className="fas fa-bars"></i>
          </div>
        </div>
      </nav>
    </>
  );
}

export default PrivateNavbar;
