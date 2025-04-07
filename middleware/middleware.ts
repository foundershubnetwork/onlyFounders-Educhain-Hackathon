import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "@auth0/nextjs-auth0";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Get the user session
  const session = await getSession(req, res);

  // Define protected routes (DO NOT CHANGE)
  const protectedRoutes = [
    "/founder-dashboard",
    "/investor-dashboard",
    "/profile",
    "/profile/setup",
    "/profile/setup/founder",
    "/profile/setup/investor",
    "/profile/setup/serviceProvider",
  ];

  // Define closed routes
  const closedRoutes = [
    "/api/auth/login",
    "/api/auth/logout",
    "/api/auth/callback",
    "/api/auth/me",
    "/blog",
    "/campaign",
    "/founder-dashboard",
    "/investor-dashboard",
    "/profile",
    "/profile/setup",
    "/profile/setup/founder",
    "/profile/setup/investor",
    "/profile/setup/serviceProvider",
    "/MIXPanel",
    "/new",
    "/profile-page",
    "/projects",
    "/resources",
    "/settings",
    "/startup-setup",
  ];

  // Get the current pathname
  const currentPath = req.nextUrl.pathname;

  // Redirect if the route is closed
  if (closedRoutes.includes(currentPath)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Redirect to login if accessing protected routes without session
  if (!session?.user && protectedRoutes.includes(currentPath)) {
    return NextResponse.redirect(new URL("/api/auth/login", req.url));
  }

  return res;
}

// Apply middleware only to specified routes
export const config = {
  matcher: [
    "/founder-dashboard",
    "/investor-dashboard",
    "/profile",
    "/profile/setup",
    "/profile/setup/founder",
    "/profile/setup/investor",
    "/profile/setup/serviceProvider",
    "/api/auth/login",
    "/api/auth/logout",
    "/api/auth/callback",
    "/api/auth/me",
    "/blog",
    "/campaign",
    "/MIXPanel",
    "/new",
    "/profile-page",
    "/projects",
    "/resources",
    "/settings",
    "/startup-setup",
  ],
};
