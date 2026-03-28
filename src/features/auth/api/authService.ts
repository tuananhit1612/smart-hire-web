import { apiClient } from "@/shared/lib/api-client";
import type { ApiWrapper } from "@/shared/types/api";
import type { SessionUser } from "../types/auth-types";

export interface RegisterRequest {
    email: string;
    password: string;
    fullName: string;
    phone?: string;
    role: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    userId: number;
    email: string;
    fullName: string;
    role: string;
}

const BASE = "/auth";

export const authService = {
    /**
     * Register a new user
     * POST /auth/register
     */
    register: async (data: RegisterRequest): Promise<AuthResponse> => {
        const { data: res } = await apiClient.post<ApiWrapper<AuthResponse>>(`${BASE}/register`, data);
        return res.data;
    },

    /**
     * Login
     * POST /auth/login
     */
    login: async (data: LoginRequest): Promise<AuthResponse> => {
        const { data: res } = await apiClient.post<ApiWrapper<AuthResponse>>(`${BASE}/login`, data);
        return res.data;
    },

    /**
     * Convert BE AuthResponse to FE SessionUser
     */
    mapToSessionUser: (resp: AuthResponse, isFirstLogin = false): SessionUser => {
        return {
            id: resp.userId.toString(),
            email: resp.email,
            fullName: resp.fullName,
            role: resp.role.toLowerCase() as any, // "candidate" | "employer"
            avatarUrl: "", // Can add later
            isNewUser: isFirstLogin,
            joinedDate: new Date().toISOString(),
        };
    }
};
