import { useState, useEffect, useCallback, RefObject } from 'react';
import { OSMViewRef } from 'expo-osm-sdk';
import * as Location from 'expo-location';
import { MapLocation } from '@/types/maps';

interface UseMapInitializationProps {
  mapRef: RefObject<OSMViewRef | null>;
  initialZoom?: number;
}

export const useMapInitialization = ({ mapRef, initialZoom = 20 }: UseMapInitializationProps) => {
  const [initialCenter, setInitialCenter] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const [startLocation, setStartLocation] = useState<MapLocation | null>(null);
  const [destinationLocation, setDestinationLocation] = useState<MapLocation | null>(null);

  const getUserLocation = useCallback(async (): Promise<MapLocation | null> => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        return null;
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      if (!currentLocation) {
        return null;
      }

      return {
        coordinate: {
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        },
        displayName: 'Current Location',
      };
    } catch (err: any) {
      console.error('Error getting user location:', err);
      return null;
    }
  }, []);

  // Initialize map center and start location on mount
  useEffect(() => {
    const init = async () => {
      const userLocation = await getUserLocation();
      if (userLocation) {
        setInitialCenter(userLocation.coordinate);
        setStartLocation(userLocation);
      }
    };

    init();
  }, [getUserLocation]);

  // Animate to initial center when map is ready
  useEffect(() => {
    if (isMapReady && initialCenter && mapRef.current) {
      mapRef.current.animateToLocation(
        initialCenter.latitude,
        initialCenter.longitude,
        initialZoom
      );
    }
  }, [isMapReady, initialCenter, mapRef, initialZoom]);

  return {
    initialCenter,
    isMapReady,
    setIsMapReady,
    startLocation,
    setStartLocation,
    destinationLocation,
    setDestinationLocation,
    getUserLocation,
  };
};
