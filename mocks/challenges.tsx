export interface Challenge {
    id: number;
    instruction: string;
    correctOrder: string[];
    wordBank: string[];
  }

  export const challenges: Challenge[] = [
    {
      id: 1,
      instruction: "Form the setswana greeting",
      correctOrder: ['du', 'me', 'la'],
      wordBank: ['me', 'du', 'la'],
    },
    {
      id: 2,
      instruction: "Form the word for rain",
      correctOrder: ['pu', 'la'],
      wordBank: ['la', 'pu'],
    },
  ];


  export const newchallenges: Challenge[] = [
    {
      id: 1,
      instruction: "Form the setswana greeting",
      correctOrder: ['du', 'me', 'la'],
      wordBank: ['me', 'du', 'la'],
    },
    {
      id: 2,
      instruction: "Form the word 'rumela'",
      correctOrder: ['ru', 'me', 'la'],
      wordBank: ['la', 'ru', 'me'],
    },
    {
      id: 3,
      instruction: "Form the word for rain",
      correctOrder: ['pu', 'la'],
      wordBank: ['la', 'pu'],
    },
    {
      id: 4,
      instruction: "Form the word for woman",
      correctOrder: ['mo', 'sa', 'di'],
      wordBank: ['di', 'mo', 'sa'],
    },
    {
      id: 5,
      instruction: "Form the phrase 'dumela mosadi'",
      correctOrder: ['du', 'me', 'la', 'mo', 'sa', 'di'],
      wordBank: ['mo', 'du', 'sa', 'me', 'di', 'la'],
    },
  ];
