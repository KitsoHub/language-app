import { create} from 'zustand';
import { persist, createJSONStorage} from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Game } from '@/types';
import { challenges } from '@/mocks/challenges';

interface GameState {
    games: Game[]
    currentGameId: string | null
    currentChallengeIndex: number
    selectGame: (gameId: string) => void
    // userAnswers: Record<string, string[]>
    // submitAnswer: (challengeId: string, answer: string[]) => void
    // nextChallenge: () => void
    // reset: () => void
  }

  export const useGameStore = create(
    persist<GameState>(
        (set) => ({
            games: [
                {
                    id:'word-matching',
                    title: 'Word Matching',
                    description: 'Match the words with their meanings.',
                    challenges: [...challenges.filter(challenge => challenge.isLocked === false)],
                    gameBadge: 'Hard',
                    gameIcon: '🏠',
                    type: 'word-matching',
                }
            ],
            currentGameId: null,
            currentChallengeIndex: 0,
            selectGame: (gameId) => set({ currentGameId: gameId }),
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
          name: 'game-storage', // unique name
          storage: createJSONStorage(() => AsyncStorage), // use AsyncStorage as the storage engine
        }
  )
  )
