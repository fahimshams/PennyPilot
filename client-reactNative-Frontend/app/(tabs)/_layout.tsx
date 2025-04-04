import { Tabs } from 'expo-router';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import React from 'react';
import { ChatBox } from '@/components/ChatBox';

export default function TabLayout() {
  return (
    <>
      <Tabs screenOptions={{
        tabBarActiveTintColor: '#4CAF50',
      }}>
        <Tabs.Screen
          name="flights"
          options={{
            title: 'Flights',
            tabBarIcon: ({ color }) => <TabBarIcon name="airplane" color={color} />,
          }}
        />
        <Tabs.Screen
          name="rental-cars"
          options={{
            title: 'Rental Cars',
            tabBarIcon: ({ color }) => <TabBarIcon name="car" color={color} />,
          }}
        />
        <Tabs.Screen
          name="private-cars"
          options={{
            title: 'Private Cars',
            tabBarIcon: ({ color }) => <TabBarIcon name="car-sport" color={color} />,
          }}
        />
        <Tabs.Screen
          name="weather"
          options={{
            title: 'Weather',
            tabBarIcon: ({ color }) => <TabBarIcon name="cloudy" color={color} />,
          }}
        />
      </Tabs>
      <ChatBox />
    </>
  );
}
