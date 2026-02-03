"use client";

import { Search, MapPin, X } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Badge } from "@/shared/components/ui/badge";
import { motion } from "framer-motion";

interface JobFilterProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  locationQuery: string;
  setLocationQuery: (val: string) => void;
  selectedTags: string[];
  toggleTag: (tag: string) => void;
  resetFilters: () => void;
}

const FILTER_TAGS = [
  "Full-time",
  "Part-time",
  "Remote",
  "Internship",
  "Senior",
  "Junior",
  "Middle",
  "Lead",
];

export function JobFilter({
  searchQuery,
  setSearchQuery,
  locationQuery,
  setLocationQuery,
  selectedTags,
  toggleTag,
  resetFilters,
}: JobFilterProps) {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full mb-8"
    >
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-slate-800 shadow-xl shadow-sky-900/5 rounded-3xl p-4 md:p-6 mx-auto max-w-5xl">
        <div className="flex flex-col gap-4">
          {/* Inputs Row */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-sky-500 transition-colors" />
              <Input
                placeholder="Tìm công việc, kỹ năng, công ty..."
                className="pl-10 h-12 rounded-2xl border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-800 transition-all focus:ring-2 focus:ring-sky-500/20 text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="relative flex-1 md:max-w-xs group">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-sky-500 transition-colors" />
              <Input
                placeholder="Địa điểm (TP.HCM, Hà Nội...)"
                className="pl-10 h-12 rounded-2xl border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-800 transition-all focus:ring-2 focus:ring-sky-500/20 text-base"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
              />
            </div>
            <Button 
                onClick={resetFilters}
                className="h-12 px-6 rounded-2xl bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 shadow-lg hover:scale-105 transition-all"
            >
                Tìm Kiếm
            </Button>
          </div>

          {/* Chips Row */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
            <span className="text-sm font-semibold text-slate-500 whitespace-nowrap mr-1">Lọc nhanh:</span>
            {FILTER_TAGS.map((tag) => {
              const isActive = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`
                    flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap
                    ${
                      isActive
                        ? "bg-sky-500 text-white shadow-md shadow-sky-500/25 scale-105"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                    }
                  `}
                >
                  {tag}
                  {isActive && <X className="w-3 h-3" />}
                </button>
              );
            })}
             {(searchQuery || locationQuery || selectedTags.length > 0) && (
                <button 
                    onClick={resetFilters}
                    className="text-xs text-red-500 hover:text-red-600 font-medium ml-auto px-2 hover:underline whitespace-nowrap"
                >
                    Xóa bộ lọc
                </button>
             )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
