import type { Challenge } from '@/types';

export const multipleChoiceChallenges: Challenge[] = [
  {
    id: 'mc-1',
    type: 'multiple-choice',
    instruction: "What does 'dumela' mean?",
    options: ['Hello', 'Goodbye', 'Thank you', 'Please'],
    correctAnswer: 'Hello',
    languageId: 'st',
    isLocked: false,
    points: 5,
    difficulty: 'easy'
  },
  {
    id: 'mc-2',
    type: 'multiple-choice',
    instruction: "What does 'mosadi' mean?",
    options: ['Man', 'Woman', 'Child', 'Friend'],
    correctAnswer: 'Woman',
    languageId: 'st',
    isLocked: false,
    points: 5,
    difficulty: 'easy'
  },
  {
    id: 'mc-3',
    type: 'multiple-choice',
    instruction: "What does 'pula' mean?",
    options: ['Rain', 'Sun', 'Wind', 'Cloud'],
    correctAnswer: 'Rain',
    languageId: 'st',
    isLocked: false,
    points: 5,
    difficulty: 'easy'
  },
  {
    id: 'mc-4',
    type: 'multiple-choice',
    instruction: "Choose the correct translation for 'Thank you'",
    options: ['Dumela', 'Kea leboga', 'Tanki', 'Tsamaya'],
    correctAnswer: 'Kea leboga',
    languageId: 'st',
    isLocked: false,
    points: 10,
    difficulty: 'medium'
  },
  {
    id: 'mc-5',
    type: 'multiple-choice',
    instruction: "Choose the correct translation for 'How are you?'",
    options: ['Dumela', 'Kea leboga', 'O tshogile jang', 'Go jwang'],
    correctAnswer: 'O tshogile jang',
    languageId: 'st',
    isLocked: false,
    points: 10,
    difficulty: 'medium'
  },
];
