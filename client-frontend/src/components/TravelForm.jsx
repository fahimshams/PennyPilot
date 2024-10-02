import React, { useState } from 'react';
import Select from 'react-select';
import '../assets/css/TravelForm.css';
import  { components } from 'react-select';

const places = [
    { label: 'New York, NY', value: 'new_york' },
    { label: 'Los Angeles, CA', value: 'los_angeles' },
    { label: 'Chicago, IL', value: 'chicago' },
    { label: 'San Francisco, CA', value: 'san_francisco' },
    { label: 'Miami, FL', value: 'miami' },
    { label: 'Miami, FL', value: 'miami' },
    // Add more places as needed
  ];
  
  // Custom Dropdown Indicator component
  const DropdownIndicator = () => {
    return null; // Render nothing
  };
  
  // Custom Single Value component
  const CustomSingleValue = ({ data }) => {
    return <span>{data.label}</span>; // Render only the label without a separator
  };
  
  const TravelForm = () => {
    const [fromLocation, setFromLocation] = useState(null);
    const [toLocation, setToLocation] = useState(null);
    const [budget, setBudget] = useState('');
    const [inputValueFrom, setInputValueFrom] = useState('');
    const [inputValueTo, setInputValueTo] = useState('');
  
    // Filter options based on input
    const filteredFromPlaces = places.filter(place =>
      place.label.toLowerCase().includes(inputValueFrom.toLowerCase())
    );
  
    const filteredToPlaces = places.filter(place =>
      place.label.toLowerCase().includes(inputValueTo.toLowerCase())
    );
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Travel From:', fromLocation?.label);
      console.log('Travel To:', toLocation?.label);
      console.log('Budget:', budget);
    };
  
    return (
      <form onSubmit={handleSubmit} className="travel-form">
        <div className="form-group">
          <label>From</label>
          <Select
            options={filteredFromPlaces}
            value={fromLocation}
            onChange={(selectedOption) => setFromLocation(selectedOption)}
            onInputChange={(input) => setInputValueFrom(input)} // Update input value
            placeholder="Enter starting location"
            className="custom-select"
            classNamePrefix="react-select"
            components={{
              DropdownIndicator,
              SingleValue: CustomSingleValue
            }}
            menuIsOpen={inputValueFrom.length > 1} // Show dropdown based on input length
          />
        </div>
  
        <div className="form-group">
          <label>To</label>
          <Select
            options={filteredToPlaces}
            value={toLocation}
            onChange={(selectedOption) => setToLocation(selectedOption)}
            onInputChange={(input) => setInputValueTo(input)} // Update input value
            placeholder="Enter destination"
            className="custom-select"
            classNamePrefix="react-select"
            components={{
              DropdownIndicator,
              SingleValue: CustomSingleValue
            }}
            menuIsOpen={inputValueTo.length > 1} // Show dropdown based on input length
          />
        </div>
  
        <div className="form-group">
          <label>Budget (in USD)</label>
          <input
            type="number"
            className='budget-input'
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="Enter your budget"
          />
        </div>
  
        <button type="submit" className="plan-button">Let’s Plan It!</button>
      </form>
    );
  };
  
  export default TravelForm;
