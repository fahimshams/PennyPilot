import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native';
import { useGlobalSearchParams } from 'expo-router';
import TopBar from '../../components/TopBarComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface WeatherDetails {
    current: {
        temp: number;
        condition: string;
        humidity: string;
        windSpeed: string;
    };
    forecast: Array<{
        id: string;
        day: string;
        temp: number;
        condition: string;
        icon: string;
    }>;
}

// Mock weather data
const weatherData: WeatherDetails = {
    current: {
        temp: 72,
        condition: 'Sunny',
        humidity: '45%',
        windSpeed: '10 mph',
    },
    forecast: [
        { id: '1', day: 'Mon', temp: 72, condition: 'Sunny', icon: '☀️' },
        { id: '2', day: 'Tue', temp: 70, condition: 'Partly Cloudy', icon: '⛅' },
        { id: '3', day: 'Wed', temp: 68, condition: 'Cloudy', icon: '☁️' },
        { id: '4', day: 'Thu', temp: 75, condition: 'Sunny', icon: '☀️' },
        { id: '5', day: 'Fri', temp: 71, condition: 'Partly Cloudy', icon: '⛅' },
    ],
};

export default function Weather() {
    const [searchParams, setSearchParams] = useState({
        from: '',
        to: '',
        startDate: '',
        endDate: '',
        passengers: '',
        budget: ''
    });
    const [weather, setWeather] = useState<WeatherDetails | null>(null);
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
        const fetchWeather = async () => {
            if (!searchParams.to) return;
            
            try {
                setIsFetching(true);
                // const response = await fetch('http://localhost:5000/api/chat/weather-activities', {
                //     method: 'POST',
                //     headers: {
                //       'Content-Type': 'application/json',
                //     },
                //     body: JSON.stringify({
                //       location: destination,
                //       dates: [startDate, endDate],
                //     }),
                //   });
          
                //   if (!response.ok) {
                //     throw new Error('Failed to fetch weather data');
                //   }
          
                //   const data = await response.json();
                // Replace this with API logic when ready
                const dummyData: WeatherDetails = {
                    current: {
                        temp: 72,
                        condition: 'Sunny',
                        humidity: '45%',
                        windSpeed: '10 mph',
                    },
                    forecast: [
                        { id: '1', day: 'Mon', temp: 72, condition: 'Sunny', icon: '☀️' },
                        { id: '2', day: 'Tue', temp: 70, condition: 'Partly Cloudy', icon: '⛅' },
                        { id: '3', day: 'Wed', temp: 68, condition: 'Cloudy', icon: '☁️' },
                        { id: '4', day: 'Thu', temp: 75, condition: 'Sunny', icon: '☀️' },
                        { id: '5', day: 'Fri', temp: 71, condition: 'Partly Cloudy', icon: '⛅' },
                    ],
                };
                setWeather(dummyData);
            } catch (error) {
                console.error(error);
                alert("Error fetching weather details.");
            } finally {
                setIsFetching(false);
            }
        };

        fetchWeather();
    }, [searchParams.to]);

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
                <Text style={styles.loadingText}>Please search for a destination to view weather....</Text>
            </View>
        );
    }

    const renderWeatherCard = (forecast: any) => (
        <View key={forecast.id} style={styles.weatherCard}>
            <Text style={styles.dayText}>{forecast.day}</Text>
            <Text style={styles.weatherIcon}>{forecast.icon}</Text>
            <Text style={styles.tempText}>{forecast.temp}°F</Text>
            <Text style={styles.conditionText}>{forecast.condition}</Text>
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
                    <Text style={styles.loadingText}>Fetching weather...</Text>
                </View>
            ) : (
                <ScrollView style={styles.content}>
                    {weather && (
                        <>
                            <View style={styles.currentWeather}>
                                <Text style={styles.headerText}>Current Weather</Text>
                                <Text style={styles.currentTemp}>{weather.current.temp}°F</Text>
                                <Text style={styles.currentCondition}>{weather.current.condition}</Text>
                                <View style={styles.detailsRow}>
                                    <Text style={styles.detailText}>Humidity: {weather.current.humidity}</Text>
                                    <Text style={styles.detailText}>Wind: {weather.current.windSpeed}</Text>
                                </View>
                            </View>

                            <Text style={styles.forecastHeader}>5-Day Forecast</Text>
                            <ScrollView 
                                horizontal 
                                showsHorizontalScrollIndicator={false}
                                style={styles.forecastContainer}
                            >
                                {weather.forecast.map(renderWeatherCard)}
                            </ScrollView>
                        </>
                    )}
                </ScrollView>
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
    },
    currentWeather: {
        backgroundColor: '#4CAF50',
        padding: 20,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
    },
    currentTemp: {
        fontSize: 48,
        fontWeight: 'bold',
        color: 'white',
    },
    currentCondition: {
        fontSize: 24,
        color: 'white',
        marginBottom: 10,
    },
    detailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    detailText: {
        fontSize: 16,
        color: 'white',
    },
    forecastHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 16,
        color: '#333',
    },
    forecastContainer: {
        paddingHorizontal: 16,
    },
    weatherCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginRight: 12,
        alignItems: 'center',
        width: 100,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    dayText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    weatherIcon: {
        fontSize: 32,
        marginBottom: 8,
    },
    tempText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
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
    conditionText: {
        fontSize: 12,
        color: '#666',
    },
    messageText: {
        fontSize: 16,
        textAlign: 'center',
        padding: 20,
        color: '#666',
    },
}); 