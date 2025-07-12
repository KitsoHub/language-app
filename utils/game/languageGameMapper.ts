export const languageGameModules: Record<string, () => Promise<any>> = {
  setswana: () => import('@/data/games/setswana/games'),
//   kalanga: () => import('@/data/games/kalanga/games'),

};
