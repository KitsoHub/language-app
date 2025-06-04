import type { Challenge } from '@/types';
import { Dumela, WinSound } from '@/utils/audio';

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
    translationOption: WinSound,
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
  // sekgalagari
  {
    id: 'wm-6',
    type: 'word-matching',
    instruction: "Form the greeting 'rumela'",
    correctOrder: ['ru', 'me', 'la'],
    wordBank: ['me', 'ru', 'la'],
    languageId: 'kr',
    isLocked: false,
    points: 10,
    difficulty: 'easy'
  },
  {
    id: 'wm-kr-2',
    type: 'word-matching',
    instruction: "Form the word 'pula'",
    correctOrder: ['pu', 'la'],
    wordBank: ['la', 'pu'],
    languageId: 'kr',
    isLocked: false,
    points: 10,
    difficulty: 'easy'
  },
  {
    id: 'wm-kr-3',
    type: 'word-matching',
    instruction: "Form the word 'mosari'",
    correctOrder: ['mo', 'sa', 'ri'],
    wordBank: ['ri', 'mo', 'sa'],
    languageId: 'kr',
    isLocked: false,
    points: 15,
    difficulty: 'medium'
  },
  {
    id: 'wm-kr-4',
    type: 'word-matching',
    instruction: "Form the phrase 'rumela mosari'",
    correctOrder: ['ru', 'me', 'la', 'mo', 'sa', 'ri'],
    wordBank: ['mo', 'ru', 'sa', 'me', 'ri', 'la'],
    languageId: 'kr',
    isLocked: false,
    points: 20,
    difficulty: 'hard'
  },
];
