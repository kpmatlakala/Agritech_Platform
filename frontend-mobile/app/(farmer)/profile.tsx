import { useState, useCallback } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/store/useAuthStore';
import { useFarmerProfileStore } from '@/store/useFarmerStore';
import { Screen } from '@/components/ui/Screen';
import { TextField } from '@/components/ui/TextField';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { theme } from '@/constants/theme';
import { apiClient } from '@/utils/api';

export default function FarmerProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { profile, updateProfile, isLoading, fetchProfile } = useFarmerProfileStore();

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    full_name: profile?.full_name || '',
    phone_number: profile?.phone_number || '',
    village: profile?.village || '',
    crop_types: profile?.crop_types?.join(', ') || '',
  });

  const handleSaveProfile = useCallback(async () => {
    try {
      const updatePayload = {
        full_name: editData.full_name,
        phone_number: editData.phone_number,
        village: editData.village,
        crop_types: editData.crop_types
          .split(',')
          .map(c => c.trim())
          .filter(Boolean),
      };

      // Call the API directly (no backend endpoint exists yet, will be stubbed)
      // await apiClient.updateOwnProfile(updatePayload);
      
      Alert.alert('Info', 'Profile update endpoint coming soon');
      setIsEditing(false);
      // await fetchProfile(); // Refresh after update
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'Failed to update profile');
    }
  }, [editData, updateProfile]);

  const handleLogout = useCallback(() => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          onPress: async () => {
            try {
              await logout();
              router.replace('/(auth)/login');
            } catch (error) {
              Alert.alert('Error', 'Failed to logout');
            }
          },
          style: 'destructive',
        },
      ]
    );
  }, [logout, router]);

  if (!profile) {
    return (
      <Screen>
        <Text style={styles.loadingText}>Loading your profile...</Text>
      </Screen>
    );
  }

  const statusColor =
    profile.status === 'active' ? '#10b981' :
    profile.status === 'pending' ? '#f59e0b' :
    '#6b7280';

  return (
    <ScrollView style={styles.container}>
      <Screen>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>👨‍🌾</Text>
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.farmerName}>{profile.full_name}</Text>
            <Text style={styles.farmerId}>{profile.farmer_id}</Text>
            <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
              <Text style={styles.statusText}>{profile.status}</Text>
            </View>
          </View>
        </View>

        {/* Personal Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>

          {isEditing ? (
            <>
              <TextField
                label="Full Name"
                value={editData.full_name}
                onChangeText={(v) => setEditData({ ...editData, full_name: v })}
              />
              <TextField
                label="Phone Number"
                value={editData.phone_number}
                onChangeText={(v) => setEditData({ ...editData, phone_number: v })}
              />
              <TextField
                label="Village"
                value={editData.village}
                onChangeText={(v) => setEditData({ ...editData, village: v })}
              />
              <TextField
                label="Crop Types (comma-separated)"
                value={editData.crop_types}
                onChangeText={(v) => setEditData({ ...editData, crop_types: v })}
              />
            </>
          ) : (
            <>
              <InfoRow label="Full Name" value={profile.full_name} />
              <InfoRow label="ID Number" value={profile.id_number} />
              <InfoRow label="Phone Number" value={profile.phone_number} />
              <InfoRow label="Farmer ID" value={profile.farmer_id} />
            </>
          )}
        </View>

        {/* Farm Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Farm Information</Text>

          {isEditing ? null : (
            <>
              <InfoRow label="Village" value={profile.village} />
              {profile.crop_types && profile.crop_types.length > 0 && (
                <InfoRow label="Crops" value={profile.crop_types.join(', ')} />
              )}
              {profile.farm_size_ha && (
                <InfoRow label="Farm Size" value={`${profile.farm_size_ha} ha`} />
              )}
            </>
          )}
        </View>

        {/* Agent Information */}
        {profile.created_by && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Agent Support</Text>
            <InfoRow label="Agent ID" value={profile.created_by} />
            <Text style={styles.agentNote}>
              Your agent supports you with farm management and advisory services
            </Text>
          </View>
        )}

        {/* Location & Media */}
        {(profile.latitude || profile.longitude) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Location</Text>
            {profile.latitude && profile.longitude && (
              <InfoRow
                label="GPS Coordinates"
                value={`${profile.latitude.toFixed(4)}, ${profile.longitude.toFixed(4)}`}
              />
            )}
            {profile.gps_accuracy && (
              <InfoRow label="GPS Accuracy" value={`±${profile.gps_accuracy.toFixed(1)}m`} />
            )}
          </View>
        )}

        {/* Timeline */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Timeline</Text>
          {profile.created_at && (
            <InfoRow
              label="Joined"
              value={new Date(profile.created_at).toLocaleDateString()}
            />
          )}
          <InfoRow label="Status" value={profile.status} />
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          {isEditing ? (
            <>
              <PrimaryButton
                label={isLoading ? 'Saving...' : 'Save Changes'}
                onPress={handleSaveProfile}
                disabled={isLoading}
              />
              <PrimaryButton
                label="Cancel"
                onPress={() => {
                  setEditData({
                    full_name: profile.full_name,
                    phone_number: profile.phone_number,
                    village: profile.village,
                    crop_types: profile.crop_types?.join(', ') || '',
                  });
                  setIsEditing(false);
                }}
                style={styles.secondaryButton}
              />
            </>
          ) : (
            <>
              <PrimaryButton
                label="Edit Profile"
                onPress={() => setIsEditing(true)}
              />
              <PrimaryButton
                label="Logout"
                onPress={handleLogout}
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
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 40,
  },
  headerInfo: {
    flex: 1,
  },
  farmerName: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  farmerId: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.muted,
    marginBottom: theme.spacing.xs,
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
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
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
    borderBottomColor: '#e5e7eb',
  },
  infoLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: theme.colors.muted,
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.text,
  },
  agentNote: {
    fontSize: 12,
    color: theme.colors.muted,
    fontStyle: 'italic',
    marginTop: theme.spacing.sm,
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
