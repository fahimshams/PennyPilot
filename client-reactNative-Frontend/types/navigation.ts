export type RootStackParamList = {
    Home: undefined;
    FlightListings: {
      from: string;
      to: string;
      startDate: string;
      endDate: string;
      passengers: number;
      budget: number;
    };
  };