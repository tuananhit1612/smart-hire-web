"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface JobPaginationProps {
  currentPage: number; // 1-based
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export function JobPagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}: JobPaginationProps) {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  // Build page numbers with ellipsis
  const getPageNumbers = (): (number | "...")[] => {
    const pages: (number | "...")[] = [];
    const delta = 1; // pages around current

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    // Always show first page
    pages.push(1);

    const rangeStart = Math.max(2, currentPage - delta);
    const rangeEnd = Math.min(totalPages - 1, currentPage + delta);

    if (rangeStart > 2) pages.push("...");

    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }

    if (rangeEnd < totalPages - 1) pages.push("...");

    // Always show last page
    pages.push(totalPages);

    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10">
      {/* Info */}
      <span className="text-[13px] text-[#919EAB] order-2 sm:order-1">
        Hiển thị{" "}
        <span className="font-semibold text-[#1C252E] dark:text-white">
          {startItem}–{endItem}
        </span>{" "}
        trên{" "}
        <span className="font-semibold text-[#1C252E] dark:text-white">
          {totalItems}
        </span>{" "}
        kết quả
      </span>

      {/* Page buttons */}
      <div className="flex items-center gap-1.5 order-1 sm:order-2">
        {/* Prev */}
        <button
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="flex items-center justify-center w-9 h-9 rounded-lg border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] text-[#637381] dark:text-[#C4CDD5] hover:border-[#22C55E] hover:text-[#22C55E] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-[rgba(145,158,171,0.12)] disabled:hover:text-[#637381] transition-all duration-200"
          aria-label="Trang trước"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {getPageNumbers().map((p, i) =>
          p === "..." ? (
            <span
              key={`ellipsis-${i}`}
              className="w-9 h-9 flex items-center justify-center text-[13px] text-[#919EAB]"
            >
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`w-9 h-9 rounded-lg text-[13px] font-semibold transition-all duration-200 ${
                p === currentPage
                  ? "bg-[#22C55E] text-white shadow-md shadow-[#22C55E]/25"
                  : "text-[#637381] dark:text-[#C4CDD5] hover:bg-[rgba(145,158,171,0.08)] dark:hover:bg-white/[0.04]"
              }`}
            >
              {p}
            </button>
          )
        )}

        {/* Next */}
        <button
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="flex items-center justify-center w-9 h-9 rounded-lg border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] text-[#637381] dark:text-[#C4CDD5] hover:border-[#22C55E] hover:text-[#22C55E] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-[rgba(145,158,171,0.12)] disabled:hover:text-[#637381] transition-all duration-200"
          aria-label="Trang sau"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
