import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Optimistic auth check only — reads the session cookie, does not touch the
// database. Real authorization happens in the DAL (src/lib/dal.ts) via
// requireCustomer(), which every account Server Action also calls.
const PROTECTED_ROUTES = ["/account"];
const AUTH_ROUTES = ["/account/login"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSession = request.cookies.has("jugnu_session");

  const isProtected = PROTECTED_ROUTES.some((p) => pathname === p || pathname.startsWith(p + "/")) && !isAuthRoute(pathname);
  const isAuth = isAuthRoute(pathname);

  if (isProtected && !hasSession) {
    return NextResponse.redirect(new URL("/account/login", request.url));
  }
  if (isAuth && hasSession) {
    return NextResponse.redirect(new URL("/account", request.url));
  }
  return NextResponse.next();
}

function isAuthRoute(pathname: string) {
  return AUTH_ROUTES.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

export const config = {
  matcher: ["/account", "/account/:path*"],
};
