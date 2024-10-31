const amadeusService = require('../services/amadeusService');

// Controller method for hotel search
exports.searchHotels = async (req, res) => {
  const { cityCode, adults, checkInDate, checkOutDate } = req.query;

  try {
    // Validate input
    if (!cityCode) {
      return res.status(400).json({ message: 'Missing required parameters' });
    }

    // Call Amadeus service to get hotel IDs
    const hotelIds = await amadeusService.searchHotelsIds(cityCode);

    // Check if hotelIds were returned
    if (!hotelIds || hotelIds.length === 0) {
      return res.status(404).json({ message: 'No hotels found' });
    }

    // Get the first two hotel IDs
    const firstTwoHotelIds = hotelIds.slice(0, 2);

    console.log(firstTwoHotelIds)

    // Call Amadeus service to get hotel details for the first two IDs
    const hotels = await Promise.all(
      firstTwoHotelIds.map(id => amadeusService.searchHotels(id, adults, checkInDate, checkOutDate))
    );

    // Send the response with the hotel data
    return res.json(hotels);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
