import type { ActivityLanguage, LocalizedStrings } from './types.js'

export const localizedStrings: Record<ActivityLanguage, LocalizedStrings> = {
  en: {
    watchFallback: 'Watch',
    playing: 'Watching',
    paused: 'Paused',
    secondsShort: 'sec',
    browsingHome: 'Browsing home page',
    viewingAnimeDetails: 'Viewing anime details',
    browsingDashboard: 'Browsing dashboard',
    viewingWatchPage: 'Viewing watch page',
    browsingPage: page => `Browsing ${page}`,
    browsingSeiwatch: 'Browsing Seiwatch',
    animePrefix: 'Anime',
    listPrefix: 'List',
    sectionPrefix: 'Section',
    smallPlay: 'Playing',
    smallPause: 'Paused',
    fallbackTitle: 'Seiwatch',
  },
  tr: {
    watchFallback: 'İzleme',
    playing: 'İzleniyor',
    paused: 'Duraklatıldı',
    secondsShort: 'sn',
    browsingHome: 'Ana sayfa geziliyor',
    viewingAnimeDetails: 'Anime detayı görüntüleniyor',
    browsingDashboard: 'Panel geziliyor',
    viewingWatchPage: 'İzleme sayfası görüntüleniyor',
    browsingPage: page => `${page} geziliyor`,
    browsingSeiwatch: 'Seiwatch geziliyor',
    animePrefix: 'Anime',
    listPrefix: 'Liste',
    sectionPrefix: 'Bölüm',
    smallPlay: 'Oynatılıyor',
    smallPause: 'Duraklatıldı',
    fallbackTitle: 'Seiwatch',
  },
}

export function getLanguage(langSetting: string | null): ActivityLanguage {
  return langSetting === 'tr' ? 'tr' : 'en'
}
