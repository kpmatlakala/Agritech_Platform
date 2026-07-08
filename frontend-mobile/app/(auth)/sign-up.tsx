import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { Screen } from '@/components/ui/Screen';
import { TextField } from '@/components/ui/TextField';
import { theme } from '@/constants/theme';

export default function SignUpScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <Screen contentStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Demo farmer onboarding flow for navigation and UX review.</Text>
      </View>

      <View style={styles.form}>
        <TextField label="Full Name" placeholder="Jane Doe" value={name} onChangeText={setName} />
        <TextField label="Email" placeholder="name@example.com" value={email} onChangeText={setEmail} />
      </View>

      <View style={styles.footer}>
        <PrimaryButton label="Create Demo Farmer Account" onPress={() => router.replace('/(root)/(tabs)/home')} />
        <Link href="/(auth)/sign-in" asChild>
          <Pressable>
            <Text style={styles.link}>Already have an account? Sign in</Text>
          </Pressable>
        </Link>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
  header: {
    marginTop: 40,
    gap: theme.spacing.xs,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: theme.colors.text,
  },
  subtitle: {
    fontSize: 15,
    color: theme.colors.muted,
  },
  form: {
    gap: theme.spacing.md,
  },
  footer: {
    marginBottom: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  link: {
    textAlign: 'center',
    color: theme.colors.primary,
    fontWeight: '600',
  },
});
