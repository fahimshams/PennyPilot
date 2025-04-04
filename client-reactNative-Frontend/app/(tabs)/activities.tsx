import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator } from 'react-native';
import { useGlobalSearchParams } from 'expo-router';
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

export default function Activities() {
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
        const fetchActivities = async () => {
            if (!searchParams.to) return;
            
            try {
                setIsFetching(true);

                // const fetchActivities = async () => {
                //   try {
                //     const response = await fetch(
                //       `http://localhost:5000/api/activities?latitude=40.69159&longitude=-73.98466`
                //     );
            
                //     if (!response.ok) {
                //       throw new Error('Failed to fetch activities');
                //     }
            
                //     const data: Activity[] = await response.json();
                
                // Replace this with API logic when ready
                const dummyData: ActivityDetails[] = [
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
                setActivities(dummyData);
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

    const renderActivityCard = ({ item }: { item: any }) => (
        <View style={styles.activityCard}>
            <Text style={styles.activityName}>{item.name}</Text>
            <Text style={styles.rating}>{item.rating}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <View style={styles.detailsRow}>
                <Text style={styles.details}>Duration: {item.duration}</Text>
                <Text style={styles.price}>{item.price}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <Text style={styles.bookButton}>Book Activity</Text>
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
                    <Text style={styles.loadingText}>Fetching activities...</Text>
                </View>
            ) : (
                <FlatList
                    data={activities}
                    renderItem={renderActivityCard}
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
    activityCard: {
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
    activityName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
    },
    rating: {
        fontSize: 16,
        color: '#FFB800',
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginBottom: 12,
    },
    detailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    details: {
        fontSize: 14,
        color: '#666',
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
    buttonContainer: {
        alignItems: 'center',
    },
    bookButton: {
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
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333',
        textAlign: 'center',
    },
});
