
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useAuthStore } from './auth-store';
import { Achievement, Course, Lesson, Skill } from '@/types';
import { achievements as mockAchievements } from '@/mocks/achievements';
import { courses} from '@/mocks/courses';

interface ProgressState{
courses: Course[];
currentCourse: Course | null;
currentLesson: Lesson | null;
skills: Skill[];
achievements: Achievement[];
dailyGoal: number;
dailyProgress: number;
lastPracticeDate: string | null;
isLoading: boolean | null;

//actions
selectCourse:(courseId: string)=> void;
selectLesson:(lessonId:string)=>void;
// completeLesson:(lessonId:string)=>void;
getCoursesByLanguage:(languageId:string | undefined)=> Course[];

}

export const useProgressStore = create(
    persist<ProgressState>(
        (set,get)=>({
            courses,
            currentCourse: null,
            currentLesson: null,
            skills: [
                { id: 'vocabulary', name: 'vocabulary', progress: 0 },
                { id: 'listening', name: 'listening', progress: 0 },
                { id: 'speaking', name: 'speaking', progress: 0 },
                { id: 'reading', name: 'reading', progress: 0 },
                { id: 'writing', name: 'writing', progress: 0 },
                { id: 'grammar', name: 'grammar', progress: 0 },
              ],

            achievements: mockAchievements,
            dailyGoal: 50,
            dailyProgress: 0,
            lastPracticeDate: null,
            isLoading: false,


      selectCourse: (courseId) => {
        const course = get().courses.find((c) => c.id === courseId);
        if (course) {
          set({ currentCourse: course });
        }
      },

      selectLesson: (lessonId) => {
        const currentCourse = get().currentCourse;
        if (currentCourse) {
          const lesson = currentCourse.lessons.find((l) => l.id === lessonId);
          if (lesson) {
            set({ currentLesson: lesson });
          }
        }
      },

      getCoursesByLanguage: (languageId) => {
        return get().courses.filter(course => course.languageId === languageId);
      },



        }),{name:'progress-storage', storage: createJSONStorage(()=> AsyncStorage)}
    )
)
