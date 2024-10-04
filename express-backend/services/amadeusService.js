require('dotenv').config();

const Amadeus = require('amadeus');

var amadeus = new Amadeus({
    clientId: process.env.AMADEUS_CLIENT_ID,
    clientSecret: process.env.AMADEUS_CLIENT_SECRET
});



exports.searchFlights = async (originLocationCode, destinationLocationCode, departureDate, adults) => {
    try {
        const response = await amadeus.shopping.flightOffersSearch.get({
            originLocationCode: originLocationCode,
            destinationLocationCode: destinationLocationCode,
            departureDate: departureDate,
            adults: adults
        })

        console.log(process.env.AMADEUS_CLIENT_ID)
        console.log(process.env.AMADEUS_CLIENT_SECRET)

        return response.data[0];
    }
    catch(error){
        console.error(error);
        throw new Error('Error fetching flight data from Amadeus');
    }
};

