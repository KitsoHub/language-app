import type { Achievement } from '@/types';

export const achievements: Achievement[] = [
  {
    id: 'sign-in',
    title: 'Daily sign in',
    description: 'Welcome Back',
    icon: '🎯',
  },
  {
    id: 'first-lesson',
    title: 'First Steps',
    description: 'Complete your first lesson',
    icon: '🎓',
  },
  {
    id: 'level-10',
    title: 'Level 10',
    description: 'Level up',
    icon: '🏆',
  },
  {
    id: 'streak-7',
    title: 'Week Warrior',
    description: 'Maintain a 7-day streak',
    icon: '🔥',
  },
  {
    id: 'word-master',
    title: 'Word Master',
    description: 'Complete 5 word matching challenges',
    icon: '🔤',
  },
  {
    id: 'sentence-builder',
    title: 'Sentence Builder',
    description: 'Build 5 complete sentences',
    icon: '📝',
  },
  {
    id: 'fill-blank',
    title: 'Blanks',
    description: 'Fill in the Blanks',
    icon: '🏆',
  },
  {
    id: 'multiple-choice',
    title: 'Multiple Choice',
    description: 'Choice Master',
    icon: '🏆',
  },
  {
    id: 'explorer',
    title: 'Explorer',
    description: 'Try all game types',
    icon: '🌍',
  },
  {
    id: 'xp-100',
    title: 'Century Club',
    description: 'Earn 100 XP',
    icon: '💯',
  },
  {
    id: 'gold-tier-600-699',
    title: 'Gold League',
    description: 'Earn 600-699 XP',
    icon: '🏆',
  },
];

// breakdown of the tiers into games ranges eg word-matching [bronze-tier, etc]
// bronze-tier - [1-99, 100-199, 200-299,] - coins 100
// silver-tier - [300-399, 400-499, 500-599,] - coins 200
// gold-tier - [600-699, 700-799, 800-899,] - coins 300
// platinum-tier - [900-999, 1000-1099, 1100-1199,] - coins 400
// diamond-tier - [1200-1299, 1300-1399, 1400-1499,] - coins 500
// ruby-tier - [1500-1599, 1600-1699, 1700-1799,] - coins 600
// emerald-tier - [1800-1899, 1900-1999, 2000-2099,] - coins 700
// sapphire-tier - [2100-2199, 2200-2299, 2300-2399,] - coins 800
// amethyst-tier - [2400-2499, 2500-2599, 2600-2699,] - coins 900

//game design day streak implementation

// export const old_achievements: Achievement[] = [

//   {
//     id: 'sign-in',
//     title: 'Daily sign in',
//     description: 'Welcome Back',
//     icon: '✨',
//     unlocked: true,
//     progress: 0,
//     total: 0,
//   },
//     {
//       id: 'first-lesson',
//       title: 'First Steps',
//       description: 'Complete your first lesson',
//       icon: '🎯',
//       unlocked: true,
//       progress: 0,
//       total: 1,
//     },
//     {
//       id: 'streak-7',
//       title: 'Week Warrior',
//       description: 'Maintain a 7-day streak',
//       icon: '🔥',
//       unlocked: false,
//       progress: 0,
//       total: 7,
//     },
//     {
//       id: 'streak-30',
//       title: 'Monthly Master',
//       description: 'Maintain a 30-day streak',
//       icon: '🏆',
//       unlocked: false,
//       progress: 0,
//       total: 30,
//     },
//     {
//       id: 'xp-100',
//       title: 'Century Club',
//       description: 'Earn 100 XP',
//       icon: '💯',
//       unlocked: false,
//       progress: 0,
//       total: 100,
//     },
//     {
//       id: 'perfect-lesson',
//       title: 'Perfectionist',
//       description: 'Complete a lesson with no mistakes',
//       icon: '✨',
//       unlocked: false,
//       progress: 0,
//       total: 1,
//     },
//   ];
