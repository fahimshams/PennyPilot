import React, { ChangeEvent, useEffect, useState, useCallback } from 'react';
import { View, TextInput, Text, Button, StyleSheet, Platform, Image, TouchableOpacity, FlatList, TouchableHighlight } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { router } from 'expo-router';
import Autocomplete from 'react-native-autocomplete-input';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TravelForm = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [passengers, setPassengers] = useState('');
  const [budget, setBudget] = useState('');
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [startDateInput, setStartDateInput] = useState('');
  const [endDateInput, setEndDateInput] = useState('');
  const [slogan, setSlogan] = useState('');
  const fullSlogan = 'Flly Smart Travel Smart! Where Every Penny Plays Its Part!';
  const typingSpeed = 90; // Speed in milliseconds between each character
  const [errors, setErrors] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const isWeb = Platform.OS === 'web';

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullSlogan.length - 1) {
        setSlogan((prev) => prev + fullSlogan[index]);
        index++;
      } else {
        clearInterval(interval); // Stop when the entire slogan is typed out
      }
    }, typingSpeed);

    return () => clearInterval(interval); // Cleanup interval on unmount or re-render
  }, []);

  const handleStartDateChange = useCallback(
    (event: DateTimePickerEvent | ChangeEvent<HTMLInputElement>, selectedDate?: Date) => {
      setShowStartPicker(Platform.OS === 'ios');

      let newDate: Date | undefined;
      if (isWeb && 'target' in event) {
        newDate = event.target.value ? new Date(event.target.value) : undefined;
      } else if (!isWeb && selectedDate) {
        newDate = selectedDate;
      }

      if (newDate) {
        setStartDate(newDate);
        setStartDateInput(newDate.toISOString().split('T')[0]);
      }
    },
    [isWeb]
  );

  const handleEndDateChange = useCallback(
    (event: DateTimePickerEvent | ChangeEvent<HTMLInputElement>, selectedDate?: Date) => {
      setShowEndPicker(Platform.OS === 'ios');

      let newDate: Date | undefined;
      if (isWeb && 'target' in event) {
        newDate = event.target.value ? new Date(event.target.value) : undefined;
      } else if (!isWeb && selectedDate) {
        newDate = selectedDate;
      }

      if (newDate) {
        setEndDate(newDate);
        setEndDateInput(newDate.toISOString().split('T')[0]);
      }
    },
    [isWeb]
  );

  const handleStartInputChange = useCallback((text: string) => {
    setStartDateInput(text);
    const date = new Date(text);
    if (!isNaN(date.getTime())) {
      setStartDate(date);
    }
  }, []);

  const handleEndInputChange = useCallback((text: string) => {
    setEndDateInput(text);
    const date = new Date(text);
    if (!isNaN(date.getTime())) {
      setEndDate(date);
    }
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!from || !to || !passengers || !budget) {
      setErrors('Please fill all fields');
      return;
    }

    const searchParams = {
      from,
      to,
      startDate: startDateInput,
      endDate: endDateInput,
      passengers,
      budget
    };

    try {
      // Store the search parameters in AsyncStorage for cross-tab access
      await AsyncStorage.setItem('searchParams', JSON.stringify(searchParams));

      // Navigate to the tabs layout with the search parameters
      router.push({
        pathname: '/(tabs)/flights',
        params: searchParams
      });
    } catch (error) {
      console.error('Error saving search params:', error);
      setErrors('An error occurred while saving your search.');
    }
  }, [from, to, passengers, budget, startDateInput, endDateInput]);

  const showDatePicker = useCallback(
    (type: 'start' | 'end') => {
      if (Platform.OS === 'android') {
        if (type === 'start') {
          setShowStartPicker(true);
        } else {
          setShowEndPicker(true);
        }
      }
    },
    []
  );

  const renderDateInput = useCallback(
    (type: 'start' | 'end') => {
      const isStart = type === 'start';
      const value = isStart ? startDateInput : endDateInput;
      const minDate = isStart ? new Date().toISOString().split('T')[0] : startDateInput;

      if (isWeb) {
        return (
          <input
            type="date"
            value={value}
            min={minDate}
            onChange={isStart ? handleStartDateChange : handleEndDateChange}
            style={styles.input}
          />
        );
      }

      return (
        <>
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            value={value}
            onChangeText={isStart ? handleStartInputChange : handleEndInputChange}
            onFocus={() => showDatePicker(type)}
          />
          {((isStart && showStartPicker) || (!isStart && showEndPicker)) && (
            <DateTimePicker
              testID={`${type}DatePicker`}
              value={isStart ? startDate : endDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={isStart ? handleStartDateChange : handleEndDateChange}
              minimumDate={isStart ? new Date() : startDate}
            />
          )}
        </>
      );
    },
    [isWeb, startDateInput, endDateInput, showStartPicker, showEndPicker, handleStartDateChange, handleEndDateChange, handleStartInputChange, handleEndInputChange, showDatePicker]
  );

  const fetchSuggestions = useCallback((query: string) => {
    // Replace this with your actual API call to fetch suggestions
    const availableSuggestions = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];
    setSuggestions(availableSuggestions.filter((item) => item.toLowerCase().includes(query.toLowerCase())));
  }, []);

  const handleFromChange = useCallback((text: string) => {
    setFrom(text);
    fetchSuggestions(text);
  }, [fetchSuggestions]);

  const handleToChange = useCallback((text: string) => {
    setTo(text);
    fetchSuggestions(text);
  }, [fetchSuggestions]);

  return (
    <View style={styles.page}>
      {/* Logo at the top */}
      <Image source={require('../assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.slogan}>{slogan}</Text>

      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* Side Icons */}
        <View style={styles.icons}>
          <Image source={require('../assets/images/plane.png')} style={styles.icon} />
          <Image source={require('../assets/images/car.png')} style={styles.icon} />
          <Image source={require('../assets/images/hotel.png')} style={styles.icon} />
        </View>

        {/* Boarding Pass */}
        <View style={styles.boardingPass}>
          {/* Input Fields */}
          <View style={styles.row}>
      <View style={styles.inputWrapper}>
              <Text style={styles.label}>From</Text>
              <TextInput
                style={styles.input}
                placeholder="From where?"
                value={from}
                onChangeText={setFrom}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>To</Text>
              <TextInput
                style={styles.input}
                placeholder="To where?"
                value={to}
                onChangeText={setTo}
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Start Date</Text>
              {renderDateInput('start')}
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>End Date</Text>
              {renderDateInput('end')}
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Passengers</Text>
              <TextInput
                style={styles.input}
                placeholder="How many?"
                keyboardType="numeric"
                value={passengers}
                onChangeText={setPassengers}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Budget</Text>
              <TextInput
                style={styles.input}
                placeholder="Your budget?"
                keyboardType="numeric"
                value={budget}
                onChangeText={setBudget}
              />
            </View>
          </View>
          {errors ? <Text style={styles.errorText}>{errors}</Text> : null}
          {/* Submit Button */}
          <Button title="Let's Board!" onPress={handleSubmit} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  slogan: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 10,
    marginBottom: 50,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    fontFamily: 'monospace', // Optional: use a monospace font for a more typing-like effect
  },
  logo: {
    width: '30%',
    height: 180,
    // resizeMode: 'contain',
    marginBottom: 10,
  },
  mainContent: {
    flexDirection: 'row',
    width: '100%',
    maxWidth: 800,
  },
  icons: {
    justifyContent: 'space-between',
    marginRight: 16,
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 16,
  },
  boardingPass: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  inputWrapper: {
    flex: 1,
    marginHorizontal: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  suggestionsList: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    maxHeight: 200,
  },
  errorText: { color: 'red', fontSize: 18, marginTop: 4, marginBottom: 12, textAlign: 'center' },
});