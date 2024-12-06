import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

const carBrands = [
  { name: 'Tesla', models: ['Model S', 'Model 3', 'Model X'], MaxCapacity: ['100 Kwh', '82 Kwh', '100 Kwh'], MaxAutonomy: ['637 Km', '602 Km', '560 Km']},
  { name: 'BYD', models: ['Han EV', 'Tang EV', 'Seal'], MaxCapacity: ['85.4 Kwh', '86.4 Kwh', '82.4 Kwh'], MaxAutonomy: ['605 Km', '565 Km', '700 Km']},
  { name: 'NIO', models: ['ES8', 'ES6', 'EC6'], MaxCapacity: ['100 Kwh', '100 Kwh', '100 Kwh'], MaxAutonomy: ['580 Km', '610 Km', '615 Km'] },
  { name: 'BMW', models: ['i3', 'i4', 'iX'], MaxCapacity: ['42.2 Kwh', '83.9 Kwh', '111.5 Kwh'], MaxAutonomy: ['310 Km', '590 Km', '630 Km'] },
  { name: 'Volkswagen', models: ['ID.3', 'ID.4', 'ID.Buzz'], MaxCapacity: ['77 Kwh', '77 Kwh', '77 Kwh'], MaxAutonomy: ['550 Km', '520 Km', '423 Km'] },
];

const Home = () => {
  const navigate = useNavigate();
  const [showBrands, setShowBrands] = useState(false);
  const [hoveredBrand, setHoveredBrand] = useState(null);
  const [hoveredModelIndex, setHoveredModelIndex] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true); // Set to true to show welcome section by default
  const dropdownRef = useRef(null);
  const welcomeRef = useRef(null); // Reference to the welcome section

  // Function to handle clicks outside dropdown and welcome section
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowBrands(false);
      setHoveredBrand(null);
      setHoveredModelIndex(null);
    }
    if (welcomeRef.current && !welcomeRef.current.contains(event.target)) {
      setShowWelcome(false); // Close welcome section if clicked outside
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="home-container">
      <nav className="navbar">
        <button onClick={() => navigate('/authentif')}>Authentication</button>
        <button onClick={() => setShowWelcome((prev) => !prev)}>Application</button> {/* Toggle welcome section */}
        <button onClick={() => setShowBrands((prev) => !prev)}>Electric Cars</button>
        <div ref={dropdownRef}>
          {showBrands && (
            <div className="dropdown-content">
              {carBrands.map((brand, brandIndex) => (
                <div
                  key={brandIndex}
                  className="brand-dropdown"
                  onClick={() => setHoveredBrand(brand.name)}
                >
                  <p>{brand.name}</p>
                  {hoveredBrand === brand.name && (
                    <div className="models-dropdown">
                      {brand.models.map((model, modelIndex) => (
                        <div
                          key={modelIndex}
                          className="model-item"
                          onClick={() => setHoveredModelIndex(modelIndex)}
                        >
                          <p>{model}</p>
                          {hoveredModelIndex === modelIndex && (
                            <div className="capacity-display">
                              <p>Max Capacity: {brand.MaxCapacity[modelIndex]}</p>
                              <p>Max Autonomy: {brand.MaxAutonomy[modelIndex]}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Conditional rendering of welcome section */}
      {showWelcome && (
        <div ref={welcomeRef} className="welcome-section">
          <h1>This application allows you to manage your electric car parameters, such as:</h1>
          <ul>
            <li>Current capacity, temperature and humidity levels, car location.</li>
            <li>Search for the nearest charging stations on Google Maps.</li>
            <li>Select a charging station for your vehicle.</li>
            <li>Autonomy is calculated based on the current battery capacity.</li>
            <li>View and select different electric car brands and models.</li>
            <li>See the maximum battery capacity and maximum battery autonomy for each car model.</li>
          </ul>
        </div>
      )}

      <h2>Welcome to Electric Car Application</h2>
    </div>
  );
};

export default Home;
