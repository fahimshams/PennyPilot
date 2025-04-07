require('dotenv').config();
const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const extractTravelDetails = async (message) => {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: `You are a travel assistant. Extract travel details from user messages. Return only JSON with the following structure: 
                    {
                        from: string, 
                        to: string, 
                        startDate: string (format: YYYY-MM-DD), 
                        endDate: string (format: YYYY-MM-DD), 
                        passengers: string, 
                        budget: string
                    }. 
                    If any detail is missing, ask the user for it and fill it in the json object. 
                    For dates, if not specified, use today's date for startDate and 7 days later for endDate.`
                },
                {
                    role: "user",
                    content: message
                }
            ],
            response_format: { type: "json_object" }
        });
        const travelDetails = JSON.parse(completion.choices[0].message.content);
        
        // Ensure all required fields are present
        if (!travelDetails.from || !travelDetails.to) {
            throw new Error('Missing required travel details');
        }

        // Set default values if not provided
        if (!travelDetails.startDate) {
            const today = new Date();
            travelDetails.startDate = today.toISOString().split('T')[0];
        }
        if (!travelDetails.endDate) {
            const endDate = new Date(travelDetails.startDate);
            endDate.setDate(endDate.getDate() + 7);
            travelDetails.endDate = endDate.toISOString().split('T')[0];
        }
        if (!travelDetails.passengers) {
            travelDetails.passengers = "1";
        }
        if (!travelDetails.budget) {
            travelDetails.budget = "1000";
        }

        return travelDetails;
    } catch (error) {
        console.error('Error extracting travel details:', error);
        throw error;
    }
};

const getActivitiesRecommendations = async (location, weatherDescription, temperature) => {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: "You are a travel assistant. Provide 5 suggested activities based on the location and weather conditions. Return JSON with structure: {activities: string[]}."
                },
                {
                    role: "user",
                    content: `Suggest activities for ${location} with weather conditions: ${weatherDescription} and temperature: ${temperature}°C`
                }
            ],
            response_format: { type: "json_object" }
        });

        return JSON.parse(completion.choices[0].message.content);
    } catch (error) {
        console.error('Error getting activities recommendations:', error);
        throw error;
    }
};

module.exports = {
    extractTravelDetails,
    getActivitiesRecommendations
}; 