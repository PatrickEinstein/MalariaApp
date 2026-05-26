// Placeholder for EducationScreen
import { educationData } from '@/data/education';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

;

const Education: React.FC = () => {

  
  return (
    <ScrollView className="flex-1 bg-white p-6" contentContainerStyle={{ paddingBottom: 32 }}>
      <Text className="text-2xl font-bold text-green-700 mb-4 text-center">Malaria Education Center</Text>
      {educationData.map((s, i) => (
        <View key={i} className="bg-green-100 rounded-lg p-4 mb-4 shadow">
          <Text className="text-lg font-bold text-blue-700 mb-2">{s.section}</Text>
          <Text className="text-base text-gray-800">{s.content}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default Education;
