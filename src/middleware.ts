
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { ROUTES } from "@/lib/constants";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Protected routes that require authentication
  const protectedPaths = [ROUTES.DASHBOARD, ROUTES.COLLABORATIONS, ROUTES.PROJECT];
  const isProtectedPath = protectedPaths.some(path => 
    req.nextUrl.pathname.startsWith(path)
  );

  // Redirect to login if accessing a protected route without a session
  if (isProtectedPath && !session) {
    const redirectUrl = new URL(ROUTES.SIGN_IN, req.url);
    redirectUrl.searchParams.set("redirectedFrom", req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // If user is already logged in and tries to access auth pages, redirect to dashboard
  if (session && req.nextUrl.pathname.startsWith(ROUTES.AUTH)) {
    return NextResponse.redirect(new URL(ROUTES.DASHBOARD, req.url));
  }

  return res;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/project/:path*",
    "/collaborations/:path*",
    "/auth/:path*",
  ],
};
