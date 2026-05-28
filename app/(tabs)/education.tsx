import { educationData } from '@/data/education';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const Education: React.FC = () => {
  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 40,
        }}
      >
        {/* Hero Section */}

        <LinearGradient
          colors={['#10B981', '#059669']}
          className="px-6 pt-6 pb-10 rounded-b-[40px]"
        >
          <Text className="text-white/80 text-base">
            Learn & Stay Safe
          </Text>

          <Text className="text-white text-3xl font-bold mt-2">
            Health Learning Center
          </Text>

          <Text className="text-white/80 mt-3 leading-6">
            Learn about Malaria, Typhoid, prevention methods,
            symptoms, and when to seek medical attention.
          </Text>
        </LinearGradient>

        {/* Education Cards */}

        <View className="px-5 mt-6">
          {educationData.map((item, index) => (
            <View
              key={index}
              className="
                bg-white
                rounded-[28px]
                p-5
                mb-4
                border
                border-slate-100
              "
            >
              <View className="flex-row items-center mb-3">
                <View className="w-12 h-12 bg-emerald-50 rounded-2xl items-center justify-center">
                  <Text className="text-2xl">
                    {item.icon}
                  </Text>
                </View>

                <View className="ml-3 flex-1">
                  <Text className="text-xs font-semibold text-emerald-600 uppercase">
                    {item.category}
                  </Text>

                  <Text className="text-lg font-bold text-slate-900">
                    {item.section}
                  </Text>
                </View>
              </View>

              <Text className="text-slate-600 leading-6">
                {item.content}
              </Text>
            </View>
          ))}
        </View>

        {/* Bottom Note */}

        <View className="px-6 mt-2">
          <LinearGradient
            colors={['#ECFDF5', '#D1FAE5']}
            className="rounded-[28px] p-5"
          >
            <Text className="text-emerald-800 font-bold text-lg">
              Important Reminder
            </Text>

            <Text className="text-emerald-700 mt-2 leading-6">
              This app provides educational information only.
              Always consult a qualified healthcare professional
              for diagnosis, testing, and treatment decisions.
            </Text>
          </LinearGradient>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Education;