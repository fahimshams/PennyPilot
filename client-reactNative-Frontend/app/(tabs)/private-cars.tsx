import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useGlobalSearchParams } from 'expo-router';
import TopBar from '../../components/TopBarComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface PrivateCarDetails {
  name: string;
  price: string;
  currency: string;
  type: string;
  passengers: number;
  driver: string;
  rating: string;
  features: string[];
}

// Mock data for private cars
const privateCarsData = [
    { 
        id: '1', 
        name: 'Tesla Model S', 
        price: '$200/day', 
        passengers: 4, 
        driver: 'John Smith', 
        rating: '4.8★',
        carType: 'Electric Luxury Sedan'
    },
    { 
        id: '2', 
        name: 'Mercedes-Benz S-Class', 
        price: '$300/day', 
        passengers: 4, 
        driver: 'Sarah Johnson', 
        rating: '4.9★',
        carType: 'Luxury Sedan'
    },
    { 
        id: '3', 
        name: 'BMW 7 Series', 
        price: '$280/day', 
        passengers: 4, 
        driver: 'Michael Brown', 
        rating: '4.7★',
        carType: 'Executive Sedan'
    },
    { 
        id: '4', 
        name: 'Audi A8', 
        price: '$290/day', 
        passengers: 4, 
        driver: 'Emily Davis', 
        rating: '4.9★',
        carType: 'Luxury Sedan'
    }
];

export default function PrivateCars() {
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    startDate: '',
    endDate: '',
    passengers: '',
    budget: ''
  });
  const [privateCars, setPrivateCars] = useState<PrivateCarDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

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
    const fetchPrivateCars = async () => {
      if (!searchParams.to) return;
      
      try {
        setIsFetching(true);
        // Replace this with API logic when ready
        const dummyData: PrivateCarDetails[] = [
          {
            name: "Tesla Model S",
            price: "200",
            currency: "USD",
            type: "Luxury",
            passengers: 4,
            driver: "John Smith",
            rating: "4.8",
            features: ["AC", "WiFi", "Charging", "Premium Sound"]
          },
          {
            name: "Mercedes-Benz S-Class",
            price: "300",
            currency: "USD",
            type: "Luxury",
            passengers: 4,
            driver: "Sarah Johnson",
            rating: "4.9",
            features: ["AC", "WiFi", "Water", "Phone Charger", "Child Seat"]
          },
          {
            name: "Executive Van " + searchParams.to,
            price: "200",
            currency: "USD",
            type: "Van",
            passengers: 7,
            driver: "Michael Brown",
            rating: "4.7",
            features: ["AC", "WiFi", "Water", "Phone Charger", "TV"]
          },
          {
            name: "Business Class " + searchParams.to,
            price: "120",
            currency: "USD",
            type: "Sedan",
            passengers: 3,
            driver: "Emily Davis",
            rating: "4.9",
            features: ["AC", "WiFi", "Water", "Phone Charger", "Newspaper"]
          },
          {
            name: "Family SUV " + searchParams.to,
            price: "160",
            currency: "USD",
            type: "SUV",
            passengers: 6,
            driver: "David Wilson",
            rating: "4.8",
            features: ["AC", "WiFi", "Water", "Phone Charger", "Child Seats"]
          },
          {
            name: "Luxury Limo " + searchParams.to,
            price: "250",
            currency: "USD",
            type: "Limo",
            passengers: 4,
            driver: "Jennifer Lee",
            rating: "5.0",
            features: ["AC", "WiFi", "Water", "Phone Charger", "Bar", "TV"]
          }
        ];
        setPrivateCars(dummyData);
      } catch (error) {
        console.error(error);
        alert("Error fetching private car details.");
      } finally {
        setIsFetching(false);
      }
    };

    fetchPrivateCars();
  }, [searchParams.to, searchParams.startDate, searchParams.endDate, searchParams.passengers]);

  const { from, to, startDate, endDate, passengers, budget } = searchParams;
  const hasValidSearch = from && to && from !== 'undefined' && to !== 'undefined';

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
        <Text style={styles.loadingText}>Please search for a destination to view private cars....</Text>
      </View>
    );
  }

  const renderPrivateCarCard = ({ item }: { item: PrivateCarDetails }) => (
    <View style={styles.carCard}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.carName}>{item.name}</Text>
          <Text style={styles.carType}>{item.type}</Text>
        </View>
        <Text style={styles.price}>{item.price}</Text>
      </View>
      
      <View style={styles.driverInfo}>
        <Text style={styles.driverName}>Driver: {item.driver}</Text>
        <Text style={styles.rating}>{item.rating}</Text>
      </View>
      
      <View style={styles.details}>
        <Text style={styles.detailText}>Passengers: {item.passengers}</Text>
      </View>
      
      <View style={styles.buttonContainer}>
        <Text style={styles.bookButton}>Book Private Car</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TopBar 
        from={from}
        to={to}
        startDate={startDate}
        endDate={endDate}
        passengers={passengers}
        budget={budget}
        onChange={handleSearchParamsChange}
      />
      {isFetching ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Fetching private cars...</Text>
        </View>
      ) : (
        <FlatList
          data={privateCars}
          renderItem={renderPrivateCarCard}
          keyExtractor={(item, index) => index.toString()}
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
    content: {
        flex: 1,
        padding: 16,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333',
    },
    messageText: {
        fontSize: 16,
        textAlign: 'center',
        padding: 20,
        color: '#666',
    },
    listContainer: {
        paddingBottom: 16,
    },
    carCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    carName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    carType: {
        fontSize: 14,
        color: '#666',
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
    driverInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    driverName: {
        fontSize: 16,
        color: '#333',
    },
    rating: {
        fontSize: 16,
        color: '#FFB800',
        fontWeight: '600',
    },
    details: {
        marginBottom: 12,
    },
    detailText: {
        fontSize: 14,
        color: '#666',
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 8,
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
    bookButton: {
        backgroundColor: '#4CAF50',
        color: 'white',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        overflow: 'hidden',
        fontSize: 16,
        fontWeight: '600',
    },
}); 