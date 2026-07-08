import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/styles/global';
import type { FarmerSummaryStats } from '@/types';

type FarmerStatsProps = {
  stats: FarmerSummaryStats;
};

export default function FarmerStats({ stats }: FarmerStatsProps) {
  const items = [
    { label: 'Total', value: stats.total, color: colors.secondary },
    { label: 'Active', value: stats.active, color: colors.success },
    { label: 'Pending', value: stats.pending, color: colors.warning },
    { label: 'Villages', value: stats.villages, color: colors.primary },
  ];

  return (
    <View style={styles.grid}>
      {items.map((item) => (
        <View key={item.label} style={[styles.card, { borderLeftColor: item.color }]}>
          <Text style={styles.value}>{item.value}</Text>
          <Text style={styles.label}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 16,
    marginBottom: 6,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 10,
    width: '23%',
    borderLeftWidth: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  value: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  label: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
});
