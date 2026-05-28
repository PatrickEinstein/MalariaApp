import { HapticTab } from '@/components/haptic-tab';
import { TAB_ICONS } from '@/constants';
import { TabBarIconProps } from '@/type';
import cn from 'clsx';
import { Image } from 'expo-image';
import { Tabs, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View } from 'react-native';


const TabBarIcon = ({ focused, icon, title }: TabBarIconProps) => (
  <View className="items-center justify-center gap-1 w-[84px]">
    <View
      className={cn(
        'rounded-xl px-3 py-1',
        focused ? 'bg-sky-100 border border-sky-200' : 'bg-transparent border border-transparent'
      )}
    >
      <Image
        source={icon}
        contentFit="contain"
        style={{
          backgroundColor: 'transparent',
          width: 22,
          height: 22,
          opacity: focused ? 1 : 0.9,
        }}
      />
    </View>
    <Text className={cn('text-[11px] font-semibold', focused ? 'text-sky-600' : 'text-slate-500')}>
      {title}
    </Text>
  </View>
);

const TabLayout = () => {
  const router = useRouter();
  const [kycChecked, setKycChecked] = useState(false);

  useEffect(() => {
    (async () => {
      const kyc = await AsyncStorage?.getItem?.('kyc');
      if (!kyc) {
        router.replace('/welcome-kyc');
      } else {
        setKycChecked(true);
      }
    })();
  }, []);

  if (!kycChecked) {
    return null;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarButton: HapticTab,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: 88,
          paddingTop: 8,
          paddingBottom: 10,
          borderTopWidth: 1,
          borderTopColor: '#d1d5db',
          backgroundColor: '#ffffff',
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.08,
          shadowRadius: 6,
          elevation: 8,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} title="Home" icon={TAB_ICONS.home} />
          ),
        }}
      />
      <Tabs.Screen
        name="education"
        options={{
          title: 'Education',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} title="Education" icon={TAB_ICONS.education} />
          ),
        }}
      />
      <Tabs.Screen
        name="reminders"
        options={{
          title: 'Reminders',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} title="Reminders" icon={TAB_ICONS.reminders} />
          ),
        }}
      />
      <Tabs.Screen
        name="hospitals"
        options={{
          title: 'Hospitals',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} title="Hospitals" icon={TAB_ICONS.hospitals} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;

