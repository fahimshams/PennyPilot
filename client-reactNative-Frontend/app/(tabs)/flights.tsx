import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Button, ActivityIndicator, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import TopBar from '../../components/TopBarComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define TypeScript interfaces for the flight data structure
interface FlightSegment {
  from: string; // Origin IATA code
  to: string; // Destination IATA code
  departureTime: string; // Departure time
  arrivalTime: string; // Arrival time
  duration: string; // Flight segment duration
  stops: number; // Number of stops
  flightNumber: string; // Flight number
  aircraft: string; // Aircraft type
  stopDuration?: string; // Duration of layovers, if applicable
}

interface FlightDetails {
  price: {
    total: string; // Total price of the flight
    currency: string; // Currency of the price
  };
  passengers: number; // Number of passengers
  airline: string; // Name of the airline
  departureDetails: {
    totalDuration: string; // Total duration for departure
    segments: FlightSegment[]; // Array of departure flight segments
  };
  returnDetails: {
    totalDuration: string; // Total duration for return
    segments: FlightSegment[]; // Array of return flight segments
  };
}

const rentalCarsData = [
  { id: '1', name: 'Toyota Corolla', price: '$50/day', passengers: 5 },
  { id: '2', name: 'Honda Accord', price: '$60/day', passengers: 5 },
];

const privateCarsData = [
  { id: '1', name: 'Tesla Model S', price: '$200/day', passengers: 4 },
  { id: '2', name: 'Mercedes-Benz S-Class', price: '$300/day', passengers: 4 },
];

