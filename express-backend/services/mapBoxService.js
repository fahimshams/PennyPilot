require('dotenv').config();
const axios = require("axios");

const API_KEY = process.env.MAPBOX_API_KEY;

const getSuggestions = async (query) => {
    try {
        const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${API_KEY}`);
        return response.data.features;
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching location suggestions from Mapbox');
    }
}

module.exports = {
    getSuggestions
}