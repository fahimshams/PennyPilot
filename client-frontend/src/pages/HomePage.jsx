import React from 'react';
import TravelForm from '../components/TravelForm'; // Import the TravelForm component
import '../assets/css/HomePage.css'; // Import the CSS file for styling

const HomePage = () => {
  return (
    <div className="home-page">
      <header className="header">
        <h1>PennyPilot: Plan Your Budget-Friendly Trip</h1>
        <p>Get personalized suggestions based on your budget and destination!</p>
      </header>

      <div className="form-container">
        {/* Include TravelForm in the HomePage */}
        <TravelForm />
      </div>
    </div>
  );
};

export default HomePage;
