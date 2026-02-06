// src/features/employer/components/applicant-drawer.tsx
"use client";

import { EmployerApplicant } from "../types/mock-applicants";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { 
    X, 
    Mail, 
    Phone, 
    FileText, 
    Calendar,
    CheckCircle2,
    XCircle,
    Send,
    MessageSquare,
    Brain,
    ThumbsUp,
    AlertTriangle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ApplicationStage } from "@/shared/types/application";
import { cn } from "@/shared/utils/cn"; // Assuming utility exists, otherwise will import from wherever

interface ApplicantDrawerProps {
    applicant: EmployerApplicant | null;
    isOpen: boolean;
    onClose: () => void;
}

export function ApplicantDrawer({ applicant, isOpen, onClose }: ApplicantDrawerProps) {
    const [activeTab, setActiveTab] = useState<"overview" | "notes">("overview");

    if (!applicant) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-y-0 right-0 w-full sm:w-[500px] lg:w-[600px] bg-white shadow-2xl z-50 flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-white z-10 sticky top-0">
                            <div className="flex gap-4">
                                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-100 shrink-0">
                                    {applicant.avatarUrl ? (
                                        <img src={applicant.avatarUrl} alt={applicant.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-2xl font-bold text-slate-400">{applicant.name.charAt(0)}</span>
                                    )}
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">{applicant.name}</h2>
                                    <p className="text-slate-500">{applicant.currentTitle} • {applicant.experienceYears} năm KN</p>
                                    <div className="flex items-center gap-3 mt-2 text-sm text-slate-500">
                                        <div className="flex items-center gap-1">
                                            <Mail className="w-3.5 h-3.5" />
                                            {applicant.email}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Phone className="w-3.5 h-3.5" />
                                            {applicant.phone}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
                                <X className="w-5 h-5 text-slate-400" />
                            </Button>
                        </div>

                        {/* Tabs */}
                        <div className="flex border-b border-slate-100 px-6">
                            <button
                                onClick={() => setActiveTab("overview")}
                                className={cn(
                                    "px-4 py-3 text-sm font-medium border-b-2 transition-colors",
                                    activeTab === "overview" 
                                        ? "border-sky-500 text-sky-700" 
                                        : "border-transparent text-slate-500 hover:text-slate-700"
                                )}
                            >
                                Tổng quan & AI
                            </button>
                            <button
                                onClick={() => setActiveTab("notes")}
                                className={cn(
                                    "px-4 py-3 text-sm font-medium border-b-2 transition-colors",
                                    activeTab === "notes" 
                                        ? "border-sky-500 text-sky-700" 
                                        : "border-transparent text-slate-500 hover:text-slate-700"
                                )}
                            >
                                Ghi chú ({applicant.notes.length})
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
                            {activeTab === "overview" && (
                                <div className="space-y-6">
                                    {/* AI Match Score */}
                                    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                                        <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                            <Brain className="w-5 h-5 text-purple-500" />
                                            Phân tích AI
                                        </h3>
                                        
                                        <div className="flex items-center gap-6 mb-6">
                                            <div className="relative w-24 h-24 shrink-0">
                                                <svg className="w-full h-full transform -rotate-90">
                                                    <circle
                                                        cx="48"
                                                        cy="48"
                                                        r="40"
                                                        fill="transparent"
                                                        stroke="#e2e8f0"
                                                        strokeWidth="8"
                                                    />
                                                    <circle
                                                        cx="48"
                                                        cy="48"
                                                        r="40"
                                                        fill="transparent"
                                                        stroke={applicant.aiAnalysis.matchScore >= 80 ? "#22c55e" : applicant.aiAnalysis.matchScore >= 50 ? "#f59e0b" : "#ef4444"}
                                                        strokeWidth="8"
                                                        strokeDasharray={`${2 * Math.PI * 40}`}
                                                        strokeDashoffset={`${2 * Math.PI * 40 * (1 - applicant.aiAnalysis.matchScore / 100)}`}
                                                        strokeLinecap="round"
                                                    />
                                                </svg>
                                                <div className="absolute inset-0 flex items-center justify-center flex-col">
                                                    <span className="text-2xl font-bold text-slate-900">{applicant.aiAnalysis.matchScore}%</span>
                                                    <span className="text-[10px] text-slate-400 uppercase font-bold">Match</span>
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm text-slate-600 italic border-l-2 border-purple-200 pl-3">
                                                   "{applicant.aiAnalysis.summary}"
                                                </p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <div className="text-sm font-medium text-green-700 flex items-center gap-1.5">
                                                    <ThumbsUp className="w-4 h-4" /> Điểm mạnh
                                                </div>
                                                <ul className="space-y-1">
                                                    {applicant.aiAnalysis.strengths.map((str, i) => (
                                                        <li key={i} className="text-sm text-slate-600 pl-2 border-l border-green-200">{str}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="text-sm font-medium text-amber-600 flex items-center gap-1.5">
                                                    <AlertTriangle className="w-4 h-4" /> Điểm cần cải thiện
                                                </div>
                                                <ul className="space-y-1">
                                                    {applicant.aiAnalysis.gaps.map((gap, i) => (
                                                        <li key={i} className="text-sm text-slate-600 pl-2 border-l border-amber-200">{gap}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Skills */}
                                    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                                        <h3 className="font-semibold text-slate-900 mb-3">Kỹ năng</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {applicant.skills.map(skill => (
                                                <Badge key={skill} variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-200">
                                                    {skill}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Recent Activity */}
                                    <div>
                                        <h3 className="font-semibold text-slate-900 mb-3 ml-1">Hoạt động gần đây</h3>
                                        <div className="space-y-4 border-l-2 border-slate-200 ml-3 pl-6 py-2">
                                            {applicant.activities?.map((act) => (
                                                <div key={act.id} className="relative">
                                                    <div className="absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full bg-slate-300 border-2 border-white" />
                                                    <p className="text-sm font-medium text-slate-900">{act.action}</p>
                                                    <p className="text-xs text-slate-500">{new Date(act.timestamp).toLocaleString('vi-VN')}</p>
                                                </div>
                                            ))}
                                            <div className="relative">
                                                <div className="absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full bg-sky-500 border-2 border-white ring-2 ring-sky-100" />
                                                <p className="text-sm font-medium text-sky-700">Hiện tại: {applicant.status}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === "notes" && (
                                <div className="space-y-4">
                                    {/* Add Note Input */}
                                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                        <textarea 
                                            placeholder="Thêm ghi chú nội bộ..." 
                                            className="w-full text-sm resize-none border-0 focus:ring-0 p-0 placeholder:text-slate-400 min-h-[80px]"
                                        />
                                        <div className="flex justify-end mt-2 pt-2 border-t border-slate-100">
                                            <Button size="sm" className="h-8 bg-sky-600 hover:bg-sky-700 text-white rounded-full">
                                                <Send className="w-3.5 h-3.5 mr-1" /> Lưu
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Notes List */}
                                    {applicant.notes.length > 0 ? (
                                        applicant.notes.map(note => (
                                            <div key={note.id} className="bg-white p-4 rounded-xl border border-slate-200 flex gap-4">
                                                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                                                    <span className="text-xs font-bold text-orange-600">{note.author.charAt(0)}</span>
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="font-bold text-sm text-slate-900">{note.author}</span>
                                                        <span className="text-xs text-slate-400">{new Date(note.createdAt).toLocaleDateString('vi-VN')}</span>
                                                    </div>
                                                    <p className="text-sm text-slate-600">{note.text}</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-10 text-slate-400 text-sm">
                                            Chưa có ghi chú nào.
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Footer Actions */}
                        <div className="p-6 border-t border-slate-100 bg-white sticky bottom-0 z-10 flex gap-3">
                            <Button 
                                variant="outline" 
                                className="flex-1 rounded-full border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                            >
                                <XCircle className="w-4 h-4 mr-2" />
                                Loại hồ sơ
                            </Button>
                            <Button 
                                className="flex-1 rounded-full bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/20"
                            >
                                <CheckCircle2 className="w-4 h-4 mr-2" />
                                Duyệt vòng sau
                            </Button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
