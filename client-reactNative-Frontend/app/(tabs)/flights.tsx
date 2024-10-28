import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Button } from 'react-native';
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
  const [flights, setFlights] = useState<FlightDetails[]>([]);
  const [expandedFlightIndex, setExpandedFlightIndex] = useState<number | null>(null);
  
  const searchParams = useLocalSearchParams();
  const { from, to, startDate, endDate, passengers, budget } = searchParams;

  useEffect(() => {
    const fetchFlights = async () => {
      try {
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
      }
    };

    fetchFlights();
  }, [from, to, startDate, endDate, passengers, budget]);

  const handleExpandToggle = (index: number) => {
    setExpandedFlightIndex(expandedFlightIndex === index ? null : index);
  };

  const handleSelectFlight = (flight: FlightDetails) => {
    console.log(flight);
    alert(`Selected flight: ${JSON.stringify(flight, null, 2)}`);
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

  if (!flights.length) {
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
