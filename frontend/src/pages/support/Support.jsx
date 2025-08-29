import React, { useState, useEffect } from 'react';
import './Support.css';

const Support = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedAvailability, setSelectedAvailability] = useState('');
  const [selectedSort, setSelectedSort] = useState('rating');
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [bookingNotes, setBookingNotes] = useState('');
  const [message, setMessage] = useState('');
  const [showMessageModal, setShowMessageModal] = useState(false);

  // Sample experts data
  const experts = [
    {
      id: 1,
      name: 'Dr. Alemayehu Teshome',
      title: 'Agronomist',
      specialty: ['Cereals', 'Soil Management'],
      experience: '15 years',
      rating: 4.9,
      reviews: 127,
      languages: ['Amharic', 'English', 'Oromo'],
      availability: 'Available',
      responseTime: 'Within 2 hours',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      description:
        'Specialized in cereal crops and soil fertility management. Former researcher at Ethiopian Institute of Agricultural Research.',
      education: 'PhD in Agronomy, Haramaya University',
      consultationFee: 'Free',
      contact: '+251 911 234 567',
    },
    {
      id: 2,
      name: 'Dr. Selamawit Bekele',
      title: 'Plant Pathologist',
      specialty: ['Disease Management', 'Vegetables'],
      experience: '12 years',
      rating: 4.8,
      reviews: 98,
      languages: ['Amharic', 'English'],
      availability: 'Available',
      responseTime: 'Within 4 hours',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      description:
        'Expert in plant disease diagnosis and management. Special focus on vegetable crops.',
      education: 'MSc in Plant Pathology, Jimma University',
      consultationFee: '500 ETB/hour',
      contact: '+251 922 345 678',
    },
    {
      id: 3,
      name: 'Dr. Tadesse Wolde',
      title: 'Livestock Specialist',
      specialty: ['Dairy Farming', 'Animal Health'],
      experience: '18 years',
      rating: 4.7,
      reviews: 156,
      languages: ['Oromo', 'Amharic'],
      availability: 'Busy',
      responseTime: 'Within 24 hours',
      image: 'https://randomuser.me/api/portraits/men/67.jpg',
      description:
        'Veterinary doctor specializing in dairy cattle health and productivity.',
      education: 'DVM, Addis Ababa University',
      consultationFee: '700 ETB/hour',
      contact: '+251 933 456 789',
    },
    {
      id: 4,
      name: 'Eng. Birhanu Lemma',
      title: 'Irrigation Engineer',
      specialty: ['Water Management', 'Irrigation Systems'],
      experience: '10 years',
      rating: 4.6,
      reviews: 84,
      languages: ['Amharic', 'English'],
      availability: 'Available',
      responseTime: 'Within 6 hours',
      image: 'https://randomuser.me/api/portraits/men/76.jpg',
      description:
        'Specialized in designing and implementing efficient irrigation systems for smallholder farmers.',
      education: 'MSc in Irrigation Engineering, Arba Minch University',
      consultationFee: '600 ETB/hour',
      contact: '+251 944 567 890',
    },
    {
      id: 5,
      name: 'Dr. Marta Girma',
      title: 'Horticulturist',
      specialty: ['Fruits', 'Vegetables', 'Greenhouse'],
      experience: '14 years',
      rating: 4.9,
      reviews: 112,
      languages: ['Amharic', 'English', 'Tigrigna'],
      availability: 'Available',
      responseTime: 'Within 3 hours',
      image: 'https://randomuser.me/api/portraits/women/28.jpg',
      description:
        'Expert in fruit and vegetable production with focus on greenhouse technologies.',
      education: 'PhD in Horticulture, Hawassa University',
      consultationFee: 'Free',
      contact: '+251 955 678 901',
    },
    {
      id: 6,
      name: 'Dr. Getachew Mekonnen',
      title: 'Soil Scientist',
      specialty: ['Soil Fertility', 'Fertilizers'],
      experience: '16 years',
      rating: 4.7,
      reviews: 93,
      languages: ['Amharic', 'Oromo'],
      availability: 'Available',
      responseTime: 'Within 5 hours',
      image: 'https://randomuser.me/api/portraits/men/45.jpg',
      description:
        'Specialized in soil fertility management and appropriate fertilizer use for different crops.',
      education: 'PhD in Soil Science, Haramaya University',
      consultationFee: '400 ETB/hour',
      contact: '+251 966 789 012',
    },
  ];

  const specialties = [
    ...new Set(experts.flatMap((expert) => expert.specialty)),
  ];
  const languages = [...new Set(experts.flatMap((expert) => expert.languages))];
  const availabilityOptions = ['Available', 'Busy'];

  const filteredExperts = experts
    .filter((expert) => {
      return (
        (searchTerm === '' ||
          expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          expert.specialty.some((s) =>
            s.toLowerCase().includes(searchTerm.toLowerCase())
          )) &&
        (selectedSpecialty === '' ||
          expert.specialty.includes(selectedSpecialty)) &&
        (selectedLanguage === '' ||
          expert.languages.includes(selectedLanguage)) &&
        (selectedAvailability === '' ||
          expert.availability === selectedAvailability)
      );
    })
    .sort((a, b) => {
      if (selectedSort === 'rating') return b.rating - a.rating;
      if (selectedSort === 'experience')
        return b.experience.localeCompare(a.experience);
      if (selectedSort === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

  const handleBookAppointment = (expert) => {
    setSelectedExpert(expert);
    setShowBookingModal(true);
  };

  const handleSendMessage = (expert) => {
    setSelectedExpert(expert);
    setShowMessageModal(true);
  };

  const handleSubmitBooking = (e) => {
    e.preventDefault();
    // In a real app, this would send the booking request to the server
    alert(
      `Appointment requested with ${selectedExpert.name} on ${bookingDate} at ${bookingTime}`
    );
    setShowBookingModal(false);
    setBookingDate('');
    setBookingTime('');
    setBookingNotes('');
  };

  const handleSubmitMessage = (e) => {
    e.preventDefault();
    // In a real app, this would send the message to the expert
    alert(`Message sent to ${selectedExpert.name}`);
    setShowMessageModal(false);
    setMessage('');
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          key={i}
          className={`fas fa-star ${i <= Math.floor(rating) ? 'filled' : ''} ${
            i === Math.ceil(rating) && !Number.isInteger(rating) ? 'half' : ''
          }`}
        ></i>
      );
    }
    return stars;
  };

  return (
    <div className="expert-connect-page">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <div className="logo">
            <i className="fas fa-user-graduate"></i>
            <h1>Expert Connect</h1>
          </div>
          <p className="subtitle">
            Connect with agricultural experts for advice and consultation
          </p>
        </div>

        {/* Search and Filters */}
        <div className="filters-card">
          <div className="search-box">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Search experts by name or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-controls">
            <div className="filter-group">
              <label>Specialty</label>
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
              >
                <option value="">All Specialties</option>
                {specialties.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Language</label>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
              >
                <option value="">All Languages</option>
                {languages.map((language) => (
                  <option key={language} value={language}>
                    {language}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Availability</label>
              <select
                value={selectedAvailability}
                onChange={(e) => setSelectedAvailability(e.target.value)}
              >
                <option value="">All Status</option>
                {availabilityOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Sort By</label>
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
              >
                <option value="rating">Highest Rating</option>
                <option value="experience">Most Experienced</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>

            <button
              className="clear-filters"
              onClick={() => {
                setSearchTerm('');
                setSelectedSpecialty('');
                setSelectedLanguage('');
                setSelectedAvailability('');
              }}
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Experts Grid */}
        <div className="experts-grid">
          {filteredExperts.length > 0 ? (
            filteredExperts.map((expert) => (
              <div key={expert.id} className="expert-card">
                <div className="expert-header">
                  <div className="expert-image">
                    <img src={expert.image} alt={expert.name} />
                    <span
                      className={`availability-dot ${expert.availability.toLowerCase()}`}
                    ></span>
                  </div>
                  <div className="expert-info">
                    <h3>{expert.name}</h3>
                    <p className="expert-title">{expert.title}</p>
                    <div className="expert-rating">
                      {renderStars(expert.rating)}
                      <span>({expert.reviews} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="expert-details">
                  <p className="expert-description">{expert.description}</p>

                  <div className="expert-specialties">
                    {expert.specialty.map((spec, index) => (
                      <span key={index} className="specialty-tag">
                        {spec}
                      </span>
                    ))}
                  </div>

                  <div className="expert-meta">
                    <div className="meta-item">
                      <i className="fas fa-briefcase"></i>
                      <span>{expert.experience} experience</span>
                    </div>
                    <div className="meta-item">
                      <i className="fas fa-language"></i>
                      <span>{expert.languages.join(', ')}</span>
                    </div>
                    <div className="meta-item">
                      <i className="fas fa-clock"></i>
                      <span>Response: {expert.responseTime}</span>
                    </div>
                    <div className="meta-item">
                      <i className="fas fa-graduation-cap"></i>
                      <span>{expert.education}</span>
                    </div>
                    <div className="meta-item">
                      <i className="fas fa-money-bill-wave"></i>
                      <span className="fee">{expert.consultationFee}</span>
                    </div>
                  </div>
                </div>

                <div className="expert-actions">
                  <button
                    className="btn-message"
                    onClick={() => handleSendMessage(expert)}
                  >
                    <i className="fas fa-comment"></i> Message
                  </button>
                  <button
                    className="btn-book"
                    onClick={() => handleBookAppointment(expert)}
                  >
                    <i className="fas fa-calendar-check"></i> Book Now
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-experts">
              <i className="fas fa-search"></i>
              <h3>No experts found</h3>
              <p>Try adjusting your search filters</p>
            </div>
          )}
        </div>

        {/* Booking Modal */}
        {showBookingModal && selectedExpert && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h2>Book Appointment with {selectedExpert.name}</h2>
                <button
                  className="close-modal"
                  onClick={() => setShowBookingModal(false)}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <form onSubmit={handleSubmitBooking}>
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="form-group">
                  <label>Time</label>
                  <input
                    type="time"
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Notes (optional)</label>
                  <textarea
                    value={bookingNotes}
                    onChange={(e) => setBookingNotes(e.target.value)}
                    placeholder="Briefly describe what you need help with..."
                    rows="3"
                  ></textarea>
                </div>
                <div className="modal-actions">
                  <button
                    type="button"
                    onClick={() => setShowBookingModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Request Appointment
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Message Modal */}
        {showMessageModal && selectedExpert && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h2>Message {selectedExpert.name}</h2>
                <button
                  className="close-modal"
                  onClick={() => setShowMessageModal(false)}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <form onSubmit={handleSubmitMessage}>
                <div className="form-group">
                  <label>Your Message</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message to the expert..."
                    rows="5"
                    required
                  ></textarea>
                </div>
                <div className="modal-actions">
                  <button
                    type="button"
                    onClick={() => setShowMessageModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Support;
