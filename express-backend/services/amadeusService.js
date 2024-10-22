require('dotenv').config();

const Amadeus = require('amadeus');

var amadeus = new Amadeus({
    clientId: process.env.AMADEUS_CLIENT_ID,
    clientSecret: process.env.AMADEUS_CLIENT_SECRET
});

//Service for flights from amadeus
const searchFlights = async (originLocationCode, destinationLocationCode, departureDate, returnDate, adults) => {
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

//Service for car rentals from amadeus
const searchCarRentals = async (pickUpLocationCode, dropOffLocationCode, pickUpDateTime, dropOffDateTime) => {
    try {
        const response = await amadeus.shopping.carRentals.get({
            pickUpLocationCode: pickUpLocationCode,
            dropOffLocationCode: dropOffLocationCode,
            pickUpDateTime: pickUpDateTime,
            dropOffDateTime: dropOffDateTime
        });

        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching car rental data from Amadeus');
    }
};


//Service to get hotel IDs from amadeus
const searchHotelsIds = async (cityCode) => {
    try {
        const response = await amadeus.referenceData.locations.hotels.byCity.get({
            cityCode: cityCode,
           

        })

        const hotelIds = response.data.map(hotel => {
            return hotel.hotelId;
        })

        return hotelIds;

        // return response.data;
    }

    catch (error) {
        console.error(error);
        throw new Error('Error fetching hotel ids data from Amadeus');
    }
}

const searchHotels = async (ids) => {
    return [];
}

module.exports ={
    searchFlights,
    searchCarRentals,
    searchHotels
}