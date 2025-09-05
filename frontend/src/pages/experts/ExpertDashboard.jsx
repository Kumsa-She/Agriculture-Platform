import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ExpertDashboard.css';

const SERVER_URL = 'http://localhost:5000'; // Your backend URL

const ExpertDashboard = ({ user }) => {
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch farmers that the expert can chat with
  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${SERVER_URL}/api/auth/users`);
        // Use res.data.data since controller returns { success: true, data: [...] }
        setFarmers(res.data.data || []);
      } catch (err) {
        console.error(err);
        setError('Failed to load farmers.');
      } finally {
        setLoading(false);
      }
    };

    fetchFarmers();
  }, []);

  const handleChatClick = (farmerId) => {
    navigate(`/expert/chat/${farmerId}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="expert-dashboard">
      <h2>Welcome, {user?.name}</h2>
      <h3>Farmers you can chat with:</h3>
      <div className="farmers-list">
        {farmers.length > 0 ? (
          farmers.map((farmer) => (
            <div
              key={farmer._id}
              className="farmer-card"
              onClick={() => handleChatClick(farmer._id)}
            >
              <img
                src={
                  farmer.image ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    farmer.name
                  )}&background=random`
                }
                alt={farmer.name}
              />
              <div className="farmer-info">
                <h4>{farmer.name}</h4>
                <p>{farmer.email}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No farmers available.</p>
        )}
      </div>
    </div>
  );
};

export default ExpertDashboard;
