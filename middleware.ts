import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

const publicPaths = [
  '/',
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/api/health',
];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Allow public paths
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // Check auth for protected routes
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/api/')) {
    const authToken = request.cookies.get('authToken')?.value;

    if (!authToken) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    try {
      const decoded = await verifyToken(authToken);
      if (!decoded) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
      }
    } catch {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