export default function FlightListings() {
  const [flights, setFlights] = useState<FlightDetails[]>([]);
  const [expandedFlightIndex, setExpandedFlightIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'flights' | 'rentalCars' | 'privateCars'>('flights');
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    startDate: '',
    endDate: '',
    passengers: '',
    budget: ''
  });

  useEffect(() => {
    const loadSearchParams = async () => {
      try {
        const storedParams = await AsyncStorage.getItem('searchParams');
        if (storedParams) {
          setSearchParams(JSON.parse(storedParams));
        }
      } catch (error) {
        console.error('Error loading search params:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadSearchParams();
  }, []);

  const handleSearchParamsChange = async (field: string, value: string) => {
    const newParams = { ...searchParams, [field]: value };
    setSearchParams(newParams);
    try {
      await AsyncStorage.setItem('searchParams', JSON.stringify(newParams));
    } catch (error) {
      console.error('Error saving search params:', error);
    }
  };

  useEffect(() => {
    const fetchFlights = async () => {
      if (!searchParams.from || !searchParams.to) return;
      
      try {
        setIsFetching(true);
        const response = await fetch(
          `http://localhost:5000/api/searchFlights?originLocationCode=${searchParams.from}&destinationLocationCode=${searchParams.to}&departureDate=${searchParams.startDate}&returnDate=${searchParams.endDate}&adults=${searchParams.passengers}&travelBudget=${searchParams.budget}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch flights');
        }

        const data: FlightDetails[] = await response.json();
        setFlights(data);
        // Need to implement flight budget here.
        // Replace this with API logic above when ready
        // const dummyData: FlightDetails[] = [
        //   {
        //     price: {
        //       total: "450",
        //       currency: "USD"
        //     },
        //     passengers: parseInt(searchParams.passengers) || 1,
        //     airline: "Delta Airlines",
        //     departureDetails: {
        //       totalDuration: "2h 30m",
        //       segments: [{
        //         from: searchParams.from,
        //         to: searchParams.to,
        //         departureTime: `${searchParams.startDate} 08:00`,
        //         arrivalTime: `${searchParams.startDate} 10:30`,
        //         duration: "2h 30m",
        //         stops: 0,
        //         flightNumber: "DL123",
        //         aircraft: "Boeing 737"
        //       }]
        //     },
        //     returnDetails: {
        //       totalDuration: "2h 30m",
        //       segments: [{
        //         from: searchParams.to,
        //         to: searchParams.from,
        //         departureTime: `${searchParams.endDate} 18:00`,
        //         arrivalTime: `${searchParams.endDate} 20:30`,
        //         duration: "2h 30m",
        //         stops: 0,
        //         flightNumber: "DL124",
        //         aircraft: "Boeing 737"
        //       }]
        //     }
        //   },
        //   {
        //     price: {
        //       total: "380",
        //       currency: "USD"
        //     },
        //     passengers: parseInt(searchParams.passengers) || 1,
        //     airline: "American Airlines",
        //     departureDetails: {
        //       totalDuration: "3h 15m",
        //       segments: [{
        //         from: searchParams.from,
        //         to: searchParams.to,
        //         departureTime: `${searchParams.startDate} 12:00`,
        //         arrivalTime: `${searchParams.startDate} 15:15`,
        //         duration: "3h 15m",
        //         stops: 0,
        //         flightNumber: "AA456",
        //         aircraft: "Airbus A320"
        //       }]
        //     },
        //     returnDetails: {
        //       totalDuration: "3h 15m",
        //       segments: [{
        //         from: searchParams.to,
        //         to: searchParams.from,
        //         departureTime: `${searchParams.endDate} 16:00`,
        //         arrivalTime: `${searchParams.endDate} 19:15`,
        //         duration: "3h 15m",
        //         stops: 0,
        //         flightNumber: "AA457",
        //         aircraft: "Airbus A320"
        //       }]
        //     }
        //   },
        //   {
        //     price: {
        //       total: "520",
        //       currency: "USD"
        //     },
        //     passengers: parseInt(searchParams.passengers) || 1,
        //     airline: "United Airlines",
        //     departureDetails: {
        //       totalDuration: "2h 45m",
        //       segments: [{
        //         from: searchParams.from,
        //         to: searchParams.to,
        //         departureTime: `${searchParams.startDate} 15:00`,
        //         arrivalTime: `${searchParams.startDate} 17:45`,
        //         duration: "2h 45m",
        //         stops: 0,
        //         flightNumber: "UA789",
        //         aircraft: "Boeing 787"
        //       }]
        //     },
        //     returnDetails: {
        //       totalDuration: "2h 45m",
        //       segments: [{
        //         from: searchParams.to,
        //         to: searchParams.from,
        //         departureTime: `${searchParams.endDate} 20:00`,
        //         arrivalTime: `${searchParams.endDate} 22:45`,
        //         duration: "2h 45m",
        //         stops: 0,
        //         flightNumber: "UA790",
        //         aircraft: "Boeing 787"
        //       }]
        //     }
        //   }
        // ];
        // setFlights(dummyData);
      } catch (error) {
        console.error(error);
        alert("Error fetching flight details.");
      } finally {
        setIsFetching(false);
      }
    };

    fetchFlights();
  }, [searchParams.from, searchParams.to, searchParams.startDate, searchParams.endDate, searchParams.passengers, searchParams.budget]);

  const { from, to, startDate, endDate, passengers, budget } = searchParams;
  const hasValidSearch = from && to && from !== 'undefined' && to !== 'undefined';

  const handleExpandToggle = (index: number) => {
    setExpandedFlightIndex(expandedFlightIndex === index ? null : index);
  };

  const handleTabSelect = (tab: 'flights' | 'rentalCars' | 'privateCars') => {
    setSelectedTab(tab);
    // Navigate or update state to fetch new data if required
    // if (tab !== 'flights') {
    //   alert(`Navigating to: ${tab}`);
    // }
  };

  const handleSelectFlight = (flight: FlightDetails) => {
    console.log(flight);

    router.push({
      pathname: "/hotels",
      params: { from: searchParams.from, to: searchParams.to, startDate: searchParams.startDate, endDate: searchParams.endDate, passengers: searchParams.passengers, budget: searchParams.budget },
    });
  };

  const renderFlightCard = ({ item }: { item: FlightDetails }) => (
    <View style={styles.flightCard}>
      {/* Price and passenger info */}
      <View style={styles.priceRow}>
        <Text style={styles.priceText}>
          {item.price.currency} {item.price.total}
        </Text>
        <Text>{item.passengers} passenger(s)</Text>
        <Text style={styles.airlineText}>{item.airline}</Text>
      </View>
  
      {/* Departure and Return Details in Row */}
      <View style={styles.flightDetailsRow}>
        {/* Departure Details */}
        <View style={styles.flightDetailsColumn}>
          <Text style={styles.sectionTitle}>Departure:</Text>
          <Text style={styles.totalDuration}>
            Total Duration: {item.departureDetails.totalDuration}
          </Text>
          {item.departureDetails.segments.map((segment, idx) => (
            <View key={idx} style={styles.segmentDetails}>
              <Text style={styles.segmentText}>
                {segment.from} → {segment.to}
              </Text>
              <Text>Flight No: {segment.flightNumber}</Text>
              <Text>Aircraft: {segment.aircraft}</Text>
              <Text>Departure: {segment.departureTime}</Text>
              <Text>Arrival: {segment.arrivalTime}</Text>
              <Text>Duration: {segment.duration}</Text>
              {segment.stops > 0 && (
                <Text>Layover: {segment.stopDuration}</Text>
              )}
            </View>
          ))}
        </View>
  
        {/* Return Details */}
        <View style={styles.flightDetailsColumn}>
          <Text style={styles.sectionTitle}>Return:</Text>
          <Text style={styles.totalDuration}>
            Total Duration: {item.returnDetails.totalDuration}
          </Text>
          {item.returnDetails.segments.map((segment, idx) => (
            <View key={idx} style={styles.segmentDetails}>
              <Text style={styles.segmentText}>
                {segment.from} → {segment.to}
              </Text>
              <Text>Flight No: {segment.flightNumber}</Text>
              <Text>Aircraft: {segment.aircraft}</Text>
              <Text>Departure: {segment.departureTime}</Text>
              <Text>Arrival: {segment.arrivalTime}</Text>
              <Text>Duration: {segment.duration}</Text>
              {segment.stops > 0 && (
                <Text>Layover: {segment.stopDuration}</Text>
              )}
            </View>
          ))}
        </View>
      </View>
  
      {/* Select Flight Button */}
      <TouchableOpacity
        style={styles.selectButton}
        onPress={() => handleSelectFlight(item)}
      >
        <Text style={styles.selectButtonText}>Select Flight</Text>
      </TouchableOpacity>
    </View>
  );
  
  

  const renderCarCard = ({ item }: { item: any }) => (
    <View style={styles.carCard}>
      <Text style={styles.carName}>{item.name}</Text>
      <Text style={styles.carDetails}>Price: {item.price}</Text>
      <Text style={styles.carDetails}>Passengers: {item.passengers}</Text>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (!hasValidSearch) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Please search for a destination to view flights....</Text>
      </View>
    );
  }

  if (!flights.length) {
    return (
      <View style={styles.noFlightsContainer}>
        <Text style={styles.noFlightsText}>No flights found.</Text>
      </View>
    );
  }

  return (
    
    <View style={styles.container}>
      {/* Tabs Section */}
      <TopBar 
        from={searchParams.from} 
        to={searchParams.to} 
        startDate={searchParams.startDate} 
        endDate={searchParams.endDate} 
        budget={searchParams.budget} 
        passengers={searchParams.passengers}
        onChange={handleSearchParamsChange}
      />
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'flights' && styles.activeTab]}
          onPress={() => handleTabSelect('flights')}
        >
          <Text style={styles.tabText}>Flights</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'rentalCars' && styles.activeTab]}
          onPress={() => handleTabSelect('rentalCars')}
        >
          <Text style={styles.tabText}>Rental Cars</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'privateCars' && styles.activeTab]}
          onPress={() => handleTabSelect('privateCars')}
        >
          <Text style={styles.tabText}>Private Cars</Text>
        </TouchableOpacity>
      </View>

      {/* Content Section */}
      {isFetching ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Fetching flights...</Text>
        </View>
      ) : (
        <FlatList
          data={flights}
          renderItem={renderFlightCard}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContainer}
        />
      )}

      {selectedTab === 'rentalCars' && (
        <FlatList
          data={rentalCarsData}
          renderItem={renderCarCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}

      {selectedTab === 'privateCars' && (
        <FlatList
          data={privateCarsData}
          renderItem={renderCarCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  
  header: {
    backgroundColor: '#4CAF50',
    padding: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubText: {
    fontSize: 14,
    color: 'white',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    display: 'none',
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#4CAF50',
  },
  tabText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  carCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  carName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  carDetails: {
    fontSize: 14,
    color: '#555',
  },
  flightCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  airlineContainer: {
    flex: 1,
  },
  airlineText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  passengerText: {
    fontSize: 14,
    color: '#666',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  priceCurrency: {
    fontSize: 14,
    color: '#666',
  },
  priceAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2a9d8f',
  },
  journeyContainer: {
    gap: 20,
  },
  journeySection: {
    gap: 12,
  },
  journeyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  journeyTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    letterSpacing: 1,
  },
  totalDuration: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  segment: {
    gap: 8,
  },
  routeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
  },
  locationTime: {
    width: '25%',
    alignItems: 'center',
  },
  time: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  flightPathContainer: {
    flex: 1,
    paddingHorizontal: 8,
  },
  flightPath: {
    alignItems: 'center',
    position: 'relative',
  },
  pathLine: {
    position: 'absolute',
    top: '30%',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#ddd',
    zIndex: 1,
  },
  flightNumber: {
    fontSize: 12,
    color: '#666',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 4,
    marginBottom: 2,
    zIndex: 2,
  },
  aircraftType: {
    fontSize: 12,
    color: '#666',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 4,
    marginBottom: 2,
    zIndex: 2,
  },
  duration: {
    fontSize: 12,
    color: '#666',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 4,
    zIndex: 2,
  },
  layoverInfo: {
    backgroundColor: '#fff3e6',
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
  },
  layoverText: {
    fontSize: 13,
    color: '#cc7000',
    fontWeight: '500',
  },
  selectButton: {
    backgroundColor: '#2a9d8f',
    paddingVertical: 16,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  selectButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2a9d8f',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
  },
  segmentDetails: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  segmentText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  listContainer: {
    padding: 16,
  },
  noFlightsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noFlightsText: {
    fontSize: 16,
    color: '#666',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    marginTop: 10,
    color: '#666',
  },
  flightDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  flightDetailsColumn: {
    flex: 1,
    marginHorizontal: 8,
  },
 


  airlineRow: {
    marginBottom: 10,
  },
  
  flightDetailsSection: {
    marginVertical: 10,
  },

 




});
