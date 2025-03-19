import { NextResponse } from "next/server";
import { getSession } from "@auth0/nextjs-auth0";

export async function middleware(req: Request) {
  const res = NextResponse.next();
  
  // Get the user session
  const session = await getSession();
  
  // Define protected routes
  const protectedRoutes = ["/founder-dashboard","investor-dashboard", "/profile", "/profile/setup", "/profile/setup/founder", "/profile/setup/investor", "/profile/setup/serviceProvider"];

  // If user is not logged in and tries to access protected routes, redirect to login
  if (!session?.user && protectedRoutes.includes(new URL(req.url).pathname)) {
    return NextResponse.redirect(new URL("/api/auth/login", req.url));
  }

  return res;
}

// Apply middleware only to specific routes
export const config = {
  matcher: ["/founder-dashboard","investor-dashboard", "/profile", "/profile/setup", "/profile/setup/founder", "/profile/setup/investor", "/profile/setup/serviceProvider"],
};
