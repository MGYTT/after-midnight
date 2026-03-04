// proxy.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/midnight') || pathname.startsWith('/admin')) {
    const session = request.cookies.get('am_session')

    if (!session || session.value !== 'authenticated') {
      const loginUrl = new URL('/', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/midnight/:path*', '/admin/:path*'],
}
