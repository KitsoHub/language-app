/**
 * Central game store
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { produce } from 'immer';

// Progress tracking interfaces
export interface ChallengeProgress {
  challengeId: string | number;
  completed: boolean;
//   attempts?: number;
//   bestScore?: number;
//   timeSpent?: number;
  completedAt?: Date;
}

export interface GameProgress {
  gameId: string;
  languageId: string;
  categoryId: string;
  totalChallenges: number;
  completedChallenges: number;
  progress: number; // 0-100
  challenges: Record<string, ChallengeProgress>;
  completedAt?: Date;
  lastPlayedAt: Date;
}

export interface CategoryProgress {
  categoryId: string;
  languageId: string;
  totalGames: number;
  completedGames: number;
  progress: number; // 0-100
  games: Record<string, GameProgress>;
  lastPlayedAt: Date;
}

export interface LanguageProgress {
  languageId: string;
  totalCategories: number;
  completedCategories: number;
  totalXp: number;
  currentStreak: number;
//longestStreak: number;
  level: number;
  progress: number; // 0-100
  categories: Record<string, CategoryProgress>;
  lastPlayedAt: Date;
  startedAt: Date;
}

export interface GlobalProgress {
  totalXp: number;
  totalTime: number;
  currentLevel: number;
  currentStreak: number;
  longestStreak: number;
  languages: Record<string, LanguageProgress>;
  achievements: string[];
  lastPlayedAt: Date;
  startedAt: Date;
}

interface GameState {

}
export const useGameStore = create(
  persist<GameState>(
    (set,get) => ({


    }),
    {
      name: 'game-store-v1',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) =>({
        // currentLanguageId: state.currentLanguageId
      })
    },
  ),
);
