/**
 * Auth Feature — Public API
 * Import everything from "@/features/auth"
 */

// Types
export type {
    UserRole,
    SessionUser,
    AuthStatus,
    AuthState,
    RegisterFlowState,
} from "./types/auth-types";

// Context & Provider
export { AuthContext, AuthProvider } from "./context/auth-context";
export type { AuthContextValue } from "./context/auth-context";

// Hooks
export { useAuth, useHasRole, useRequireAuth } from "./hooks/use-auth";

// Route Guards
export {
    RouteGuard,
    CandidateGuard,
    EmployerGuard,
    AdminGuard,
    EmployerOrAdminGuard,
    AuthenticatedGuard,
} from "./components/route-guard";
