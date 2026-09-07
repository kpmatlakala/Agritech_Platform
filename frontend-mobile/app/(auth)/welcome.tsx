import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { Screen } from '@/components/ui/Screen';
import { theme } from '@/constants/theme';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <Screen contentStyle={styles.container}>
      <View style={styles.badgeRow}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>AFAP</Text>
        </View>
        <Text style={styles.badgeMeta}>Field Companion</Text>
      </View>

      <View style={styles.hero}>
        <Text style={styles.title}>Grow Better, Together.</Text>
        <Text style={styles.subtitle}>
          A practical mobile workspace for agents and farmers: register farms, track profiles, and
          get timely field guidance.
        </Text>

        <View style={styles.featureRow}>
          <Text style={styles.featureTag}>Offline-ready</Text>
          <Text style={styles.featureTag}>GPS capture</Text>
          <Text style={styles.featureTag}>Role-based</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <PrimaryButton label="Sign In" onPress={() => router.push('/(auth)/login')} />
        <PrimaryButton
          label="Create Account"
          variant="outline"
          onPress={() => router.push('/(auth)/sign-up')}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
  badgeRow: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  badge: {
    backgroundColor: theme.colors.surfaceSoft,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: theme.radius.full,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  badgeText: {
    color: theme.colors.secondary,
    fontWeight: '800',
    fontSize: 12,
    letterSpacing: 0.8,
  },
  badgeMeta: {
    color: theme.colors.muted,
    fontSize: 13,
    fontWeight: '600',
  },
  hero: {
    marginTop: 28,
    gap: theme.spacing.md,
  },
  title: {
    fontSize: 42,
    fontWeight: '800',
    color: theme.colors.text,
    letterSpacing: -0.8,
  },
  subtitle: {
    fontSize: 17,
    lineHeight: 26,
    color: theme.colors.muted,
  },
  featureRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.sm,
  },
  featureTag: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    color: theme.colors.text,
    fontWeight: '600',
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: theme.radius.full,
  },
  actions: {
    gap: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
});
