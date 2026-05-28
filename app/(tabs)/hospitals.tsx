import { hospitalsData } from '@/data/hospitals';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Linking,
  Pressable,
  Text,
  View,
} from 'react-native';
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';

type Hospital = {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
};

type UserRegion = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

const GOOGLE_MAPS_API_KEY =
  process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

const MAP_PROVIDER = PROVIDER_GOOGLE;

const Hospitals = () => {
  const mapRef = useRef<MapView>(null);

  const [region, setRegion] =
    useState<UserRegion | null>(null);

  const [hospitals, setHospitals] =
    useState<Hospital[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [statusMessage, setStatusMessage] =
    useState<string | null>(null);

  const fallbackHospitals = useMemo(
    () =>
      hospitalsData.map((hospital) => ({
        id: hospital.name,
        name: hospital.name,
        address: hospital.address,
        lat: hospital.lat,
        lng: hospital.lng,
      })),
    []
  );

  const hospitalsToRender =
    hospitals.length > 0
      ? hospitals
      : fallbackHospitals;

  const fetchNearbyHospitals =
    useCallback(
      async (
        latitude: number,
        longitude: number
      ) => {
        if (!GOOGLE_MAPS_API_KEY) {
          setStatusMessage(
            'Google API key missing. Showing offline hospitals.'
          );
          return;
        }

        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=10000&type=hospital&key=${GOOGLE_MAPS_API_KEY}`
          );

          const payload =
            await response.json();

          if (
            payload.status !== 'OK' &&
            payload.status !==
            'ZERO_RESULTS'
          ) {
            throw new Error();
          }

          const hospitalsFound: Hospital[] =
            payload.results.map(
              (item: any) => ({
                id: item.place_id,
                name: item.name,
                address:
                  item.vicinity ??
                  'Address unavailable',
                lat:
                  item.geometry.location.lat,
                lng:
                  item.geometry.location.lng,
              })
            );

          setHospitals(hospitalsFound);
        } catch {
          setStatusMessage(
            'Unable to load nearby hospitals. Showing offline list.'
          );
        }
      },
      []
    );

  const loadNearbyHospitals =
    useCallback(async () => {
      try {
        setLoading(true);

        const { status } =
          await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
          setStatusMessage(
            'Location permission denied.'
          );
          return;
        }

        const location =
          await Location.getCurrentPositionAsync({
            accuracy:
              Location.Accuracy.Balanced,
          });

        const nextRegion = {
          latitude:
            location.coords.latitude,
          longitude:
            location.coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        };

        setRegion(nextRegion);

        await fetchNearbyHospitals(
          nextRegion.latitude,
          nextRegion.longitude
        );
      } finally {
        setLoading(false);
      }
    }, [fetchNearbyHospitals]);

  const openDirections =
    useCallback((hospital: Hospital) => {
      Linking.openURL(
        `https://www.google.com/maps/dir/?api=1&destination=${hospital.lat},${hospital.lng}`
      );
    }, []);

  useEffect(() => {
    loadNearbyHospitals();
  }, [loadNearbyHospitals]);

  useEffect(() => {
    if (
      !mapRef.current ||
      hospitalsToRender.length === 0
    ) {
      return;
    }

    const coordinates =
      hospitalsToRender.map(
        (hospital) => ({
          latitude: hospital.lat,
          longitude: hospital.lng,
        })
      );

    if (region) {
      coordinates.push({
        latitude: region.latitude,
        longitude: region.longitude,
      });
    }

    mapRef.current.fitToCoordinates(
      coordinates,
      {
        edgePadding: {
          top: 80,
          right: 80,
          bottom: 80,
          left: 80,
        },
        animated: true,
      }
    );
  }, [hospitalsToRender, region]);

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <FlatList
        data={hospitalsToRender}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 2,
          paddingHorizontal: 16,
          paddingBottom: 40,
        }}
        ListHeaderComponent={
          <>
            <View className="px-2 pb-4">
              <Text className="text-3xl font-bold text-slate-900">
                Nearby Hospitals
              </Text>
              <Text className="text-slate-500 mt-1">
                Find healthcare facilities around you
              </Text>
            </View>

            <View className="overflow-hidden rounded-[32px]">
              {loading ? (
                <View className="h-[350px] items-center justify-center bg-slate-100">
                  <ActivityIndicator size="large" color="#10B981" />
                  <Text className="mt-3 text-slate-500">
                    Loading nearby hospitals...
                  </Text>
                </View>
              ) : (
                <>
                  <MapView
                    ref={mapRef}
                    provider={MAP_PROVIDER}
                    style={{
                      width: '100%',
                      height: 350,
                    }}
                    showsUserLocation
                    showsMyLocationButton
                  >
                    {region && (
                      <Marker
                        coordinate={{
                          latitude: region.latitude,
                          longitude: region.longitude,
                        }}
                        title="Your Location"
                        pinColor="green"
                      />
                    )}

                    {hospitalsToRender.map((hospital) => (
                      <Marker
                        key={hospital.id}
                        coordinate={{
                          latitude: hospital.lat,
                          longitude: hospital.lng,
                        }}
                        title={hospital.name}
                        description={hospital.address}
                      >
                        <View className="bg-red-500 rounded-full p-2 border-2 border-white">
                          <MaterialCommunityIcons
                            name="hospital-building"
                            size={20}
                            color="white"
                          />
                        </View>
                      </Marker>
                    ))}
                  </MapView>

                  <Pressable
                    onPress={loadNearbyHospitals}
                    className="absolute top-4 right-4 bg-white rounded-full p-3 shadow"
                  >
                    <MaterialCommunityIcons
                      name="refresh"
                      size={22}
                      color="#10B981"
                    />
                  </Pressable>
                </>
              )}
            </View>

            {statusMessage && (
              <View className="mt-3 rounded-2xl bg-amber-100 p-4">
                <Text className="text-amber-900">
                  {statusMessage}
                </Text>
              </View>
            )}

            <View className="mt-5 mb-3 flex-row justify-between items-center px-2">
              <Text className="text-xl font-bold text-slate-900">
                Hospitals Near You
              </Text>
              <View className="bg-green-100 px-3 py-1 rounded-full">
                <Text className="font-bold text-green-700">
                  {hospitalsToRender.length}
                </Text>
              </View>
            </View>
          </>
        }
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              openDirections(item)
            }
            className="
              bg-white
              rounded-[28px]
              p-5
              mb-4
              border
              border-slate-100
            "
          >
            <View className="flex-row justify-between">

              <View className="flex-1">

                <Text className="text-lg font-bold text-slate-900">
                  {item.name}
                </Text>

                <Text className="text-slate-500 mt-2 leading-5">
                  {item.address}
                </Text>

              </View>

              <View className="bg-green-100 self-start px-3 py-2 rounded-full">
                <Text className="text-green-700 font-semibold">
                  Route
                </Text>
              </View>

            </View>
          </Pressable>
        )}
        ListEmptyComponent={
          <View className="items-center py-10">
            <Text className="text-slate-500">
              No hospitals found nearby
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Hospitals;