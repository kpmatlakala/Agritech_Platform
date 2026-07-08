import { useState, useCallback } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/store/useAuthStore';
import { useAgentStore } from '@/store/useAgentStore';
import { Screen } from '@/components/ui/Screen';
import { TextField } from '@/components/ui/TextField';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { theme } from '@/constants/theme';

export default function AgentProfileScreen() {
  const router = useRouter();
  const { user, agent, logout } = useAuthStore();
  const { stats } = useAgentStore();

  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(agent?.full_name || '');

  const handleSaveProfile = useCallback(async () => {
    // TODO: Implement profile update in API
    Alert.alert('Info', 'Profile update endpoint coming soon');
    setIsEditing(false);
  }, [fullName]);

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

  if (!agent) {
    return (
      <Screen>
        <Text style={styles.loadingText}>Loading profile...</Text>
      </Screen>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Screen>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>👨‍💼</Text>
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.agentName}>{agent.full_name}</Text>
            <Text style={styles.agentId}>{agent.agent_id}</Text>
            {agent.active && <Text style={styles.activeStatus}>✓ Active</Text>}
          </View>
        </View>

        {/* Stats Summary */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{stats.total}</Text>
            <Text style={styles.statLabel}>Total Farmers</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={[styles.statValue, { color: '#10b981' }]}>{stats.active}</Text>
            <Text style={styles.statLabel}>Active</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={[styles.statValue, { color: '#f59e0b' }]}>{stats.pending}</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
        </View>

        {/* Account Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Information</Text>

          {isEditing ? (
            <>
              <TextField
                label="Full Name"
                value={fullName}
                onChangeText={setFullName}
              />
              <TextField
                label="Phone Number"
                value={user?.phone_number || ''}
                editable={false}
              />
              <TextField
                label="Agent ID"
                value={agent.agent_id}
                editable={false}
              />
            </>
          ) : (
            <>
              <InfoRow label="Full Name" value={agent.full_name} />
              <InfoRow label="Phone Number" value={user?.phone_number || 'Not set'} />
              <InfoRow label="Agent ID" value={agent.agent_id} />
              <InfoRow label="Role" value="Agricultural Agent" />
            </>
          )}
        </View>

        {/* Support Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support & Settings</Text>
          <InfoRow label="App Version" value="1.0.0" />
          <InfoRow label="Language" value="English" />
          <InfoRow label="Theme" value="Light" />
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          {isEditing ? (
            <>
              <PrimaryButton
                label="Save Changes"
                onPress={handleSaveProfile}
              />
              <PrimaryButton
                label="Cancel"
                onPress={() => {
                  setFullName(agent.full_name);
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
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 40,
  },
  headerInfo: {
    flex: 1,
  },
  agentName: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  agentId: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.muted,
    marginBottom: theme.spacing.xs,
  },
  activeStatus: {
    fontSize: 13,
    fontWeight: '600',
    color: '#10b981',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  statBox: {
    flex: 1,
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  statLabel: {
    fontSize: 11,
    color: theme.colors.muted,
    marginTop: theme.spacing.xs,
    textAlign: 'center',
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
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.sm,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.muted,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
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
