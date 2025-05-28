import type { Challenge } from '@/types';

export const sentenceBuilderChallenges: Challenge[] = [
  {
    id: 'sb-1',
    type: 'sentence-builder',
    instruction: "Build the sentence: 'I am learning Setswana'",
    correctOrder: ['Ke', 'ithuta', 'Setswana'],
    wordBank: ['Setswana', 'Ke', 'ithuta', 'batla', 'go'],
    languageId: 'st',
    isLocked: false,
    points: 20,
    difficulty: 'hard'
  },
  {
    id: 'sb-2',
    type: 'sentence-builder',
    instruction: "Build the sentence: 'I want to eat food'",
    correctOrder: ['Ke', 'batla', 'go', 'ja', 'dijo'],
    wordBank: ['dijo', 'Ke', 'batla', 'go', 'ja', 'nwa'],
    languageId: 'st',
    isLocked: false,
    points: 20,
    difficulty: 'hard'
  },
  {
    id: 'sb-3',
    type: 'sentence-builder',
    instruction: "Build the sentence: 'How are you today?'",
    correctOrder: ['O', 'tshogile', 'jang', 'Gompieno'],
    wordBank: ['jang', 'O', 'tshogile', 'Gompieno', 'sentle', 'Kamoso'],
    languageId: 'st',
    isLocked: false,
    points: 20,
    difficulty: 'hard'
  },
  {
    id: 'sb-4',
    type: 'sentence-builder',
    instruction: "Build the sentence: 'Thank you very much'",
    correctOrder: ['Ke', 'lebogile', 'thata'],
    wordBank: ['thata', 'Ke', 'lebogile', 'sentle', 'jang'],
    languageId: 'st',
    isLocked: false,
    points: 20,
    difficulty: 'hard'
  },
  {
    id: 'sb-5',
    type: 'sentence-builder',
    instruction: "Build the sentence: 'I like to speak Setswana'",
    correctOrder: ['Ke', 'rata', 'go', 'bua', 'Setswana'],
    wordBank: ['Setswana', 'Ke', 'rata', 'go', 'bua', 'ithuta'],
    languageId: 'st',
    isLocked: false,
    points: 25,
    difficulty: 'hard'
  },
  //kalanga
  {
    id: 'sb-6',
    type: 'sentence-builder',
    instruction: "Build the sentence: 'I am learning Setswana'",
    correctOrder: ['Ke', 'ithuta', 'Setswana'],
    wordBank: ['Setswana', 'Ke', 'ithuta', 'batla', 'go'],
    languageId: 'kl',
    isLocked: false,
    points: 20,
    difficulty: 'hard'
  },
];
