import { Challenge } from "@/types";
import { Dumela } from "@/utils/audio";
import { BoyImage, GirlImage, ManImage, WomanImage } from "@/utils/images";


export const familyChallenges: Challenge[] = [
  {
    id: 'fc-1',
    type: 'family-matching',
    instruction: "Choose",
    options: ['Mama', 'Mme', 'Mosetsana', 'Rre'],
    correctAnswer: 'Mosetsana',
    image: GirlImage,
    languageId: 'st',
    isLocked: false,
    points: 5,
    difficulty: 'easy',
    translationOption: Dumela,
    hint: "Means Daughter",
  },
  {
    id: 'fc-2',
    type: 'family-matching',
    instruction: "Choose",
    options: ['Mama', 'Mme', 'Mosetsana', 'Rre'],
    correctAnswer: 'Mme',
    image: WomanImage,
    languageId: 'st',
    isLocked: false,
    points: 5,
    difficulty: 'easy',
    translationOption: Dumela,
    hint: "Means mother",
  },
  {
    id: 'fc-3',
    type: 'family-matching',
    instruction: "Choose",
    options: ['Mama', 'Mme', 'Mosetsana', 'Rre'],
    correctAnswer: 'Rre',
    image: ManImage,
    languageId: 'st',
    isLocked: false,
    points: 5,
    difficulty: 'easy',
    translationOption: Dumela,
    hint: "Means Father",
  },
  {
    id: 'fc-4',
    type: 'family-matching',
    instruction: "Choose",
    options: ['Mosimane', 'Mme', 'Mosetsana', 'Rre'],
    correctAnswer: 'Mosimane',
    image: BoyImage,
    languageId: 'st',
    isLocked: false,
    points: 5,
    difficulty: 'easy',
    translationOption: Dumela,
    hint: "Means Father",
  },

]
