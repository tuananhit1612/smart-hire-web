"use client";

/**
 * ═══════════════════════════════════════════════════════════
 *  JobList — Fetches public jobs from the real backend
 *
 *  Server-side filtering via query params (keyword, city,
 *  jobType, jobLevel). Pagination with prev/next controls.
 * ═══════════════════════════════════════════════════════════
 */

import { useState, useEffect, useCallback, useRef } from "react";
import { Job } from "../types/job";
import { JobCard } from "./job-card";
import { JobFilter } from "./job-filter";
import { jobApi } from "../api/job-api";
import { mapJobResponseToJob } from "../utils/job-mapper";
import { Search, Loader2, ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";
import type { ApiJobType, ApiJobLevel } from "../types/job-api-types";

// ─── Tag → backend enum mappings ─────────────────────────

const TAG_TO_JOB_TYPE: Record<string, ApiJobType> = {
  "Full-time": "FULL_TIME",
  "Part-time": "PART_TIME",
  Remote: "REMOTE",
  Internship: "INTERN",
};

const TAG_TO_JOB_LEVEL: Record<string, ApiJobLevel> = {
  Senior: "SENIOR",
  Junior: "JUNIOR",
  Middle: "MIDDLE",
  Lead: "LEAD",
};

// ─── Constants ──────────────────────────────────────────

const PAGE_SIZE = 12;
const DEBOUNCE_MS = 400;

// ─── Component ──────────────────────────────────────────

export function JobList() {
  // Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [savedJobIds, setSavedJobIds] = useState<Set<string>>(new Set());

  // Data state
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  // Debounce refs
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ─── Fetch ──────────────────────────────────────────

  const fetchJobs = useCallback(
    async (currentPage: number) => {
      setLoading(true);
      setError(null);

      // Extract the first matching jobType / jobLevel from selected tags
      let jobType: ApiJobType | undefined;
      let jobLevel: ApiJobLevel | undefined;

      for (const tag of selectedTags) {
        if (TAG_TO_JOB_TYPE[tag] && !jobType) jobType = TAG_TO_JOB_TYPE[tag];
        if (TAG_TO_JOB_LEVEL[tag] && !jobLevel) jobLevel = TAG_TO_JOB_LEVEL[tag];
      }

      try {
        const res = await jobApi.getPublicJobs({
          page: currentPage,
          size: PAGE_SIZE,
          keyword: searchQuery || undefined,
          city: locationQuery || undefined,
          jobType,
          jobLevel,
        });

        const pageData = res.data.data;
        const mapped = pageData.content.map(mapJobResponseToJob);

        setJobs(mapped);
        setTotalPages(pageData.totalPages);
        setTotalElements(pageData.totalElements);
        setPage(pageData.number);
      } catch {
        setError("Không thể tải danh sách việc làm. Vui lòng thử lại.");
        setJobs([]);
      } finally {
        setLoading(false);
      }
    },
    [searchQuery, locationQuery, selectedTags]
  );

  // ─── Initial + filter-change fetch (debounced) ──────

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchJobs(0);
    }, DEBOUNCE_MS);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, locationQuery, selectedTags]);

  // ─── Tag / filter helpers ────────────────────────────

  const toggleTag = (tag: string) =>
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );

  const resetFilters = () => {
    setSearchQuery("");
    setLocationQuery("");
    setSelectedTags([]);
  };

  const toggleSaveJob = (jobId: string) =>
    setSavedJobIds((prev) => {
      const s = new Set(prev);
      s.has(jobId) ? s.delete(jobId) : s.add(jobId);
      return s;
    });

  // ─── Sort saved to top (client-side only) ─────────

  const displayJobs = [...jobs].sort((a, b) => {
    const aS = savedJobIds.has(a.id);
    const bS = savedJobIds.has(b.id);
    if (aS && !bS) return -1;
    if (!aS && bS) return 1;
    return 0;
  });

  // ─── Render ──────────────────────────────────────────

  return (
    <div className="w-full">
      <JobFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        locationQuery={locationQuery}
        setLocationQuery={setLocationQuery}
        selectedTags={selectedTags}
        toggleTag={toggleTag}
        resetFilters={resetFilters}
      />

      {/* Results Count */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-bold text-[#1C252E] dark:text-white">
          {loading ? "Đang tìm kiếm..." : `${totalElements} công việc phù hợp`}
        </h2>
        {savedJobIds.size > 0 && (
          <p className="text-[13px] text-[#FF5630] font-semibold">
            ❤️ {savedJobIds.size} việc làm đã lưu
          </p>
        )}
      </div>

      {/* Error State */}
      {error && (
        <div className="flex flex-col items-center justify-center py-16 text-center animate-in fade-in duration-300">
          <div className="w-16 h-16 bg-[#FF5630]/10 rounded-2xl flex items-center justify-center mb-4">
            <AlertCircle className="w-8 h-8 text-[#FF5630]" />
          </div>
          <h3 className="text-lg font-bold text-[#1C252E] dark:text-white mb-2">
            Đã xảy ra lỗi
          </h3>
          <p className="text-[14px] text-[#637381] dark:text-[#919EAB] max-w-md mb-4">
            {error}
          </p>
          <button
            onClick={() => fetchJobs(page)}
            className="text-[14px] font-semibold text-[#22C55E] hover:text-[#22C55E]/80 transition-colors"
          >
            Thử lại
          </button>
        </div>
      )}

      {/* Loading State */}
      {loading && !error && (
        <div className="flex flex-col items-center justify-center py-20 animate-in fade-in duration-300">
          <Loader2 className="w-10 h-10 text-[#22C55E] animate-spin mb-4" />
          <p className="text-[14px] text-[#919EAB]">Đang tải việc làm...</p>
        </div>
      )}

      {/* Job Grid */}
      {!loading && !error && displayJobs.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayJobs.map((job, i) => (
              <JobCard
                key={job.id}
                job={job}
                index={i}
                isSaved={savedJobIds.has(job.id)}
                onApply={() => {}}
                onSave={toggleSaveJob}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-10">
              <button
                onClick={() => fetchJobs(page - 1)}
                disabled={page <= 0}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-[14px] font-semibold bg-white dark:bg-[#1C252E] border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] text-[#1C252E] dark:text-white hover:border-[#22C55E]/40 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
              >
                <ChevronLeft className="w-4 h-4" />
                Trước
              </button>

              <span className="text-[14px] font-medium text-[#637381] dark:text-[#919EAB]">
                Trang {page + 1} / {totalPages}
              </span>

              <button
                onClick={() => fetchJobs(page + 1)}
                disabled={page >= totalPages - 1}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-[14px] font-semibold bg-white dark:bg-[#1C252E] border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] text-[#1C252E] dark:text-white hover:border-[#22C55E]/40 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
              >
                Tiếp
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </>
      )}

      {/* Empty State */}
      {!loading && !error && displayJobs.length === 0 && (
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
    </div>
  );
}
