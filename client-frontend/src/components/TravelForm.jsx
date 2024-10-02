import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../assets/css/TravelForm.css'; // Import the CSS file

const TravelForm = () => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [budget, setBudget] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle form submission logic here
      console.log('From:', from);
      console.log('To:', to);
      console.log('Budget:', budget);
      console.log('Start Date:', startDate);
      console.log('End Date:', endDate);
    };
  
    return (
      <form onSubmit={handleSubmit} className="travel-form">
        <div className="form-group">
          <label>Destination From:</label>
          <input
            type="text"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="Enter starting point"
          />
        </div>
        <div className="form-group">
          <label>Destination To:</label>
          <input
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="Enter destination"
          />
        </div>
        <div className="form-group">
          <label>Budget:</label>
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="Enter your budget"
          />
        </div>
        <div className="form-group">
          <label>Start Date:</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            placeholderText="Select start date"
          />
        </div>
        <div className="form-group">
          <label>End Date:</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            placeholderText="Select end date"
          />
        </div>
        <button type="submit" className="submit-button">Let's Plan It</button>
      </form>
    );
  };
  
  export default TravelForm;