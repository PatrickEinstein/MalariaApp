// Placeholder for RemindersScreen
import React, { useState } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';

type Reminder = { id: number; text: string };

const Reminders: React.FC = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [input, setInput] = useState('');

  const addReminder = () => {
    if (input.trim()) {
      setReminders((prev) => [
        ...prev,
        { id: Date.now(), text: input.trim() },
      ]);
      setInput('');
    }
  };

  return (
    <View className="flex-1 bg-white p-6">
      <Text className="text-2xl font-bold text-green-700 mb-4 text-center">Medication Reminders</Text>
      <View className="flex flex-row mb-4">
        <TextInput
          className="flex-1 border border-gray-400 rounded-lg p-3 mr-2 text-base"
          placeholder="Add a new reminder..."
          value={input}
          onChangeText={setInput}
          onSubmitEditing={addReminder}
          returnKeyType="done"
        />
        <TouchableOpacity className="bg-green-700 rounded-lg px-4 justify-center" onPress={addReminder} accessibilityRole="button">
          <Text className="text-white font-bold text-base">Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={reminders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="bg-green-100 rounded-lg p-4 mb-2">
            <Text className="text-base text-blue-700">{item.text}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 32 }}
        ListEmptyComponent={<Text className="text-gray-600 text-center mt-8 text-base">No reminders yet.</Text>}
      />
    </View>
  );
};

export default Reminders;