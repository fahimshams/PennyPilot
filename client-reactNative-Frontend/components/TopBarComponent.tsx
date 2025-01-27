import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

interface TopBarProps {
  from: string;
  to: string;
  startDate: string;
  endDate: string;
  budget: string;
  passengers: string;
  onChange: (field: string, value: string) => void; // Handle input change
}

const TopBar: React.FC<TopBarProps> = ({ from, to, startDate, endDate, budget, passengers, onChange }) => {
  return (
    <View style={styles.topBar}>
      <View style={styles.infoRow}>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>From:</Text>
          <TextInput
            style={styles.input}
            value={from}
            onChangeText={(text) => onChange('from', text)}
          />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>To:</Text>
          <TextInput
            style={styles.input}
            value={to}
            onChangeText={(text) => onChange('to', text)}
          />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>From Date:</Text>
          <TextInput
            style={styles.input}
            value={startDate}
            onChangeText={(text) => onChange('startDate', text)}
          />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>To Date:</Text>
          <TextInput
            style={styles.input}
            value={endDate}
            onChangeText={(text) => onChange('endDate', text)}
          />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Budget:</Text>
          <TextInput
            style={styles.input}
            value={budget}
            onChangeText={(text) => onChange('budget', text)}
          />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Passengers:</Text>
          <TextInput
            style={styles.input}
            value={passengers}
            onChangeText={(text) => onChange('passengers', text)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    backgroundColor: '#4CAF50',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    flexWrap: 'wrap', // Ensures fields wrap to next line if needed on smaller screens
    justifyContent: 'space-between',
  },
  infoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Wraps the input fields to new lines if space is insufficient
    width: '100%', // Ensures it uses the full width
  },
  infoContainer: {
    flexDirection: 'column',
    flex: 1, // Makes each input container share equal space
    marginRight: 10,
    marginBottom: 8, // Spacing between fields
  },
  label: {
    color: '#fff',
    fontSize: 12,
    marginBottom: 4,
  },
  input: {
    height: 40,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    color: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
});

export default TopBar;
