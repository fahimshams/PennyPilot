const amadeusService = require('../services/amadeusService');

exports.searchCarRentals = async (req, res) => {
    const { pickUpLocationCode, dropOffLocationCode, pickUpDateTime, dropOffDateTime } = req.query;
  
    try {
      // Validate input
      if (!pickUpLocationCode || !dropOffLocationCode || !pickUpDateTime || !dropOffDateTime) {
        return res.status(400).json({ message: 'Missing required parameters' });
      }
  
      // Call Amadeus service
      const carRentals = await amadeusService.searchCarRentals(pickUpLocationCode, dropOffLocationCode, pickUpDateTime, dropOffDateTime);
    
      res.status(200).json(carRentals);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  
  } 