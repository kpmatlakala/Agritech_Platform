import { useState, useCallback, useEffect } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useAgentStore } from '@/store/useAgentStore';
import { useAuthStore } from '@/store/useAuthStore';
import { Screen } from '@/components/ui/Screen';
import { TextField } from '@/components/ui/TextField';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { theme } from '@/constants/theme';
import type { Farmer } from '@/types';

export default function FarmerDetailScreen() {
  const router = useRouter();
  const { farmerId } = useLocalSearchParams<{ farmerId: string }>();
  const { agent } = useAuthStore();
  const { selectedFarmer, getFarmerDetail, editFarmer, deleteFarmer, isLoading } = useAgentStore();

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<Farmer> | null>(null);

  useEffect(() => {
    if (farmerId) {
      getFarmerDetail(farmerId);
    }
  }, [farmerId, getFarmerDetail]);

  const handleEdit = useCallback(() => {
    setIsEditing(true);
    setEditData({
      full_name: selectedFarmer?.full_name,
      phone_number: selectedFarmer?.phone_number,
      village: selectedFarmer?.village,
      crop_types: selectedFarmer?.crop_types,
    });
  }, [selectedFarmer]);

  const handleSaveEdit = useCallback(async () => {
    if (!selectedFarmer || !editData) return;

    try {
      await editFarmer(selectedFarmer.farmer_id, {
        full_name: editData.full_name,
        phone_number: editData.phone_number,
        village: editData.village,
        crop_types: editData.crop_types,
      });
      Alert.alert('Success', 'Farmer updated successfully');
      setIsEditing(false);
      setEditData(null);
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'Failed to update farmer');
    }
  }, [selectedFarmer, editData, editFarmer]);

  const handleDelete = useCallback(() => {
    if (!selectedFarmer) return;

    Alert.alert(
      'Delete Farmer',
      `Are you sure you want to delete ${selectedFarmer.full_name}?`,
      [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              await deleteFarmer(selectedFarmer.farmer_id);
              Alert.alert('Success', 'Farmer deleted successfully');
              router.back();
            } catch (error) {
              Alert.alert('Error', error instanceof Error ? error.message : 'Failed to delete farmer');
            }
          },
          style: 'destructive',
        },
      ]
    );
  }, [selectedFarmer, deleteFarmer, router]);

  if (!selectedFarmer) {
    return (
      <Screen>
        <Text style={styles.loadingText}>Loading farmer details...</Text>
      </Screen>
    );
  }

  const statusColor =
    selectedFarmer.status === 'active' ? '#10b981' :
    selectedFarmer.status === 'pending' ? '#f59e0b' :
    '#6b7280';

  return (
    <ScrollView style={styles.container}>
      <Screen>
        {/* Header with Photo & Status */}
        <View style={styles.header}>
          {selectedFarmer.photo_url && (
            <Image
              source={{ uri: selectedFarmer.photo_url }}
              style={styles.photo}
            />
          )}
          {!selectedFarmer.photo_url && (
            <View style={styles.photoPlaceholder}>
              <Text style={styles.photoPlaceholderText}>👨‍🌾</Text>
            </View>
          )}
          <View style={styles.headerInfo}>
            <Text style={styles.farmerId}>{selectedFarmer.farmer_id}</Text>
            <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
              <Text style={styles.statusText}>{selectedFarmer.status}</Text>
            </View>
          </View>
        </View>

        {/* Farmer Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Farmer Information</Text>

          {isEditing ? (
            <>
              <TextField
                label="Full Name"
                value={editData?.full_name || ''}
                onChangeText={(v) => setEditData({ ...editData, full_name: v })}
              />
              <TextField
                label="Phone Number"
                value={editData?.phone_number || ''}
                onChangeText={(v) => setEditData({ ...editData, phone_number: v })}
              />
              <TextField
                label="Village"
                value={editData?.village || ''}
                onChangeText={(v) => setEditData({ ...editData, village: v })}
              />
              <TextField
                label="Crop Types (comma-separated)"
                value={editData?.crop_types?.join(', ') || ''}
                onChangeText={(v) => setEditData({
                  ...editData,
                  crop_types: v.split(',').map(c => c.trim()).filter(Boolean),
                })}
              />
            </>
          ) : (
            <>
              <InfoRow label="Full Name" value={selectedFarmer.full_name} />
              <InfoRow label="ID Number" value={selectedFarmer.id_number} />
              <InfoRow label="Phone Number" value={selectedFarmer.phone_number} />
              <InfoRow label="Village" value={selectedFarmer.village} />
              {selectedFarmer.crop_types && selectedFarmer.crop_types.length > 0 && (
                <InfoRow label="Crops" value={selectedFarmer.crop_types.join(', ')} />
              )}
            </>
          )}
        </View>

        {/* Location & Media */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location & Media</Text>
          {selectedFarmer.latitude && selectedFarmer.longitude && (
            <InfoRow
              label="GPS Coordinates"
              value={`${selectedFarmer.latitude.toFixed(4)}, ${selectedFarmer.longitude.toFixed(4)}`}
            />
          )}
          {selectedFarmer.gps_accuracy && (
            <InfoRow
              label="GPS Accuracy"
              value={`±${selectedFarmer.gps_accuracy.toFixed(1)}m`}
            />
          )}
        </View>

        {/* Agent & Timeline */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Timeline</Text>
          <InfoRow label="Registered By" value={selectedFarmer.created_by || 'Unknown'} />
          {selectedFarmer.created_at && (
            <InfoRow label="Registered On" value={new Date(selectedFarmer.created_at).toLocaleDateString()} />
          )}
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          {isEditing ? (
            <>
              <PrimaryButton
                label={isLoading ? 'Saving...' : 'Save Changes'}
                onPress={handleSaveEdit}
                disabled={isLoading}
              />
              <PrimaryButton
                label="Cancel"
                onPress={() => {
                  setIsEditing(false);
                  setEditData(null);
                }}
                style={styles.secondaryButton}
              />
            </>
          ) : (
            <>
              <PrimaryButton
                label="Edit"
                onPress={handleEdit}
              />
              <PrimaryButton
                label="Delete"
                onPress={handleDelete}
                style={styles.dangerButton}
              />
            </>
          )}
        </View>

        <View style={styles.spacer} />
      </Screen>
    </ScrollView>
  );
}

interface InfoRowProps {
  label: string;
  value: string;
}

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  loadingText: {
    fontSize: 16,
    color: theme.colors.muted,
    textAlign: 'center',
    marginTop: theme.spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  photo: {
    width: 80,
    height: 80,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.card,
  },
  photoPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoPlaceholderText: {
    fontSize: 40,
  },
  headerInfo: {
    flex: 1,
    justifyContent: 'flex-start',
    gap: theme.spacing.sm,
  },
  farmerId: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text,
  },
  statusBadge: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.radius.full,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
    textTransform: 'capitalize',
  },
  section: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.card,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.muted,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.text,
  },
  actions: {
    marginBottom: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  secondaryButton: {
    backgroundColor: theme.colors.card,
  },
  dangerButton: {
    backgroundColor: '#ef4444',
  },
  spacer: {
    height: theme.spacing.lg,
  },
});
