"use client";

/**
 * ═════════════════════════════════════════════════════════
 *  useAuth Hook
 *  Convenient hook to access auth context from any component.
 *  Provides typed access to user, status, login, logout, etc.
 * ═════════════════════════════════════════════════════════
 */

import { useContext } from "react";
import { AuthContext, type AuthContextValue } from "../context/auth-context";
import type { UserRole } from "../types/auth-types";

/**
 * Access authentication state and actions.
 *
 * @example
 * ```tsx
 * const { user, isAuthenticated, login, logout, switchRole } = useAuth();
 *
 * if (!isAuthenticated) return <LoginPage />;
 * return <div>Welcome, {user.name}!</div>;
 * ```
 */
export function useAuth(): AuthContextValue {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error(
            "useAuth must be used within an <AuthProvider>. " +
            "Wrap your app or layout with <AuthProvider> to use this hook."
        );
    }
    return context;
}

/**
 * Check if the current user has one of the required roles.
 *
 * @example
 * ```tsx
 * const canAccess = useHasRole("admin", "employer");
 * ```
 */
export function useHasRole(...roles: UserRole[]): boolean {
    const { user } = useAuth();
    if (!user) return false;
    return roles.includes(user.role);
}

/**
 * Get the current user or throw — use in pages where auth is guaranteed.
 *
 * @example
 * ```tsx
 * const user = useRequireAuth(); // throws if not logged in
 * ```
 */
export function useRequireAuth() {
    const { user, isAuthenticated } = useAuth();
    if (!isAuthenticated || !user) {
        throw new Error(
            "useRequireAuth: No authenticated user. " +
            "This hook should only be used in route-guarded pages."
        );
    }
    return user;
}
