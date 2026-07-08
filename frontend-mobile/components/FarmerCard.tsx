import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { colors } from '@/styles/global';
import type { Farmer } from '@/types';

type FarmerCardProps = {
  farmer: Farmer;
};

export default function FarmerCard({ farmer }: FarmerCardProps) {
  const router = useRouter();

  const statusColor = {
    active: colors.success,
    pending: colors.warning,
    suspended: colors.alert,
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => router.push({ pathname: '/(root)/farmer/[id]', params: { id: farmer.id } })}
      activeOpacity={0.8}
    >
      <View style={styles.header}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{farmer.fullName}</Text>
          <View style={[styles.statusBadge, { backgroundColor: statusColor[farmer.status] }]}>
            <Text style={styles.statusText}>{farmer.status}</Text>
          </View>
        </View>
        <Text style={styles.id}>{farmer.farmerId}</Text>
      </View>

      <View style={styles.details}>
        <View style={styles.detailItem}>
          <Ionicons name="location-outline" size={14} color={colors.textSecondary} />
          <Text style={styles.detailText}>{farmer.village}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="call-outline" size={14} color={colors.textSecondary} />
          <Text style={styles.detailText}>{farmer.phoneNumber}</Text>
        </View>
      </View>

      {farmer.cropType.length > 0 ? (
        <View style={styles.cropContainer}>
          {farmer.cropType.map((crop) => (
            <View key={crop} style={styles.cropBadge}>
              <Text style={styles.cropText}>{crop}</Text>
            </View>
          ))}
        </View>
      ) : null}

      <View style={styles.footer}>
        <Text style={styles.date}>
          {new Date(farmer.registeredAt).toLocaleDateString('en-ZA', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </Text>
        <Text style={styles.via}>via {farmer.registeredVia}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#ffffff',
    textTransform: 'capitalize',
  },
  id: {
    fontSize: 12,
    color: colors.secondary,
    fontWeight: '600',
  },
  details: {
    marginTop: 8,
    gap: 4,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  cropContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 8,
  },
  cropBadge: {
    backgroundColor: '#edf6ee',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  cropText: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  date: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  via: {
    fontSize: 12,
    color: colors.textSecondary,
    textTransform: 'capitalize',
  },
});
