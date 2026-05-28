import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
  MaterialCommunityIcons,
  Ionicons,
} from '@expo/vector-icons';

const Home: React.FC = () => {
  const router = useRouter();

  const quickActions = [
    {
      id: 1,
      title: 'Hospitals',
      description: 'Find nearby care',
      icon: 'hospital-building',
      route: '/(tabs)/hospitals',
      color: '#3B82F6',
    },
    {
      id: 2,
      title: 'Reminders',
      description: 'Medication tracking',
      icon: 'pill',
      route: '/(tabs)/reminders',
      color: '#8B5CF6',
    },
    {
      id: 3,
      title: 'Education',
      description: 'Learn about malaria',
      icon: 'book-open-page-variant',
      route: '/(tabs)/education',
      color: '#10B981',
    },
    {
      id: 4,
      title: 'Prevention',
      description: 'Stay protected',
      icon: 'shield-check',
      route: '/(tabs)/education',
      color: '#F59E0B',
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <View className="flex-1">

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 120,
          }}
        >
          {/* HERO HEADER */}

          <LinearGradient
            colors={['#10B981', '#059669', '#047857']}
            className="rounded-b-[40px] px-6 pt-4 pb-12"
          >
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-white/80 text-base">
                  Good Morning 👋
                </Text>

                <Text className="text-white text-3xl font-bold mt-2">
                  Malaria & Typhoid Health
                </Text>

                <Text className="text-white text-3xl font-bold">
                  Assistant
                </Text>
              </View>

              <View className="w-16 h-16 bg-white/20 rounded-full items-center justify-center">
                <Text className="text-3xl">🦟</Text>
              </View>
            </View>

            <View className="mt-6 bg-white/15 rounded-3xl p-4 border border-white/20">
              <Text className="text-white/80 text-sm">
                Today's Health Reminder
              </Text>

              <Text className="text-white text-xl font-bold mt-1">
                Stay Protected
              </Text>

              <Text className="text-white/70 text-sm mt-2">
                Sleep under a treated mosquito net and avoid stagnant water
                around your home.
              </Text>
            </View>
          </LinearGradient>

          {/* SYMPTOM CHECKER */}

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => router.push('/(pages)/symptoms')}
            className="-mt-8 mx-6"
          >
            <LinearGradient
              colors={['#34D399', '#10B981']}
              className="rounded-[28px] p-6"
            >
              <View className="flex-row justify-between items-center">
                <View className="flex-1">
                  <Text className="text-white text-2xl font-bold">
                    Symptom Checker
                  </Text>

                  <Text className="text-white/80 mt-2">
                    Complete a quick malaria assessment in less than 2 minutes
                  </Text>
                </View>

                <View className="w-16 h-16 bg-white/20 rounded-full items-center justify-center">
                  <MaterialCommunityIcons
                    name="stethoscope"
                    size={30}
                    color="white"
                  />
                </View>
              </View>

              <View className="mt-5 bg-white/20 rounded-full h-2 overflow-hidden">
                <View className="bg-white h-full w-1/3 rounded-full" />
              </View>

              <View className="flex-row items-center mt-4">
                <Text className="text-white font-semibold">
                  Start Assessment
                </Text>

                <Ionicons
                  name="arrow-forward"
                  size={18}
                  color="white"
                  style={{ marginLeft: 6 }}
                />
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* QUICK ACTIONS */}

          <View className="px-6 mt-8">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-xl font-bold text-slate-900">
                Quick Access
              </Text>

              <TouchableOpacity>
                <Text className="text-emerald-600 font-semibold">
                  See All
                </Text>
              </TouchableOpacity>
            </View>

            <View className="flex-row flex-wrap justify-between">
              {quickActions.map((action) => (
                <TouchableOpacity
                  key={action.id}
                  onPress={() => router.push(action.route as any)}
                  className="w-[48%] bg-white rounded-[24px] p-5 mb-4"
                  style={{
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.05,
                    shadowRadius: 12,
                    elevation: 3,
                  }}
                >
                  <View
                    className="w-14 h-14 rounded-2xl items-center justify-center"
                    style={{
                      backgroundColor: `${action.color}20`,
                    }}
                  >
                    <MaterialCommunityIcons
                      name={action.icon as any}
                      size={28}
                      color={action.color}
                    />
                  </View>

                  <Text className="text-lg font-bold text-slate-900 mt-4">
                    {action.title}
                  </Text>

                  <Text className="text-slate-500 text-sm mt-1">
                    {action.description}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* GLOBAL INSIGHTS */}

          <View className="mt-4">
            <View className="px-6 mb-4">
              <Text className="text-xl font-bold text-slate-900">
                Global Insights
              </Text>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: 24,
              }}
            >
              <View
                className="bg-white rounded-[24px] p-5 mr-4 w-44"
                style={{
                  elevation: 2,
                }}
              >
                <Text className="text-slate-500">
                  Cases Recorded
                </Text>

                <Text className="text-3xl font-bold mt-2 text-slate-900">
                  247M
                </Text>

                <Text className="text-green-600 mt-2 font-semibold">
                  ↓ 12% This Year
                </Text>
              </View>

              <View
                className="bg-white rounded-[24px] p-5 mr-4 w-44"
                style={{
                  elevation: 2,
                }}
              >
                <Text className="text-slate-500">
                  Prevention Rate
                </Text>

                <Text className="text-3xl font-bold mt-2 text-slate-900">
                  68%
                </Text>

                <View className="bg-slate-200 h-2 rounded-full mt-4 overflow-hidden">
                  <View className="bg-emerald-500 w-[68%] h-full rounded-full" />
                </View>
              </View>

              <View
                className="bg-white rounded-[24px] p-5 w-44"
                style={{
                  elevation: 2,
                }}
              >
                <Text className="text-slate-500">
                  Protected Homes
                </Text>

                <Text className="text-3xl font-bold mt-2 text-slate-900">
                  83%
                </Text>

                <Text className="text-blue-600 mt-2 font-semibold">
                  +7% Growth
                </Text>
              </View>
            </ScrollView>
          </View>

          {/* DAILY HEALTH TIP */}

          <View className="px-6 mt-8">
            <LinearGradient
              colors={['#ECFDF5', '#D1FAE5']}
              className="rounded-[28px] p-5"
            >
              <View className="flex-row">
                <View className="w-12 h-12 bg-white rounded-2xl items-center justify-center">
                  <Text className="text-xl">💡</Text>
                </View>

                <View className="flex-1 ml-4">
                  <Text className="font-bold text-emerald-900 text-base">
                    Daily Health Tip
                  </Text>

                  <Text className="text-emerald-700 mt-2 leading-6">
                    Sleeping under an insecticide-treated mosquito net every
                    night significantly reduces malaria exposure and infection
                    risk.
                  </Text>

                  <TouchableOpacity className="mt-3">
                    <Text className="font-semibold text-emerald-600">
                      Learn More →
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </LinearGradient>
          </View>

          {/* DISCLAIMER */}

          <View className="px-6 mt-10">
            <View className="h-px bg-slate-200 mb-6" />

            <Text className="text-center text-slate-400 text-xs leading-5">
              This application is intended for educational and screening
              purposes only and does not replace professional medical advice or
              diagnosis.
            </Text>
          </View>
        </ScrollView>

        {/* FLOATING EMERGENCY BUTTON

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => router.push('/(tabs)/emergency')}
          className="absolute bottom-8 right-6"
        >
          <LinearGradient
            colors={['#EF4444', '#DC2626']}
            className="w-16 h-16 rounded-full items-center justify-center"
          >
            <MaterialCommunityIcons
              name="ambulance"
              size={30}
              color="white"
            />
          </LinearGradient>
        </TouchableOpacity> */}

      </View>
    </SafeAreaView>
  );
};

export default Home;