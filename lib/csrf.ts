const CSRF_TOKENS = new Map<string, { token: string; timestamp: number }>()
const TOKEN_EXPIRY = 24 * 60 * 60 * 1000 // 24 hours

export async function generateCSRFToken(): Promise<string> {
  // Clean expired tokens
  const now = Date.now()
  for (const [key, value] of CSRF_TOKENS.entries()) {
    if (now - value.timestamp > TOKEN_EXPIRY) {
      CSRF_TOKENS.delete(key)
    }
  }

  // Generate random bytes using Web Crypto API
  const buffer = new Uint8Array(32)
  crypto.getRandomValues(buffer)
  const token = Array.from(buffer)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')

  CSRF_TOKENS.set(token, { token, timestamp: now })
  return token
}

export function validateCSRFToken(token: string | null): boolean {
  if (!token) return false
  const storedToken = CSRF_TOKENS.get(token)
  if (!storedToken) return false

  const now = Date.now()
  if (now - storedToken.timestamp > TOKEN_EXPIRY) {
    CSRF_TOKENS.delete(token)
    return false
  }

  return true
}
