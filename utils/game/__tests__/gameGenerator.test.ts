import { NewChallenge, Challenge } from '@/types';
import { gameConfigs } from '../gameConfig';
import { GamesGenerator } from '../gameGenerator';

const mockChallengesX: Challenge[] = [
  {
    id: 'multiple-choice-st',
    type: 'multiple-choice',
    instruction: "What does 'dumela' mean?",
    options: ['Hello', 'Goodbye', 'Thank you', 'Please'],
    correctAnswer: 'Hello',
    languageId: 'st',
    isLocked: false,
    points: 5,
    difficulty: 'easy'
  },
  {
    id: 'multiple-choice-kl',
    type: 'multiple-choice',
    instruction: "What does 'dumela' mean?",
    options: ['Hello', 'Goodbye', 'Thank you', 'Please'],
    correctAnswer: 'Hello',
    languageId: 'kl',
    isLocked: false,
    points: 5,
    difficulty: 'easy'
  },

  {
    id: 'multiple-choice-kr',
    type: 'multiple-choice',
    instruction: "What does 'dumela' mean?",
    options: ['Hello', 'Goodbye', 'Thank you', 'Please'],
    correctAnswer: 'Hello',
    languageId: 'kr',
    isLocked: false,
    points: 5,
    difficulty: 'easy'
  },
];

export const mockChallenges: NewChallenge[] = [
  {
    id: 'challenge-1',
    languageId: 'st',
    isLocked: false,
  },
  {
    id: 'challenge-2',
    languageId: 'kl',
    isLocked: false,
  },
  {
    id: 'challenge-3',
    languageId: 'st',
    isLocked: true,
  },
  {
    id: 'challenge-4',
    languageId: 'kr',
    isLocked: false,
  },
];

describe('Generate GameId', () => {
  it('should generate consistent game IDs', () => {
    const id1 = GamesGenerator.generateGameId(
      'word-matching',
      'st',
      'greetings',
    );
    const id2 = GamesGenerator.generateGameId(
      'word-matching',
      'st',
      'greetings',
    );

    expect(id1).toBe(id2);
    expect(id1).toBe('word-matching-st-greetings');
  });

  it('should generate ID without category when not provided', () => {
    const id = GamesGenerator.generateGameId('word-matching', 'st');

    expect(id).toBe('word-matching-st');
  });

  it('should handle different game types and languages', () => {
    const id = GamesGenerator.generateGameId('multiple-choice', 'kl', 'family');

    expect(id).toBe('multiple-choice-kl-family');
  });
});
describe('GameGenerator', () => {
  describe('Generate Games for language', () => {
    it('should generate games for a single language with default options', () => {
      const games = GamesGenerator.generateGamesForLanguage({
        languageId: 'st',
        categoryId: 'greetings',
      });

      const expectedTypes = [
        'word-matching',
        'multiple-choice',
        'fill-blank',
        'sentence-builder',
        'family-matching',
      ];
      expect(games).toHaveLength(expectedTypes.length);
    });

    it('should generate games for a specificcategory ', () => {
      const games = GamesGenerator.generateGamesForLanguage({
        languageId: 'st',
        categoryId: 'numbers',
      });
      const expectedTypes = [
        'lesson-numbers',
        'multiple-choice',
        'word-matching',
      ];
      expect(games).toHaveLength(expectedTypes.length);
    });
  });
});


