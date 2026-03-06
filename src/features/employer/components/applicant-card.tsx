// src/features/employer/components/applicant-card.tsx
"use client";

import { EmployerApplicant } from "../types/mock-applicants";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { 
    Brain, 
    CheckCircle2, 
    Clock, 
    XCircle, 
    MoreHorizontal, 
    Mail,
    Phone,
    MapPin,
    FileText
} from "lucide-react";
import { motion } from "framer-motion";
import { ApplicationStage } from "@/shared/types/application";

interface ApplicantCardProps {
    applicant: EmployerApplicant;
    onSelect: (applicant: EmployerApplicant) => void;
}

export function ApplicantCard({ applicant, onSelect }: ApplicantCardProps) {
    // ... (keep score and status config logic)
    const getScoreColor = (score: number) => {
        if (score >= 80) return "text-green-600 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700/40 ring-green-500/20";
        if (score >= 50) return "text-amber-600 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-700/40 ring-amber-500/20";
        return "text-red-600 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700/40 ring-red-500/20";
    };

    const scoreColorClass = getScoreColor(applicant.aiAnalysis.matchScore);

    const getStatusConfig = (status: string) => {
        switch (status) {
            case ApplicationStage.APPLIED:
                return { label: "Mới nộp", color: "bg-blue-100 text-blue-700" };
            case ApplicationStage.SCREENING:
                return { label: "Đang duyệt", color: "bg-purple-100 text-purple-700" };
            case ApplicationStage.INTERVIEW:
                return { label: "Phỏng vấn", color: "bg-amber-100 text-amber-700" };
            case ApplicationStage.OFFER:
                return { label: "Đề nghị", color: "bg-pink-100 text-pink-700" };
            case ApplicationStage.HIRED:
                return { label: "Đã tuyển", color: "bg-green-100 text-green-700" };
            case ApplicationStage.REJECTED:
                return { label: "Từ chối", color: "bg-[rgba(145,158,171,0.15)] dark:bg-white/[0.08] text-[#637381] dark:text-[#919EAB]" };
            default:
                return { label: status, color: "bg-[rgba(145,158,171,0.15)] dark:bg-white/[0.08] text-[#637381] dark:text-[#919EAB]" };
        }
    };

    const statusConfig = getStatusConfig(applicant.status);

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => onSelect(applicant)}
            className="group relative bg-white dark:bg-[#1C252E] rounded-2xl border border-[rgba(145,158,171,0.16)] dark:border-white/[0.08] p-5 hover:shadow-lg hover:border-sky-200 dark:hover:border-sky-700/50 transition-all duration-300 cursor-pointer"
        >
            <div className="flex items-start justify-between mb-4">
                {/* User Info */}
                <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-[rgba(145,158,171,0.1)] dark:bg-white/[0.06] flex items-center justify-center overflow-hidden border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08]">
                        {applicant.avatarUrl ? (
                            <img src={applicant.avatarUrl} alt={applicant.name} className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-lg font-bold text-[#919EAB]">{applicant.name.charAt(0)}</span>
                        )}
                    </div>
                    <div>
                        <h3 className="font-bold text-[#1C252E] dark:text-white group-hover:text-sky-700 transition-colors">
                            {applicant.name}
                        </h3>
                        <p className="text-sm text-[#637381] dark:text-[#919EAB] font-medium">
                            {applicant.currentTitle}
                        </p>
                        <p className="text-xs text-[#919EAB] mt-1">
                            {applicant.experienceYears} năm kinh nghiệm
                        </p>
                    </div>
                </div>

                {/* AI Score Badge */}
                <div className={`flex flex-col items-center justify-center w-14 h-14 rounded-2xl border-2 ${scoreColorClass} shadow-sm`}>
                    <Brain className="w-4 h-4 opacity-80 mb-0.5" />
                    <span className="text-sm font-bold">{applicant.aiAnalysis.matchScore}%</span>
                </div>
            </div>

            {/* AI Summary */}
            <div className="mb-4 bg-[rgba(145,158,171,0.06)] dark:bg-white/[0.04] rounded-xl p-3 border border-[rgba(145,158,171,0.1)] dark:border-white/[0.06]">
                <p className="text-xs text-[#637381] dark:text-[#919EAB] line-clamp-2 italic">
                    <span className="font-semibold text-sky-600 not-italic mr-1">AI nhận xét:</span>
                    "{applicant.aiAnalysis.summary}"
                </p>
            </div>

            {/* Tags / Skills */}
            <div className="flex flex-wrap gap-2 mb-4">
                {applicant.skills.slice(0, 3).map(skill => (
                    <span key={skill} className="px-2 py-1 bg-[rgba(145,158,171,0.1)] dark:bg-white/[0.06] text-[#637381] dark:text-[#919EAB] text-xs rounded-md font-medium">
                        {skill}
                    </span>
                ))}
                {applicant.skills.length > 3 && (
                    <span className="px-2 py-1 bg-[rgba(145,158,171,0.06)] dark:bg-white/[0.03] text-[#919EAB] text-xs rounded-md">
                        +{applicant.skills.length - 3}
                    </span>
                )}
            </div>

            <hr className="border-[rgba(145,158,171,0.12)] dark:border-white/[0.06] mb-4" />

            {/* Footer Actions */}
            <div className="flex items-center justify-between">
                <Badge className={`${statusConfig.color} border-0 px-2.5 py-0.5 pointer-events-none`}>
                    {statusConfig.label}
                </Badge>
                
                <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-[#919EAB] hover:text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-900/20">
                        <Mail className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-[#919EAB] hover:text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-900/20">
                        <FileText className="w-4 h-4" />
                    </Button>
                    <Button 
                        size="sm" 
                        onClick={(e) => {
                            e.stopPropagation();
                            onSelect(applicant);
                        }}
                        className="rounded-full bg-sky-50 dark:bg-sky-900/20 text-sky-600 hover:bg-sky-100 dark:hover:bg-sky-900/30 border border-sky-200 dark:border-sky-700/40 h-8 text-xs font-semibold px-4">
                        Chi tiết
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}
