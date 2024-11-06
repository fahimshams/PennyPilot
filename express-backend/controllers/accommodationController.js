const amadeusService = require('../services/amadeusService');

// Controller method for hotel search
exports.searchHotels = async (req, res) => {
  const { cityCode, adults, checkInDate, checkOutDate, budget } = req.query;
  const hotels = [];
  let fetchedHotels = 0;
  const batchSize = 3; // Number of hotel IDs to fetch in each batch
  const targetCount = 10; // Target number of hotels to collect
  let hotelIds;

  try {
    // Validate input
    if (!cityCode) {
      return res.status(400).json({ message: 'Missing required parameters' });
    }

    // Call Amadeus service to get hotel IDs
    hotelIds = await amadeusService.searchHotelsIds(cityCode);
    
    // Check if hotelIds were returned
    if (!hotelIds || hotelIds.length === 0) {
      return res.status(404).json({ message: 'No hotels found' });
    }

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

  try {
    // Process in batches until the target count of hotels is reached or no more IDs are left
    for (let i = 0; i < hotelIds.length && fetchedHotels < targetCount; i += batchSize) {
      const batch = hotelIds.slice(i, i + batchSize);

      // Fetch hotel details for each ID in the batch, allowing partial success
      const batchResults = await Promise.all(
        batch.map(async (id) => {
          try {
            const hotel = await amadeusService.searchHotels(id, adults, checkInDate, checkOutDate);
            
            // Check if the hotel matches the budget, if a budget is provided
            if (hotel && (!budget || hotel.offers[0].price.total <= budget)) {
              console.log(hotel.offers[0].price.total)
              return hotel;
            }
          } catch (err) {
            console.warn(`Error fetching details for hotel ID ${id}: ${err.message}`);
          }
          return null; // Return null for failed requests to be filtered out later
        })
      );

      // Filter out null entries (failed requests)
      const validHotels = batchResults.filter(hotel => hotel !== null);

      // Add valid hotels to the list and update count
      hotels.push(...validHotels);
      fetchedHotels += validHotels.length;
    }

    // Send the response with the hotel data

    return res.json(hotels.slice(0, targetCount)); // Ensure only the target count is returned

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
