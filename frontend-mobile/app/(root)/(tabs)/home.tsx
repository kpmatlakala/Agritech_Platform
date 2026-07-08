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
          <Text style={globalStyles.subtitle}>Farmer registration and profiling</Text>
        </View>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="notifications-outline" size={22} color={colors.secondary} />
        </TouchableOpacity>
      </View>

      <View style={styles.contextBanner}>
        <Ionicons name="cloud-offline-outline" size={16} color={colors.secondary} />
        <Text style={styles.contextText}>Mock-data mode: safe for UX review before backend integration</Text>
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
      <Ionicons name={icon} size={28} color={color} />
      <Text style={styles.quickLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.header,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  contextBanner: {
    marginTop: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: colors.header,
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
    color: colors.secondary,
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
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 8,
  },
  quickLabel: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '600',
  },
});
