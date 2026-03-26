"use client";

/**
 * ═══════════════════════════════════════════════════════════
 *  AuthContext — Real API Authentication
 *
 *  • login(email, password)  → POST /auth/login
 *  • register(payload)       → POST /auth/register (auto-login)
 *  • logout()                → clears tokens + session
 *  • Session restore on mount → validates stored token via /auth/me
 *  • Tokens stored in localStorage, attached by apiClient interceptor
 *
 *  Backend wraps every response in { code, success, message, data }.
 *  Axios res.data  = wrapper
 *  Axios res.data.data = actual payload
 * ═══════════════════════════════════════════════════════════
 */

import React, {
    createContext,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";
import type {
    SessionUser,
    AuthStatus,
    AuthLoginData,
    RegisterPayload,
} from "../types/auth-types";
import { authApi } from "../api/auth-api";
import { getErrorMessage } from "@/shared/lib/api-error";
import { tokenStorage } from "../lib/token-storage";

// ─── Helpers ─────────────────────────────────────────────

const SESSION_COOKIE_NAME = "smarthire-session";

/** Map the flat backend login/register payload to SessionUser */
function toSessionUser(d: AuthLoginData): SessionUser {
    return {
        id: String(d.userId),
        name: d.fullName,
        email: d.email,
        role: d.role.toLowerCase() as SessionUser["role"],
        joinedDate: new Date().toISOString(),
        isNewUser: true,
    };
}

/** Set a cookie the Next.js edge middleware can read to gate routes */
function setSessionCookie(user: SessionUser) {
    if (typeof document === "undefined") return;
    const value = encodeURIComponent(
        JSON.stringify({ role: user.role, isNewUser: user.isNewUser ?? false })
    );
    document.cookie = `${SESSION_COOKIE_NAME}=${value}; path=/; SameSite=Lax; max-age=${60 * 60 * 24 * 7}`;
}

function clearSessionCookie() {
    if (typeof document === "undefined") return;
    document.cookie = `${SESSION_COOKIE_NAME}=; path=/; SameSite=Lax; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

// ─── Context Value ───────────────────────────────────────
export interface AuthContextValue {
    user: SessionUser | null;
    status: AuthStatus;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<SessionUser>;
    register: (data: RegisterPayload) => Promise<void>;
    logout: () => void;
    completeOnboarding: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Provider ────────────────────────────────────────────

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<SessionUser | null>(null);
    const [status, setStatus] = useState<AuthStatus>("loading");

    // ── Session restore on mount ─────────────────────────
    useEffect(() => {
        const token = tokenStorage.getAccessToken();
        if (!token) {
            setStatus("unauthenticated");
            return;
        }

        // Try to validate the stored token via /auth/me
        authApi
            .getMe()
            .then((res) => {
                const meData = res.data.data; // { email }
                // Build a minimal SessionUser from what the backend gives us
                // If we had a cached user in localStorage we could merge, but
                // /auth/me currently only returns email.
                const restoredUser: SessionUser = {
                    id: "",
                    name: meData.email.split("@")[0], // best-effort name
                    email: meData.email,
                    role: "candidate", // will be overridden on next login
                    joinedDate: new Date().toISOString(),
                };
                setUser(restoredUser);
                setSessionCookie(restoredUser);
                setStatus("authenticated");
            })
            .catch(() => {
                // Token expired or invalid — clear and mark unauthenticated
                tokenStorage.clear();
                clearSessionCookie();
                setStatus("unauthenticated");
            });
    }, []);

    // ── Login ────────────────────────────────────────────
    const login = useCallback(async (email: string, password: string): Promise<SessionUser> => {
        setStatus("loading");
        try {
            const res = await authApi.login(email, password);
            const payload = res.data.data; // AuthLoginData

            tokenStorage.setTokens(payload.accessToken, payload.refreshToken);
            const sessionUser = toSessionUser(payload);
            setUser(sessionUser);
            setSessionCookie(sessionUser);
            setStatus("authenticated");
            return sessionUser;
        } catch (err) {
            setStatus("unauthenticated");
            throw new Error(getErrorMessage(err, "Đã xảy ra lỗi không xác định khi đăng nhập."));
        }
    }, []);

    // ── Register ─────────────────────────────────────────
    const register = useCallback(async (data: RegisterPayload) => {
        setStatus("loading");
        try {
            const res = await authApi.register(data);
            const payload = res.data.data; // AuthLoginData

            tokenStorage.setTokens(payload.accessToken, payload.refreshToken);
            const sessionUser = toSessionUser(payload);
            setUser(sessionUser);
            setSessionCookie(sessionUser);
            setStatus("authenticated");
        } catch (err) {
            setStatus("unauthenticated");
            throw new Error(getErrorMessage(err, "Đã xảy ra lỗi không xác định khi đăng ký."));
        }
    }, []);

    // ── Logout ───────────────────────────────────────────
    const logout = useCallback(() => {
        tokenStorage.clear();
        clearSessionCookie();
        setUser(null);
        setStatus("unauthenticated");
    }, []);

    // ── Complete Onboarding ──────────────────────────────
    const completeOnboarding = useCallback(() => {
        setUser((prev) => {
            if (!prev) return null;
            const updated = { ...prev, isNewUser: false };
            setSessionCookie(updated);
            return updated;
        });
    }, []);

    // ── Memoised context value ───────────────────────────
    const value = useMemo<AuthContextValue>(
        () => ({
            user,
            status,
            isAuthenticated: status === "authenticated",
            isLoading: status === "loading",
            login,
            register,
            logout,
            completeOnboarding,
        }),
        [user, status, login, register, logout, completeOnboarding]
    );

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}
