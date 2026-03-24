"use client";

/**
 * ═══════════════════════════════════════════════════════════
 *  Application Store — Zustand store for job applications
 *
 *  Tracks which jobs the user has applied to and manages
 *  the withdraw flow via real backend API calls.
 *
 *  `withdrawingJobId` and `withdrawError` are excluded from
 *  persist — they reset to defaults on page reload.
 * ═══════════════════════════════════════════════════════════
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { applicationApi } from "../api/application-api";
import { getErrorMessage } from "@/shared/lib/api-error";

// ─── State Interface ─────────────────────────────────────
interface ApplicationState {
  // Persisted state
  appliedJobIds: string[];
  applicationDates: Record<string, string>;

  // Transient state (NOT persisted)
  /** The job ID currently being withdrawn, or null if idle */
  withdrawingJobId: string | null;
  /** Error message from the last failed withdraw, or null */
  withdrawError: string | null;

  // Actions
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

      // ─── Transient defaults ────────────────────────
      withdrawingJobId: null,
      withdrawError: null,

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

          // Success — remove from local state
          const { appliedJobIds, applicationDates } = get();
          const newDates = { ...applicationDates };
          delete newDates[jobId];
          set({
            appliedJobIds: appliedJobIds.filter((id) => id !== jobId),
            applicationDates: newDates,
            withdrawingJobId: null,
          });
        } catch (error) {
          const message = getErrorMessage(error, "Đã xảy ra lỗi khi rút đơn ứng tuyển.");

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
      // Only persist the data fields — transient UI state resets on reload
      partialize: (state) => ({
        appliedJobIds: state.appliedJobIds,
        applicationDates: state.applicationDates,
      }),
    }
  )
);
