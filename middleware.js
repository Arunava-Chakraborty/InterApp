import { authMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isProtectedRoute = (url) => {
  return ['/dashboard', '/forum'].some((route) => url.startsWith(route));
};

// Use Clerk's authMiddleware
export default authMiddleware({
  // Callback to handle protected routes
  onAuth: async (auth, req) => {
    if (isProtectedRoute(req.nextUrl.pathname) && !auth.userId) {
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }
    return NextResponse.next();
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
