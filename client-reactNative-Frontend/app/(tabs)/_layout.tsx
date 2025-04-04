import { Tabs } from 'expo-router';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import React, { useEffect, useState } from 'react';
import { ChatBox } from '@/components/ChatBox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, TouchableOpacity } from 'react-native';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';

export default function TabLayout() {
  const [hasValidSearch, setHasValidSearch] = useState(false);

  useEffect(() => {
    const checkSearchParams = async () => {
      try {
        const storedParams = await AsyncStorage.getItem('searchParams');
        if (storedParams) {
          const params = JSON.parse(storedParams);
          setHasValidSearch(!!(params.from && params.to));
        }
      } catch (error) {
        console.error('Error checking search params:', error);
      }
    };

    // Check initially
    checkSearchParams();

    // Set up interval to check for changes
    const interval = setInterval(checkSearchParams, 1000);

    // Clean up interval
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <Tabs screenOptions={{
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: hasValidSearch ? '#999' : '#ccc',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#ddd',
          height: 60,
          paddingBottom: 5,
        },
        tabBarItemStyle: {
          paddingVertical: 5,
        },
        tabBarButton: (props: BottomTabBarButtonProps) => {
          const isHomeTab = React.isValidElement(props.children) && 
            props.children.props?.name === 'index';
          
          if (isHomeTab) {
            return <TouchableOpacity {...props} />;
          }
          
          if (!hasValidSearch) {
            return (
              <TouchableOpacity 
                {...props} 
                disabled={true} 
                style={[{ opacity: 0.5 }, props.style]} 
              />
            );
          }
          
          return <TouchableOpacity {...props} />;
        },
      }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
            headerShown: false
          }}
        />
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
          name="hotels"
          options={{
            title: 'Hotels',
            tabBarIcon: ({ color }) => <TabBarIcon name="bed" color={color} />,
          }}
        />
        <Tabs.Screen
          name="activities"
          options={{
            title: 'Activities',
            tabBarIcon: ({ color }) => <TabBarIcon name="walk" color={color} />,
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
