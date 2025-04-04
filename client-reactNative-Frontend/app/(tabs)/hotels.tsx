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
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import TopBar from '../../components/TopBarComponent';
import { useTravelSession } from '../../context/TravelSessionContext';

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
  const router = useRouter();
  const { session, addHotel, updateTravelDates, updateLocations } = useTravelSession();
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    startDate: '',
    endDate: '',
    passengers: '',
    budget: ''
  });
  const [hotels, setHotels] = useState<HotelDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const loadSearchParams = async () => {
      try {
        const storedParams = await AsyncStorage.getItem('searchParams');
        if (storedParams) {
          const params = JSON.parse(storedParams);
          setSearchParams(params);
          // Update travel session with locations and dates
          updateLocations({ from: params.from, to: params.to });
          updateTravelDates({ startDate: params.startDate, endDate: params.endDate });
        }
      } catch (error) {
        console.error('Error loading search params:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadSearchParams();
  }, []);

  const handleSearchParamsChange = async (field: string, value: string) => {
    const newParams = { ...searchParams, [field]: value };
    setSearchParams(newParams);
    try {
      await AsyncStorage.setItem('searchParams', JSON.stringify(newParams));
      // Update travel session when locations or dates change
      if (field === 'from' || field === 'to') {
        updateLocations({ from: newParams.from, to: newParams.to });
      }
      if (field === 'startDate' || field === 'endDate') {
        updateTravelDates({ startDate: newParams.startDate, endDate: newParams.endDate });
      }
    } catch (error) {
      console.error('Error saving search params:', error);
    }
  };
  
  useEffect(() => {
    const fetchHotels = async () => {
      if (!searchParams.to) return;
      
      try {
        setIsFetching(true);
        // Replace this with API logic when ready
        const dummyData: HotelDetails[] = [
          {
            name: "Best Western " + searchParams.to,
            latitude: 40.7128,
            longitude: -74.0060,
            checkInDate: searchParams.startDate,
            checkOutDate: searchParams.endDate,
            price: "250",
            currency: "USD",
            bedType: "King",
            adults: parseInt(searchParams.passengers) || 2
          },
          {
            name: "Fairfield Inn by Marriott " + searchParams.to,
            latitude: 40.7128,
            longitude: -74.0060,
            checkInDate: searchParams.startDate,
            checkOutDate: searchParams.endDate,
            price: "300",
            currency: "USD",
            bedType: "King",
            adults: parseInt(searchParams.passengers) || 2
          },
          {
            name: "Luxury Inn " + searchParams.to,
            latitude: 40.7128,
            longitude: -74.0060,
            checkInDate: searchParams.startDate,
            checkOutDate: searchParams.endDate,
            price: "350",
            currency: "USD",
            bedType: "Queen",
            adults: parseInt(searchParams.passengers) || 2
          },
          {
            name: "City View Hotel " + searchParams.to,
            latitude: 40.7128,
            longitude: -74.0060,
            checkInDate: searchParams.startDate,
            checkOutDate: searchParams.endDate,
            price: "200",
            currency: "USD",
            bedType: "Double",
            adults: parseInt(searchParams.passengers) || 2
          },
          {
            name: "Riverside Inn " + searchParams.to,
            latitude: 40.7128,
            longitude: -74.0060,
            checkInDate: searchParams.startDate,
            checkOutDate: searchParams.endDate,
            price: "180",
            currency: "USD",
            bedType: "Twin",
            adults: parseInt(searchParams.passengers) || 2
          },
          {
            name: "Harbor View Hotel " + searchParams.to,
            latitude: 40.7128,
            longitude: -74.0060,
            checkInDate: searchParams.startDate,
            checkOutDate: searchParams.endDate,
            price: "275",
            currency: "USD",
            bedType: "Queen",
            adults: parseInt(searchParams.passengers) || 2
          }
        ];
        setHotels(dummyData);
      } catch (error) {
        console.error(error);
        alert("Error fetching hotel details.");
      } finally {
        setIsFetching(false);
      }
    };

    fetchHotels();
  }, [searchParams.to, searchParams.startDate, searchParams.endDate, searchParams.passengers]);

  const { from, to, startDate, endDate, passengers, budget } = searchParams;
  const hasValidSearch = from && to && from !== 'undefined' && to !== 'undefined';

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (!hasValidSearch) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Please search for a destination to view hotels....</Text>
      </View>
    );
  }

  const handleSelectHotel = (hotel: HotelDetails) => {
    const selectedHotel = {
      id: hotel.name.toLowerCase().replace(/\s+/g, '-'),
      name: hotel.name,
      location: to,
      checkIn: hotel.checkInDate,
      checkOut: hotel.checkOutDate,
      price: hotel.price,
      roomType: hotel.bedType
    };

    router.push({
      pathname: "/activities",
      params: { from: searchParams.from, to: searchParams.to, startDate: searchParams.startDate, endDate: searchParams.endDate, passengers: searchParams.passengers, budget: searchParams.budget },
    });
    
    addHotel(selectedHotel);
    Alert.alert(
      'Success',
      'Hotel added to your travel plan!',
      [
        {
          text: 'Continue to Activities',
          onPress: () => {
            router.push('/activities');
          }
        },
        {
          text: 'View Travel Plan',
          onPress: () => {
            router.push('/travel-plan');
          }
        }
      ]
    );
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

  return (
    <View style={styles.container}>
      <TopBar 
        from={from}
        to={to}
        startDate={startDate}
        endDate={endDate}
        passengers={passengers}
        budget={budget}
        onChange={handleSearchParamsChange}
      />
      <Text style={styles.header}>
        Hotels for your trip from {from} to {to}
      </Text>
      {isFetching ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Fetching hotels...</Text>
        </View>
      ) : (
        <FlatList
          data={hotels}
          renderItem={renderHotelCard}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContainer}
        />
      )}
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
  messageText: {
    fontSize: 16,
    textAlign: 'center',
    padding: 20,
    color: '#666',
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
