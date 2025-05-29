import type { HapticStore } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useHapticStore = create(
  persist<HapticStore>(
    (set) => ({
      hapticEnabled: true,
      setHapticEnabled: (value) => set({ hapticEnabled: value }),
      toggleHaptics: () =>
        set((state) => ({ hapticEnabled: !state.hapticEnabled })),
    }),
    {
      name: 'haptic-store',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
