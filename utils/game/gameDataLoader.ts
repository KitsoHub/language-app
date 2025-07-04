
/**
 * Dynamic laoding of data
 *
 */

import { NewChallenge, NewGame } from '@/types';
import { GamesGenerator } from './gameGenerator';
import { languageGameModules as defaultLanguageGameModules } from './languageGameMapper';


export class GameDataLoader {
  private static instance: GameDataLoader;
  private gameCache: Map<string, NewGame[]> = new Map();
  private challengesCache: Map<string, NewChallenge> = new Map();
  private loadingPromises: Map<string, Promise<any>> = new Map();


    private constructor(
    private readonly languageGameModules = defaultLanguageGameModules
  ) {}
  static getInstance(modules?: typeof defaultLanguageGameModules): GameDataLoader {
    if (!GameDataLoader.instance) {
      GameDataLoader.instance = new GameDataLoader(modules);
    }
    return GameDataLoader.instance;
  }


  //   load games for language
  async loadGamesForLanguage(languageId: string): Promise<NewGame[]> {
    const cacheKey = `games-${languageId}`;
    if (this.gameCache.has(cacheKey)) {
      return this.gameCache.get(cacheKey) as unknown as NewGame[];
    }

    // Return existing promise if already loading
    if (this.loadingPromises.has(cacheKey)) {
      return this.loadingPromises.get(cacheKey);
    }

    //create a new loading promise
    const loadingPromise = this.loadGamesFromFile(languageId, cacheKey);
    this.loadingPromises.set(cacheKey, loadingPromise);

    try {
      const games = await loadingPromise;
      this.gameCache.set(cacheKey, games);
      return games;
    } finally {
      this.loadingPromises.delete(cacheKey);
    }
  }

 private async loadGamesFromFile(languageId: string, cacheKey: string): Promise<NewGame[]> {
    const loadFn = this.languageGameModules[languageId];

    if (!loadFn) {
      console.warn(`[GameDataLoader] No loader found for ${languageId}`);
      return this.generateFallbackGames(languageId);
    }

    try {
      const rawModule = await loadFn();

      const maybeGames =
        rawModule?.default?.default ??
        rawModule?.default ??
        rawModule;

      if (!Array.isArray(maybeGames)) {
        console.error(`[GameDataLoader] Invalid export structure:`, rawModule);
        throw new Error('Invalid game module format');
      }

      this.gameCache.set(cacheKey, maybeGames);
      return maybeGames;
    } catch (error) {
      console.warn(`[GameDataLoader] Error loading module for ${languageId}:`, error);
      return this.generateFallbackGames(languageId);
    }
  }

  private generateFallbackGames(languageId: string): NewGame[] {
    const commonCategories = ['greetings', 'numbers', 'family'];
    const generatedGames: NewGame[] = [];

    for (const categoryId of commonCategories) {
      const games = GamesGenerator.generateGamesForLanguage({ languageId, categoryId });
      generatedGames.push(...games.map((game) => ({ ...game, id: game.id! })));
    }

    return generatedGames;
  }
  clearCache(): void {
    this.gameCache.clear();
    //this.challengeCache.clear();
    this.loadingPromises.clear();
  }
}
