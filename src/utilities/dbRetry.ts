function isTransientDbError(error: unknown) {
  const parts: string[] = []
  let current: unknown = error
  for (let i = 0; i < 4 && current; i++) {
    if (current instanceof Error) {
      parts.push(current.message)
      current = current.cause
    } else {
      parts.push(String(current))
      break
    }
  }
  const text = parts.join(' ')
  return /timeout|terminat|ECONNRESET|ECONNREFUSED|connection/i.test(text)
}

export async function withDbRetry<T>(fn: () => Promise<T>, attempts = 3): Promise<T> {
  let last: unknown
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn()
    } catch (error) {
      last = error
      if (!isTransientDbError(error) || i === attempts - 1) throw error
      await new Promise((resolve) => setTimeout(resolve, 300 * (i + 1)))
    }
  }
  throw last
}
