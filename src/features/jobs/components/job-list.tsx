"use client";

import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/shared/components/ui/button";
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

  // Toggle save/unsave job
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

  // Filter and sort logic - saved jobs first
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

    // Sort: saved jobs first, then by posted date
    return filtered.sort((a, b) => {
      const aIsSaved = savedJobIds.has(a.id);
      const bIsSaved = savedJobIds.has(b.id);

      if (aIsSaved && !bIsSaved) return -1;
      if (!aIsSaved && bIsSaved) return 1;

      // If both saved or both not saved, sort by posted date (newest first)
      return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
    });
  }, [searchQuery, locationQuery, selectedTags, savedJobIds]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 pb-20">
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
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
          {filteredAndSortedJobs.length} công việc phù hợp
        </h2>
        {savedJobIds.size > 0 && (
          <p className="text-sm text-red-500 font-medium">
            ❤️ {savedJobIds.size} việc làm đã lưu
          </p>
        )}
      </div>

      {/* Grid */}
      {filteredAndSortedJobs.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredAndSortedJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                isSaved={savedJobIds.has(job.id)}
                onApply={(id) => console.log("Apply", id)}
                onSave={toggleSaveJob}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20 text-center"
        >
          <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
            <Search className="w-10 h-10 text-slate-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">
            Không tìm thấy công việc nào
          </h3>
          <p className="text-slate-500 dark:text-slate-400 max-w-md">
            Thử thay đổi từ khóa tìm kiếm hoặc xóa bớt bộ lọc để xem nhiều kết
            quả hơn.
          </p>
          <Button
            variant="ghost"
            onClick={resetFilters}
            className="mt-4 text-sky-500 hover:text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-900/20"
          >
            Xóa tất cả bộ lọc
          </Button>
        </motion.div>
      )}
    </div>
  );
}
