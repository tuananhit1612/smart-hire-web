"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/shared/components/ui/button";
import { Job } from "../types/job";
import { mockJobs } from "../types/mock-jobs";
import { JobCard } from "./job-card";
import { JobFilter } from "./job-filter";

export function JobList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

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

  // Filter logic
  const filteredJobs = mockJobs.filter((job) => {
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
          job.location === tag // Allowing remote to be filtered by tag if needed (simple check)
          || (tag === 'Remote' && job.type === 'Remote') // Explicit handle
      );

    return matchSearch && matchLocation && matchTags;
  });

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
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
            {filteredJobs.length} công việc phù hợp
        </h2>
      </div>

      {/* Grid */}
      {filteredJobs.length > 0 ? (
        <motion.div 
            layout 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onApply={(id) => console.log("Apply", id)}
                onSave={(id) => console.log("Save", id)}
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
                Thử thay đổi từ khóa tìm kiếm hoặc xóa bớt bộ lọc để xem nhiều kết quả hơn.
            </p>
            <Button variant="ghost" onClick={resetFilters} className="mt-4 text-sky-500 hover:text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-900/20">
                Xóa tất cả bộ lọc
            </Button>
        </motion.div>
      )}
    </div>
  );
}

// Helper icon import for empty state
import { Search } from "lucide-react";
