import React, { ChangeEvent, useEffect, useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet, Platform, Image, TouchableOpacity } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { router } from 'expo-router';

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
  const fullSlogan = 'Flly Smart Travel Smart! Where Every Penny Plays Its Part!'; // Your slogan text
  const typingSpeed = 90; // Speed in milliseconds between each character
  const [errors, setErrors] = useState('');

  const isWeb = Platform.OS === 'web';

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullSlogan.length-1) {
        setSlogan((prev) => prev + fullSlogan[index]);
        index++;
      } else {
        clearInterval(interval); // Stop when the entire slogan is typed out
      }
    }, typingSpeed);

    return () => clearInterval(interval); // Cleanup interval on unmount or re-render
  }, []);

  const handleStartDateChange = (
    event: DateTimePickerEvent | ChangeEvent<HTMLInputElement>,
    selectedDate?: Date
  ) => {
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
  };

  const handleEndDateChange = (
    event: DateTimePickerEvent | ChangeEvent<HTMLInputElement>,
    selectedDate?: Date
  ) => {
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
  };

  const handleStartInputChange = (text: string) => {
    setStartDateInput(text);
    const date = new Date(text);
    if (!isNaN(date.getTime())) {
      setStartDate(date);
    }
  };

  const handleEndInputChange = (text: string) => {
    setEndDateInput(text);
    const date = new Date(text);
    if (!isNaN(date.getTime())) {
      setEndDate(date);
    }
  };

  const handleSubmit = () => {
    if (!from || !to || !passengers || !budget) {
     setErrors("Please fill all fields");
      return;
    }

    // if (endDate < startDate) {
    //   alert('End date cannot be before start date');
    //   return;
    // }

    const flightBudget = parseFloat(budget) * 0.3;

    router.push({
      pathname: "/flights",
      params: {from: from, to: to, startDate: startDateInput, endDate: endDateInput, passengers: passengers, budget: flightBudget }
    
     });
  };

  const showDatePicker = (type: 'start' | 'end') => {
    if (Platform.OS === 'android') {
      if (type === 'start') {
        setShowStartPicker(true);
      } else {
        setShowEndPicker(true);
      }
    }
  };

  
  const renderDateInput = (type: 'start' | 'end') => {
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
  };

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
    fontSize: 18, // Adjust the size as necessary
    fontWeight: '300',
    color: '#000',
    marginTop: 10,
    marginBottom: 50,
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
  errorText: { color: 'red', fontSize: 18, marginTop: 4, marginBottom: 12, textAlign: 'center'}
});
