// Placeholder for ContactsScreen
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type Contact = { id: number; name: string; phone: string };

const ContactsScreen: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const addContact = () => {
    if (name.trim() && phone.trim()) {
      setContacts((prev) => [
        ...prev,
        { id: Date.now(), name: name.trim(), phone: phone.trim() },
      ]);
      setName('');
      setPhone('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Emergency Contacts</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <TouchableOpacity style={styles.addButton} onPress={addContact} accessibilityRole="button">
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.contactCard}>
            <Text style={styles.contactName}>{item.name}</Text>
            <Text style={styles.contactPhone}>{item.phone}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 32 }}
        ListEmptyComponent={<Text style={styles.emptyText}>No contacts yet.</Text>}
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
  inputRow: {
    flexDirection: 'row',
    marginBottom: 18,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#bdbdbd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginRight: 8,
  },
  addButton: {
    backgroundColor: '#2e7d32',
    borderRadius: 8,
    paddingHorizontal: 18,
    justifyContent: 'center',
    height: 44,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  contactCard: {
    backgroundColor: '#ede7f6',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1565c0',
  },
  contactPhone: {
    fontSize: 15,
    color: '#222',
  },
  emptyText: {
    color: '#888',
    textAlign: 'center',
    marginTop: 32,
    fontSize: 16,
  },
});

export default ContactsScreen;
