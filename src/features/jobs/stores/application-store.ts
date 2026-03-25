"use client";

/**
 * ═══════════════════════════════════════════════════════════
 *  Application Store — Zustand store for job applications
 *
 *  FE021: Added server-state slice (fetchApplications) that
 *  loads real data from the backend. The existing local
 *  persist slice (appliedJobIds, withdrawApplication, etc.)
 *  is kept intact and unchanged.
 *
 *  `withdrawingJobId`, `withdrawError`, `serverApplications`,
 *  `isLoadingApplications`, and `applicationsError` are
 *  excluded from persist — they reset on page reload.
 * ═══════════════════════════════════════════════════════════
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { applicationApi, ApplicationTrackingResponse } from "../api/application-api";
import { getErrorMessage } from "@/shared/lib/api-error";

// ─── State Interface ─────────────────────────────────────
interface ApplicationState {
  // ── Persisted state ──────────────────────────────────
  appliedJobIds: string[];
  applicationDates: Record<string, string>;

  // ── Server state (NOT persisted) ─────────────────────
  /** Applications fetched from the real backend */
  serverApplications: ApplicationTrackingResponse[];
  /** True while fetchApplications() is in-flight */
  isLoadingApplications: boolean;
  /** Error message from the last failed fetch, or null */
  applicationsError: string | null;

  // ── Transient UI state (NOT persisted) ───────────────
  /** The job ID currently being withdrawn, or null if idle */
  withdrawingJobId: string | null;
  /** Error message from the last failed withdraw, or null */
  withdrawError: string | null;

  // ── Actions ──────────────────────────────────────────
  /** Fetch all applications from the backend (page 0, size 50) */
  fetchApplications: () => Promise<void>;
  applyToJob: (jobId: string) => void;
  withdrawApplication: (jobId: string) => Promise<void>;
  hasApplied: (jobId: string) => boolean;
  getApplicationDate: (jobId: string) => string | null;
  clearWithdrawError: () => void;
}

// ─── Store ───────────────────────────────────────────────
export const useApplicationStore = create<ApplicationState>()(
  persist(
    (set, get) => ({
      // ─── Persisted defaults ────────────────────────
      appliedJobIds: [],
      applicationDates: {},

      // ─── Server-state defaults ─────────────────────
      serverApplications: [],
      isLoadingApplications: false,
      applicationsError: null,

      // ─── Transient defaults ────────────────────────
      withdrawingJobId: null,
      withdrawError: null,

      // ─── Fetch applications from BE ────────────────
      fetchApplications: async () => {
        // Prevent concurrent fetches
        if (get().isLoadingApplications) return;

        set({ isLoadingApplications: true, applicationsError: null });

        try {
          const response = await applicationApi.list(0, 50);
          set({
            serverApplications: response.data.content,
            isLoadingApplications: false,
          });
        } catch (error) {
          const message = getErrorMessage(
            error,
            "Không thể tải danh sách ứng tuyển."
          );
          set({ isLoadingApplications: false, applicationsError: message });
        }
      },

      // ─── Apply (local-only for now) ────────────────
      applyToJob: (jobId: string) => {
        const { appliedJobIds, applicationDates } = get();
        if (!appliedJobIds.includes(jobId)) {
          set({
            appliedJobIds: [...appliedJobIds, jobId],
            applicationDates: {
              ...applicationDates,
              [jobId]: new Date().toISOString(),
            },
          });
        }
      },

      // ─── Withdraw (async — calls real API) ─────────
      withdrawApplication: async (jobId: string) => {
        // Prevent double-clicking
        if (get().withdrawingJobId) return;

        set({ withdrawingJobId: jobId, withdrawError: null });

        try {
          await applicationApi.withdraw(jobId);

          // Remove from local persisted state
          const { appliedJobIds, applicationDates } = get();
          const newDates = { ...applicationDates };
          delete newDates[jobId];

          // Also remove from server state so the card disappears immediately
          const serverApplications = get().serverApplications.filter(
            (a) => String(a.jobId) !== jobId
          );

          set({
            appliedJobIds: appliedJobIds.filter((id) => id !== jobId),
            applicationDates: newDates,
            serverApplications,
            withdrawingJobId: null,
          });
        } catch (error) {
          const message = getErrorMessage(
            error,
            "Đã xảy ra lỗi khi rút đơn ứng tuyển."
          );
          set({ withdrawingJobId: null, withdrawError: message });
        }
      },

      // ─── Helpers ───────────────────────────────────
      hasApplied: (jobId: string) => {
        return get().appliedJobIds.includes(jobId);
      },

      getApplicationDate: (jobId: string) => {
        return get().applicationDates[jobId] || null;
      },

      clearWithdrawError: () => {
        set({ withdrawError: null });
      },
    }),
    {
      name: "smarthire-applications",
      // Only persist the data fields — all transient & server state resets on reload
      partialize: (state) => ({
        appliedJobIds: state.appliedJobIds,
        applicationDates: state.applicationDates,
      }),
    }
  )
);
