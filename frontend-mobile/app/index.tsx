// app/index.tsx
import { Redirect } from 'expo-router';
import { useAuthStore } from '@/store/useAuthStore';

export default function Index() {
  const { onboardingCompleted, token } = useAuthStore();

  if (!onboardingCompleted) {
    return <Redirect href="./onboarding" />;
  }

  if (!token) {
    return <Redirect href="/(auth)/welcome" />;
  }

  // Token exists → role-based redirect handled by RootLayout
  return <Redirect href="/" />;
}