# Malaria Symptom Checker & Health Tips App

A modern, offline-first mobile healthcare app for malaria awareness, symptom checking, health tips, education, reminders, and emergency contacts. Built with React Native + Expo.

## Features
- Guided symptom checker (rule-based, not AI)
- Daily health tips (local JSON)
- Education center (static content)
- Medication reminders (AsyncStorage, notifications)
- Emergency contacts (AsyncStorage)
- Nearby hospitals (static list or Google Maps)
- Works offline (except maps)
- Splash, onboarding, disclaimer, profile, settings, emergency warning

## Tech Stack
- React Native + Expo
- AsyncStorage
- Local JSON
- Expo Notifications
- (Optional) Google Maps

## Disclaimer
This app does NOT replace medical diagnosis. Always consult healthcare professionals.

---

## Project Structure
- /assets: images, icons
- /data: local JSON (tips, education, hospitals)
- /screens: all app screens
- /components: reusable UI
- /utils: storage, notifications

---

## Setup
1. Install dependencies: `npm install`
2. Add Google Places API key to `.env`:
	- `EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=your_key_here`
	- Enable `Places API` and `Maps SDK for Android` and `Maps SDK for iOS` in Google Cloud Console
3. Start app: `npx expo start`
4. If map tiles are blank, rebuild native app once so map keys are embedded:
	- `npx expo run:android` or `npx expo run:ios`

---

## For Developers
- All data except reminders/contacts is local JSON or hardcoded.
- No backend server required.
- Use AsyncStorage for reminders and contacts.
- Use Expo Notifications for reminders.
- Use static hospital list for offline access.

---

## License
MIT
# MalariaApp
