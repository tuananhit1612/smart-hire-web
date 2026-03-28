import { NextResponse, type NextRequest } from "next/server";

/**
 * ═════════════════════════════════════════════════════════
 *  Next.js Edge Middleware — Route Guard
 *  Reads the `smarthire-session` cookie to determine
 *  auth status and role, then redirects accordingly.
 * ═════════════════════════════════════════════════════════
 */

const COOKIE_NAME = "smarthire-session";

// Routes that require authentication (any role)
const PROTECTED_ROUTES = [
    "/jobs",
    "/applications",
    "/cv-builder",
    "/cv-files",
    "/cv-preview",
    "/cv-templates",
    "/upload-cv",
    "/profile",
    "/interview",
    "/notifications",
    "/company-profile",
];

// Routes that require a specific role
const ROLE_ROUTES: Record<string, string> = {
    "/employer": "hr",
    "/hr": "hr",
    "/admin/dashboard": "admin",
    "/admin/users": "admin",
    "/admin/audit-log": "admin",
    "/admin/settings": "admin",
};

// Auth pages — if already logged in, redirect to dashboard
const AUTH_PAGES = ["/login", "/register", "/forgot-password", "/reset-password"];

function getSessionFromCookie(request: NextRequest): { role: string; isNewUser?: boolean } | null {
    const cookie = request.cookies.get(COOKIE_NAME);
    if (!cookie?.value) return null;

    try {
        const parsed = JSON.parse(decodeURIComponent(cookie.value));
        if (parsed && parsed.role) return parsed;
    } catch {
        // Invalid cookie
    }
    return null;
}

function getDashboardForRole(role: string): string {
    switch (role) {
        case "hr":
            return "/employer/dashboard";
        case "admin":
            return "/admin/dashboard";
        default:
            return "/jobs";
    }
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const session = getSessionFromCookie(request);
    const isLoggedIn = !!session;

    // ─── 1. Auth pages: redirect away if already logged in ───
    if (AUTH_PAGES.some((p) => pathname.startsWith(p))) {
        if (isLoggedIn) {
            // Check if onboarding needed first
            if (session!.isNewUser) {
                const onboardingRoute = session!.role === "hr" ? "/employer/onboarding" : "/dashboard/onboarding";
                return NextResponse.redirect(new URL(onboardingRoute, request.url));
            }
            const dashboard = getDashboardForRole(session!.role);
            return NextResponse.redirect(new URL(dashboard, request.url));
        }
        return NextResponse.next();
    }

    // ─── 2. Admin login page: redirect if already admin ──────
    if (pathname === "/admin-login") {
        if (isLoggedIn && session!.role === "admin") {
            return NextResponse.redirect(
                new URL("/admin/dashboard", request.url)
            );
        }
        return NextResponse.next();
    }

    // ─── 3. Enforce Onboarding for First Time Login ──────────
    if (isLoggedIn && session!.isNewUser) {
        const isOnEmployerOnboarding = pathname.startsWith("/employer/onboarding");
        const isOnCandidateOnboarding = pathname.startsWith("/dashboard/onboarding");

        if (session!.role === "hr") {
            if (!isOnEmployerOnboarding) {
                return NextResponse.redirect(new URL("/employer/onboarding", request.url));
            }
        } else if (session!.role === "candidate") {
            if (!isOnCandidateOnboarding) {
                return NextResponse.redirect(new URL("/dashboard/onboarding", request.url));
            }
        }
        // If they are on their correct onboarding page, let them through
        return NextResponse.next();
    }

    // ─── 4. Role-specific routes ─────────────────────────────
    for (const [routePrefix, requiredRole] of Object.entries(ROLE_ROUTES)) {
        if (pathname.startsWith(routePrefix)) {
            if (!isLoggedIn) {
                const loginPage =
                    requiredRole === "admin" ? "/admin-login" : "/login";
                const url = new URL(loginPage, request.url);
                url.searchParams.set("callbackUrl", pathname);
                return NextResponse.redirect(url);
            }
            if (session!.role !== requiredRole) {
                // Wrong role — redirect to their own dashboard
                const dashboard = getDashboardForRole(session!.role);
                return NextResponse.redirect(new URL(dashboard, request.url));
            }
            return NextResponse.next();
        }
    }

    // ─── 4. Protected routes (any authenticated user) ────────
    if (PROTECTED_ROUTES.some((p) => pathname.startsWith(p))) {
        if (!isLoggedIn) {
            const url = new URL("/login", request.url);
            url.searchParams.set("callbackUrl", pathname);
            return NextResponse.redirect(url);
        }
        return NextResponse.next();
    }

    // ─── 5. Public routes (homepage, etc.) — allow ───────────
    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt
         * - API routes
         * - Public assets
         */
        "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
