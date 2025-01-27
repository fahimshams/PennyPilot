const amadeusService = require('../services/amadeusService');

// Controller method for activities search
exports.searchActivities = async (req, res) => {
    const { latitude, longitude } = req.query;


    try {
        // Validate input
        if (!latitude || !longitude) {
            return res.status(400).json({ message: 'Missing required parameters' });
        }

        // Call Amadeus service
        const activites = await amadeusService.searchActivities(latitude, longitude);
        res.status(200).json(activites);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


