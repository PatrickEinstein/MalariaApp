// Placeholder for ProfileScreen
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ProfileScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.infoCard}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>User</Text>
      </View>
      <View style={styles.infoCard}>
        <Text style={styles.label}>App Version:</Text>
        <Text style={styles.value}>1.0.0</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 16,
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: '#e3f2fd',
    borderRadius: 10,
    padding: 16,
    marginBottom: 14,
  },
  label: {
    fontSize: 15,
    color: '#1565c0',
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
    color: '#222',
    marginTop: 2,
  },
});

export default ProfileScreen;
