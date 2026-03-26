/**
 * ═══════════════════════════════════════════════════════════
 *  Admin Dashboard API Service
 *  Thin wrapper around apiClient for admin dashboard endpoints.
 * ═══════════════════════════════════════════════════════════
 */

import { apiClient } from "@/shared/lib/api-client";
import type {
  ApiWrapper,
  AdminDashboardResponse,
} from "../types/admin-dashboard-types";

const BASE = "/admin/dashboard";

export const adminDashboardApi = {
  /** GET /admin/dashboard/overview */
  getOverview: () =>
    apiClient.get<ApiWrapper<AdminDashboardResponse>>(`${BASE}/overview`),
};
