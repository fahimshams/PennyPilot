import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FlightSelection {
  flightNumber: string;
  airline: string;
  departure: string;
  arrival: string;
  price: string;
  passengers: number;
}

interface RentalCarSelection {
  id: string;
  model: string;
  provider: string;
  price: string;
  pickupDate: string;
  dropoffDate: string;
  location: string;
}

interface PrivateCarSelection {
  id: string;
  model: string;
  provider: string;
  price: string;
  engineType: string;
  features: string[];
}

interface HotelSelection {
  id: string;
  name: string;
  location: string;
  checkIn: string;
  checkOut: string;
  price: string;
  roomType: string;
}

interface ActivitySelection {
  id: string;
  name: string;
  location: string;
  date: string;
  price: string;
  participants: number;
}

interface TravelSession {
  flights: FlightSelection[];
  rentalCars: RentalCarSelection[];
  privateCars: PrivateCarSelection[];
  hotels: HotelSelection[];
  activities: ActivitySelection[];
  totalBudget: string;
  travelDates: {
    startDate: string;
    endDate: string;
  };
  locations: {
    from: string;
    to: string;
  };
}

interface TravelSessionContextType {
  session: TravelSession;
  addFlight: (flight: FlightSelection) => void;
  addRentalCar: (car: RentalCarSelection) => void;
  addPrivateCar: (car: PrivateCarSelection) => void;
  addHotel: (hotel: HotelSelection) => void;
  addActivity: (activity: ActivitySelection) => void;
  updateTravelDates: (dates: { startDate: string; endDate: string }) => void;
  updateLocations: (locations: { from: string; to: string }) => void;
  updateTotalBudget: (budget: string) => void;
  clearSession: () => void;
}

const initialSession: TravelSession = {
  flights: [],
  rentalCars: [],
  privateCars: [],
  hotels: [],
  activities: [],
  totalBudget: '',
  travelDates: {
    startDate: '',
    endDate: '',
  },
  locations: {
    from: '',
    to: '',
  },
};

const TravelSessionContext = createContext<TravelSessionContextType | undefined>(undefined);

export function TravelSessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<TravelSession>(initialSession);

  const addFlight = (flight: FlightSelection) => {
    setSession(prev => ({
      ...prev,
      flights: [...prev.flights, flight],
    }));
  };

  const addRentalCar = (car: RentalCarSelection) => {
    setSession(prev => ({
      ...prev,
      rentalCars: [...prev.rentalCars, car],
    }));
  };

  const addPrivateCar = (car: PrivateCarSelection) => {
    setSession(prev => ({
      ...prev,
      privateCars: [...prev.privateCars, car],
    }));
  };

  const addHotel = (hotel: HotelSelection) => {
    setSession(prev => ({
      ...prev,
      hotels: [...prev.hotels, hotel],
    }));
  };

  const addActivity = (activity: ActivitySelection) => {
    setSession(prev => ({
      ...prev,
      activities: [...prev.activities, activity],
    }));
  };

  const updateTravelDates = (dates: { startDate: string; endDate: string }) => {
    setSession(prev => ({
      ...prev,
      travelDates: dates,
    }));
  };

  const updateLocations = (locations: { from: string; to: string }) => {
    setSession(prev => ({
      ...prev,
      locations,
    }));
  };

  const updateTotalBudget = (budget: string) => {
    setSession(prev => ({
      ...prev,
      totalBudget: budget,
    }));
  };

  const clearSession = () => {
    setSession(initialSession);
  };

  return (
    <TravelSessionContext.Provider
      value={{
        session,
        addFlight,
        addRentalCar,
        addPrivateCar,
        addHotel,
        addActivity,
        updateTravelDates,
        updateLocations,
        updateTotalBudget,
        clearSession,
      }}
    >
      {children}
    </TravelSessionContext.Provider>
  );
}

export function useTravelSession() {
  const context = useContext(TravelSessionContext);
  if (context === undefined) {
    throw new Error('useTravelSession must be used within a TravelSessionProvider');
  }
  return context;
} 