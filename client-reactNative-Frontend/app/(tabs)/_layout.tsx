import { Stack } from 'expo-router';
import React from 'react';


export default function TabLayout() {
  return (
    <Stack>
    <Stack.Screen 
      name="index" 
      options={{ 
        headerShown: false,
        title: 'PennyPilot'
      }} 
    />
    <Stack.Screen 
      name="flights" 
      options={{ 
        headerShown: true,
        title: 'Available Flights | Rental Cars | Private Cars'
      }} 
    />
      <Stack.Screen 
      name="hotels" 
      options={{ 
        headerShown: true,
        title: 'Available Hotels'
      }} 
    />
  </Stack>
  );
}
