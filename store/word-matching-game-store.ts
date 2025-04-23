import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { challenges } from '@/mocks/challenges';

interface WordMatchGameState {
  score: number;
  currentLevel: number;
  highestLevel: number;
  arrangedWords: string[];
  isWordCorrect: boolean | null;
  showFeedback: boolean;

  //Actions
  incrementScore: () => void;
  nextLevel: () => void;
  resetLevel: () => void;

  setArrangedWords: (words: string[]) => void;
  addWordToArrangement: (word: string) => void;
  removeWordFromArrangement: (index: number) => void;
  checkAnswer: () => boolean;
  setShowFeedback: (show: boolean) => void;
  resetGame: () => void;
  // getChallenges: () => void;
}

export const useWordMatchGameStore = create(
  persist<WordMatchGameState>(
    (set, get) => ({
      //set constants
      score: 0,
      currentLevel: 1,
      highestLevel: 1,
      arrangedWords: [],
      isWordCorrect: null,
      showFeedback: false,

      incrementScore: () => set((state) => ({ score: state.score + 10 })),

      nextLevel: () =>
        set((state) => {
          const nextLevel = state.currentLevel + 1;
          const highestLevel = Math.max(nextLevel, state.highestLevel);
          return {
            currentLevel: nextLevel,
            highestLevel,
            arrangedWords: [],
            isCorrect: null,
            showFeedback: false,
          };
        }),

      resetLevel: () =>
        set((state) => ({
          arrangedWords: [],
          isCorrect: null,
          showFeedback: false,
        })),

      resetGame: () =>
        set({
          score: 0,
          currentLevel: 1,
          arrangedWords: [],
          showFeedback: false,
          isWordCorrect: null,
        }),

      setShowFeedback: (show) => set({ showFeedback: show }),

      setArrangedWords: (words) => set({ arrangedWords: words }),

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

      //check answer
      checkAnswer: () => {
        const { arrangedWords, currentLevel } = get();
        const currentChallenge = challenges.find((c) => c.id === currentLevel);
        if (!currentChallenge) return false;

        const isWordCorrect =
          JSON.stringify(arrangedWords) ===
          JSON.stringify(currentChallenge.correctOrder);

        set({ isWordCorrect, showFeedback: true });

        //increment score
        if (isWordCorrect) {
          get().incrementScore();
        }

        return isWordCorrect;
      },
    }),
    {
      name: 'word-matching-a8',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
