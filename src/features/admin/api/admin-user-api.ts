/**
 * ═══════════════════════════════════════════════════════════
 *  Admin User API — Endpoint wrappers for user management
 *
 *  GET    /admin/users            → list (paginated)
 *  GET    /admin/users/:id        → detail
 *  PATCH  /admin/users/:id/status → enable/disable
 *  PATCH  /admin/users/:id/role   → change role
 * ═══════════════════════════════════════════════════════════
 */

import { apiClient } from "@/shared/lib/api-client";
import type { ApiWrapper, PageResponse } from "@/shared/types/api";

// ─── DTO Mirrors ─────────────────────────────────────────

export interface AdminUserResponse {
  id: number;
  email: string;
  fullName: string;
  phone: string | null;
  avatarUrl: string | null;
  role: "CANDIDATE" | "HR" | "ADMIN";
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AdminUserListParams {
  page?: number;
  size?: number;
  keyword?: string;
  role?: string;
  enabled?: boolean;
}

// ─── API Methods ─────────────────────────────────────────

export const adminUserApi = {
  /**
   * List all users with pagination and optional filters.
   */
  list: async (params: AdminUserListParams = {}) => {
    const { data } = await apiClient.get<ApiWrapper<PageResponse<AdminUserResponse>>>(
      "/admin/users",
      { params }
    );
    return data.data;
  },

  /**
   * Get a single user's details by ID.
   */
  getById: async (id: number) => {
    const { data } = await apiClient.get<ApiWrapper<AdminUserResponse>>(
      `/admin/users/${id}`
    );
    return data.data;
  },

  /**
   * Enable or disable a user account.
   */
  updateStatus: async (id: number, enabled: boolean) => {
    const { data } = await apiClient.patch<ApiWrapper<AdminUserResponse>>(
      `/admin/users/${id}/status`,
      { enabled }
    );
    return data.data;
  },

  /**
   * Change a user's role (CANDIDATE | HR | ADMIN).
   */
  updateRole: async (id: number, role: string) => {
    const { data } = await apiClient.patch<ApiWrapper<AdminUserResponse>>(
      `/admin/users/${id}/role`,
      { role }
    );
    return data.data;
  },
};
