import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  weatherForecasts?: WeatherForecast[];
  recommendations?: string;
}

interface TravelDetails {
  from: string;
  to: string;
  startDate: string;
  endDate: string;
  passengers?: number;
}

interface WeatherActivities {
  weather: {
    description: string;
    temperature: string;
    recommendation: string;
  };
  activities: string[];
}

interface WeatherForecast {
  date: string;
  highTemp: number;
  lowTemp: number;
  description: string;
  icon: string;
  iconUrl: string;
}

export const ChatBox = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const slideAnim = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);

  // Initial greeting message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: '1',
          text: "Hi! I'm your travel assistant. When and where are you planning to travel?",
          sender: 'ai',
          timestamp: new Date(),
        },
      ]);
    }
  }, []);

  const toggleExpand = () => {
    const toValue = isExpanded ? 0 : 1;
    Animated.spring(slideAnim, {
      toValue,
      useNativeDriver: true,
    }).start();
    setIsExpanded(!isExpanded);
  };

  const processMessage = async (message: string) => {
    try {
      const response = await fetch('http://localhost:5000/api/chat/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error('Failed to process message');
      }

      const data = await response.json();
      console.log('API Response:', data); // Add logging to debug
      return data;
    } catch (error) {
      console.error('Error processing message:', error);
      return null;
    }
  };

  const getWeatherAndActivities = async (location: string, dates: string[]) => {
    try {
      const response = await fetch('http://localhost:5000/api/chat/weather-activities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ location, dates }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch weather and activities');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching weather and activities:', error);
      throw error;
    }
  };

  const formatWeatherMessage = (weatherData: any, activities: string[]) => {
    return {
      text: `Here's the weather forecast for your trip:`,
      forecasts: weatherData.forecasts,
      recommendations: `
Packing Recommendations:
${weatherData.clothingRecommendations}

Recommended Activities:
${activities.map(activity => `• ${activity}`).join('\n')}
      `
    };
  };

  const handleSend = async () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    try {
      const response = await processMessage(inputText);
      // console.log('API Response2:', response);

      if (response && response.travelDetails) {
        // Store travel details in AsyncStorage
        await AsyncStorage.setItem('searchParams', JSON.stringify(response.travelDetails));

        // Construct the response message
        let messageText = `I found travel details for your trip from ${response.travelDetails.from} to ${response.travelDetails.to}.\n`;
        messageText += `Dates: ${response.travelDetails.startDate} to ${response.travelDetails.endDate}\n`;
        messageText += `Passengers: ${response.travelDetails.passengers || '1'}\n`;
        if (response.travelDetails.budget && response.travelDetails.budget !== 'Not specified') {
          messageText += `Budget: ${response.travelDetails.budget}\n`;
        }
        messageText += '\n';

         // Add weather forecast if available
        //  if (response.initialData.weather?.forecasts?.length > 0) {
        //   messageText += `Weather Forecast for ${response.travelDetails.to}:\n`;
        //   response.initialData.weather.forecasts.forEach((forecast: WeatherForecast) => {
        //     const date = new Date(forecast.date).toLocaleDateString('en-US', {
        //       weekday: 'short',
        //       month: 'short',
        //       day: 'numeric'
        //     });
        //     messageText += `${date}: ${forecast.description}, High: ${forecast.highTemp}°C, Low: ${forecast.lowTemp}°C\n`;
        //   });
          
        //   if (response.initialData.weather.averageTemperature) {
        //     messageText += `\nAverage Temperature: ${response.initialData.weather.averageTemperature}°C\n`;
        //   }
          
        //   if (response.initialData.weather.clothingRecommendations) {
        //     messageText += `\nPacking Recommendations:\n${response.initialData.weather.clothingRecommendations}\n`;
        //   }
        //   messageText += '\n';
        // }

        // Add activities
        if (response.initialData.activities?.length > 0) {
          messageText += `Here are some activities you might enjoy in ${response.travelDetails.to}:\n`;
          messageText += response.initialData.activities
            .map((activity: string, index: number) => `${index + 1}. ${activity}`)
            .join('\n');
        }

        // Add AI response
        const aiMessage: Message = {
          id: Date.now().toString(),
          text: messageText,
          sender: 'ai',
          timestamp: new Date(),
          weatherForecasts: response.initialData?.weather?.forecasts,
          recommendations: response.initialData?.weather?.clothingRecommendations
        };
        setMessages(prev => [...prev, aiMessage]);

        // If we have weather data, make a separate call to get detailed weather and activities
        if (response.travelDetails.to && response.travelDetails.startDate && response.travelDetails.endDate) {
          try {
            const weatherResponse = await getWeatherAndActivities(
              response.travelDetails.to,
              [response.travelDetails.startDate, response.travelDetails.endDate]
            );
            
            if (weatherResponse && weatherResponse.weather) {
              const weatherMessage: Message = {
                id: Date.now().toString(),
                text: `Here's the weather forecast for ${response.travelDetails.to}:`,
                sender: 'ai',
                timestamp: new Date(),
                weatherForecasts: weatherResponse.weather.forecasts,
                recommendations: weatherResponse.weather.clothingRecommendations
              };
              setMessages(prev => [...prev, weatherMessage]);
            }
          } catch (error) {
            console.error('Error fetching weather details:', error);
          }
        }
      } else {
        // Add error message if no response
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          text: "I'm sorry, I couldn't process your request. Please try again.",
          sender: 'ai',
          timestamp: new Date(),
        }]);
      }
    } catch (error) {
      console.error('Error handling message:', error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: "I'm sorry, I encountered an error processing your request.",
        sender: 'ai',
        timestamp: new Date(),
      }]);
    }
  };

  const handleKeyPress = ({ nativeEvent }: { nativeEvent: { key: string; shiftKey?: boolean } }) => {
    if (nativeEvent.key === 'Enter' && !nativeEvent.shiftKey) {
      handleSend();
    }
  };

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [400, 0],
  });

  const WeatherDay = ({ forecast }: { forecast: WeatherForecast }) => {
    const date = new Date(forecast.date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });

    return (
      <View style={styles.weatherDay}>
        <Text style={styles.weatherDate}>{date}</Text>
        <Image 
          source={{ uri: forecast.iconUrl }}
          style={styles.weatherIcon}
        />
        <Text style={styles.weatherTemp}>
          {forecast.highTemp}°C | {forecast.lowTemp}°C
        </Text>
        <Text style={styles.weatherDesc}>{forecast.description}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.chatContainer,
          {
            transform: [{ translateY }],
          },
        ]}
      >
        <View style={styles.header}>
          <Text style={styles.headerText}>AI Travel Assistant</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={toggleExpand}
          >
            <Ionicons 
              name="chevron-down" 
              size={24} 
              color="#666" 
            />
          </TouchableOpacity>
        </View>

        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd()}
        >
          {messages.map((message) => (
            <View
              key={message.id}
              style={[
                styles.messageBubble,
                message.sender === 'user'
                  ? styles.userMessage
                  : styles.aiMessage,
              ]}
            >
              <Text style={[
                styles.messageText,
                message.sender === 'user' && styles.userMessageText
              ]}>
                {message.text}
              </Text>
              
              {message.weatherForecasts && (
                <View style={styles.weatherContainer}>
                  <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    style={styles.weatherScroll}
                  >
                    {message.weatherForecasts.map((forecast, index) => (
                      <WeatherDay key={index} forecast={forecast} />
                    ))}
                  </ScrollView>
                </View>
              )}

              {message.recommendations && (
                <Text style={styles.recommendationsText}>
                  {message.recommendations}
                </Text>
              )}
            </View>
          ))}
        </ScrollView>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.inputContainer}
        >
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type your message..."
            multiline
            onKeyPress={handleKeyPress}
            blurOnSubmit={false}
          />
          <TouchableOpacity 
            style={[
              styles.sendButton,
              !inputText.trim() && styles.sendButtonDisabled
            ]} 
            onPress={handleSend}
            disabled={!inputText.trim()}
          >
            <Ionicons name="send" size={24} color="white" />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </Animated.View>

      {!isExpanded && (
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={toggleExpand}
        >
          <Ionicons 
            name="chatbubble-ellipses" 
            size={24} 
            color="white" 
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },
  toggleButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#4CAF50',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  chatContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 400,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    position: 'relative',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  messagesContainer: {
    flex: 1,
    padding: 15,
  },
  messageBubble: {
    maxWidth: '90%',
    padding: 10,
    borderRadius: 15,
    marginBottom: 10,
  },
  userMessage: {
    backgroundColor: '#4CAF50',
    alignSelf: 'flex-end',
  },
  aiMessage: {
    backgroundColor: '#f0f0f0',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  userMessageText: {
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    maxHeight: 100,
    minHeight: 40,
  },
  sendButton: {
    backgroundColor: '#4CAF50',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#ccc',
  },
  weatherContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  weatherScroll: {
    flexGrow: 0,
  },
  weatherDay: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    minWidth: 100,
  },
  weatherDate: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 5,
  },
  weatherIcon: {
    width: 50,
    height: 50,
  },
  weatherTemp: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 5,
  },
  weatherDesc: {
    fontSize: 12,
    marginTop: 5,
  },
  recommendationsText: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 20,
  },
}); 