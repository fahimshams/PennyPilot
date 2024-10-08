const amadeusService = require('../services/amadeusService');



const extractFlightDetails = (responseData, travelBudget) => {
  return responseData
    .filter(flight => parseFloat(flight.price.grandTotal) <= travelBudget) // Filter based on travel budget
    .map(flight => {
      let departure = flight.itineraries[0]; // departure itinerary
      let returnFlight = flight.itineraries[1]; // return itinerary
      let passengers = flight.travelerPricings.length; // number of passengers
      let price = flight.price.grandTotal; // price of the flight

      // Map the departure and return segments
      const departureSegments = departure.segments.map(segment => ({
        from: segment.departure.iataCode,
        to: segment.arrival.iataCode,
        departureTime: segment.departure.at
      }));

      const returnSegments = returnFlight.segments.map(segment => ({
        from: segment.departure.iataCode,
        to: segment.arrival.iataCode,
        returnTime: segment.departure.at
      }));

      // Return the structured flight details
      return {
        price: price,
        passengers: passengers,
        departure: departureSegments,
        return: returnSegments
      };
    });
}

// Controller method for flight search
const searchFlights = async (req, res) => {
  const { originLocationCode, destinationLocationCode, departureDate, returnDate, adults, travelBudget } = req.query;

  try {
    // Validate input
    if (!originLocationCode || !destinationLocationCode || !departureDate || !returnDate || !adults) {
      return res.status(400).json({ message: 'Missing required parameters' });
    }

    // Call Amadeus service
    const flights = await amadeusService.searchFlights(originLocationCode, destinationLocationCode, departureDate, returnDate, adults);
    const flightDetails = extractFlightDetails(flights, travelBudget);
    res.status(200).json(flightDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchCarRentals = async (req, res) => {
  const { pickupLocationCode, dropOffLocationCode, departureDate, returnDate, adults, travelBudget } = req.query;

  try {
    // Validate input
    if (!originLocationCode || !destinationLocationCode || !departureDate || !returnDate || !adults) {
      return res.status(400).json({ message: 'Missing required parameters' });
    }

    // Call Amadeus service
    const flights = await amadeusService.searchFlights(originLocationCode, destinationLocationCode, departureDate, returnDate, adults);
    const flightDetails = extractFlightDetails(flights, travelBudget);
    res.status(200).json(flightDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

} 
  module.exports = {
    searchFlights,
    searchCarRentals
  }

