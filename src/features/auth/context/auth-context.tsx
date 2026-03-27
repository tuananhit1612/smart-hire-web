"use client";

/**
 * ═══════════════════════════════════════════════════════════
 *  AuthContext — Real API Authentication
 *
 *  • login(email, password)  → POST /auth/login
 *  • register(payload)       → POST /auth/register (auto-login)
 *  • logout()                → clears tokens + session
 *  • updateProfile(data)     → PUT /auth/me
 *  • changePassword(data)    → PUT /auth/me/password
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
    UpdateProfilePayload,
    ChangePasswordPayload,
    UserData,
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

/** Map the richer UserData (from GET /auth/me) to SessionUser */
function userDataToSession(d: UserData): SessionUser {
    return {
        id: String(d.id),
        name: d.fullName,
        email: d.email,
        role: d.role.toLowerCase() as SessionUser["role"],
        avatar: d.avatarUrl ?? undefined,
        phone: d.phone ?? undefined,
        joinedDate: d.createdAt,
        isNewUser: false,
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
    updateProfile: (data: UpdateProfilePayload) => Promise<void>;
    changePassword: (data: ChangePasswordPayload) => Promise<void>;
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
                const meData = res.data.data;

                // Try the rich UserData shape first, fall back to slim { email }
                if ("id" in meData && "fullName" in meData) {
                    const sessionUser = userDataToSession(meData as unknown as UserData);
                    setUser(sessionUser);
                    setSessionCookie(sessionUser);
                } else {
                    // Legacy slim response — best-effort
                    const sessionUser: SessionUser = {
                        id: "",
                        name: meData.email.split("@")[0],
                        email: meData.email,
                        role: "candidate",
                        joinedDate: new Date().toISOString(),
                    };
                    setUser(sessionUser);
                    setSessionCookie(sessionUser);
                }
                setStatus("authenticated");
            })
            .catch(() => {
                // Token expired or invalid — clear and mark unauthenticated
                tokenStorage.clearTokens();
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
        tokenStorage.clearTokens();
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

    // ── Update Profile ───────────────────────────────────
    const updateProfile = useCallback(async (data: UpdateProfilePayload) => {
        try {
            const res = await authApi.updateMe(data);
            const updated = res.data.data;
            setUser(userDataToSession(updated));
        } catch (err) {
            throw new Error(getErrorMessage(err, "Không thể cập nhật hồ sơ."));
        }
    }, []);

    // ── Change Password ──────────────────────────────────
    const changePassword = useCallback(async (data: ChangePasswordPayload) => {
        try {
            await authApi.changePassword(data);
        } catch (err) {
            throw new Error(getErrorMessage(err, "Không thể đổi mật khẩu."));
        }
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
            updateProfile,
            changePassword,
        }),
        [user, status, login, register, logout, completeOnboarding, updateProfile, changePassword]
    );

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}
