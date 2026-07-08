import { useCallback, useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/store/useAuthStore';
import { Screen } from '@/components/ui/Screen';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { TextField } from '@/components/ui/TextField';
import { theme } from '@/constants/theme';

export default function LoginScreen() {
  const router = useRouter();
  const { login, isLoading, error, clearError } = useAuthStore();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  // Clear error when user changes input
  useEffect(() => {
    if (error) {
      clearError();
    }
  }, [phoneNumber, password]);

  const handleLogin = useCallback(async () => {
    if (!phoneNumber.trim()) {
      Alert.alert('Error', 'Please enter your phone number');
      return;
    }

    try {
      await login(phoneNumber.trim(), password);
      // Navigation is handled by the root layout based on auth state
    } catch (error) {
      Alert.alert('Login Failed', error instanceof Error ? error.message : 'An error occurred');
    }
  }, [phoneNumber, password, login]);

  const handleForgotPassword = useCallback(() => {
    // TODO: Implement password reset flow
    Alert.alert('Info', 'Password reset feature coming soon');
  }, []);

  return (
    <Screen contentStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to your Agritech account</Text>
      </View>

      <View style={styles.form}>
        <TextField
          label="Phone Number"
          placeholder="e.g., 27821234567"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />

        <TextField
          label="Password"
          placeholder="Enter your password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Text
          style={styles.link}
          onPress={handleForgotPassword}
        >
          Forgot password?
        </Text>

        {error && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <PrimaryButton
          label={isLoading ? 'Signing In...' : 'Sign In'}
          onPress={handleLogin}
          disabled={isLoading}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account? </Text>
        <Text
          style={styles.link}
          onPress={() => router.push('/(auth)/sign-up')}
        >
          Create one
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.lg,
  },
  header: {
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: 14,
    color: theme.colors.muted,
  },
  form: {
    gap: theme.spacing.lg,
  },
  link: {
    fontSize: 12,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  errorBox: {
    backgroundColor: '#fee',
    borderColor: '#f00',
    borderWidth: 1,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
  },
  errorText: {
    fontSize: 12,
    color: '#f00',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  footerText: {
    fontSize: 14,
    color: theme.colors.muted,
  },
});
