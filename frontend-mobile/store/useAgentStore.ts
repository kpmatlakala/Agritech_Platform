import { create } from 'zustand';
import { apiClient } from '@/utils/api';
import type { Farmer, AgentStats, FarmerRegistrationInput } from '@/types';

export interface AgentState {
  // State
  farmers: Farmer[];
  stats: AgentStats | null;
  selectedFarmer: Farmer | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchFarmers: (agentId: string, search?: string, status?: string) => Promise<void>;
  registerFarmer: (data: FarmerRegistrationInput) => Promise<Farmer>;
  getFarmerDetail: (farmerId: string) => Promise<Farmer>;
  editFarmer: (farmerId: string, data: Partial<Farmer>) => Promise<void>;
  deleteFarmer: (farmerId: string) => Promise<void>;
  setSelectedFarmer: (farmer: Farmer | null) => void;
  clearError: () => void;
}

export const useAgentStore = create<AgentState>((set, get) => ({
  farmers: [],
  stats: null,
  selectedFarmer: null,
  isLoading: false,
  error: null,

  fetchFarmers: async (agentId: string, search?: string, status?: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.getAgentFarmers(agentId, {
        search,
        status,
        limit: 100,
      });

      if (!response.success) {
        throw new Error(response.error || 'Failed to fetch farmers');
      }

      set({
        farmers: response.data,
        stats: {
          total: response.data.length,
          active: response.data.filter(
            (f: Farmer) => f.status === 'active'
          ).length,
          pending: response.data.filter(
            (f: Farmer) => f.status === 'pending'
          ).length,
        },
        isLoading: false,
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to fetch farmers';
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  registerFarmer: async (data: FarmerRegistrationInput) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.registerFarmer(data);

      if (!response.success) {
        throw new Error(response.error || 'Failed to register farmer');
      }

      const newFarmer = response.data;
      set((state) => ({
        farmers: [...state.farmers, newFarmer],
        stats: state.stats
          ? {
              ...state.stats,
              total: state.stats.total + 1,
              active: state.stats.active + 1,
            }
          : null,
        isLoading: false,
      }));

      return newFarmer;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Failed to register farmer';
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  getFarmerDetail: async (farmerId: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.getFarmer(farmerId);

      if (!response.success) {
        throw new Error(response.error || 'Failed to fetch farmer');
      }

      const farmer = response.data;
      set({
        selectedFarmer: farmer,
        isLoading: false,
      });

      return farmer;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to fetch farmer';
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  editFarmer: async (farmerId: string, data: Partial<Farmer>) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.updateFarmer(farmerId, data);

      if (!response.success) {
        throw new Error(response.error || 'Failed to update farmer');
      }

      const updatedFarmer = response.data;
      set((state) => ({
        farmers: state.farmers.map((f) =>
          f.id === updatedFarmer.id ? updatedFarmer : f
        ),
        selectedFarmer:
          state.selectedFarmer?.id === updatedFarmer.id
            ? updatedFarmer
            : state.selectedFarmer,
        isLoading: false,
      }));
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to update farmer';
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  deleteFarmer: async (farmerId: string) => {
    set({ isLoading: true, error: null });
    try {
      await apiClient.deleteFarmer(farmerId);

      set((state) => ({
        farmers: state.farmers.filter((f) => f.id !== farmerId),
        selectedFarmer:
          state.selectedFarmer?.id === farmerId ? null : state.selectedFarmer,
        isLoading: false,
      }));
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to delete farmer';
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  setSelectedFarmer: (farmer: Farmer | null) => {
    set({ selectedFarmer: farmer });
  },

  clearError: () => {
    set({ error: null });
  },
}));
