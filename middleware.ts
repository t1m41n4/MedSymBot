import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { generateCSRFToken, validateCSRFToken } from '@/lib/csrf'

// Simple in-memory store for rate limiting
const rateLimit = new Map()

// Rate limit configuration
const RATE_LIMIT = 10
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute in milliseconds

// Paths that require CSRF protection
const CSRF_PROTECTED_METHODS = ['POST', 'PUT', 'DELETE', 'PATCH']
const CSRF_PROTECTED_PATHS = ['/api/auth', '/api/checkout', '/api/user']

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Rate limiting logic
  const ip = request.ip ?? '127.0.0.1'
  const rateLimitKey = `${ip}:${request.method}:${request.nextUrl.pathname}`
  const now = Date.now()
  const rateData = rateLimit.get(rateLimitKey) || { count: 0, timestamp: now }

  // Reset count if outside window
  if (now - rateData.timestamp > RATE_LIMIT_WINDOW) {
    rateData.count = 0
    rateData.timestamp = now
  }

  if (rateData.count >= RATE_LIMIT) {
    return new NextResponse('Too Many Requests', {
      status: 429,
      headers: {
        'Retry-After': `${RATE_LIMIT_WINDOW / 1000}`,
      },
    })
  }

  rateData.count++
  rateLimit.set(rateLimitKey, rateData)

  // CSRF protection for mutations
  if (request.method !== 'GET' &&
      CSRF_PROTECTED_METHODS.includes(request.method) &&
      CSRF_PROTECTED_PATHS.some(path => request.nextUrl.pathname.startsWith(path))) {

    const csrfToken = request.headers.get('x-csrf-token')
    if (!validateCSRFToken(csrfToken)) {
      return NextResponse.json(
        { error: 'Invalid or missing CSRF token' },
        { status: 403 }
      )
    }
  }

  // For GET requests to protected paths, generate and attach CSRF token
  if (request.method === 'GET' &&
      CSRF_PROTECTED_PATHS.some(path => request.nextUrl.pathname.startsWith(path))) {
    const response = NextResponse.next()
    const token = await generateCSRFToken()
    response.headers.set('x-csrf-token', token)
    return response
  }

  // Add security headers
  const response = NextResponse.next()
  if (!path.startsWith('/api/')) {
    // Only add CSRF token for non-API routes
    const token = await generateCSRFToken()
    response.headers.set('X-CSRF-Token', token)
  }

  return response
}

// Update matcher to only handle routes that need protection
export const config = {
  matcher: [
    '/api/:path*',
    '/((?!_next/static|favicon.ico|images/|.well-known/|robots.txt).*)',
  ],
}
