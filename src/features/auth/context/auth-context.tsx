"use client";

/**
 * ═════════════════════════════════════════════════════════
 *  Auth Context & Provider
 *  Provides authentication state to the entire app via
 *  React Context. Uses mock session for development.
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
    /** Start as logged-out for testing auth flows */
    readonly startLoggedOut?: boolean;
}

export function AuthProvider({
    children,
    initialUser,
    startLoggedOut = false,
}: AuthProviderProps) {
    const [user, setUser] = useState<SessionUser | null>(null);
    const [status, setStatus] = useState<AuthStatus>("loading");

    // Simulate async session check on mount
    useEffect(() => {
        const timer = setTimeout(() => {
            if (startLoggedOut) {
                setUser(null);
                setStatus("unauthenticated");
            } else {
                setUser(initialUser ?? DEFAULT_MOCK_USER);
                setStatus("authenticated");
            }
        }, 300); // Simulate network delay

        return () => clearTimeout(timer);
    }, [initialUser, startLoggedOut]);

    const login = useCallback(async (role?: UserRole) => {
        setStatus("loading");
        // Simulate API call delay
        await new Promise((r) => setTimeout(r, 800));
        const mockUser = role ? mockUsers[role] : DEFAULT_MOCK_USER;
        setUser(mockUser);
        setStatus("authenticated");
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        setStatus("unauthenticated");
    }, []);

    const switchRole = useCallback((role: UserRole) => {
        setUser(mockUsers[role]);
        setStatus("authenticated");
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
