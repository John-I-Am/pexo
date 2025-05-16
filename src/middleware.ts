import { NextRequest, NextResponse } from 'next/server';
import { getSessionCookie } from 'better-auth/cookies';
import { dashboardPath, homePath, loginPath } from './lib/paths';

export const middleware = async (request: NextRequest) => {
  const sessionCookie = getSessionCookie(request);
  const url = request.nextUrl;

  if (url.pathname.startsWith(dashboardPath()) && !sessionCookie) {
    return NextResponse.redirect(new URL(homePath(), request.url));
  }

  if (url.pathname === loginPath() && sessionCookie) {
    return NextResponse.redirect(new URL(dashboardPath(), request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};
