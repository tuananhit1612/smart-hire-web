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
    ChangePasswordPayload,
    RegisterPayload,
    UpdateProfilePayload,
    UserResponse,
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
     * Refresh the access token using a valid refresh token.
     * Returns new tokens + user info.
     * NOTE: This is called internally by the api-client interceptor.
     *       You rarely need to call this directly.
     */
    refresh: (refreshToken: string) =>
        apiClient.post<AuthLoginResponse>("/auth/refresh-token", { refreshToken }),

    /**
     * Request a password-reset email.
     * Backend sends an email with a reset link.
     */
    forgotPassword: (email: string) =>
        apiClient.post<AuthMessageResponse>("/auth/forgot-password", { email }),

    /**
     * Reset password using the token from the email link.
     */
    resetPassword: (token: string, newPassword: string) =>
        apiClient.post<AuthMessageResponse>("/auth/reset-password", {
            token,
            newPassword,
        }),

    /**
     * Fetch current user profile using stored access token.
     * Used on app mount to revalidate a persisted session.
     */
    getMe: () => apiClient.get<AuthMeResponse>("/auth/me"),

    /**
     * Update current user's profile (fullName, phone, avatarUrl).
     * Returns the updated UserData object.
     */
    updateMe: (data: UpdateProfilePayload) =>
        apiClient.put<UserResponse>("/auth/me", data),

    /**
     * Change current user's password.
     * Requires the current password for verification.
     */
    changePassword: (data: ChangePasswordPayload) =>
        apiClient.post<AuthMessageResponse>("/auth/change-password", data),

    /**
     * Upload a new avatar image.
     * Returns the new avatar URL.
     */
    uploadAvatar: (file: File) => {
        const formData = new FormData();
        formData.append("file", file);
        return apiClient.post<string>("/users/me/avatar", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
    },
};
