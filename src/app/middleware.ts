import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const { pathname } = request.nextUrl

  // Protected routes
  const protectedRoutes = ['/dashboard', '/profile']
  const authRoutes = ['/login', '/signup']

  // Agar user logged in hai aur auth routes par aaye to dashboard redirect
  if (token && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Agar user logged in nahi hai aur protected route par aaye to login redirect
  if (!token && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}