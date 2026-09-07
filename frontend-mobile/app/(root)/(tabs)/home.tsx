import { Ionicons } from '@expo/vector-icons';
import { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';

import FarmerCard from '@/components/FarmerCard';
import FarmerStats from '@/components/FarmerStats';
import { getRecentFarmers, getStats } from '@/data/mockData';
import { colors, globalStyles } from '@/styles/global';
import { useFarmerStore } from '@/store/useFarmerStore';

export default function HomeScreen() {
  const router = useRouter();
  const farmers = useFarmerStore((state) => state.farmers);

  const stats = useMemo(() => getStats(farmers), [farmers]);
  const recentFarmers = useMemo(() => getRecentFarmers(farmers, 5), [farmers]);

  return (
    <ScrollView style={globalStyles.container} showsVerticalScrollIndicator={false}>
      <View style={globalStyles.header}>
        <View>
          <Text style={globalStyles.title}>AFAP Field</Text>
          <Text style={globalStyles.subtitle}>Farmer registration and profiling made practical</Text>
        </View>
        <TouchableOpacity style={styles.iconButton} activeOpacity={0.85}>
          <Ionicons name="notifications-outline" size={22} color={colors.accent} />
        </TouchableOpacity>
      </View>

      <View style={styles.heroCard}>
        <View style={styles.heroHeader}>
          <Text style={styles.heroLabel}>Today</Text>
          <Text style={styles.heroPill}>Mock Mode</Text>
        </View>
        <Text style={styles.heroTitle}>Field operations are on track.</Text>
        <Text style={styles.heroSubtitle}>
          You can continue onboarding farmers safely while backend integration is in progress.
        </Text>
      </View>

      <View style={styles.contextBanner}>
        <Ionicons name="cloud-offline-outline" size={16} color={colors.secondary} />
        <Text style={styles.contextText}>Offline-safe data mode enabled for design validation</Text>
      </View>

      <FarmerStats stats={stats} />

      <View style={globalStyles.header}>
        <Text style={globalStyles.sectionTitle}>Recent Registrations</Text>
        <TouchableOpacity onPress={() => router.push('/(root)/farmer-list')}>
          <Text style={styles.link}>View All</Text>
        </TouchableOpacity>
      </View>

      {recentFarmers.length === 0 ? (
        <Text style={globalStyles.empty}>No farmers registered yet.</Text>
      ) : (
        recentFarmers.map((farmer) => <FarmerCard key={farmer.id} farmer={farmer} />)
      )}

      <Text style={globalStyles.sectionTitle}>Quick Actions</Text>
      <View style={styles.quickGrid}>
        <QuickAction
          icon="add-circle-outline"
          label="Register"
          color={colors.primary}
          onPress={() => router.push('/(root)/(tabs)/register')}
        />
        <QuickAction
          icon="list-outline"
          label="Farmer List"
          color={colors.secondary}
          onPress={() => router.push('/(root)/farmer-list')}
        />
        <QuickAction
          icon="person-circle-outline"
          label="Profile"
          color={colors.warning}
          onPress={() => router.push('/(root)/(tabs)/profile')}
        />
      </View>
    </ScrollView>
  );
}

type QuickActionProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  color: string;
  onPress: () => void;
};

function QuickAction({ icon, label, color, onPress }: QuickActionProps) {
  return (
    <TouchableOpacity style={styles.quickAction} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.quickIconWrap}>
        <Ionicons name={icon} size={24} color={color} />
      </View>
      <Text style={styles.quickLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  heroCard: {
    marginTop: 16,
    padding: 16,
    borderRadius: 18,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroLabel: {
    color: colors.secondary,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  heroPill: {
    backgroundColor: colors.header,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    fontSize: 11,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  heroTitle: {
    marginTop: 12,
    color: colors.text,
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.4,
  },
  heroSubtitle: {
    marginTop: 8,
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 21,
  },
  contextBanner: {
    marginTop: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  contextText: {
    color: colors.textSecondary,
    flex: 1,
    fontSize: 12,
  },
  link: {
    color: colors.accent,
    fontSize: 14,
    fontWeight: '600',
  },
  quickGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 30,
  },
  quickAction: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 14,
    alignItems: 'center',
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 8,
  },
  quickIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.header,
  },
  quickLabel: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '700',
  },
});
