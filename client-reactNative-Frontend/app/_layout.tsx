// app/_layout.tsx
import { Stack } from 'expo-router';
import { TravelSessionProvider } from '../context/TravelSessionContext';

export default function Layout() {
  return (
    <TravelSessionProvider>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="travel-plan"
          options={{
            title: 'Travel Plan',
            headerShown: true,
          }}
        />
      </Stack>
    </TravelSessionProvider>
  );
}
