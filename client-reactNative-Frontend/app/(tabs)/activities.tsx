import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { useGlobalSearchParams, useRouter } from 'expo-router';
import TopBar from '../../components/TopBarComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ActivityDetails {
    name: string;
    price: string;
    currency: string;
    duration: string;
    rating: string;
    description: string;
    category: string;
}

const activitiesData = [
    {
        id: '1',
        name: 'City Walking Tour',
        price: '$30',
        duration: '2 hours',
        rating: '4.8★',
        description: 'Explore the city\'s historic landmarks and cultural sites.',
    },
    {
        id: '2',
        name: 'Food Tasting Experience',
        price: '$65',
        duration: '3 hours',
        rating: '4.9★',
        description: 'Sample local delicacies and learn about culinary traditions.',
    },
    {
        id: '3',
        name: 'Museum Pass',
        price: '$25',
        duration: 'Full day',
        rating: '4.7★',
        description: 'Access to major museums and art galleries.',
    },
    {
        id: '4',
        name: 'Adventure Park',
        price: '$45',
        duration: '4 hours',
        rating: '4.6★',
        description: 'Exciting outdoor activities and adventures.',
    },
];

const SESSION_STORAGE_KEY = 'travel_form_data';

export default function Activities() {
    const router = useRouter();
    const [searchParams, setSearchParams] = useState({
        from: '',
        to: '',
        startDate: '',
        endDate: '',
        passengers: '',
        budget: ''
    });
    const [activities, setActivities] = useState<ActivityDetails[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFetching, setIsFetching] = useState(false);
    const [selectedActivities, setSelectedActivities] = useState<ActivityDetails[]>([]);

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

    useEffect(() => {
        const loadSelectedActivities = async () => {
            try {
                const sessionData = await AsyncStorage.getItem(SESSION_STORAGE_KEY);
                if (sessionData) {
                    const parsedData = JSON.parse(sessionData);
                    if (parsedData.activitySelected) {
                        setSelectedActivities(parsedData.activitySelected);
                    }
                }
            } catch (error) {
                console.error('Error loading selected activities:', error);
            }
        };
        loadSelectedActivities();
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
        const fetchActivities = async () => {
            if (!searchParams.from || !searchParams.to) return;
            
            try {
                setIsFetching(true);
                
                // API Integration (commented out)
                /*
                const response = await fetch('http://localhost:5000/api/chat/weather-activities', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        location: searchParams.to,
                        dates: [searchParams.startDate, searchParams.endDate],
                    }),
                });
                
                if (!response.ok) {
                    throw new Error('Failed to fetch activities');
                }
                
                const data = await response.json();
                setActivities(data.activities);
                */
                
                // Mock data implementation
                const mockActivities: ActivityDetails[] = [
                    {
                        name: "City Walking Tour " + searchParams.to,
                        price: "50",
                        currency: "USD",
                        duration: "3 hours",
                        rating: "4.7",
                        description: "Explore the best sights of " + searchParams.to + " with our expert guide",
                        category: "Sightseeing"
                    },
                    {
                        name: "Food Tour " + searchParams.to,
                        price: "75",
                        currency: "USD",
                        duration: "4 hours",
                        rating: "4.9",
                        description: "Taste the local cuisine of " + searchParams.to,
                        category: "Food & Drink"
                    },
                    {
                        name: "Museum Pass " + searchParams.to,
                        price: "40",
                        currency: "USD",
                        duration: "1 day",
                        rating: "4.6",
                        description: "Access to all major museums in " + searchParams.to,
                        category: "Culture"
                    },
                    {
                        name: "Bike Tour " + searchParams.to,
                        price: "35",
                        currency: "USD",
                        duration: "2 hours",
                        rating: "4.8",
                        description: "Cycle through the scenic routes of " + searchParams.to,
                        category: "Adventure"
                    },
                    {
                        name: "Boat Cruise " + searchParams.to,
                        price: "60",
                        currency: "USD",
                        duration: "2 hours",
                        rating: "4.9",
                        description: "Enjoy a scenic boat ride around " + searchParams.to,
                        category: "Sightseeing"
                    },
                    {
                        name: "Cooking Class " + searchParams.to,
                        price: "85",
                        currency: "USD",
                        duration: "3 hours",
                        rating: "4.8",
                        description: "Learn to cook local dishes of " + searchParams.to,
                        category: "Food & Drink"
                    }
                ];
                setActivities(mockActivities);
            } catch (error) {
                console.error(error);
                alert("Error fetching activity details.");
            } finally {
                setIsFetching(false);
            }
        };

        fetchActivities();
    }, [searchParams.to, searchParams.startDate, searchParams.endDate]);

    const { from, to, startDate, endDate, passengers, budget } = searchParams;
    const hasValidSearch = from && to && from !== 'undefined' && to !== 'undefined';

    const handleBookActivity = async (activity: ActivityDetails) => {
        try {
            const isSelected = selectedActivities.some(a => 
                a.name === activity.name && 
                a.price === activity.price
            );

            let newSelectedActivities: ActivityDetails[];
            if (isSelected) {
                // Remove activity from selection
                newSelectedActivities = selectedActivities.filter(a => 
                    !(a.name === activity.name && a.price === activity.price)
                );
            } else {
                // Add activity to selection
                newSelectedActivities = [...selectedActivities, activity];
            }

            setSelectedActivities(newSelectedActivities);

            // Update session storage
            const sessionData = await AsyncStorage.getItem(SESSION_STORAGE_KEY);
            const parsedData = sessionData ? JSON.parse(sessionData) : {};
            
            if (newSelectedActivities.length > 0) {
                parsedData.activitySelected = newSelectedActivities;
            } else {
                delete parsedData.activitySelected;
            }

            await AsyncStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(parsedData));

            // Only show alert if selecting a new activity
            if (!isSelected) {
                Alert.alert(
                    'Success',
                    'Activity added to your travel plan!',
                    [
                        {
                            text: 'View Travel Plan',
                            onPress: () => {
                                router.push('/travel-plan');
                            }
                        }
                    ]
                );
            }
        } catch (error) {
            console.error('Error handling activity selection:', error);
            alert('Error updating activity selection');
        }
    };

    const isActivitySelected = (activity: ActivityDetails) => {
        return selectedActivities.some(a => 
            a.name === activity.name && 
            a.price === activity.price
        );
    };

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
                <Text style={styles.loadingText}>Please search for a destination to view activities....</Text>
            </View>
        );
    }

    const renderActivityCard = ({ item }: { item: ActivityDetails }) => (
        <View style={styles.activityCard}>
            <Text style={styles.activityName}>{item.name}</Text>
            <Text style={styles.rating}>{item.rating}★</Text>
            <Text style={styles.description}>{item.description}</Text>
            <View style={styles.detailsRow}>
                <Text style={styles.details}>Duration: {item.duration}</Text>
                <Text style={styles.price}>${item.price} {item.currency}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[
                        styles.bookButton,
                        isActivitySelected(item) && styles.selectedButton
                    ]}
                    onPress={() => handleBookActivity(item)}
                >
                    <Text style={[
                        styles.bookButtonText,
                        isActivitySelected(item) && styles.selectedButtonText
                    ]}>
                        {isActivitySelected(item) ? 'Selected' : 'Select Activity'}
                    </Text>
                </TouchableOpacity>
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
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>Available Activities</Text>
                <Text style={styles.headerSubtitle}>
                    {from} → {to}
                </Text>
            </View>
            {isFetching ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#4CAF50" />
                    <Text style={styles.loadingText}>Finding exciting activities for you...</Text>
                </View>
            ) : (
                <FlatList
                    data={activities}
                    renderItem={renderActivityCard}
                    keyExtractor={(item) => item.name}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f9fa",
    },
    headerContainer: {
        backgroundColor: "#ffffff",
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#e9ecef",
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#2d3436",
        marginBottom: 8,
    },
    headerSubtitle: {
        fontSize: 16,
        color: "#636e72",
    },
    listContainer: {
        padding: 16,
    },
    activityCard: {
        backgroundColor: "white",
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    activityName: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#2d3436",
        marginBottom: 8,
    },
    rating: {
        fontSize: 16,
        color: "#f1c40f",
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        color: "#636e72",
        marginBottom: 16,
        lineHeight: 20,
    },
    detailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    details: {
        fontSize: 14,
        color: "#636e72",
    },
    price: {
        fontSize: 18,
        color: "#2ecc71",
        fontWeight: 'bold',
    },
    buttonContainer: {
        alignItems: 'center',
    },
    bookButton: {
        backgroundColor: '#4CAF50',
        padding: 16,
        borderRadius: 12,
        width: '100%',
        alignItems: 'center',
    },
    selectedButton: {
        backgroundColor: '#95a5a6',
    },
    bookButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    selectedButtonText: {
        color: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    loadingText: {
        fontSize: 16,
        color: "#636e72",
        marginTop: 12,
        textAlign: 'center',
    },
});
