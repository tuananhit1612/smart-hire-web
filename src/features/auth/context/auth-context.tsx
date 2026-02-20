"use client";

/**
 * ═════════════════════════════════════════════════════════
 *  Auth Context & Provider
 *  Provides authentication state to the entire app via
 *  React Context. Persists session in localStorage + cookie
 *  for middleware route guards.
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
import { DEFAULT_MOCK_USER, mockUsers } from "../types/mock-session";

// ─── Storage Keys ────────────────────────────────────
const STORAGE_KEY = "smarthire-session";
const COOKIE_NAME = "smarthire-session";

// ─── Cookie Helpers ──────────────────────────────────
function setCookie(name: string, value: string, days = 7) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

function deleteCookie(name: string) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
}

function getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
    return match ? decodeURIComponent(match[1]) : null;
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
    /** Login with a mock role (simulates API call) */
    login: (role?: UserRole) => Promise<void>;
    /** Logout and clear session */
    logout: () => void;
    /** Switch to a different mock user role */
    switchRole: (role: UserRole) => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Provider ────────────────────────────────────────
interface AuthProviderProps {
    readonly children: ReactNode;
    /** Override initial mock user (default: candidate) */
    readonly initialUser?: SessionUser | null;
}

export function AuthProvider({
    children,
    initialUser,
}: AuthProviderProps) {
    const [user, setUser] = useState<SessionUser | null>(null);
    const [status, setStatus] = useState<AuthStatus>("loading");

    // ─── Restore session from localStorage on mount ──
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored) as SessionUser;
                // Verify it has required fields
                if (parsed && parsed.id && parsed.role && parsed.email) {
                    setUser(parsed);
                    setStatus("authenticated");
                    // Sync cookie in case it was cleared
                    setCookie(COOKIE_NAME, JSON.stringify({ role: parsed.role }));
                    return;
                }
            }
        } catch {
            // Corrupted storage — ignore
            localStorage.removeItem(STORAGE_KEY);
            deleteCookie(COOKIE_NAME);
        }

        // No valid session found
        if (initialUser) {
            setUser(initialUser);
            setStatus("authenticated");
            persistSession(initialUser);
        } else {
            setUser(null);
            setStatus("unauthenticated");
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // ─── Persist helpers ─────────────────────────────
    function persistSession(sessionUser: SessionUser) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionUser));
        setCookie(COOKIE_NAME, JSON.stringify({ role: sessionUser.role }));
    }

    function clearSession() {
        localStorage.removeItem(STORAGE_KEY);
        deleteCookie(COOKIE_NAME);
    }

    // ─── Actions ─────────────────────────────────────
    const login = useCallback(async (role?: UserRole) => {
        setStatus("loading");
        // Simulate API call delay
        await new Promise((r) => setTimeout(r, 800));
        const mockUser = role ? mockUsers[role] : DEFAULT_MOCK_USER;
        setUser(mockUser);
        setStatus("authenticated");
        persistSession(mockUser);
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        setStatus("unauthenticated");
        clearSession();
    }, []);

    const switchRole = useCallback((role: UserRole) => {
        const mockUser = mockUsers[role];
        setUser(mockUser);
        setStatus("authenticated");
        persistSession(mockUser);
    }, []);

    const value = useMemo<AuthContextValue>(
        () => ({
            user,
            status,
            isAuthenticated: user !== null,
            isLoading: status === "loading",
            login,
            logout,
            switchRole,
        }),
        [user, status, login, logout, switchRole]
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
