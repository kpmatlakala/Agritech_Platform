import { useMemo } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { getStats } from '@/data/mockData';
import { colors, globalStyles } from '@/styles/global';
import { useFarmerStore } from '@/store/useFarmerStore';

export default function ProfileScreen() {
  const farmers = useFarmerStore((state) => state.farmers);
  const clearFarmers = useFarmerStore((state) => state.clearFarmers);
  const resetMockData = useFarmerStore((state) => state.resetMockData);
  const markSyncedNow = useFarmerStore((state) => state.markSyncedNow);
  const lastSync = useFarmerStore((state) => state.lastSync);

  const stats = useMemo(() => getStats(farmers), [farmers]);

  const handleSync = () => {
    markSyncedNow();
    Alert.alert('Sync Complete', 'Mock records marked as synced.');
  };

  const handleClearData = () => {
    Alert.alert('Clear Data', 'Remove all farmer records from this mock session?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Clear',
        style: 'destructive',
        onPress: () => clearFarmers(),
      },
    ]);
  };

  const handleReset = () => {
    Alert.alert('Restore Seed Data', 'Repopulate default demo records from mock data?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Restore',
        onPress: () => resetMockData(),
      },
    ]);
  };

  return (
    <ScrollView style={globalStyles.container} showsVerticalScrollIndicator={false}>
      <Text style={globalStyles.title}>Profile</Text>
      <Text style={globalStyles.subtitle}>Admin-facing mock controls for the mobile design phase</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Registration Snapshot</Text>
        <StatRow label="Total Farmers" value={stats.total} />
        <StatRow label="Active" value={stats.active} />
        <StatRow label="Pending" value={stats.pending} />
        <StatRow label="Villages" value={stats.villages} />
        <StatRow label="Districts" value={stats.districts} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Actions</Text>
        <TouchableOpacity style={styles.actionButton} onPress={handleSync}>
          <Ionicons name="sync-outline" size={20} color={colors.secondary} />
          <Text style={styles.actionText}>Sync Data</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleReset}>
          <Ionicons name="refresh-outline" size={20} color={colors.primary} />
          <Text style={[styles.actionText, { color: colors.primary }]}>Restore Default Mock Data</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButtonDanger} onPress={handleClearData}>
          <Ionicons name="trash-outline" size={20} color={colors.alert} />
          <Text style={styles.actionTextDanger}>Clear All Farmer Data</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Info</Text>
        <StatRow label="Version" value="1.0.0" />
        <StatRow label="Environment" value="Development (Mock Data)" />
        <StatRow
          label="Last Sync"
          value={lastSync ? new Date(lastSync).toLocaleString('en-ZA') : 'Not synced yet'}
        />
      </View>
    </ScrollView>
  );
}

type StatRowProps = {
  label: string;
  value: number | string;
};

function StatRow({ label, value }: StatRowProps) {
  return (
    <View style={styles.statRow}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 22,
    padding: 14,
    borderRadius: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  statLabel: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  statValue: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
    flexShrink: 1,
    textAlign: 'right',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 14,
    backgroundColor: '#f4f8f3',
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  actionButtonDanger: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 14,
    backgroundColor: '#fff5f5',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ffd6d6',
  },
  actionText: {
    color: colors.secondary,
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  actionTextDanger: {
    color: colors.alert,
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
});
