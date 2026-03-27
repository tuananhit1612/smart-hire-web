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

  /** GET /admin/reports/jobs/csv */
  exportJobsCsv: () =>
    apiClient.get<Blob>("/admin/reports/jobs/csv", { responseType: "blob" }),

  /** GET /admin/reports/applications/csv */
  exportApplicationsCsv: () =>
    apiClient.get<Blob>("/admin/reports/applications/csv", { responseType: "blob" }),
};
