import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { Screen } from '@/components/ui/Screen';
import { TextField } from '@/components/ui/TextField';
import { theme } from '@/constants/theme';

export default function SignInScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Screen contentStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Demo sign-in only. Platform services are not connected yet.</Text>
      </View>

      <View style={styles.form}>
        <TextField label="Email" placeholder="name@example.com" value={email} onChangeText={setEmail} />
        <TextField
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <View style={styles.footer}>
        <PrimaryButton label="Continue" onPress={() => router.replace('/(root)/(tabs)/home')} />
        <Link href="/(auth)/sign-up" asChild>
          <Pressable>
            <Text style={styles.link}>Need an account? Sign up</Text>
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
