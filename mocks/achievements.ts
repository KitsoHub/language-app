import { Achievement } from "@/types";

export const achievements: Achievement[] = [
    {
      id: 'first-lesson',
      title: 'First Steps',
      description: 'Complete your first lesson',
      icon: '🎯',
      unlocked: false,
      progress: 0,
      total: 1,
    },
    {
      id: 'streak-7',
      title: 'Week Warrior',
      description: 'Maintain a 7-day streak',
      icon: '🔥',
      unlocked: false,
      progress: 0,
      total: 7,
    },
    {
      id: 'streak-30',
      title: 'Monthly Master',
      description: 'Maintain a 30-day streak',
      icon: '🏆',
      unlocked: false,
      progress: 0,
      total: 30,
    },
    {
      id: 'xp-100',
      title: 'Century Club',
      description: 'Earn 100 XP',
      icon: '💯',
      unlocked: false,
      progress: 0,
      total: 100,
    },
    {
      id: 'perfect-lesson',
      title: 'Perfectionist',
      description: 'Complete a lesson with no mistakes',
      icon: '✨',
      unlocked: false,
      progress: 0,
      total: 1,
    },
  ];
