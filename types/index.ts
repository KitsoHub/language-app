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
}
