import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/** Canonical host is amazonadc.com (apex). Staging / fly.dev hosts are left alone. */
export function middleware(request: NextRequest) {
  const host = (request.headers.get('host') || '').toLowerCase().split(':')[0]

  if (host === 'www.amazonadc.com') {
    const url = request.nextUrl.clone()
    url.protocol = 'https:'
    url.hostname = 'amazonadc.com'
    url.port = ''
    return NextResponse.redirect(url, 301)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|.*\\.(?:ico|png|jpg|jpeg|gif|webp|svg)$).*)'],
}
