"use client";

/**
 * ═══════════════════════════════════════════════════════════
 *  Job Detail Page — Fetches a single public job by ID
 *
 *  Client component: calls GET /public/jobs/{id} on mount.
 * ═══════════════════════════════════════════════════════════
 */

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { JobDetail } from "@/features/jobs/components/job-detail";
import { jobApi } from "@/features/jobs/api/job-api";
import { mapJobResponseToJob } from "@/features/jobs/utils/job-mapper";
import { Loader2, AlertCircle, ArrowLeft } from "lucide-react";
import type { Job } from "@/features/jobs/types/job";

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchJob = async () => {
      setLoading(true);
      setError(null);
      try {
        const jobDto = await jobApi.getDetail(Number(id));
        setJob(mapJobResponseToJob(jobDto));
      } catch {
        setError("Không tìm thấy công việc này hoặc đã xảy ra lỗi.");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] animate-in fade-in duration-300">
        <Loader2 className="w-10 h-10 text-[#22C55E] animate-spin mb-4" />
        <p className="text-[14px] text-[#919EAB]">Đang tải thông tin việc làm...</p>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] animate-in fade-in duration-300">
        <div className="w-16 h-16 bg-[#FF5630]/10 rounded-2xl flex items-center justify-center mb-4">
          <AlertCircle className="w-8 h-8 text-[#FF5630]" />
        </div>
        <h3 className="text-lg font-bold text-[#1C252E] dark:text-white mb-2">
          Không tìm thấy việc làm
        </h3>
        <p className="text-[14px] text-[#637381] dark:text-[#919EAB] max-w-md text-center mb-6">
          {error ?? "Công việc này không tồn tại hoặc đã bị xóa."}
        </p>
        <button
          onClick={() => router.push("/jobs")}
          className="flex items-center gap-2 text-[14px] font-semibold text-[#22C55E] hover:text-[#22C55E]/80 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại danh sách việc làm
        </button>
      </div>
    );
  }

  return <JobDetail job={job} />;
}
