import type { Challenge } from '@/types';
import { Dumela } from '@/utils/audio';

export const wordMatchingChallenges: Challenge[] = [
  {
    id: 'wm-1',
    type: 'word-matching',
    instruction: "Form the greeting 'dumela'",
    correctOrder: ['du', 'me', 'la'],
    wordBank: ['me', 'du', 'la'],
    languageId: 'st',
    isLocked: false,
    points: 10,
    difficulty: 'easy',
    translationOption: Dumela,
    hint: "Means Hello",
  },
  {
    id: 'wm-2',
    type: 'word-matching',
    instruction: "Form the word 'pula'",
    correctOrder: ['pu', 'la'],
    wordBank: ['la', 'pu'],
    languageId: 'st',
    isLocked: false,
    points: 10,
    difficulty: 'easy'
  },
  {
    id: 'wm-3',
    type: 'word-matching',
    instruction: "Form the word 'mosadi'",
    correctOrder: ['mo', 'sa', 'di'],
    wordBank: ['di', 'mo', 'sa'],
    languageId: 'st',
    isLocked: false,
    points: 15,
    difficulty: 'medium'
  },
  {
    id: 'wm-4',
    type: 'word-matching',
    instruction: "Form the phrase 'dumela mosadi'",
    correctOrder: ['du', 'me', 'la', 'mo', 'sa', 'di'],
    wordBank: ['mo', 'du', 'sa', 'me', 'di', 'la'],
    languageId: 'st',
    isLocked: false,
    points: 20,
    difficulty: 'hard'
  },
  // kalanga
  {
    id: 'wm-5',
    type: 'word-matching',
    instruction: "Form the greeting 'dumilani'",
    correctOrder: ['du', 'mi', 'la', 'ni'],
    wordBank: ['mi', 'du', 'la', 'ni'],
    languageId: 'kl',
    isLocked: false,
    points: 10,
    difficulty: 'easy'
  },
];
