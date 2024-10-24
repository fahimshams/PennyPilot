import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

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

export default function FlightListings() {
  const searchParams = useLocalSearchParams();


  // Ensure flights is a string before parsing
  
  // Access the flights parameter from searchParams
  const flightsParam = searchParams.flights;


  // Ensure flights is a string before parsing
  let flights: FlightDetails[] = [];

  // Check if flights is a string or an array of strings

  console.log((flightsParam));

  // if (flightsParam) {
  //   try {
  //     flights = JSON.parse(flightsParam) as FlightDetails[]; // Deserialize the JSON string back into an object
  //   } catch (error) {
  //     console.error("Failed to parse flight data:", error);
  //   }
  // }

  const renderFlightCard = ({ item }: { item: FlightDetails }) => (
    <Pressable style={styles.flightCard}>
      <View style={styles.priceRow}>
        <Text style={styles.priceText}>${item.price}</Text>
        <Text>{item.passengers} passenger(s)</Text>
      </View>

      {/* Departure flight details */}
      <Text style={styles.sectionTitle}>Departure:</Text>
      {item.departure.map((segment, index) => (
        <View key={index} style={styles.segmentDetails}>
          <Text style={styles.segmentText}>
            {segment.from} → {segment.to}
          </Text>
          <Text>Departure: {segment.departureTime}</Text>
          <Text>Arrival: {segment.arrivalTime}</Text>
          <Text>Stops: {segment.stops}</Text>
          <Text>Stop Duration: {segment.stopDuration}</Text>
        </View>
      ))}

      {/* Return flight details */}
      <Text style={styles.sectionTitle}>Return:</Text>
      {item.return.map((segment, index) => (
        <View key={index} style={styles.segmentDetails}>
          <Text style={styles.segmentText}>
            {segment.from} → {segment.to}
          </Text>
          <Text>Departure: {segment.departureTime}</Text>
          <Text>Arrival: {segment.arrivalTime}</Text>
          <Text>Stops: {segment.stops}</Text>
          <Text>Stop Duration: {segment.stopDuration}</Text>
        </View>
      ))}
    </Pressable>
  );

  if (!flights || flights.length === 0) {
    return (
      <View style={styles.noFlightsContainer}>
        <Text style={styles.noFlightsText}>No flights found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Available Flights ({flights.length})</Text>
      <FlatList
        data={flights}
        renderItem={renderFlightCard}
        keyExtractor={(item, index) => index.toString()}
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
  noFlightsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noFlightsText: {
    fontSize: 16,
    color: '#666',
  },
});
