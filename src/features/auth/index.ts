/**
 * Auth Feature — Public API
 * Import everything from "@/features/auth"
 */

// Types
export type {
AuthState,AuthStatus,RegisterFlowState,SessionUser,UserRole
} from "./types/auth-types";

// Context & Provider
export { AuthContext,AuthProvider } from "./context/auth-context";
export type { AuthContextValue } from "./context/auth-context";

// Hooks
export { useAuth,useHasRole,useRequireAuth } from "./hooks/use-auth";

// Route Guards
export {
AdminGuard,AuthenticatedGuard,CandidateGuard,
EmployerGuard,EmployerOrAdminGuard,RouteGuard
} from "./components/route-guard";
