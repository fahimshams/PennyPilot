import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useGlobalSearchParams } from 'expo-router';
import TopBar from '../../components/TopBarComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface RentalCarDetails {
  name: string;
  price: string;
  currency: string;
  type: string;
  passengers: number;
  transmission: string;
  features: string[];
}

// Mock data
const rentalCarsData = [
    { id: '1', name: 'Toyota Corolla', price: '$50/day', passengers: 5 },
    { id: '2', name: 'Honda Accord', price: '$60/day', passengers: 5 },
    { id: '3', name: 'Nissan Altima', price: '$55/day', passengers: 5 },
    { id: '4', name: 'Ford Fusion', price: '$52/day', passengers: 5 },
];

export default function RentalCars() {
    const [searchParams, setSearchParams] = useState({
        from: '',
        to: '',
        startDate: '',
        endDate: '',
        passengers: '',
        budget: ''
    });
    const [rentalCars, setRentalCars] = useState<RentalCarDetails[]>([]);
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
        const fetchRentalCars = async () => {
            if (!searchParams.to) return;
            
            try {
                setIsFetching(true);
                // Replace this with API logic when ready
                const dummyData: RentalCarDetails[] = [
                    {
                        name: "Toyota Corolla",
                        price: "50",
                        currency: "USD",
                        type: "Economy",
                        passengers: 5,
                        transmission: "Automatic",
                        features: ["AC", "Bluetooth", "GPS"]
                    },
                    {
                        name: "Honda Accord",
                        price: "60",
                        currency: "USD",
                        type: "Midsize",
                        passengers: 5,
                        transmission: "Automatic",
                        features: ["AC", "Bluetooth", "GPS", "4WD"]
                    },
                    {
                        name: "Luxury Sedan",
                        price: "120",
                        currency: "USD",
                        type: "Luxury",
                        passengers: 4,
                        transmission: "Automatic",
                        features: ["AC", "Bluetooth", "GPS", "Leather Seats", "Sunroof"]
                    },
                    {
                        name: "Compact Car",
                        price: "40",
                        currency: "USD",
                        type: "Compact",
                        passengers: 4,
                        transmission: "Automatic",
                        features: ["AC", "Bluetooth"]
                    },
                    {
                        name: "Minivan",
                        price: "90",
                        currency: "USD",
                        type: "Minivan",
                        passengers: 7,
                        transmission: "Automatic",
                        features: ["AC", "Bluetooth", "GPS", "Sliding Doors"]
                    },
                    {
                        name: "Sports Car",
                        price: "150",
                        currency: "USD",
                        type: "Sports",
                        passengers: 2,
                        transmission: "Manual",
                        features: ["AC", "Bluetooth", "GPS", "Convertible"]
                    }
                ];
                setRentalCars(dummyData);
            } catch (error) {
                console.error(error);
                alert("Error fetching rental car details.");
            } finally {
                setIsFetching(false);
            }
        };

        fetchRentalCars();
    }, [searchParams.to, searchParams.startDate, searchParams.endDate, searchParams.passengers]);

    const { from, to, startDate, endDate, passengers, budget } = searchParams;
    const hasValidSearch = from && to && from !== 'undefined' && to !== 'undefined';

    const renderCarCard = ({ item }: { item: any }) => (
        <View style={styles.carCard}>
            <Text style={styles.carName}>{item.name}</Text>
            <Text style={styles.carDetails}>Price: {item.price}</Text>
            <Text style={styles.carDetails}>Passengers: {item.passengers}</Text>
            <View style={styles.buttonContainer}>
                <Text style={styles.selectButton}>Select Car</Text>
            </View>
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
                <Text style={styles.loadingText}>Please search for a destination to view rental cars....</Text>
            </View>
        );
    }

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
                    <Text style={styles.loadingText}>Fetching rental cars...</Text>
                </View>
            ) : (
                <FlatList
                    data={rentalCars}
                    renderItem={renderCarCard}
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
    carName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
    },
    carDetails: {
        fontSize: 16,
        color: '#666',
        marginBottom: 4,
    },
    buttonContainer: {
        marginTop: 12,
        alignItems: 'center',
    },
    selectButton: {
        backgroundColor: '#4CAF50',
        color: 'white',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 6,
        overflow: 'hidden',
        fontSize: 16,
        fontWeight: '600',
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
    messageText: {
        fontSize: 16,
        textAlign: 'center',
        padding: 20,
        color: '#666',
    },
}); 