describe('Category Games', () => {
  describe('Category Lesson Game Generation', () => {
    it('should generate lesson games with challenges using category defaults', () => {
        const  games = GamesGenerator.generateLessonGames({
            languageId: 'st',
            categoryId:'greetings',
            challenges:mockChallenges,
        })
    const expectedTypes = ['word-matching', 'multiple-choice', 'fill-blank', 'sentence-builder', 'family-matching'];
      expect(games).toHaveLength(expectedTypes.length);

      games.forEach(game =>
            {
                expect(expectedTypes).toContain(game.type);

            game.challenges.forEach(challenge => {
          expect(challenge.languageId).toBe('st');
          expect(challenge.isLocked).toBe(false);
        });
            }
        )

    });

    it('should generate lesson games with explicit game types', () => {
      const games = GamesGenerator.generateLessonGames({
        languageId: 'st',
        categoryId: 'greetings',
        challenges: mockChallenges,
        gameTypes: ['word-matching', 'multiple-choice'],
      });

      expect(games).toHaveLength(2);
      games.forEach(game => {
        expect(['word-matching', 'multiple-choice']).toContain(game.type);
      });
    });

    it('should exclude game types', () => {
      const games = GamesGenerator.generateLessonGames({
        languageId: 'kl',
        categoryId: 'numbers',
        challenges: mockChallenges,
        excludeGameTypes: ['word-matching'],
      });

      const expectedTypes = ['lesson-numbers', 'multiple-choice'];
      expect(games).toHaveLength(expectedTypes.length)

      games.forEach(game => {
        // console.log("<< Game >>", game)
        // console.log("<< Challenges >>", game.challenges)
        expect(expectedTypes).toContain(game.type)
        expect(game.type).not.toBe('word-matching')
      });
    });

    it('should filter challenges correctly by language and lock status', ()=> {
        const games =  GamesGenerator.generateLessonGames({
            languageId:'kl',
            categoryId:'family',
            challenges: mockChallenges,
            gameTypes:['word-matching']
        });

        expect(games).toHaveLength(1)

        const game = games[0];
        expect(game.challenges).toHaveLength(1);
        expect(game.challenges[0].languageId).toBe('kl');
        expect(game.challenges[0].isLocked).toBe(false);
    })

    it("should set custom progress value", ()=>{
        const games =  GamesGenerator.generateLessonGames({
            languageId: 'st',
            categoryId:'greetings',
            challenges:mockChallenges,
            progress:50,
            gameTypes:['word-matching']
        })

        expect(games[0].progress).toBe(50)
    })
});
});

describe('GameGenerator Multiple Languages', () => {
  describe('Generate Games for Multiple Languages', () => {
    it('should generate games multiple languages with default options', () => {

        const games = GamesGenerator.generateGamesForMultipleLanguages(
            ['st','kl','kr'],
            'greetings'
        )

        // const expectedTypes = ['word-matching', 'multiple-choice', 'fill-blank', 'sentence-builder', 'family-matching'];
        expect(games).toHaveLength(15)

        const languageIds = games.map(game => game.languageId);
        expect(languageIds.filter(id => id === 'st')).toHaveLength(5);
        expect(languageIds.filter(id => id === 'kl')).toHaveLength(5);
        expect(languageIds.filter(id => id === 'kr')).toHaveLength(5);

    });

    it('should generate games for multiple languages with specific game types', () => {
        const games = GamesGenerator.generateGamesForMultipleLanguages(
            ['st','kl','kr'],
            'greetings',
       ['word-matching', 'multiple-choice']
        )

        expect(games).toHaveLength(6);
        const languageIds = games.map(game => game.languageId);
        expect(languageIds.filter(id=> id==='st')).toHaveLength(2);
                expect(languageIds.filter(id=> id==='kl')).toHaveLength(2);
                        expect(languageIds.filter(id=> id==='kr')).toHaveLength(2);




  });

      it('should generate games with correct category for all languages', () => {
      const games = GamesGenerator.generateGamesForMultipleLanguages(
        ['st', 'kl'],
        'family'
      );

      games.forEach(game => {
        expect(game.categoryId).toBe('family');
      });
    });

    it("should respect exclusions for multiple languages", ()=>{
      const games = GamesGenerator.generateGamesForMultipleLanguages(
        ['st', 'kl'],
        'numbers',
        undefined,
        ['word-matching']
      );


      games.forEach(game => {
        expect(game.type).not.toBe('word-matching');
      });
    })
    });
});


// describe('GameGenerator', () => {
//   describe('Generate Games for language', () => {
//     it('should generate games for a single language with default options', () => {

//     });

//     it('should generate games for a specific category ', () => {

//   });
// });
