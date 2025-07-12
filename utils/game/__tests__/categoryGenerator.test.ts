import { CategoryGenerator } from '../categoryGenerator';
import { GamesGenerator } from '../gameGenerator';
import { mockChallenges } from './gameGenerator.test';

describe('Game Category Generator', () => {
  describe('Generate Games for a category ', () => {
    it('should generate games for a category using default options', () => {
      const category = CategoryGenerator.generateCategory(
        'greetings',
        'Greetings',
        '👋',
        '#FF0000',
        ['st', 'kl'],
        ['word-matching', 'multiple-choice'],
        mockChallenges,
      );

      expect(category.id).toBe('greetings');
      expect(category.title).toBe('Greetings');
      expect(category.icon).toBe('👋');
      expect(category.color).toBe('#FF0000');
      expect(category.isLocked).toBe(false);
      expect(category.requiresSubscription).toBe(false);
      expect(category.games).toHaveLength(4);
    });

    it('should generate category with lesson games when includeProgress is true', () => {
      const category = CategoryGenerator.generateCategory(
        'family',
        'Family',
        '👪',
        '#00FF00',
        ['st'],
        ['word-matching'],
        mockChallenges,
        { includeProgress: true },
      );
      expect(category.games).toHaveLength(1);
      expect(category.games[0].progress).toBe(0);
      expect(category.games[0].challenges).toBeDefined();
    });

    it('should generate category with custom options', () => {
      const category = CategoryGenerator.generateCategory(
        'premium',
        'Premium Content',
        '💎',
        '#FFD700',
        ['st'],
        ['sentence-builder'],
        mockChallenges,
        {
          isLocked: true,
          requiresSubscription: true,
        },
      );

      expect(category.isLocked).toBe(true);
      expect(category.requiresSubscription).toBe(true);
      expect(category.games[0].isLocked).toBe(true);
      expect(category.games[0].requiresSubscription).toBe(true);
    });

    it('should filter challenges correctly for each game', () => {
      const category = CategoryGenerator.generateCategory(
        'test',
        'Test Category',
        '🧪',
        '#0000FF',
        ['st', 'kl'],
        ['word-matching'],
        mockChallenges,
      );

      const stGame = category.games.find((game) => game.languageId === 'st');
      const klGame = category.games.find((game) => game.languageId === 'kl');

      expect(stGame?.challenges).toHaveLength(1);
      expect(stGame?.challenges[0].languageId).toBe('st');
      expect(stGame?.challenges[0].isLocked).toBe(false);

      expect(klGame?.challenges).toHaveLength(1);
      expect(klGame?.challenges[0].languageId).toBe('kl');
      expect(klGame?.challenges[0].isLocked).toBe(false);
    });
  });
  ``;
});

describe('Category Games Generator', () => {
  describe('generateGamesForCategory', () => {
    it('should generate games using category defaults', () => {
      const games = CategoryGenerator.generateGamesForCategory('greetings', [
        'st',
        'kl',
      ]);
      const expectedTypes = [
        'word-matching',
        'multiple-choice',
        'fill-blank',
        'sentence-builder',
        'family-matching',
      ];
      expect(games).toHaveLength(10);
      games.forEach((game) => {
        expect(expectedTypes).toContain(game.type);
        expect(game.categoryId).toBe('greetings');
      });
    });

    it('should generate games for numbers category with correct defaults', () => {
      const games = CategoryGenerator.generateGamesForCategory('numbers', [
        'st',
      ]);

      const expectedTypes = [
        'lesson-numbers',
        'multiple-choice',
        'word-matching',
      ];
      expect(games).toHaveLength(3);

      games.forEach((game) => {
        expect(expectedTypes).toContain(game.type);
        expect(game.categoryId).toBe('numbers');
      });
    });
  });

  it('should add additional game types to category defaults', () => {
    const games = CategoryGenerator.generateGamesForCategory(
      'numbers',
      ['st'],
      {
        additionalGameTypes: ['fill-blank'],
      },
    );

    const expectedTypes = [
      'lesson-numbers',
      'multiple-choice',
      'word-matching',
      'fill-blank',
    ];
    expect(games).toHaveLength(4);

    const gameTypes = games.map((game) => game.type);
    expectedTypes.forEach((type) => {
      expect(gameTypes).toContain(type);
    });
  });

  it('should exclude specified game types from category defaults', () => {
    const games = CategoryGenerator.generateGamesForCategory(
      'greetings',
      ['st'],
      {
        excludeGameTypes: ['sentence-builder', 'family-matching'],
      },
    );

    const expectedTypes = ['word-matching', 'multiple-choice', 'fill-blank'];
    expect(games).toHaveLength(expectedTypes.length);
  });
});
