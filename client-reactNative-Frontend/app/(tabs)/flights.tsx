import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Button, ActivityIndicator, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import TopBar from '../../components/TopBarComponent';

// Define TypeScript interfaces for the flight data structure
interface FlightSegment {
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  stops: string;
  stopDuration: string;
}

interface FlightDetails {
  price: string;
  passengers: number;
  departure: FlightSegment[];
  return: FlightSegment[];
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
  const [loading, setLoading] = useState(true); // New state for loading
  const [selectedTab, setSelectedTab] = useState<'flights' | 'rentalCars' | 'privateCars'>('flights'); // Track selected tab

  const searchParams = useLocalSearchParams();
  const { from, to, startDate, endDate, passengers, budget } = searchParams;

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        setLoading(true); // Start loading
        const response = await fetch(
          `http://localhost:5000/api/searchFlights?originLocationCode=${from}&destinationLocationCode=${to}&departureDate=${startDate}&returnDate=${endDate}&adults=${passengers}&travelBudget=${budget}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch flights');
        }

        const data: FlightDetails[] = await response.json();
        setFlights(data);
      } catch (error) {
        console.error(error);
        alert('There was an error fetching the flight details.');
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchFlights();
  }, [from, to, startDate, endDate, passengers, budget]);

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
    alert(`Selected flight: ${JSON.stringify(flight, null, 2)}`);

    router.push({
      pathname: "/hotels",
      params: { from, to, startDate, endDate, passengers, budget },
    });
  };

  const renderFlightCard = ({ item, index }: { item: FlightDetails; index: number }) => (
    
    <Pressable style={styles.flightCard} onPress={() => handleExpandToggle(index)}>
      
      <View style={styles.priceRow}>
        <Text style={styles.priceText}>${item.price}</Text>
        <Text>{item.passengers} passenger(s)</Text>
      </View>

      {/* Departure flight details */}
      <Text style={styles.sectionTitle}>Departure:</Text>
      {item.departure.map((segment, idx) => (
        <View key={idx} style={styles.segmentDetails}>
          <Text style={styles.segmentText}>
            {segment.from} → {segment.to}
          </Text>
          <Text>Departure: {segment.departureTime}</Text>
          <Text>Arrival: {segment.arrivalTime}</Text>
        </View>
      ))}

      {/* Show return flight details if expanded */}
      {expandedFlightIndex === index && (
        <>
          <Text style={styles.sectionTitle}>Return:</Text>
          {item.return.map((segment, idx) => (
            <View key={idx} style={styles.segmentDetails}>
              <Text style={styles.segmentText}>
                {segment.from} → {segment.to}
              </Text>
              <Text>Departure: {segment.departureTime}</Text>
              <Text>Arrival: {segment.arrivalTime}</Text>
            </View>
          ))}
          <Button title="Select Flight" onPress={() => handleSelectFlight(item)} />
        </>
      )}
    </Pressable>
  );

  const renderCarCard = ({ item }: { item: any }) => (
    <View style={styles.carCard}>
      <Text style={styles.carName}>{item.name}</Text>
      <Text style={styles.carDetails}>Price: {item.price}</Text>
      <Text style={styles.carDetails}>Passengers: {item.passengers}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Fetching...</Text>
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
      <TopBar from={from} to={to} startDate={startDate} endDate={endDate} budget={budget} passengers={passengers} />
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
      {loading && selectedTab === 'flights' && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading flights...</Text>
        </View>
      )}

      {!loading && selectedTab === 'flights' && (
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
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
  },
  segmentDetails: {
    marginTop: 5,
    paddingLeft: 10,
  },
  segmentText: {
    fontSize: 14,
    fontWeight: '500',
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
});
