const amadeusService = require('../services/amadeusService');


// Controller method for hotel search
exports.searchHotels = async (req, res) => {
  const {cityCode, hotelIds } = req.query;

  try {
    // Validate input
    if (!cityCode ) {
      return res.status(400).json({ message: 'Missing required parameters' });
    }

    // Call Amadeus service
    const hotels = await amadeusService.searchHotels(cityCode, hotelIds);
    
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


