const openaiService = require('../services/openaiService');
const weatherService = require('../services/weatherService');

exports.processMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const travelDetails = await openaiService.extractTravelDetails(message);
        res.json({ travelDetails });
    } catch (error) {
        console.error('Error processing message:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.getWeatherAndActivities = async (req, res) => {
    try {
        const { location, dates } = req.body;
        
        if (!location || !dates || !Array.isArray(dates) || dates.length !== 2) {
            return res.status(400).json({ 
                error: 'Invalid request. Please provide location and dates array with start and end dates.' 
            });
        }

        const [startDate, endDate] = dates;
        
        // Get weather forecast with specific dates
        const weatherData = await weatherService.getWeatherForecast(location, startDate, endDate);
        
        if (!weatherData || !weatherData.forecasts) {
            throw new Error('Failed to fetch weather data');
        }

        // Get clothing recommendations based on average temperature
        const clothingRecommendations = weatherService.getClothingRecommendations(weatherData.averageTemperature);

        // Get activities recommendations from OpenAI based on weather
        const weatherDescription = weatherData.forecasts.map(f => f.description).join(', ');
        const activitiesResponse = await openaiService.getActivitiesRecommendations(
            location,
            weatherDescription,
            weatherData.averageTemperature
        );

        res.json({
            weather: {
                forecasts: weatherData.forecasts,
                averageTemperature: weatherData.averageTemperature,
                clothingRecommendations
            },
            activities: activitiesResponse.activities
        });
    } catch (error) {
        console.error('Error getting weather and activities:', error);
        res.status(500).json({ 
            error: error.message || 'Failed to fetch weather and activities',
            details: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
}; 