import React, { useState, ChangeEvent } from 'react';
import { View, TextInput, Text, Button, StyleSheet, Platform } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

export const TravelForm = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [passengers, setPassengers] = useState('');
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [startDateInput, setStartDateInput] = useState('');
  const [endDateInput, setEndDateInput] = useState('');

  const isWeb = Platform.OS === 'web';

  // Initialize date inputs with current dates
  React.useEffect(() => {
    setStartDateInput(startDate.toISOString().split('T')[0]);
    setEndDateInput(endDate.toISOString().split('T')[0]);
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
    // Validate inputs before submitting
    if (!from || !to || !startDateInput || !endDateInput || !passengers) {
      alert('Please fill in all fields');
      return;
    }

    if (endDate < startDate) {
      alert('End date cannot be before start date');
      return;
    }

    console.log({
      from,
      to,
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      passengers: parseInt(passengers, 10),
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
    <View style={styles.container}>
      <Text style={styles.label}>From</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter starting location"
        value={from}
        onChangeText={setFrom}
      />

      <Text style={styles.label}>To</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter destination"
        value={to}
        onChangeText={setTo}
      />

      <Text style={styles.label}>Start Date</Text>
      {renderDateInput('start')}

      <Text style={styles.label}>End Date</Text>
      {renderDateInput('end')}

      <Text style={styles.label}>Number of Passengers</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter number of passengers"
        keyboardType="numeric"
        value={passengers}
        onChangeText={setPassengers}
      />

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    maxWidth: 500,
    width: '100%',
    alignSelf: 'center',
  },
  label: {
    marginBottom: 4,
    fontSize: 16,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
    backgroundColor: '#fff',


  },
});
