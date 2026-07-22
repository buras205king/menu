import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const isLoggedIn = request.cookies.get('admin_auth')?.value === 'true'
  const isLoginPage = request.nextUrl.pathname === '/admin/login'

  // Not logged in and trying to open any /admin page (except login) -> go to login
  if (!isLoggedIn && !isLoginPage) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  // Already logged in but visiting the login page -> go to dashboard
  if (isLoggedIn && isLoginPage) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
