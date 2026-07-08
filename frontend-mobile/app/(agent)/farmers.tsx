import { useState, useCallback, useMemo } from 'react';
import { Alert, FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useAgentStore } from '@/store/useAgentStore';
import { useAuthStore } from '@/store/useAuthStore';
import { Screen } from '@/components/ui/Screen';
import { TextField } from '@/components/ui/TextField';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { theme } from '@/constants/theme';
import type { Farmer } from '@/types';

interface FarmerCardProps {
  farmer: Farmer;
  onPress: (farmer: Farmer) => void;
}

function FarmerCard({ farmer, onPress }: FarmerCardProps) {
  const statusColor =
    farmer.status === 'active' ? '#10b981' :
    farmer.status === 'pending' ? '#f59e0b' :
    '#6b7280';

  return (
    <PrimaryButton
      label={`${farmer.full_name} (${farmer.farmer_id})`}
      onPress={() => onPress(farmer)}
      style={styles.farmerCard}
    >
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.farmerName}>{farmer.full_name}</Text>
          <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
            <Text style={styles.statusText}>{farmer.status}</Text>
          </View>
        </View>
        <Text style={styles.farmerId}>{farmer.farmer_id}</Text>
        <Text style={styles.village}>{farmer.village}</Text>
        {farmer.crop_types && farmer.crop_types.length > 0 && (
          <Text style={styles.crops}>{farmer.crop_types.join(', ')}</Text>
        )}
      </View>
    </PrimaryButton>
  );
}

export default function FarmersListScreen() {
  const router = useRouter();
  const { agent } = useAuthStore();
  const { farmers, fetchFarmers, isLoading, stats } = useAgentStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'pending' | 'inactive'>('all');
  const [refreshing, setRefreshing] = useState(false);

  // Filter farmers based on search and status
  const filteredFarmers = useMemo(() => {
    return farmers.filter(farmer => {
      const matchesSearch =
        !searchQuery ||
        farmer.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        farmer.farmer_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        farmer.village.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || farmer.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [farmers, searchQuery, statusFilter]);

  const handleRefresh = useCallback(async () => {
    if (!agent) return;
    setRefreshing(true);
    try {
      await fetchFarmers(agent.agent_id);
    } catch (error) {
      Alert.alert('Error', 'Failed to refresh farmers list');
    } finally {
      setRefreshing(false);
    }
  }, [agent, fetchFarmers]);

  const handleFarmerPress = useCallback((farmer: Farmer) => {
    router.push({
      pathname: '/(agent)/farmer-detail',
      params: { farmerId: farmer.farmer_id },
    });
  }, [router]);

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateIcon}>🌾</Text>
      <Text style={styles.emptyStateTitle}>
        {searchQuery || statusFilter !== 'all'
          ? 'No farmers found'
          : 'No farmers registered yet'}
      </Text>
      <Text style={styles.emptyStateDesc}>
        {searchQuery || statusFilter !== 'all'
          ? 'Try adjusting your search or filter'
          : 'Register a new farmer to get started'}
      </Text>
    </View>
  );

  return (
    <Screen>
      {/* Stats Summary */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{stats.total}</Text>
          <Text style={styles.statLabel}>Total</Text>
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

      {/* Search & Filter */}
      <TextField
        label="Search"
        placeholder="Name, ID, or village..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <View style={styles.filterContainer}>
        {(['all', 'active', 'pending', 'inactive'] as const).map(status => (
          <PrimaryButton
            key={status}
            label={status.charAt(0).toUpperCase() + status.slice(1)}
            onPress={() => setStatusFilter(status)}
            style={[
              styles.filterButton,
              statusFilter === status && styles.filterButtonActive,
            ]}
          />
        ))}
      </View>

      {/* Farmers List */}
      <FlatList
        data={filteredFarmers}
        keyExtractor={(item) => item.farmer_id}
        renderItem={({ item }) => (
          <FarmerCard farmer={item} onPress={handleFarmerPress} />
        )}
        ListEmptyComponent={renderEmptyState}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={theme.colors.primary}
          />
        }
        scrollEnabled
        nestedScrollEnabled
        contentContainerStyle={styles.listContent}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
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
    fontSize: 12,
    color: theme.colors.muted,
    marginTop: theme.spacing.xs,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: theme.spacing.lg,
    gap: theme.spacing.sm,
    justifyContent: 'space-between',
  },
  filterButton: {
    flex: 1,
    paddingVertical: theme.spacing.xs,
    backgroundColor: theme.colors.card,
  },
  filterButtonActive: {
    backgroundColor: theme.colors.primary,
  },
  farmerCard: {
    marginBottom: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    alignItems: 'flex-start',
  },
  cardContent: {
    width: '100%',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  farmerName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.radius.full,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#fff',
    textTransform: 'capitalize',
  },
  farmerId: {
    fontSize: 12,
    fontWeight: '500',
    color: theme.colors.muted,
    marginBottom: theme.spacing.xs,
  },
  village: {
    fontSize: 13,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  crops: {
    fontSize: 11,
    color: '#6b7280',
    fontStyle: 'italic',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyStateIcon: {
    fontSize: 48,
    marginBottom: theme.spacing.md,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  emptyStateDesc: {
    fontSize: 14,
    color: theme.colors.muted,
    textAlign: 'center',
  },
  listContent: {
    flexGrow: 1,
  },
});
