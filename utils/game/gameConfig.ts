import { Difficulty, GameType, NewGame } from "@/types";

interface GameConfig {
  type: GameType;
  title: string;
  description: string;
  difficulty: Difficulty;
  icon: string;
}


export const gameConfigs: Record<GameType, GameConfig> ={
  'word-matching': {
    type: 'word-matching',
    title: 'Word Matching',
    description: 'Arrange words in the correct order',
    difficulty: 'easy',
    icon: '🔤',
  },
    'multiple-choice': {
    type: 'multiple-choice',
    title: 'Multiple Choice',
    description: 'Choose the correct translation',
    difficulty: 'medium',
    icon: '✅',
  },
  'fill-blank': {
    type: 'fill-blank',
    title: 'Fill in the Blank',
    description: 'Complete sentences by filling in the blanks',
    difficulty: 'medium',
    icon: '✏️',
  },
  'sentence-builder': {
    type: 'sentence-builder',
    title: 'Sentence Builder',
    description: 'Build sentences using given words',
    difficulty: 'hard',
    icon: '📚',
  },
  'family-matching': {
    type: 'family-matching',
    title: 'Family Matching',
    description: 'Match family member images with translations',
    difficulty: 'easy',
    icon: '👪',
  },
  'lesson-numbers': {
    type: 'lesson-numbers',
    title: 'Learn Numbers',
    description: 'Complete the numbers lesson',
    difficulty: 'easy',
    icon: '📝',
  },

}

// const generateGamesForLanguage = (languageId: string, categoryId:string, isLocked:boolean, requiresSubscription:boolean): NewGame[]=>{
//   return Object.values(gameConfigs).map(config =>({
//     id: `${config.type}-${languageId}`,
//     languageId,
//     categoryId,
//     isLocked,
//     requiresSubscription,
//     ...config
//   }))
// }
