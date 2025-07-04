import {
  GameType,
  NewGame,
  Challenge,
  NewLessonGame,
  NewChallenge,
} from '@/types';
import { gameConfigs } from './gameConfig';

export interface GameGenerationOptions {
  languageId: string;
  categoryId: string;
  isLocked?: boolean;
  requiresSubscription?: boolean;
  gameTypes?: GameType[];
  excludeGameTypes?: GameType[];
}

export interface CategoryGameTypeMapping {
  categoryId: string;
  allowedGameTypes: GameType[];
  excludedGameTypes?: GameType[];
}

export interface LessonGameGenerationOptions extends GameGenerationOptions {
  //   challenges: Challenge[];
  challenges: NewChallenge[];
  progress?: number;
}
export class GamesGenerator {
  /**
   * Generate basic games for a language and category
   */

  private static readonly CATEGORY_GAME_MAPPINGS: Record<string, GameType[]> = {
    greetings: [
      'word-matching',
      'multiple-choice',
      'fill-blank',
      'sentence-builder',
      'family-matching',
    ],
    numbers: ['lesson-numbers', 'multiple-choice', 'word-matching'],
    family: [
      'family-matching',
      'sentence-builder',
      'word-matching',
      'multiple-choice',
    ],
  };

  /**
   * Generate games for a specific language
   */
  static generateGamesForLanguage(options: GameGenerationOptions): NewGame[] {
    const {
      languageId,
      categoryId,
      isLocked = false,
      requiresSubscription = false,
      gameTypes,
      excludeGameTypes = [],
    } = options;

    let finalGameTypes: GameType[];

    if (gameTypes) {
      finalGameTypes = gameTypes;
    } else {
      finalGameTypes =
        this.CATEGORY_GAME_MAPPINGS[categoryId] ||
        (Object.keys(gameConfigs) as GameType[]);
    }

    // filter games
    if (excludeGameTypes.length > 0) {
      finalGameTypes = finalGameTypes.filter(
        (gameType) => !excludeGameTypes.includes(gameType),
      );
    }

    return finalGameTypes.map((gameType) => {
      const config = gameConfigs[gameType];
      if (!config) {
        throw new Error(`Game config not found for type: ${gameType}`);
      }

      return {
        id: this.generateGameId(gameType, languageId, categoryId),
        languageId,
        categoryId,
        isLocked,
        requiresSubscription,
        ...config,
      };
    });
  }

  /**
   * Generate games for multiple languages
   */

  static generateGamesForMultipleLanguages(
    languageIds: string[],
    categoryId: string,
    gameTypes?: GameType[],
    excludeGameTypes?: GameType[],
  ): NewGame[] {
    return languageIds?.flatMap((languageId) =>
      this.generateGamesForLanguage({
        languageId,
        categoryId,
        gameTypes,
        excludeGameTypes,
      }),
    );
  }

  /**
   * Generate lesson games with challenges
   */
  static generateLessonGames(
    options: LessonGameGenerationOptions,
  ): NewLessonGame[] {
    const {
      languageId,
      categoryId,
      challenges,
      progress = 0,
      isLocked = false,
      requiresSubscription = false,
      gameTypes,
      excludeGameTypes = [],
    } = options;

    // Determine which game types to use
    let finalGameTypes: GameType[];

    if (gameTypes) {
      // Use explicitly provided game types
      finalGameTypes = gameTypes;
    } else {
      // Use category-specific mapping or all game types as fallback
      finalGameTypes =
        this.CATEGORY_GAME_MAPPINGS[categoryId] ||
        (Object.keys(gameConfigs) as GameType[]);
    }

    // Filter out excluded game types
    if (excludeGameTypes.length > 0) {
      finalGameTypes = finalGameTypes.filter(
        (gameType) => !excludeGameTypes.includes(gameType),
      );
    }

    return finalGameTypes.map((gameType) => {
      const config = gameConfigs[gameType];
      if (!config) {
        throw new Error(`Game config not found for type: ${gameType}`);
      }

      const filteredChallenges = challenges.filter(
        (challenge) =>
          challenge.languageId === languageId && !challenge.isLocked,
      );
      return {
        id: this.generateGameId(gameType, languageId, categoryId),
        languageId,
        categoryId,
        isLocked,
        requiresSubscription,
        challenges: filteredChallenges,
        progress,
        ...config,
      };
    });
  }

  /**
   * Generate a consistent game ID
   */
  static generateGameId(
    gameType: GameType,
    languageId: string,
    categoryId?: string,
  ): string {
    const parts = [gameType, languageId];
    if (categoryId) {
      parts.push(categoryId);
    }
    return parts.join('-');
  }

  /**
   * validate game type
   */
  static isValidGameType(gameType: string): gameType is GameType {
    return gameType in gameConfigs;
  }

  /**
   * Get predefined game types for a category
   */
  static getCategoryGameTypes(categoryId: string): GameType[] {
    return this.CATEGORY_GAME_MAPPINGS[categoryId] || [];
  }

  /**
   * Get available game types
   */
  static getAvailableGameTypes(): GameType[] {
    return Object.keys(gameConfigs) as GameType[];
  }

    /**
   * Get game config by type
   */
  static getGameConfig(gameType: GameType) {
    const config = gameConfigs[gameType];
    if (!config) {
      throw new Error(`Game config not found for type: ${gameType}`);
    }
    return config;
  }


  /**
   * Set or update predefined game types for a category
   */
  static setCategoryGameTypes(categoryId: string, gameTypes: GameType[]): void {
    this.CATEGORY_GAME_MAPPINGS[categoryId] = gameTypes;
  }

  /**
   * Get all available categories with their game types
   */
  static getAllCategoryMappings(): Record<string, GameType[]> {
    return { ...this.CATEGORY_GAME_MAPPINGS };
  }
}
