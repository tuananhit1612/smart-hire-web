import { NextRequest, NextResponse } from "next/server";

type SessionCookie = {
  role?: "candidate" | "hr" | "admin";
  isNewUser?: boolean;
};

const SESSION_COOKIE_NAME = "smarthire-session";
const LOGIN_PATH = "/login";

const PROTECTED_PREFIXES = [
  "/applications",
  "/company-profile",
  "/cv-analysis",
  "/cv-builder",
  "/cv-files",
  "/cv-preview",
  "/cv-templates",
  "/dashboard",
  "/hr",
  "/interview",
  "/notifications",
  "/onboarding",
  "/profile",
  "/upload-cv",
];

const HR_PREFIXES = ["/company-profile", "/employer", "/hr"];
const ADMIN_PREFIXES = ["/admin"];

function parseSessionCookie(value?: string): SessionCookie | null {
  if (!value) return null;
  try {
    return JSON.parse(decodeURIComponent(value)) as SessionCookie;
  } catch {
    return null;
  }
}

function startsWithAny(pathname: string, prefixes: string[]) {
  return prefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

function redirectTo(pathname: string, request: NextRequest) {
  return NextResponse.redirect(new URL(pathname, request.url));
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = startsWithAny(pathname, PROTECTED_PREFIXES)
    || startsWithAny(pathname, HR_PREFIXES)
    || startsWithAny(pathname, ADMIN_PREFIXES);

  if (!isProtected) {
    return NextResponse.next();
  }

  const session = parseSessionCookie(request.cookies.get(SESSION_COOKIE_NAME)?.value);
  if (!session?.role) {
    const loginUrl = new URL(LOGIN_PATH, request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (startsWithAny(pathname, ADMIN_PREFIXES) && session.role !== "admin") {
    return redirectTo("/dashboard", request);
  }

  if (startsWithAny(pathname, HR_PREFIXES) && !["hr", "admin"].includes(session.role)) {
    return redirectTo("/dashboard", request);
  }

  if (pathname !== "/dashboard/onboarding" && session.role === "candidate" && session.isNewUser) {
    return redirectTo("/dashboard/onboarding", request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/applications/:path*",
    "/company-profile/:path*",
    "/cv-analysis/:path*",
    "/cv-builder/:path*",
    "/cv-files/:path*",
    "/cv-preview/:path*",
    "/cv-templates/:path*",
    "/dashboard/:path*",
    "/employer/:path*",
    "/hr/:path*",
    "/interview/:path*",
    "/notifications/:path*",
    "/onboarding/:path*",
    "/profile/:path*",
    "/upload-cv/:path*",
    "/admin/:path*",
  ],
};
