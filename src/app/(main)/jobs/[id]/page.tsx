import { notFound } from "next/navigation";
import { getJobById } from "@/features/jobs/types/mock-jobs";
import { JobDetail } from "@/features/jobs/components/job-detail";

interface JobDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { id } = await params;
  const job = getJobById(id);

  if (!job) {
    notFound();
  }

  return <JobDetail job={job} />;
}

// Generate static params for known jobs
export async function generateStaticParams() {
  const { mockJobs } = await import("@/features/jobs/types/mock-jobs");
  return mockJobs.map((job) => ({
    id: job.id,
  }));
}
