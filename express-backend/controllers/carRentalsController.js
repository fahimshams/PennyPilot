// const amadeusService = require('../services/amadeusService');

// exports.searchCarRentals = async (req, res) => {
//     const { pickUpLocationCode, dropOffLocationCode, pickUpDateTime, dropOffDateTime } = req.query;
  
//     try {
//       // Validate input
//       if (!pickUpLocationCode || !dropOffLocationCode || !pickUpDateTime || !dropOffDateTime) {
//         return res.status(400).json({ message: 'Missing required parameters' });
//       }
  
//       // Call Amadeus service
//       const carRentals = await amadeusService.searchCarRentals(pickUpLocationCode, dropOffLocationCode, pickUpDateTime, dropOffDateTime);
    
//       res.status(200).json(carRentals);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
  
//   } 

const usaCitiesIATA = require("../data/CityIata");
const carRentals = require('../data/dummyCarRentalData'); 

const extractCarRentalDetails = (responseData, travelBudget) => {
    return responseData
    .filter(carRental => parseFloat(carRental.price.total) <= travelBudget)
    .map(carRental => {
        return {
            // Basic Information
            id: carRental.id,
            provider: carRental.provider,
            model: carRental.vehicle.model,
            type: carRental.vehicle.type,
            
            // Pricing Information
            price: {
                total: carRental.price.total,
                base: carRental.price.base,
                currency: carRental.price.currency,
                fees: carRental.price.fees,
                grandTotal: carRental.price.grandTotal
            },
            
            // Vehicle Details
            vehicle: {
                passengerCapacity: carRental.vehicle.passengerCapacity,
                baggageCapacity: carRental.vehicle.baggageCapacity,
                features: carRental.vehicle.features,
                fuelPolicy: carRental.vehicle.fuelPolicy,
                transmission: carRental.vehicle.transmission
            },
            
            // Location Information
            pickupLocation: {
                iataCode: carRental.pickupLocation.iataCode,
                name: carRental.pickupLocation.name,
                address: carRental.pickupLocation.address,
                terminal: carRental.pickupLocation.terminal,
                at: carRental.pickupLocation.at
            },
            
            dropoffLocation: {
                iataCode: carRental.dropoffLocation.iataCode,
                name: carRental.dropoffLocation.name,
                address: carRental.dropoffLocation.address,
                terminal: carRental.dropoffLocation.terminal,
                at: carRental.dropoffLocation.at
            },
            
            // Additional Details
            mileage: {
                allowed: carRental.mileage.allowed,
                extraMileCost: carRental.mileage.extraMileCost
            },
            
            insuranceOptions: carRental.insuranceOptions,
            
            // Booking Information
            instantBookingAvailable: carRental.instantBookingAvailable,
            lastBookingDate: carRental.lastBookingDate
        };
    });
}

exports.searchCarRentals = async (req, res) => {
    var { pickupLocationCode, dropoffLocationCode, pickupDateTime, dropoffDateTime, travelBudget } = req.query;

    try {
        if (!pickupLocationCode || !dropoffLocationCode || !pickupDateTime || !dropoffDateTime || !travelBudget) {
            return res.status(400).json({ message: 'Missing required parameters' });
        }

        pickupLocationCode = usaCitiesIATA[pickupLocationCode];
        dropoffLocationCode = usaCitiesIATA[dropoffLocationCode];

        const carRentalDetails = extractCarRentalDetails(carRentals, travelBudget);
        res.status(200).json(carRentalDetails);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
