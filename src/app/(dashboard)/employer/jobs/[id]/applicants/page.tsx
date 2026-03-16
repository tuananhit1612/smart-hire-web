import { EmployerApplicantsClient } from "./client-page";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EmployerApplicantsPage({ params }: PageProps) {
  const { id } = await params;
  return <EmployerApplicantsClient jobId={id} />;
}

// Required for output: 'export' — generate pages for all known mock job IDs
export async function generateStaticParams() {
  return [
    { id: "job-1" },
    { id: "job-2" },
    { id: "job-3" },
    { id: "job-4" },
    { id: "job-5" },
    { id: "job-6" },
    { id: "job-7" },
    { id: "job-8" },
  ];
}
