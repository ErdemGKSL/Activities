export function getMeta(key: string): string | null {
  return document.querySelector<HTMLMetaElement>(`meta[name="premid:${key}"]`)?.content ?? null
}

export function toNumber(value: string | null): number | null {
  if (!value)
    return null

  const parsed = Number(value)
  if (!Number.isFinite(parsed))
    return null

  return parsed
}

export function toWholeSeconds(value: number | null): number | null {
  if (value === null)
    return null

  return Math.max(0, Math.floor(value))
}

export function formatSeconds(value: number | null): string {
  if (value === null)
    return '?'

  return `${Math.max(0, Math.floor(value))}`
}
