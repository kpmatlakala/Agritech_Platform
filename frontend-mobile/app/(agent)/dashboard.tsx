import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useAgentStore } from '@/store/useAgentStore';
import { useAuthStore } from '@/store/useAuthStore';
import { Screen } from '@/components/ui/Screen';
import { theme } from '@/constants/theme';

export default function AgentDashboardScreen() {
  const { agent } = useAuthStore();
  const { stats } = useAgentStore();

  return (
    <ScrollView style={styles.container}>
      <Screen>
        <Text style={styles.greeting}>Good morning, {agent?.full_name}! 👋</Text>
        <Text style={styles.subtitle}>You have {stats?.total || 0} farmers in your area</Text>

        <View style={styles.statsGrid}>
          <StatCard
            title="Total"
            value={stats?.total || 0}
            color={theme.colors.primary}
          />
          <StatCard
            title="Active"
            value={stats?.active || 0}
            color="#10b981"
          />
          <StatCard
            title="Pending"
            value={stats?.pending || 0}
            color="#f59e0b"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <ActionButton icon="➕" label="Register New Farmer" />
          <ActionButton icon="👥" label="View My Farmers" />
          <ActionButton icon="⚙️" label="Settings" />
        </View>
      </Screen>
    </ScrollView>
  );
}

function StatCard({ title, value, color }: { title: string; value: number; color: string }) {
  return (
    <View style={[styles.statCard, { borderLeftColor: color }]}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{title}</Text>
    </View>
  );
}

function ActionButton({ icon, label }: { icon: string; label: string }) {
  return (
    <View style={styles.actionButton}>
      <Text style={styles.actionIcon}>{icon}</Text>
      <Text style={styles.actionLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: 14,
    color: theme.colors.muted,
    marginBottom: theme.spacing.lg,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.xl,
  },
  statCard: {
    flex: 1,
    backgroundColor: theme.colors.card,
    borderLeftWidth: 4,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    color: theme.colors.text,
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.muted,
    marginTop: theme.spacing.xs,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  actionIcon: {
    fontSize: 24,
    marginRight: theme.spacing.md,
  },
  actionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
    flex: 1,
  },
});
