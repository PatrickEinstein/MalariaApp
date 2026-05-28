// Correct Import
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const WelcomeKYC = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleContinue = async () => {
    if (!name.trim() || !age.trim() || !location.trim()) {
      setError('Please complete all fields to continue.');
      return;
    }

    await AsyncStorage.setItem(
      'kyc',
      JSON.stringify({ name, age, location })
    );

    router.replace('/(tabs)/home');
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >

      {/* BACKGROUND */}
      <LinearGradient
        colors={['#10B981', '#059669']}
        className="flex-1 justify-center px-6"
      >

        {/* CARD */}
        <View className="bg-white rounded-[32px] p-6 shadow-lg">

          {/* ICON */}
          <View className="items-center mb-4">
            <View className="w-16 h-16 bg-emerald-100 rounded-full items-center justify-center">
              <MaterialCommunityIcons
                name="account-heart"
                size={32}
                color="#059669"
              />
            </View>
          </View>

          {/* TITLE */}
          <Text className="text-3xl font-bold text-center text-slate-900">
            Welcome 👋
          </Text>

          <Text className="text-center text-slate-500 mt-2 mb-6 leading-5">
            Let’s get to know you so we can personalize your malaria & typhoid health experience.
          </Text>

          {/* INPUTS */}
          <View className="space-y-3">

            <TextInput
              className="bg-slate-50 border border-slate-100 rounded-2xl px-4 py-4 text-base"
              placeholder="Full Name"
              placeholderTextColor="#94A3B8"
              value={name}
              onChangeText={setName}
            />

            <TextInput
              className="bg-slate-50 border border-slate-100 rounded-2xl px-4 py-4 text-base"
              placeholder="Age"
              placeholderTextColor="#94A3B8"
              value={age}
              onChangeText={setAge}
              keyboardType="numeric"
            />

            <TextInput
              className="bg-slate-50 border border-slate-100 rounded-2xl px-4 py-4 text-base"
              placeholder="City, Country"
              placeholderTextColor="#94A3B8"
              value={location}
              onChangeText={setLocation}
            />

          </View>

          {/* ERROR */}
          {error ? (
            <Text className="text-red-500 text-center mt-4">
              {error}
            </Text>
          ) : null}

          {/* BUTTON */}
          <TouchableOpacity
            onPress={handleContinue}
            className="mt-6"
          >
            <LinearGradient
              colors={['#10B981', '#059669']}
              className="py-4 rounded-2xl"
            >
              <Text className="text-white text-center font-bold text-base">
                Continue
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* FOOTNOTE */}
          <Text className="text-xs text-slate-400 text-center mt-4">
            Your data is stored securely on your device.
          </Text>

        </View>

      </LinearGradient>

    </KeyboardAvoidingView>
  );
};

export default WelcomeKYC;