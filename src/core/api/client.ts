/**
 * ═════════════════════════════════════════════════════════
 *  SmartHire API Client
 *  Central HTTP client for communicating with the
 *  Spring Boot backend. Currently returns mock data
 *  when NEXT_PUBLIC_API_URL is not set.
 * ═════════════════════════════════════════════════════════
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";

type RequestOptions = Omit<RequestInit, "body"> & {
    body?: unknown;
    params?: Record<string, string>;
};

/**
 * Centralized fetch wrapper with JSON handling,
 * auth token injection, and error normalization.
 */
async function request<T>(
    endpoint: string,
    { body, params, headers, ...options }: RequestOptions = {}
): Promise<T> {
    const url = new URL(endpoint, API_BASE || "http://localhost:8080");

    if (params) {
        Object.entries(params).forEach(([k, v]) =>
            url.searchParams.set(k, v)
        );
    }

    // Get auth token from cookie if available
    const token =
        typeof document !== "undefined"
            ? document.cookie
                  .split("; ")
                  .find((c) => c.startsWith("smarthire-token="))
                  ?.split("=")[1]
            : undefined;

    const res = await fetch(url.toString(), {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
        const error = await res.json().catch(() => ({ message: res.statusText }));
        // BE returns ApiResponse format: { success, code, message }
        const errorMessage = error.message ?? error.code ?? res.statusText;
        throw new ApiError(res.status, errorMessage, error.code);
    }

    // Handle 204 No Content
    if (res.status === 204) return undefined as T;

    return res.json();
}

/** Typed API error with BE error code support */
export class ApiError extends Error {
    constructor(
        public readonly status: number,
        message: string,
        public readonly code?: string
    ) {
        super(message);
        this.name = "ApiError";
    }
}

/** Convenience methods */
export const api = {
    get: <T>(endpoint: string, opts?: RequestOptions) =>
        request<T>(endpoint, { ...opts, method: "GET" }),

    post: <T>(endpoint: string, body?: unknown, opts?: RequestOptions) =>
        request<T>(endpoint, { ...opts, method: "POST", body }),

    put: <T>(endpoint: string, body?: unknown, opts?: RequestOptions) =>
        request<T>(endpoint, { ...opts, method: "PUT", body }),

    patch: <T>(endpoint: string, body?: unknown, opts?: RequestOptions) =>
        request<T>(endpoint, { ...opts, method: "PATCH", body }),

    delete: <T>(endpoint: string, opts?: RequestOptions) =>
        request<T>(endpoint, { ...opts, method: "DELETE" }),
};
