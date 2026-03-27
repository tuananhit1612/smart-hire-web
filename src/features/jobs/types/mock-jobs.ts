import { Job } from "./job";

export const mockJobs: Job[] = [];

export function getJobById(id: string): Job | undefined {
  return mockJobs.find((job) => job.id === id);
}
