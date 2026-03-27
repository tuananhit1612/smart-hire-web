import { api } from "@/core/api";
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

interface ApiResponse<T> {
    success: boolean;
    code: string;
    message?: string;
    data: T;
}

const BASE = "/api/auth";

export const authService = {
    /**
     * Register a new user
     * POST /api/auth/register
     */
    register: async (data: RegisterRequest): Promise<AuthResponse> => {
        const res = await api.post<ApiResponse<AuthResponse>>(`${BASE}/register`, data);
        return res.data;
    },

    /**
     * Login
     * POST /api/auth/login
     */
    login: async (data: LoginRequest): Promise<AuthResponse> => {
        const res = await api.post<ApiResponse<AuthResponse>>(`${BASE}/login`, data);
        return res.data;
    },

    /**
     * Convert BE AuthResponse to FE SessionUser
     */
    mapToSessionUser: (resp: AuthResponse, isFirstLogin = false): SessionUser => {
        return {
            id: resp.userId.toString(),
            email: resp.email,
            name: resp.fullName,
            role: resp.role.toLowerCase() as any, // "candidate" | "employer"
            avatar: "", // Can add later
            isNewUser: isFirstLogin,
            joinedDate: new Date().toISOString(),
        };
    }
};
