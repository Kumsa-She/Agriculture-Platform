import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Support.css';
import { expertAPI } from '../../services/expertAPI';

const Support = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedSort, setSelectedSort] = useState('rating');
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredDescription, setHoveredDescription] = useState(null);
  const navigate = useNavigate();

  // Fetch experts from backend
  useEffect(() => {
    const fetchExperts = async () => {
      try {
        setLoading(true);
        const response = await expertAPI.getAllExperts();
        if (response.data.success) {
          setExperts(response.data.data);
        } else {
          setError('Failed to fetch experts');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching experts');
        console.error('Error fetching experts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchExperts();
  }, []);

  // Process specialties to handle both string and array formats
  const processSpecialties = (expertSpecialty) => {
    if (Array.isArray(expertSpecialty)) {
      return expertSpecialty;
    } else if (typeof expertSpecialty === 'string') {
      return expertSpecialty.split(',').map((s) => s.trim());
    } else {
      return ['General Agriculture'];
    }
  };

  // Process languages to handle both string and array formats
  const processLanguages = (expertLanguage) => {
    if (Array.isArray(expertLanguage)) {
      return expertLanguage;
    } else if (typeof expertLanguage === 'string') {
      return expertLanguage.split(',').map((l) => l.trim());
    } else {
      return ['English'];
    }
  };

  // Truncate description to 100 characters
  const truncateDescription = (description) => {
    if (!description) return 'Experienced agricultural professional';
    if (description.length <= 80) return description;
    return description.substring(0, 80) + '...';
  };

  // Extract unique specialties, languages, and status options
  const specialties = [
    ...new Set(
      experts.flatMap((expert) => processSpecialties(expert.specialty))
    ),
  ];
  const languages = [
    ...new Set(experts.flatMap((expert) => processLanguages(expert.language))),
  ];
  const statusOptions = ['available', 'busy'];

  const filteredExperts = experts
    .filter((expert) => {
      const expertSpecialties = processSpecialties(expert.specialty);
      const expertLanguages = processLanguages(expert.language);

      return (
        (searchTerm === '' ||
          expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          expertSpecialties.some((s) =>
            s.toLowerCase().includes(searchTerm.toLowerCase())
          )) &&
        (selectedSpecialty === '' ||
          expertSpecialties.includes(selectedSpecialty)) &&
        (selectedLanguage === '' ||
          expertLanguages.includes(selectedLanguage)) &&
        (selectedStatus === '' ||
          (expert.status || '').toLowerCase() === selectedStatus.toLowerCase())
      );
    })
    .sort((a, b) => {
      if (selectedSort === 'rating') return (b.rating || 0) - (a.rating || 0);
      if (selectedSort === 'experience')
        return parseInt(b.experience || 0) - parseInt(a.experience || 0);
      if (selectedSort === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

  const handleBookAppointment = (expert) => {
    navigate('/book', { state: { expert } });
  };

  const handleSendMessage = (expert) => {
    navigate('/chat', { state: { expert } });
  };

  const renderStars = (rating) => {
    const stars = [];
    const numericRating = rating || 0;
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          key={i}
          className={`fas fa-star ${
            i <= Math.floor(numericRating) ? 'filled' : ''
          } ${
            i === Math.ceil(numericRating) && !Number.isInteger(numericRating)
              ? 'half'
              : ''
          }`}
        ></i>
      );
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="expert-connect-page">
        <div className="container">
          <div className="loading">
            <i className="fas fa-spinner fa-spin"></i>
            <p>Loading experts...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="expert-connect-page">
        <div className="container">
          <div className="error">
            <i className="fas fa-exclamation-triangle"></i>
            <h3>Error Loading Experts</h3>
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>Try Again</button>
          </div>
        </div>
      </div>
    );
  }

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
              <label>Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="">All Status</option>
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
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
                setSelectedStatus('');
              }}
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Experts Grid */}
        <div className="experts-grid">
          {filteredExperts.length > 0 ? (
            filteredExperts.map((expert) => {
              const expertSpecialties = processSpecialties(expert.specialty);
              const expertLanguages = processLanguages(expert.language);
              const fullDescription =
                expert.desc || 'Experienced agricultural professional';
              const truncatedDescription = truncateDescription(fullDescription);
              const showTooltip = fullDescription.length > 80;

              return (
                <div key={expert._id} className="expert-card">
                  <div className="expert-header">
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
                      <span
                        className={`status-dot ${
                          expert.status
                            ? expert.status.toLowerCase()
                            : 'unknown'
                        }`}
                      ></span>
                    </div>
                    <div className="expert-info">
                      <h3>{expert.name}</h3>
                      <p className="expert-title">
                        {expert.title || 'Agricultural Expert'}
                      </p>
                      <div className="expert-rating">
                        {renderStars(expert.rating)}
                        <span>({expert.reviews || 0} reviews)</span>
                      </div>
                    </div>
                  </div>

                  <div className="expert-details">
                    <div
                      className="description-container"
                      onMouseEnter={() =>
                        showTooltip && setHoveredDescription(expert._id)
                      }
                      onMouseLeave={() => setHoveredDescription(null)}
                    >
                      <p className="expert-description">
                        {truncatedDescription}
                      </p>
                      {hoveredDescription === expert._id && showTooltip && (
                        <div className="description-tooltip">
                          {fullDescription}
                        </div>
                      )}
                    </div>

                    <div className="expert-specialties">
                      {expertSpecialties.map((spec, index) => (
                        <span key={index} className="specialty-tag">
                          {spec}
                        </span>
                      ))}
                    </div>

                    <div className="expert-meta">
                      <div className="meta-item">
                        <i className="fas fa-briefcase"></i>
                        <span>{expert.experience || '0'} years experience</span>
                      </div>
                      <div className="meta-item">
                        <i className="fas fa-language"></i>
                        <span>{expertLanguages.join(', ')}</span>
                      </div>
                      <div className="meta-item">
                        <i className="fas fa-clock"></i>
                        <span>
                          Response: {expert.responseTime || 'Within 24 hours'}
                        </span>
                      </div>
                      <div className="meta-item">
                        <i className="fas fa-graduation-cap"></i>
                        <span>
                          {expert.education || 'Agricultural Studies'}
                        </span>
                      </div>
                      <div className="meta-item">
                        <i
                          className={`fas fa-circle ${
                            expert.status || 'unknown'
                          }`}
                        ></i>
                        <span
                          className={`status ${expert.status || 'unknown'}`}
                        >
                          Status: {expert.status || 'unknown'}
                        </span>
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
                      disabled={expert.status === 'busy'}
                    >
                      <i className="fas fa-calendar-check"></i> Book Now
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="no-experts">
              <i className="fas fa-search"></i>
              <h3>No experts found</h3>
              <p>Try adjusting your search filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Support;
