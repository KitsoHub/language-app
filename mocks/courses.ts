import { Course } from "@/types";
import { Vowels } from "./vowels";

import { avatars } from "./vowels";
import { greetings } from "./greetings";

export const courses: Course[] = [

  {
    id: 'st-basics',
    languageId: 'st',
    title: 'Basics',
    description: 'Learn essential Setswana vocabulary and phrases',
    level: 1,
    icon: '🏠',
    lessons: [

      {
        id: 'st-basics-1',
        courseId: 'st-basics',
        title: 'Vowels',
        description: 'Learn how to Vowels people in Setswana',
        xpReward: 10,
        completed: false,
        locked: false,
        exercises: [
                    {
            id: 'st-basics-1-1',
            type: 'listening',
            question: 'listen to setswana vowels?',
            options: Vowels,
            correctAnswer: Vowels[0].vowel,
          },

        ],
      },
      {
        id: 'st-basics-2',
        courseId: 'st-basics',
        title: 'Conversation',
        description: "Learn how to pronounce words",
        xpReward: 10,
        completed:false,
        locked: false,
        exercises:[
                    {
            id: 'st-basics-2-1',
            type: 'listening',
            question: 'listen to setswana greetings?',
            options: greetings,
            correctAnswer: greetings[0].greeting,
          },
        ]
      },
      {
        id: 'st-basics-3',
        courseId: 'st-basics',
        title: 'Greetings',
        description: 'Learn how to greet people in Setswana',
        xpReward: 10,
        completed: false,
        locked: true,
        exercises: [
          {
            id: 'st-basics-3-1',
            type: 'multipleChoice',
            question: 'How do you say "hello" in Setswana?',
            options: ['Dumela', 'Motsadi', 'Mamuka', "Rumela"],
            correctAnswer: 'Dumela',
            hint: 'It starts with D',
          },

        ],
      },
      {
        id: 'st-basics-4',
        courseId: 'st-basics',
        title: 'People',
        description: 'Learn how to speak in Setswana',
        xpReward: 20,
        completed: false,
        locked: true,
        exercises: [
          {
            id: 'st-basics-4-1',
            type: 'picture-matching',
            question: 'choose the word that matches the image',
            avatar: avatars[0].image, // Use imported image
            options: ['Mosimane', 'Mosadi', 'monna', "mosetsana"],
            correctAnswer: 'Mosimane',
            hint: 'It starts with M',
          },
          {
            id: 'st-basics-4-2',
            type: 'picture-matching',
            question: 'choose the word that matches the image',
            avatar: avatars[1].image, // Use imported image
            options: ['Mosimane', 'Mosadi', 'monna', "mosetsana"],
            correctAnswer: 'Mosadi',
            hint: 'It starts with M',
          },

        ],
      },
      {
        id: 'st-basics-5',
        courseId: 'st-basics',
        title: 'translation',
        description: "Learn how to translate words",
        xpReward: 50,
        completed:false,
        locked: true,
        exercises:[
                    {
            id: 'st-basics-5-1',
            type: 'translation',
            question: 'hello in setswana?',
            avatar: avatars[0].image,
            options: ['u', 'd', 'l', 'e','m','a',],
            correctAnswer: "dumela",
          },
        ]
      },
      {
        id: 'st-basics-6',
        courseId: 'st-basics-6',
        title: 'Word Matching',
        description: "Learn how to write words",
        xpReward: 50,
        completed:false,
        locked: false,
        exercises:[
                    {
            id: 'st-basics-6-1',
            type: 'word-matching',
            question: "Form the word 'Hello' in Setswana",
            avatar: avatars[0].image,
            wordOptions: ['me', 'la', 'du'],
            correctWordOrder: ['du', 'me', 'la'],
          },
        ]
      },
    ],
  },
  {
    id: 'st-food',
    languageId: 'st',
    title: 'Food & Dining',
    description: 'Learn vocabulary related to food and restaurants',
    level: 2,
    icon: '🍽️',
    lessons: [
      {
        id: 'st-food-1',
        courseId: 'st-food',
        title: 'Basic Food Items',
        description: 'Learn names of common food items',
        xpReward: 15,
        completed: false,
        locked: true,
        exercises: [],
      },
    ],
  },
  // Kalanga
  {
    id: 'kl-basics',
    languageId: 'kl',
    title: 'Basics',
    description: 'Learn essential kalanga vocabulary and phrases',
    level: 1,
    icon: '🏠',
    lessons: [

      {
        id: 'kl-basics-1',
        courseId: 'st-basics',
        title: 'Vowels',
        description: 'Learn how to Vowels people in Kalanga',
        xpReward: 10,
        completed: false,
        locked: false,
        exercises: [
                    {
            id: 'st-basics-1-1',
            type: 'listening',
            question: 'listen to kalanga vowels?',
            options: Vowels,
            correctAnswer: Vowels[0].vowel,
          },

        ],
      },
      {
        id: 'kl-basics-2',
        courseId: 'kl-basics',
        title: 'Conversation',
        description: "Learn how to pronounce words",
        xpReward: 10,
        completed:false,
        locked: false,
        exercises:[
                    {
            id: 'kl-basics-2-1',
            type: 'listening',
            question: 'listen to kalanga vowels?',
            options: greetings,
            correctAnswer: greetings[0].greeting,
          },
        ]
      },
      {
        id: 'kl-basics-3',
        courseId: 'st-basics',
        title: 'Greetings',
        description: 'Learn how to greet people in kalanga',
        xpReward: 10,
        completed: false,
        locked: true,
        exercises: [
          {
            id: 'kl-basics-3-1',
            type: 'multipleChoice',
            question: 'How do you say "hello" in Kalanga?',
            options: ['Dumela', 'Motsadi', 'Mamuka', "Rumela"],
            correctAnswer: 'Mamuka',
            hint: 'It starts with M',
          },

        ],
      },
      {
        id: 'kl-basics-4',
        courseId: 'kl-basics',
        title: 'People',
        description: 'Learn how to speak in Kalanga',
        xpReward: 20,
        completed: false,
        locked: true,
        exercises: [
          {
            id: 'kl-basics-4-1',
            type: 'matching',
            question: 'choose the word that matches the image',
            avatar: avatars[0].image, // Use imported image
            options: ['Mosimane', 'Mosadi', 'monna', "mosetsana"],
            correctAnswer: 'Mosimane',
            hint: 'It starts with M',
          },
          {
            id: 'kl-basics-4-2',
            type: 'matching',
            question: 'choose the word that matches the image',
            avatar: avatars[1].image, // Use imported image
            options: ['Mosimane', 'Mosadi', 'monna', "mosetsana"],
            correctAnswer: 'Mosadi',
            hint: 'It starts with M',
          },

        ],
      },

    ],
  },
  // TODO: to fix
  {
    id: 'kr-basics',
    languageId: 'kr',
    title: 'Basics',
    description: 'Learn essential shekhalagadi vocabulary and phrases',
    level: 1,
    icon: '🏠',
    lessons: [

      {
        id: 'st-basics-1',
        courseId: 'st-basics',
        title: 'Vowels',
        description: 'Learn how to Vowels people in Sekhalagadi',
        xpReward: 10,
        completed: false,
        locked: false,
        exercises: [
                    {
            id: 'kr-basics-1-1',
            type: 'listening',
            question: 'listen to Sekhalagari vowels?',
            options: Vowels,
            correctAnswer: Vowels[0].vowel,
          },

        ],
      },
      {
        id: 'kr-basics-2',
        courseId: 'kr-basics',
        title: 'Conversation',
        description: "Learn how to pronounce words",
        xpReward: 10,
        completed:false,
        locked: false,
        exercises:[
                    {
            id: 'kr-basics-2-1',
            type: 'listening',
            question: 'listen to setswana vowels?',
            options: greetings,
            correctAnswer: greetings[0].greeting,
          },
        ]
      },
      {
        id: 'kr-basics-3',
        courseId: 'kr-basics',
        title: 'Greetings',
        description: 'Learn how to greet people in Sekhalagadi',
        xpReward: 10,
        completed: false,
        locked: true,
        exercises: [
          {
            id: 'st-basics-3-1',
            type: 'multipleChoice',
            question: 'How do you say "hello" in Sekhalagari?',
            options: ['Dumela', 'Motsadi', 'Mamuka', "Rumela"],
            correctAnswer: 'Rumela',
            hint: 'It starts with R',
          },

        ],
      },
      {
        id: 'kr-basics-4',
        courseId: 'kr-basics',
        title: 'People',
        description: 'Learn how to speak in Sekhalagari',
        xpReward: 20,
        completed: false,
        locked: true,
        exercises: [
          {
            id: 'kr-basics-4-1',
            type: 'matching',
            question: 'choose the word that matches the image',
            avatar: avatars[0].image, // Use imported image
            options: ['Mosimane', 'Mosadi', 'monna', "mosetsana"],
            correctAnswer: 'Mosimane',
            hint: 'It starts with M',
          },
          {
            id: 'kr-basics-4-2',
            type: 'matching',
            question: 'choose the word that matches the image',
            avatar: avatars[1].image, // Use imported image
            options: ['Mosimane', 'Mosadi', 'monna', "mosetsana"],
            correctAnswer: 'Mosadi',
            hint: 'It starts with M',
          },

        ],
      },

    ],
  },
]
