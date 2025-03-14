import { Course } from "@/types";


export const courses: Course[]=[

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
                title: 'Greetings',
                description: 'Learn how to greet people in Setswana',
                xpReward: 10,
                completed: false,
                locked: false,
                exercises: [
                  {
                    id: 'st-basics-1-1',
                    type: 'multipleChoice',
                    question: 'How do you say "hello" in Setswana?',
                    options: ['Dumela', 'Motsadi', 'Mamuka', "Rumela"],
                    correctAnswer: 'Dumela',
                    hint:'It starts with D',
                  },
                ],
              },
            ],
          },

]
