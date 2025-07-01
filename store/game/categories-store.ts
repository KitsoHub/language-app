import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lessonCategories, LessonCategory } from '@/utils/constants/categories';

interface CategoriesState {
  categories: LessonCategory[];
  updateGameProgress: (
    categoryId: string,
    gameId: string,
    progress: number,
  ) => void;
  resetCategoryProgress: () => void;
}

export const useCategoriesStore = create(
  persist<CategoriesState>(
    (set, get) => ({
      categories: lessonCategories,

      updateGameProgress: (categorId, gameId, progress) =>
        set((state) => {
          const newCategories = [...state.categories];
          const categoryIndex = newCategories.findIndex(
            (c) => c.id === categorId,
          );

          if (categoryIndex !== -1) {
            const gameIndex = newCategories[categoryIndex].games.findIndex(
              (g) => g.id === gameId,
            );

            if (gameIndex !== -1) {
              newCategories[categoryIndex].games[gameIndex].progress = progress;
            }
          }
          return { categories: newCategories };
        }),

      resetCategoryProgress: () =>
        set((state) => {
          const currentCategories = [...state.categories];
          const filtered = currentCategories.filter((category) =>
            category.games.map((game) => (game.progress = 0)),
          );
          return { categories: filtered };
        }),
    }),

    {
      name: 'categories-storage-a15',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
