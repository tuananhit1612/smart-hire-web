"use client";

import { useState, useEffect } from "react";
import { PageSection } from "@/shared/components/layout/page-section";
import { ApplicantsFilter } from "@/features/employer/components/applicants-filter";
import { ApplicantList } from "@/features/employer/components/applicant-list";
import { ApplicantDrawer } from "@/features/employer/components/applicant-drawer";
import { useApplicants } from "@/features/employer/hooks/use-applicants";
import { hrJobApi } from "@/features/hr-jobs/api/hr-job-api";
import { HrJobResponse } from "@/features/hr-jobs/types/hr-job-api-types";
import { EmployerApplicant } from "@/features/employer/types/mock-applicants";
// Icons
import { Briefcase, Loader2 } from "lucide-react";

export default function EmployerCandidatesPage() {
    const [selectedJobId, setSelectedJobId] = useState<string>("ALL");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState<"score-desc" | "score-asc" | "date-desc">("score-desc");
    
    // API
    const [jobs, setJobs] = useState<HrJobResponse[]>([]);
    const [isLoadingJobs, setIsLoadingJobs] = useState(true);

    const { applicants, isLoading: isLoadingApplicants, refetch } = useApplicants(selectedJobId, {
        search: searchQuery,
        sortBy
    });

    const [selectedApplicant, setSelectedApplicant] = useState<EmployerApplicant | null>(null);

    useEffect(() => {
        hrJobApi.getMyJobs()
            .then(data => setJobs(data))
            .finally(() => setIsLoadingJobs(false));
    }, []);

    return (
        <PageSection>
            <div>
                <h1 className="text-3xl font-bold text-[#1C252E] dark:text-white mb-2">
                    Hồ sơ ứng viên
                </h1>
                <p className="text-[#637381] dark:text-[#919EAB]">
                    Quản lý và xét duyệt hồ sơ ứng tuyển từ các chiến dịch.
                </p>
            </div>
            <div className="flex flex-col lg:flex-row gap-6 mt-6">
                {/* Sidebar - Jobs List */}
                <div className="w-full lg:w-72 shrink-0">
                    <div className="bg-white dark:bg-[#1C252E] rounded-2xl border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] shadow-sm overflow-hidden sticky top-20">
                        <div className="p-4 border-b border-[rgba(145,158,171,0.12)] dark:border-white/[0.08]">
                            <h3 className="font-semibold text-[#1C252E] dark:text-white flex items-center gap-2">
                                <Briefcase className="w-4 h-4 text-[#22c55e]" />
                                Tin tuyển dụng
                            </h3>
                        </div>
                        
                        {isLoadingJobs ? (
                            <div className="p-8 flex justify-center text-[#919EAB]">
                                <Loader2 className="w-6 h-6 animate-spin" />
                            </div>
                        ) : (
                            <div className="max-h-[calc(100vh-250px)] overflow-y-auto w-full p-2 space-y-1">
                                <button
                                    onClick={() => setSelectedJobId("ALL")}
                                    className={`w-full text-left px-3 py-2.5 rounded-xl transition-colors text-sm font-medium ${
                                        selectedJobId === "ALL" 
                                            ? "bg-[#22c55e]/10 text-[#22c55e] dark:bg-[#22c55e]/20" 
                                            : "text-[#637381] dark:text-[#919EAB] hover:bg-[rgba(145,158,171,0.08)] dark:hover:bg-white/[0.04]"
                                    }`}
                                >
                                    Tất cả chiến dịch
                                </button>
                                {jobs.map(job => (
                                    <button
                                        key={job.id}
                                        onClick={() => setSelectedJobId(String(job.id))}
                                        className={`w-full text-left p-3 rounded-xl transition-colors border ${
                                            selectedJobId === String(job.id)
                                                ? "bg-[#22c55e]/10 dark:bg-[#22c55e]/20 border-[#22c55e]/30" 
                                                : "border-transparent hover:bg-[rgba(145,158,171,0.08)] dark:hover:bg-white/[0.04]"
                                        }`}
                                    >
                                        <p className={`text-sm font-medium line-clamp-2 ${selectedJobId === String(job.id) ? "text-[#22c55e]" : "text-[#1C252E] dark:text-white"}`}>
                                            {job.title}
                                        </p>
                                        <div className="flex items-center gap-2 mt-1.5 opacity-80">
                                            <span className={`w-1.5 h-1.5 rounded-full ${job.status === "OPEN" ? "bg-[#22c55e]" : "bg-slate-400"}`} />
                                            <span className="text-[11px] text-[#637381] dark:text-[#919EAB]">
                                                {job.location}
                                            </span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 min-w-0">
                    <ApplicantsFilter 
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                        sortBy={sortBy}
                        onSortChange={setSortBy}
                    />
                    
                    {isLoadingApplicants ? (
                        <div className="flex justify-center py-20">
                            <Loader2 className="w-8 h-8 animate-spin text-[#919EAB]" />
                        </div>
                    ) : (
                        <ApplicantList 
                            applicants={applicants}
                            onSelectApplicant={setSelectedApplicant}
                        />
                    )}
                </div>
            </div>

            {/* Applicant Details Drawer */}
            <ApplicantDrawer 
                applicant={selectedApplicant}
                isOpen={!!selectedApplicant}
                onClose={() => setSelectedApplicant(null)}
                jobId={String(selectedApplicant?.jobId ?? selectedJobId)}
                onApplicantUpdated={refetch}
            />
        </PageSection>
    );
}
