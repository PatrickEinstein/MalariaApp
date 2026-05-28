import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Reminder = {
  id: number;
  text: string;
  hour: number;
  minute: number;
  notificationId: string | null;
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const parseTime = (value: string): { hour: number; minute: number } | null => {
  const match = value.trim().match(/^(\d{1,2}):(\d{2})$/);
  if (!match) {
    return null;
  }

  const hour = Number(match[1]);
  const minute = Number(match[2]);

  if (!Number.isInteger(hour) || !Number.isInteger(minute) || hour < 0 || hour > 23 || minute < 0 || minute > 59) {
    return null;
  }

  return { hour, minute };
};

const formatTime = (hour: number, minute: number) =>
  `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

const Reminders: React.FC = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [input, setInput] = useState('');
  const [timeInput, setTimeInput] = useState('08:00');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [notificationsMessage, setNotificationsMessage] = useState<string | null>(null);
  const tabBarHeight = useBottomTabBarHeight();

  useEffect(() => {
    const prepareNotifications = async () => {
      const isAndroidExpoGo = Platform.OS === 'android' && Constants.appOwnership === 'expo';
      if (isAndroidExpoGo) {
        setNotificationsEnabled(false);
        setNotificationsMessage(
          'Alarm notifications are not supported in Expo Go on Android. Use a development build to enable reminders at set times.'
        );
        return;
      }

      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('reminders', {
          name: 'Reminders',
          importance: Notifications.AndroidImportance.HIGH,
          sound: 'default',
        });
      }

      if (Platform.OS === 'web') {
        setNotificationsEnabled(false);
        setNotificationsMessage('Alarm notifications are not supported on web builds.');
        return;
      }

      const settings = await Notifications.getPermissionsAsync();
      let granted = settings.granted || settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL;

      if (!granted) {
        const requested = await Notifications.requestPermissionsAsync();
        granted = requested.granted || requested.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL;
      }

      setNotificationsEnabled(granted);
      if (!granted) {
        setNotificationsMessage('Notifications are disabled. Enable them in settings to trigger reminder alarms.');
      } else {
        setNotificationsMessage(null);
      }
    };

    void prepareNotifications();
  }, []);

  const inputBottomPadding = useMemo(() => tabBarHeight + 12, [tabBarHeight]);

  const scheduleReminderAlarm = async (text: string, hour: number, minute: number) => {
    if (!notificationsEnabled || Platform.OS === 'web') {
      return null;
    }

    return Notifications.scheduleNotificationAsync({
      content: {
        title: 'Health Reminder',
        body: text,
        sound: true,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour,
        minute,
      },
      identifier: `reminder-${Date.now()}`,
    });
  };

  const addReminder = async () => {
    if (!input.trim()) return;

    const parsedTime = parseTime(timeInput);
    if (!parsedTime) {
      Alert.alert('Invalid time', 'Please use 24-hour format like 08:30 or 21:05.');
      return;
    }

    const notificationId = await scheduleReminderAlarm(input.trim(), parsedTime.hour, parsedTime.minute);

    setReminders((prev) => [
      {
        id: Date.now(),
        text: input.trim(),
        hour: parsedTime.hour,
        minute: parsedTime.minute,
        notificationId,
      },
      ...prev,
    ]);

    setInput('');

    if (!notificationsEnabled) {
      Alert.alert(
        'Notifications are off',
        'Reminder saved, but alarm could not be scheduled. Enable notifications in device settings.'
      );
    }
  };

  const deleteReminder = async (id: number) => {
    const targetReminder = reminders.find((r) => r.id === id);

    if (targetReminder?.notificationId) {
      await Notifications.cancelScheduledNotificationAsync(targetReminder.notificationId);
    }

    setReminders((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 8 : 0}
      >
        <View className="flex-1">

          {/* HEADER */}
          <View className="px-6 pt-4 pb-2">
            <Text className="text-3xl font-bold text-slate-900">
              Health Reminders
            </Text>

            <Text className="text-slate-500 mt-1">
              Medication & wellness tracking
            </Text>
          </View>

          {/* LIST */}
          <View className="flex-1 px-6 mt-4">

            <FlatList
              data={reminders}
              keyExtractor={(item) =>
                item.id.toString()
              }
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{
                paddingBottom: tabBarHeight + 120,
              }}
              ListEmptyComponent={
                <View className="items-center mt-20">

                  <View className="w-20 h-20 bg-emerald-100 rounded-full items-center justify-center">
                    <MaterialCommunityIcons
                      name="bell-off"
                      size={34}
                      color="#059669"
                    />
                  </View>

                  <Text className="text-slate-900 font-bold text-lg mt-4">
                    No reminders yet
                  </Text>

                  <Text className="text-slate-500 text-center mt-2 px-10">
                    Add medication reminders to stay consistent with your health routine
                  </Text>

                </View>
              }
              renderItem={({ item }) => (
                <View className="bg-white rounded-2xl p-4 mb-3 border border-slate-100 flex-row items-center justify-between">

                  <View className="flex-row items-center flex-1">

                    <View className="w-10 h-10 bg-emerald-100 rounded-xl items-center justify-center mr-3">
                      <MaterialCommunityIcons
                        name="pill"
                        size={22}
                        color="#059669"
                      />
                    </View>

                    <View className="flex-1">
                      <Text className="text-slate-800">
                        {item.text}
                      </Text>
                      <Text className="text-emerald-700 mt-1 font-semibold">
                        Daily at {formatTime(item.hour, item.minute)}
                      </Text>
                    </View>

                  </View>

                  <TouchableOpacity
                    onPress={() => {
                      void deleteReminder(item.id);
                    }}
                  >
                    <MaterialCommunityIcons
                      name="trash-can-outline"
                      size={22}
                      color="#EF4444"
                    />
                  </TouchableOpacity>

                </View>
              )}
            />

          </View>

          {/* BOTTOM INPUT BAR (FIXED) */}
          <View
            className="px-4 mb-6"
            style={{ paddingBottom: inputBottomPadding }}
          >

            <View className="bg-white border border-slate-200 rounded-2xl px-3 py-2">

              <View className="flex-row items-center">

                <MaterialCommunityIcons
                  name="plus-circle-outline"
                  size={24}
                  color="#059669"
                />

                <TextInput
                  className="flex-1 px-3 text-slate-800"
                  placeholder="Add reminder (e.g. Take malaria meds)"
                  value={input}
                  onChangeText={setInput}
                  returnKeyType="done"
                  onSubmitEditing={() => {
                    void addReminder();
                  }}
                />

                <TouchableOpacity
                  onPress={() => {
                    void addReminder();
                  }}
                  className="bg-emerald-600 px-4 py-2 rounded-xl"
                >
                  <Text className="text-white font-bold">
                    Add
                  </Text>
                </TouchableOpacity>

              </View>

              <View className="flex-row items-center mt-2 ml-1">
                <MaterialCommunityIcons
                  name="clock-outline"
                  size={18}
                  color="#0f766e"
                />
                <Text className="text-slate-500 ml-2 mr-2">
                  Time:
                </Text>
                <TextInput
                  className="border border-slate-200 rounded-lg px-3 py-1 text-slate-800 w-24"
                  placeholder="08:00"
                  value={timeInput}
                  onChangeText={setTimeInput}
                  keyboardType={Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'numeric'}
                  maxLength={5}
                />
                <Text className="text-slate-400 ml-2 text-xs">
                  24-hour
                </Text>
              </View>

              {notificationsMessage ? (
                <View className="mt-3 rounded-xl bg-amber-100 px-3 py-2">
                  <Text className="text-amber-900 text-xs">
                    {notificationsMessage}
                  </Text>
                </View>
              ) : null}

            </View>

          </View>

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Reminders;