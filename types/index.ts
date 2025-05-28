import { translationOption } from './index';
export interface User{
    id:string;
    name:string;
    email:string;
    avatar?: string | number;
    currentLanguage:string;
    streak:number;
    xp:number;
    level:number;
    joinedAt:string;
    completedChallenges?: string[];
    unlockedAchievements?: string[];
    completedGameTypes?: string[];
    wordMatchingCompleted?: number;
    fillBlankCompleted?: number;
    multipleChoiceCompleted?: number;
    sentenceBuilderCompleted?: number;
}

export interface Language{
    id:string;
    name:string;
    nativeName:string;
    difficulty: 'easy'| 'medium' |'hard';
    flag?:string;
    favorites?:boolean;
}

export interface Course{
id: string;
languageId:string;
title:string;
description: string;
level: number;
lessons: Lesson[];
icon: string;
}

export interface Lesson{
    id:string;
    courseId: string;
    title:string;
    description: string;
    exercises: Exercise[];
    xpReward: number;
    completed: boolean;
    locked: boolean;
}

export interface Exercise {
    id: string;
    type: 'multipleChoice' | 'translation' | 'picture-matching' | 'listening' | 'speaking' | 'word-matching' | 'challenge' ;
    question: string;
    // For listening exercises, options will be an array of ListeningOption objects
    options?: (string | ListeningOption | matchingOption | GreetingOption)[] | string[];
    correctAnswer?: string;
    hint?: string;
    audio?: string;
    vowel?: string;
    uri?: string;
    image?: string;
    avatar?: string;
    imageOptions?: string[];
    correctAnswers?: string[];
    correctWordOrder?: string[];
    translation?: string;
    word?: string;
    letter?: string;
    wordOptions?: string[];
}

export interface GreetingOption {
    greeting: string;
    audio: string;
}

export interface ListeningOption {
    vowel: string;
    audio: string;
}
export interface matchingOption {
    avatar: string;
    image: string;
    letter: string;
    word: string;
}
export interface translationOption {
    avatar: string;
    image: string;
    word: string;
    translation: string;
}

export interface Achievement{
    id:string;
    title: string;
    description: string;
    icon: string;
    // unlocked:boolean;
    // progress: number;
    // total: number;
}

export interface Skill{
    id: string;
    name: 'vocabulary' | 'listening' | 'speaking' | 'reading' | 'writing'| 'grammar';
    progress: number;
}

export type SubscriptionPlanType = {
    id: string;
    title: string;
    subtitle: string;
    pricePerWeek: string;
    badge?: string;
    badgeColor?:string;
}


export interface Challenge {
    id: number | string;
    type: "word-matching" |"multiple-choice"| 'fill-blank'| 'sentence-builder';
    instruction: string;
    correctOrder?: string[];
    wordBank?: string[];
    options?: string[];
    correctAnswer?: string;
    sentence?: string;
    blanks?: number[];
    languageId: string,
    isLocked?: boolean;
    points: number;
    difficulty: 'easy' | 'medium' | 'hard';
    badge?: string;
    translationOption?: string,
  }

  export interface Game {
    id: string;
    title: string;
    description: string;
    challenges: Challenge[],
    gameBadge: string;
    gameIcon?: string;
    type: 'word-matching' | 'multiple-choice' | 'listening' | 'speaking' | 'sentence-builder'| 'fill-blank';
    languageId?: string;
  }
