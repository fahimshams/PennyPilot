var carRentalsData = [
    {
        "type": "car-rental",
        "id": "1",
        "provider": "Hertz",
        "instantBookingAvailable": true,
        "lastBookingDate": "2024-12-15",
        "vehicle": {
            "model": "Toyota Camry",
            "type": "Midsize Sedan",
            "passengerCapacity": 5,
            "baggageCapacity": 2,
            "features": ["AC", "Bluetooth", "Backup Camera"],
            "fuelPolicy": "Full to Full",
            "transmission": "Automatic"
        },
        "pickupLocation": {
            "iataCode": "PHL",
            "name": "Philadelphia International Airport",
            "address": "8000 Essington Ave, Philadelphia, PA 19153",
            "terminal": "Terminal E",
            "at": "2024-12-20T10:00:00"
        },
        "dropoffLocation": {
            "iataCode": "PHL",
            "name": "Philadelphia International Airport",
            "address": "8000 Essington Ave, Philadelphia, PA 19153",
            "terminal": "Terminal E",
            "at": "2024-12-26T14:00:00"
        },
        "price": {
            "currency": "USD",
            "total": "420.50",
            "base": "350.00",
            "fees": [
                {
                    "amount": "35.50",
                    "type": "AIRPORT_FEE"
                },
                {
                    "amount": "35.00",
                    "type": "TAX"
                }
            ],
            "grandTotal": "420.50"
        },
        "mileage": {
            "allowed": "Unlimited",
            "extraMileCost": "0.00"
        },
        "insuranceOptions": [
            {
                "type": "CDW",
                "price": "25.99",
                "coverage": "Damage Waiver"
            },
            {
                "type": "ALI",
                "price": "12.99",
                "coverage": "Supplemental Liability"
            }
        ]
    },
    {
        "type": "car-rental",
        "id": "2",
        "provider": "Avis",
        "instantBookingAvailable": true,
        "lastBookingDate": "2024-12-15",
        "vehicle": {
            "model": "Ford Escape",
            "type": "Compact SUV",
            "passengerCapacity": 5,
            "baggageCapacity": 3,
            "features": ["AC", "Apple CarPlay", "Blind Spot Monitoring"],
            "fuelPolicy": "Full to Full",
            "transmission": "Automatic"
        },
        "pickupLocation": {
            "iataCode": "DFW",
            "name": "Dallas/Fort Worth International Airport",
            "address": "2400 Aviation Dr, DFW Airport, TX 75261",
            "terminal": "Terminal A",
            "at": "2024-12-20T12:00:00"
        },
        "dropoffLocation": {
            "iataCode": "DFW",
            "name": "Dallas/Fort Worth International Airport",
            "address": "2400 Aviation Dr, DFW Airport, TX 75261",
            "terminal": "Terminal A",
            "at": "2024-12-26T12:00:00"
        },
        "price": {
            "currency": "USD",
            "total": "385.75",
            "base": "325.00",
            "fees": [
                {
                    "amount": "30.75",
                    "type": "AIRPORT_FEE"
                },
                {
                    "amount": "30.00",
                    "type": "TAX"
                }
            ],
            "grandTotal": "385.75"
        },
        "mileage": {
            "allowed": "Unlimited",
            "extraMileCost": "0.00"
        },
        "insuranceOptions": [
            {
                "type": "CDW",
                "price": "29.99",
                "coverage": "Damage Waiver"
            }
        ]
    },
    {
        "type": "car-rental",
        "id": "3",
        "provider": "Enterprise",
        "instantBookingAvailable": false,
        "lastBookingDate": "2024-12-10",
        "vehicle": {
            "model": "Chevrolet Malibu",
            "type": "Fullsize Sedan",
            "passengerCapacity": 5,
            "baggageCapacity": 3,
            "features": ["AC", "Android Auto", "Lane Keep Assist"],
            "fuelPolicy": "Full to Full",
            "transmission": "Automatic"
        },
        "pickupLocation": {
            "iataCode": "PHL",
            "name": "Philadelphia Downtown",
            "address": "1234 Market St, Philadelphia, PA 19107",
            "at": "2024-12-20T09:00:00"
        },
        "dropoffLocation": {
            "iataCode": "PHL",
            "name": "Philadelphia International Airport",
            "address": "8000 Essington Ave, Philadelphia, PA 19153",
            "terminal": "Terminal D",
            "at": "2024-12-26T16:00:00"
        },
        "price": {
            "currency": "USD",
            "total": "475.20",
            "base": "400.00",
            "fees": [
                {
                    "amount": "45.20",
                    "type": "DROP_FEE"
                },
                {
                    "amount": "30.00",
                    "type": "TAX"
                }
            ],
            "grandTotal": "475.20"
        },
        "mileage": {
            "allowed": "200/day",
            "extraMileCost": "0.25"
        },
        "insuranceOptions": [
            {
                "type": "CDW",
                "price": "22.50",
                "coverage": "Damage Waiver"
            },
            {
                "type": "PAI",
                "price": "8.99",
                "coverage": "Personal Accident"
            }
        ]
    },
    {
        "type": "car-rental",
        "id": "4",
        "provider": "Budget",
        "instantBookingAvailable": true,
        "lastBookingDate": "2024-12-18",
        "vehicle": {
            "model": "Jeep Wrangler",
            "type": "Standard SUV",
            "passengerCapacity": 5,
            "baggageCapacity": 4,
            "features": ["4WD", "Convertible", "Navigation"],
            "fuelPolicy": "Full to Full",
            "transmission": "Automatic"
        },
        "pickupLocation": {
            "iataCode": "DFW",
            "name": "Dallas Love Field",
            "address": "8008 Herb Kelleher Way, Dallas, TX 75235",
            "at": "2024-12-20T11:30:00"
        },
        "dropoffLocation": {
            "iataCode": "DFW",
            "name": "Dallas Love Field",
            "address": "8008 Herb Kelleher Way, Dallas, TX 75235",
            "at": "2024-12-26T11:30:00"
        },
        "price": {
            "currency": "USD",
            "total": "625.80",
            "base": "550.00",
            "fees": [
                {
                    "amount": "45.80",
                    "type": "AIRPORT_FEE"
                },
                {
                    "amount": "30.00",
                    "type": "TAX"
                }
            ],
            "grandTotal": "625.80"
        },
        "mileage": {
            "allowed": "Unlimited",
            "extraMileCost": "0.00"
        },
        "insuranceOptions": [
            {
                "type": "CDW",
                "price": "35.00",
                "coverage": "Damage Waiver"
            },
            {
                "type": "SLI",
                "price": "18.50",
                "coverage": "Supplemental Liability"
            }
        ]
    },
    {
        "type": "car-rental",
        "id": "5",
        "provider": "Alamo",
        "instantBookingAvailable": true,
        "lastBookingDate": "2024-12-20",
        "vehicle": {
            "model": "Nissan Altima",
            "type": "Midsize Sedan",
            "passengerCapacity": 5,
            "baggageCapacity": 2,
            "features": ["AC", "Keyless Entry", "Adaptive Cruise Control"],
            "fuelPolicy": "Full to Full",
            "transmission": "Automatic"
        },
        "pickupLocation": {
            "iataCode": "PHL",
            "name": "Philadelphia International Airport",
            "address": "8000 Essington Ave, Philadelphia, PA 19153",
            "terminal": "Terminal D",
            "at": "2024-12-20T14:00:00"
        },
        "dropoffLocation": {
            "iataCode": "PHL",
            "name": "Philadelphia International Airport",
            "address": "8000 Essington Ave, Philadelphia, PA 19153",
            "terminal": "Terminal D",
            "at": "2024-12-26T10:00:00"
        },
        "price": {
            "currency": "USD",
            "total": "390.25",
            "base": "325.00",
            "fees": [
                {
                    "amount": "35.25",
                    "type": "AIRPORT_FEE"
                },
                {
                    "amount": "30.00",
                    "type": "TAX"
                }
            ],
            "grandTotal": "390.25"
        },
        "mileage": {
            "allowed": "Unlimited",
            "extraMileCost": "0.00"
        },
        "insuranceOptions": [
            {
                "type": "CDW",
                "price": "24.99",
                "coverage": "Damage Waiver"
            }
        ]
    }
];

module.exports = carRentalsData;