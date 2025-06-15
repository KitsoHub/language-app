import type { User } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { supabase } from '@/utils/supabase';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isSubscribed: boolean;
  isLoading: boolean;
  error: string | null;
  // actions
  logout: () => void;
  clearError: () => void;
  login: (username: string, email: string, password: string) => Promise<void>;
  restoreSession: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
  addCompletedChallenge: (challengeId: string | number) => void;
  addXp: (points: number) => void;
  resetGameProgress: () => void;
  unlockAchievement: (achievementId: string) => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      isSubscribed: false,

      // Login with Supabase and store user details
      login: async (username, email, password) => {
        set({ isLoading: true, error: null });
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error || !data.user) {
            set({ isLoading: false, error: error?.message || 'Login failed' });
            throw new Error(error?.message || 'Login failed');
          }

          const user = data.user;

          set({
            user: {
              id: user.id,
              name: username || user.user_metadata?.name || user.email,
              email: user.email,
              streak: 1,
              xp: 0,
              level: 1,
              joinedAt: user.created_at,
              completedChallenges: [],
              unlockedAchievements: ['sign-in'],
              wordMatchingCompleted: 0,
              sentenceBuilderCompleted: 0,
              fillBlankCompleted: 0,
              multipleChoiceCompleted: 0,
              familyMatchingCompleted: 0,
            },
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error: any) {
          set({
            error: error instanceof Error ? error.message : 'Login error',
            isLoading: false,
          });
        }
      },

      // Restore user from Supabase session (call on app start)
      restoreSession: async () => {
        set({ isLoading: true });
        try {
          const { data } = await supabase.auth.getSession();
          const sessionUser = data?.session?.user;
          if (sessionUser) {
            set({
              user: {
                id: sessionUser.id,
                name: sessionUser.user_metadata?.name || sessionUser.email,
                email: sessionUser.email,
                streak: 1,
                xp: 0,
                level: 1,
                joinedAt: sessionUser.created_at,
                completedChallenges: [],
                unlockedAchievements: ['sign-in'],
                wordMatchingCompleted: 0,
                sentenceBuilderCompleted: 0,
                fillBlankCompleted: 0,
                multipleChoiceCompleted: 0,
                familyMatchingCompleted: 0,
              },
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          } else {
            set({ user: null, isAuthenticated: false, isLoading: false });
          }
        } catch (error: any) {
          set({ user: null, isAuthenticated: false, isLoading: false });
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
        supabase.auth.signOut();
      },

      updateUser: (userData) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        }));
      },

      clearError: () => {
        set({ error: null });
      },

      addCompletedChallenge: (challengeId) =>
        set((state) => {
          if (!state.user) return state;
          const completedChallenges = [
            ...(state.user.completedChallenges || []),
          ];
          if (!completedChallenges.includes(String(challengeId))) {
            completedChallenges.push(String(challengeId));
          }
          return {
            user: { ...state.user, completedChallenges },
          };
        }),

      addXp: (points) =>
        set((state) => {
          if (!state.user) return state;
          const newXp = state.user.xp + points;
          const level = Math.floor(newXp / 100) + 1;
          return {
            user: { ...state.user, xp: newXp, level: level },
          };
        }),

      resetGameProgress: () =>
        set((state) => {
          if (!state.user) return state;
          return {
            user: { ...state.user, completedChallenges: [], xp: 0, level: 1 },
          };
        }),

      unlockAchievement: (achievementId) =>
        set((state) => {
          if (!state.user) return state;
          const unlockedAchievements = state.user.unlockedAchievements || [];
          if (unlockedAchievements.includes(achievementId)) {
            return state;
          }
          return {
            user: {
              ...state.user,
              unlockedAchievements: [...unlockedAchievements, achievementId],
            },
          };
        }),
    }),
    { name: 'auth-storage-a7', storage: createJSONStorage(() => AsyncStorage) },
  ),
);