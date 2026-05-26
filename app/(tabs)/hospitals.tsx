// Placeholder for HospitalsScreen
import { hospitalsData } from '@/data/hospitals';
import React from 'react';
import { FlatList, Text, View } from 'react-native';

type Hospital = { name: string; address: string; lat: number; lng: number };

const Hospitals: React.FC = () => {

  return (
    <View className="flex-1 bg-white p-6">
      <Text className="text-2xl font-bold text-green-700 mb-4 text-center">Nearby Hospitals</Text>
      <FlatList
        data={hospitalsData}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View className="bg-blue-100 rounded-lg p-4 mb-3 shadow">
            <Text className="text-lg font-bold text-blue-700 mb-1">{item.name}</Text>
            <Text className="text-base text-gray-800">{item.address}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 32 }}
        ListEmptyComponent={<Text className="text-gray-600 text-center mt-8 text-base">No hospitals found.</Text>}
      />
    </View>
  );
};

export default Hospitals;
