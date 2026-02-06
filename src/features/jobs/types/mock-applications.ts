// src/features/jobs/types/mock-applications.ts
import { Job } from "./job";
import { mockJobs } from "./mock-jobs";
import { ApplicationStatus, ApplicationStage } from "@/shared/types/application";

// Define strict types for our fixtures
export interface ApplicationTimelineEvent {
  readonly id: string;
  readonly stage: ApplicationStatus;
  readonly title: string;
  readonly description?: string;
  readonly date: string; // ISO 8601
  readonly isCompleted: boolean;
}

export interface Application {
  readonly id: string;
  readonly jobId: string;
  readonly job: Job;
  readonly status: ApplicationStatus;
  readonly appliedAt: string; // ISO 8601
  readonly lastUpdated: string; // ISO 8601
  readonly timeline: ReadonlyArray<ApplicationTimelineEvent>;
  readonly notes?: string;
}

// Helper to ensure safe data retrieval
const getJobOrThrow = (id: string): Job => {
    const job = mockJobs.find(j => j.id === id);
    if (!job) return mockJobs[0]; // Fallback for safety
    return job;
}

export const mockApplications: ReadonlyArray<Application> = [
  {
    id: "app-01",
    jobId: "1",
    job: getJobOrThrow("1"),
    status: ApplicationStage.INTERVIEW,
    appliedAt: "2026-02-01T09:00:00Z",
    lastUpdated: "2026-02-04T10:30:00Z",
    timeline: [
        { id: "e1", stage: "APPLIED", title: "Đã nộp hồ sơ", date: "2026-02-01T09:00:00Z", isCompleted: true },
        { id: "e2", stage: "SCREENING", title: "Duyệt hồ sơ", date: "2026-02-02T14:00:00Z", isCompleted: true },
        { id: "e3", stage: "INTERVIEW", title: "Phỏng vấn", description: "Lịch: 14:00 06/02/2026", date: "2026-02-06T07:00:00Z", isCompleted: false }
    ]
  },
  {
    id: "app-02",
    jobId: "2",
    job: getJobOrThrow("2"),
    status: ApplicationStage.APPLIED,
    appliedAt: "2026-02-05T08:00:00Z",
    lastUpdated: "2026-02-05T08:00:00Z",
    timeline: [
        { id: "e1", stage: "APPLIED", title: "Đã nộp hồ sơ", date: "2026-02-05T08:00:00Z", isCompleted: true }
    ]
  },
  {
      id: "app-03",
      jobId: "3",
      job: getJobOrThrow("3"),
      status: ApplicationStage.REJECTED,
      appliedAt: "2026-01-20T10:00:00Z",
      lastUpdated: "2026-01-25T15:00:00Z",
      timeline: [
          { id: "e1", stage: "APPLIED", title: "Đã nộp hồ sơ", date: "2026-01-20T10:00:00Z", isCompleted: true },
          { id: "e2", stage: "REJECTED", title: "Từ chối", description: "CV chưa phù hợp", date: "2026-01-25T15:00:00Z", isCompleted: true }
      ]
  }
];
