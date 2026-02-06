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
}

export function ApplicantCard({ applicant }: ApplicantCardProps) {
    // Determine Score Color
    const getScoreColor = (score: number) => {
        if (score >= 80) return "text-green-600 bg-green-50 border-green-200 ring-green-500/20";
        if (score >= 50) return "text-amber-600 bg-amber-50 border-amber-200 ring-amber-500/20";
        return "text-red-600 bg-red-50 border-red-200 ring-red-500/20";
    };

    const scoreColorClass = getScoreColor(applicant.aiAnalysis.matchScore);

    // Status Badge Configuration
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
                return { label: "Từ chối", color: "bg-slate-100 text-slate-500" };
            default:
                return { label: status, color: "bg-slate-100 text-slate-700" };
        }
    };

    const statusConfig = getStatusConfig(applicant.status);

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-lg hover:border-sky-200 transition-all duration-300"
        >
            <div className="flex items-start justify-between mb-4">
                {/* User Info */}
                <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-100">
                        {applicant.avatarUrl ? (
                            <img src={applicant.avatarUrl} alt={applicant.name} className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-lg font-bold text-slate-400">{applicant.name.charAt(0)}</span>
                        )}
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                            {applicant.name}
                        </h3>
                        <p className="text-sm text-slate-500 font-medium">
                            {applicant.currentTitle}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
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
            <div className="mb-4 bg-slate-50 rounded-xl p-3 border border-slate-100">
                <p className="text-xs text-slate-600 line-clamp-2 italic">
                    <span className="font-semibold text-sky-600 not-italic mr-1">AI nhận xét:</span>
                    "{applicant.aiAnalysis.summary}"
                </p>
            </div>

            {/* Tags / Skills */}
            <div className="flex flex-wrap gap-2 mb-4">
                {applicant.skills.slice(0, 3).map(skill => (
                    <span key={skill} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md font-medium">
                        {skill}
                    </span>
                ))}
                {applicant.skills.length > 3 && (
                    <span className="px-2 py-1 bg-slate-50 text-slate-400 text-xs rounded-md">
                        +{applicant.skills.length - 3}
                    </span>
                )}
            </div>

            <hr className="border-slate-100 mb-4" />

            {/* Footer Actions */}
            <div className="flex items-center justify-between">
                <Badge className={`${statusConfig.color} border-0 px-2.5 py-0.5 pointer-events-none`}>
                    {statusConfig.label}
                </Badge>
                
                <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-slate-400 hover:text-sky-600 hover:bg-sky-50">
                        <Mail className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-slate-400 hover:text-sky-600 hover:bg-sky-50">
                        <FileText className="w-4 h-4" />
                    </Button>
                    <Button size="sm" className="rounded-full bg-sky-50 text-sky-600 hover:bg-sky-100 border border-sky-200 h-8 text-xs font-semibold px-4">
                        Chi tiết
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}
