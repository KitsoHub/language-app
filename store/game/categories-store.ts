import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lessonCategories, LessonCategory, LessonGame } from '@/utils/constants/categories';


interface CategoriesState {
  categories: LessonCategory[];
}

export const useCategoriesStore = create(

    persist<CategoriesState>(
        (set) => ({
        categories: lessonCategories,
        }),
        {
        name: 'categories-storage',
        storage: createJSONStorage(() => AsyncStorage),
        })
)
