
import { Stack } from 'expo-router';
import './global.css';

export default function RootLayout() {
  return (

      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>

  );
}



//npx eas-cli build --platform android --profile preview --non-interactive