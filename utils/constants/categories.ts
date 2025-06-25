import { Challenge } from '@/types';
import { COLORS } from './colors';
import { wordMatchingChallenges, wordMatchingChallengesKalanga } from '@/mocks/challenges/word-matching-challenge';
import { multipleChoiceChallenges } from '@/mocks/challenges/multi-choice-challenge';
import { sentenceBuilderChallenges } from '@/mocks/challenges/sentence-builder-challenge';
import { familyChallenges } from '@/mocks/challenges/family-challenge';
import { fillBlankChallenges } from '@/mocks/challenges/fill-blank-challenge';
import { numberLesson } from '@/mocks/challenges/lesson-numbers';

export interface LessonGame {
  id: string;
  title: string;
  description: string;
  icon: string;
  type:
    | 'word-matching'
    | 'multiple-choice'
    | 'fill-blank'
    | 'sentence-builder'
    | 'family-matching'
    | 'lesson-numbers';
  challenges: Challenge[];
  progress: number;
  isLocked: boolean;
  requiresSubscription: boolean;
  languageId?: string;
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
        id: 'wm-st',
        title: 'Word Matching',
        description: 'Arrange words in the correct order to form greetings.',
        icon: '🔤',
        type: 'word-matching',
        challenges: wordMatchingChallenges.filter(
          (challenge) => !challenge.isLocked,
        ),
        progress: 0,
        isLocked: false,
        requiresSubscription: false,
        languageId: 'st',
      },
      {
        id: 'wm-kl',
        title: 'Word Matching',
        description: 'Arrange words in the correct order to form greetings.',
        icon: '🔤',
        type: 'word-matching',
        challenges: wordMatchingChallengesKalanga.filter(
          (challenge) => !challenge.isLocked,
        ),
        progress: 0,
        isLocked: false,
        requiresSubscription: false,
        languageId: 'kl',
      },{
        id: 'word-matching-kr',
        title: 'Word Matching',
        description: 'Arrange words in the correct order to form greetings.',
        icon: '🔤',
        type: 'word-matching',
        challenges: wordMatchingChallengesKalanga.filter(
          (challenge) => !challenge.isLocked,
        ),
        progress: 0,
        isLocked: false,
        requiresSubscription: false,
        languageId: 'kr',
      },
      {
        id: 'mc-st',
        title: 'Multiple Choice',
        description: 'Choose the correct translation for each greeting.',
        icon: '✅',
        type: 'multiple-choice',
        challenges: multipleChoiceChallenges.filter(
          (challenge) => !challenge.isLocked,
        ),
        progress: 0,
        isLocked: false,
        requiresSubscription: false,
        languageId: 'kl',
      },
      {
        id: 'fb-st',
        title: 'Fill in the Blank',
        description: 'Complete sentences by filling in the blanks.',
        icon: '✏️',
        type: 'fill-blank',
        challenges: fillBlankChallenges.filter(
          (challenge) => !challenge.isLocked,
        ),
        progress: 0,
        isLocked: false,
        requiresSubscription: false,
        languageId: 'st',
      },
    ],
  },
  {
    id: 'numbers',
    title: 'Numbers',
    icon: '🔢',
    color: '#FFDE00', // Bright yellow
    isLocked: false,
    requiresSubscription: false,
    games: [
      {
        id: 'nl-st',
        title: 'Learn Numbers',
        description: 'Complete the lesson',
        icon: '📝',
        type: 'lesson-numbers',
        challenges: numberLesson.filter(
          (challenge) => !challenge.isLocked,
        ),
        progress: 0,
        isLocked: false,
        requiresSubscription: false,
        languageId: 'st',
      },
      {
        id: 'nl-kr',
        title: 'Learn Numbers',
        description: 'Complete the lesson',
        icon: '📝',
        type: 'lesson-numbers',
        challenges: numberLesson.filter(
          (challenge) => !challenge.isLocked,
        ),
        progress: 0,
        isLocked: false,
        requiresSubscription: false,
        languageId: 'kr',
      },
    ],
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
        id: 'fc-st',
        title: 'Family Matching',
        description:
          'Match family member images with their correct translations.',
        icon: '👪',
        type: 'family-matching',
        challenges: familyChallenges.filter(
          (challenge) => !challenge.isLocked,
        ),
        progress: 0,
        isLocked: false,
        requiresSubscription: false,
        languageId: 'kl',
      },
      {
        id: 'sentence-builder',
        title: 'Sentence Builder',
        description: 'Build sentences about family members.',
        icon: '📚',
        type: 'sentence-builder',
        challenges: sentenceBuilderChallenges.filter(
          (challenge) => !challenge.isLocked,
        ),
        progress: 0,
        isLocked: true,
        requiresSubscription: true,
        languageId: 'st',
      },
  
      {
        id: 'sb-kr',
        title: 'Sentence Builder',
        description: 'Build sentences about family members.',
        icon: '📚',
        type: 'sentence-builder',
        challenges: sentenceBuilderChallenges.filter(
          (challenge) => !challenge.isLocked,
        ),
        progress: 0,
        isLocked: false,
        requiresSubscription: true,
        languageId: 'kr',
      },
      {
          id: 'fc-kl',
          title: 'Family Matching',
          description:
            'Match family member images with their correct translations.',
          icon: '👪',
          type: 'family-matching',
          challenges: familyChallenges.filter(
            (challenge) =>
              challenge.languageId === 'kl' && challenge.isLocked === false,
          ),
          progress: 0,
          isLocked: false,
          requiresSubscription: false,
        },
    ],
  },
 
  {
    id: 'fill-blank',
    title: 'Fill in the Blank',
    icon: '✏️',
    color: '#00BFFF', // Deep sky blue
    isLocked: false,
    requiresSubscription: false,
    games: [
      {
        id: 'fb-st',
        title: 'Fill in the Blank',
        description: 'Complete sentences by filling in the blanks.',
        icon: '✏️',
        type: 'fill-blank',
        challenges: fillBlankChallenges.filter(
          (challenge) => !challenge.isLocked,
        ),
        progress: 0,
        isLocked: false,
        requiresSubscription: false,
        languageId: 'st',
      },
      {
        id: 'fb-kl',
        title: 'Fill in the Blank',
        description: 'Complete sentences by filling in the blanks.',
        icon: '✏️',
        type: 'fill-blank',
        challenges: fillBlankChallenges.filter(
          (challenge) => !challenge.isLocked,
        ),
        progress: 0,
        isLocked: false,
        requiresSubscription: false,
        languageId: 'kl',
      },
      {
          id: 'fb-kr',
          title: 'Fill in the Blank',
          description: 'Complete sentences by filling in the blanks.',
          icon: '✏️',
          type: 'fill-blank',
          challenges: fillBlankChallenges.filter(
            (challenge) => !challenge.isLocked && challenge.languageId === 'kr'
          ),
          progress: 0,
          isLocked: false,
          requiresSubscription: false,
          languageId:'kr'
      },
    ],
  },
];
