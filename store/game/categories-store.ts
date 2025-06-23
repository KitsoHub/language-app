import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lessonCategories, LessonCategory } from '@/utils/constants/categories';


interface CategoriesState {
  categories: LessonCategory[];
  updateGameProgress: (categoryId: string, gameId: string, progress: number) => void;
}

export const useCategoriesStore = create(

    persist<CategoriesState>(
        (set,get) => ({
        categories: lessonCategories,

        updateGameProgress:(categorId, gameId, progress)=>set((state)=>{

          const newCategories = [...state.categories];
          const categoryIndex =  newCategories.findIndex(c => c.id === categorId);

          if (categoryIndex !== -1) {
            const gameIndex = newCategories[categoryIndex].games.findIndex(g => g.id === gameId);

          if (gameIndex !== -1) {
            newCategories[categoryIndex].games[gameIndex].progress = progress;
          }
          }
           return { categories: newCategories };
        })
        }),

        {
        name: 'categories-storage-a14',
        storage: createJSONStorage(() => AsyncStorage),
        })
)
