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
                    content: "You are a travel assistant. Extract travel details from user messages. Return only JSON with the following structure: {from: string, to: string, startDate: string, endDate: string, passengers: number, budget: number}. If any detail is missing, ask the user for it and fill it in the json object."
                },
                {
                    role: "user",
                    content: message
                }
            ],
            response_format: { type: "json_object" }
        });
        console.log(completion.choices[0].message.content);
        return JSON.parse(completion.choices[0].message.content);
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