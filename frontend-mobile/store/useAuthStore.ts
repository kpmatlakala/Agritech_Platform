import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { storage } from '@/utils/storage';  // ✅ Custom storage
import { apiClient } from '@/utils/api';
import type { User, Agent, Farmer, AuthResponse } from '@/types';

// ✅ DEV: Reset onboarding on every app reload
const DEV_RESET_ONBOARDING = __DEV__ ? true : false;

export interface AuthState {
  // State
  user: User | null;
  agent: Agent | null;
  farmer: Farmer | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  onboardingCompleted: boolean;

  // Actions
  login: (phoneNumber: string, password?: string) => Promise<void>;
  logout: () => Promise<void>;
  registerAgent: (data: {
    phone_number: string;
    full_name: string;
    email?: string;
    village?: string;
    district?: string;
  }) => Promise<void>;
  setToken: (token: string) => void;
  clearError: () => void;
  restoreToken: () => Promise<void>;
  setOnboardingCompleted: (completed: boolean) => Promise<void>;
  resetOnboarding: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      agent: null,
      farmer: null,
      token: null,
      isLoading: false,
      error: null,
      onboardingCompleted: false,

      login: async (phoneNumber: string, password?: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await apiClient.login(phoneNumber, password);

          if (!response.success) {
            throw new Error(response.error || 'Login failed');
          }

          const { token, user, agent, farmer } = response.data as AuthResponse;

          await apiClient.saveToken(token);
          set({
            token,
            user,
            agent: agent || null,
            farmer: farmer || null,
            isLoading: false,
          });
        } catch (error) {
          const message =
            error instanceof Error ? error.message : 'Login failed';
          set({ error: message, isLoading: false });
          throw error;
        }
      },

      registerAgent: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const response = await apiClient.registerAgent(data);

          if (!response.success) {
            throw new Error(response.error || 'Registration failed');
          }

          const { token, user, agent } = response.data as AuthResponse;

          await apiClient.saveToken(token);
          set({
            token,
            user,
            agent: agent || null,
            isLoading: false,
          });
        } catch (error) {
          const message =
            error instanceof Error
              ? error.message
              : 'Registration failed';
          set({ error: message, isLoading: false });
          throw error;
        }
      },

      logout: async () => {
        try {
          await apiClient.logout();
        } catch (error) {
          console.error('Logout error:', error);
        }
        set({
          user: null,
          agent: null,
          farmer: null,
          token: null,
          error: null,
        });
      },

      setToken: (token: string) => {
        apiClient.setToken(token);
        set({ token });
      },

      clearError: () => {
        set({ error: null });
      },

      setOnboardingCompleted: async (completed: boolean) => {
        set({ onboardingCompleted: completed });
      },

      resetOnboarding: async () => {
        set({ onboardingCompleted: false });
      },

      restoreToken: async () => {
        try {
          // ✅ DEV: Reset onboarding on app reload
          if (DEV_RESET_ONBOARDING) {
            console.log('🔧 Dev Mode: Resetting onboarding state');
            set({ onboardingCompleted: false });
          }

          const token = await apiClient.getToken();

          if (!token) {
            set({ token: null });
            return;
          }

          set({ token });

          const response = await apiClient.getCurrentUser();

          if (response.success && response.data) {
            set({
              user: response.data.user,
              agent: response.data.profile?.agent_id
                ? response.data.profile
                : null,
              farmer: response.data.profile?.farmer_id
                ? response.data.profile
                : null,
            });
          } else {
            console.warn('Token validation failed, clearing...');
            await apiClient.clearToken();
            set({ token: null, user: null, agent: null, farmer: null });
          }
        } catch (error) {
          console.error('Token restoration error:', error);
          await apiClient.clearToken();
          set({ token: null, user: null, agent: null, farmer: null });
        }
      },
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => storage),  // ✅ Use custom storage
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        agent: state.agent,
        farmer: state.farmer,
        onboardingCompleted: state.onboardingCompleted,
      }),
    }
  )
);