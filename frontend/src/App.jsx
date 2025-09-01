import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import { PrivateNavbar, PublicNavbar } from './components/index.js';
import {
  Home,
  Weather,
  Shop,
  Support,
  Setting,
  Pricing,
  Profile,
  Login,
  Register, // Make sure this is imported
} from './pages/index.js';
import Footer from './components/footer/Footer.jsx';
import { authAPI } from './services/api';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Check if user is logged in on app load
  useEffect(() => {
    const checkAuth = async () => {
      const savedUser = localStorage.getItem('currentUser');
      if (savedUser) {
        const user = JSON.parse(savedUser);
        try {
          const response = await authAPI.getMe(user._id);
          setCurrentUser(response.data.user);
          setIsAuthenticated(true);
          setError('');
        } catch (error) {
          console.error('Auth check failed:', error);
          localStorage.removeItem('currentUser');
          setCurrentUser(null);
          setIsAuthenticated(false);
          setError('Your session has expired. Please login again.');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      setError('');
      const response = await authAPI.login({ email, password });
      const { user } = response.data;

      setIsAuthenticated(true);
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      navigate('/home');
      return true;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Login failed. Please try again.';
      setError(errorMessage);
      return false;
    }
  };

  // Register function - UPDATED to accept user data
  const register = async (userData) => {
    try {
      setError('');
      const response = await authAPI.register(userData);
      const { user } = response.data;

      setIsAuthenticated(true);
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      navigate('/home');
      return true;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        'Registration failed. Please try again.';
      setError(errorMessage);
      return false;
    }
  };

  // Logout function
  const logout = async () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    setError('');
    navigate('/home');
  };

  // Clear error function
  const clearError = () => {
    setError('');
  };

  // Show loading spinner while checking authentication
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
      {/* Global error message */}
      {error && (
        <div className="global-error">
          {error}
          <button onClick={clearError} className="error-close">
            ×
          </button>
        </div>
      )}

      {/* Conditionally render the appropriate navbar */}
      {isAuthenticated ? (
        <PrivateNavbar onLogout={logout} user={currentUser} />
      ) : (
        <PublicNavbar
          onLogin={() => navigate('/login')}
          onRegister={() => navigate('/register')} // 👈 This will navigate to register page
        />
      )}

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route
            path="/home"
            element={
              <Home
                isAuthenticated={isAuthenticated}
                user={currentUser}
                error={error}
                clearError={clearError}
              />
            }
          />
          <Route path="/weather" element={<Weather />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route
            path="/shop"
            element={<Shop isAuthenticated={isAuthenticated} />}
          />
          <Route path="/support" element={<Support />} />

          {/* Login Route */}
          <Route
            path="/login"
            element={
              <Login onLogin={login} error={error} clearError={clearError} />
            }
          />

          {/* Register Route - ONLY THIS ONE */}
          <Route
            path="/register"
            element={
              <Register
                onRegister={register}
                error={error}
                clearError={clearError}
              />
            }
          />

          {/* Protect private routes */}
          {isAuthenticated ? (
            <>
              <Route
                path="/settings"
                element={<Setting user={currentUser} />}
              />
              <Route path="/profile" element={<Profile user={currentUser} />} />
            </>
          ) : (
            <>
              <Route
                path="/settings"
                element={<Navigate to="/login" replace />}
              />
              <Route
                path="/profile"
                element={<Navigate to="/login" replace />}
              />
            </>
          )}
        </Routes>
        <Footer />
      </main>
    </>
  );
}

export default App;
