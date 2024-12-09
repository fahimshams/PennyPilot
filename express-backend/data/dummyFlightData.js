var flightsData =
[
        {
            "type": "flight-offer",
            "id": "1",
            "source": "GDS",
            "instantTicketingRequired": false,
            "nonHomogeneous": false,
            "oneWay": false,
            "isUpsellOffer": false,
            "lastTicketingDate": "2024-12-10",
            "lastTicketingDateTime": "2024-12-10",
            "numberOfBookableSeats": 9,
            "itineraries": [
                {
                    "duration": "PT3H33M",
                    "segments": [
                        {
                            "departure": {
                                "iataCode": "PHL",
                                "terminal": "D",
                                "at": "2024-12-20T09:17:00"
                            },
                            "arrival": {
                                "iataCode": "DFW",
                                "terminal": "E",
                                "at": "2024-12-20T11:50:00"
                            },
                            "carrierCode": "NK",
                            "number": "1014",
                            "aircraft": {
                                "code": "32A"
                            },
                            "operating": {
                                "carrierCode": "NK"
                            },
                            "duration": "PT3H33M",
                            "id": "27",
                            "numberOfStops": 0,
                            "blacklistedInEU": false
                        }
                    ]
                },
                {
                    "duration": "PT3H23M",
                    "segments": [
                        {
                            "departure": {
                                "iataCode": "DFW",
                                "terminal": "E",
                                "at": "2024-12-25T21:30:00"
                            },
                            "arrival": {
                                "iataCode": "PHL",
                                "terminal": "D",
                                "at": "2024-12-26T01:53:00"
                            },
                            "carrierCode": "NK",
                            "number": "1021",
                            "aircraft": {
                                "code": "32A"
                            },
                            "operating": {
                                "carrierCode": "NK"
                            },
                            "duration": "PT3H23M",
                            "id": "80",
                            "numberOfStops": 0,
                            "blacklistedInEU": false
                        }
                    ]
                }
            ],
            "price": {
                "currency": "USD",
                "total": "169.00",
                "base": "129.10",
                "fees": [
                    {
                        "amount": "0.00",
                        "type": "SUPPLIER"
                    },
                    {
                        "amount": "0.00",
                        "type": "TICKETING"
                    }
                ],
                "grandTotal": "169.00"
            },
            "pricingOptions": {
                "fareType": [
                    "PUBLISHED"
                ],
                "includedCheckedBagsOnly": false
            },
            "validatingAirlineCodes": [
                "NK"
            ],
            "travelerPricings": [
                {
                    "travelerId": "1",
                    "fareOption": "STANDARD",
                    "travelerType": "ADULT",
                    "price": {
                        "currency": "USD",
                        "total": "169.00",
                        "base": "129.10"
                    },
                    "fareDetailsBySegment": [
                        {
                            "segmentId": "27",
                            "cabin": "ECONOMY",
                            "fareBasis": "UA7NR",
                            "class": "U",
                            "includedCheckedBags": {
                                "quantity": 0
                            }
                        },
                        {
                            "segmentId": "80",
                            "cabin": "ECONOMY",
                            "fareBasis": "GA14Z5",
                            "class": "G",
                            "includedCheckedBags": {
                                "quantity": 0
                            }
                        }
                    ]
                }
            ]
        },
        {
            "type": "flight-offer",
            "id": "2",
            "source": "GDS",
            "instantTicketingRequired": false,
            "nonHomogeneous": false,
            "oneWay": false,
            "isUpsellOffer": false,
            "lastTicketingDate": "2024-12-10",
            "lastTicketingDateTime": "2024-12-10",
            "numberOfBookableSeats": 4,
            "itineraries": [
                {
                    "duration": "PT3H33M",
                    "segments": [
                        {
                            "departure": {
                                "iataCode": "PHL",
                                "terminal": "D",
                                "at": "2024-12-20T09:17:00"
                            },
                            "arrival": {
                                "iataCode": "DFW",
                                "terminal": "E",
                                "at": "2024-12-20T11:50:00"
                            },
                            "carrierCode": "NK",
                            "number": "1014",
                            "aircraft": {
                                "code": "32A"
                            },
                            "operating": {
                                "carrierCode": "NK"
                            },
                            "duration": "PT3H33M",
                            "id": "27",
                            "numberOfStops": 0,
                            "blacklistedInEU": false
                        }
                    ]
                },
                {
                    "duration": "PT20H25M",
                    "segments": [
                        {
                            "departure": {
                                "iataCode": "DFW",
                                "terminal": "E",
                                "at": "2024-12-25T10:55:00"
                            },
                            "arrival": {
                                "iataCode": "ATL",
                                "terminal": "N",
                                "at": "2024-12-25T14:06:00"
                            },
                            "carrierCode": "NK",
                            "number": "825",
                            "aircraft": {
                                "code": "32B"
                            },
                            "operating": {
                                "carrierCode": "NK"
                            },
                            "duration": "PT2H11M",
                            "id": "81",
                            "numberOfStops": 0,
                            "blacklistedInEU": false
                        },
                        {
                            "departure": {
                                "iataCode": "ATL",
                                "terminal": "N",
                                "at": "2024-12-26T06:15:00"
                            },
                            "arrival": {
                                "iataCode": "PHL",
                                "terminal": "D",
                                "at": "2024-12-26T08:20:00"
                            },
                            "carrierCode": "NK",
                            "number": "3154",
                            "aircraft": {
                                "code": "32A"
                            },
                            "operating": {
                                "carrierCode": "NK"
                            },
                            "duration": "PT2H5M",
                            "id": "82",
                            "numberOfStops": 0,
                            "blacklistedInEU": false
                        }
                    ]
                }
            ],
            "price": {
                "currency": "USD",
                "total": "201.40",
                "base": "150.40",
                "fees": [
                    {
                        "amount": "0.00",
                        "type": "SUPPLIER"
                    },
                    {
                        "amount": "0.00",
                        "type": "TICKETING"
                    }
                ],
                "grandTotal": "201.40"
            },
            "pricingOptions": {
                "fareType": [
                    "PUBLISHED"
                ],
                "includedCheckedBagsOnly": false
            },
            "validatingAirlineCodes": [
                "NK"
            ],
            "travelerPricings": [
                {
                    "travelerId": "1",
                    "fareOption": "STANDARD",
                    "travelerType": "ADULT",
                    "price": {
                        "currency": "USD",
                        "total": "201.40",
                        "base": "150.40"
                    },
                    "fareDetailsBySegment": [
                        {
                            "segmentId": "27",
                            "cabin": "ECONOMY",
                            "fareBasis": "UA7NR",
                            "class": "U",
                            "includedCheckedBags": {
                                "quantity": 0
                            }
                        },
                        {
                            "segmentId": "81",
                            "cabin": "ECONOMY",
                            "fareBasis": "GA14O1",
                            "class": "G",
                            "includedCheckedBags": {
                                "quantity": 0
                            }
                        },
                        {
                            "segmentId": "82",
                            "cabin": "ECONOMY",
                            "fareBasis": "GA14Z5",
                            "class": "G",
                            "includedCheckedBags": {
                                "quantity": 0
                            }
                        }
                    ]
                }
            ]
        },
        {
            "type": "flight-offer",
            "id": "3",
            "source": "GDS",
            "instantTicketingRequired": false,
            "nonHomogeneous": false,
            "oneWay": false,
            "isUpsellOffer": false,
            "lastTicketingDate": "2024-12-10",
            "lastTicketingDateTime": "2024-12-10",
            "numberOfBookableSeats": 4,
            "itineraries": [
                {
                    "duration": "PT6H35M",
                    "segments": [
                        {
                            "departure": {
                                "iataCode": "PHL",
                                "terminal": "D",
                                "at": "2024-12-20T15:20:00"
                            },
                            "arrival": {
                                "iataCode": "MCO",
                                "at": "2024-12-20T18:05:00"
                            },
                            "carrierCode": "NK",
                            "number": "845",
                            "aircraft": {
                                "code": "32Q"
                            },
                            "operating": {
                                "carrierCode": "NK"
                            },
                            "duration": "PT2H45M",
                            "id": "34",
                            "numberOfStops": 0,
                            "blacklistedInEU": false
                        },
                        {
                            "departure": {
                                "iataCode": "MCO",
                                "at": "2024-12-20T19:03:00"
                            },
                            "arrival": {
                                "iataCode": "DFW",
                                "terminal": "E",
                                "at": "2024-12-20T20:55:00"
                            },
                            "carrierCode": "NK",
                            "number": "1096",
                            "aircraft": {
                                "code": "32N"
                            },
                            "operating": {
                                "carrierCode": "NK"
                            },
                            "duration": "PT2H52M",
                            "id": "35",
                            "numberOfStops": 0,
                            "blacklistedInEU": false
                        }
                    ]
                },
                {
                    "duration": "PT3H23M",
                    "segments": [
                        {
                            "departure": {
                                "iataCode": "DFW",
                                "terminal": "E",
                                "at": "2024-12-25T21:30:00"
                            },
                            "arrival": {
                                "iataCode": "PHL",
                                "terminal": "D",
                                "at": "2024-12-26T01:53:00"
                            },
                            "carrierCode": "NK",
                            "number": "1021",
                            "aircraft": {
                                "code": "32A"
                            },
                            "operating": {
                                "carrierCode": "NK"
                            },
                            "duration": "PT3H23M",
                            "id": "80",
                            "numberOfStops": 0,
                            "blacklistedInEU": false
                        }
                    ]
                }
            ],
            "price": {
                "currency": "USD",
                "total": "206.44",
                "base": "155.14",
                "fees": [
                    {
                        "amount": "0.00",
                        "type": "SUPPLIER"
                    },
                    {
                        "amount": "0.00",
                        "type": "TICKETING"
                    }
                ],
                "grandTotal": "206.44"
            },
            "pricingOptions": {
                "fareType": [
                    "PUBLISHED"
                ],
                "includedCheckedBagsOnly": false
            },
            "validatingAirlineCodes": [
                "NK"
            ],
            "travelerPricings": [
                {
                    "travelerId": "1",
                    "fareOption": "STANDARD",
                    "travelerType": "ADULT",
                    "price": {
                        "currency": "USD",
                        "total": "206.44",
                        "base": "155.14"
                    },
                    "fareDetailsBySegment": [
                        {
                            "segmentId": "34",
                            "cabin": "ECONOMY",
                            "fareBasis": "UA7NR",
                            "class": "U",
                            "includedCheckedBags": {
                                "quantity": 0
                            }
                        },
                        {
                            "segmentId": "35",
                            "cabin": "ECONOMY",
                            "fareBasis": "UA7NR",
                            "class": "U",
                            "includedCheckedBags": {
                                "quantity": 0
                            }
                        },
                        {
                            "segmentId": "80",
                            "cabin": "ECONOMY",
                            "fareBasis": "GA14Z5",
                            "class": "G",
                            "includedCheckedBags": {
                                "quantity": 0
                            }
                        }
                    ]
                }
            ]
        },
        {
            "type": "flight-offer",
            "id": "4",
            "source": "GDS",
            "instantTicketingRequired": false,
            "nonHomogeneous": false,
            "oneWay": false,
            "isUpsellOffer": false,
            "lastTicketingDate": "2024-12-10",
            "lastTicketingDateTime": "2024-12-10",
            "numberOfBookableSeats": 4,
            "itineraries": [
                {
                    "duration": "PT7H59M",
                    "segments": [
                        {
                            "departure": {
                                "iataCode": "PHL",
                                "terminal": "D",
                                "at": "2024-12-20T15:20:00"
                            },
                            "arrival": {
                                "iataCode": "MCO",
                                "at": "2024-12-20T18:05:00"
                            },
                            "carrierCode": "NK",
                            "number": "845",
                            "aircraft": {
                                "code": "32Q"
                            },
                            "operating": {
                                "carrierCode": "NK"
                            },
                            "duration": "PT2H45M",
                            "id": "65",
                            "numberOfStops": 0,
                            "blacklistedInEU": false
                        },
                        {
                            "departure": {
                                "iataCode": "MCO",
                                "at": "2024-12-20T20:30:00"
                            },
                            "arrival": {
                                "iataCode": "DFW",
                                "terminal": "E",
                                "at": "2024-12-20T22:19:00"
                            },
                            "carrierCode": "NK",
                            "number": "503",
                            "aircraft": {
                                "code": "32A"
                            },
                            "operating": {
                                "carrierCode": "NK"
                            },
                            "duration": "PT2H49M",
                            "id": "66",
                            "numberOfStops": 0,
                            "blacklistedInEU": false
                        }
                    ]
                },
                {
                    "duration": "PT3H23M",
                    "segments": [
                        {
                            "departure": {
                                "iataCode": "DFW",
                                "terminal": "E",
                                "at": "2024-12-25T21:30:00"
                            },
                            "arrival": {
                                "iataCode": "PHL",
                                "terminal": "D",
                                "at": "2024-12-26T01:53:00"
                            },
                            "carrierCode": "NK",
                            "number": "1021",
                            "aircraft": {
                                "code": "32A"
                            },
                            "operating": {
                                "carrierCode": "NK"
                            },
                            "duration": "PT3H23M",
                            "id": "80",
                            "numberOfStops": 0,
                            "blacklistedInEU": false
                        }
                    ]
                }
            ],
            "price": {
                "currency": "USD",
                "total": "206.44",
                "base": "155.14",
                "fees": [
                    {
                        "amount": "0.00",
                        "type": "SUPPLIER"
                    },
                    {
                        "amount": "0.00",
                        "type": "TICKETING"
                    }
                ],
                "grandTotal": "206.44"
            },
            "pricingOptions": {
                "fareType": [
                    "PUBLISHED"
                ],
                "includedCheckedBagsOnly": false
            },
            "validatingAirlineCodes": [
                "NK"
            ],
            "travelerPricings": [
                {
                    "travelerId": "1",
                    "fareOption": "STANDARD",
                    "travelerType": "ADULT",
                    "price": {
                        "currency": "USD",
                        "total": "206.44",
                        "base": "155.14"
                    },
                    "fareDetailsBySegment": [
                        {
                            "segmentId": "65",
                            "cabin": "ECONOMY",
                            "fareBasis": "UA7NR",
                            "class": "U",
                            "includedCheckedBags": {
                                "quantity": 0
                            }
                        },
                        {
                            "segmentId": "66",
                            "cabin": "ECONOMY",
                            "fareBasis": "UA7NR",
                            "class": "U",
                            "includedCheckedBags": {
                                "quantity": 0
                            }
                        },
                        {
                            "segmentId": "80",
                            "cabin": "ECONOMY",
                            "fareBasis": "GA14Z5",
                            "class": "G",
                            "includedCheckedBags": {
                                "quantity": 0
                            }
                        }
                    ]
                }
            ]
        },
        {
            "type": "flight-offer",
            "id": "5",
            "source": "GDS",
            "instantTicketingRequired": false,
            "nonHomogeneous": false,
            "oneWay": false,
            "isUpsellOffer": false,
            "lastTicketingDate": "2024-12-10",
            "lastTicketingDateTime": "2024-12-10",
            "numberOfBookableSeats": 9,
            "itineraries": [
                {
                    "duration": "PT3H33M",
                    "segments": [
                        {
                            "departure": {
                                "iataCode": "PHL",
                                "terminal": "D",
                                "at": "2024-12-20T09:17:00"
                            },
                            "arrival": {
                                "iataCode": "DFW",
                                "terminal": "E",
                                "at": "2024-12-20T11:50:00"
                            },
                            "carrierCode": "NK",
                            "number": "1014",
                            "aircraft": {
                                "code": "32A"
                            },
                            "operating": {
                                "carrierCode": "NK"
                            },
                            "duration": "PT3H33M",
                            "id": "27",
                            "numberOfStops": 0,
                            "blacklistedInEU": false
                        }
                    ]
                },
                {
                    "duration": "PT8H15M",
                    "segments": [
                        {
                            "departure": {
                                "iataCode": "DFW",
                                "terminal": "E",
                                "at": "2024-12-25T07:00:00"
                            },
                            "arrival": {
                                "iataCode": "TPA",
                                "at": "2024-12-25T10:36:00"
                            },
                            "carrierCode": "NK",
                            "number": "3713",
                            "aircraft": {
                                "code": "32N"
                            },
                            "operating": {
                                "carrierCode": "NK"
                            },
                            "duration": "PT2H36M",
                            "id": "73",
                            "numberOfStops": 0,
                            "blacklistedInEU": false
                        },
                        {
                            "departure": {
                                "iataCode": "TPA",
                                "at": "2024-12-25T13:40:00"
                            },
                            "arrival": {
                                "iataCode": "PHL",
                                "terminal": "D",
                                "at": "2024-12-25T16:15:00"
                            },
                            "carrierCode": "NK",
                            "number": "530",
                            "aircraft": {
                                "code": "32Q"
                            },
                            "operating": {
                                "carrierCode": "NK"
                            },
                            "duration": "PT2H35M",
                            "id": "74",
                            "numberOfStops": 0,
                            "blacklistedInEU": false
                        }
                    ]
                }
            ],
            "price": {
                "currency": "USD",
                "total": "206.44",
                "base": "155.14",
                "fees": [
                    {
                        "amount": "0.00",
                        "type": "SUPPLIER"
                    },
                    {
                        "amount": "0.00",
                        "type": "TICKETING"
                    }
                ],
                "grandTotal": "206.44"
            },
            "pricingOptions": {
                "fareType": [
                    "PUBLISHED"
                ],
                "includedCheckedBagsOnly": false
            },
            "validatingAirlineCodes": [
                "NK"
            ],
            "travelerPricings": [
                {
                    "travelerId": "1",
                    "fareOption": "STANDARD",
                    "travelerType": "ADULT",
                    "price": {
                        "currency": "USD",
                        "total": "206.44",
                        "base": "155.14"
                    },
                    "fareDetailsBySegment": [
                        {
                            "segmentId": "27",
                            "cabin": "ECONOMY",
                            "fareBasis": "UA7NR",
                            "class": "U",
                            "includedCheckedBags": {
                                "quantity": 0
                            }
                        },
                        {
                            "segmentId": "73",
                            "cabin": "ECONOMY",
                            "fareBasis": "GA14Z5",
                            "class": "G",
                            "includedCheckedBags": {
                                "quantity": 0
                            }
                        },
                        {
                            "segmentId": "74",
                            "cabin": "ECONOMY",
                            "fareBasis": "GA14Z5",
                            "class": "G",
                            "includedCheckedBags": {
                                "quantity": 0
                            }
                        }
                    ]
                }
            ]
        },
        {
            "type": "flight-offer",
            "id": "6",
            "source": "GDS",
            "instantTicketingRequired": false,
            "nonHomogeneous": false,
            "oneWay": false,
            "isUpsellOffer": false,
            "lastTicketingDate": "2024-12-10",
            "lastTicketingDateTime": "2024-12-10",
            "numberOfBookableSeats": 4,
            "itineraries": [
                {
                    "duration": "PT3H33M",
                    "segments": [
                        {
                            "departure": {
                                "iataCode": "PHL",
                                "terminal": "D",
                                "at": "2024-12-20T09:17:00"
                            },
                            "arrival": {
                                "iataCode": "DFW",
                                "terminal": "E",
                                "at": "2024-12-20T11:50:00"
                            },
                            "carrierCode": "NK",
                            "number": "1014",
                            "aircraft": {
                                "code": "32A"
                            },
                            "operating": {
                                "carrierCode": "NK"
                            },
                            "duration": "PT3H33M",
                            "id": "27",
                            "numberOfStops": 0,
                            "blacklistedInEU": false
                        }
                    ]
                },
                {
                    "duration": "PT9H18M",
                    "segments": [
                        {
                            "departure": {
                                "iataCode": "DFW",
                                "terminal": "E",
                                "at": "2024-12-25T07:00:00"
                            },
                            "arrival": {
                                "iataCode": "DTW",
                                "terminal": "E",
                                "at": "2024-12-25T10:43:00"
                            },
                            "carrierCode": "NK",
                            "number": "1019",
                            "aircraft": {
                                "code": "32A"
                            },
                            "operating": {
                                "carrierCode": "NK"
                            },
                            "duration": "PT2H43M",
                            "id": "77",
                            "numberOfStops": 0,
                            "blacklistedInEU": false
                        },
                        {
                            "departure": {
                                "iataCode": "DTW",
                                "terminal": "E",
                                "at": "2024-12-25T15:42:00"
                            },
                            "arrival": {
                                "iataCode": "PHL",
                                "terminal": "D",
                                "at": "2024-12-25T17:18:00"
                            },
                            "carrierCode": "NK",
                            "number": "1013",
                            "aircraft": {
                                "code": "32Q"
                            },
                            "operating": {
                                "carrierCode": "NK"
                            },
                            "duration": "PT1H36M",
                            "id": "78",
                            "numberOfStops": 0,
                            "blacklistedInEU": false
                        }
                    ]
                }
            ],
            "price": {
                "currency": "USD",
                "total": "206.44",
                "base": "155.14",
                "fees": [
                    {
                        "amount": "0.00",
                        "type": "SUPPLIER"
                    },
                    {
                        "amount": "0.00",
                        "type": "TICKETING"
                    }
                ],
                "grandTotal": "206.44"
            },
            "pricingOptions": {
                "fareType": [
                    "PUBLISHED"
                ],
                "includedCheckedBagsOnly": false
            },
            "validatingAirlineCodes": [
                "NK"
            ],
            "travelerPricings": [
                {
                    "travelerId": "1",
                    "fareOption": "STANDARD",
                    "travelerType": "ADULT",
                    "price": {
                        "currency": "USD",
                        "total": "206.44",
                        "base": "155.14"
                    },
                    "fareDetailsBySegment": [
                        {
                            "segmentId": "27",
                            "cabin": "ECONOMY",
                            "fareBasis": "UA7NR",
                            "class": "U",
                            "includedCheckedBags": {
                                "quantity": 0
                            }
                        },
                        {
                            "segmentId": "77",
                            "cabin": "ECONOMY",
                            "fareBasis": "GA14Z5",
                            "class": "G",
                            "includedCheckedBags": {
                                "quantity": 0
                            }
                        },
                        {
                            "segmentId": "78",
                            "cabin": "ECONOMY",
                            "fareBasis": "GA14Z5",
                            "class": "G",
                            "includedCheckedBags": {
                                "quantity": 0
                            }
                        }
                    ]
                }
            ]
        },
        {
            "type": "flight-offer",
            "id": "7",
            "source": "GDS",
            "instantTicketingRequired": false,
            "nonHomogeneous": false,
            "oneWay": false,
            "isUpsellOffer": false,
            "lastTicketingDate": "2024-12-10",
            "lastTicketingDateTime": "2024-12-10",
            "numberOfBookableSeats": 4,
            "itineraries": [
                {
                    "duration": "PT9H38M",
                    "segments": [
                        {
                            "departure": {
                                "iataCode": "PHL",
                                "terminal": "D",
                                "at": "2024-12-20T12:17:00"
                            },
                            "arrival": {
                                "iataCode": "MCO",
                                "at": "2024-12-20T14:57:00"
                            },
                            "carrierCode": "NK",
                            "number": "321",
                            "aircraft": {
                                "code": "319"
                            },
                            "operating": {
                                "carrierCode": "NK"
                            },
                            "duration": "PT2H40M",
                            "id": "40",
                            "numberOfStops": 0,
                            "blacklistedInEU": false
                        },
                        {
                            "departure": {
                                "iataCode": "MCO",
                                "at": "2024-12-20T19:03:00"
                            },
                            "arrival": {
                                "iataCode": "DFW",
                                "terminal": "E",
                                "at": "2024-12-20T20:55:00"
                            },
                            "carrierCode": "NK",
                            "number": "1096",
                            "aircraft": {
                                "code": "32N"
                            },
                            "operating": {
                                "carrierCode": "NK"
                            },
                            "duration": "PT2H52M",
                            "id": "41",
                            "numberOfStops": 0,
                            "blacklistedInEU": false
                        }
                    ]
                },
                {
                    "duration": "PT3H23M",
                    "segments": [
                        {
                            "departure": {
                                "iataCode": "DFW",
                                "terminal": "E",
                                "at": "2024-12-25T21:30:00"
                            },
                            "arrival": {
                                "iataCode": "PHL",
                                "terminal": "D",
                                "at": "2024-12-26T01:53:00"
                            },
                            "carrierCode": "NK",
                            "number": "1021",
                            "aircraft": {
                                "code": "32A"
                            },
                            "operating": {
                                "carrierCode": "NK"
                            },
                            "duration": "PT3H23M",
                            "id": "80",
                            "numberOfStops": 0,
                            "blacklistedInEU": false
                        }
                    ]
                }
            ],
            "price": {
                "currency": "USD",
                "total": "206.44",
                "base": "155.14",
                "fees": [
                    {
                        "amount": "0.00",
                        "type": "SUPPLIER"
                    },
                    {
                        "amount": "0.00",
                        "type": "TICKETING"
                    }
                ],
                "grandTotal": "206.44"
            },
            "pricingOptions": {
                "fareType": [
                    "PUBLISHED"
                ],
                "includedCheckedBagsOnly": false
            },
            "validatingAirlineCodes": [
                "NK"
            ],
            "travelerPricings": [
                {
                    "travelerId": "1",
                    "fareOption": "STANDARD",
                    "travelerType": "ADULT",
                    "price": {
                        "currency": "USD",
                        "total": "206.44",
                        "base": "155.14"
                    },
                    "fareDetailsBySegment": [
                        {
                            "segmentId": "40",
                            "cabin": "ECONOMY",
                            "fareBasis": "UA7NR",
                            "class": "U",
                            "includedCheckedBags": {
                                "quantity": 0
                            }
                        },
                        {
                            "segmentId": "41",
                            "cabin": "ECONOMY",
                            "fareBasis": "UA7NR",
                            "class": "U",
                            "includedCheckedBags": {
                                "quantity": 0
                            }
                        },
                        {
                            "segmentId": "80",
                            "cabin": "ECONOMY",
                            "fareBasis": "GA14Z5",
                            "class": "G",
                            "includedCheckedBags": {
                                "quantity": 0
                            }
                        }
                    ]
                }
            ]
        },
        {
            "type": "flight-offer",
            "id": "8",
            "source": "GDS",
            "instantTicketingRequired": false,
            "nonHomogeneous": false,
            "oneWay": false,
            "isUpsellOffer": false,
            "lastTicketingDate": "2024-12-10",
            "lastTicketingDateTime": "2024-12-10",
            "numberOfBookableSeats": 4,
            "itineraries": [
                {
                    "duration": "PT11H2M",
                    "segments": [
                        {
                            "departure": {
                                "iataCode": "PHL",
                                "terminal": "D",
                                "at": "2024-12-20T12:17:00"
                            },
                            "arrival": {
                                "iataCode": "MCO",
                                "at": "2024-12-20T14:57:00"
                            },
                            "carrierCode": "NK",
                            "number": "321",
                            "aircraft": {
                                "code": "319"
                            },
                            "operating": {
                                "carrierCode": "NK"
                            },
                            "duration": "PT2H40M",
                            "id": "3",
                            "numberOfStops": 0,
                            "blacklistedInEU": false
                        },
                        {
                            "departure": {
                                "iataCode": "MCO",
                                "at": "2024-12-20T20:30:00"
                            },
                            "arrival": {
                                "iataCode": "DFW",
                                "terminal": "E",
                                "at": "2024-12-20T22:19:00"
                            },
                            "carrierCode": "NK",
                            "number": "503",
                            "aircraft": {
                                "code": "32A"
                            },
                            "operating": {
                                "carrierCode": "NK"
                            },
                            "duration": "PT2H49M",
                            "id": "4",
                            "numberOfStops": 0,
                            "blacklistedInEU": false
                        }
                    ]
                },
                {
                    "duration": "PT3H23M",
                    "segments": [
                        {
                            "departure": {
                                "iataCode": "DFW",
                                "terminal": "E",
                                "at": "2024-12-25T21:30:00"
                            },
                            "arrival": {
                                "iataCode": "PHL",
                                "terminal": "D",
                                "at": "2024-12-26T01:53:00"
                            },
                            "carrierCode": "NK",
                            "number": "1021",
                            "aircraft": {
                                "code": "32A"
                            },
                            "operating": {
                                "carrierCode": "NK"
                            },
                            "duration": "PT3H23M",
                            "id": "80",
                            "numberOfStops": 0,
                            "blacklistedInEU": false
                        }
                    ]
                }
            ],
            "price": {
                "currency": "USD",
                "total": "206.44",
                "base": "155.14",
                "fees": [
                    {
                        "amount": "0.00",
                        "type": "SUPPLIER"
                    },
                    {
                        "amount": "0.00",
                        "type": "TICKETING"
                    }
                ],
                "grandTotal": "206.44"
            },
            "pricingOptions": {
                "fareType": [
                    "PUBLISHED"
                ],
                "includedCheckedBagsOnly": false
            },
            "validatingAirlineCodes": [
                "NK"
            ],
            "travelerPricings": [
                {
                    "travelerId": "1",
                    "fareOption": "STANDARD",
                    "travelerType": "ADULT",
                    "price": {
                        "currency": "USD",
                        "total": "206.44",
                        "base": "155.14"
                    },
                    "fareDetailsBySegment": [
                        {
                            "segmentId": "3",
                            "cabin": "ECONOMY",
                            "fareBasis": "UA7NR",
                            "class": "U",
                            "includedCheckedBags": {
                                "quantity": 0
                            }
                        },
                        {
                            "segmentId": "4",
                            "cabin": "ECONOMY",
                            "fareBasis": "UA7NR",
                            "class": "U",
                            "includedCheckedBags": {
                                "quantity": 0
                            }
                        },
                        {
                            "segmentId": "80",
                            "cabin": "ECONOMY",
                            "fareBasis": "GA14Z5",
                            "class": "G",
                            "includedCheckedBags": {
                                "quantity": 0
                            }
                        }
                    ]
                }
            ]
        },
        {
            "type": "flight-offer",
            "id": "9",
            "source": "GDS",
            "instantTicketingRequired": false,
            "nonHomogeneous": false,
            "oneWay": false,
            "isUpsellOffer": false,
            "lastTicketingDate": "2024-12-10",
            "lastTicketingDateTime": "2024-12-10",
            "numberOfBookableSeats": 4,
            "itineraries": [
                {
                    "duration": "PT10H33M",
                    "segments": [
                        {
                            "departure": {
                                "iataCode": "PHL",
                                "terminal": "D",
                                "at": "2024-12-20T06:10:00"
                            },
                            "arrival": {
                                "iataCode": "FLL",
                                "terminal": "4",
                                "at": "2024-12-20T09:03:00"
                            },
                            "carrierCode": "NK",
                            "number": "1005",
                            "aircraft": {
                                "code": "32B"
                            },
                            "operating": {
                                "carrierCode": "NK"
                            },
                            "duration": "PT2H53M",
                            "id": "28",
                            "numberOfStops": 0,
                            "blacklistedInEU": false
                        },
                        {
                            "departure": {
                                "iataCode": "FLL",
                                "terminal": "4",
                                "at": "2024-12-20T13:41:00"
                            },
                            "arrival": {
                                "iataCode": "DFW",
                                "terminal": "E",
                                "at": "2024-12-20T15:43:00"
                            },
                            "carrierCode": "NK",
                            "number": "1224",
                            "aircraft": {
                                "code": "32A"
                            },
                            "operating": {
                                "carrierCode": "NK"
                            },
                            "duration": "PT3H2M",
                            "id": "29",
                            "numberOfStops": 0,
                            "blacklistedInEU": false
                        }
                    ]
                },
                {
                    "duration": "PT3H23M",
                    "segments": [
                        {
                            "departure": {
                                "iataCode": "DFW",
                                "terminal": "E",
                                "at": "2024-12-25T21:30:00"
                            },
                            "arrival": {
                                "iataCode": "PHL",
                                "terminal": "D",
                                "at": "2024-12-26T01:53:00"
                            },
                            "carrierCode": "NK",
                            "number": "1021",
                            "aircraft": {
                                "code": "32A"
                            },
                            "operating": {
                                "carrierCode": "NK"
                            },
                            "duration": "PT3H23M",
                            "id": "80",
                            "numberOfStops": 0,
                            "blacklistedInEU": false
                        }
                    ]
                }
            ],
            "price": {
                "currency": "USD",
                "total": "206.44",
                "base": "155.14",
                "fees": [
                    {
                        "amount": "0.00",
                        "type": "SUPPLIER"
                    },
                    {
                        "amount": "0.00",
                        "type": "TICKETING"
                    }
                ],
                "grandTotal": "206.44"
            },
            "pricingOptions": {
                "fareType": [
                    "PUBLISHED"
                ],
                "includedCheckedBagsOnly": false
            },
            "validatingAirlineCodes": [
                "NK"
            ],
            "travelerPricings": [
                {
                    "travelerId": "1",
                    "fareOption": "STANDARD",
                    "travelerType": "ADULT",
                    "price": {
                        "currency": "USD",
                        "total": "206.44",
                        "base": "155.14"
                    },
                    "fareDetailsBySegment": [
                        {
                            "segmentId": "28",
                            "cabin": "ECONOMY",
                            "fareBasis": "UA7NR",
                            "class": "U",
                            "includedCheckedBags": {
                                "quantity": 0
                            }
                        },
                        {
                            "segmentId": "29",
                            "cabin": "ECONOMY",
                            "fareBasis": "UA7NR",
                            "class": "U",
                            "includedCheckedBags": {
                                "quantity": 0
                            }
                        },
                        {
                            "segmentId": "80",
                            "cabin": "ECONOMY",
                            "fareBasis": "GA14Z5",
                            "class": "G",
                            "includedCheckedBags": {
                                "quantity": 0
                            }
                        }
                    ]
                }
            ]
        },
        {
            "type": "flight-offer",
            "id": "10",
            "source": "GDS",
            "instantTicketingRequired": false,
            "nonHomogeneous": false,
            "oneWay": false,
            "isUpsellOffer": false,
            "lastTicketingDate": "2024-12-10",
            "lastTicketingDateTime": "2024-12-10",
            "numberOfBookableSeats": 4,
            "itineraries": [
                {
                    "duration": "PT10H42M",
                    "segments": [
                        {
                            "departure": {
                                "iataCode": "PHL",
                                "terminal": "D",
                                "at": "2024-12-20T10:50:00"
                            },
                            "arrival": {
                                "iataCode": "DTW",
                                "terminal": "E",
                                "at": "2024-12-20T12:32:00"
                            },
                            "carrierCode": "NK",
                            "number": "1012",
                            "aircraft": {
                                "code": "32Q"
                            },
                            "operating": {
                                "carrierCode": "NK"
                            },
                            "duration": "PT1H42M",
                            "id": "46",
                            "numberOfStops": 0,
                            "blacklistedInEU": false
                        },
                        {
                            "departure": {
                                "iataCode": "DTW",
                                "terminal": "E",
                                "at": "2024-12-20T18:42:00"
                            },
                            "arrival": {
                                "iataCode": "DFW",
                                "terminal": "E",
                                "at": "2024-12-20T20:32:00"
                            },
                            "carrierCode": "NK",
                            "number": "1020",
                            "aircraft": {
                                "code": "32A"
                            },
                            "operating": {
                                "carrierCode": "NK"
                            },
                            "duration": "PT2H50M",
                            "id": "47",
                            "numberOfStops": 0,
                            "blacklistedInEU": false
                        }
                    ]
                },
                {
                    "duration": "PT3H23M",
                    "segments": [
                        {
                            "departure": {
                                "iataCode": "DFW",
                                "terminal": "E",
                                "at": "2024-12-25T21:30:00"
                            },
                            "arrival": {
                                "iataCode": "PHL",
                                "terminal": "D",
                                "at": "2024-12-26T01:53:00"
                            },
                            "carrierCode": "NK",
                            "number": "1021",
                            "aircraft": {
                                "code": "32A"
                            },
                            "operating": {
                                "carrierCode": "NK"
                            },
                            "duration": "PT3H23M",
                            "id": "80",
                            "numberOfStops": 0,
                            "blacklistedInEU": false
                        }
                    ]
                }
            ],
            "price": {
                "currency": "USD",
                "total": "206.44",
                "base": "155.14",
                "fees": [
                    {
                        "amount": "0.00",
                        "type": "SUPPLIER"
                    },
                    {
                        "amount": "0.00",
                        "type": "TICKETING"
                    }
                ],
                "grandTotal": "206.44"
            },
            "pricingOptions": {
                "fareType": [
                    "PUBLISHED"
                ],
                "includedCheckedBagsOnly": false
            },
            "validatingAirlineCodes": [
                "NK"
            ],
            "travelerPricings": [
                {
                    "travelerId": "1",
                    "fareOption": "STANDARD",
                    "travelerType": "ADULT",
                    "price": {
                        "currency": "USD",
                        "total": "206.44",
                        "base": "155.14"
                    },
                    "fareDetailsBySegment": [
                        {
                            "segmentId": "46",
                            "cabin": "ECONOMY",
                            "fareBasis": "UA7NR",
                            "class": "U",
                            "includedCheckedBags": {
                                "quantity": 0
                            }
                        },
                        {
                            "segmentId": "47",
                            "cabin": "ECONOMY",
                            "fareBasis": "UA7NR",
                            "class": "U",
                            "includedCheckedBags": {
                                "quantity": 0
                            }
                        },
                        {
                            "segmentId": "80",
                            "cabin": "ECONOMY",
                            "fareBasis": "GA14Z5",
                            "class": "G",
                            "includedCheckedBags": {
                                "quantity": 0
                            }
                        }
                    ]
                }
            ]
        },
        {
            "type": "flight-offer",
            "id": "11",
            "source": "GDS",
            "instantTicketingRequired": false,
            "nonHomogeneous": false,
            "oneWay": false,
            "isUpsellOffer": false,
            "lastTicketingDate": "2024-12-10",
            "lastTicketingDateTime": "2024-12-10",
            "numberOfBookableSeats": 4,
            "itineraries": [
                {
                    "duration": "PT3H33M",
                    "segments": [
                        {
                            "departure": {
                                "iataCode": "PHL",
                                "terminal": "D",
                                "at": "2024-12-20T09:17:00"
                            },
                            "arrival": {
                                "iataCode": "DFW",
                                "terminal": "E",
                                "at": "2024-12-20T11:50:00"
                            },
                            "carrierCode": "NK",
                            "number": "1014",
                            "aircraft": {
                                "code": "32A"
                            },
                            "operating": {
                                "carrierCode": "NK"
                            },
                            "duration": "PT3H33M",
                            "id": "27",
                            "numberOfStops": 0,
                            "blacklistedInEU": false
                        }
                    ]
                },
                {
                    "duration": "PT29H39M",
                    "segments": [
                        {
                            "departure": {
                                "iataCode": "DFW",
                                "terminal": "E",
                                "at": "2024-12-25T07:00:00"
                            },
                            "arrival": {
                                "iataCode": "MIA",
                                "at": "2024-12-25T11:03:00"
                            },
                            "carrierCode": "NK",
                            "number": "1860",
                            "aircraft": {
                                "code": "32A"
                            },
                            "operating": {
                                "carrierCode": "NK"
                            },
                            "duration": "PT3H3M",
                            "id": "95",
                            "numberOfStops": 0,
                            "blacklistedInEU": false
                        },
                        {
                            "departure": {
                                "iataCode": "MIA",
                                "at": "2024-12-26T10:49:00"
                            },
                            "arrival": {
                                "iataCode": "PHL",
                                "terminal": "D",
                                "at": "2024-12-26T13:39:00"
                            },
                            "carrierCode": "NK",
                            "number": "3150",
                            "aircraft": {
                                "code": "32A"
                            },
                            "operating": {
                                "carrierCode": "NK"
                            },
                            "duration": "PT2H50M",
                            "id": "96",
                            "numberOfStops": 0,
                            "blacklistedInEU": false
                        }
                    ]
                }
            ],
            "price": {
                "currency": "USD",
                "total": "219.34",
                "base": "167.14",
                "fees": [
                    {
                        "amount": "0.00",
                        "type": "SUPPLIER"
                    },
                    {
                        "amount": "0.00",
                        "type": "TICKETING"
                    }
                ],
                "grandTotal": "219.34"
            },
            "pricingOptions": {
                "fareType": [
                    "PUBLISHED"
                ],
                "includedCheckedBagsOnly": false
            },
            "validatingAirlineCodes": [
                "NK"
            ],
            "travelerPricings": [
                {
                    "travelerId": "1",
                    "fareOption": "STANDARD",
                    "travelerType": "ADULT",
                    "price": {
                        "currency": "USD",
                        "total": "219.34",
                        "base": "167.14"
                    },
                    "fareDetailsBySegment": [
                        {
                            "segmentId": "27",
                            "cabin": "ECONOMY",
                            "fareBasis": "UA7NR",
                            "class": "U",
                            "includedCheckedBags": {
                                "quantity": 0
                            }
                        },
                        {
                            "segmentId": "95",
                            "cabin": "ECONOMY",
                            "fareBasis": "GA14NR",
                            "class": "G",
                            "includedCheckedBags": {
                                "quantity": 0
                            }
                        },
                        {
                            "segmentId": "96",
                            "cabin": "ECONOMY",
                            "fareBasis": "UA14NR",
                            "class": "U",
                            "includedCheckedBags": {
                                "quantity": 0
                            }
                        }
                    ]
                }
            ]
        }
]

module.exports = flightsData;