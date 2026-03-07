"use client";

import { useMemo, useState, useEffect } from "react";
import { mockEmployerApplicants, EmployerApplicant } from "@/features/employer/types/mock-applicants";
import { ApplicantList } from "@/features/employer/components/applicant-list";
import { ApplicantsFilter } from "@/features/employer/components/applicants-filter";
import { ApplicantDrawer } from "@/features/employer/components/applicant-drawer";
import { Button } from "@/shared/components/ui/button";
import { ArrowLeft, Users, Sparkles } from "lucide-react";
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

    const filteredApplicants = useMemo(() => {
        let result = [...mockEmployerApplicants];

        // 1. Filter
        if (searchQuery) {
            const lowerQuery = searchQuery.toLowerCase();
            result = result.filter(app =>
                app.name.toLowerCase().includes(lowerQuery) ||
                app.skills.some(skill => skill.toLowerCase().includes(lowerQuery))
            );
        }

        // 2. Sort
        result.sort((a, b) => {
            if (sortBy === "score-desc") {
                return b.aiAnalysis.matchScore - a.aiAnalysis.matchScore;
            }
            if (sortBy === "score-asc") {
                return a.aiAnalysis.matchScore - b.aiAnalysis.matchScore;
            }
            if (sortBy === "date-desc") {
                return new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime();
            }
            return 0;
        });

        return result;
    }, [searchQuery, sortBy]);

    return (
        <div className="w-full bg-[#F4F6F8] dark:bg-[#141A21] pt-6 pb-12">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Header */}
                <div className="mb-8">
                    <Link href="/employer/dashboard" className="inline-flex items-center text-sm text-slate-500 hover:text-sky-600 mb-4 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Quay lại Dashboard
                    </Link>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-[#1C252E] dark:text-white mb-1">
                                Danh sách ứng viên
                            </h1>
                            <p className="text-[#637381] dark:text-[#919EAB] text-lg flex items-center gap-2">
                                <span className="font-medium text-sky-700 dark:text-sky-400">{jobTitle}</span>
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
                            className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-2xl p-0.5 shadow-lg shadow-blue-500/20"
                        >
                            <div className="bg-white/95 dark:bg-[#1C252E] backdrop-blur-sm rounded-[14px] px-4 py-3 flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-[#919EAB] uppercase tracking-wider">Top Match</p>
                                    <p className="text-lg font-bold text-[#1C252E] dark:text-white">
                                        {Math.max(...mockEmployerApplicants.map(a => a.aiAnalysis.matchScore))}%
                                    </p>
                                </div>
                                <div className="w-px h-8 bg-[rgba(145,158,171,0.15)] dark:bg-white/[0.08]" />
                                <div>
                                    <p className="text-xs font-semibold text-[#919EAB] uppercase tracking-wider">Trung bình</p>
                                    <p className="text-lg font-bold text-[#1C252E] dark:text-white">
                                        {Math.round(mockEmployerApplicants.reduce((acc, curr) => acc + curr.aiAnalysis.matchScore, 0) / mockEmployerApplicants.length)}%
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
                <ApplicantList
                    applicants={filteredApplicants}
                    onSelectApplicant={handleSelectApplicant}
                />

                {/* Detail Drawer */}
                <ApplicantDrawer
                    applicant={selectedApplicant}
                    isOpen={isDrawerOpen}
                    onClose={handleCloseDrawer}
                />
            </div>
        </div>
    );
}
