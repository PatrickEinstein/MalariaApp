// Placeholder for OnboardingScreen
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const slides = [
  {
    title: 'Welcome to Malaria Symptom Checker',
    description: 'Assess symptoms, get health tips, and learn about malaria. This app is for awareness and does not replace professional medical advice.',
    emoji: '🦟',
  },
  {
    title: 'Prevention First',
    description: 'Use mosquito nets, avoid stagnant water, and complete your medication. Stay informed and protected!',
    emoji: '🛡️',
  },
  {
    title: 'Disclaimer',
    description: 'This app does NOT replace medical diagnosis. Always consult healthcare professionals for any health concerns.',
    emoji: '⚠️',
  },
];

const OnboardingScreen: React.FC = () => {
  const [step, setStep] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    if (step < slides.length - 1) {
      setStep(step + 1);
    } else {
      router.replace('/dashboard');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.emojiCircle}>
        <Text style={styles.emoji}>{slides[step].emoji}</Text>
      </View>
      <Text style={styles.title}>{slides[step].title}</Text>
      <Text style={styles.description}>{slides[step].description}</Text>
      <TouchableOpacity style={styles.button} onPress={handleNext} accessibilityRole="button">
        <Text style={styles.buttonText}>{step === slides.length - 1 ? 'Get Started' : 'Next'}</Text>
      </TouchableOpacity>
      <View style={styles.dots}>
        {slides.map((_, i) => (
          <View key={i} style={[styles.dot, step === i && styles.activeDot]} />
        ))}
      </View>
    </View>
  );
};

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 24,
  },
  emojiCircle: {
    backgroundColor: '#e3f2fd',
    borderRadius: 60,
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 4,
    borderColor: '#2e7d32',
  },
  emoji: {
    fontSize: 56,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#1565c0',
    marginBottom: 32,
    textAlign: 'center',
    maxWidth: width - 48,
  },
  button: {
    backgroundColor: '#2e7d32',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginBottom: 24,
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dots: {
    flexDirection: 'row',
    marginTop: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#bdbdbd',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#2e7d32',
  },
});

export default OnboardingScreen;
