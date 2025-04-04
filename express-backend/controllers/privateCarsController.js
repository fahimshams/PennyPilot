const express = require('express');
const router = express.Router();
const privateCars = require('../data/dummyPrivateCarData');

// Helper function to extract and filter private car details
const extractPrivateCarDetails = (carsData, travelBudget) => {
    return carsData
        .map(car => {
            const baseRate = car.basePrice;
            const fuelCost = baseRate * 0.2;
            const maintenanceCost = baseRate * 0.15;
            const insuranceCost = baseRate * 0.1;
            const driverCost = baseRate * 0.25;
            const refreshmentsCost = baseRate * 0.1;
            const totalCost = baseRate + fuelCost + maintenanceCost + insuranceCost + driverCost + refreshmentsCost;

            // Check if within budget
            if (totalCost > travelBudget) {
                return null;
            }

            return {
                // Basic Information
                id: car.id,
                model: car.model,
                engineType: car.engineType,
                vin: car.vin,
                
                // Pricing Information
                price: {
                    total: totalCost.toFixed(2),
                    base: baseRate.toFixed(2),
                    currency: "USD",
                    breakdown: {
                        baseRate: baseRate.toFixed(2),
                        fuelCost: fuelCost.toFixed(2),
                        maintenanceCost: maintenanceCost.toFixed(2),
                        insuranceCost: insuranceCost.toFixed(2),
                        driverCost: driverCost.toFixed(2),
                        refreshmentsCost: refreshmentsCost.toFixed(2)
                    }
                },
                
                // Vehicle Details
                vehicle: {
                    passengerCapacity: car.specifications.seats,
                    baggageCapacity: car.specifications.luggage,
                    features: car.features,
                    transmission: car.specifications.transmission,
                    fuelType: car.specifications.fuelType,
                    year: car.specifications.year,
                    performance: {
                        power: car.specifications.power,
                        torque: car.specifications.torque,
                        acceleration: car.specifications.acceleration
                    }
                },
                
                // Availability Information
                availability: {
                    status: "Available",
                    instantBookingAvailable: true
                }
            };
        })
        .filter(car => car !== null); // Remove cars that exceed budget
};

// Controller method for private car search
exports.searchPrivateCars = async (req, res) => {
    const { model, engineType, vin, travelBudget } = req.query;

    try {
        // Validate required parameters
        if (!travelBudget) {
            return res.status(400).json({
                error: 'Travel budget is required'
            });
        }

        // Validate search criteria
        if (!vin && (!model || !engineType)) {
            return res.status(400).json({
                error: 'Either VIN or both model and engine type are required'
            });
        }

        // Filter cars based on provided criteria
        let filteredCars = [...privateCars];
        
        if (vin) {
            // If VIN is provided, search only by VIN
            filteredCars = filteredCars.filter(car => 
                car.vin.toLowerCase().includes(vin.toLowerCase())
            );
        } else {
            // If model and engine type are provided, search by both
            filteredCars = filteredCars.filter(car => 
                car.model.toLowerCase().includes(model.toLowerCase()) &&
                car.engineType.toLowerCase().includes(engineType.toLowerCase())
            );
        }

        // If no cars found
        if (filteredCars.length === 0) {
            return res.status(404).json({
                error: 'No cars found matching the specified criteria'
            });
        }

        // Extract and format car details
        const carDetails = extractPrivateCarDetails(filteredCars, parseFloat(travelBudget));

        // If no cars within budget
        if (carDetails.length === 0) {
            return res.status(404).json({
                error: 'No cars found within the specified budget'
            });
        }

        // Sort by total cost
        carDetails.sort((a, b) => parseFloat(a.price.total) - parseFloat(b.price.total));

        res.status(200).json(carDetails);

    } catch (error) {
        console.error('Error in private cars search:', error);
        res.status(500).json({
            error: 'Internal server error while searching private cars'
        });
    }
};
