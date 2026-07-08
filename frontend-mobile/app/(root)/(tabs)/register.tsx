import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { colors, globalStyles } from '@/styles/global';
import { useFarmerStore } from '@/store/useFarmerStore';

const numericOnly = (value: string): string => value.replace(/\D/g, '');

export default function RegisterScreen() {
  const addFarmer = useFarmerStore((state) => state.addFarmer);

  const [fullName, setFullName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [village, setVillage] = useState('');
  const [district, setDistrict] = useState('');
  const [cropType, setCropType] = useState('');
  const [farmSize, setFarmSize] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setFullName('');
    setIdNumber('');
    setPhoneNumber('');
    setVillage('');
    setDistrict('');
    setCropType('');
    setFarmSize('');
  };

  const handleRegister = () => {
    if (!fullName.trim() || !idNumber.trim() || !phoneNumber.trim() || !village.trim() || !cropType.trim()) {
      Alert.alert('Missing details', 'Please complete all required fields before submitting.');
      return;
    }

    if (idNumber.length < 13) {
      Alert.alert('Invalid ID', 'South African ID should contain 13 digits.');
      return;
    }

    if (phoneNumber.length < 10) {
      Alert.alert('Invalid phone', 'Phone number should contain at least 10 digits.');
      return;
    }

    const parsedFarmSize = farmSize ? Number(farmSize) : undefined;
    if (parsedFarmSize !== undefined && Number.isNaN(parsedFarmSize)) {
      Alert.alert('Invalid farm size', 'Farm size should be a numeric value in hectares.');
      return;
    }

    setIsSubmitting(true);

    const createdFarmer = addFarmer({
      fullName: fullName.trim(),
      idNumber: idNumber.trim(),
      phoneNumber: phoneNumber.trim(),
      village: village.trim(),
      district: district.trim() || undefined,
      cropType: cropType
        .split(',')
        .map((crop) => crop.trim())
        .filter(Boolean),
      farmSizeHa: parsedFarmSize,
    });

    setTimeout(() => {
      setIsSubmitting(false);
      resetForm();
      Alert.alert('Registration complete', `Digital ID: ${createdFarmer.farmerId}`, [
        {
          text: 'Open Profile',
          onPress: () =>
            router.push({ pathname: '/(root)/farmer/[id]', params: { id: createdFarmer.id } }),
        },
        {
          text: 'Stay Here',
          style: 'cancel',
        },
      ]);
    }, 650);
  };

  return (
    <ScrollView style={globalStyles.scrollContainer} showsVerticalScrollIndicator={false}>
      <View>
        <Text style={globalStyles.title}>Register Farmer</Text>
        <Text style={globalStyles.subtitle}>Aligned with the AFAP mobile registration flow in docs</Text>
      </View>

      <TextInput
        style={globalStyles.input}
        placeholder="Full Name *"
        placeholderTextColor={colors.textSecondary}
        value={fullName}
        onChangeText={setFullName}
      />

      <TextInput
        style={globalStyles.input}
        placeholder="ID Number (13 digits) *"
        placeholderTextColor={colors.textSecondary}
        value={idNumber}
        onChangeText={(text) => setIdNumber(numericOnly(text))}
        keyboardType="number-pad"
        maxLength={13}
      />

      <TextInput
        style={globalStyles.input}
        placeholder="Phone Number *"
        placeholderTextColor={colors.textSecondary}
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(numericOnly(text))}
        keyboardType="phone-pad"
        maxLength={10}
      />

      <TextInput
        style={globalStyles.input}
        placeholder="Village/Town *"
        placeholderTextColor={colors.textSecondary}
        value={village}
        onChangeText={setVillage}
      />

      <TextInput
        style={globalStyles.input}
        placeholder="District"
        placeholderTextColor={colors.textSecondary}
        value={district}
        onChangeText={setDistrict}
      />

      <TextInput
        style={globalStyles.input}
        placeholder="Crop Type * (comma separated)"
        placeholderTextColor={colors.textSecondary}
        value={cropType}
        onChangeText={setCropType}
      />

      <TextInput
        style={globalStyles.input}
        placeholder="Farm Size (hectares)"
        placeholderTextColor={colors.textSecondary}
        value={farmSize}
        onChangeText={setFarmSize}
        keyboardType="decimal-pad"
      />

      <TouchableOpacity style={[globalStyles.button, isSubmitting && styles.disabledButton]} onPress={handleRegister} disabled={isSubmitting}>
        <Text style={globalStyles.buttonText}>{isSubmitting ? 'Registering...' : 'Register Farmer'}</Text>
      </TouchableOpacity>

      <View style={styles.gpsInfo}>
        <Ionicons name="location-outline" size={16} color={colors.textSecondary} />
        <Text style={styles.gpsText}>GPS coordinates are simulated in mock mode and can be replaced by native capture later.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  disabledButton: {
    opacity: 0.6,
  },
  gpsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
    padding: 12,
    backgroundColor: colors.surface,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  gpsText: {
    color: colors.textSecondary,
    fontSize: 12,
    flex: 1,
  },
});
