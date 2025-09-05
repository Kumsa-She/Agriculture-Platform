import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Book.css';

const Book = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { expert } = location.state || {};
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [bookingNotes, setBookingNotes] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  if (!expert) {
    return (
      <div className="booking-page">
        <div className="container">
          <div className="error">
            <i className="fas fa-exclamation-triangle"></i>
            <h3>No Expert Selected</h3>
            <p>Please go back and select an expert to book an appointment.</p>
            <button onClick={() => navigate('/support')}>Go Back</button>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmitBooking = (e) => {
    e.preventDefault();
    // Simulate booking success
    setBookingSuccess(true);
    setTimeout(() => {
      navigate('/support');
    }, 2000);
  };

  return (
    <div className="booking-page">
      <div className="container">
        <div className="booking-header">
          <button className="back-button" onClick={() => navigate('/support')}>
            <i className="fas fa-arrow-left"></i> Back to Experts
          </button>
          <h1>Book Appointment with {expert.name}</h1>
        </div>

        <div className="booking-content">
          <div className="expert-info-card">
            <div className="expert-image">
              <img
                src={
                  expert.image ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    expert.name
                  )}&background=random`
                }
                alt={expert.name}
              />
            </div>
            <div className="expert-details">
              <h3>{expert.name}</h3>
              <p className="expert-title">
                {expert.title || 'Agricultural Expert'}
              </p>
              <p className="expert-specialty">{expert.specialty}</p>
              <p className="expert-experience">
                {expert.experience || '0'} years experience
              </p>
            </div>
          </div>

          {bookingSuccess ? (
            <div className="success-message">
              <i className="fas fa-check-circle"></i>
              <h2>Appointment Requested Successfully!</h2>
              <p>
                Your appointment request has been sent to {expert.name}. You
                will be notified when they respond.
              </p>
            </div>
          ) : (
            <form className="booking-form" onSubmit={handleSubmitBooking}>
              <h2>Schedule Your Appointment</h2>

              <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  id="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  required
                  min="2018-01-01"
                />
              </div>

              <div className="form-group">
                <label htmlFor="time">Time</label>
                <input
                  type="time"
                  id="time"
                  value={bookingTime}
                  onChange={(e) => setBookingTime(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="notes">Notes (optional)</label>
                <textarea
                  id="notes"
                  value={bookingNotes}
                  onChange={(e) => setBookingNotes(e.target.value)}
                  placeholder="Briefly describe what you need help with..."
                  rows="4"
                ></textarea>
              </div>

              <div className="form-actions">
                <button type="button" onClick={() => navigate('/support')}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Request Appointment
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Book;
