import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { Screen } from '@/components/ui/Screen';
import { theme } from '@/constants/theme';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <Screen contentStyle={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.title}>AgriTech Platform</Text>
        <Text style={styles.subtitle}>Mobile-first demo for farmer journeys, input requests, and advisory workflows.</Text>
      </View>

      <View style={styles.actions}>
        <PrimaryButton label="Sign In" onPress={() => router.push('/(auth)/login')} />
        <PrimaryButton label="Create Account" onPress={() => router.push('/(auth)/sign-up')} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
  hero: {
    marginTop: 60,
    gap: theme.spacing.sm,
  },
  title: {
    fontSize: 40,
    fontWeight: '800',
    color: theme.colors.text,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: theme.colors.muted,
  },
  actions: {
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
  },
});
