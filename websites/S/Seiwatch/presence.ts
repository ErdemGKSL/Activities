import { buildBrowsingPresence, buildWatchPresence } from './builders.js'
import { getLanguage, localizedStrings } from './localization.js'
import { getMeta } from './meta.js'

const presence = new Presence({
  clientId: '1472403708271792128',
})

const browsingTimestamp = Math.floor(Date.now() / 1000)

presence.on('UpdateData', async () => {
  const page = getMeta('page')
  const language = getLanguage(await presence.getSetting<string>('lang').catch(() => null))
  const strings = localizedStrings[language]

  if (page === 'watch') {
    const watchPresence = buildWatchPresence(strings)
    return presence.setActivity(watchPresence)
  }

  const browsingPresence = buildBrowsingPresence(page, strings, browsingTimestamp)
  if (browsingPresence)
    presence.setActivity(browsingPresence)
  else presence.setActivity()
})
