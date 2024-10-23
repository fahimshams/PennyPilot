import { Stack } from 'expo-router';
import React from 'react';


export default function TabLayout() {
  return (
    <Stack>
    <Stack.Screen 
      name="index" 
      options={{ 
        headerShown: true,
        title: 'PennyPilot'
      }} 
    />
    <Stack.Screen 
      name="flights" 
      options={{ 
        headerShown: true,
        title: 'Available Flights'
      }} 
    />
  </Stack>
  );
}
