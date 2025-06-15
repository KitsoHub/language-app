import type { User } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isSubscribed: boolean;
  isLoading: boolean;
  error: string | null;
  // selectedRole: UserRole | null;

  //actions
  logout: () => void;
  clearError: () => void;
  login: (email: string, password: string) => Promise<void>;
  // register: (userData: Partial<User>, password: string) => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
  // setSelectedRole: (role: UserRole | null) => void;
  // setUserRole: (role: UserRole | null) => void;
  // setUser: (user: User | null) => void;
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
      login: async (email, password) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        try {
          if (email && password) {


            // await auth().createUserWithEmailAndPassword(email, password);
            // await auth().signInWithEmailAndPassword(email, password);
            // const userCredential = auth().currentUser;
            //set default user

            // update user details

            const mockUser: User = {
              id: `mock-id-${Date.now()}-email-${email}`,
              name: usernname,
              email,
              currentLanguage: 'st',
              streak: 1,
              xp: 0,
              level: 1,
              joinedAt: new Date().toISOString(),
              completedChallenges: [],
              unlockedAchievements: ['sign-in'],
              wordMatchingCompleted: 0,
              sentenceBuilderCompleted: 0,
              fillBlankCompleted: 0,
              multipleChoiceCompleted: 0,
            };

            set({ user: mockUser, isAuthenticated: true, isLoading: false });
          } else {
            set({ isLoading: false });
            throw new Error('Invalid credentials');
          }
          // set mock
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Login error',
            isLoading: false,
          });
        }
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      updateUser: (userData) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        }));
      },
      clearError: () => {
        set({ error: null });
      },

      // challenge actions
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
    { name: 'auth-storage-a6', storage: createJSONStorage(() => AsyncStorage) },
  ),
);