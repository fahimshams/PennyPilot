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


const searchHotels = async (cityCode) => {
    try {
        console.log(process.env.AMADEUS_CLIENT_ID)
        console.log(process.env.AMADEUS_CLIENT_SECRET)
        console.log(cityCode);
        const response = await amadeus.shopping.hotelOffers.get({
            cityCode: cityCode,
 

        })

        // const hotels = response.data.map(offer => {
        //     const hotelName = offer.hotel.name;
        //     const checkIn = offer.offers[0].checkInDate;
        //     const checkOut = offer.offers[0].checkOutDate;
        //     const price = offer.offers[0].price.total;
        //     return { hotelName, checkIn, checkOut, price };
        // });

        return response.data;
    }

    catch (error) {
        console.error(error);
        throw new Error('Error fetching hotel data from Amadeus');
    }
}

module.exports ={
    searchFlights,
    searchCarRentals,
    searchHotels
}