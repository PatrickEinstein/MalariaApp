import AsyncStorage from '@react-native-async-storage/async-storage';
import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';

export default function Index() {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const kyc = await AsyncStorage.getItem('kyc');
      setInitialRoute(kyc ? '/(tabs)/home' : '/welcome-kyc');
    })();
  }, []);

  if (!initialRoute) {
    return null;
  }

  return <Redirect href={initialRoute as '/(tabs)/home' | '/welcome-kyc'} />;
}
