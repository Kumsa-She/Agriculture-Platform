import React, { useState, useEffect } from 'react';
import './Weather.css';

const Weather = () => {
  const [region, setRegion] = useState('addis');
  const [zone, setZone] = useState('center');
  const [customLocation, setCustomLocation] = useState('');
  const [weatherData, setWeatherData] = useState({
    temperature: 24,
    condition: 'Sunny',
    icon: 'fa-sun',
    iconColor: '#f39c12',
    windSpeed: 8,
    humidity: 45,
    pressure: 1013,
    visibility: 10,
    alert:
      'No significant weather alerts at this time. Conditions are favorable for most crops. Moderate temperatures and sunshine provide ideal growing conditions.',
    tip: 'Current weather conditions are ideal for planting cereals and pulses. Consider irrigating in the early morning or late afternoon to reduce water evaporation. This is a good time for fertilizer application.',
  });

  // Zones data
  const zones = {
    oromia: [
      'East Welega',
      'West Welega',
      'Arsi',
      'Bale',
      'Borena',
      'Guji',
      'Horo Gudru',
      'Illubabor',
      'Jimma',
      'Kelam Welega',
      'North Shewa',
      'South West Shewa',
      'West Arsi',
      'West Guji',
      'West Shewa',
    ],
    amhara: [
      'Agew Awi',
      'East Gojjam',
      'North Gondar',
      'North Shewa',
      'North Wollo',
      'Oromia',
      'South Gondar',
      'South Wollo',
      'Wag Hemra',
      'West Gojjam',
      'Bahir Dar',
    ],
    snnpr: [
      'Gamo Gofa',
      'Gedeo',
      'Gurage',
      'Hadiya',
      'Kembata Tembaro',
      'Silti',
      'South Omo',
      'Wolayita',
      'Bench Sheko',
      'Dawro',
      'Keffa',
      'Konta',
      'Segen',
    ],
    tigray: [
      'Central',
      'Eastern',
      'North Western',
      'Southern',
      'South Eastern',
      'Western',
    ],
    addis: ['Center', 'North', 'South', 'East', 'West'],
  };

  // Forecast days
  const [forecastDays, setForecastDays] = useState([]);

  useEffect(() => {
    // Set up forecast days
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    const nextDays = [];

    for (let i = 1; i <= 5; i++) {
      const nextDay = new Date();
      nextDay.setDate(today.getDate() + i);
      nextDays.push({
        name: days[nextDay.getDay()],
        fullDate: nextDay.toDateString(),
      });
    }

    setForecastDays(nextDays);
  }, []);

  const handleRegionChange = (e) => {
    const newRegion = e.target.value;
    setRegion(newRegion);
    setZone(''); // Reset zone when region changes
  };

  const handleZoneChange = (e) => {
    setZone(e.target.value);
  };

  const handleLocationChange = (e) => {
    setCustomLocation(e.target.value);
  };

  const handleGetWeather = () => {
    if (!region) {
      alert('Please select a region');
      return;
    }

    // Simulate weather data change
    simulateWeatherChange();
  };

  const simulateWeatherChange = () => {
    // Randomize weather conditions
    const conditions = [
      { name: 'Sunny', icon: 'fa-sun', color: '#f39c12' },
      { name: 'Partly Cloudy', icon: 'fa-cloud-sun', color: '#3498db' },
      { name: 'Cloudy', icon: 'fa-cloud', color: '#7f8c8d' },
      { name: 'Rainy', icon: 'fa-cloud-rain', color: '#3498db' },
      { name: 'Stormy', icon: 'fa-bolt', color: '#f39c12' },
    ];

    const condition = conditions[Math.floor(Math.random() * conditions.length)];
    const temp = Math.floor(Math.random() * 20) + 15;
    const windSpeed = Math.floor(Math.random() * 15) + 1;
    const humidity = Math.floor(Math.random() * 50) + 30;
    const pressure = Math.floor(Math.random() * 30) + 1000;
    const visibility = Math.floor(Math.random() * 15) + 5;

    let alert, tip;

    if (condition.name === 'Rainy' || condition.name === 'Stormy') {
      alert =
        'Rain expected. Consider delaying irrigation and protecting crops from potential heavy rainfall. Store harvested crops in a dry place and ensure proper drainage in fields.';
      tip =
        'Good time for water-intensive crops. Ensure proper drainage to prevent waterlogging. Postpone fertilizer application to avoid runoff.';
    } else if (condition.name === 'Sunny') {
      alert =
        'High temperatures and sun exposure. Ensure adequate irrigation for crops. Consider providing shade for sensitive plants and livestock.';
      tip =
        'Ideal weather for drying crops. Consider harvesting if crops are ready. Irrigate in early morning or late evening to reduce evaporation.';
    } else {
      alert =
        'No significant weather alerts at this time. Conditions are favorable for most crops. Moderate temperatures and sunshine provide ideal growing conditions.';
      tip =
        'Current weather conditions are ideal for planting cereals and pulses. Consider irrigating in the early morning or late afternoon to reduce water evaporation. This is a good time for fertilizer application.';
    }

    setWeatherData({
      temperature: temp,
      condition: condition.name,
      icon: condition.icon,
      iconColor: condition.color,
      windSpeed,
      humidity,
      pressure,
      visibility,
      alert,
      tip,
    });
  };

  // Get display location
  const getDisplayLocation = () => {
    if (customLocation) return customLocation;

    const regionText =
      document.querySelector(`#regionSelect option[value="${region}"]`)
        ?.textContent || 'Addis Ababa';
    return regionText;
  };

  // Hourly forecast data
  const hourlyForecast = [
    { time: 'Now', icon: 'fa-sun', temp: 24 },
    { time: '1 PM', icon: 'fa-sun', temp: 25 },
    { time: '2 PM', icon: 'fa-sun', temp: 26 },
    { time: '3 PM', icon: 'fa-cloud-sun', temp: 25 },
    { time: '4 PM', icon: 'fa-cloud-sun', temp: 24 },
    { time: '5 PM', icon: 'fa-cloud', temp: 23 },
    { time: '6 PM', icon: 'fa-cloud', temp: 22 },
  ];

  // 5-day forecast data
  const fiveDayForecast = [
    {
      day: 'Tomorrow',
      icon: 'fa-cloud-sun',
      temp: 24,
      condition: 'Partly Cloudy',
    },
    {
      day: forecastDays[0]?.name || 'Wed',
      icon: 'fa-cloud-rain',
      temp: 22,
      condition: 'Light Rain',
    },
    {
      day: forecastDays[1]?.name || 'Thu',
      icon: 'fa-cloud',
      temp: 23,
      condition: 'Cloudy',
    },
    {
      day: forecastDays[2]?.name || 'Fri',
      icon: 'fa-sun',
      temp: 26,
      condition: 'Sunny',
    },
    {
      day: forecastDays[3]?.name || 'Sat',
      icon: 'fa-sun',
      temp: 27,
      condition: 'Sunny',
    },
  ];

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <div className="logo">
          <i className="fas fa-cloud-sun"></i>
          <h1>AgriConnect Weather</h1>
        </div>
        <p className="subtitle">
          Real-time weather intelligence for Ethiopian farmers
        </p>
      </div>

      {/* Location Selector */}
      <div className="weather-card">
        <div className="location-selector">
          <select
            id="regionSelect"
            value={region}
            onChange={handleRegionChange}
          >
            <option value="">Select Region</option>
            <option value="oromia">Oromia</option>
            <option value="amhara">Amhara</option>
            <option value="snnpr">SNNPR</option>
            <option value="tigray">Tigray</option>
            <option value="addis">Addis Ababa</option>
          </select>

          <select id="zoneSelect" value={zone} onChange={handleZoneChange}>
            <option value="">Select Zone</option>
            {zones[region]?.map((zoneOption, index) => (
              <option
                key={index}
                value={zoneOption.toLowerCase().replace(' ', '_')}
              >
                {zoneOption}
              </option>
            ))}
          </select>

          <input
            type="text"
            id="locationInput"
            placeholder="Enter specific location"
            value={customLocation}
            onChange={handleLocationChange}
          />

          <button id="getWeatherBtn" onClick={handleGetWeather}>
            <i className="fas fa-search"></i> Get Weather
          </button>
        </div>
      </div>

      {/* Current Weather */}
      <div className="weather-card">
        <div className="card-title">
          <i className="fas fa-location-dot"></i>
          <h2>
            Current Weather in{' '}
            <span id="currentLocation">{getDisplayLocation()}</span>
          </h2>
        </div>

        <div className="current-weather">
          <div className="main-weather">
            <div className="weather-icon">
              <i
                className={`fas ${weatherData.icon}`}
                id="weatherIcon"
                style={{ color: weatherData.iconColor }}
              ></i>
            </div>
            <div className="temperature">
              <span id="currentTemp">{weatherData.temperature}</span>°C
            </div>
            <div className="weather-condition" id="weatherCondition">
              {weatherData.condition}
            </div>
            <div className="feels-like">
              Feels like {weatherData.temperature + 2}°C
            </div>
          </div>

          <div className="weather-details">
            <div className="detail-item">
              <i className="fas fa-wind"></i>
              <div className="detail-info">
                <h4>Wind Speed</h4>
                <p>
                  <span id="windSpeed">{weatherData.windSpeed}</span> km/h
                </p>
              </div>
            </div>

            <div className="detail-item">
              <i className="fas fa-tint"></i>
              <div className="detail-info">
                <h4>Humidity</h4>
                <p>
                  <span id="humidity">{weatherData.humidity}</span>%
                </p>
              </div>
            </div>

            <div className="detail-item">
              <i className="fas fa-compress-arrows-alt"></i>
              <div className="detail-info">
                <h4>Pressure</h4>
                <p>
                  <span id="pressure">{weatherData.pressure}</span> hPa
                </p>
              </div>
            </div>

            <div className="detail-item">
              <i className="fas fa-eye"></i>
              <div className="detail-info">
                <h4>Visibility</h4>
                <p>
                  <span id="visibility">{weatherData.visibility}</span> km
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Hourly Forecast */}
        <div className="hourly-forecast">
          {hourlyForecast.map((hour, index) => (
            <div key={index} className="hour-item">
              <div className="hour-time">{hour.time}</div>
              <div className="hour-icon">
                <i className={`fas ${hour.icon}`}></i>
              </div>
              <div className="hour-temp">{hour.temp}°</div>
            </div>
          ))}
        </div>
      </div>

      {/* 5-Day Forecast */}
      <div className="weather-card">
        <div className="card-title">
          <i className="fas fa-calendar-days"></i>
          <h2>5-Day Forecast</h2>
        </div>

        <div className="forecast">
          {fiveDayForecast.map((day, index) => (
            <div key={index} className="forecast-day">
              <div className="forecast-date">{day.day}</div>
              <div className="forecast-icon">
                <i className={`fas ${day.icon}`}></i>
              </div>
              <div className="forecast-temp">{day.temp}°C</div>
              <div className="forecast-condition">{day.condition}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Agricultural Information */}
      <div className="agricultural-info">
        <div className="weather-card">
          <div className="alert-box">
            <div className="alert-header">
              <i className="fas fa-exclamation-triangle"></i>
              <h3>Agricultural Alerts</h3>
            </div>
            <div className="alert-content" id="agAlert">
              {weatherData.alert}
            </div>
          </div>
        </div>

        <div className="weather-card">
          <div className="tip-box">
            <div className="tip-header">
              <i className="fas fa-seedling"></i>
              <h3>Farming Recommendations</h3>
            </div>
            <div className="tip-content" id="agTip">
              {weatherData.tip}
            </div>
          </div>
        </div>
      </div>

      {/* Weather Map */}
      <div className="weather-card">
        <div className="card-title">
          <i className="fas fa-map"></i>
          <h2>Precipitation Map</h2>
        </div>

        <div className="map-container">
          <i className="fas fa-map-marked-alt"></i>
          <p>Interactive weather map would be displayed here</p>
        </div>
      </div>
    </div>
  );
};

export default Weather;
