const amadeusService = require('../services/amadeusService');
const usaCitiesIATA = require("../data/CityIata");
const flights = require('../data/dummyFlightData'); 



// Update the extractFlightDetails function
const extractFlightDetails = (responseData, travelBudget) => {
  // Airline mapping object
  const airlineCodes = {
      "F9": "Frontier Airlines",
      "AA": "American Airlines",
      "DL": "Delta Air Lines",
      "UA": "United Airlines",
      "BA": "British Airways",
      "B6": "JetBlue Airways",
      "NK": "Spirit Airlines",
      "WN": "Southwest Airlines",
      "AS": "Alaska Airlines",
      "HA": "Hawaiian Airlines",
      "EV": "ExpressJet Airlines",
      "MQ": "American Eagle Airlines",
      
      // Add more airline codes and names
  };

  return responseData
      .filter(flight => parseFloat(flight.price.grandTotal) <= travelBudget) // Filter flights within budget
      .map(flight => {
          const departure = flight.itineraries[0];
          const returnFlight = flight.itineraries[1];
          const passengers = flight.travelerPricings.length;
          const totalPrice = flight.price.grandTotal;
          const baseFare = flight.price.base;
          const currency = flight.price.currency;
          const airlineCode = flight.validatingAirlineCodes[0];
          const airlineName = airlineCodes[airlineCode] || airlineCode; // Get airline name or default to code

          const formatDateTime = (dateTime) => {
              const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
              return new Date(dateTime).toLocaleString('en-US', options);
          };

          const formatDuration = (duration) => {
              const match = duration.match(/PT(\d+H)?(\d+M)?/);
              const hours = match[1] ? match[1].replace('H', '') : '0';
              const minutes = match[2] ? match[2].replace('M', '') : '0';
              return `${hours}h ${minutes}m`;
          };

          const mapSegments = (segments) => segments.map(segment => ({
              from: segment.departure.iataCode,
              to: segment.arrival.iataCode,
              departureTime: formatDateTime(segment.departure.at),
              arrivalTime: formatDateTime(segment.arrival.at),
              flightNumber: `${segment.carrierCode}${segment.number}`,
              duration: formatDuration(segment.duration),
              aircraft: segment.aircraft.code,
              stops: segment.numberOfStops,
              airline: airlineCodes[segment.operating.carrierCode] || segment.operating.carrierCode // Map to name
          }));

          const departureSegments = mapSegments(departure.segments);
          const returnSegments = mapSegments(returnFlight.segments);

          return {
              price: {
                  total: totalPrice,
                  base: baseFare,
                  currency: currency
              },
              passengers: passengers,
              airline: airlineName, // Airline name
              departureDetails: {
                  totalDuration: formatDuration(departure.duration),
                  segments: departureSegments
              },
              returnDetails: {
                  totalDuration: formatDuration(returnFlight.duration),
                  segments: returnSegments
              }
          };
      });
};





// Controller method for flight search
exports.searchFlights = async (req, res) => {
  var { originLocationCode, destinationLocationCode, departureDate, returnDate, adults, travelBudget, currencyCode="USD" } = req.query;

  
  try {
    // Validate input
    if (!originLocationCode || !destinationLocationCode || !departureDate || !returnDate || !adults) {
      return res.status(400).json({ message: 'Missing required parameters' });
    }

    originLocationCode = usaCitiesIATA[originLocationCode];
    destinationLocationCode = usaCitiesIATA[destinationLocationCode];

    // Call Amadeus service
    // const flights = await amadeusService.searchFlights(originLocationCode, destinationLocationCode, departureDate, returnDate, adults, currencyCode);
    const flightDetails = extractFlightDetails(flights, travelBudget);
    res.status(200).json(flightDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


