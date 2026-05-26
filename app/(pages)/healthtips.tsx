// Placeholder for HealthTipsScreen
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

type Tip = { id: number; tip: string };

const HealthTipsScreen: React.FC = () => {
  const [tips, setTips] = useState<Tip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const tipsData = require('../data/healthTips.json');
        setTips(tipsData);
      } catch (e) {
        setTips([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" color="#2e7d32" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Health Tips</Text>
      <FlatList
        data={tips}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.tipCard}>
            <Text style={styles.tipText}>{item.tip}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 32 }}
      />
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
  tipCard: {
    backgroundColor: '#e3f2fd',
    borderRadius: 14,
    padding: 18,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  tipText: {
    fontSize: 16,
    color: '#1565c0',
  },
});

export default HealthTipsScreen;
