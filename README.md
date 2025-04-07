# PennyPilot - Travel Planning App

PennyPilot is a React Native mobile application that helps users plan their travel by selecting flights, hotels, activities, and more. The app provides a seamless experience for creating and managing travel plans.

## Features

- Travel form with location and date selection
- Flight search and booking
- Hotel selection
- Activity planning
- Weather forecast for destinations
- Travel plan management
- Session storage for persistent data

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac users) or Android Studio (for Android development)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/PennyPilot.git
cd PennyPilot
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Install Expo CLI globally (if not already installed):
```bash
npm install -g expo-cli
# or
yarn global add expo-cli
```

## Running the App

1. Start the development server:
```bash
npx expo start
```

2. Choose your preferred way to run the app:
   - Press `i` to open in iOS simulator
   - Press `a` to open in Android emulator
   - Scan the QR code with the Expo Go app on your physical device

## Project Structure

```
client-reactNative-Frontend/
├── app/
│   ├── (tabs)/
│   │   ├── index.tsx
│   │   ├── flights.tsx
│   │   ├── hotels.tsx
│   │   ├── activities.tsx
│   │   ├── weather.tsx
│   │   └── travelPlan.tsx
│   └── _layout.tsx
├── components/
│   ├── TravelForm.tsx
│   └── ...
└── ...
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:
```
EXPO_PUBLIC_API_URL=your_api_url
```

## Dependencies

Key dependencies include:
- expo-router
- @react-native-async-storage/async-storage
- react-native
- expo
- react-native-paper

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@pennypilot.com or open an issue in the repository.