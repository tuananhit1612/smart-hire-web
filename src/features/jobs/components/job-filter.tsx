"use client";

import { Search, MapPin, X } from "lucide-react";

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
    <div className="w-full mb-8">
      <div className="bg-white dark:bg-[#1C252E] border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] rounded-2xl p-4 md:p-6 hover:border-[rgba(145,158,171,0.32)] dark:hover:border-white/[0.12] transition-all duration-300">
        <div className="flex flex-col gap-4">
          {/* Inputs Row */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1 group">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#919EAB] group-focus-within:text-[#22C55E] transition-colors duration-200" />
              <input
                placeholder="Tìm công việc, kỹ năng, công ty..."
                className="w-full h-12 pl-11 pr-4 rounded-xl border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] bg-white dark:bg-[#1C252E] text-[15px] text-[#1C252E] dark:text-white placeholder-[#919EAB] focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/20 outline-none transition-all duration-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="relative flex-1 md:max-w-xs group">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#919EAB] group-focus-within:text-[#22C55E] transition-colors duration-200" />
              <input
                placeholder="Địa điểm (TP.HCM, Hà Nội...)"
                className="w-full h-12 pl-11 pr-4 rounded-xl border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] bg-white dark:bg-[#1C252E] text-[15px] text-[#1C252E] dark:text-white placeholder-[#919EAB] focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/20 outline-none transition-all duration-200"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
              />
            </div>
            <button
              onClick={resetFilters}
              className="h-12 px-6 rounded-xl bg-[#1C252E] dark:bg-white text-white dark:text-[#1C252E] text-[14px] font-bold hover:bg-[#1C252E]/90 dark:hover:bg-white/90 active:scale-[0.97] transition-all duration-200"
            >
              Tìm Kiếm
            </button>
          </div>

          {/* Chips Row */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            <span className="text-[13px] font-semibold text-[#919EAB] whitespace-nowrap mr-1">
              Lọc nhanh:
            </span>
            {FILTER_TAGS.map((tag) => {
              const isActive = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-medium whitespace-nowrap transition-all duration-200 ${isActive
                      ? "bg-[#22C55E] text-white shadow-md shadow-[#22C55E]/25"
                      : "bg-[rgba(145,158,171,0.04)] dark:bg-[rgba(145,158,171,0.08)] text-[#637381] dark:text-[#C4CDD5] border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] hover:border-[#22C55E]/30 hover:text-[#22C55E]"
                    }`}
                >
                  {tag}
                  {isActive && <X className="w-3 h-3" />}
                </button>
              );
            })}
            {(searchQuery || locationQuery || selectedTags.length > 0) && (
              <button
                onClick={resetFilters}
                className="text-[12px] text-[#FF5630] hover:text-[#FF5630]/80 font-medium ml-auto px-2 hover:underline whitespace-nowrap"
              >
                Xóa bộ lọc
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
