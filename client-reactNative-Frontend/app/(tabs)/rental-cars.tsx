import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useGlobalSearchParams } from 'expo-router';
import TopBar from '../../components/TopBarComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface RentalCarDetails {
  // Basic Information
  id: string;
  provider: string;
  model: string;
  type: string;
  
  // Pricing Information
  price: {
    total: string;
    base: string;
    currency: string;
    fees: Array<{
      amount: string;
      type: string;
    }>;
    grandTotal: string;
  };
  
  // Vehicle Details
  vehicle: {
    passengerCapacity: number;
    baggageCapacity: number;
    features: string[];
    fuelPolicy: string;
    transmission: string;
  };
  
  // Location Information
  pickupLocation: {
    iataCode: string;
    name: string;
    address: string;
    terminal?: string;
    at: string;
  };
  
  dropoffLocation: {
    iataCode: string;
    name: string;
    address: string;
    terminal?: string;
    at: string;
  };
  
  // Additional Details
  mileage: {
    allowed: string;
    extraMileCost: string;
  };
  
  insuranceOptions: Array<{
    type: string;
    price: string;
    coverage: string;
  }>;
  
  // Booking Information
  instantBookingAvailable: boolean;
  lastBookingDate: string;
}

// Mock data

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
               
                const response = await fetch(
                    `http://localhost:5000/api/searchCarRentals?pickupLocationCode=${searchParams.from}&dropoffLocationCode=${searchParams.to}&pickupDateTime=${searchParams.startDate}&dropoffDateTime=${searchParams.endDate}&adults=${searchParams.passengers}&travelBudget=${searchParams.budget}`
                  );

                  if (!response.ok) {
                    throw new Error('Failed to fetch flights');
                  }

                  const data: RentalCarDetails[] = await response.json();
                setRentalCars(data);
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

    const renderCarCard = ({ item }: { item: RentalCarDetails }) => (
        <View style={styles.carCard}>
            <View style={styles.cardHeader}>
                <View style={styles.carInfo}>
                    <Text style={styles.carName}>{item.model}</Text>
                    <Text style={styles.carType}>{item.type}</Text>
                    <View style={styles.providerBadge}>
                        <Text style={styles.providerText}>{item.provider}</Text>
                    </View>
                </View>
                <View style={styles.priceContainer}>
                    <Text style={styles.priceLabel}>Total Price</Text>
                    <Text style={styles.price}>{item.price.currency} {item.price.total}</Text>
                </View>
            </View>
            
            <View style={styles.availabilityBadge}>
                <Text style={styles.availabilityText}>
                    {item.instantBookingAvailable ? '✓ Instant Booking Available' : '⏳ Booking Required'}
                </Text>
            </View>

            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Vehicle Details</Text>
                <View style={styles.detailsGrid}>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailIcon}>👥</Text>
                        <Text style={styles.detailValue}>{item.vehicle.passengerCapacity} Passengers</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailIcon}>🧳</Text>
                        <Text style={styles.detailValue}>{item.vehicle.baggageCapacity} Bags</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailIcon}>⚙️</Text>
                        <Text style={styles.detailValue}>{item.vehicle.transmission}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailIcon}>⛽</Text>
                        <Text style={styles.detailValue}>{item.vehicle.fuelPolicy}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Features</Text>
                <View style={styles.featuresGrid}>
                    {item.vehicle.features.map((feature, index) => (
                        <View key={index} style={styles.featureItem}>
                            <Text style={styles.featureIcon}>•</Text>
                            <Text style={styles.featureText}>{feature}</Text>
                        </View>
                    ))}
                </View>
            </View>

            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Pickup Location</Text>
                <View style={styles.locationInfo}>
                    <Text style={styles.locationName}>{item.pickupLocation.name}</Text>
                    <Text style={styles.locationAddress}>{item.pickupLocation.address}</Text>
                    {item.pickupLocation.terminal && (
                        <Text style={styles.locationTerminal}>Terminal: {item.pickupLocation.terminal}</Text>
                    )}
                    <Text style={styles.locationTime}>
                        {new Date(item.pickupLocation.at).toLocaleString()}
                    </Text>
                </View>
            </View>

            <TouchableOpacity style={styles.selectButton}>
                <Text style={styles.selectButtonText}>Select Car</Text>
            </TouchableOpacity>
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
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    carInfo: {
        flex: 1,
    },
    carName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 4,
    },
    carType: {
        fontSize: 16,
        color: '#7f8c8d',
        marginBottom: 8,
    },
    providerBadge: {
        backgroundColor: '#e8f5e9',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: 'flex-start',
    },
    providerText: {
        fontSize: 14,
        color: '#2e7d32',
        fontWeight: '500',
    },
    priceContainer: {
        alignItems: 'flex-end',
    },
    priceLabel: {
        fontSize: 14,
        color: '#7f8c8d',
        marginBottom: 4,
    },
    price: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2e7d32',
    },
    availabilityBadge: {
        backgroundColor: '#e3f2fd',
        padding: 8,
        borderRadius: 8,
        marginBottom: 16,
    },
    availabilityText: {
        fontSize: 14,
        color: '#1976d2',
        textAlign: 'center',
        fontWeight: '500',
    },
    sectionContainer: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2c3e50',
        marginBottom: 12,
    },
    detailsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        padding: 8,
        borderRadius: 8,
        minWidth: '45%',
    },
    detailIcon: {
        fontSize: 16,
        marginRight: 8,
    },
    detailValue: {
        fontSize: 14,
        color: '#2c3e50',
    },
    featuresGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        padding: 8,
        borderRadius: 8,
        minWidth: '45%',
    },
    featureIcon: {
        fontSize: 16,
        color: '#2e7d32',
        marginRight: 8,
    },
    featureText: {
        fontSize: 14,
        color: '#2c3e50',
    },
    locationInfo: {
        backgroundColor: '#f8f9fa',
        padding: 12,
        borderRadius: 8,
    },
    locationName: {
        fontSize: 16,
        fontWeight: '500',
        color: '#2c3e50',
        marginBottom: 4,
    },
    locationAddress: {
        fontSize: 14,
        color: '#7f8c8d',
        marginBottom: 4,
    },
    locationTerminal: {
        fontSize: 14,
        color: '#7f8c8d',
        marginBottom: 4,
    },
    locationTime: {
        fontSize: 14,
        color: '#7f8c8d',
    },
    selectButton: {
        backgroundColor: '#2e7d32',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 8,
    },
    selectButtonText: {
        color: 'white',
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
        color: '#7f8c8d',
    },
    messageText: {
        fontSize: 16,
        textAlign: 'center',
        padding: 20,
        color: '#666',
    },
}); 