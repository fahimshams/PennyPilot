import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { useGlobalSearchParams, useRouter } from 'expo-router';
import TopBar from '../../components/TopBarComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTravelSession } from '../../context/TravelSessionContext';

interface PrivateCarDetails {
  // Basic Information
  id: string;
  provider: string;
  model: string;
  engineType: string;
  vin: string;
  
  // Pricing Information
  price: {
    total: string;
    base: string;
    currency: string;
    breakdown: {
      baseRate: string;
      fuelCost: string;
      maintenanceCost: string;
      insuranceCost: string;
      driverCost: string;
      refreshmentsCost: string;
    };
  };
  
  // Vehicle Details
  vehicle: {
    passengerCapacity: number;
    baggageCapacity: string;
    features: string[];
    transmission: string;
    fuelType: string;
    year: number;
    performance: {
      power: string;
      torque: string;
      acceleration: string;
    };
  };
  
  // Availability Information
  availability: {
    status: string;
    instantBookingAvailable: boolean;
  };
}

export default function PrivateCars() {
  const router = useRouter();
  const { session, addPrivateCar, updateTravelDates, updateLocations } = useTravelSession();
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    startDate: '',
    endDate: '',
    passengers: '',
    budget: ''
  });
  const [carSearchParams, setCarSearchParams] = useState({
    model: '',
    engineType: '',
    vin: '',
    travelBudget: ''
  });
  const [privateCars, setPrivateCars] = useState<PrivateCarDetails[]>([]);
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

  const handleCarSearch = async () => {
    if (!carSearchParams.travelBudget) {
      Alert.alert('Error', 'Please enter a travel budget');
      return;
    }

    if (!carSearchParams.vin && (!carSearchParams.model || !carSearchParams.engineType)) {
      Alert.alert('Error', 'Please enter either VIN or both model and engine type');
      return;
    }

    setIsFetching(true);
    try {
      const queryParams = new URLSearchParams();
      if (carSearchParams.model) queryParams.append('model', carSearchParams.model);
      if (carSearchParams.engineType) queryParams.append('engineType', carSearchParams.engineType);
      if (carSearchParams.vin) queryParams.append('vin', carSearchParams.vin);
      queryParams.append('travelBudget', carSearchParams.travelBudget);

      const response = await fetch(`http://localhost:5000/api/searchPrivateCars?${queryParams}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch cars');
      }

      setPrivateCars(data);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to fetch cars');
    } finally {
      setIsFetching(false);
    }
  };

  const handleCarSelect = (car: PrivateCarDetails) => {
    const selectedCar = {
      id: car.id,
      model: car.model,
      provider: car.provider,
      price: car.price.total,
      engineType: car.engineType,
      features: car.vehicle.features
    };
    
    addPrivateCar(selectedCar);
    Alert.alert(
      'Success',
      'Car added to your travel plan!',
      [
        {
          text: 'Continue to Hotels',
          onPress: () => {
            router.push('/hotels');
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

  const renderCarCard = ({ item }: { item: PrivateCarDetails }) => (
    <View style={styles.carCard}>
      <View style={styles.cardHeader}>
        <View style={styles.carInfo}>
          <Text style={styles.carName}>{item.model}</Text>
          <Text style={styles.carType}>{item.engineType}</Text>
          <View style={styles.providerBadge}>
            <Text style={styles.providerText}>{item.provider}</Text>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Total Price</Text>
          <Text style={styles.price}>{item.price.currency} {item.price.total}</Text>
        </View>
      </View>
      
      <View style={styles.availabilityBadge}>
        <Text style={styles.availabilityText}>
          {item.availability.instantBookingAvailable ? '✓ Instant Booking Available' : '⏳ Booking Required'}
        </Text>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Vehicle Details</Text>
        <View style={styles.detailsGrid}>
          <View style={styles.detailItem}>
            <Text style={styles.detailIcon}>👥</Text>
            <Text style={styles.detailValue}>{item.vehicle.passengerCapacity} Passengers</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailIcon}>🧳</Text>
            <Text style={styles.detailValue}>{item.vehicle.baggageCapacity}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailIcon}>⚙️</Text>
            <Text style={styles.detailValue}>{item.vehicle.transmission}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailIcon}>⛽</Text>
            <Text style={styles.detailValue}>{item.vehicle.fuelType}</Text>
          </View>
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Performance</Text>
        <View style={styles.detailsGrid}>
          <View style={styles.detailItem}>
            <Text style={styles.detailIcon}>⚡</Text>
            <Text style={styles.detailValue}>{item.vehicle.performance.power}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailIcon}>🔧</Text>
            <Text style={styles.detailValue}>{item.vehicle.performance.torque}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailIcon}>🏎️</Text>
            <Text style={styles.detailValue}>{item.vehicle.performance.acceleration}</Text>
          </View>
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Features</Text>
        <View style={styles.featuresGrid}>
          {item.vehicle.features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Text style={styles.featureIcon}>•</Text>
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>
      </View>

      <TouchableOpacity 
        style={[
          styles.selectButton,
          !item.availability.instantBookingAvailable && styles.selectButtonDisabled
        ]}
        disabled={!item.availability.instantBookingAvailable}
        onPress={() => handleCarSelect(item)}
      >
        <Text style={styles.selectButtonText}>
          {item.availability.instantBookingAvailable ? 'Add to Travel Plan' : 'Not Available'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const handleBookPrivateCar = (car: PrivateCarDetails) => {
    console.log('Booking private car:', car);
    // Add navigation or other logic here
  };

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
        <Text style={styles.loadingText}>Please search for a destination to view private cars....</Text>
      </View>
    );
  }

  const renderPrivateCarCard = ({ item }: { item: PrivateCarDetails }) => (
    <View style={styles.carCard}>
      <Text style={styles.carName}>{item.name}</Text>
      <Text style={styles.carDetails}>Type: {item.type}</Text>
      <Text style={styles.carDetails}>Passengers: {item.passengers}</Text>
      <Text style={styles.carDetails}>Driver: {item.driver}</Text>
      <Text style={styles.carDetails}>Rating: {item.rating}★</Text>
      <Text style={styles.price}>${item.price.total}</Text>
      <View style={styles.featuresContainer}>
        {(item.features || []).map((feature: string, index: number) => (
          <Text key={index} style={styles.feature}>{feature}</Text>
        ))}
      </View>
      <TouchableOpacity
        style={styles.bookButton}
        onPress={() => handleBookPrivateCar(item)}
      >
        <Text style={styles.bookButtonText}>Book Private Car</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TopBar 
        from={searchParams.from}
        to={searchParams.to}
        startDate={searchParams.startDate}
        endDate={searchParams.endDate}
        passengers={searchParams.passengers}
        budget={searchParams.budget}
        onChange={handleSearchParamsChange}
      />
      <View style={styles.contentContainer}>
        <View style={styles.searchFormContainer}>
          <Text style={styles.formTitle}>Search Private Cars</Text>
          <ScrollView style={styles.searchForm}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Model</Text>
              <TextInput
                style={styles.input}
                value={carSearchParams.model}
                onChangeText={(text) => setCarSearchParams({ ...carSearchParams, model: text })}
                placeholder="e.g., Mercedes-Benz S-Class"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Engine Type</Text>
              <TextInput
                style={styles.input}
                value={carSearchParams.engineType}
                onChangeText={(text) => setCarSearchParams({ ...carSearchParams, engineType: text })}
                placeholder="e.g., V8 Hybrid"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>VIN (Optional)</Text>
              <TextInput
                style={styles.input}
                value={carSearchParams.vin}
                onChangeText={(text) => setCarSearchParams({ ...carSearchParams, vin: text })}
                placeholder="Enter VIN number"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Travel Budget ($)</Text>
              <TextInput
                style={styles.input}
                value={carSearchParams.travelBudget}
                onChangeText={(text) => setCarSearchParams({ ...carSearchParams, travelBudget: text })}
                placeholder="Enter your budget"
                keyboardType="numeric"
              />
            </View>

            <TouchableOpacity
              style={styles.searchButton}
              onPress={handleCarSearch}
              disabled={isFetching}
            >
              {isFetching ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.searchButtonText}>Search Cars</Text>
              )}
            </TouchableOpacity>
          </ScrollView>
        </View>

        <View style={styles.resultsContainer}>
          {isFetching ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#0000ff" />
              <Text style={styles.loadingText}>Fetching private cars...</Text>
            </View>
          ) : (
            <FlatList
              data={privateCars}
              renderItem={renderCarCard}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.listContainer}
            />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  searchFormContainer: {
    width: '40%',
    backgroundColor: '#fff',
    borderRightWidth: 1,
    borderRightColor: '#e0e0e0',
  },
  searchForm: {
    padding: 16,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultsContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  listContainer: {
    padding: 16,
  },
  carCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  carInfo: {
    flex: 1,
  },
  carName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  carType: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  providerBadge: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  providerText: {
    fontSize: 12,
    color: '#1976d2',
    fontWeight: '500',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  priceLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  availabilityBadge: {
    backgroundColor: '#f5f5f5',
    padding: 8,
    borderRadius: 6,
    marginBottom: 12,
  },
  availabilityText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  sectionContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 8,
    borderRadius: 6,
    minWidth: '45%',
  },
  detailIcon: {
    marginRight: 8,
    fontSize: 16,
  },
  detailValue: {
    fontSize: 14,
    color: '#666',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 8,
    borderRadius: 6,
  },
  featureIcon: {
    marginRight: 8,
    fontSize: 16,
  },
  featureText: {
    fontSize: 14,
    color: '#666',
  },
  selectButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectButtonDisabled: {
    backgroundColor: '#ccc',
  },
  selectButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
   
    content: {
        flex: 1,
        padding: 16,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333',
    },
    messageText: {
        fontSize: 16,
        textAlign: 'center',
        padding: 20,
        color: '#666',
    },
    
    carDetails: {
        fontSize: 14,
        color: '#666',
    },
   
    featuresContainer: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    feature: {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: 4,
        borderRadius: 4,
        marginRight: 4,
    },
    bookButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        overflow: 'hidden',
        alignSelf: 'center',
    },
    bookButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
   
}); 