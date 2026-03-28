/** Mirrors backend Role enum: CANDIDATE | HR | ADMIN (lowercase for FE use) */
export type UserRole = "candidate" | "hr" | "admin" | "CANDIDATE" | "HR" | "ADMIN";

/** @deprecated Mock-based auth has been replaced by real API */
export type MockUserKey = "candidate-new" | "candidate-returning" | "employer-new" | "employer-returning" | "admin";

export interface RegisterFlowState {
    step: "role-selection" | "form";
    selectedRole: UserRole | null;
}

// ─── Session Types ───────────────────────────────────

export interface SessionUser {
    id: string;
    fullName: string;
    email: string;
    avatarUrl?: string;
    role: UserRole;
    company?: string;
    phone?: string;
    location?: string;
    joinedDate: string;
    /** True when the user just registered and hasn't completed onboarding */
    isNewUser?: boolean;
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

/** The `data` payload returned by POST /auth/login, /auth/register, /auth/refresh */
export interface AuthLoginData {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    userId: number;
    email: string;
    fullName: string;
    role: string;                  // "CANDIDATE" | "EMPLOYER" | etc.
}

/** Full Axios-level response type for login / register / refresh */
export type AuthLoginResponse = ApiWrapper<AuthLoginData>;

/** The backend user object returned by GET /auth/me and PUT /auth/me */
/** Mirrors UserProfileResponse.java */
export interface UserData {
    id: number;
    email: string;
    fullName: string;
    phone: string | null;
    role: string;
    avatarUrl: string | null;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

/** Full Axios-level response type for /auth/me (GET & PUT) */
export type UserResponse = ApiWrapper<UserData>;

/** The `data` payload returned by GET /auth/me (legacy slim version) */
export interface AuthMeData {
    email: string;
}

/** Full Axios-level response type for /auth/me (legacy slim) */
export type AuthMeResponse = ApiWrapper<AuthMeData>;

/** Response for endpoints that return only a message (forgot-password, change-password, etc.) */
export type AuthMessageResponse = ApiWrapper<undefined>;

/** Request payload for POST /auth/register */
export interface RegisterPayload {
    fullName: string;
    email: string;
    password: string;
    role: UserRole;
}

/** Request payload for PUT /auth/me */
export interface UpdateProfilePayload {
    fullName?: string;
    phone?: string;
    avatarUrl?: string;
}

/** Request payload for PUT /auth/me/password */
export interface ChangePasswordPayload {
    currentPassword: string;
    newPassword: string;
}
