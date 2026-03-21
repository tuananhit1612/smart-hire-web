"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ApplicationState {
  // Set of job IDs the user has applied to
  appliedJobIds: string[];
  
  // Actions
  applyToJob: (jobId: string) => void;
  withdrawApplication: (jobId: string) => void;
  hasApplied: (jobId: string) => boolean;
  getApplicationDate: (jobId: string) => string | null;
  
  // Internal: Store application dates
  applicationDates: Record<string, string>;
}

export const useApplicationStore = create<ApplicationState>()(
  persist(
    (set, get) => ({
      appliedJobIds: [],
      applicationDates: {},

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

      withdrawApplication: (jobId: string) => {
        const { appliedJobIds, applicationDates } = get();
        if (appliedJobIds.includes(jobId)) {
          const newDates = { ...applicationDates };
          delete newDates[jobId];
          set({
            appliedJobIds: appliedJobIds.filter((id) => id !== jobId),
            applicationDates: newDates,
          });
        }
      },

      hasApplied: (jobId: string) => {
        return get().appliedJobIds.includes(jobId);
      },

      getApplicationDate: (jobId: string) => {
        return get().applicationDates[jobId] || null;
      },
    }),
    {
      name: "smarthire-applications",
    }
  )
);
