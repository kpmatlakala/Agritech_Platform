import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Web storage adapter (localStorage)
const webStorage = {
  getItem: async (key: string): Promise<string | null> => {
    return localStorage.getItem(key);
  },
  setItem: async (key: string, value: string): Promise<void> => {
    localStorage.setItem(key, value);
  },
  removeItem: async (key: string): Promise<void> => {
    localStorage.removeItem(key);
  },
};

// Native storage adapter (AsyncStorage)
const nativeStorage = {
  getItem: AsyncStorage.getItem.bind(AsyncStorage),
  setItem: AsyncStorage.setItem.bind(AsyncStorage),
  removeItem: AsyncStorage.removeItem.bind(AsyncStorage),
};

// Export the appropriate storage based on platform
export const storage = Platform.OS === 'web' ? webStorage : nativeStorage;

// For debugging
if (__DEV__) {
  console.log(`📦 Storage adapter: ${Platform.OS === 'web' ? 'localStorage (web)' : 'AsyncStorage (native)'}`);
}