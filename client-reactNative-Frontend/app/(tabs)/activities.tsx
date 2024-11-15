import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Button, Image, Linking } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

// Define TypeScript interfaces for the activity data structure
interface Activity {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  geoCode: {
    latitude: number;
    longitude: number;
  };
  price: {
    amount: string;
    currencyCode: string;
  };
  pictures: string[];
  bookingLink: string;
  minimumDuration: string;
}

export default function ActivitiesListings() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [expandedActivityIndex, setExpandedActivityIndex] = useState<number | null>(null);

  const searchParams = useLocalSearchParams();
  const { from, to, startDate, endDate, passengers, budget } = searchParams;

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/activities?latitude=40.69159&longitude=-73.98466`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch activities');
        }

        const data: Activity[] = await response.json();
        setActivities(data);
      } catch (error) {
        console.error(error);
        alert('There was an error fetching the activity details.');
      }
    };

    fetchActivities();
  }, [from, to, startDate, endDate, budget]);

  const handleExpandToggle = (index: number) => {
    setExpandedActivityIndex(expandedActivityIndex === index ? null : index);
  };

  const handleSelectActivity = (activity: Activity) => {
    console.log(activity);
    alert(`Selected activity: ${JSON.stringify(activity, null, 2)}`);

    // Navigate to booking link or any further action
    Linking.openURL(activity.bookingLink);
  };

  const renderActivityCard = ({ item, index }: { item: Activity; index: number }) => (
    <Pressable style={styles.activityCard} onPress={() => handleExpandToggle(index)}>
      <View style={styles.priceRow}>
        <Text style={styles.priceText}>
          {item.price.amount} {item.price.currencyCode}
        </Text>
      </View>

      {/* Activity details */}
      <Text style={styles.activityTitle}>{item.name}</Text>
      <Text>{item.shortDescription}</Text>

      {/* Show extended details if expanded */}
      {expandedActivityIndex === index && (
        <>
          <Text style={styles.sectionTitle}>Description:</Text>
          <Text>{item.description}</Text>
          <Text style={styles.sectionTitle}>Location:</Text>
          <Text>Latitude: {item.geoCode.latitude}, Longitude: {item.geoCode.longitude}</Text>

          {item.pictures.length > 0 && (
            <Image source={{ uri: item.pictures[0] }} style={styles.activityImage} />
          )}

          <Button title="Book Now" onPress={() => handleSelectActivity(item)} />
        </>
      )}
    </Pressable>
  );

  if (!activities.length) {
    return (
      <View style={styles.noActivitiesContainer}>
        <Text style={styles.noActivitiesText}>No activities found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Available Activities ({activities.length})</Text>
      <FlatList
        data={activities}
        renderItem={renderActivityCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 16,
  },
  listContainer: {
    padding: 16,
  },
  activityCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
  },
  activityImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 10,
  },
  noActivitiesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noActivitiesText: {
    fontSize: 16,
    color: '#666',
  },
});
