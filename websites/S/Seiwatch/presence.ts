import { buildBrowsingPresence, buildWatchPresence } from './builders.js'
import { getLanguage, localizedStrings } from './localization.js'
import { getMeta } from './meta.js'

const presence = new Presence({
  clientId: 'WILL_BE_UPDATED_LATER',
})

const browsingTimestamp = Math.floor(Date.now() / 1000)

presence.on('UpdateData', async () => {
  const page = getMeta('page')
  const now = Math.floor(Date.now() / 1000)
  const language = getLanguage(await presence.getSetting<string>('lang').catch(() => null))
  const strings = localizedStrings[language]

  if (page === 'watch') {
    const watchPresence = buildWatchPresence(now, strings)
    return presence.setActivity(watchPresence)
  }

  const browsingPresence = buildBrowsingPresence(page, strings, browsingTimestamp)
  if (browsingPresence)
    presence.setActivity(browsingPresence)
  else presence.setActivity()
})
