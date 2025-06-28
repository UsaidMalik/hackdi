import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSession } from './app/_lib/session'

export async function middleware(request: NextRequest) {
  const session = await getSession();

  if (request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/signup')) {
    if (session.isLoggedIn) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  } else {
    if (!session.isLoggedIn) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
