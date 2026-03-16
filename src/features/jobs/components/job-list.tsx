"use client";

import { useState, useMemo } from "react";
import { Job } from "../types/job";
import { mockJobs } from "../types/mock-jobs";
import { JobCard } from "./job-card";
import { JobFilter } from "./job-filter";
import { Search } from "lucide-react";

export function JobList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [savedJobIds, setSavedJobIds] = useState<Set<string>>(new Set());

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const resetFilters = () => {
    setSearchQuery("");
    setLocationQuery("");
    setSelectedTags([]);
  };

  const toggleSaveJob = (jobId: string) => {
    setSavedJobIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(jobId)) {
        newSet.delete(jobId);
      } else {
        newSet.add(jobId);
      }
      return newSet;
    });
  };

  const filteredAndSortedJobs = useMemo(() => {
    const filtered = mockJobs.filter((job) => {
      const matchSearch =
        searchQuery === "" ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.skills.some((skill) =>
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchLocation =
        locationQuery === "" ||
        job.location.toLowerCase().includes(locationQuery.toLowerCase());

      const matchTags =
        selectedTags.length === 0 ||
        selectedTags.every(
          (tag) =>
            job.type === tag ||
            job.level === tag ||
            (tag === "Remote" && job.type === "Remote")
        );

      return matchSearch && matchLocation && matchTags;
    });

    return filtered.sort((a, b) => {
      const aIsSaved = savedJobIds.has(a.id);
      const bIsSaved = savedJobIds.has(b.id);
      if (aIsSaved && !bIsSaved) return -1;
      if (!aIsSaved && bIsSaved) return 1;
      return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
    });
  }, [searchQuery, locationQuery, selectedTags, savedJobIds]);

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
          {filteredAndSortedJobs.length} công việc phù hợp
        </h2>
        {savedJobIds.size > 0 && (
          <p className="text-[13px] text-[#FF5630] font-semibold">
            ❤️ {savedJobIds.size} việc làm đã lưu
          </p>
        )}
      </div>

      {/* Grid */}
      {filteredAndSortedJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedJobs.map((job, i) => (
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
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-300">
          <div className="w-20 h-20 bg-[rgba(145,158,171,0.04)] dark:bg-[rgba(145,158,171,0.08)] rounded-2xl flex items-center justify-center mb-4">
            <Search className="w-9 h-9 text-[#919EAB]" />
          </div>
          <h3 className="text-xl font-bold text-[#1C252E] dark:text-white mb-2">
            Không tìm thấy công việc nào
          </h3>
          <p className="text-[14px] text-[#637381] dark:text-[#919EAB] max-w-md">
            Thử thay đổi từ khóa tìm kiếm hoặc xóa bớt bộ lọc để xem nhiều kết quả hơn.
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
