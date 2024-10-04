const amadeusService = require('../services/amadeusService');

// Controller method for hotel search
exports.searchFlights = async (req, res) => {
  const { originLocationCode, destinationLocationCode, departureDate, adults } = req.query;

  try {
    // Validate input
    if (!originLocationCode || !destinationLocationCode || !departureDate || !adults) {
      return res.status(400).json({ message: 'Missing required parameters' });
    }

    // Call Amadeus service
    const flights = await amadeusService.searchFlights(originLocationCode, destinationLocationCode, departureDate, adults);
    
    res.status(200).json(flights);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
