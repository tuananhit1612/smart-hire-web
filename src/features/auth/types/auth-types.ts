export type UserRole = "candidate" | "employer" | "admin";

/** @deprecated Mock-based auth has been replaced by real API */
export type MockUserKey = "candidate-new" | "candidate-returning" | "employer-new" | "employer-returning" | "admin";

export interface RegisterFlowState {
    step: "role-selection" | "form";
    selectedRole: UserRole | null;
}

// ─── Session Types ───────────────────────────────────

export interface SessionUser {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role: UserRole;
    company?: string;
    phone?: string;
    location?: string;
    joinedDate: string;
    /** True when the user just registered and hasn't completed onboarding */
    isNewUser?: boolean;
}

export type AuthStatus = "authenticated" | "unauthenticated" | "loading";

export interface AuthState {
    user: SessionUser | null;
    status: AuthStatus;
    isAuthenticated: boolean;
    isLoading: boolean;
}
