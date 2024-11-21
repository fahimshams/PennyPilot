const amadeusService = require('../services/amadeusService');
const usaCitiesIATA = require("../data/CityIata"); 



// Update the extractFlightDetails function
const extractFlightDetails = (responseData, travelBudget) => {
  return responseData
      .filter(flight => parseFloat(flight.price.grandTotal) <= travelBudget) // Filter based on travel budget
      .map(flight => {
          let departure = flight.itineraries[0]; // departure itinerary
          let returnFlight = flight.itineraries[1]; // return itinerary
          let passengers = flight.travelerPricings.length; // number of passengers
          let price = flight.price.grandTotal; // price of the flight

          // Function to format date
          const formatDateTime = (dateTime) => {
              const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
              return new Date(dateTime).toLocaleString('en-US', options);
          };

   


          // Map the departure and return segments with stop details
          const departureSegments = departure.segments.map(segment => ({
              from: segment.departure.iataCode,
              to: segment.arrival.iataCode,
              departureTime: formatDateTime(segment.departure.at),
              arrivalTime: formatDateTime(segment.arrival.at),

          }));

          const returnSegments = returnFlight.segments.map(segment => ({
              from: segment.departure.iataCode,
              to: segment.arrival.iataCode,
              departureTime: formatDateTime(segment.departure.at),
              arrivalTime: formatDateTime(segment.arrival.at),

          }));

          // Return the structured flight details
          return {
              price: price,
              passengers: passengers,
              departure: departureSegments,
              return: returnSegments,
              
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
    const flights = await amadeusService.searchFlights(originLocationCode, destinationLocationCode, departureDate, returnDate, adults, currencyCode);
    const flightDetails = extractFlightDetails(flights, travelBudget);
    res.status(200).json(flightDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


