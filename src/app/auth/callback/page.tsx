"use client";

/**
 * /auth/callback — GitHub OAuth callback handler
 *
 * Flow:
 *  1. Clear stale session data (old role cookie may still exist)
 *  2. Store new JWT tokens via tokenStorage
 *  3. Fetch full user profile via /auth/me for accurate data
 *  4. Set fresh session cookie with correct role
 *  5. Redirect to the correct page based on role + onboarding state
 */

import { Suspense, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { tokenStorage } from "@/features/auth/lib/token-storage";
import { authApi } from "@/features/auth/api/auth-api";

const SESSION_COOKIE_NAME = "smarthire-session";

function clearSessionCookie() {
    if (typeof document === "undefined") return;
    document.cookie = `${SESSION_COOKIE_NAME}=; path=/; SameSite=Lax; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

function setSessionCookie(role: string, isNewUser: boolean) {
    if (typeof document === "undefined") return;
    const value = encodeURIComponent(JSON.stringify({ role, isNewUser }));
    document.cookie = `${SESSION_COOKIE_NAME}=${value}; path=/; SameSite=Lax; max-age=${60 * 60 * 24 * 7}`;
}

function Spinner() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F4F6F9] dark:bg-[#141A21]">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 rounded-full border-4 border-[#22c55e] border-t-transparent animate-spin" />
                <p className="text-[#637381] dark:text-[#919EAB] text-sm font-medium">
                    Đang xử lý đăng nhập GitHub...
                </p>
            </div>
        </div>
    );
}

function CallbackInner() {
    const router = useRouter();
    const params = useSearchParams();
    const hasRun = useRef(false);

    useEffect(() => {
        // Prevent double-execution in React Strict Mode
        if (hasRun.current) return;
        hasRun.current = true;

        const accessToken  = params.get("accessToken");
        const refreshToken = params.get("refreshToken");
        const error        = params.get("error");

        if (error || !accessToken || !refreshToken) {
            const msg = params.get("message") ?? "Đăng nhập GitHub thất bại.";
            clearSessionCookie();
            window.location.href = `/login?error=${encodeURIComponent(msg)}`;
            return;
        }

        // ── 1. Clear any stale session from previous login ────────────
        clearSessionCookie();
        tokenStorage.clearTokens();

        // ── 2. Store new tokens ───────────────────────────────────────
        tokenStorage.setTokens(accessToken, refreshToken);

        // ── 3. Fetch full profile for accurate role & onboarding status
        authApi
            .getMe()
            .then((res) => {
                const meData = res.data.data;
                const role = (meData.role ?? "CANDIDATE").toLowerCase();
                const isOnboarded = meData.isOnboarded ?? false;

                // ── 4. Set fresh session cookie ───────────────────────
                setSessionCookie(role, !isOnboarded);

                // ── 5. Redirect based on role & onboarding ────────────
                if (role === "hr" || role === "admin") {
                    window.location.href = isOnboarded ? "/employer/dashboard" : "/employer/onboarding";
                } else {
                    // CANDIDATE (default for GitHub OAuth)
                    window.location.href = isOnboarded ? "/dashboard" : "/dashboard/onboarding";
                }
            })
            .catch(() => {
                // Fallback: use URL params if /auth/me fails
                const rolePram    = (params.get("role") ?? "CANDIDATE").toUpperCase();
                const isOnboarded = params.get("isOnboarded") === "true";
                const roleLower   = rolePram.toLowerCase();

                setSessionCookie(roleLower, !isOnboarded);

                if (roleLower === "hr" || roleLower === "admin") {
                    window.location.href = isOnboarded ? "/employer/dashboard" : "/employer/onboarding";
                } else {
                    window.location.href = isOnboarded ? "/dashboard" : "/dashboard/onboarding";
                }
            });

    }, [params, router]);

    return <Spinner />;
}

export default function AuthCallbackPage() {
    return (
        <Suspense fallback={<Spinner />}>
            <CallbackInner />
        </Suspense>
    );
}
