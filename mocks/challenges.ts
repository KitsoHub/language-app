
// add challeng type (word matching game, image matching game, etc)

import type { Challenge } from "@/types";


  export const challenges: Challenge[] = [
    {
      id: 1,
      instruction: "Form the setswana greeting",
      correctOrder: ['du', 'me', 'la'],
      wordBank: ['me', 'du', 'la'],
      languageId: 'st',
      isLocked: false,
      isCompleted: false,
      badge: 'Hard',
    },
    {
      id: 2,
      instruction: "Form the word for rain",
      correctOrder: ['pu', 'la'],
      wordBank: ['la', 'pu'],
      languageId: 'st',
      isLocked: false,
      isCompleted: false,
      badge: 'Medium',
    },
    {
      id: 3,
      instruction: "Form the word for rain",
      correctOrder: ['pu', 'la'],
      wordBank: ['la', 'pu'],
      languageId: 'st',
      isLocked: true,
      isCompleted: false,
      badge: 'Expert',
    },

    {
      id: 4,
      instruction: "Kalanga greeting",
      correctOrder: ['ma', 'mu', 'ka'],
      wordBank: ['ka', 'ma', 'mu'],
      languageId: 'kl',
      isLocked: false,
      isCompleted: false,
      badge: 'Easy',
    },
  ];
