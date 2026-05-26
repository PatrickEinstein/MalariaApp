import { Tabs } from 'expo-router';
import cn from "clsx";
import { useColorScheme } from '@/hooks/use-color-scheme';
import { TabBarIconProps } from '@/type';
import { Image } from 'expo-image';
import { Text, View } from 'react-native';
import { TAB_ICONS } from '@/constants';

const TabBarIcon = ({ focused, icon, title }: TabBarIconProps) => (
  <View className="tab-icon">
    <Image
      source={icon}
      className="size-[30px]"
    />
    <Text className={cn('text-xs font-semibold', focused ? 'text-blue-500' : 'text-gray-500')}>{title}</Text>
  </View>
)

const TabLayout = () => {



  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingTop: 10,
          paddingBottom: 10,
          height: 100,
          position: "absolute",
          borderTopWidth: 1,
          borderTopColor: "#374151",
          shadowColor: "#000000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 10
        }
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'home',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} title="Home" icon={TAB_ICONS.home} />
          )
        }}
      />
      <Tabs.Screen
        name="education"
        options={{
          title: 'Education',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} title="Education" icon={TAB_ICONS.education} />
          )
        }}
      />
      <Tabs.Screen
        name="reminders"
        options={{
          title: 'Reminders',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} title="Reminders" icon={TAB_ICONS.reminders} />
          )
        }}
      />
      <Tabs.Screen
        name="hospitals"
        options={{
          title: 'Hospitals',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} title="Hospitals" icon={TAB_ICONS.hospitals} />
          )
        }}
      />
    </Tabs>
  );
}

export default TabLayout;
