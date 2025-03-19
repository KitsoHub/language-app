import { Course } from "@/types";
import { Audio } from "expo-av";

const Vowels = [
  { vowel: 'A', audio: require('././assets/audio/Schwa-What.mp3') },
  { vowel: 'E', audio: require('././assets/audio/Schwa-What.mp3') },
  { vowel: 'I', audio: require('././assets/audio/Schwa-What.mp3') },
  { vowel: 'O', audio: require('././assets/audio/Schwa-What.mp3') },
  { vowel: 'U', audio: require('././assets/audio/Schwa-What.mp3')},
]

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
        description: 'Learn how to greet people in Setswana',
        xpReward: 10,
        completed: false,
        locked: false,
        exercises: [
          {
            id: 'st-basics-1-1',
            type: 'listening',
            question: 'listen to setswana vowels?',
            options: Vowels,
        
          },
          {
            id: 'st-basics-1-2',
            type: 'listening',
            question: 'How do you say "B" in Setswana?',
            options: ['A', 'D', 'B', "W"],
            correctAnswer: 'B',
            hint: 'It starts with B',
          },
        ],
      },
      {
        id: 'st-basics-2',
        courseId: 'st-basics',
        title: 'Greetings',
        description: 'Learn how to greet people in Setswana',
        xpReward: 10,
        completed: false,
        locked: true,
        exercises: [
          {
            id: 'st-basics-2-1',
            type: 'multipleChoice',
            question: 'How do you say "hello" in Setswana?',
            options: ['Dumela', 'Motsadi', 'Mamuka', "Rumela"],
            correctAnswer: 'Dumela',
            hint: 'It starts with D',
          },

        ],
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
    description: 'Learn essential Kalanga vocabulary and phrases',
    level: 1,
    icon: '🏠',
    lessons: [
      {
        id: 'kl-basics-1',
        courseId: 'kl-basics',
        title: 'Greetings',
        description: 'Learn how to greet people in Kalanga',
        xpReward: 10,
        completed: false,
        locked: false,
        exercises: [
          {
            id: 'kl-basics-1-1',
            type: 'multipleChoice',
            question: 'How do you say "hello" in Kalanga?',
            options: ['Dumela', 'Mamuka', 'Rumela', 'Wena'],
            correctAnswer: 'Mamuka',
            hint: 'It starts with M',
          },
          {
            id: 'kl-basics-1-2',
            type: 'translation',
            question: 'Translate: Good morning',
            // options: ['Dumela', 'Mamuka', 'Rumela', 'Wena'],
            correctAnswer: 'Mamuka',
            hint: 'Mamuka Chine',
          },
        ],
      },
    ],
  },
  // shekhalagadi
  {
    id: 'kr-basics',
    languageId: 'kr',
    title: 'Basics',
    description: 'Learn essential Shekgalagari vocabulary and phrases',
    level: 1,
    icon: '🏠',
    lessons: [
      {
        id: 'kr-basics-1',
        courseId: 'kr-basics',
        title: 'Greetings',
        description: 'Learn how to greet people in Kalanga',
        xpReward: 10,
        completed: false,
        locked: false,
        exercises: [
          {
            id: 'kr-basics-1-1',
            type: 'multipleChoice',
            question: 'How do you say "hello" in Shekgalagari?',
            options: ['Dumela', 'Mamuka', 'Rumela', 'Wena'],
            correctAnswer: 'Rumela',
            hint: 'It starts with M',
          },
          {
            id: 'kr-basics-1-2',
            type: 'translation',
            question: 'Translate: Good morning',
             options: ['Dumela', 'Mamuka', 'Rumela', 'Wena'],
            correctAnswer: 'Rumela',
            hint: 'Rumela Mma',
          },
        ],
      },
    ],
  }
]
