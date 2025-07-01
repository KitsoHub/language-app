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
    difficulty: 'hard',
    hint: "Means I am learning Setswana",
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
    difficulty: 'hard',

    hint: "Means I want to eat food",
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
    difficulty: 'hard',
  
    hint: "Means How are you today?",
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
    difficulty: 'hard',
   
    hint: "Means Thank you very much",

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
    difficulty: 'hard',

    hint: "Means I like to speak Setswana",
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
  {
    id: 'sb-7',
    type: 'sentence-builder',
    instruction: "Build the sentence: 'I want to eat food'",
    correctOrder: ['Ke', 'batla', 'go', 'ja', 'dijo'],
    wordBank: ['dijo', 'Ke', 'batla', 'go', 'ja', 'nwa'],
    languageId: 'kl',
    isLocked: false,
    points: 20,
    difficulty: 'hard'
  },
  {
    id: 'sb-8',
    type: 'sentence-builder',
    instruction: "Build the sentence: 'How are you today?'",
    correctOrder: ['O', 'tshogile', 'jang', 'Gompieno'],
    wordBank: ['jang', 'O', 'tshogile', 'Gompieno', 'sentle', 'Kamoso'],
    languageId: 'kl',
    isLocked: false,
    points: 20,
    difficulty: 'hard'
  },
  {
    id: 'sb-9',
    type: 'sentence-builder',
    instruction: "Build the sentence: 'Thank you very much'",
    correctOrder: ['Ke', 'lebogile', 'thata'],
    wordBank: ['thata', 'Ke', 'lebogile', 'sentle', 'jang'],
    languageId: 'kl',
    isLocked: false,
    points: 20,
    difficulty: 'hard'
  },
  {
    id: 'sb-10',
    type: 'sentence-builder',
    instruction: "Build the sentence: 'I like to speak Setswana'",
    correctOrder: ['Ke', 'rata', 'go', 'bua', 'Setswana'],
    wordBank: ['Setswana', 'Ke', 'rata', 'go', 'bua', 'ithuta'],
    languageId: 'kl',
    isLocked: false,
    points: 25,
    difficulty: 'hard'
  },
  // sekgalagari
  {
    id: 'sb-kr-1',
    type: 'sentence-builder',
    instruction: "Build the sentence: 'I am learning Setswana'",
    correctOrder: ['Ke', 'ithuta', 'Setswana'],
    wordBank: ['Ke', 'ithuta', 'Setswana', 'batla', 'go'],
    languageId: 'kr',
    isLocked: false,
    points: 20,
    difficulty: 'hard'
  },
  {
    id: 'sb-kr-2',
    type: 'sentence-builder',
    instruction: "Build the sentence: 'I want to eat food'",
    correctOrder: ['Ke', 'batla', 'go', 'ja', 'dijo'],
    wordBank: ['Ke', 'batla', 'go', 'ja', 'dijo', 'nwa'],
    languageId: 'kr',
    isLocked: false,
    points: 20,
    difficulty: 'hard'
  },
  {
    id: 'sb-kr-3',
    type: 'sentence-builder',
    instruction: "Build the sentence: 'How are you today?'",
    correctOrder: ['O', 'tshogile', 'jang', 'Gompieno'],
    wordBank: ['O', 'tshogile', 'jang', 'Gompieno', 'sentle', 'Kamoso'],
    languageId: 'kr',
    isLocked: false,
    points: 20,
    difficulty: 'hard'
  },
  {
    id: 'sb-kr-4',
    type: 'sentence-builder',
    instruction: "Build the sentence: 'Thank you very much'",
    correctOrder: ['Ke', 'lebogile', 'thata'],
    wordBank: ['Ke', 'lebogile', 'thata', 'sentle', 'jang'],
    languageId: 'kr',
    isLocked: false,
    points: 20,
    difficulty: 'hard'
  },
  {
    id: 'sb-kr-5',
    type: 'sentence-builder',
    instruction: "Build the sentence: 'I like to speak Setswana'",
    correctOrder: ['Ke', 'rata', 'go', 'bua', 'Setswana'],
    wordBank: ['Ke', 'rata', 'go', 'bua', 'Setswana', 'ithuta'],
    languageId: 'kr',
    isLocked: false,
    points: 25,
    difficulty: 'hard'
  },
  {
    id: 'sb-kr-6',
    type: 'sentence-builder',
    instruction: "Build the sentence: 'I am learning Setswana'",
    correctOrder: ['Ke', 'ithuta', 'Setswana'],
    wordBank: ['Ke', 'ithuta', 'Setswana', 'batla', 'go'],
    languageId: 'kr',
    isLocked: false,
    points: 20,
    difficulty: 'hard'
  },
];
