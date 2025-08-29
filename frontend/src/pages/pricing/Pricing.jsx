import React, { useState, useEffect } from 'react';
import './Pricing.css';

const Pricing = () => {
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCommodity, setSelectedCommodity] = useState('');
  const [selectedMarket, setSelectedMarket] = useState('');
  const [dateRange, setDateRange] = useState('30');
  const [priceData, setPriceData] = useState([]);
  const [trendData, setTrendData] = useState({});
  const [loading, setLoading] = useState(false);

  // Sample data - in a real app, this would come from an API
  const regions = [
    { id: 'oromia', name: 'Oromia' },
    { id: 'amhara', name: 'Amhara' },
    { id: 'snnpr', name: 'SNNPR' },
    { id: 'tigray', name: 'Tigray' },
    { id: 'addis', name: 'Addis Ababa' },
  ];

  const commodities = [
    { id: 'teff', name: 'Teff', category: 'Cereals' },
    { id: 'maize', name: 'Maize', category: 'Cereals' },
    { id: 'wheat', name: 'Wheat', category: 'Cereals' },
    { id: 'barley', name: 'Barley', category: 'Cereals' },
    { id: 'sorghum', name: 'Sorghum', category: 'Cereals' },
    { id: 'beans', name: 'Beans', category: 'Pulses' },
    { id: 'chickpeas', name: 'Chickpeas', category: 'Pulses' },
    { id: 'lentils', name: 'Lentils', category: 'Pulses' },
    { id: 'coffee', name: 'Coffee', category: 'Cash Crops' },
    { id: 'sesame', name: 'Sesame', category: 'Cash Crops' },
  ];

  const markets = [
    { id: 'merkato', name: 'Addis Merkato', region: 'addis' },
    { id: 'shola', name: 'Shola Market', region: 'addis' },
    { id: 'atemame', name: 'Atemame Market', region: 'oromia' },
    { id: 'kaliti', name: 'Kaliti Market', region: 'oromia' },
    { id: 'bahirdar', name: 'Bahir Dar Market', region: 'amhara' },
    { id: 'hawassa', name: 'Hawassa Market', region: 'snnpr' },
    { id: 'mekelle', name: 'Mekelle Market', region: 'tigray' },
  ];

  // Sample price data
  const samplePriceData = [
    {
      commodity: 'teff',
      market: 'merkato',
      price: 3520,
      change: 4.5,
      date: '2023-10-15',
    },
    {
      commodity: 'teff',
      market: 'shola',
      price: 3410,
      change: 3.2,
      date: '2023-10-15',
    },
    {
      commodity: 'maize',
      market: 'atemame',
      price: 1780,
      change: -2.8,
      date: '2023-10-15',
    },
    {
      commodity: 'maize',
      market: 'kaliti',
      price: 1850,
      change: -1.5,
      date: '2023-10-15',
    },
    {
      commodity: 'wheat',
      market: 'merkato',
      price: 2230,
      change: 4.2,
      date: '2023-10-15',
    },
    {
      commodity: 'wheat',
      market: 'shola',
      price: 2110,
      change: 3.1,
      date: '2023-10-15',
    },
    {
      commodity: 'barley',
      market: 'atemame',
      price: 1950,
      change: 2.3,
      date: '2023-10-15',
    },
    {
      commodity: 'sorghum',
      market: 'kaliti',
      price: 1680,
      change: -1.8,
      date: '2023-10-15',
    },
    {
      commodity: 'beans',
      market: 'merkato',
      price: 3210,
      change: 5.7,
      date: '2023-10-15',
    },
    {
      commodity: 'coffee',
      market: 'shola',
      price: 4350,
      change: 6.4,
      date: '2023-10-15',
    },
  ];

  // Sample trend data
  const sampleTrendData = {
    teff: { current: 3450, change: 5.2, trend: 'up' },
    maize: { current: 1820, change: -2.1, trend: 'down' },
    wheat: { current: 2150, change: 3.7, trend: 'up' },
    barley: { current: 1900, change: 1.5, trend: 'up' },
    sorghum: { current: 1650, change: -0.8, trend: 'down' },
    beans: { current: 3100, change: 4.2, trend: 'up' },
    coffee: { current: 4200, change: 5.8, trend: 'up' },
  };

  useEffect(() => {
    // Simulate API call to fetch data
    setLoading(true);
    setTimeout(() => {
      setPriceData(samplePriceData);
      setTrendData(sampleTrendData);
      setLoading(false);
    }, 1000);
  }, []);

  const handleFilter = () => {
    setLoading(true);
    // Simulate API call with filters
    setTimeout(() => {
      let filteredData = [...samplePriceData];

      if (selectedRegion) {
        const marketIds = markets
          .filter((market) => market.region === selectedRegion)
          .map((market) => market.id);
        filteredData = filteredData.filter((item) =>
          marketIds.includes(item.market)
        );
      }

      if (selectedCommodity) {
        filteredData = filteredData.filter(
          (item) => item.commodity === selectedCommodity
        );
      }

      if (selectedMarket) {
        filteredData = filteredData.filter(
          (item) => item.market === selectedMarket
        );
      }

      setPriceData(filteredData);
      setLoading(false);
    }, 800);
  };

  const handleExport = (format) => {
    // In a real app, this would generate and download the file
    alert(`Exporting data as ${format.toUpperCase()} format`);
  };

  const getMarketName = (marketId) => {
    const market = markets.find((m) => m.id === marketId);
    return market ? market.name : marketId;
  };

  const getCommodityName = (commodityId) => {
    const commodity = commodities.find((c) => c.id === commodityId);
    return commodity ? commodity.name : commodityId;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-ET', {
      style: 'currency',
      currency: 'ETB',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="prices-page">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <div className="logo">
            <i className="fas fa-tags"></i>
            <h1>AgriConnect Market Prices</h1>
          </div>
          <p className="subtitle">
            Real-time agricultural commodity prices across Ethiopian markets
          </p>
        </div>

        {/* Filters */}
        <div className="filters-card">
          <div className="filters">
            <div className="filter-group">
              <label htmlFor="regionSelect">
                <i className="fas fa-map-marker-alt"></i> Region
              </label>
              <select
                id="regionSelect"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
              >
                <option value="">All Regions</option>
                {regions.map((region) => (
                  <option key={region.id} value={region.id}>
                    {region.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="commoditySelect">
                <i className="fas fa-seedling"></i> Commodity
              </label>
              <select
                id="commoditySelect"
                value={selectedCommodity}
                onChange={(e) => setSelectedCommodity(e.target.value)}
              >
                <option value="">All Commodities</option>
                {commodities.map((commodity) => (
                  <option key={commodity.id} value={commodity.id}>
                    {commodity.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="marketSelect">
                <i className="fas fa-store"></i> Market
              </label>
              <select
                id="marketSelect"
                value={selectedMarket}
                onChange={(e) => setSelectedMarket(e.target.value)}
              >
                <option value="">All Markets</option>
                {markets.map((market) => (
                  <option key={market.id} value={market.id}>
                    {market.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="dateRange">
                <i className="fas fa-calendar"></i> Date Range
              </label>
              <select
                id="dateRange"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option value="7">Last 7 Days</option>
                <option value="30">Last 30 Days</option>
                <option value="90">Last 90 Days</option>
                <option value="365">Last Year</option>
              </select>
            </div>

            <button
              className="filter-btn"
              onClick={handleFilter}
              disabled={loading}
            >
              <i className="fas fa-filter"></i> Apply Filters
            </button>

            {/* <div className="export-buttons">
              <button
                className="export-btn"
                onClick={() => handleExport('csv')}
              >
                <i className="fas fa-file-csv"></i> CSV
              </button>
              <button
                className="export-btn"
                onClick={() => handleExport('pdf')}
              >
                <i className="fas fa-file-pdf"></i> PDF
              </button>
            </div> */}
          </div>
        </div>

        {/* Price Trends */}
        <div className="price-trends">
          <h2>
            <i className="fas fa-chart-line"></i> Commodity Price Trends
          </h2>
          <div className="trends-grid">
            {Object.entries(trendData).map(([commodity, data]) => (
              <div key={commodity} className="trend-card">
                <h3>{getCommodityName(commodity)}</h3>
                <div className="trend-value">{formatPrice(data.current)}</div>
                <div className={`trend-change ${data.trend}`}>
                  <i
                    className={`fas fa-arrow-${
                      data.trend === 'up' ? 'up' : 'down'
                    }`}
                  ></i>
                  {Math.abs(data.change)}%
                </div>
                <p>Average market price</p>
              </div>
            ))}
          </div>
        </div>

        {/* Price Table */}
        <div className="price-table-container">
          <div className="table-header">
            <h2>
              <i className="fas fa-table"></i> Current Market Prices
            </h2>
            <p>Latest prices updated today across major markets</p>
          </div>

          {loading ? (
            <div className="loading">
              <i className="fas fa-spinner fa-spin"></i>
              <p>Loading price data...</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="price-table">
                <thead>
                  <tr>
                    <th>Commodity</th>
                    <th>Market</th>
                    <th>Price (ETB)</th>
                    <th>Change</th>
                    <th>Last Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {priceData.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <i className="fas fa-seedling"></i>
                        {getCommodityName(item.commodity)}
                      </td>
                      <td>{getMarketName(item.market)}</td>
                      <td className="price">{formatPrice(item.price)}</td>
                      <td>
                        <span
                          className={`price-change ${
                            item.change >= 0 ? 'positive' : 'negative'
                          }`}
                        >
                          <i
                            className={`fas fa-arrow-${
                              item.change >= 0 ? 'up' : 'down'
                            }`}
                          ></i>
                          {Math.abs(item.change)}%
                        </span>
                      </td>
                      <td>{item.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {priceData.length === 0 && (
                <div className="no-data">
                  <i className="fas fa-inbox"></i>
                  <p>No price data available for the selected filters</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Price Visualization */}
        <div className="visualization-card">
          <h2>
            <i className="fas fa-chart-bar"></i> Price Trends Visualization
          </h2>
          <div className="chart-placeholder">
            <i className="fas fa-chart-line"></i>
            <p>Interactive price charts would be displayed here</p>
            <div className="chart-options">
              <button className="chart-btn active">30 Days</button>
              <button className="chart-btn">60 Days</button>
              <button className="chart-btn">90 Days</button>
            </div>
          </div>
        </div>

        {/* Market Insights */}
        <div className="market-insights">
          <h2>
            <i className="fas fa-lightbulb"></i> Market Insights
          </h2>
          <div className="insight-content">
            <p>
              Teff prices have increased by an average of 4.8% over the past
              month due to high demand and limited supply. Maize prices have
              seen a slight decrease as new harvests enter the market. Coffee
              prices continue to rise due to strong export demand. Consider
              selling teff and coffee now for better profits, while maize may
              see further price decreases in the coming weeks.
            </p>
            <div className="insight-tips">
              <h3>
                <i className="fas fa-tips"></i> Trading Recommendations
              </h3>
              <ul>
                <li>✅ Sell teff and coffee now for maximum profit</li>
                <li>
                  ✅ Consider holding maize for better prices in 2-3 weeks
                </li>
                <li>
                  ✅ Monitor weather patterns for potential impact on prices
                </li>
                <li>✅ Check regional price variations before selling</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Price Submission (for farmers) */}
        {/* <div className="submission-card">
          <h2>
            <i className="fas fa-upload"></i> Submit Price Information
          </h2>
          <p>
            Help keep our database accurate by submitting current market prices
          </p>
          <div className="submission-form">
            <select>
              <option value="">Select Commodity</option>
              {commodities.map((commodity) => (
                <option key={commodity.id} value={commodity.id}>
                  {commodity.name}
                </option>
              ))}
            </select>
            <select>
              <option value="">Select Market</option>
              {markets.map((market) => (
                <option key={market.id} value={market.id}>
                  {market.name}
                </option>
              ))}
            </select>
            <input type="number" placeholder="Price (ETB)" />
            <button className="submit-btn">
              <i className="fas fa-paper-plane"></i> Submit Price
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Pricing;
