/**
 * ═══════════════════════════════════════════════════════════
 *  Auth API Service
 *  Thin wrapper around apiClient for authentication endpoints.
 *  All functions return Axios responses — let interceptors
 *  handle error normalisation to ApiError.
 * ═══════════════════════════════════════════════════════════
 */

import { apiClient } from "@/shared/lib/api-client";
import type {
    AuthLoginResponse,
    AuthMeResponse,
    AuthMessageResponse,
    RegisterPayload,
} from "../types/auth-types";

export const authApi = {
    /**
     * Authenticate with email + password.
     * Returns access token, refresh token, and user info.
     */
    login: (email: string, password: string) =>
        apiClient.post<AuthLoginResponse>("/auth/login", { email, password }),

    /**
     * Register a new account.
     * Returns tokens + user info (auto-login on success).
     */
    register: (data: RegisterPayload) =>
        apiClient.post<AuthLoginResponse>("/auth/register", data),

    /**
     * Request a password-reset email.
     * Backend sends an email with a reset link.
     */
    forgotPassword: (email: string) =>
        apiClient.post<AuthMessageResponse>("/auth/forgot-password", { email }),

    /**
     * Reset password using the token from the email link.
     */
    resetPassword: (token: string, password: string) =>
        apiClient.post<AuthMessageResponse>("/auth/reset-password", {
            token,
            password,
        }),

    /**
     * Fetch current user profile using stored access token.
     * Used on app mount to revalidate a persisted session.
     */
    getMe: () => apiClient.get<AuthMeResponse>("/auth/me"),
};
