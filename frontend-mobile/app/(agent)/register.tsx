import { useState, useCallback } from 'react';
import { Alert, StyleSheet, ScrollView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useAgentStore } from '@/store/useAgentStore';
import { useAuthStore } from '@/store/useAuthStore';
import { Screen } from '@/components/ui/Screen';
import { TextField } from '@/components/ui/TextField';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { getCurrentLocation } from '@/utils/location';
import { takePhoto } from '@/utils/camera';
import { theme } from '@/constants/theme';
import type { FarmerRegistrationInput, LocationData } from '@/types';

export default function RegisterFarmerScreen() {
  const router = useRouter();
  const { agent } = useAuthStore();
  const { registerFarmer, isLoading } = useAgentStore();

  const [fullName, setFullName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [village, setVillage] = useState('');
  const [district, setDistrict] = useState('');
  const [cropTypes, setCropTypes] = useState('');
  const [farmSize, setFarmSize] = useState('');
  const [location, setLocation] = useState<LocationData | null>(null);
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const handleCaptureLocation = useCallback(async () => {
    const loc = await getCurrentLocation();
    if (loc) {
      setLocation(loc);
      Alert.alert('Success', `GPS captured: ${loc.latitude.toFixed(4)}, ${loc.longitude.toFixed(4)}`);
    } else {
      Alert.alert('Error', 'Failed to capture location');
    }
  }, []);

  const handleTakePhoto = useCallback(async () => {
    const uri = await takePhoto();
    if (uri) {
      setPhotoUri(uri);
      Alert.alert('Success', 'Photo captured');
    } else {
      Alert.alert('Error', 'Failed to capture photo');
    }
  }, []);

  const handleRegister = useCallback(async () => {
    if (!fullName.trim() || !idNumber.trim() || !phoneNumber.trim() || !village.trim()) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    try {
      const data: FarmerRegistrationInput = {
        full_name: fullName,
        id_number: idNumber,
        phone_number: phoneNumber,
        village,
        district: district || undefined,
        crop_types: cropTypes.split(',').map(c => c.trim()).filter(Boolean),
        farm_size_ha: farmSize ? parseFloat(farmSize) : undefined,
        latitude: location?.latitude,
        longitude: location?.longitude,
        gps_accuracy: location?.accuracy,
        photo_url: photoUri || undefined,
      };

      await registerFarmer(data);
      Alert.alert('Success', 'Farmer registered successfully!');
      
      // Reset form
      setFullName('');
      setIdNumber('');
      setPhoneNumber('');
      setVillage('');
      setDistrict('');
      setCropTypes('');
      setFarmSize('');
      setLocation(null);
      setPhotoUri(null);

      // Navigate to farmers list
      router.push('/(agent)/farmers');
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'Failed to register farmer');
    }
  }, [fullName, idNumber, phoneNumber, village, district, cropTypes, farmSize, location, photoUri]);

  return (
    <ScrollView style={styles.container}>
      <Screen>
        <Text style={styles.sectionTitle}>Farmer Information</Text>

        <TextField
          label="Full Name *"
          placeholder="e.g., Nomsa Mokoena"
          value={fullName}
          onChangeText={setFullName}
        />

        <TextField
          label="ID Number *"
          placeholder="e.g., 8901234567890"
          value={idNumber}
          onChangeText={setIdNumber}
        />

        <TextField
          label="Phone Number *"
          placeholder="e.g., 27821234567"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />

        <TextField
          label="Village *"
          placeholder="e.g., Ga-Mothiba"
          value={village}
          onChangeText={setVillage}
        />

        <TextField
          label="District"
          placeholder="e.g., Polokwane"
          value={district}
          onChangeText={setDistrict}
        />

        <TextField
          label="Crop Types (comma-separated)"
          placeholder="e.g., Maize, Sunflower"
          value={cropTypes}
          onChangeText={setCropTypes}
        />

        <TextField
          label="Farm Size (hectares)"
          placeholder="e.g., 2.5"
          value={farmSize}
          onChangeText={setFarmSize}
        />

        <Text style={styles.sectionTitle}>Media Capture</Text>

        <View style={styles.actionBox}>
          <Text style={styles.actionTitle}>📍 GPS Location</Text>
          {location ? (
            <Text style={styles.locationText}>
              Captured: {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
            </Text>
          ) : (
            <Text style={styles.hintText}>No location captured yet</Text>
          )}
          <PrimaryButton
            label={location ? 'Recapture GPS' : 'Capture GPS'}
            onPress={handleCaptureLocation}
            disabled={isLoading}
          />
        </View>

        <View style={styles.actionBox}>
          <Text style={styles.actionTitle}>📷 Farmer Photo</Text>
          {photoUri && <Text style={styles.locationText}>Photo captured ✅</Text>}
          <PrimaryButton
            label={photoUri ? 'Retake Photo' : 'Take Photo'}
            onPress={handleTakePhoto}
            disabled={isLoading}
          />
        </View>

        <View style={styles.divider} />

        <PrimaryButton
          label={isLoading ? 'Registering...' : 'Register Farmer'}
          onPress={handleRegister}
          disabled={isLoading}
        />
      </Screen>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.text,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  actionBox: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  locationText: {
    fontSize: 12,
    color: '#10b981',
    marginBottom: theme.spacing.md,
    fontWeight: '500',
  },
  hintText: {
    fontSize: 12,
    color: theme.colors.muted,
    marginBottom: theme.spacing.md,
  },
  divider: {
    height: theme.spacing.lg,
  },
});
