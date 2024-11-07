import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Button } from 'react-native';
// import { useLocalSearchParams } from 'expo-router';

// // Define TypeScript interface for hotel data structure
// interface HotelDetails {
//   name: string;
//   latitude: number;
//   longitude: number;
//   checkInDate: string;
//   checkOutDate: string;
//   price: string;
//   currency: string;
//   bedType: string;
//   adults: number;
// }

// export default function HotelListings() {
//   const [hotels, setHotels] = useState<HotelDetails[]>([]);
  
//   const searchParams = useLocalSearchParams();
//   const { location, checkInDate, checkOutDate, guests, budget } = searchParams;

//   useEffect(() => {
//     const fetchHotels = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:5000/api/searchHotels?location=${location}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&adults=${guests}&travelBudget=${budget}`
//         );

//         if (!response.ok) {
//           throw new Error('Failed to fetch hotels');
//         }

//         const data: HotelDetails[] = await response.json();
//         setHotels(data);
//       } catch (error) {
//         console.error(error);
//         alert('There was an error fetching the hotel details.');
//       }
//     };

//     fetchHotels();
//   }, [location, checkInDate, checkOutDate, guests, budget]);

//   const handleSelectHotel = (hotel: HotelDetails) => {
//     alert(`Selected hotel: ${JSON.stringify(hotel, null, 2)}`);
//   };

//   const renderHotelCard = ({ item }: { item: HotelDetails }) => (
//     <Pressable style={styles.hotelCard} onPress={() => handleSelectHotel(item)}>
//       <Text style={styles.hotelName}>{item.name}</Text>
//       <Text style={styles.priceText}>
//         {item.currency} {item.price}
//       </Text>
//       <Text>Check-in: {item.checkInDate}</Text>
//       <Text>Check-out: {item.checkOutDate}</Text>
//       <Text>Bed Type: {item.bedType}</Text>
//       <Text>Adults: {item.adults}</Text>
//       <Text style={styles.coordinates}>
//         Location: {item.latitude}, {item.longitude}
//       </Text>
//       <Button title="Select Hotel" onPress={() => handleSelectHotel(item)} />
//     </Pressable>
//   );

//   if (!hotels.length) {
//     return (
//       <View style={styles.noHotelsContainer}>
//         <Text style={styles.noHotelsText}>No hotels found.</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Available Hotels ({hotels.length})</Text>
//       <FlatList
//         data={hotels}
//         renderItem={renderHotelCard}
//         keyExtractor={(item, index) => index.toString()}
//         contentContainerStyle={styles.listContainer}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   header: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     padding: 16,
//   },
//   listContainer: {
//     padding: 16,
//   },
//   hotelCard: {
//     backgroundColor: 'white',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 16,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   hotelName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   priceText: {
//     fontSize: 16,
//     color: '#2E7D32',
//     marginBottom: 8,
//   },
//   coordinates: {
//     fontSize: 12,
//     color: '#666',
//     marginTop: 8,
//   },
//   noHotelsContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   noHotelsText: {
//     fontSize: 16,
//     color: '#666',
//   },
// });

import { useLocalSearchParams } from 'expo-router';

export default function HotelsPage() {
  const { from, to, startDate, endDate, passengers, budget, selectedFlight } = useLocalSearchParams();
  
  // You can now use this data to fetch hotels or show them on the page
  console.log("Selected Flight:", selectedFlight);
  
  // Fetch hotels or display them as needed
  return (
    <View>
      <Text>Hotels page</Text>
      <Text>From: {from}</Text>
      <Text>To: {to}</Text>
      <Text>Start Date: {startDate}</Text>
      <Text>End Date: {endDate}</Text>
      <Text>Passengers: {passengers}</Text>
      <Text>Budget: {budget}</Text>
      <Text>Selected Flight: {JSON.stringify(selectedFlight)}</Text>
    </View>
  );
};
