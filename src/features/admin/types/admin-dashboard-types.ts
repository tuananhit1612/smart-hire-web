/**
 * ═══════════════════════════════════════════════════════════
 *  Admin Dashboard — API Response Types
 *  Mirrors backend AdminDashboardResponse + StageFunnelItem
 * ═══════════════════════════════════════════════════════════
 */

export type { ApiWrapper } from "@/shared/types/api";

/** A single stage in the recruitment funnel */
export interface StageFunnelItem {
  stage: string;
  count: number;
  percentage: number;
}

/** Full admin dashboard overview payload — matches AdminDashboardResponse.java */
export interface AdminDashboardResponse {
  totalUsers: number;
  totalCandidates: number;
  totalHrUsers: number;
  totalAdmins: number;
  activeUsers: number;
  inactiveUsers: number;

  totalJobs: number;
  openJobs: number;
  closedJobs: number;
  draftJobs: number;

  totalCompanies: number;
  totalApplications: number;

  stageFunnel: StageFunnelItem[];
  hireRate: number;
  rejectRate: number;
}
