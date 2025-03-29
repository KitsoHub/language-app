import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useAuthStore } from './auth-store';
import { Achievement, Course, Lesson, Skill } from '@/types';
import { achievements} from '@/mocks/achievements';
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
completeLesson:(lessonId:string)=>void;
getCoursesByLanguage:(languageId:string | undefined)=> Course[];
updateSkill: (skillId: string, progress: number)=>void;

}

export const useProgressStore = create(
    persist<ProgressState>(
        (set,get)=>({
            courses,
            currentCourse: null,
            currentLesson: null,
            skills: [
                { id: 'vocabulary', name: 'vocabulary', progress: 1 },
                { id: 'listening', name: 'listening', progress: 50 },
                { id: 'speaking', name: 'speaking', progress: 30 },
                { id: 'reading', name: 'reading', progress: 0 },
                { id: 'writing', name: 'writing', progress: 0 },
                { id: 'grammar', name: 'grammar', progress: 10 },
              ],

            achievements,
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

      completeLesson:(lessonId)=>{
        const authStore = useAuthStore.getState();
        const courses = [...get().courses];
        let xpGained = 0;
        //update lesson
        for(const course of courses){
          const lessonIndex = course.lessons.findIndex((l) => l.id === lessonId);
          //check last lesson
          if(lessonIndex !== -1){
            // mark as completed
            course.lessons[lessonIndex].completed = true;
            xpGained = course.lessons[lessonIndex].xpReward;

            //unlock next level
            if(lessonIndex + 1 < course.lessons.length){
              course.lessons[lessonIndex+1].locked = false
            }
            break;
          }
        }

        // TODO: update user XP
        // check level up
        //  update skill

      },

      getCoursesByLanguage: (languageId) => {
        return get().courses.filter(course => course.languageId === languageId);
      },

      updateSkill:(skillId, progress)=>{
        set((state)=>({
          skills: state.skills.map((skill) => skill.id === skillId ? {...skill, progress}: skill)
        }))
      }

        }),{name:'a-9', storage: createJSONStorage(()=> AsyncStorage)}
    )
)
