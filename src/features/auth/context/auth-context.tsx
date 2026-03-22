"use client";

/**
 * ═════════════════════════════════════════════════════════
 *  Auth Context & Provider
 *  Provides authentication state to the entire app via
 *  React Context. Calls the real SmartHire API for
 *  login/register and persists tokens via tokenStorage.
 *
 *  Session is hydrated on mount by reading the stored token
 *  and calling GET /users/me.
 * ═════════════════════════════════════════════════════════
 */

import {
    createContext,
    useCallback,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";
import type { SessionUser, UserRole, AuthStatus } from "../types/auth-types";
import { tokenStorage } from "../lib/token-storage";
import { authService } from "../services/auth-service";

// ─── Cookie helpers (for middleware route guard) ──────
const COOKIE_NAME = "smarthire-session";

function setCookie(name: string, value: string, days = 7) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

function deleteCookie(name: string) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
}

// ─── Context Value ───────────────────────────────────
export interface AuthContextValue {
    /** Current authenticated user (null if logged out) */
    user: SessionUser | null;
    /** Auth status: loading | authenticated | unauthenticated */
    status: AuthStatus;
    /** Convenience: user !== null */
    isAuthenticated: boolean;
    /** Convenience: status === "loading" */
    isLoading: boolean;

    /**
     * Login with email + password.
     * Calls POST /auth/login → stores token → sets user.
     * Throws a user-friendly error string on failure.
     */
    login: (email: string, password: string) => Promise<SessionUser>;

    /**
     * Register a new account.
     * Calls POST /auth/register → stores token → sets user.
     * Throws a user-friendly error string on failure.
     */
    register: (data: {
        fullName: string;
        email: string;
        password: string;
        role: UserRole;
    }) => Promise<SessionUser>;

    /** Logout and clear session/token */
    logout: () => void;

    /** Mark the user as having completed onboarding */
    completeOnboarding: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Provider ────────────────────────────────────────
interface AuthProviderProps {
    readonly children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<SessionUser | null>(null);
    const [status, setStatus] = useState<AuthStatus>("loading");

    // ─── Sync session cookie (for middleware guard) ──
    function syncCookie(sessionUser: SessionUser | null) {
        if (sessionUser) {
            setCookie(
                COOKIE_NAME,
                JSON.stringify({ role: sessionUser.role, isNewUser: sessionUser.isNewUser }),
            );
        } else {
            deleteCookie(COOKIE_NAME);
        }
    }

    // ─── Hydrate session on mount ────────────────────
    useEffect(() => {
        async function hydrate() {
            const token = tokenStorage.getAccessToken();
            if (!token) {
                setStatus("unauthenticated");
                return;
            }

            try {
                const me = await authService.getMe();
                setUser(me);
                setStatus("authenticated");
                syncCookie(me);
            } catch {
                // Token invalid/expired — clear everything
                tokenStorage.clearTokens();
                deleteCookie(COOKIE_NAME);
                setStatus("unauthenticated");
            }
        }

        hydrate();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // ─── Login ───────────────────────────────────────
    const login = useCallback(async (email: string, password: string): Promise<SessionUser> => {
        setStatus("loading");
        try {
            const res = await authService.login({ email, password });

            // Store token
            tokenStorage.setAccessToken(res.token);

            // Set user state
            setUser(res.user);
            setStatus("authenticated");
            syncCookie(res.user);
            return res.user;
        } catch (err) {
            setStatus("unauthenticated");
            throw authService.parseError(err);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // ─── Register ────────────────────────────────────
    const register = useCallback(
        async (data: {
            fullName: string;
            email: string;
            password: string;
            role: UserRole;
        }): Promise<SessionUser> => {
            setStatus("loading");
            try {
                const res = await authService.register(data);

                tokenStorage.setAccessToken(res.token);
                setUser(res.user);
                setStatus("authenticated");
                syncCookie(res.user);
                return res.user;
            } catch (err) {
                setStatus("unauthenticated");
                throw authService.parseError(err);
            }
        },
        [], // eslint-disable-line react-hooks/exhaustive-deps
    );

    // ─── Logout ──────────────────────────────────────
    const logout = useCallback(() => {
        // Fire-and-forget the backend logout
        authService.logout();

        tokenStorage.clearTokens();
        setUser(null);
        setStatus("unauthenticated");
        syncCookie(null);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // ─── Complete Onboarding ─────────────────────────
    const completeOnboarding = useCallback(() => {
        setUser((prev) => {
            if (!prev) return null;
            const updated = { ...prev, isNewUser: false };
            syncCookie(updated);
            return updated;
        });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const value = useMemo<AuthContextValue>(
        () => ({
            user,
            status,
            isAuthenticated: user !== null,
            isLoading: status === "loading",
            login,
            register,
            logout,
            completeOnboarding,
        }),
        [user, status, login, register, logout, completeOnboarding],
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
