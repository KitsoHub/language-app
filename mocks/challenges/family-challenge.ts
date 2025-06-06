import { Challenge } from "@/types";
import { Dumela } from "@/utils/audio";
import { GirlImage } from "@/utils/images";


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
    hint: "Means Father",
  }]
