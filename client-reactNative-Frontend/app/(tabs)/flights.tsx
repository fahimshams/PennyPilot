import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

// Define TypeScript interfaces
interface FlightParams {
  from: string;
  to: string;
  startDate: string;
  endDate: string;
  passengers: number;
  budget: number;
}

interface Flight {
  id: string;
  airline: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  duration: string;
  stops: number;
}

// Dummy data generator function
const generateDummyFlights = (params: FlightParams): Flight[] => {
  const flights: Flight[] = [];
  const airlines = ['SkyWings', 'AirSpeed', 'GlobalJet', 'StarLine'];
  
  // Only generate flights if the price is within budget
  for (let i = 0; i < 8; i++) {
    const price = Math.floor(Math.random() * (1000 * 0.8)) + (1000 * 0.2);
    const hours = Math.floor(Math.random() * 8) + 1;
    const minutes = Math.floor(Math.random() * 60);
    
    flights.push({
      id: `flight-${i}`,
      airline: airlines[Math.floor(Math.random() * airlines.length)],
      departureTime: '08:00 AM',
      arrivalTime: `${(8 + hours) % 24}:${minutes.toString().padStart(2, '0')} ${(8 + hours) >= 12 ? 'PM' : 'AM'}`,
      price,
      duration: `${hours}h ${minutes}m`,
      stops: Math.floor(Math.random() * 2),
    });
  }
  
  return flights.sort((a, b) => a.price - b.price);
};

export default function FlightListings() {
  const route = useRoute();
  const navigation = useNavigation();
  const params = route.params as FlightParams;
  
  // Generate dummy flights based on search parameters
  const flights = generateDummyFlights(params);
  
  const renderFlightCard = ({ item }: { item: Flight }) => (
    <Pressable
      style={styles.flightCard}
      onPress={() => {
        // Handle flight selection
        console.log('Selected flight:', item);
      }}
    >
      <View style={styles.airlineRow}>
        <Text style={styles.airlineName}>{item.airline}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
      
      <View style={styles.flightDetails}>
        <View style={styles.timeColumn}>
          <Text style={styles.timeText}>{item.departureTime}</Text>
          <Text style={styles.cityText}>{params.from}</Text>
        </View>
        
        <View style={styles.durationColumn}>
          <Text style={styles.durationText}>{item.duration}</Text>
          <View style={styles.flightPath}>
            <View style={styles.line} />
            {item.stops > 0 && <View style={styles.stopDot} />}
          </View>
          <Text style={styles.stopsText}>
            {item.stops === 0 ? 'Direct' : `${item.stops} stop`}
          </Text>
        </View>
        
        <View style={styles.timeColumn}>
          <Text style={styles.timeText}>{item.arrivalTime}</Text>
          <Text style={styles.cityText}>{params.to}</Text>
        </View>
      </View>
    </Pressable>
  );

  if (flights.length === 0) {
    return (
      <View style={styles.noFlightsContainer}>
        <Text style={styles.noFlightsText}>
          No flights found within your budget. Please try adjusting your search criteria.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Available Flights ({flights.length})
      </Text>
      <FlatList
        data={flights}
        renderItem={renderFlightCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 16,
  },
  listContainer: {
    padding: 16,
  },
  flightCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  airlineRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  airlineName: {
    fontSize: 18,
    fontWeight: '600',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  flightDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeColumn: {
    alignItems: 'center',
    flex: 1,
  },
  durationColumn: {
    alignItems: 'center',
    flex: 2,
  },
  timeText: {
    fontSize: 16,
    fontWeight: '500',
  },
  cityText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  durationText: {
    fontSize: 14,
    color: '#666',
  },
  flightPath: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    width: '100%',
    position: 'relative',
  },
  line: {
    height: 2,
    backgroundColor: '#ddd',
    flex: 1,
  },
  stopDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#666',
    position: 'absolute',
    left: '50%',
    marginLeft: -4,
  },
  stopsText: {
    fontSize: 12,
    color: '#666',
  },
  noFlightsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noFlightsText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
});
