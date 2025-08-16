import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/index.js';
import {
  Home,
  Weather,
  Shop,
  Support,
  Setting,
  Pricing,
  Profile,
} from './pages/index.js';

function App() {
  return (
    <>
      <Navbar />
      <main className="container mt-4">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/support" element={<Support />} />
          <Route path="/settings" element={<Setting />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
