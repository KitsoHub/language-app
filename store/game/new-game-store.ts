import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Challenge, Game } from '@/types';
import { multipleChoiceChallenges } from '@/mocks/challenges/multi-choice-challenge';
import { wordMatchingChallenges, wordMatchingChallengesKalanga } from '@/mocks/challenges/word-matching-challenge';
import { fillBlankChallenges } from '@/mocks/challenges/fill-blank-challenge';
import { sentenceBuilderChallenges } from '@/mocks/challenges/sentence-builder-challenge';
import { useAuthStore } from '../auth-store';
import { familyChallenges } from '@/mocks/challenges/family-challenge';
import { numberLesson } from '@/mocks/challenges/lesson-numbers';

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

  //Challenge Actions
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
          id: 'wm-st',
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
          id: 'mc-st',
          title: 'Multiple Choice',
          description:
            'Choose the correct translation for each word or phrase.',
          languageId: 'kl',
          challenges: multipleChoiceChallenges.filter(
            (challenge) =>
              challenge.languageId === 'st' && challenge.isLocked === false,
          ),
          gameBadge: 'Easy',
          gameIcon: '✅',
          type: 'multiple-choice',
        },
        {
          id: 'fb-st',
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
          id: 'sb-st',
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
        {
          id: 'fc-st',
          title: 'Family',
          description: 'Choose the correct translation for each image.',
          languageId: 'kl',
          challenges: familyChallenges.filter(
            (challenge) =>
              challenge.languageId === 'st' && challenge.isLocked === false,
          ),
          gameBadge: 'Easy',
          gameIcon: '✅',
          type: 'family-matching',
        },
        // numbers
        {
          id: 'nl-st',
          title: 'Learn Numbers',
          description: 'Complete the lesson',
          languageId: 'st',
          challenges: numberLesson.filter(
            (challenge) => challenge.languageId === 'st' && !challenge.isLocked,
          ),
          gameBadge: 'Beginner',
          gameIcon: '📝',
          type: 'lesson-numbers',
        },

        // sekgalagari
        {
          id: 'word-matching-kr',
          title: 'Word Matching',
          description: 'Arrange words in the correct order to form phrases.',
          languageId: 'kr',
          challenges: wordMatchingChallenges.filter(
            (challenge) =>
              challenge.languageId === 'kr' && challenge.isLocked === false,
          ),
          gameBadge: 'Beginner',
          gameIcon: '🔤',
          type: 'word-matching',
        },
        {
          id: 'mc-kr',
          title: 'Multiple Choice',
          description:
            'Choose the correct translation for each word or phrase.',
          languageId: 'kr',
          challenges: multipleChoiceChallenges.filter(
            (challenge) =>
              challenge.languageId === 'kr' && challenge.isLocked === false,
          ),
          gameBadge: 'Easy',
          gameIcon: '✅',
          type: 'multiple-choice',
        },
        {
          id: 'fb-kr',
          title: 'Fill in the Blank',
          description: 'Complete sentences by filling in the missing words.',
          languageId: 'kr',
          challenges: fillBlankChallenges.filter(
            (challenge) =>
              challenge.languageId === 'kr' && challenge.isLocked === false,
          ),
          gameBadge: 'Medium',
          gameIcon: '📝',
          type: 'fill-blank',
        },
        {
          id: 'sb-kr',
          title: 'Sentence Builder',
          description: 'Build complete sentences from individual words.',
          languageId: 'kr',
          challenges: sentenceBuilderChallenges.filter(
            (challenge) =>
              challenge.languageId === 'kr' && challenge.isLocked === false,
          ),
          gameBadge: 'Hard',
          gameIcon: '📚',
          type: 'sentence-builder',
        },
        {
          id: 'nl-kr',
          title: 'Learn Numbers',
          description: 'Complete the lesson',
          languageId: 'kr',
          challenges: numberLesson.filter(
            (challenge) => challenge.languageId === 'kr' && !challenge.isLocked,
          ),
          gameBadge: 'Beginner',
          gameIcon: '📝',
          type: 'lesson-numbers',
        },

        // kalanga
        {
          id: 'fc-kl',
          title: 'Family',
          description: 'Choose the correct translation for each image.',
          languageId: 'kl',
          challenges: familyChallenges.filter(
            (challenge) =>
              challenge.languageId === 'kl' && challenge.isLocked === false,
          ),
          gameBadge: 'Easy',
          gameIcon: '✅',
          type: 'family-matching',
        },
        {
          id: 'word-matching-kl',
          title: 'Word Matching',
          description: 'Arrange words in the correct order to form phrases.',
          languageId: 'kl',
          challenges: wordMatchingChallenges.filter(
            (challenge) =>
              challenge.languageId === 'kl' && challenge.isLocked === false,
          ),
          gameBadge: 'Beginner',
          gameIcon: '🔤',
          type: 'word-matching',
        },
        {
          id: 'mc-kl',
          title: 'Multiple Choice',
          description:
            'Choose the correct translation for each word or phrase.',
          languageId: 'kl',
          challenges: multipleChoiceChallenges.filter(
            (challenge) =>
              challenge.languageId === 'kl' && challenge.isLocked === false,
          ),
          gameBadge: 'Easy',
          gameIcon: '✅',
          type: 'multiple-choice',
        },
        {
          id: 'fb-kl',
          title: 'Fill in the Blank',
          description: 'Complete sentences by filling in the missing words.',
          languageId: 'kl',
          challenges: fillBlankChallenges.filter(
            (challenge) =>
              challenge.languageId === 'kl' && challenge.isLocked === false,
          ),
          gameBadge: 'Medium',
          gameIcon: '📝',
          type: 'fill-blank',
        },
        {
          id: 'sb-kl',
          title: 'Sentence Builder',
          description: 'Build complete sentences from individual words.',
          languageId: 'kl',
          challenges: sentenceBuilderChallenges.filter(
            (challenge) =>
              challenge.languageId === 'kl' && challenge.isLocked === false,
          ),
          gameBadge: 'Hard',
          gameIcon: '📚',
          type: 'sentence-builder',
        },
        {
          id: 'nl-kl',
          title: 'Learn Numbers',
          description: 'Complete the lesson',
          languageId: 'kl',
          challenges: numberLesson.filter(
            (challenge) => challenge.languageId === 'kl' && !challenge.isLocked,
          ),
          gameBadge: 'Beginner',
          gameIcon: '📝',
          type: 'lesson-numbers',
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

        if (!currentChallenge) {
          set({ isCorrect: false, showFeedback: true });
          return false;
        }

        // current challenge = multiple-choice
        if (currentGame?.type === 'multiple-choice') {
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
        // current challenge = family-matching
        if (currentGame?.type === 'family-matching') {
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
        // fill in blank
        if (currentGame?.type === 'fill-blank') {
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

              // current lesson-numbers
        if (currentGame?.type === 'lesson-numbers') {

          const isCorrect = true

          set({ isCorrect, showFeedback: false });

          if (isCorrect) {
            const authStore = useAuthStore.getState();
            if (!authStore.user) return false;

            authStore.addCompletedChallenge(currentChallenge.id);
            authStore.addXp(currentChallenge.points || 10);
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
          if (currentGame) {
            get().updateAchievements(currentGame.type);
          }
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
          case 'family-matching': {
            const count = user.familyMatchingCompleted || 0;
            authStore.updateUser({
              familyMatchingCompleted: count + 1,
            });
         break;
          }

          case 'lesson-numbers': {
            const count = user.lessonNumbersCompleted || 0;
            authStore.updateUser({
              lessonNumbersCompleted: count + 1,
            });

            break;
          }
          default:
            break;
        }

        //check achievements
        if ((user.wordMatchingCompleted || 0) >= 5) {
          authStore.unlockAchievement('word-master');
        }

        if ((user.fillBlankCompleted || 0) >= 5) {
          authStore.unlockAchievement('fill-blanks');
        }

        if ((user.sentenceBuilderCompleted || 0) >= 5) {
          authStore.unlockAchievement('sentence-builder');
        }

        if ((user.multipleChoiceCompleted || 0) >= 5) {
          authStore.unlockAchievement('multiple-choice');
        }

        // check if all game types have been played
        const allGameTypes = [
          'word-matching',
          'fill-blank',
          'sentence-builder',
          'multiple-choice',
          'family-matching',
        ];
        const updatedGameTypes = [...userCompletedGameTypes];
        if (!updatedGameTypes.includes(challengeType)) {
          updatedGameTypes.push(challengeType);
        }

        if (updatedGameTypes.length >= 1) {
          authStore.unlockAchievement('first-lesson');
        }
        if (updatedGameTypes.length === allGameTypes.length) {
          authStore.unlockAchievement('explorer');
        }

        if ((user.xp || 0) >= 100) {
          authStore.unlockAchievement('xp-100');
        }
        if ((user.xp || 0) >= 600 && user.xp < 699) {
          authStore.unlockAchievement('gold-tier-600-699');
        }

        if ((user.level || 0) >= 10) {
          authStore.unlockAchievement('level-10');
        }
      },
    }),

    {
      name: 'new-game-storage-a37',
      version: 1,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
