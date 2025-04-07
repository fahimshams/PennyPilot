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

const SESSION_STORAGE_KEY = 'travel_form_data';

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
  const [selectedHotels, setSelectedHotels] = useState<HotelDetails[]>([]);

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

  useEffect(() => {
    const loadSelectedHotels = async () => {
      try {
        const sessionData = await AsyncStorage.getItem(SESSION_STORAGE_KEY);
        if (sessionData) {
          const parsedData = JSON.parse(sessionData);
          if (parsedData.hotelSelected) {
            setSelectedHotels(parsedData.hotelSelected);
          }
        }
      } catch (error) {
        console.error('Error loading selected hotels:', error);
      }
    };
    loadSelectedHotels();
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
      if (!searchParams.from || !searchParams.to) return;

      
      try {
        setIsFetching(true);
        
        // API Integration (commented out)
        /*
        const response = await fetch(`http://localhost:5000/api/accommodation?cityCode=${searchParams.to}&adults=${searchParams.passengers}&checkInDate=${searchParams.startDate}&checkOutDate=${searchParams.endDate}&budget=${searchParams.budget}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch hotels');
        }
        
        const data = await response.json();
        setHotels(data);
        */
        
        // Mock data implementation
        const mockHotels: HotelDetails[] = [
          {
            name: "Grand Hotel",
            latitude: 40.7128,
            longitude: -74.0060,
            checkInDate: searchParams.startDate,
            checkOutDate: searchParams.endDate,
            price: "200",
            currency: "USD",
            bedType: "Queen",
            adults: parseInt(searchParams.passengers) || 1
          },
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
        setHotels(mockHotels);
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

  const handleSelectHotel = async (hotel: HotelDetails) => {
    try {
      const isSelected = selectedHotels.some(h => 
        h.name === hotel.name && 
        h.price === hotel.price
      );

      let newSelectedHotels: HotelDetails[];
      if (isSelected) {
        // Remove hotel from selection
        newSelectedHotels = selectedHotels.filter(h => 
          !(h.name === hotel.name && h.price === hotel.price)
        );
      } else {
        // Add hotel to selection
        newSelectedHotels = [...selectedHotels, hotel];
      }

      setSelectedHotels(newSelectedHotels);

      // Update session storage
      const sessionData = await AsyncStorage.getItem(SESSION_STORAGE_KEY);
      const parsedData = sessionData ? JSON.parse(sessionData) : {};
      
      if (newSelectedHotels.length > 0) {
        parsedData.hotelSelected = newSelectedHotels[0]; // Store only the most recently selected hotel
      } else {
        delete parsedData.hotelSelected;
      }

      await AsyncStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(parsedData));

      // Only show alert if selecting a new hotel
      if (!isSelected) {
        Alert.alert(
          'Success',
          'Hotel added to your travel plan!',
          [
            {
              text: 'View Travel Plan',
              onPress: () => {
                router.push('/travel-plan');
              }
            }
          ]
        );
      }
    } catch (error) {
      console.error('Error handling hotel selection:', error);
      alert('Error updating hotel selection');
    }
  };

  const isHotelSelected = (hotel: HotelDetails) => {
    return selectedHotels.some(h => 
      h.name === hotel.name && 
      h.price === hotel.price
    );
  };

  const renderHotelCard = ({ item }: { item: HotelDetails }) => (
    <View style={styles.hotelCard}>
      <View style={styles.hotelHeader}>
        <Text style={styles.hotelName}>{item.name}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Price per night</Text>
          <Text style={styles.hotelPrice}>
            {item.currency} {item.price}
          </Text>
        </View>
      </View>
      
      <View style={styles.hotelInfo}>
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Check-in</Text>
            <Text style={styles.infoValue}>{item.checkInDate}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Check-out</Text>
            <Text style={styles.infoValue}>{item.checkOutDate}</Text>
          </View>
        </View>
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Room Type</Text>
            <Text style={styles.infoValue}>{item.bedType}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Capacity</Text>
            <Text style={styles.infoValue}>{item.adults} Adults</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.selectButton,
          isHotelSelected(item) && styles.selectedButton
        ]}
        onPress={() => handleSelectHotel(item)}
      >
        <Text style={[
          styles.selectButtonText,
          isHotelSelected(item) && styles.selectedButtonText
        ]}>
          {isHotelSelected(item) ? 'Selected' : 'Select Hotel'}
        </Text>
      </TouchableOpacity>
    </View>
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
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Available Hotels</Text>
        <Text style={styles.headerSubtitle}>
          {from} → {to}
        </Text>
      </View>
      {isFetching ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={styles.loadingText}>Finding the perfect hotels for you...</Text>
        </View>
      ) : (
        <FlatList
          data={hotels}
          renderItem={renderHotelCard}
          keyExtractor={(item) => item.name}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  headerContainer: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2d3436",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#636e72",
  },
  listContainer: {
    padding: 16,
  },
  hotelCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  hotelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  hotelName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2d3436",
    flex: 1,
    marginRight: 16,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  priceLabel: {
    fontSize: 12,
    color: "#636e72",
    marginBottom: 4,
  },
  hotelPrice: {
    fontSize: 20,
    color: "#2ecc71",
    fontWeight: 'bold',
  },
  hotelInfo: {
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: "#636e72",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    color: "#2d3436",
    fontWeight: '500',
  },
  selectButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#95a5a6',
  },
  selectButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedButtonText: {
    color: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    fontSize: 16,
    color: "#636e72",
    marginTop: 12,
    textAlign: 'center',
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
