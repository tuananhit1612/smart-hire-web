"use client";

import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import type { SessionUser, AuthStatus } from "../types/auth-types";
import { authService, type LoginRequest, type RegisterRequest } from "../api/authService";

const STORAGE_KEY = "smarthire-session";
const SESSION_COOKIE = "smarthire-session"; // Used by Next.js middleware for routing
const TOKEN_COOKIE = "smarthire-token"; // Used by API client for Authentication header

function setCookie(name: string, value: string, days = 7) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

function deleteCookie(name: string) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
}

export interface AuthContextValue {
    user: SessionUser | null;
    status: AuthStatus;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (data: RegisterRequest) => Promise<void>;
    logout: () => void;
    completeOnboarding: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<SessionUser | null>(null);
    const [status, setStatus] = useState<AuthStatus>("loading");

    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored) as SessionUser;
                if (parsed && parsed.id && parsed.role && parsed.email) {
                    setUser(parsed);
                    setStatus("authenticated");
                    return;
                }
            }
        } catch {
            localStorage.removeItem(STORAGE_KEY);
            deleteCookie(SESSION_COOKIE);
            deleteCookie(TOKEN_COOKIE);
        }

        setUser(null);
        setStatus("unauthenticated");
    }, []);

    function persistSession(sessionUser: SessionUser, token: string) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionUser));
        // Middleware needs a JSON object with the user's role
        setCookie(SESSION_COOKIE, JSON.stringify({ role: sessionUser.role, isFirstLogin: sessionUser.isFirstLogin }));
        // API client needs the raw JWT string
        setCookie(TOKEN_COOKIE, token);
    }

    function clearSession() {
        localStorage.removeItem(STORAGE_KEY);
        deleteCookie(SESSION_COOKIE);
        deleteCookie(TOKEN_COOKIE);
    }

    const login = useCallback(async (email: string, password: string) => {
        setStatus("loading");
        try {
            const resp = await authService.login({ email, password });
            const sessionUser = authService.mapToSessionUser(resp);
            setUser(sessionUser);
            persistSession(sessionUser, resp.accessToken);
            setStatus("authenticated");
        } catch (error) {
            setUser(null);
            setStatus("unauthenticated");
            throw error;
        }
    }, []);

    const registerLocal = useCallback(async (data: RegisterRequest) => {
        // We only register here, the user state shouldn't change until they login.
        // The backend returns a token but typically they must login afterward, or we auto-login.
        // Let's just create the account here, then they log in.
        await authService.register(data);
    }, []);

    const logout = useCallback(() => {
        // Technically, we could call `await authService.logout(...)` 
        // if we persisted the refreshToken. For now, clear frontend session:
        setUser(null);
        setStatus("unauthenticated");
        clearSession();
    }, []);

    const completeOnboarding = useCallback(() => {
        setUser((currentUser) => {
            if (!currentUser) return null;
            const updatedUser = { ...currentUser, isFirstLogin: false };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
            return updatedUser;
        });
    }, []);

    const value = useMemo<AuthContextValue>(
        () => ({
            user,
            status,
            isAuthenticated: user !== null,
            isLoading: status === "loading",
            login,
            register: registerLocal,
            logout,
            completeOnboarding,
        }),
        [user, status, login, registerLocal, logout, completeOnboarding]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
