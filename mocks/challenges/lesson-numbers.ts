import { Challenge } from "@/types";
import { Dumela } from "@/utils/audio";
import { Number1,Number2 } from "@/utils/images";


export const numberLesson: Challenge[] = [
  {
    id: 'nl-1',
    type: 'lesson-numbers',
    image: Number1,
    languageId: 'st',
    isLocked: false,
    points: 5,
    difficulty: 'easy',
    translationOption: Dumela,
  },
  {
    id: 'nl-2',
    type: 'lesson-numbers',
    image: Number2,
    languageId: 'st',
    isLocked: false,
    points: 5,
    difficulty: 'easy',
    translationOption: Dumela,

  },
  //   {
  //   id: 'nl-3',
  //   type: 'lesson-numbers',
  //   instruction: "Choose",
  //   options: ['Mama', 'Mme', 'Mosetsana', 'Rre'],
  //   correctAnswer: 'Mosetsana',
  //   image: Number2,
  //   languageId: 'st',
  //   isLocked: false,
  //   points: 5,
  //   difficulty: 'easy',
  //   translationOption: Dumela,
  //   hint: "Means Daughter",
  // },


]
