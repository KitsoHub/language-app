import { challenges } from './../../mocks/challenges';
import { GameType, NewChallenge, NewGame, NewLessonGame } from "@/types";
import { GamesGenerator } from './gameGenerator';

export interface LessonCategory {
  id: string;
  title: string;
  icon: string;
  color: string;
  games: NewLessonGame[];
  isLocked: boolean;
  requiresSubscription: boolean;
}

export class CategoryGenerator {
  /**
   * Generate a category with games
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

  // TODO: fix the include progress
  static generateCategory(
    categoryId: string,
    title: string,
    icon: string,
    color: string,
    languageIds: string[],
    gameTypes: GameType[],
    challenges: NewChallenge[] = [],
    options: {
      isLocked?: boolean,
      requiresSubscription?: boolean,
      includeProgress?: boolean
    } = {}

  ): LessonCategory {
    const { isLocked = false, requiresSubscription = false, includeProgress = false } = options;
    const games = includeProgress ? languageIds.flatMap(languageId => GamesGenerator.generateLessonGames({
      languageId,
      categoryId,
      challenges,
      gameTypes,
      isLocked,
      requiresSubscription
    }))
    : languageIds.flatMap(languageId => GamesGenerator.generateGamesForLanguage({
        languageId,
            categoryId,
            gameTypes,
            isLocked,
            requiresSubscription
    })).map(game=> ({
      ...game,
      challenges:challenges.filter(c=> c.languageId === game.languageId && !c.isLocked),
      progress:0
    }));

    return {
      id: categoryId,
      title,
      icon,
      color,
      games: games as NewLessonGame[],
      isLocked,
      requiresSubscription
    }
  }

    /**
   * Generate games for a specific category with its predefined game types
   */

    static generateGamesForCategory(
      categoryId: string,
      languageIds: string[],
      options:{
            isLocked?: boolean;
      requiresSubscription?: boolean;
      additionalGameTypes?: GameType[];
      excludeGameTypes?: GameType[];
      overrideGameTypes?: GameType[];
      }={}
    ): NewGame[]{
      const {
        isLocked=false,
        requiresSubscription=false,
        additionalGameTypes =[],
        excludeGameTypes=[],
        overrideGameTypes=[]
      } =options

      let gameTypes: GameType[];
      if(overrideGameTypes){
        gameTypes =overrideGameTypes;
      }else{
        const categoryDefaults = this.CATEGORY_GAME_MAPPINGS[categoryId] || [];
        gameTypes =[...categoryDefaults, ...additionalGameTypes];
      }
      return languageIds.flatMap(languageId =>
        GamesGenerator.generateGamesForLanguage({
                  languageId,
        categoryId,
        isLocked,
        requiresSubscription,
        gameTypes,
        excludeGameTypes
        })
      )
    }
}
