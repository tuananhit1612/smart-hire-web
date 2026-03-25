"use client";

/**
 * ═══════════════════════════════════════════════════════════
 *  Application Store — Zustand store for job applications
 *
 *  Tracks which jobs the user has applied to and manages
 *  apply / withdraw flows via real backend API calls.
 *
 *  `submittingJobId`, `withdrawingJobId`, errors, and
 *  server-state fields are excluded from persist — they
 *  reset on page reload.
 * ═══════════════════════════════════════════════════════════
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  applicationApi,
  type ApplicationTrackingResponse,
  type ApplyResponse,
  type ApplyPayload,
} from "../api/application-api";

import { getErrorMessage } from "@/shared/lib/api-error";

// ─── State Interface ─────────────────────────────────────
interface ApplicationState {
  // ── Persisted state ──────────────────────────────────
  appliedJobIds: string[];
  applicationDates: Record<string, string>;
  /** Maps jobId → applicationId (needed for withdraw) */
  applicationIdMap: Record<string, number>;

  // ── Server state (NOT persisted) ─────────────────────
  /** Applications fetched from the real backend */
  serverApplications: ApplicationTrackingResponse[];
  /** True while fetchApplications() is in-flight */
  isLoadingApplications: boolean;
  /** Error message from the last failed fetch, or null */
  applicationsError: string | null;

  // ── Transient UI state (NOT persisted) ───────────────
  submittingJobId: string | null;
  submitError: string | null;
  withdrawingJobId: string | null;
  withdrawError: string | null;

  // ── Actions ──────────────────────────────────────────
  /** Fetch all applications from the backend (page 0, size 50) */
  fetchApplications: () => Promise<void>;
  applyToJob: (payload: ApplyPayload) => Promise<ApplyResponse>;
  withdrawApplication: (jobId: string) => Promise<void>;
  fetchMyApplications: () => Promise<void>;
  hasApplied: (jobId: string) => boolean;
  getApplicationDate: (jobId: string) => string | null;
  clearSubmitError: () => void;
  clearWithdrawError: () => void;
}

// ─── Store ───────────────────────────────────────────────
export const useApplicationStore = create<ApplicationState>()(
  persist(
    (set, get) => ({
      // ─── Persisted defaults ────────────────────────
      appliedJobIds: [],
      applicationDates: {},
      applicationIdMap: {},

      // ─── Server-state defaults ─────────────────────
      serverApplications: [],
      isLoadingApplications: false,
      applicationsError: null,

      // ─── Transient defaults ────────────────────────
      submittingJobId: null,
      submitError: null,
      withdrawingJobId: null,
      withdrawError: null,

      // ─── Fetch applications from BE ────────────────
      fetchApplications: async () => {
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

      // ─── Apply (async — calls real API) ─────────────
      applyToJob: async (payload: ApplyPayload) => {
        const jobIdStr = String(payload.jobId);

        // Prevent double-submit
        if (get().submittingJobId) {
          throw new Error("Already submitting");
        }

        set({ submittingJobId: jobIdStr, submitError: null });

        try {
          const response = await applicationApi.apply(payload);
          const app = response.data;

          // Success — update local state
          const { appliedJobIds, applicationDates, applicationIdMap } = get();
          if (!appliedJobIds.includes(jobIdStr)) {
            set({
              appliedJobIds: [...appliedJobIds, jobIdStr],
              applicationDates: {
                ...applicationDates,
                [jobIdStr]: app.appliedAt,
              },
              applicationIdMap: {
                ...applicationIdMap,
                [jobIdStr]: app.id,
              },
              submittingJobId: null,
            });
          } else {
            set({ submittingJobId: null });
          }

          return app;
        } catch (error) {
          const message = getErrorMessage(
            error,
            "Đã xảy ra lỗi khi gửi hồ sơ ứng tuyển."
          );
          set({ submittingJobId: null, submitError: message });
          throw error;
        }
      },

      // ─── Withdraw (async — calls real API) ─────────
      withdrawApplication: async (jobId: string) => {
        if (get().withdrawingJobId) return;

        const applicationId = get().applicationIdMap[jobId];
        if (!applicationId) {
          set({ withdrawError: "Không tìm thấy đơn ứng tuyển." });
          return;
        }

        set({ withdrawingJobId: jobId, withdrawError: null });

        try {
          await applicationApi.withdraw(applicationId);

          // Success — remove from local & server state
          const { appliedJobIds, applicationDates, applicationIdMap } = get();
          const newDates = { ...applicationDates };
          const newIdMap = { ...applicationIdMap };
          delete newDates[jobId];
          delete newIdMap[jobId];

          const serverApplications = get().serverApplications.filter(
            (a) => String(a.jobId) !== jobId
          );

          set({
            appliedJobIds: appliedJobIds.filter((id) => id !== jobId),
            applicationDates: newDates,
            applicationIdMap: newIdMap,
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

      // ─── Fetch my applications from backend ─────────
      fetchMyApplications: async () => {
        try {
          const response = await applicationApi.listMine();
          const apps = response.data;

          const appliedJobIds: string[] = [];
          const applicationDates: Record<string, string> = {};
          const applicationIdMap: Record<string, number> = {};

          for (const app of apps) {
            const jobIdStr = String(app.jobId);
            appliedJobIds.push(jobIdStr);
            applicationDates[jobIdStr] = app.appliedAt;
            applicationIdMap[jobIdStr] = app.id;
          }

          set({ appliedJobIds, applicationDates, applicationIdMap });
        } catch {
          // Silently fail — local cache still valid
        }
      },

      // ─── Helpers ───────────────────────────────────
      hasApplied: (jobId: string) => {
        return get().appliedJobIds.includes(jobId);
      },

      getApplicationDate: (jobId: string) => {
        return get().applicationDates[jobId] || null;
      },

      clearSubmitError: () => {
        set({ submitError: null });
      },

      clearWithdrawError: () => {
        set({ withdrawError: null });
      },
    }),
    {
      name: "smarthire-applications",
      // Only persist data fields — transient UI & server state resets on reload
      partialize: (state) => ({
        appliedJobIds: state.appliedJobIds,
        applicationDates: state.applicationDates,
        applicationIdMap: state.applicationIdMap,
      }),
    }
  )
);
