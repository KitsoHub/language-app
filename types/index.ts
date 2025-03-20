export interface User{
    id:string;
    name:string;
    email:string;
    avatar?: string;
    currentLanguage:string;
    streak:number;
    xp:number;
    level:number;
    joinedAt:string;
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
    type: 'multipleChoice' | 'translation' | 'matching' | 'listening' | 'speaking';
    question: string;
    // For listening exercises, options will be an array of ListeningOption objects
    options?: (string | ListeningOption)[];
    correctAnswer?: string;
    hint?: string;
    audio?: string;
    vowel?: string;
    uri?: string;
}

export interface ListeningOption {
    vowel: string;
    audio: string;
}
export interface Achievement{
    id:string;
    title: string;
    description: string;
    icon: string;
    unlocked:boolean;
    progress: number;
    total: number;
}

export interface Skill{
    id: string;
    name: 'vocabulary' | 'listening' | 'speaking' | 'reading' | 'writing'| 'grammar';
    progress: number;
}
