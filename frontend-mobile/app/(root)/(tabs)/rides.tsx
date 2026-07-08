import { StyleSheet, Text, View } from 'react-native';

import { Screen } from '@/components/ui/Screen';
import { theme } from '@/constants/theme';

const mockActivities = [
  { id: 'a1', item: 'Input Request: Maize Seed', detail: '20 bags for August planting', status: 'Approved' },
  { id: 'a2', item: 'Weather Advisory', detail: 'Heavy rainfall alert for your zone', status: 'Sent' },
  { id: 'a3', item: 'Crop Monitoring Visit', detail: 'Field check planned with local CBA', status: 'Upcoming' },
];

export default function RidesScreen() {
  return (
    <Screen scroll>
      <Text style={styles.title}>Your Demo Activities</Text>
      {mockActivities.map((activity) => (
        <View key={activity.id} style={styles.card}>
          <Text style={styles.route}>{activity.item}</Text>
          <Text style={styles.detail}>{activity.detail}</Text>
          <Text style={styles.status}>{activity.status}</Text>
        </View>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  card: {
    backgroundColor: theme.colors.card,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    gap: theme.spacing.xs,
  },
  route: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  detail: {
    color: theme.colors.muted,
    fontSize: 14,
  },
  status: {
    color: theme.colors.muted,
    fontSize: 14,
  },
});
