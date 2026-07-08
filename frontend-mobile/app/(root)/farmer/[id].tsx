import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { colors, globalStyles } from '@/styles/global';
import { useFarmerStore } from '@/store/useFarmerStore';

export default function FarmerDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const farmer = useFarmerStore((state) => state.farmers.find((entry) => entry.id === id));

  if (!farmer) {
    return (
      <View style={globalStyles.container}>
        <Text style={globalStyles.title}>Farmer Not Found</Text>
        <Text style={globalStyles.subtitle}>The selected profile may have been removed.</Text>
        <TouchableOpacity style={globalStyles.button} onPress={() => router.replace('/(root)/farmer-list')}>
          <Text style={globalStyles.buttonText}>Open Farmer List</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const statusColor = {
    active: colors.success,
    pending: colors.warning,
    suspended: colors.alert,
  };

  return (
    <ScrollView style={globalStyles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={globalStyles.title}>Farmer Details</Text>
      </View>

      <View style={styles.header}>
        <View>
          <Text style={styles.name}>{farmer.fullName}</Text>
          <Text style={styles.id}>{farmer.farmerId}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: statusColor[farmer.status] }]}>
          <Text style={styles.statusText}>{farmer.status}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Identity & Contact</Text>
        <Row icon="card-outline" text={farmer.idNumber} />
        <Row icon="call-outline" text={farmer.phoneNumber} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Location</Text>
        <Row icon="location-outline" text={`${farmer.village}${farmer.district ? `, ${farmer.district}` : ''}`} />
        <Row
          icon="map-outline"
          text={
            farmer.latitude && farmer.longitude
              ? `${farmer.latitude.toFixed(4)}, ${farmer.longitude.toFixed(4)} (GPS ±${farmer.gpsAccuracy ?? 'n/a'}m)`
              : 'GPS not captured'
          }
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Farming Profile</Text>
        <Row icon="leaf-outline" text={farmer.cropType.join(', ') || 'Not specified'} />
        <Row
          icon="resize-outline"
          text={farmer.farmSizeHa ? `${farmer.farmSizeHa} hectares` : 'Farm size pending'}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Registration</Text>
        <Row
          icon="calendar-outline"
          text={new Date(farmer.registeredAt).toLocaleString('en-ZA', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        />
        <Row icon="radio-outline" text={`via ${farmer.registeredVia}`} />
        <Row icon="person-outline" text={`Created by ${farmer.createdBy}`} />
      </View>

      <TouchableOpacity style={styles.editButton} onPress={() => router.push('/(root)/(tabs)/register')}>
        <Ionicons name="create-outline" size={20} color="#ffffff" />
        <Text style={styles.editButtonText}>Register Another Farmer</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

type RowProps = {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
};

function Row({ icon, text }: RowProps) {
  return (
    <View style={styles.row}>
      <Ionicons name={icon} size={18} color={colors.textSecondary} />
      <Text style={styles.rowText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 18,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  name: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
  },
  id: {
    fontSize: 14,
    color: colors.secondary,
    marginTop: 4,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ffffff',
    textTransform: 'capitalize',
  },
  section: {
    marginTop: 20,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textSecondary,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 6,
  },
  rowText: {
    color: colors.text,
    fontSize: 14,
    flex: 1,
  },
  editButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 14,
    borderRadius: 12,
    marginTop: 24,
    marginBottom: 32,
  },
  editButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});
