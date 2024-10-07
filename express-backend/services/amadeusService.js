require('dotenv').config();

const Amadeus = require('amadeus');

var amadeus = new Amadeus({
    clientId: process.env.AMADEUS_CLIENT_ID,
    clientSecret: process.env.AMADEUS_CLIENT_SECRET
});

exports.searchFlights = async (originLocationCode, destinationLocationCode, departureDate, returnDate, adults) => {
    try {
        const response = await amadeus.shopping.flightOffersSearch.get({
            originLocationCode: originLocationCode,
            destinationLocationCode: destinationLocationCode,
            departureDate: departureDate,
            returnDate: returnDate,
            adults: adults
        })


        return response.data;
    }
    catch(error){
        console.error(error);
        throw new Error('Error fetching flight data from Amadeus');
    }
};

