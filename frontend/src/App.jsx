import { useState, useEffect } from 'react';
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
  Login, // We'll create this component
} from './pages/index.js';
import Footer from './components/footer/Footer.jsx';

// JSON user data (simulating a database)
const userDatabase = [
  {
    id: 1,
    email: 'user@example.com',
    password: 'password123',
    name: 'John Doe',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: 2,
    email: 'test@test.com',
    password: 'test123',
    name: 'Test User',
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
];

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  // Check if user is logged in on app load
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // Login function
  const login = (email, password) => {
    // Find user in our JSON "database"
    const user = userDatabase.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      setIsAuthenticated(true);
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      navigate('/home'); // Redirect to home after successful login
      return true;
    }
    return false;
  };

  // Logout function
  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <>
      {/* Conditionally render the appropriate navbar */}
      {isAuthenticated ? (
        <PrivateNavbar onLogout={logout} user={currentUser} />
      ) : (
        <PublicNavbar onLogin={() => navigate('/login')} />
      )}

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route
            path="/home"
            element={
              <Home isAuthenticated={isAuthenticated} user={currentUser} />
            }
          />
          <Route path="/weather" element={<Weather />} />
          <Route
            path="/shop"
            element={<Shop isAuthenticated={isAuthenticated} />}
          />
          <Route path="/support" element={<Support />} />
          <Route path="/login" element={<Login onLogin={login} />} />

          {/* Protect private routes */}
          {isAuthenticated ? (
            <>
              <Route
                path="/settings"
                element={<Setting user={currentUser} />}
              />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/profile" element={<Profile user={currentUser} />} />
            </>
          ) : (
            <>
              <Route
                path="/settings"
                element={<Navigate to="/login" replace />}
              />
              <Route
                path="/pricing"
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
