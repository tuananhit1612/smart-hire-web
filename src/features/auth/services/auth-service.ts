/**
 * ═══════════════════════════════════════════════════════════
 *  Auth Service — Calls the SmartHire backend for
 *  login, register, user-profile, and logout.
 *
 *  API endpoints (based on Swagger):
 *    POST /auth/login         { email, password }
 *    POST /auth/register      { fullName, email, password, role }
 *    GET  /users/me           (Authorization: Bearer …)
 *    POST /auth/logout        (Authorization: Bearer …)
 * ═══════════════════════════════════════════════════════════
 */

import { apiClient, ApiError } from "@/lib/api-client";
import type { SessionUser, UserRole } from "../types/auth-types";

// ── Request / Response DTOs ─────────────────────────────

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    fullName: string;
    email: string;
    password: string;
    role: "candidate" | "hr"; // backend uses "hr" not "employer"
}

/** Shape returned by POST /auth/login */
export interface LoginResponse {
    token: string;
    refreshToken?: string;
    user: ApiUser;
}

/** Shape returned by POST /auth/register */
export interface RegisterResponse {
    token: string;
    user: ApiUser;
    message?: string;
}

/** Shape returned by GET /users/me */
export interface ApiUser {
    id: string;
    fullName: string;
    email: string;
    role: string;         // "candidate" | "hr" | "admin"
    avatarUrl?: string;
    phone?: string;
    isNewUser?: boolean;
    isVerified?: boolean;
    companyName?: string;
    createdAt?: string;
}

// ── Role mapping (backend ↔ frontend) ───────────────────

/** Convert the backend role string to the frontend UserRole type */
function mapApiRoleToUserRole(apiRole: string): UserRole {
    switch (apiRole.toLowerCase()) {
        case "hr":
        case "employer":
            return "employer";
        case "admin":
            return "admin";
        case "candidate":
        default:
            return "candidate";
    }
}

/** Map an ApiUser to the frontend SessionUser */
function mapApiUserToSession(u: ApiUser): SessionUser {
    return {
        id: u.id,
        name: u.fullName,
        email: u.email,
        role: mapApiRoleToUserRole(u.role),
        avatar: u.avatarUrl ?? undefined,
        phone: u.phone ?? undefined,
        company: u.companyName ?? undefined,
        joinedDate: u.createdAt ?? new Date().toISOString(),
        isNewUser: u.isNewUser ?? false,
    };
}

// ── Service methods ─────────────────────────────────────

export const authService = {
    /**
     * POST /auth/login
     * Returns { token, user } on success.
     */
    async login(data: LoginRequest): Promise<{ token: string; user: SessionUser }> {
        const res = await apiClient.post<LoginResponse>("/auth/login", data, {
            skipAuth: true,
        });

        return {
            token: res.token,
            user: mapApiUserToSession(res.user),
        };
    },

    /**
     * POST /auth/register
     * Body: { fullName, email, password, role }
     * `role` here must be "candidate" | "hr" (backend expects "hr").
     */
    async register(
        data: Omit<RegisterRequest, "role"> & { role: UserRole },
    ): Promise<{ token: string; user: SessionUser }> {
        // Map frontend "employer" → backend "hr"
        const apiRole: "candidate" | "hr" =
            data.role === "employer" ? "hr" : "candidate";

        const res = await apiClient.post<RegisterResponse>(
            "/auth/register",
            { ...data, role: apiRole },
            { skipAuth: true },
        );

        return {
            token: res.token,
            user: mapApiUserToSession(res.user),
        };
    },

    /**
     * GET /users/me
     * Fetches the currently authenticated user profile.
     */
    async getMe(): Promise<SessionUser> {
        const res = await apiClient.get<ApiUser>("/users/me");
        return mapApiUserToSession(res);
    },

    /**
     * POST /auth/logout (if backend supports it)
     * Gracefully ignores 401/404 since logout should always succeed locally.
     */
    async logout(): Promise<void> {
        try {
            await apiClient.post("/auth/logout");
        } catch (err) {
            // If the endpoint doesn't exist or token is already expired,
            // we still want the local logout to succeed.
            if (err instanceof ApiError && [401, 404].includes(err.status)) {
                return;
            }
            // Swallow any other errors for logout
        }
    },

    /**
     * Parse a backend error into a user-friendly Vietnamese message.
     */
    parseError(err: unknown): string {
        if (err instanceof ApiError) {
            const data = err.data as { message?: string; error?: string } | null;
            const msg = data?.message ?? data?.error;
            if (msg) return msg;

            switch (err.status) {
                case 400: return "Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.";
                case 401: return "Email hoặc mật khẩu không đúng.";
                case 403: return "Tài khoản chưa được kích hoạt hoặc bị khoá.";
                case 409: return "Email này đã được đăng ký.";
                case 429: return "Quá nhiều lần thử. Vui lòng đợi một lát.";
                case 500: return "Lỗi máy chủ. Vui lòng thử lại sau.";
                default:  return `Lỗi không xác định (${err.status}).`;
            }
        }
        if (err instanceof TypeError && err.message.includes("fetch")) {
            return "Không thể kết nối tới máy chủ. Vui lòng kiểm tra mạng.";
        }
        return "Đã có lỗi xảy ra. Vui lòng thử lại.";
    },
};
