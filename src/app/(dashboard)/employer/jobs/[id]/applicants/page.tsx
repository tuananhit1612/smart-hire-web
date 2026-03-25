"use client";

import { useState } from "react";
import type { EmployerApplicant } from "@/features/employer/types/mock-applicants";
import { useApplicants } from "@/features/employer/hooks/use-applicants";
import { ApplicantList } from "@/features/employer/components/applicant-list";
import { ApplicantsFilter } from "@/features/employer/components/applicants-filter";
import { ApplicantDrawer } from "@/features/employer/components/applicant-drawer";
import { ArrowLeft, Users, Sparkles, Loader2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function EmployerApplicantsPage({ params }: { params: { id: string } }) {
    // In real app, we fetch job details using params.id
    // For now, we simulate a job title
    const jobTitle = "Senior Frontend Developer";

    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState<"score-desc" | "score-asc" | "date-desc">("score-desc");
    const [selectedApplicant, setSelectedApplicant] = useState<EmployerApplicant | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Auto-open drawer based on URL is a bit complex without useSearchParams, doing local state for now
    const handleSelectApplicant = (applicant: EmployerApplicant) => {
        setSelectedApplicant(applicant);
        setIsDrawerOpen(true);
    };

    const handleCloseDrawer = () => {
        setIsDrawerOpen(false);
        // Delay clearing selected applicant to allow close animation to finish
        setTimeout(() => setSelectedApplicant(null), 300);
    };

    const { applicants: filteredApplicants, isLoading, refetch } = useApplicants(
        params.id,
        { search: searchQuery, sortBy }
    );

    return (
        <div className="w-full bg-[#F4F6F8] dark:bg-[#141A21] pt-6 pb-12">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Header */}
                <div className="mb-8">
                    <Link href="/employer/dashboard" className="inline-flex items-center text-sm text-slate-500 hover:text-[#22c55e] mb-4 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Quay lại Dashboard
                    </Link>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-[#1C252E] dark:text-white mb-1">
                                Danh sách ứng viên
                            </h1>
                            <p className="text-[#637381] dark:text-[#919EAB] text-lg flex items-center gap-2">
                                <span className="font-medium text-[#22c55e] dark:text-[#22c55e]">{jobTitle}</span>
                                <span className="w-1 h-1 rounded-full bg-[rgba(145,158,171,0.3)]" />
                                <span className="text-sm flex items-center gap-1">
                                    <Users className="w-4 h-4" /> {filteredApplicants.length} hồ sơ
                                </span>
                            </p>
                        </div>

                        {/* AI Stats Summary Card (Optional/Could) */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-gradient-to-r from-[#22c55e] to-[#10b981] rounded-2xl p-0.5 shadow-lg shadow-[#22c55e]/20"
                        >
                            <div className="bg-white/95 dark:bg-[#1C252E] backdrop-blur-sm rounded-[14px] px-4 py-3 flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-[#22c55e]/10 dark:bg-[#22c55e]/20 flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 text-[#22c55e] dark:text-[#22c55e]" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-[#919EAB] uppercase tracking-wider">Top Match</p>
                                    <p className="text-lg font-bold text-[#1C252E] dark:text-white">
                                        {filteredApplicants.length > 0 ? Math.max(...filteredApplicants.map(a => a.aiAnalysis.matchScore)) : 0}%
                                    </p>
                                </div>
                                <div className="w-px h-8 bg-[rgba(145,158,171,0.15)] dark:bg-white/[0.08]" />
                                <div>
                                    <p className="text-xs font-semibold text-[#919EAB] uppercase tracking-wider">Trung bình</p>
                                    <p className="text-lg font-bold text-[#1C252E] dark:text-white">
                                        {filteredApplicants.length > 0 ? Math.round(filteredApplicants.reduce((acc, curr) => acc + curr.aiAnalysis.matchScore, 0) / filteredApplicants.length) : 0}%
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Filter Bar */}
                <ApplicantsFilter
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    sortBy={sortBy}
                    onSortChange={setSortBy}
                />

                {/* List */}
                {isLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-[#22c55e]" />
                        <span className="ml-3 text-[#637381] dark:text-[#919EAB]">Đang tải danh sách ứng viên...</span>
                    </div>
                ) : (
                    <ApplicantList
                        applicants={filteredApplicants}
                        onSelectApplicant={handleSelectApplicant}
                    />
                )}

                {/* Detail Drawer */}
                <ApplicantDrawer
                    applicant={selectedApplicant}
                    isOpen={isDrawerOpen}
                    onClose={handleCloseDrawer}
                    jobId={params.id}
                    onApplicantUpdated={refetch}
                />
            </div>
        </div>
    );
}
