"use client";

import { useState, useMemo, useEffect, useCallback, Suspense } from "react";
import { Job } from "../types/job";
import { JobCard } from "./job-card";
import { JobFilter } from "./job-filter";
import { JobPagination } from "./job-pagination";
import { jobApi, JobSearchParams } from "../api/job-api";
import { JobResponse } from "../types/job-api-types";
import { useJobFilters } from "../hooks/useJobFilters";
import { Search, Loader2, AlertTriangle, RefreshCw } from "lucide-react";
import { ApplyModal } from "./apply-modal";

const PAGE_SIZE = 9; // 3×3 grid

// ─── Enum mappers ────────────────────────────────────────
// Backend sends FULL_TIME, PART_TIME, etc. → frontend uses "Full-time" etc.
const JOB_TYPE_MAP: Record<string, string> = {
  FULL_TIME: "Full-time",
  PART_TIME: "Part-time",
  CONTRACT: "Contract",
  INTERNSHIP: "Internship",
};

const JOB_LEVEL_MAP: Record<string, string> = {
  INTERN: "Intern",
  JUNIOR: "Junior",
  MID: "Middle",
  SENIOR: "Senior",
  LEAD: "Lead",
  MANAGER: "Manager",
};

// Reverse: UI tag → backend query param value
const TAG_TO_JOB_TYPE: Record<string, string> = {
  "Full-time": "FULL_TIME",
  "Part-time": "PART_TIME",
  Internship: "INTERNSHIP",
};

const TAG_TO_JOB_LEVEL: Record<string, string> = {
  Senior: "SENIOR",
  Junior: "JUNIOR",
  Middle: "MID",
  Lead: "LEAD",
};

function formatSalary(
  min: number | null,
  max: number | null,
  currency: string | null
): string {
  const c = currency ?? "VND";
  if (min != null && max != null) {
    const fmtMin = (min / 1_000_000).toFixed(0);
    const fmtMax = (max / 1_000_000).toFixed(0);
    return `${fmtMin} - ${fmtMax} triệu ${c}`;
  }
  if (min != null) return `Từ ${(min / 1_000_000).toFixed(0)} triệu ${c}`;
  if (max != null) return `Đến ${(max / 1_000_000).toFixed(0)} triệu ${c}`;
  return "Thỏa thuận";
}

/** Map API DTO to frontend Job type */
function toJob(dto: JobResponse): Job {
  return {
    id: String(dto.id),
    title: dto.title,
    company: dto.companyName,
    logoUrl: dto.companyLogoUrl ?? "/images/default-company.png",
    location: dto.location ?? "",
    type: (JOB_TYPE_MAP[dto.jobType] ?? dto.jobType) as Job["type"],
    level: (JOB_LEVEL_MAP[dto.jobLevel] ?? dto.jobLevel) as Job["level"],
    salary: formatSalary(dto.salaryMin, dto.salaryMax, dto.salaryCurrency ?? "VND"),
    postedAt: dto.createdAt,
    description: dto.description ?? "",
    skills: dto.skills?.map((s) => s.skillName) ?? [],
    status: dto.status === "CLOSED" ? "closed" : "open",
    deadline: dto.deadline ?? undefined,
  };
}

