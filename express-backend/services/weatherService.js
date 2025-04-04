require('dotenv').config();
const axios = require('axios');

const WEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Mock data for development
const MOCK_WEATHER = {
    "New York": {
        baseTemp: { high: 20, low: 10 },
        conditions: ['Clear', 'Clouds', 'Rain']
    },
    "San Diego": {
        baseTemp: { high: 25, low: 18 },
        conditions: ['Clear', 'Clear', 'Clouds']
    },
    // Add more cities as needed
};

const generateMockForecast = (location, startDate, endDate) => {
    const cityData = MOCK_WEATHER[location] || MOCK_WEATHER["New York"]; // Default to NYC if city not found
    const days = [];
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
        const dayIndex = days.length % 3; // Cycle through 3 weather conditions
        const randomVariation = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1

        days.push({
            date: date.toISOString().split('T')[0],
            highTemp: cityData.baseTemp.high + randomVariation,
            lowTemp: cityData.baseTemp.low + randomVariation,
            description: cityData.conditions[dayIndex],
            icon: getIconForCondition(cityData.conditions[dayIndex]),
            iconUrl: getIconUrlForCondition(cityData.conditions[dayIndex])
        });
    }

    return days;
};

const getIconForCondition = (condition) => {
    const iconMap = {
        'Clear': '01d',
        'Clouds': '03d',
        'Rain': '10d',
        'Snow': '13d',
        'Thunderstorm': '11d'
    };
    return iconMap[condition] || '01d';
};

const getIconUrlForCondition = (condition) => {
    const icon = getIconForCondition(condition);
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
};

const getCoordinates = async (cityName) => {
    try {
        const response = await axios.get(
            `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${WEATHER_API_KEY}`
        );
        
        if (response.data && response.data.length > 0) {
            return {
                lat: response.data[0].lat,
                lon: response.data[0].lon
            };
        }
        throw new Error('City not found');
    } catch (error) {
        console.error('Error getting coordinates:', error);
        throw error;
    }
};

const getHistoricalAverages = async (location, startDate, endDate) => {
    try {
        // Get coordinates
        const coords = await getCoordinates(location);
        
        // For future dates, we'll use climate data from the previous year
        const startMonth = new Date(startDate).getMonth() + 1; // getMonth() returns 0-11
        const endMonth = new Date(endDate).getMonth() + 1;

        // Get monthly climate data
        const response = await axios.get(
            `${BASE_URL}/climate/month?lat=${coords.lat}&lon=${coords.lon}&appid=${WEATHER_API_KEY}&units=metric`
        );

        // Process the monthly averages for the travel period
        const monthlyData = [];
        for (let month = startMonth; month <= endMonth; month++) {
            monthlyData.push({
                date: `2025-${month.toString().padStart(2, '0')}-01`,
                temperature: Math.round(response.data.list[month - 1].temp.average),
                description: getSeasonalDescription(month),
            });
        }

        return monthlyData;
    } catch (error) {
        console.error('Error getting historical averages:', error);
        
        // Fallback to typical seasonal temperatures if API fails
        return getSeasonalFallback(startDate, endDate);
    }
};

const getSeasonalDescription = (month) => {
    const seasons = {
        12: 'Cold winter weather',
        1: 'Cold winter weather',
        2: 'Cold winter weather',
        3: 'Mild spring weather',
        4: 'Mild spring weather',
        5: 'Mild spring weather',
        6: 'Warm summer weather',
        7: 'Hot summer weather',
        8: 'Hot summer weather',
        9: 'Warm fall weather',
        10: 'Mild fall weather',
        11: 'Cool fall weather'
    };
    return seasons[month] || 'Typical seasonal weather';
};

const getSeasonalFallback = (startDate, endDate) => {
    const startMonth = new Date(startDate).getMonth() + 1;
    const endMonth = new Date(endDate).getMonth() + 1;
    
    // Average temperatures by month for different climate zones
    const temperatures = {
        // Month: [avgTemp]
        1: 15, 2: 16, 3: 17, 4: 19, 5: 20, 
        6: 22, 7: 24, 8: 24, 9: 23, 
        10: 21, 11: 18, 12: 15
    };

    const forecasts = [];
    for (let month = startMonth; month <= endMonth; month++) {
        forecasts.push({
            date: `2025-${month.toString().padStart(2, '0')}-01`,
            temperature: temperatures[month],
            description: getSeasonalDescription(month)
        });
    }

    return forecasts;
};

const processForecasts = (forecastList) => {
    // Group forecasts by day
    const dailyForecasts = forecastList.reduce((acc, forecast) => {
        const date = new Date(forecast.dt * 1000).toISOString().split('T')[0];
        
        if (!acc[date]) {
            acc[date] = {
                temps: [],
                icons: [],
                descriptions: []
            };
        }

        acc[date].temps.push(forecast.main.temp);
        acc[date].icons.push(forecast.weather[0].icon);
        acc[date].descriptions.push(forecast.weather[0].main);

        return acc;
    }, {});

    // Process each day's data
    return Object.entries(dailyForecasts).map(([date, data]) => {
        const temps = data.temps;
        return {
            date,
            highTemp: Math.round(Math.max(...temps)),
            lowTemp: Math.round(Math.min(...temps)),
            // Get the most common weather condition for the day
            description: getMostFrequent(data.descriptions),
            icon: getMostFrequent(data.icons),
            iconUrl: `https://openweathermap.org/img/wn/${getMostFrequent(data.icons)}@2x.png`
        };
    });
};

const getMostFrequent = (arr) => {
    return arr.sort((a, b) =>
        arr.filter(v => v === a).length - arr.filter(v => v === b).length
    ).pop();
};

const getWeatherForecast = async (location, startDate, endDate) => {
    try {
        // Use mock data for now
        console.log('Using mock weather data for development');
        const forecasts = generateMockForecast(location, startDate, endDate);
        
        // Calculate average temperature
        const avgTemp = forecasts.reduce((sum, f) => 
            sum + (f.highTemp + f.lowTemp) / 2, 0
        ) / forecasts.length;

        return {
            forecasts,
            averageTemperature: Math.round(avgTemp)
        };
    } catch (error) {
        console.error('Error getting weather forecast:', error);
        throw error;
    }
};

// When API key is ready, uncomment this code and comment out the mock version above
/*
const getWeatherForecast = async (location, startDate, endDate) => {
    try {
        const coords = await getCoordinates(location);
        
        const response = await axios.get(
            `${BASE_URL}/forecast?lat=${coords.lat}&lon=${coords.lon}&appid=${WEATHER_API_KEY}&units=metric`
        );

        const forecasts = processForecasts(response.data.list);
        
        const avgTemp = forecasts.reduce((sum, f) => 
            sum + (f.highTemp + f.lowTemp) / 2, 0
        ) / forecasts.length;

        return {
            forecasts,
            averageTemperature: Math.round(avgTemp)
        };
    } catch (error) {
        console.error('Error getting weather forecast:', error);
        throw error;
    }
};
*/

const getClothingRecommendations = (temperature) => {
    if (temperature <= 10) {
        return "Pack warm clothing: heavy coat, sweaters, thermal wear, gloves, and a warm hat.";
    } else if (temperature <= 20) {
        return "Pack moderate clothing: light jacket, long sleeves, and pants.";
    } else if (temperature <= 25) {
        return "Pack light clothing: t-shirts, shorts, and a light jacket for evenings.";
    } else {
        return "Pack summer clothing: light and breathable clothes, shorts, t-shirts, and don't forget sunscreen!";
    }
};

module.exports = {
    getWeatherForecast,
    getClothingRecommendations
}; 