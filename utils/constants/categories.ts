import { Challenge } from "@/types";
import { COLORS } from "./colors";
import { wordMatchingChallenges } from "@/mocks/challenges/word-matching-challenge";
import { multipleChoiceChallenges } from "@/mocks/challenges/multi-choice-challenge";
import { sentenceBuilderChallenges } from "@/mocks/challenges/sentence-builder-challenge";
import { familyChallenges } from "@/mocks/challenges/family-challenge";
import { fillBlankChallenges } from "@/mocks/challenges/fill-blank-challenge";



export interface LessonGame {
  id: string;
  title: string;
  description: string;
  icon: string;
  type: 'word-matching' | 'multiple-choice' | 'fill-blank' | 'sentence-builder' | 'family-matching';
  challenges: Challenge[];
  progress: number;
  isLocked: boolean;
  requiresSubscription: boolean;
}
export interface LessonCategory {
  id: string;
  title: string;
  icon: string;
  color: string;
  games: LessonGame[];
  isLocked: boolean;
  requiresSubscription: boolean;
}

export const lessonCategories: LessonCategory[] = [
    {
    id: 'greetings',
    title: 'Greetings',
    icon: '👋',
    color: COLORS.cyanBlue,
    isLocked: false,
    requiresSubscription: false,
    games: [
              {
        id: 'word-matching',
        title: 'Word Matching',
        description: 'Arrange words in the correct order to form greetings.',
        icon: '🔤',
        type: 'word-matching',
        challenges: wordMatchingChallenges.filter(
          (challenge) => challenge.languageId === 'st' && !challenge.isLocked
        ),
        progress: 0,
        isLocked: false,
        requiresSubscription: false,
      },
            {
        id: 'multiple-choice',
        title: 'Multiple Choice',
        description: 'Choose the correct translation for each greeting.',
        icon: '✅',
        type: 'multiple-choice',
        challenges: multipleChoiceChallenges.filter(
          (challenge) => challenge.languageId === 'st' && !challenge.isLocked
        ),
        progress: 0,
        isLocked: false,
        requiresSubscription: false,
      }
    ]

    },
      {
    id: 'numbers',
    title: 'Numbers',
    icon: '🔢',
    color: '#FFDE00', // Bright yellow
    isLocked: false,
    requiresSubscription: true,
    games: [
      {
        id: 'fill-blank',
        title: 'Fill in the Blank',
        description: 'Complete sentences with the correct numbers.',
        icon: '📝',
        type: 'fill-blank',
        challenges: fillBlankChallenges.filter(
          (challenge) => challenge.languageId === 'st' && !challenge.isLocked
        ),
        progress: 0,
        isLocked: true,
        requiresSubscription: true,
      }
    ]
  },
      {
    id: 'family',
    title: 'Family',
    icon: '👪',
    color: '#FF3A89', // Hot pink
    isLocked: false,
    requiresSubscription: false,
    games: [
      {
        id: 'family-matching',
        title: 'Family Matching',
        description: 'Match family member images with their correct translations.',
        icon: '👪',
        type: 'family-matching',
        challenges: familyChallenges.filter(
          (challenge) => challenge.languageId === 'st' && !challenge.isLocked
        ),
        progress: 0,
        isLocked: false,
        requiresSubscription: false,
      },
      {
        id: 'sentence-builder',
        title: 'Sentence Builder',
        description: 'Build sentences about family members.',
        icon: '📚',
        type: 'sentence-builder',
        challenges: sentenceBuilderChallenges.filter(
          (challenge) => challenge.languageId === 'st' && !challenge.isLocked
        ),
        progress: 0,
        isLocked: true,
        requiresSubscription: true,
      }
    ]
  },
]
