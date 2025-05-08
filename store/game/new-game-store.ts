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
  selectedChoice: string | null;

  //Actions
  selectGame: (gameId: string) => void;
  getCurrentGame: () => Game | null;
  getCurrentChallenge: () => Challenge | null;
  getCurrentWordSelection: () => string | null;
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
  setSelectedChoice: (choice: string) => void;
  updateAchievements: (challengeType: string) => void;
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
      selectedChoice: null,

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
      getCurrentWordSelection: () => {
        const state = get();
        if (!state.currentGameId) return null;
        return state.selectedChoice || null;
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
        const { arrangedWords } = get();
        const currentChallenge = get().getCurrentChallenge();
        const currentGame = get().getCurrentGame();

        if (!currentGame || !currentChallenge || !currentChallenge.correctOrder)
          return false;

        // if (!currentChallenge) {
        //   set({ isCorrect: false, showFeedback: true });
        //   return false;
        // }

        // current challenge = multiple-choice
        if (currentChallenge.type === 'multiple-choice') {
          const { selectedChoice } = get();

          const isCorrect = selectedChoice === currentChallenge.correctAnswer;
          //console.log(`From the store: ${selectedChoice} is ${isCorrect}`, )

          set({ isCorrect, showFeedback: true });

          if (isCorrect) {
            const authStore = useAuthStore.getState();
            if (!authStore.user) return false;

            authStore.addCompletedChallenge(currentChallenge.id);
            authStore.addXp(currentChallenge.points || 10);

            get().submitAnswer(currentChallenge.id, arrangedWords);
            get().updateAchievements(currentGame.type);
          }
          return isCorrect;
        }
        // fill in blank
        if (currentChallenge.type === 'fill-blank') {
          const { selectedChoice } = get();

          const isCorrect = selectedChoice === currentChallenge.correctAnswer;

          set({ isCorrect, showFeedback: true });

          if (isCorrect) {
            const authStore = useAuthStore.getState();
            if (!authStore.user) return false;

            authStore.addCompletedChallenge(currentChallenge.id);
            authStore.addXp(currentChallenge.points || 10);

            get().submitAnswer(currentChallenge.id, arrangedWords);
            get().updateAchievements(currentGame.type);
          }
          return isCorrect;
        }

        const isCorrect =
          JSON.stringify(arrangedWords) ===
          JSON.stringify(currentChallenge.correctOrder);

        set({ isCorrect, showFeedback: true });

        // Update the auth user store with the completed challenge

        if (isCorrect) {
          const authStore = useAuthStore.getState();
          if (!authStore.user) return false;

          authStore.addCompletedChallenge(currentChallenge.id);
          authStore.addXp(currentChallenge.points || 10);

          get().submitAnswer(currentChallenge.id, arrangedWords);
          get().updateAchievements(currentGame.type);
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
          selectedChoice: null,
        });
      },

      resetLevel: () =>
        set({
          arrangedWords: [],
          isCorrect: null,
          showFeedback: false,
          selectedChoice: null,
        }),

      resetGame: () =>
        set({
          // currentGameId: null,
          currentChallengeIndex: 0,
          arrangedWords: [],
          isCorrect: null,
          showFeedback: false,
          gameCompleted: false,
          selectedChoice: null,
        }),

      setShowFeedback: (show) => set({ showFeedback: show }),

      setSelectedChoice: (choice: string) =>
        set({
          selectedChoice: choice,
        }),

      isGameCompleted: () => {
        const { currentChallengeIndex, gameCompleted } = get();
        const currentGame = get().getCurrentGame();
        if (!currentGame) return false;
        return (
          currentChallengeIndex >= currentGame.challenges.length - 1 ||
          gameCompleted
        );
      },

      updateAchievements: (challengeType) => {
        const authStore = useAuthStore.getState();
        const { user } = authStore;

        if (!user) return;
        //track completed game types
        //update achievements based on challenge type
        //Check if all game types have been played
        // check for word master achievement
        //check for fill-blank achievement
        //check for sentence builder achievement
        //check for multiple choice achievement

        // get challenge type + check if my current type is there else update
        const userCompletedGameTypes = user.completedGameTypes || [];
        if (!userCompletedGameTypes.includes(challengeType)) {
          authStore.updateUser({
            completedGameTypes: [...userCompletedGameTypes, challengeType],
          });
        }

        switch (challengeType) {
          case 'word-matching': {
            const count = user.wordMatchingCompleted || 0;
            authStore.updateUser({
              wordMatchingCompleted: count + 1,
            });

            break;
          }
          case 'fill-blank': {
            const count = user.fillBlankCompleted || 0;
            authStore.updateUser({
              fillBlankCompleted: count + 1,
            });

            break;
          }
          case 'sentence-builder': {
            const count = user.sentenceBuilderCompleted || 0;
            authStore.updateUser({
              sentenceBuilderCompleted: count + 1,
            });

            break;
          }
          case 'multiple-choice': {
            const count = user.multipleChoiceCompleted || 0;
            authStore.updateUser({
              multipleChoiceCompleted: count + 1,
            });

            break;
          }
          default:
            break;
        }


      },
    }),

    {
      name: 'new-game-storage-a5',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
