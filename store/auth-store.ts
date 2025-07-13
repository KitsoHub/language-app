import type { User } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { supabase } from '@/lib/supabase';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isSubscribed: boolean;
  isLoading: boolean;
  error: string | null;
  login: (username: string, email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  updateUser: (userData: Partial<User>) => void;
  updateUserAvatar: (avatar: string) => void;
  updateUserProfile: (updates: Partial<User>) => void;
  addCompletedChallenge: (challengeId: string | number) => void;
  addXp: (points: number) => void;
  resetGameProgress: () => void;
  unlockAchievement: (achievementId: string) => void;
}

const handleAuthError = (error: any): string => {
  switch (error.message) {
    case 'Invalid login credentials':
      return 'Incorrect email or password.';
    case 'Email not confirmed':
      return 'Please verify your email before signing in.';
    case 'User already registered':
      return 'This email is already registered.';
    default:
      return error.message || 'An error occurred. Please try again.';
  }
};

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      isSubscribed: false,
      login: async (username, email, password) => {
        set({ isLoading: true, error: null });
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error || !data.session || !data.user) {
            set({ isLoading: false, error: error?.message || 'Login failed' });
            throw new Error(error?.message || 'Login failed');
          }

          // Check if email is verified using the session's user
          if (!data.user.email_confirmed_at) {
            // Invalidate session/token if needed
            await supabase.auth.signOut();
            set({ isLoading: false, error: 'Please verify your email before signing in.' });
            throw new Error('Please verify your email before signing in.');
          }

          // Save user and session/token as usual
          set({
            user: {
              id: data.user.id,
              name: username || data.user.user_metadata?.name || data.user.email,
              email: data.user.email,
              // ...other user fields...
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
      register: async (username, email, password) => {
        set({ isLoading: true, error: null });
        try {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: { name: username },
            },
          });
          if (error) throw error;

          if (!data.user) {
            throw new Error('Please check your inbox for email verification!');
          }

          const user: User = {
            id: data.user.id,
            name: username || 'Anonymous',
            email: data.user.email || email,
            avatar: undefined,
            streak: 1,
            xp: 0,
            level: 1,
            joinedAt: data.user.created_at || new Date().toISOString(),
            completedChallenges: [],
            unlockedAchievements: ['sign-up'],
            wordMatchingCompleted: 0,
            sentenceBuilderCompleted: 0,
            fillBlankCompleted: 0,
            multipleChoiceCompleted: 0,
            familyMatchingCompleted: 0,
          };

          // Save profile to Supabase
          const { error: profileError } = await supabase
            .from('profiles')
            .upsert({
              id: data.user.id,
              name: username,
              email,
              streak: 1,
              xp: 0,
              level: 1,
              completedChallenges: [],
              unlockedAchievements: ['sign-up'],
              wordMatchingCompleted: 0,
              sentenceBuilderCompleted: 0,
              fillBlankCompleted: 0,
              multipleChoiceCompleted: 0,
              familyMatchingCompleted: 0,
            });

          if (profileError) throw profileError;

          set({ user, isAuthenticated: !!data.session, isLoading: false });
        } catch (error: any) {
          set({ error: handleAuthError(error), isLoading: false });
        }
      },
      logout: async () => {
        try {
          const { error } = await supabase.auth.signOut();
          if (error) throw error;
          set({ user: null, isAuthenticated: false, error: null });
        } catch (error: any) {
          set({ error: handleAuthError(error) });
        }
      },
      updateUser: (userData) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        }));
      },
      updateUserAvatar: (avatar) => {
        set((state) => ({
          user: state.user ? { ...state.user, avatar } : null,
        }));
      },
      updateUserProfile: (updates) =>
        set((state) => {
          const updatedUser = state.user ? { ...state.user, ...updates } : null;
          // Update profile in Supabase
          if (updatedUser) {
            supabase
              .from('profiles')
              .upsert({ id: updatedUser.id, ...updates })
              .then(({ error }) => {
                if (error) console.error('Profile update error:', error);
              });
          }
          return { user: updatedUser };
        }),
      clearError: () => {
        set({ error: null });
      },
      addCompletedChallenge: (challengeId) =>
        set((state) => {
          if (!state.user) return state;
          const completedChallenges = [...(state.user.completedChallenges || [])];
          if (!completedChallenges.includes(String(challengeId))) {
            completedChallenges.push(String(challengeId));
          }
          // Update Supabase
          supabase
            .from('profiles')
            .update({ completedChallenges })
            .eq('id', state.user.id)
            .then(({ error }) => {
              if (error) console.error('Challenge update error:', error);
            });
          return { user: { ...state.user, completedChallenges } };
        }),
      addXp: (points) =>
        set((state) => {
          if (!state.user || points < 0) return state;
          const newXp = state.user.xp + points;
          const level = Math.floor(newXp / 100) + 1;
          // Update Supabase
          supabase
            .from('profiles')
            .update({ xp: newXp, level })
            .eq('id', state.user.id)
            .then(({ error }) => {
              if (error) console.error('XP update error:', error);
            });
          return { user: { ...state.user, xp: newXp, level } };
        }),
      resetGameProgress: () =>
        set((state) => {
          if (!state.user) return state;
          const resetData = { completedChallenges: [], xp: 0, level: 1 };
          // Update Supabase
          supabase
            .from('profiles')
            .update(resetData)
            .eq('id', state.user.id)
            .then(({ error }) => {
              if (error) console.error('Reset progress error:', error);
            });
          return { user: { ...state.user, ...resetData } };
        }),
      unlockAchievement: (achievementId) =>
        set((state) => {
          if (!state.user) return state;
          const unlockedAchievements = state.user.unlockedAchievements || [];
          if (unlockedAchievements.includes(achievementId)) return state;
          const updatedAchievements = [...unlockedAchievements, achievementId];
          // Update Supabase
          supabase
            .from('profiles')
            .update({ unlockedAchievements: updatedAchievements })
            .eq('id', state.user.id)
            .then(({ error }) => {
              if (error) console.error('Achievement update error:', error);
            });
          return {
            user: { ...state.user, unlockedAchievements: updatedAchievements },
          };
        }),
    }),
    {
      name: 'auth-storage-a7',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state: AuthState) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        isSubscribed: state.isSubscribed,
      }),
    },
  ),
);