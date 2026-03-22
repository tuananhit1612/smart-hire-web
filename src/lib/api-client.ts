/**
 * ═══════════════════════════════════════════════════════════
 *  API Client — Centralised fetch wrapper for calling the
 *  SmartHire backend.
 *
 *  Features:
 *    • Automatic Bearer token attachment via tokenStorage
 *    • JSON request/response handling
 *    • Typed error responses
 *    • Token refresh support (stub — plug in when endpoint ready)
 * ═══════════════════════════════════════════════════════════
 */

import { tokenStorage } from "@/features/auth/lib/token-storage";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api";

// ── Types ───────────────────────────────────────────────

export class ApiError extends Error {
    status: number;
    data: unknown;

    constructor(status: number, data: unknown, message?: string) {
        super(message ?? `API Error ${status}`);
        this.status = status;
        this.data = data;
    }
}

interface RequestOptions extends Omit<RequestInit, "body"> {
    body?: unknown;
    /** Skip attaching the Authorization header */
    skipAuth?: boolean;
}

// ── Core fetch wrapper ──────────────────────────────────

async function request<T>(
    endpoint: string,
    options: RequestOptions = {},
): Promise<T> {
    const { body, skipAuth, headers: customHeaders, ...rest } = options;

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(customHeaders as Record<string, string>),
    };

    // Attach Bearer token unless explicitly skipped
    if (!skipAuth) {
        const token = tokenStorage.getAccessToken();
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }
    }

    const url = endpoint.startsWith("http")
        ? endpoint
        : `${API_BASE}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;

    const response = await fetch(url, {
        ...rest,
        headers,
        body: body ? JSON.stringify(body) : undefined,
    });

    // Handle no-content success (204)
    if (response.status === 204) {
        return null as T;
    }

    let data: unknown;
    try {
        data = await response.json();
    } catch {
        data = null;
    }

    if (!response.ok) {
        throw new ApiError(response.status, data, `API Error ${response.status}`);
    }

    return data as T;
}

// ── Public helpers ──────────────────────────────────────

export const apiClient = {
    get<T>(endpoint: string, options?: RequestOptions) {
        return request<T>(endpoint, { ...options, method: "GET" });
    },

    post<T>(endpoint: string, body?: unknown, options?: RequestOptions) {
        return request<T>(endpoint, { ...options, method: "POST", body });
    },

    put<T>(endpoint: string, body?: unknown, options?: RequestOptions) {
        return request<T>(endpoint, { ...options, method: "PUT", body });
    },

    patch<T>(endpoint: string, body?: unknown, options?: RequestOptions) {
        return request<T>(endpoint, { ...options, method: "PATCH", body });
    },

    delete<T>(endpoint: string, options?: RequestOptions) {
        return request<T>(endpoint, { ...options, method: "DELETE" });
    },
};
