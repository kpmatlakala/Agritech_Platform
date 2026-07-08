// (root)/_layout.tsx
import { Stack } from 'expo-router';

export default function RootAppLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="farmer/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="farmer-list" options={{ headerShown: false }} />
    </Stack>
  );
}
