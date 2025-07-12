import { GameDataLoader } from '../gameDataLoader';
import { GamesGenerator } from '../gameGenerator';

const mockSetswanaGames = [
  {
    id: 'word-matching-st-greetings',
    type: 'word-matching',
    languageId: 'st',
    categoryId: 'greetings',
    isLocked: false,
    requiresSubscription: false,
    title: 'Setswana Word Matching',
    description: 'Match Setswana greetings',
    icon: '🔤',
    difficulty: 'easy',
  },
  {
    id: 'multiple-choice-st-greetings',
    type: 'multiple-choice',
    languageId: 'st',
    categoryId: 'multiple-choice',
    isLocked: false,
    requiresSubscription: false,
    title: 'Setswana Multiple Choice',
    description: 'Choose correct Setswana greetings',
    icon: '✅',
    difficulty: 'hard',
  },
];


const mockModuleMap = {
  setswana: async () => ({
    __esModule: true,
    default: mockSetswanaGames,
  }),
};
jest.mock('../gameGenerator', () => ({
  GamesGenerator: {
    generateGamesForLanguage: jest.fn(() => []),
  },
}));

GameDataLoader.getInstance();
describe('Game Data loader', () => {
  let gameDataLoader: GameDataLoader;
  let mockGamesGenerator: jest.Mocked<typeof GamesGenerator>;
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods
    jest.clearAllMocks();

    // Reset singleton instance
    (GameDataLoader as any).instance = undefined;

    // Get fresh instance
    gameDataLoader = GameDataLoader.getInstance(mockModuleMap);

    // Clear cache before each test
    gameDataLoader.clearCache();

    mockGamesGenerator = GamesGenerator as jest.Mocked<typeof GamesGenerator>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('Loading Game data', () => {
    it('should load and cache games successfully', async () => {


      const games = await gameDataLoader.loadGamesForLanguage('setswana');
      expect(games).toBeDefined();
      expect(games).toEqual(mockSetswanaGames);
    });
  });
});
