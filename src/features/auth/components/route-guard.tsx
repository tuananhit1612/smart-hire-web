"use client";

/**
 * ═════════════════════════════════════════════════════════
 *  Route Guard Component
 *  Protects pages based on authentication status and user role.
 *  Shows loading/unauthorized states as needed.
 * ═════════════════════════════════════════════════════════
 */

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { motion } from "framer-motion";
import { ShieldAlert, Loader2, LogIn } from "lucide-react";
import { useAuth } from "../hooks/use-auth";
import type { UserRole } from "../types/auth-types";

// ─── Props ───────────────────────────────────────────
interface RouteGuardProps {
    /** The protected page content */
    readonly children: ReactNode;
    /** Roles allowed to access this route. If empty, any authenticated user can access. */
    readonly allowedRoles?: UserRole[];
    /** Where to redirect unauthenticated users (default: "/login") */
    readonly loginPath?: string;
    /** Where to redirect unauthorized users (default: shows inline message) */
    readonly unauthorizedPath?: string;
    /** Custom loading component */
    readonly loadingFallback?: ReactNode;
    /** Custom unauthorized component */
    readonly unauthorizedFallback?: ReactNode;
}

// ─── Loading Screen ──────────────────────────────────
function LoadingScreen() {
    return (
        <div className="flex min-h-[60vh] items-center justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-3"
            >
                <Loader2 className="w-8 h-8 text-[#22c55e] animate-spin" />
                <p className="text-sm text-slate-400 font-medium">Đang xác thực...</p>
            </motion.div>
        </div>
    );
}

// ─── Unauthorized Screen ─────────────────────────────
function UnauthorizedScreen() {
    return (
        <div className="flex min-h-[60vh] items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center gap-3 text-center max-w-sm"
            >
                <div className="w-14 h-14 rounded-2xl bg-rose-50 flex items-center justify-center">
                    <ShieldAlert className="w-7 h-7 text-rose-500" />
                </div>
                <h2 className="text-lg font-bold text-[#1C252E]">Không có quyền truy cập</h2>
                <p className="text-sm text-slate-500">
                    Bạn không có quyền truy cập trang này. Vui lòng liên hệ quản trị viên nếu cần hỗ trợ.
                </p>
            </motion.div>
        </div>
    );
}

// ─── Unauthenticated Screen ─────────────────────────
function UnauthenticatedScreen() {
    return (
        <div className="flex min-h-[60vh] items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center gap-3 text-center max-w-sm"
            >
                <div className="w-14 h-14 rounded-2xl bg-[#22c55e]/10 flex items-center justify-center">
                    <LogIn className="w-7 h-7 text-[#22c55e]" />
                </div>
                <h2 className="text-lg font-bold text-[#1C252E]">Vui lòng đăng nhập</h2>
                <p className="text-sm text-slate-500">
                    Bạn cần đăng nhập để truy cập trang này.
                </p>
                <a
                    href="/login"
                    className="mt-2 px-5 py-2 text-sm font-semibold bg-[#22c55e] text-white rounded-xl hover:bg-[#22c55e] transition-colors"
                >
                    Đăng nhập
                </a>
            </motion.div>
        </div>
    );
}

// ─── Route Guard ─────────────────────────────────────
export function RouteGuard({
    children,
    allowedRoles = [],
    loginPath = "/login",
    unauthorizedPath,
    loadingFallback,
    unauthorizedFallback,
}: RouteGuardProps) {
    const { user, status, isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    // Redirect unauthenticated users
    useEffect(() => {
        if (status === "unauthenticated" && loginPath) {
            // In mock mode we show the login screen inline instead of redirecting
            // Uncomment below for real auth redirect:
            // router.replace(loginPath);
        }
    }, [status, loginPath, router]);

    // Redirect unauthorized users
    useEffect(() => {
        if (
            status === "authenticated" &&
            user &&
            allowedRoles.length > 0 &&
            !allowedRoles.includes(user.role) &&
            unauthorizedPath
        ) {
            router.replace(unauthorizedPath);
        }
    }, [status, user, allowedRoles, unauthorizedPath, router]);

    // Loading state
    if (isLoading) {
        return <>{loadingFallback ?? <LoadingScreen />}</>;
    }

    // Not logged in
    if (!isAuthenticated) {
        return <UnauthenticatedScreen />;
    }

    // Role check
    if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
        return <>{unauthorizedFallback ?? <UnauthorizedScreen />}</>;
    }

    // Authorized — render children
    return <>{children}</>;
}

// ─── Convenience Guards ──────────────────────────────

/** Guard for candidate-only pages */
export function CandidateGuard({ children }: { readonly children: ReactNode }) {
    return <RouteGuard allowedRoles={["candidate"]}>{children}</RouteGuard>;
}

/** Guard for employer-only pages */
export function EmployerGuard({ children }: { readonly children: ReactNode }) {
    return <RouteGuard allowedRoles={["employer"]}>{children}</RouteGuard>;
}

/** Guard for admin-only pages */
export function AdminGuard({ children }: { readonly children: ReactNode }) {
    return <RouteGuard allowedRoles={["admin"]}>{children}</RouteGuard>;
}

/** Guard for employer + admin pages */
export function EmployerOrAdminGuard({ children }: { readonly children: ReactNode }) {
    return <RouteGuard allowedRoles={["employer", "admin"]}>{children}</RouteGuard>;
}

/** Guard that only requires authentication (any role) */
export function AuthenticatedGuard({ children }: { readonly children: ReactNode }) {
    return <RouteGuard>{children}</RouteGuard>;
}

