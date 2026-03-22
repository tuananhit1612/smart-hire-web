export type UserRole = "candidate" | "employer" | "admin";
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
    isFirstLogin?: boolean;
}

export type AuthStatus = "authenticated" | "unauthenticated" | "loading";

export interface AuthState {
    user: SessionUser | null;
    status: AuthStatus;
    isAuthenticated: boolean;
    isLoading: boolean;
}

// ─── API Types ───────────────────────────────────────

/** Generic wrapper used by every backend response */
export interface ApiWrapper<T = undefined> {
    code: string;
    success: boolean;
    message: string;
    data: T;
}

/** The `data` payload returned by POST /auth/login and POST /auth/register */
export interface AuthLoginData {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    userId: number;
    email: string;
    fullName: string;
    role: string;                  // "CANDIDATE" | "EMPLOYER" | etc.
}

/** Full Axios-level response type for login / register */
export type AuthLoginResponse = ApiWrapper<AuthLoginData>;

/** The `data` payload returned by GET /auth/me */
export interface AuthMeData {
    email: string;
}

/** Full Axios-level response type for /auth/me */
export type AuthMeResponse = ApiWrapper<AuthMeData>;

/** Response for endpoints that return only a message (forgot-password, etc.) */
export type AuthMessageResponse = ApiWrapper<undefined>;

/** Request payload for POST /auth/register */
export interface RegisterPayload {
    fullName: string;
    email: string;
    password: string;
    role: UserRole;
}
