import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const RATE_LIMIT = 100
const WINDOW_MS = 30 * 60 * 1000 // 30 minutes

const ipStore: Record<string, { count: number; startTime: number }> = {}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow sign-in and static files (/_next, /favicon, etc.) without auth
  if (
    pathname.startsWith('/sign-in') ||
    pathname.startsWith('/auth') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/api/auth') ||
    pathname.startsWith('/api/public')
  ) {
    return NextResponse.next()
  }

  // Rate limiting
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
  const now = Date.now()
  if (!ipStore[ip] || now - ipStore[ip].startTime > WINDOW_MS) {
    ipStore[ip] = { count: 1, startTime: now }
  } else {
    ipStore[ip].count += 1
  }
  if (ipStore[ip].count > RATE_LIMIT) {
    return new NextResponse('Rate limit exceeded. Try again later.', { status: 429 })
  }

  // Check for your auth cookie (replace 'auth-token' with your actual cookie name)
  const isAuthenticated = request.cookies.get('auth-token')

  if (!isAuthenticated) {
    // Redirect to sign-in page if not authenticated
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next|favicon|api/auth|api/public).*)', // Protect everything except static and public/auth routes
  ],
}