import { create } from 'zustand';
import type { Achievement } from '@/types';
import { achievements } from '@/mocks/achievements';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthStore } from './auth-store';


const initialAchivements: Achievement[]=[...achievements]

interface AchievementState {
  achievements: Achievement[];
  selectedAchivement: Achievement | null;
  selectAchivement: (achievements:Achievement)=>void;
  clearSelected:()=>void;
 isAchievementUnlocked: (achievementId: string) => boolean;
};

export const useAchievementsStore = create(
    persist<AchievementState>(

        (set,get)=>({
            achievements: initialAchivements,
            selectedAchivement: null,
            selectAchivement: (achievements)=>set({
                selectedAchivement: achievements
            }),
            clearSelected:()=>set({selectedAchivement:null}),
            isAchievementUnlocked: (achievementId: string) => {

                const authStore = useAuthStore.getState();
                const { user } = authStore;
                const isUnlocked = user?.unlockedAchievements?.includes(achievementId) || false;
                return isUnlocked
            }
        }),
        {
            name:'achivements-store-a2',
            storage: createJSONStorage(()=>AsyncStorage)
        }
    )
)
