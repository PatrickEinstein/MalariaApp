// Placeholder for EmergencyWarningScreen
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const EmergencyWarningScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🚨</Text>
      <Text style={styles.title}>Emergency Warning</Text>
      <Text style={styles.message}>
        Severe symptoms detected. Please seek emergency medical care immediately!
      </Text>
      <Text style={styles.advice}>
        Call your nearest hospital or emergency contact now.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 32,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#c62828',
    marginBottom: 12,
  },
  message: {
    fontSize: 18,
    color: '#1565c0',
    marginBottom: 18,
    textAlign: 'center',
  },
  advice: {
    fontSize: 16,
    color: '#2e7d32',
    textAlign: 'center',
  },
});

export default EmergencyWarningScreen;
