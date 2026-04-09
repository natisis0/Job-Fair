import { clerkMiddleware, createRouteMatcher, clerkClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isAdminRoute = createRouteMatcher(['/admin(.*)'])
const isCompanyRoute = createRouteMatcher(['/company(.*)'])

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims, redirectToSignIn } = await auth();

  // 1. If not authenticated and trying to access protected dashboards, redirect to sign in
  if (!userId && (isAdminRoute(req) || isCompanyRoute(req))) {
    return redirectToSignIn();
  }

  // 2. Role-based redirection if user is authenticated
  if (userId) {
    let role = sessionClaims?.metadata?.role;

    // --- FALLBACK: Fetch metadata if not in session claims ---
    if (!role) {
      console.log("Role not found in sessionClaims, fetching from clerkClient...");
      const client = await clerkClient();
      const user = await client.users.getUser(userId);
      role = user.publicMetadata?.role;
      console.log("Fetched role from API:", role);
    }
    
    const { pathname } = req.nextUrl;

    // Cross-role protection 
    if (isAdminRoute(req) && role !== 'admin') {
      const redirectPath = role === 'company' ? '/company' : '/';
      return NextResponse.redirect(new URL(redirectPath, req.url));
    }
    
    if (isCompanyRoute(req) && role !== 'company') {
      const redirectPath = role === 'admin' ? '/admin' : '/';
      return NextResponse.redirect(new URL(redirectPath, req.url));
    }

    // Role-based home page redirection
    if (pathname === '/') {
      if (role === 'admin') {
        return NextResponse.redirect(new URL('/admin', req.url));
      } else if (role === 'company') {
        return NextResponse.redirect(new URL('/company', req.url));
      }
    }
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}