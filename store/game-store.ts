import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Game } from '@/types';
import { challenges } from '@/mocks/challenges';
import { useLanguageStore } from './language-store';
import { useAuthStore } from './auth-store';

interface GameState {
  games: Game[];
  currentGameId: string | null;
  currentChallengeIndex: number;
  selectGame: (gameId: string) => void;
  //currentLanguageId: string | null;
  //setLanguageId: () => void;
  // userAnswers: Record<string, string[]>
  // submitAnswer: (challengeId: string, answer: string[]) => void
  // nextChallenge: () => void
  // reset: () => void
}
//export const currentLanguageId = useAuthStore((state) => state.user?.currentLanguage)
export const useGameStore = create(
  persist<GameState>(
    (set,get) => ({
      // currentLanguageId: null,
      // setLanguageId: () => {

      //   set({ currentLanguageId: currentLanguageId });
      // },
      games: [
        {
          id: 'word-matching',
          title: 'Word Matching',
          description: 'Match the words with their meanings.',
          languageId: "st",
          challenges: [
            ...challenges.filter(
              (challenge) =>
                 challenge.languageId === 'st' && challenge.isLocked === false,
            ),
          ],
          gameBadge: 'Hard',
          gameIcon: '🏠',
          type: 'word-matching',
        },
      ],
      currentGameId: null,

      currentChallengeIndex: 0,

      selectGame: (gameId) => set({ currentGameId: gameId }),
      // &&
      // challenge.languageId === useAuthStore((state) => state.user?.currentLanguage)

      // userAnswers: {},
      // submitAnswer: (challengeId, answer) =>
      //     set((state) => ({
      //         userAnswers: {
      //             ...state.userAnswers,
      //             [challengeId]: answer,
      //         },
      //     })),
      // nextChallenge: () =>
      //     set((state) => ({
      //         currentChallengeIndex:
      //             state.currentChallengeIndex + 1,
      //     })),
      // reset: () => set({ currentChallengeIndex: 0, userAnswers: {} }),
    }),
    {
      name: 'game-storage-a4', // unique name
      storage: createJSONStorage(() => AsyncStorage), // use AsyncStorage as the storage engine
    },
  ),
);
