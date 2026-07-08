import { useEffect } from 'react';
import { Tabs } from 'expo-router';
import { useAuthStore } from '@/store/useAuthStore';
import { useFarmerProfileStore } from '@/store/useFarmerStore';
import { theme } from '@/constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function FarmerLayout() {
  const { fetchProfile } = useFarmerProfileStore();

  // Fetch farmer profile when layout mounts
  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.muted,
        tabBarStyle: {
          backgroundColor: theme.colors.card,
          borderTopColor: theme.colors.border,
        },
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          headerTitle: 'Farmer Dashboard',
        }}
      />
      <Tabs.Screen
        name="advisory"
        options={{
          title: 'Advisory',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="lightbulb-on" color={color} size={size} />
          ),
          headerTitle: 'AI Advisory',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
          headerTitle: 'My Profile',
        }}
      />
    </Tabs>
  );
}
