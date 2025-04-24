import type { Challenge } from '@/types';

export const fillBlankChallenges: Challenge[] = [
  {
    id: 'fb-1',
    type: 'fill-blank',
    instruction: "Fill in the blank",
    sentence: "Du___",
    correctAnswer: "mela",
    languageId: 'st',
    isLocked: false,
    points: 5,
    difficulty: 'easy'
  },
  {
    id: 'fb-2',
    type: 'fill-blank',
    instruction: "Fill in the blank",
    sentence: "Ke ___ go ja",
    correctAnswer: "batla",
    languageId: 'st',
    isLocked: false,
    points: 15,
    difficulty: 'medium'
  },
  {
    id: 'fb-3',
    type: 'fill-blank',
    instruction: "Fill in the blank",
    sentence: "O tshogile ___?",
    correctAnswer: "jang",
    languageId: 'st',
    isLocked: false,
    points: 15,
    difficulty: 'medium'
  },
  {
    id: 'fb-4',
    type: 'fill-blank',
    instruction: "Fill in the blank",
    sentence: "___ leboga",
    correctAnswer: "Kea",
    languageId: 'st',
    isLocked: false,
    points: 15,
    difficulty: 'medium'
  },
  {
    id: 'fb-5',
    type: 'fill-blank',
    instruction: "Fill in the blank",
    sentence: "Tsamaya ___",
    correctAnswer: "sentle",
    languageId: 'st',
    isLocked: false,
    points: 15,
    difficulty: 'medium'
  },
];
