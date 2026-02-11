import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get("rpm_access")?.value === "granted";
  const isLoginPage = request.nextUrl.pathname === "/login";
  const isAuthApi = request.nextUrl.pathname === "/api/auth";

  // Allow login page and auth API without authentication
  if (isLoginPage || isAuthApi) {
    return NextResponse.next();
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - public files (logo, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|logo.png|.*\\.png$).*)",
  ],
};
