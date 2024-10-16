const amadeusService = require('../services/amadeusService');


// Controller method for flight search
exports.searchHotels = async (req, res) => {
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


