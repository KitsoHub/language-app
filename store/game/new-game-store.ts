import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Challenge, Game } from '@/types';
import { multipleChoiceChallenges } from '@/mocks/challenges/multi-choice-challenge';
import { wordMatchingChallenges } from '@/mocks/challenges/word-matching-challenge';
import { fillBlankChallenges } from '@/mocks/challenges/fill-blank-challenge';
import { sentenceBuilderChallenges } from '@/mocks/challenges/sentence-builder-challenge';
import { useAuthStore } from '../auth-store';

interface NewGameState {
  games: Game[];
  currentGameId: string | null;
  currentChallengeIndex: number;
  arrangedWords: string[];
  isCorrect: boolean | null;
  showFeedback: boolean;
  userAnswers: Record<string, string[]>;
  gameCompleted: boolean;

  //Actions
  selectGame: (gameId: string) => void;
  getCurrentGame: () => Game | null;
  getCurrentChallenge: () => Challenge | null;

  //   Challenge Actions
  addWordToArrangement: (word: string) => void;
  removeWordFromArrangement: (index: number) => void;
  checkAnswer: () => boolean;
  submitAnswer: (challengeId: string | number, answer: string[]) => void;
  nextChallenge: () => void;
  resetLevel: () => void;
  setShowFeedback: (show: boolean) => void;
  resetGame: () => void;
  isGameCompleted: () => boolean;
}

export const useNewGameStore = create(
  persist<NewGameState>(
    (set, get) => ({
      games: [
        {
          id: 'word-matching',
          title: 'Word Matching',
          description: 'Arrange words in the correct order to form phrases.',
          languageId: 'st',
          challenges: wordMatchingChallenges.filter(
            (challenge) =>
              challenge.languageId === 'st' && challenge.isLocked === false,
          ),
          gameBadge: 'Beginner',
          gameIcon: '🔤',
          type: 'word-matching',
        },
        {
          id: 'multiple-choice',
          title: 'Multiple Choice',
          description:
            'Choose the correct translation for each word or phrase.',
          languageId: 'st',
          challenges: multipleChoiceChallenges.filter(
            (challenge) =>
              challenge.languageId === 'st' && challenge.isLocked === false,
          ),
          gameBadge: 'Easy',
          gameIcon: '✅',
          type: 'multiple-choice',
        },
        {
          id: 'fill-blank',
          title: 'Fill in the Blank',
          description: 'Complete sentences by filling in the missing words.',
          languageId: 'st',
          challenges: fillBlankChallenges.filter(
            (challenge) =>
              challenge.languageId === 'st' && challenge.isLocked === false,
          ),
          gameBadge: 'Medium',
          gameIcon: '📝',
          type: 'fill-blank',
        },
        {
          id: 'sentence-builder',
          title: 'Sentence Builder',
          description: 'Build complete sentences from individual words.',
          languageId: 'st',
          challenges: sentenceBuilderChallenges.filter(
            (challenge) =>
              challenge.languageId === 'st' && challenge.isLocked === false,
          ),
          gameBadge: 'Hard',
          gameIcon: '📚',
          type: 'sentence-builder',
        },
      ],
      currentGameId: null,
      currentChallengeIndex: 0,
      arrangedWords: [],
      isCorrect: null,
      showFeedback: false,
      userAnswers: {},
      gameCompleted: false,

      selectGame: (gameId) =>
        set({
          currentGameId: gameId,
          currentChallengeIndex: 0,
          arrangedWords: [],
          isCorrect: null,
          showFeedback: false,
          gameCompleted: false,
        }),

      getCurrentGame: () => {
        const state = get();
        if (!state.currentGameId) return null;
        return (
          state.games.find((game) => game.id === state.currentGameId) || null
        );
      },
      getCurrentChallenge() {
        const currentGame = get().getCurrentGame();
        const { currentChallengeIndex } = get();
        if (!currentGame || !currentGame.challenges[currentChallengeIndex])
          return null;
        return currentGame.challenges[currentChallengeIndex];
      },

      addWordToArrangement: (word) =>
        set((state) => ({
          arrangedWords: [...state.arrangedWords, word],
        })),

      removeWordFromArrangement: (index) =>
        set((state) => ({
          arrangedWords: state.arrangedWords.filter(
            (_, item) => item !== index,
          ),
        })),

      checkAnswer: () => {
        console.log('Init');
        const { arrangedWords } = get();
        const currentChallenge = get().getCurrentChallenge();

        if (!currentChallenge) {
          set({ isCorrect: false, showFeedback: true });
          return false;
        }

        const isCorrect =
          JSON.stringify(arrangedWords) ===
          JSON.stringify(currentChallenge.correctOrder);

        set({ isCorrect, showFeedback: true });

        // Update the auth user store with the completed challenge

        if (isCorrect) {
          const authStore = useAuthStore.getState();
        //   if (!authStore.user) return false;

        //   console.log('Current challeng:', currentChallenge.id);
          authStore.addCompletedChallenge(currentChallenge.id);
          authStore.addXp(currentChallenge.points || 10);


          get().submitAnswer(currentChallenge.id, arrangedWords);
        }

        return isCorrect;
      },

      submitAnswer: (challengeId, answer) =>
        set((state) => ({
          userAnswers: {
            ...state.userAnswers,
            [challengeId]: answer,
          },
        })),

      nextChallenge: () => {
        const currentGame = get().getCurrentGame();
        const { currentChallengeIndex } = get();
        if (!currentGame) return;

        const nextIndex = currentChallengeIndex + 1;
        const gameCompleted = nextIndex >= currentGame.challenges.length;
        set({
          currentChallengeIndex: gameCompleted
            ? currentChallengeIndex
            : nextIndex,
          arrangedWords: [],
          isCorrect: null,
          showFeedback: false,
          gameCompleted,
        });
      },

      resetLevel: () =>
        set({
          arrangedWords: [],
          isCorrect: null,
          showFeedback: false,
        }),

      resetGame: () =>
        set({
          // currentGameId: null,
          currentChallengeIndex: 0,
          arrangedWords: [],
          isCorrect: null,
          showFeedback: false,
          gameCompleted: false,
        }),

      setShowFeedback: (show) => set({ showFeedback: show }),

      isGameCompleted: () => {
        const { currentChallengeIndex, gameCompleted } = get();
        const currentGame = get().getCurrentGame();
        if (!currentGame) return false;
        return (
          currentChallengeIndex >= currentGame.challenges.length ||
          gameCompleted
        );
      },
    }),

    {
      name: 'new-game-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
