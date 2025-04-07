import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTravelSession } from '../context/TravelSessionContext';
import { useRouter } from 'expo-router';

export default function TravelPlan() {
  const { session, clearSession } = useTravelSession();
  const router = useRouter();

  const calculateTotalCost = () => {
    let total = 0;
    
    // Add flight costs
    session.flights.forEach(flight => {
      total += parseFloat(flight.price);
    });
    
    // Add rental car costs
    session.rentalCars.forEach(car => {
      total += parseFloat(car.price);
    });
    
    // Add private car costs
    session.privateCars.forEach(car => {
      total += parseFloat(car.price);
    });
    
    // Add hotel costs
    session.hotels.forEach(hotel => {
      total += parseFloat(hotel.price);
    });
    
    // Add activity costs
    session.activities.forEach(activity => {
      total += parseFloat(activity.price);
    });
    
    return total.toFixed(2);
  };

  const renderSection = (title: string, items: any[], renderItem: (item: any) => React.ReactNode) => {
    if (items.length === 0) return null;
    
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {items.map(item => renderItem(item))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Travel Plan</Text>
        <TouchableOpacity style={styles.clearButton} onPress={clearSession}>
          <Text style={styles.clearButtonText}>Clear Plan</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Trip Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>From:</Text>
            <Text style={styles.summaryValue}>{session.locations.from || 'Not selected'}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>To:</Text>
            <Text style={styles.summaryValue}>{session.locations.to || 'Not selected'}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Start Date:</Text>
            <Text style={styles.summaryValue}>{session.travelDates.startDate || 'Not selected'}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>End Date:</Text>
            <Text style={styles.summaryValue}>{session.travelDates.endDate || 'Not selected'}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Budget:</Text>
            <Text style={styles.summaryValue}>${session.totalBudget || '0'}</Text>
          </View>
        </View>

        {renderSection('Flights', session.flights, (flight) => (
          <View key={flight.flightNumber} style={styles.itemCard}>
            <Text style={styles.itemTitle}>{flight.airline} - {flight.flightNumber}</Text>
            <View style={styles.itemDetails}>
              <Text style={styles.itemDetail}>From: {flight.departure}</Text>
              <Text style={styles.itemDetail}>To: {flight.arrival}</Text>
              <Text style={styles.itemDetail}>Passengers: {flight.passengers}</Text>
              <Text style={styles.itemPrice}>${flight.price}</Text>
            </View>
          </View>
        ))}

        {renderSection('Rental Cars', session.rentalCars, (car) => (
          <View key={car.id} style={styles.itemCard}>
            <Text style={styles.itemTitle}>{car.model}</Text>
            <View style={styles.itemDetails}>
              <Text style={styles.itemDetail}>Provider: {car.provider}</Text>
              <Text style={styles.itemDetail}>Pickup: {car.pickupDate}</Text>
              <Text style={styles.itemDetail}>Dropoff: {car.dropoffDate}</Text>
              <Text style={styles.itemDetail}>Location: {car.location}</Text>
              <Text style={styles.itemPrice}>${car.price}</Text>
            </View>
          </View>
        ))}

        {renderSection('Private Cars', session.privateCars, (car) => (
          <View key={car.id} style={styles.itemCard}>
            <Text style={styles.itemTitle}>{car.model}</Text>
            <View style={styles.itemDetails}>
              <Text style={styles.itemDetail}>Provider: {car.provider}</Text>
              <Text style={styles.itemDetail}>Engine: {car.engineType}</Text>
              <Text style={styles.itemDetail}>Features: {car.features.join(', ')}</Text>
              <Text style={styles.itemPrice}>${car.price}</Text>
            </View>
          </View>
        ))}

        {renderSection('Hotels', session.hotels, (hotel) => (
          <View key={hotel.id} style={styles.itemCard}>
            <Text style={styles.itemTitle}>{hotel.name}</Text>
            <View style={styles.itemDetails}>
              <Text style={styles.itemDetail}>Location: {hotel.location}</Text>
              <Text style={styles.itemDetail}>Room Type: {hotel.roomType}</Text>
              <Text style={styles.itemDetail}>Check-in: {hotel.checkIn}</Text>
              <Text style={styles.itemDetail}>Check-out: {hotel.checkOut}</Text>
              <Text style={styles.itemPrice}>${hotel.price}</Text>
            </View>
          </View>
        ))}

        {renderSection('Activities', session.activities, (activity) => (
          <View key={activity.id} style={styles.itemCard}>
            <Text style={styles.itemTitle}>{activity.name}</Text>
            <View style={styles.itemDetails}>
              <Text style={styles.itemDetail}>Location: {activity.location}</Text>
              <Text style={styles.itemDetail}>Date: {activity.date}</Text>
              <Text style={styles.itemDetail}>Participants: {activity.participants}</Text>
              <Text style={styles.itemPrice}>${activity.price}</Text>
            </View>
          </View>
        ))}

        <View style={styles.totalCard}>
          <Text style={styles.totalTitle}>Total Cost</Text>
          <Text style={styles.totalAmount}>${calculateTotalCost()}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  clearButton: {
    padding: 8,
  },
  clearButtonText: {
    color: '#ff3b30',
    fontSize: 16,
  },
  content: {
    flex: 1,
  },
  summaryCard: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666',
  },
  summaryValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  itemCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  itemDetails: {
    gap: 4,
  },
  itemDetail: {
    fontSize: 14,
    color: '#666',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
    marginTop: 8,
  },
  totalCard: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  totalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
}); 