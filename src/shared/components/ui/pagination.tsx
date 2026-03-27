"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
}

export function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    className = "",
}: PaginationProps) {
    if (totalPages <= 1) return null;

    const visiblePages = 5;

    const getPageNumbers = () => {
        const pages: (number | "ellipsis")[] = [];

        if (totalPages <= visiblePages + 2) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);

            if (currentPage > 3) {
                pages.push("ellipsis");
            }

            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (currentPage < totalPages - 2) {
                pages.push("ellipsis");
            }

            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <nav
            role="navigation"
            className={`flex items-center justify-center gap-1.5 ${className}`}
        >
            {/* Previous Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className={`p-2 rounded-xl border flex items-center justify-center transition-all ${
                    currentPage === 1
                        ? "border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] text-[#919EAB] dark:text-[#637381] cursor-not-allowed"
                        : "border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] text-[#1C252E] dark:text-white hover:bg-[#22c55e]/10 dark:hover:bg-white/[0.04] hover:text-[#22c55e] dark:hover:border-[#22c55e]/30"
                }`}
            >
                <ChevronLeft className="w-5 h-5" />
            </motion.button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1.5">
                {getPageNumbers().map((page, index) => {
                    if (page === "ellipsis") {
                        return (
                            <div
                                key={`ellipsis-${index}`}
                                className="w-10 h-10 flex items-center justify-center text-[#919EAB]"
                            >
                                <MoreHorizontal className="w-4 h-4" />
                            </div>
                        );
                    }

                    const isActive = page === currentPage;

                    return (
                        <motion.button
                            key={`page-${page}`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onPageChange(page)}
                            className={`w-10 h-10 rounded-xl font-semibold text-sm transition-all focus:outline-none flex items-center justify-center ${
                                isActive
                                    ? "bg-gradient-to-r from-[#22c55e] to-[#10b981] text-white shadow-lg shadow-green-500/20"
                                    : "bg-white dark:bg-[#1C252E] text-[#1C252E] dark:text-[#919EAB] border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] hover:border-[#22c55e]/30 dark:hover:border-[#22c55e]/30 hover:text-[#22c55e]"
                            }`}
                        >
                            {page}
                        </motion.button>
                    );
                })}
            </div>

            {/* Next Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className={`p-2 rounded-xl border flex items-center justify-center transition-all ${
                    currentPage === totalPages
                        ? "border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] text-[#919EAB] dark:text-[#637381] cursor-not-allowed"
                        : "border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] text-[#1C252E] dark:text-white hover:bg-[#22c55e]/10 dark:hover:bg-white/[0.04] hover:text-[#22c55e] dark:hover:border-[#22c55e]/30"
                }`}
            >
                <ChevronRight className="w-5 h-5" />
            </motion.button>
        </nav>
    );
}
