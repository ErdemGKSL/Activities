import type { ActivityLanguage, LocalizedStrings } from './types.js'

export const localizedStrings: Record<ActivityLanguage, LocalizedStrings> = {
  en: {
    watchFallback: 'Watch',
    playing: 'Playing',
    paused: 'Paused',
    browsing: 'Browsing',
    viewing: 'Viewing',
    smallPlay: 'Playing',
    smallPause: 'Paused',
  },
  tr: {
    watchFallback: 'İzleme',
    playing: 'Oynatılıyor',
    paused: 'Duraklatıldı',
    browsing: 'Geziniyor',
    viewing: 'Görüntülüyor',
    smallPlay: 'Oynatılıyor',
    smallPause: 'Duraklatıldı',
  },
}

export function getLanguage(languageSetting: number | null): ActivityLanguage {
  return languageSetting === 1 ? 'tr' : 'en'
}
