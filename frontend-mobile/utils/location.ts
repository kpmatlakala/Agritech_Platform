import * as Location from 'expo-location';
import type { LocationData } from '@/types';

let locationSubscription: Location.LocationSubscription | null = null;

/**
 * Request location permissions
 */
export async function requestLocationPermission(): Promise<boolean> {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    console.error('Error requesting location permission:', error);
    return false;
  }
}

/**
 * Get current location (one-time)
 */
export async function getCurrentLocation(): Promise<LocationData | null> {
  try {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      throw new Error('Location permission not granted');
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
      timeout: 10000,
    });

    const { latitude, longitude, accuracy, altitude } = location.coords;

    return {
      latitude,
      longitude,
      accuracy: accuracy || undefined,
      altitude: altitude || undefined,
      timestamp: location.timestamp,
    };
  } catch (error) {
    console.error('Error getting current location:', error);
    return null;
  }
}

/**
 * Watch location (continuous updates)
 */
export async function startLocationWatch(
  onLocationChange: (location: LocationData) => void,
  onError?: (error: Error) => void
): Promise<boolean> {
  try {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      throw new Error('Location permission not granted');
    }

    locationSubscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.Balanced,
        timeInterval: 1000,
        distanceInterval: 10,
      },
      (location) => {
        const { latitude, longitude, accuracy, altitude } = location.coords;
        onLocationChange({
          latitude,
          longitude,
          accuracy: accuracy || undefined,
          altitude: altitude || undefined,
          timestamp: location.timestamp,
        });
      }
    );

    return true;
  } catch (error) {
    console.error('Error starting location watch:', error);
    if (onError && error instanceof Error) {
      onError(error);
    }
    return false;
  }
}

/**
 * Stop watching location
 */
export function stopLocationWatch(): void {
  if (locationSubscription) {
    locationSubscription.remove();
    locationSubscription = null;
  }
}

/**
 * Get location string (reverse geocoding)
 */
export async function getLocationString(
  latitude: number,
  longitude: number
): Promise<string> {
  try {
    const results = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    if (results.length > 0) {
      const { name, district, region, country } = results[0];
      return `${name || ''}, ${district || ''}, ${region || ''}, ${country || ''}`.replace(
        /^,\s*|,\s*$/g,
        ''
      );
    }

    return `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
  } catch (error) {
    console.error('Error getting location string:', error);
    return `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
  }
}

/**
 * Calculate distance between two coordinates (in meters)
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c * 1000; // Return in meters
}
