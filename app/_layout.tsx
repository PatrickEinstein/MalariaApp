
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Stack } from 'expo-router';
import "./global.css"



export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
    </Stack>


  );
}
