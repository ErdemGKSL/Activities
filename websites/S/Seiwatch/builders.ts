import { ActivityType, Assets, getTimestamps } from 'premid'
import { getMeta, toNumber, toWholeSeconds } from './meta.js'
import { Images, type LocalizedStrings } from './types.js'

export function buildWatchPresence(strings: LocalizedStrings): PresenceData {
  const isPlaying = getMeta('watch:is-playing') === 'true'
  const watchState = getMeta('watch:state')

  const animeTitle = getMeta('watch:anime-title')
  const episodeTitle = getMeta('watch:episode-title')
  const episodeLabel = getMeta('watch:episode-label')
  const filmSlug = getMeta('watch:film-slug')

  const pausedSeconds = toWholeSeconds(toNumber(getMeta('watch:paused-seconds')))
  const currentSeconds = toWholeSeconds(toNumber(getMeta('watch:current-seconds')))
  const durationSeconds = toWholeSeconds(toNumber(getMeta('watch:duration-seconds')))

  const label = episodeLabel || episodeTitle || filmSlug || strings.watchFallback
  const details = animeTitle ? `${animeTitle} - ${label}` : label

  const rawCurrent = isPlaying
    ? currentSeconds ?? pausedSeconds
    : pausedSeconds ?? currentSeconds
  const resolvedCurrent = rawCurrent === null
    ? null
    : durationSeconds === null
      ? rawCurrent
      : Math.min(rawCurrent, durationSeconds)

  const presenceData: PresenceData = {
    type: ActivityType.Watching,
    largeImageKey: Images.Logo,
    largeImageText: animeTitle || strings.fallbackTitle,
    details,
    smallImageKey: isPlaying ? Assets.Play : Assets.Pause,
    smallImageText: isPlaying ? strings.smallPlay : strings.smallPause,
  }

  const statePrefix = isPlaying || watchState === 'playing' ? strings.playing : strings.paused
  presenceData.state = statePrefix

  if (isPlaying && durationSeconds !== null && durationSeconds > 0 && resolvedCurrent !== null) {
    [presenceData.startTimestamp, presenceData.endTimestamp] = getTimestamps(resolvedCurrent, durationSeconds)
  }

  return presenceData
}

export function buildBrowsingPresence(
  page: string | null,
  strings: LocalizedStrings,
  browsingTimestamp: number,
): PresenceData | null {
  const routeSection = getMeta('route:section')
  const routeAnimeSlug = getMeta('route:anime-slug')
  const routeListSlug = getMeta('route:list-slug')
  const title = getMeta('title')
  const path = getMeta('path')

  if (!page && !path)
    return null

  const presenceData: PresenceData = {
    type: ActivityType.Watching,
    largeImageKey: Images.Logo,
    startTimestamp: browsingTimestamp,
  }

  switch (page) {
    case 'home':
      presenceData.details = strings.browsingHome
      break
    case 'anime-detail':
      presenceData.details = strings.viewingAnimeDetails
      break
    case 'dashboard':
      presenceData.details = strings.browsingDashboard
      break
    case 'watch':
      presenceData.details = strings.viewingWatchPage
      break
    default:
      presenceData.details = page
        ? strings.browsingPage(page)
        : strings.browsingSeiwatch
      break
  }

  if (routeAnimeSlug)
    presenceData.state = `${strings.animePrefix}: ${routeAnimeSlug}`
  else if (routeListSlug)
    presenceData.state = `${strings.listPrefix}: ${routeListSlug}`
  else if (routeSection)
    presenceData.state = `${strings.sectionPrefix}: ${routeSection}`
  else if (path)
    presenceData.state = path

  if (title)
    presenceData.largeImageText = title

  return presenceData
}
