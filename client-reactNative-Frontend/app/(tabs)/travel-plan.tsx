import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const SESSION_STORAGE_KEY = 'travel_form_data';

interface FlightSegment {
    from: string;
    to: string;
    departureTime: string;
    arrivalTime: string;
    duration: string;
    stops: number;
    flightNumber: string;
    aircraft: string;
    stopDuration?: string;
}

interface FlightDetails {
    price: {
        total: string;
        currency: string;
    };
    passengers: number;
    airline: string;
    departureDetails: {
        totalDuration: string;
        segments: FlightSegment[];
    };
    returnDetails: {
        totalDuration: string;
        segments: FlightSegment[];
    };
}

interface HotelDetails {
    name: string;
    latitude: number;
    longitude: number;
    checkInDate: string;
    checkOutDate: string;
    price: string;
    currency: string;
    bedType: string;
    adults: number;
}

interface TravelPlanData {
    flightSelected?: FlightDetails;
    hotelSelected?: HotelDetails;
    activitySelected?: Array<{
        name: string;
        price: string;
        currency: string;
        duration: string;
        rating: string;
        description: string;
        category: string;
    }>;
}

export default function TravelPlan() {
    const router = useRouter();
    const [travelData, setTravelData] = useState<TravelPlanData>({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadTravelData = async () => {
            try {
                const sessionData = await AsyncStorage.getItem(SESSION_STORAGE_KEY);
                if (sessionData) {
                    const parsedData = JSON.parse(sessionData);
                    setTravelData(parsedData);
                }
            } catch (error) {
                console.error('Error loading travel data:', error);
                Alert.alert('Error', 'Failed to load travel plan data');
            } finally {
                setIsLoading(false);
            }
        };
        loadTravelData();
    }, []);

    const handleClearPlan = async () => {
        try {
            // Clear all session data
            await AsyncStorage.multiRemove([
                SESSION_STORAGE_KEY,
                'searchParams',
                'flightSelected',
                'hotelSelected',
                'activitySelected'
            ]);

            // Reset travel data state
            setTravelData({});

            // Navigate to travel form immediately
            router.replace('/');
        } catch (error) {
            console.error('Error clearing travel plan:', error);
        }
    };

    if (isLoading) {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>Loading your travel plan...</Text>
            </View>
        );
    }

    const hasSelectedItems = travelData.flightSelected || travelData.hotelSelected || (travelData.activitySelected && travelData.activitySelected.length > 0);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Your Travel Plan</Text>
                {hasSelectedItems && (
                    <TouchableOpacity style={styles.clearButton} onPress={handleClearPlan}>
                        <Text style={styles.clearButtonText}>Clear Plan</Text>
                    </TouchableOpacity>
                )}
            </View>

            {!hasSelectedItems ? (
                <View style={styles.emptyState}>
                    <Text style={styles.emptyStateText}>No travel plan yet. Start by selecting flights, hotels, and activities!</Text>
                    <TouchableOpacity 
                        style={styles.startButton}
                        onPress={() => router.push('/')}
                    >
                        <Text style={styles.startButtonText}>Start Planning</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.content}>
                    {travelData.flightSelected && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Selected Flight</Text>
                            <View style={styles.card}>
                                <Text style={styles.cardTitle}>{travelData.flightSelected.airline}</Text>
                                {travelData.flightSelected.departureDetails?.segments?.[0] && (
                                    <>
                                        <Text style={styles.cardSubtitle}>Flight {travelData.flightSelected.departureDetails.segments[0].flightNumber}</Text>
                                        <View style={styles.detailsRow}>
                                            <Text style={styles.detail}>Departure: {travelData.flightSelected.departureDetails.segments[0].departureTime}</Text>
                                            <Text style={styles.detail}>Arrival: {travelData.flightSelected.departureDetails.segments[0].arrivalTime}</Text>
                                        </View>
                                    </>
                                )}
                                {travelData.flightSelected.price?.total && (
                                    <Text style={styles.price}>${travelData.flightSelected.price.total} {travelData.flightSelected.price.currency}</Text>
                                )}
                            </View>
                        </View>
                    )}

                    {travelData.hotelSelected && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Selected Hotel</Text>
                            <View style={styles.card}>
                                <Text style={styles.cardTitle}>{travelData.hotelSelected.name}</Text>
                                <Text style={styles.cardSubtitle}>Bed Type: {travelData.hotelSelected.bedType}</Text>
                                <View style={styles.detailsRow}>
                                    <Text style={styles.detail}>Check-in: {travelData.hotelSelected.checkInDate}</Text>
                                    <Text style={styles.detail}>Check-out: {travelData.hotelSelected.checkOutDate}</Text>
                                </View>
                                <Text style={styles.price}>${travelData.hotelSelected.price} {travelData.hotelSelected.currency}</Text>
                            </View>
                        </View>
                    )}

                    {travelData.activitySelected && travelData.activitySelected.length > 0 && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Selected Activities</Text>
                            {travelData.activitySelected.map((activity, index) => (
                                <View key={index} style={styles.card}>
                                    <Text style={styles.cardTitle}>{activity.name}</Text>
                                    <Text style={styles.cardSubtitle}>{activity.category}</Text>
                                    <Text style={styles.description}>{activity.description}</Text>
                                    <View style={styles.detailsRow}>
                                        <Text style={styles.detail}>Duration: {activity.duration}</Text>
                                        <Text style={styles.detail}>Rating: {activity.rating}★</Text>
                                    </View>
                                    <Text style={styles.price}>${activity.price} {activity.currency}</Text>
                                </View>
                            ))}
                        </View>
                    )}
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#e9ecef',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2d3436',
    },
    clearButton: {
        padding: 8,
    },
    clearButtonText: {
        color: '#e74c3c',
        fontSize: 16,
        fontWeight: '600',
    },
    content: {
        padding: 20,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2d3436',
        marginBottom: 16,
    },
    card: {
        backgroundColor: '#ffffff',
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
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2d3436',
        marginBottom: 4,
    },
    cardSubtitle: {
        fontSize: 14,
        color: '#636e72',
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        color: '#636e72',
        marginBottom: 8,
        lineHeight: 20,
    },
    detailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    detail: {
        fontSize: 14,
        color: '#636e72',
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2ecc71',
    },
    rating: {
        fontSize: 14,
        color: '#f1c40f',
        marginBottom: 8,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyStateText: {
        fontSize: 16,
        color: '#636e72',
        textAlign: 'center',
        marginBottom: 20,
        lineHeight: 24,
    },
    startButton: {
        backgroundColor: '#4CAF50',
        padding: 16,
        borderRadius: 12,
        width: '100%',
        alignItems: 'center',
    },
    startButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loadingText: {
        fontSize: 16,
        color: '#636e72',
        textAlign: 'center',
        marginTop: 20,
    },
}); 