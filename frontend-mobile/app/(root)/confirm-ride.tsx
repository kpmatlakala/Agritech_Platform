import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { Screen } from '@/components/ui/Screen';
import { theme } from '@/constants/theme';

export default function ConfirmRideScreen() {
  const router = useRouter();

  return (
    <Screen contentStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Confirm Demo Input Request</Text>
        <Text style={styles.detail}>Input: Maize seed</Text>
        <Text style={styles.detail}>Quantity: 20 bags</Text>
        <Text style={styles.detail}>Estimated delivery window: 3-5 days</Text>
      </View>

      <PrimaryButton label="Done" onPress={() => router.replace('/(root)/(tabs)/rides')} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
  card: {
    marginTop: 80,
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  title: {
    color: theme.colors.text,
    fontSize: 24,
    fontWeight: '800',
  },
  detail: {
    color: theme.colors.muted,
    fontSize: 15,
  },
});
