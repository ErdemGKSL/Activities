export enum Images {
  Logo = 'https://seiwatch.net/seiwatchlogo.webp',
}

export type ActivityLanguage = 'en' | 'tr'

export interface LocalizedStrings {
  watchFallback: string
  playing: string
  paused: string
  secondsShort: string
  browsingHome: string
  viewingAnimeDetails: string
  browsingDashboard: string
  viewingWatchPage: string
  browsingPage: (page: string) => string
  browsingSeiwatch: string
  animePrefix: string
  listPrefix: string
  sectionPrefix: string
  smallPlay: string
  smallPause: string
  fallbackTitle: string
}
