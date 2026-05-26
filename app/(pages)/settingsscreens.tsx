// Placeholder for SettingsScreen
import React, { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

const SettingsScreen: React.FC = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.settingRow}>
        <Text style={styles.label}>Enable Notifications</Text>
        <Switch value={notifications} onValueChange={setNotifications} />
      </View>
      <View style={styles.settingRow}>
        <Text style={styles.label}>Dark Mode</Text>
        <Switch value={darkMode} onValueChange={setDarkMode} />
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
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#e8f5e9',
    borderRadius: 10,
    padding: 16,
    marginBottom: 14,
  },
  label: {
    fontSize: 16,
    color: '#1565c0',
  },
});

export default SettingsScreen;
