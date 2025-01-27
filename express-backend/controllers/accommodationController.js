const amadeusService = require('../services/amadeusService');
const usaCitiesIATA = require("../data/CityIata"); 

// Helper function to extract hotel details based on budget and essential info
// Helper function to extract and filter hotel details
const extractHotelDetails = (hotelsData, budget) => {
  return hotelsData
    .flat() // Flatten the array if each hotel is wrapped in its own array
    .map(hotelData => {
      // Check if hotelData and its offer array are valid
      if (!hotelData || !hotelData.offers || hotelData.offers.length === 0) {
        return null;
      }

      // Extract the first offer and basic hotel information
      const offer = hotelData.offers[0];
      const { hotel } = hotelData;

      // Verify if the offer price is within the budget if provided
      if (budget && parseFloat(offer.price.total) > budget) {
        return null;
      }

      // Return only necessary details
      return {
        name: hotel.name,
        latitude: hotel.latitude,
        longitude: hotel.longitude,
        checkInDate: offer.checkInDate,
        checkOutDate: offer.checkOutDate,
        price: offer.price.total,
        currency: offer.price.currency,
        bedType: offer.room.typeEstimated.bedType,
        adults: offer.guests.adults,
      };
    })
    .filter(hotel => hotel !== null); // Remove null entries
};


// Controller method for hotel search
exports.searchHotels = async (req, res) => {
  var { cityCode, adults, checkInDate, checkOutDate, budget } = req.query;
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

    cityCode = usaCitiesIATA[cityCode];


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
            return hotel; // Return hotel for further processing
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

    // Extract only the necessary details and apply budget filtering
    const filteredHotelDetails = extractHotelDetails(hotels, budget);
    // extractHotelDetails(hotels, budget);

    // Send the response with the filtered hotel data
    return res.json(filteredHotelDetails.slice(0, targetCount)); // Ensure only the target count is returned

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
