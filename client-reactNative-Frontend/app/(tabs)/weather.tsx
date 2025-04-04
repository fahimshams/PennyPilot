import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useGlobalSearchParams } from 'expo-router';

interface WeatherForecast {
  date: string;
  highTemp: number;
  lowTemp: number;
  description: string;
  icon: string;
  iconUrl: string;
}

interface WeatherResponse {
  weather: {
    forecasts: WeatherForecast[];
    averageTemperature: number;
    clothingRecommendations: string;
  };
}

export default function WeatherScreen() {
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Use global search params to access the parameters from any tab
  const params = useGlobalSearchParams();
  const { to: destination, startDate, endDate } = params;

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!destination || !startDate || !endDate) {
        setError('Please search for a destination first');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/chat/weather-activities', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            location: destination,
            dates: [startDate, endDate],
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }

        const data = await response.json();
        setWeatherData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [destination, startDate, endDate]);

  if (!destination || !startDate || !endDate) {
    return (
      <View style={styles.container}>
        <Text style={styles.messageText}>Please search for a destination to view weather forecast.</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.messageText}>Loading weather forecast...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  if (!weatherData) {
    return (
      <View style={styles.container}>
        <Text style={styles.messageText}>No weather data available</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Weather Forecast for {destination}</Text>
        <Text style={styles.subtitle}>
          Average Temperature: {weatherData.weather.averageTemperature}°C
        </Text>
      </View>

      <View style={styles.forecastContainer}>
        {weatherData.weather.forecasts.map((forecast, index) => (
          <View key={index} style={styles.forecastCard}>
            <Text style={styles.date}>
              {new Date(forecast.date).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
              })}
            </Text>
            <Image
              source={{ uri: forecast.iconUrl }}
              style={styles.weatherIcon}
            />
            <Text style={styles.temperature}>
              {forecast.highTemp}°C | {forecast.lowTemp}°C
            </Text>
            <Text style={styles.description}>{forecast.description}</Text>
          </View>
        ))}
      </View>

      <View style={styles.recommendationsContainer}>
        <Text style={styles.recommendationsTitle}>Packing Recommendations</Text>
        <Text style={styles.recommendationsText}>
          {weatherData.weather.clothingRecommendations}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#4CAF50',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
  },
  forecastContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10,
  },
  forecastCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    margin: 5,
    width: '45%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  date: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  weatherIcon: {
    width: 50,
    height: 50,
    marginVertical: 8,
  },
  temperature: {
    fontSize: 18,
    fontWeight: '500',
    marginVertical: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  recommendationsContainer: {
    backgroundColor: 'white',
    margin: 10,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  recommendationsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  recommendationsText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    padding: 20,
  },
  messageText: {
    fontSize: 16,
    textAlign: 'center',
    padding: 20,
    color: '#666',
  },
}); 