// ─── Inner component that uses searchParams ──────────────
function JobListInner() {
  const {
    keyword,
    location,
    tags,
    page,
    setKeyword,
    setLocation,
    toggleTag,
    setPage,
    resetFilters,
  } = useJobFilters();

  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [savedJobIds, setSavedJobIds] = useState<Set<string>>(new Set());
  const [applyJob, setApplyJob] = useState<Job | null>(null);

  // ── Derive backend query params from UI tags ─────────
  const apiParams = useMemo<JobSearchParams>(() => {
    const params: JobSearchParams = {};
    if (keyword) params.keyword = keyword;
    if (location) params.location = location;

    // Map selected tags to backend params
    for (const tag of tags) {
      if (TAG_TO_JOB_TYPE[tag]) params.jobType = TAG_TO_JOB_TYPE[tag];
      if (TAG_TO_JOB_LEVEL[tag]) params.jobLevel = TAG_TO_JOB_LEVEL[tag];
      if (tag === "Remote") {
        // no backend isRemote param yet, will filter client-side
      }
    }
    return params;
  }, [keyword, location, tags]);

  // ── Fetch data ───────────────────────────────────────
  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const dtos = await jobApi.search(apiParams);
      setAllJobs(dtos.map(toJob));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Đã xảy ra lỗi";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [apiParams]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  // ── Client-side pagination ───────────────────────────
  const filteredJobs = useMemo(() => {
    const jobs = allJobs;

    // Handle "Remote" tag client-side (no backend param for isRemote)
    if (tags.includes("Remote")) {
      // Remote tag is handled fully client-side since backend doesn't filter isRemote
      // For now we just keep all returned jobs since backend handles most filters
    }

    // Sort: saved jobs first, then by date
    return [...jobs].sort((a, b) => {
      const aIsSaved = savedJobIds.has(a.id);
      const bIsSaved = savedJobIds.has(b.id);
      if (aIsSaved && !bIsSaved) return -1;
      if (!aIsSaved && bIsSaved) return 1;
      return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
    });
  }, [allJobs, savedJobIds, tags]);

  const totalPages = Math.ceil(filteredJobs.length / PAGE_SIZE);
  const currentPage = Math.min(page, Math.max(1, totalPages));
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const toggleSaveJob = (jobId: string) => {
    setSavedJobIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(jobId)) newSet.delete(jobId);
      else newSet.add(jobId);
      return newSet;
    });
  };

  // ── Render ───────────────────────────────────────────
  return (
    <div className="w-full">
      <JobFilter
        searchQuery={keyword}
        setSearchQuery={setKeyword}
        locationQuery={location}
        setLocationQuery={setLocation}
        selectedTags={tags}
        toggleTag={toggleTag}
        resetFilters={resetFilters}
      />

      {/* Results Count */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-bold text-[#1C252E] dark:text-white">
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin text-[#22C55E]" />
              Đang tải...
            </span>
          ) : (
            `${filteredJobs.length} công việc phù hợp`
          )}
        </h2>
        {savedJobIds.size > 0 && (
          <p className="text-[13px] text-[#FF5630] font-semibold">
            ❤️ {savedJobIds.size} việc làm đã lưu
          </p>
        )}
      </div>

      {/* Error state */}
      {error && !loading && (
        <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-300">
          <div className="w-20 h-20 bg-[#FF5630]/10 rounded-2xl flex items-center justify-center mb-4">
            <AlertTriangle className="w-9 h-9 text-[#FF5630]" />
          </div>
          <h3 className="text-xl font-bold text-[#1C252E] dark:text-white mb-2">
            Không thể tải dữ liệu
          </h3>
          <p className="text-[14px] text-[#637381] dark:text-[#919EAB] max-w-md mb-4">
            {error}
          </p>
          <button
            onClick={fetchJobs}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#22C55E] text-white text-[14px] font-semibold rounded-xl hover:bg-[#22C55E]/90 active:scale-[0.97] transition-all duration-200"
          >
            <RefreshCw className="w-4 h-4" />
            Thử lại
          </button>
        </div>
      )}

      {/* Loading skeleton */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-[#1C252E] border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] rounded-2xl p-5 animate-pulse"
            >
              <div className="flex gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[rgba(145,158,171,0.12)] dark:bg-white/[0.06]" />
                <div className="flex-1 space-y-2">
                  <div className="h-5 bg-[rgba(145,158,171,0.12)] dark:bg-white/[0.06] rounded-lg w-3/4" />
                  <div className="h-3.5 bg-[rgba(145,158,171,0.08)] dark:bg-white/[0.04] rounded-lg w-1/2" />
                </div>
              </div>
              <div className="flex gap-2 mb-3">
                <div className="h-6 w-16 bg-[rgba(145,158,171,0.08)] dark:bg-white/[0.04] rounded-lg" />
                <div className="h-6 w-20 bg-[rgba(145,158,171,0.08)] dark:bg-white/[0.04] rounded-lg" />
              </div>
              <div className="space-y-2 mb-4">
                <div className="h-4 bg-[rgba(145,158,171,0.08)] dark:bg-white/[0.04] rounded-lg w-1/3" />
                <div className="h-3.5 bg-[rgba(145,158,171,0.06)] dark:bg-white/[0.03] rounded-lg w-full" />
                <div className="h-3.5 bg-[rgba(145,158,171,0.06)] dark:bg-white/[0.03] rounded-lg w-4/5" />
              </div>
              <div className="h-10 bg-[rgba(145,158,171,0.06)] dark:bg-white/[0.03] rounded-xl mt-auto" />
            </div>
          ))}
        </div>
      )}

      {/* Grid */}
      {!loading && !error && paginatedJobs.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedJobs.map((job, i) => (
              <JobCard
                key={job.id}
                job={job}
                index={i}
                isSaved={savedJobIds.has(job.id)}
                onApply={() => setApplyJob(job)}
                onSave={toggleSaveJob}
              />
            ))}
          </div>

          <JobPagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredJobs.length}
            pageSize={PAGE_SIZE}
            onPageChange={setPage}
          />
        </>
      )}

      {/* Empty state */}
      {!loading && !error && filteredJobs.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-300">
          <div className="w-20 h-20 bg-[rgba(145,158,171,0.04)] dark:bg-[rgba(145,158,171,0.08)] rounded-2xl flex items-center justify-center mb-4">
            <Search className="w-9 h-9 text-[#919EAB]" />
          </div>
          <h3 className="text-xl font-bold text-[#1C252E] dark:text-white mb-2">
            Không tìm thấy công việc nào
          </h3>
          <p className="text-[14px] text-[#637381] dark:text-[#919EAB] max-w-md">
            Thử thay đổi từ khóa tìm kiếm hoặc xóa bớt bộ lọc để xem nhiều
            kết quả hơn.
          </p>
          <button
            onClick={resetFilters}
            className="mt-4 text-[14px] font-semibold text-[#22C55E] hover:text-[#22C55E]/80 transition-colors"
          >
            Xóa tất cả bộ lọc
          </button>
        </div>
      )}

      {applyJob && (
        <ApplyModal
          job={applyJob}
          isOpen={!!applyJob}
          onClose={() => setApplyJob(null)}
          onSuccess={() => {}}
        />
      )}
    </div>
  );
}

// ─── Exported wrapper with Suspense boundary ─────────────
// useSearchParams() requires a Suspense boundary in Next.js App Router
export function JobList() {
  return (
    <Suspense
      fallback={
        <div className="w-full flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-[#22C55E]" />
        </div>
      }
    >
      <JobListInner />
    </Suspense>
  );
}
