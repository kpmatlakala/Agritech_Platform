import { create } from 'zustand';
import { apiClient } from '@/utils/api';
import type { Farmer, Advisory, Order } from '@/types';

export interface FarmerProfileState {
  // State
  profile: Farmer | null;
  advisory: Advisory[] | null;
  orders: Order[] | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchProfile: () => Promise<void>;
  updateProfile: (data: Partial<Farmer>) => Promise<void>;
  fetchAdvisory: () => Promise<void>;
  fetchOrders: () => Promise<void>;
  clearError: () => void;
}

export const useFarmerProfileStore = create<FarmerProfileState>((set) => ({
  profile: null,
  advisory: null,
  orders: null,
  isLoading: false,
  error: null,

  fetchProfile: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.getFarmerProfile();

      if (!response.success) {
        throw new Error(response.error || 'Failed to fetch profile');
      }

      set({
        profile: response.data.farmer,
        isLoading: false,
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to fetch profile';
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  updateProfile: async (data: Partial<Farmer>) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.updateOwnProfile(data);

      if (!response.success) {
        throw new Error(response.error || 'Failed to update profile');
      }

      set({
        profile: response.data,
        isLoading: false,
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to update profile';
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  fetchAdvisory: async () => {
    // TODO: Implement advisory endpoint
    set({ advisory: [] });
  },

  fetchOrders: async () => {
    // TODO: Implement orders endpoint
    set({ orders: [] });
  },

  clearError: () => {
    set({ error: null });
  },
}));

// Legacy store for compatibility (can be deprecated later)
import { getNextFarmerNumber, mockFarmers } from '@/data/mockData';
import type { NewFarmerInput } from '@/types';

type FarmerStore = {
  farmers: Farmer[];
  lastSync: string | null;
  addFarmer: (input: NewFarmerInput) => Farmer;
  clearFarmers: () => void;
  resetMockData: () => void;
  markSyncedNow: () => void;
};

const randomCoordinate = (base: number, spread: number): number => {
  return Number((base + Math.random() * spread).toFixed(6));
};

export const useFarmerStore = create<FarmerStore>((set, get) => ({
  farmers: mockFarmers,
  lastSync: null,
  addFarmer: (input) => {
    const currentFarmers = get().farmers;
    const number = getNextFarmerNumber(currentFarmers);

    const farmer: Farmer = {
      id: String(Date.now()),
      farmer_id: `AFAP-${String(number).padStart(4, '0')}`,
      full_name: input.fullName,
      id_number: input.idNumber,
      phone_number: input.phoneNumber,
      village: input.village,
      district: input.district,
      province: 'Limpopo',
      crop_types: input.cropType,
      farm_size_ha: input.farmSizeHa,
      latitude: randomCoordinate(-24.2, 1.4),
      longitude: randomCoordinate(29.2, 1.6),
      gps_accuracy: Number((2 + Math.random() * 5).toFixed(1)),
      registered_at: new Date().toISOString(),
      registered_via: 'web',
      status: 'active',
      created_by: 'mobile-admin',
      updated_at: new Date().toISOString(),
      photo_url: undefined,
    };

    set((state) => ({ farmers: [farmer, ...state.farmers] }));
    return farmer;
  },
  clearFarmers: () => set({ farmers: [] }),
  resetMockData: () => set({ farmers: mockFarmers, lastSync: null }),
  markSyncedNow: () => set({ lastSync: new Date().toISOString() }),
}));
