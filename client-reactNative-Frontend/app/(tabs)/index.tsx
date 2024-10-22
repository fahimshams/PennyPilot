import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { TravelForm } from '@/components/TravelForm'; // Import the TravelForm component

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Welcome to PennyPilot!</ThemedText>
          <HelloWave />
        </ThemedView>
      </View>

      {/* Add the TravelForm below the introductory content */}
      <ThemedView style={styles.formContainer}>
       
        <TravelForm />
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  formContainer: {
    padding: 16,
  },
});
