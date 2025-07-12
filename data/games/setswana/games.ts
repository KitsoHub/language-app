
import type { NewGame } from '@/types';
const setswanaGames: NewGame[] = [
  {
    id: 'word-matching-st-greetings',
    type: 'word-matching',
    languageId: 'st',
    categoryId: 'greetings',
    isLocked: false,
    requiresSubscription: false,
    title: 'Setswana Word Matching',
    description: 'Match Setswana greetings',
    icon: '🔤',
    difficulty: 'easy'
  },
  {
    id: 'multiple-choice-st-greetings',
    type: 'multiple-choice',
    languageId: 'st',
    categoryId: 'multiple-choice',
    isLocked: false,
    requiresSubscription: false,
    title: 'Setswana Multiple Choice',
    description: 'Choose correct Setswana greetings',
    icon: '✅',
    difficulty: 'hard'
  }
];


export default setswanaGames;


// export default = [
//   {
//     id: 'word-matching-st-greetings',
//     type: 'word-matching',
//     languageId: 'sp',
//     categoryId: 'greetings',
//     isLocked: false,
//     requiresSubscription: false,
//     title: 'Spanish Word Matching',
//     description: 'Match SetSpanishswana greetings',
//     icon: '🔤',
//     difficulty: 'easy'
//   },
//   {
//     id: 'multiple-choice-st-greetings',
//     type: 'multiple-choice',
//     languageId: 'sp',
//     categoryId: 'multiple-choice',
//     isLocked: false,
//     requiresSubscription: false,
//     title: 'Spanish Multiple Choice',
//     description: 'Choose correct Spanish greetings',
//     icon: '✅',
//     difficulty: 'hard'
//   }
// ];
