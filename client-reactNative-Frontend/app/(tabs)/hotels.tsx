import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Button,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

interface HotelDetails {
  name: string;
  latitude: number;
  longitude: number;
  checkInDate: string;
  checkOutDate: string;
  price: string;
  currency: string;
  bedType: string;
  adults: number;
}

const HotelListings = () => {
  const { from, to, startDate, endDate, passengers, budget } =
    useLocalSearchParams();
  const [hotels, setHotels] = useState<HotelDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();

  // Dummy Data (replace with API data when needed)
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true);
        // Replace this with API logic when ready
        const dummyData: HotelDetails[] = [
          {
            name: "Best Western Plus Arena Hotel",
            latitude: 40.67837,
            longitude: -73.94654,
            checkInDate: "2025-01-09",
            checkOutDate: "2025-01-12",
            price: "881.33",
            currency: "USD",
            bedType: "KING",
            adults: 2
          },
          {
            name: "Fairfield Inn by Marriott New York JFK Airport",
            latitude: 40.66632,
            longitude: -73.77945,
            checkInDate: "2025-01-09",
            checkOutDate: "2025-01-12",
            price: "750.63",
            currency: "USD",
            bedType: "KING",
            adults: 2
          },
          {
            name: "HILTON GARDEN INN QUEENS JFK AR",
            latitude: 40.66529,
            longitude: -73.80603,
            checkInDate: "2025-01-09",
            checkOutDate: "2025-01-12",
            price: "903.30",
            currency: "USD",
            bedType: "KING",
            adults: 2
          },
          {
            name: "HILTON GARDEN INN MELVILLE",
            latitude: 40.78224,
            longitude: -73.44408,
            checkInDate: "2025-01-09",
            checkOutDate: "2025-01-12",
            price: "533.97",
            currency: "USD",
            bedType: "KING",
            adults: 2
          },
          {
            name: "HILTON GARDEN INN WESTBURY",
            latitude: 40.74575,
            longitude: -73.58796,
            checkInDate: "2025-01-09",
            checkOutDate: "2025-01-12",
            price: "668.36",
            currency: "USD",
            bedType: "KING",
            adults: 2
          }
        ];
        setHotels(dummyData);
      } catch (error) {
        console.error(error);
        alert("Error fetching hotel details.");
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  const handleSelectHotel = (hotel: HotelDetails) => {
    // Navigate to detailed hotel view (if required)
    // router.push({
    //   pathname: "/hotel-details",
    //   params: { ...hotel },
    // });
  };

  const renderHotelCard = ({ item }: { item: HotelDetails }) => (
    <Pressable style={styles.hotelCard} onPress={() => handleSelectHotel(item)}>
      <Text style={styles.hotelName}>{item.name}</Text>
      <Text style={styles.priceText}>
        {item.currency} {item.price}
      </Text>
      <Text>Check-in: {item.checkInDate}</Text>
      <Text>Check-out: {item.checkOutDate}</Text>
      <Text>Bed Type: {item.bedType}</Text>
      <Text>Adults: {item.adults}</Text>
      <TouchableOpacity
        style={styles.selectButton}
        onPress={() => handleSelectHotel(item)}
      >
        <Text style={styles.selectButtonText}>Select Hotel</Text>
      </TouchableOpacity>
    </Pressable>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={styles.loadingText}>Fetching hotels...</Text>
      </View>
    );
  }

  if (!hotels.length) {
    return (
      <View style={styles.noHotelsContainer}>
        <Text style={styles.noHotelsText}>No hotels found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Hotels for your trip from {from} to {to}
      </Text>
      <FlatList
        data={hotels}
        renderItem={renderHotelCard}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 16,
    textAlign: "center",
    backgroundColor: "#4CAF50",
    color: "white",
  },
  listContainer: {
    padding: 16,
  },
  hotelCard: {
    backgroundColor: "white",
    borderRadius: 10,
    width: 820,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  hotelName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  priceText: {
    fontSize: 16,
    color: "#2E7D32",
    marginBottom: 8,
    fontWeight: 'bold'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    marginTop: 10,
  },
  noHotelsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noHotelsText: {
    fontSize: 16,
    color: "#666",
  },
  selectButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  selectButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignSelf: 'flex-end',
    marginTop: 12,
  },
});

export default HotelListings;




// export default function HotelsPage() {
//   const { from, to, startDate, endDate, passengers, budget, selectedFlight } = useLocalSearchParams();
//   const [hotels, setHotels] = useState<HotelDetails[]>([]);

//   useEffect(() => {
//     const fetchHotels = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:5000/api/accommodation?checkInDate=${startDate}&checkOutDate=${endDate}&adults=${passengers}&cityCode=${to}&budget=${budget}`
//         );

//         if (!response.ok) {
//           throw new Error('Failed to fetch hotels');
//         }

//         console.log(response.json())

//         // const data: HotelDetails[] = await response.json();
//         // setHotels(data);
//       } catch (error) {
//         console.error(error);
//         alert('There was an error fetching the hotel details.');
//       }
//     };

//     fetchHotels();
//   }, [to, startDate, endDate, passengers, budget]);
  
//   // You can now use this data to fetch hotels or show them on the page
  
//   // Fetch hotels or display them as needed
//   return (
//     <View>
//       <Text>Hotels page</Text>
//       <Text>From: {from}</Text>
//       <Text>To: {to}</Text>
//       <Text>Start Date: {startDate}</Text>
//       <Text>End Date: {endDate}</Text>
//       <Text>Passengers: {passengers}</Text>
//       <Text>Budget: {budget}</Text>
//       <Text>Selected Flight: {JSON.stringify(selectedFlight)}</Text>
//     </View>
//   );
// };
