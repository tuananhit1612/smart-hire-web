import { Job } from "./job";
import { ApplicationStatus, ApplicationStage } from "@/shared/types/application";

export interface ApplicationTimelineEvent {
  readonly id: string;
  readonly stage: ApplicationStatus;
  readonly title: string;
  readonly description?: string;
  readonly date: string;
  readonly isCompleted: boolean;
}

export interface Application {
  readonly id: string;
  readonly jobId: string;
  readonly job: Job;
  readonly status: ApplicationStatus;
  readonly appliedAt: string;
  readonly lastUpdated: string;
  readonly timeline: ReadonlyArray<ApplicationTimelineEvent>;
  readonly notes?: string;
  readonly cvFileUrl?: string | null;
}

export const mockApplications: ReadonlyArray<Application> = [];
