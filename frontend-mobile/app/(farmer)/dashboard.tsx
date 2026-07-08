import { useState, useCallback, useEffect } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFarmerProfileStore } from '@/store/useFarmerStore';
import { useAuthStore } from '@/store/useAuthStore';
import { Screen } from '@/components/ui/Screen';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { theme } from '@/constants/theme';
import type { Farmer } from '@/types';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  color?: string;
}

function StatCard({ title, value, icon, color }: StatCardProps) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statIcon}>{icon}</Text>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
    </View>
  );
}

interface ActionButtonProps {
  label: string;
  icon: string;
  onPress: () => void;
}

function ActionButton({ label, icon, onPress }: ActionButtonProps) {
  return (
    <PrimaryButton
      label={`${icon} ${label}`}
      onPress={onPress}
      style={styles.actionButton}
    />
  );
}

export default function FarmerDashboardScreen() {
  const { user } = useAuthStore();
  const { profile, isLoading, fetchProfile } = useFarmerProfileStore();

  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    // Load profile on mount
    fetchProfile();

    // Set greeting based on time of day
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Good Morning');
    } else if (hour < 18) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }
  }, [fetchProfile]);

  const handleRefreshProfile = useCallback(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleViewAdvisory = useCallback(() => {
    // Navigation handled by tab system
    Alert.alert('Navigate', 'See Advisory tab for recommendations');
  }, []);

  const handleUpdateProfile = useCallback(() => {
    Alert.alert('Info', 'Edit profile from Profile tab');
  }, []);

  if (!profile && !isLoading) {
    return (
      <Screen>
        <Text style={styles.loadingText}>Loading your farm information...</Text>
      </Screen>
    );
  }

  const farmerName = profile?.full_name || user?.phone_number || 'Farmer';

  return (
    <ScrollView style={styles.container}>
      <Screen>
        {/* Greeting & Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{greeting}! 👋</Text>
            <Text style={styles.farmerName}>{farmerName}</Text>
          </View>
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>🌾</Text>
          </View>
        </View>

        {/* Farm Overview */}
        {profile && (
          <>
            {/* Primary Stats */}
            <View style={styles.statsGrid}>
              <StatCard
                title="Farmer ID"
                value={profile.farmer_id}
                icon="🆔"
                color={theme.colors.primary}
              />
              <StatCard
                title="Status"
                value={profile.status}
                icon="✓"
                color={profile.status === 'active' ? '#10b981' : '#f59e0b'}
              />
              <StatCard
                title="Crops"
                value={profile.crop_types?.length || 0}
                icon="🌽"
              />
            </View>

            {/* Farm Information Card */}
            <View style={styles.infoCard}>
              <Text style={styles.cardTitle}>🏡 Farm Information</Text>
              <InfoRow label="Village" value={profile.village} />
              {profile.crop_types && profile.crop_types.length > 0 && (
                <InfoRow label="Crops" value={profile.crop_types.join(', ')} />
              )}
              {profile.latitude && profile.longitude && (
                <InfoRow
                  label="Location"
                  value={`${profile.latitude.toFixed(4)}, ${profile.longitude.toFixed(4)}`}
                />
              )}
            </View>

            {/* Agent Information Card */}
            {profile.created_by && (
              <View style={styles.infoCard}>
                <Text style={styles.cardTitle}>👨‍💼 Your Agent</Text>
                <InfoRow label="Agent ID" value={profile.created_by} />
                <Text style={styles.agentNote}>Your agent manages your farm profile and provides support</Text>
              </View>
            )}
          </>
        )}

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.quickActionsTitle}>Quick Actions</Text>
          <ActionButton
            label="View Advisory"
            icon="💡"
            onPress={handleViewAdvisory}
          />
          <ActionButton
            label="Refresh Data"
            icon="🔄"
            onPress={handleRefreshProfile}
          />
          <ActionButton
            label="Edit Profile"
            icon="✏️"
            onPress={handleUpdateProfile}
          />
        </View>

        {/* Tips Section */}
        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>💡 Today's Tips</Text>
          <TipItem text="Check weather forecast before planning irrigation" />
          <TipItem text="Monitor crops for pests regularly during growing season" />
          <TipItem text="Keep farm records for better decision making" />
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

interface TipItemProps {
  text: string;
}

function TipItem({ text }: TipItemProps) {
  return (
    <View style={styles.tipItem}>
      <Text style={styles.tipBullet}>•</Text>
      <Text style={styles.tipText}>{text}</Text>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  greeting: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.muted,
    marginBottom: theme.spacing.xs,
  },
  farmerName: {
    fontSize: 22,
    fontWeight: '700',
    color: theme.colors.text,
  },
  avatarPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 32,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
  },
  statCard: {
    flex: 1,
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 24,
    marginBottom: theme.spacing.xs,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  statTitle: {
    fontSize: 11,
    color: theme.colors.muted,
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  cardTitle: {
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
  quickActionsContainer: {
    marginBottom: theme.spacing.lg,
  },
  quickActionsTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  actionButton: {
    marginBottom: theme.spacing.sm,
  },
  tipsCard: {
    backgroundColor: '#fef3c7',
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#92400e',
    marginBottom: theme.spacing.md,
  },
  tipItem: {
    flexDirection: 'row',
    marginBottom: theme.spacing.sm,
  },
  tipBullet: {
    fontSize: 14,
    fontWeight: '600',
    color: '#92400e',
    marginRight: theme.spacing.sm,
  },
  tipText: {
    fontSize: 13,
    color: '#92400e',
    flex: 1,
    lineHeight: 18,
  },
  spacer: {
    height: theme.spacing.lg,
  },
});
