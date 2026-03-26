import { AIAnalysis, EmployerApplicant } from "../types/mock-applicants";
import { employerApplicantApi } from "../api/employer-api";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { ScoreBreakdown } from "./score-breakdown";
import { AISkeleton } from "./ai-skeleton";
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
    AlertTriangle,
    RefreshCcw,
    Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ApplicationStage } from "@/shared/types/application";
import { cn } from "@/shared/utils/cn"; // Assuming utility exists, otherwise will import from wherever

interface ApplicantDrawerProps {
    applicant: EmployerApplicant | null;
    isOpen: boolean;
    onClose: () => void;
    jobId: string;
    onApplicantUpdated?: () => void;
}

export function ApplicantDrawer({ applicant, isOpen, onClose, jobId, onApplicantUpdated }: ApplicantDrawerProps) {
    const [activeTab, setActiveTab] = useState<"overview" | "notes">("overview");
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const handleReAnalyze = () => {
        if (!applicant) return;
        setIsAnalyzing(true);
        employerApplicantApi.reAnalyze(jobId, applicant.id)
            .then(() => {
                onApplicantUpdated?.();
            })
            .catch(() => {
                // Silently fail — UI already shows skeleton during loading
            })
            .finally(() => {
                setIsAnalyzing(false);
            });
    };

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
                        className="fixed inset-y-0 right-0 w-full sm:w-[500px] lg:w-[600px] bg-white dark:bg-[#1C252E] shadow-2xl z-50 flex flex-col">
                         {/* Header and content structure remains same until inner content */}
                        <div className="p-6 border-b border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] flex items-start justify-between bg-white dark:bg-[#1C252E] z-10 sticky top-0">
                            <div className="flex gap-4">
                                <div className="w-16 h-16 rounded-full bg-[rgba(145,158,171,0.1)] dark:bg-white/[0.06] flex items-center justify-center overflow-hidden border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] shrink-0">
                                    {applicant.avatarUrl ? (
                                        <img src={applicant.avatarUrl} alt={applicant.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-2xl font-bold text-[#919EAB]">{applicant.name.charAt(0)}</span>
                                    )}
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-[#1C252E] dark:text-white">{applicant.name}</h2>
                                    <p className="text-[#637381] dark:text-[#919EAB]">{applicant.currentTitle} • {applicant.experienceYears} năm KN</p>
                                    <div className="flex items-center gap-3 mt-2 text-sm text-[#637381] dark:text-[#919EAB]">
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
                                <X className="w-5 h-5 text-[#919EAB]" />
                            </Button>
                        </div>

                        {/* Tabs */}
                        <div className="flex border-b border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] px-6">
                            <button
                                onClick={() => setActiveTab("overview")}
                                className={cn(
                                    "px-4 py-3 text-sm font-medium border-b-2 transition-colors",
                                    activeTab === "overview" 
                                        ? "border-[#22c55e]/30 text-[#22c55e] dark:text-[#22c55e]" 
                                        : "border-transparent text-[#637381] dark:text-[#919EAB] hover:text-[#1C252E] dark:hover:text-white"
                                )}
                            >
                                Tổng quan & AI
                            </button>
                            <button
                                onClick={() => setActiveTab("notes")}
                                className={cn(
                                    "px-4 py-3 text-sm font-medium border-b-2 transition-colors",
                                    activeTab === "notes" 
                                        ? "border-[#22c55e]/30 text-[#22c55e] dark:text-[#22c55e]" 
                                        : "border-transparent text-[#637381] dark:text-[#919EAB] hover:text-[#1C252E] dark:hover:text-white"
                                )}
                            >
                                Ghi chú ({applicant.notes.length})
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 bg-[rgba(145,158,171,0.04)] dark:bg-[#141A21]">
                            {activeTab === "overview" && (
                                <div className="space-y-6">
                                    {/* AI Match Score / Loading State */}
                                    {isAnalyzing ? (
                                        <AISkeleton />
                                    ) : (
                                        <div className="bg-white dark:bg-[#1C252E] p-5 rounded-2xl border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] shadow-sm">
                                            <div className="flex justify-between items-center mb-4">
                                                <h3 className="font-semibold text-[#1C252E] dark:text-white flex items-center gap-2">
                                                    <Brain className="w-5 h-5 text-purple-500" />
                                                    Phân tích AI
                                                </h3>
                                                <Button 
                                                    variant="ghost" 
                                                    size="sm" 
                                                    onClick={handleReAnalyze}
                                                    className="h-8 text-xs text-[#637381] dark:text-[#919EAB] hover:text-[#22c55e] hover:bg-[#22c55e]/10 dark:hover:bg-[#22c55e]/20 rounded-full"
                                                >
                                                    <RefreshCcw className="w-3.5 h-3.5 mr-1" />
                                                    Phân tích lại
                                                </Button>
                                            </div>
                                            
                                            <div className="flex items-center gap-6 mb-6">
                                                <div className="relative w-24 h-24 shrink-0">
                                                    <svg className="w-full h-full transform -rotate-90">
                                                        <circle cx="48" cy="48" r="40" fill="transparent" stroke="rgba(145,158,171,0.2)" strokeWidth="8" />
                                                        <circle
                                                            cx="48" cy="48" r="40" fill="transparent"
                                                            stroke={applicant.aiAnalysis.matchScore >= 80 ? "#22c55e" : applicant.aiAnalysis.matchScore >= 50 ? "#f59e0b" : "#ef4444"}
                                                            strokeWidth="8"
                                                            strokeDasharray={`${2 * Math.PI * 40}`}
                                                            strokeDashoffset={`${2 * Math.PI * 40 * (1 - applicant.aiAnalysis.matchScore / 100)}`}
                                                            strokeLinecap="round"
                                                        />
                                                    </svg>
                                                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                                                        <span className="text-2xl font-bold text-[#1C252E] dark:text-white">{applicant.aiAnalysis.matchScore}%</span>
                                                        <span className="text-[10px] text-[#919EAB] uppercase font-bold">Match</span>
                                                    </div>
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm text-[#637381] dark:text-[#919EAB] italic border-l-2 border-purple-200 dark:border-purple-700/40 pl-3">
                                                    "{applicant.aiAnalysis.summary}"
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Score Breakdown */}
                                            <ScoreBreakdown breakdown={applicant.aiAnalysis.breakdown} />

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-[rgba(145,158,171,0.12)] dark:border-white/[0.08]">
                                                <div className="space-y-2">
                                                    <div className="text-sm font-medium text-green-700 dark:text-green-400 flex items-center gap-1.5">
                                                        <ThumbsUp className="w-4 h-4" /> Điểm mạnh
                                                    </div>
                                                    <ul className="space-y-1">
                                                        {applicant.aiAnalysis.strengths.map((str, i) => (
                                                            <li key={i} className="text-sm text-[#637381] dark:text-[#919EAB] pl-2 border-l border-green-200 dark:border-green-700/40">{str}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div className="space-y-2">
                                                    <div className="text-sm font-medium text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                                                        <AlertTriangle className="w-4 h-4" /> Điểm cần cải thiện
                                                    </div>
                                                    <ul className="space-y-1">
                                                        {applicant.aiAnalysis.gaps.map((gap, i) => (
                                                            <li key={i} className="text-sm text-[#637381] dark:text-[#919EAB] pl-2 border-l border-amber-200 dark:border-amber-700/40">{gap}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Skills */}
                                    <div className="bg-white dark:bg-[#1C252E] p-5 rounded-2xl border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] shadow-sm">
                                        <h3 className="font-semibold text-[#1C252E] dark:text-white mb-3">Kỹ năng</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {applicant.skills.map(skill => (
                                                <Badge key={skill} variant="secondary" className="bg-[rgba(145,158,171,0.1)] dark:bg-white/[0.06] text-[#637381] dark:text-[#919EAB] hover:bg-[rgba(145,158,171,0.15)]">
                                                    {skill}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Recent Activity */}
                                    <div>
                                        <h3 className="font-semibold text-[#1C252E] dark:text-white mb-3 ml-1">Hoạt động gần đây</h3>
                                        <div className="space-y-4 border-l-2 border-[rgba(145,158,171,0.2)] dark:border-white/[0.1] ml-3 pl-6 py-2">
                                            {applicant.activities?.map((act) => (
                                                <div key={act.id} className="relative">
                                                    <div className="absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full bg-[#C4CDD5] dark:bg-[#637381] border-2 border-white dark:border-[#141A21]" />
                                                    <p className="text-sm font-medium text-[#1C252E] dark:text-white">{act.action}</p>
                                                    <p className="text-xs text-[#637381] dark:text-[#919EAB]">{new Date(act.timestamp).toLocaleString('vi-VN')}</p>
                                                </div>
                                            ))}
                                            <div className="relative">
                                                <div className="absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full bg-[#22c55e] border-2 border-white dark:border-[#141A21] ring-2 ring-[#22c55e]/30 dark:ring-[#22c55e]/30" />
                                                <p className="text-sm font-medium text-[#22c55e] dark:text-[#22c55e]">Hiện tại: {applicant.status}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === "notes" && (
                                <div className="space-y-4">
                                    {/* Add Note Input */}
                                    <div className="bg-white dark:bg-[#1C252E] p-4 rounded-xl border border-[rgba(145,158,171,0.16)] dark:border-white/[0.08] shadow-sm">
                                        <textarea 
                                            placeholder="Thêm ghi chú nội bộ..." 
                                            className="w-full text-sm resize-none border-0 focus:ring-0 p-0 placeholder:text-[#919EAB] min-h-[80px] bg-transparent text-[#1C252E] dark:text-white"
                                        />
                                        <div className="flex justify-end mt-2 pt-2 border-t border-[rgba(145,158,171,0.12)] dark:border-white/[0.08]">
                                            <Button size="sm" className="h-8 bg-[#22c55e] hover:bg-[#22c55e] text-white rounded-full">
                                                <Send className="w-3.5 h-3.5 mr-1" /> Lưu
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Notes List */}
                                    {applicant.notes.length > 0 ? (
                                        applicant.notes.map(note => (
                                            <div key={note.id} className="bg-white dark:bg-[#1C252E] p-4 rounded-xl border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] flex gap-4">
                                                <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center shrink-0">
                                                    <span className="text-xs font-bold text-orange-600 dark:text-orange-400">{note.author.charAt(0)}</span>
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="font-bold text-sm text-[#1C252E] dark:text-white">{note.author}</span>
                                                        <span className="text-xs text-[#919EAB]">{new Date(note.createdAt).toLocaleDateString('vi-VN')}</span>
                                                    </div>
                                                    <p className="text-sm text-[#637381] dark:text-[#919EAB]">{note.text}</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-10 text-[#919EAB] text-sm">
                                            Chưa có ghi chú nào.
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Footer Actions */}
                        <div className="p-6 border-t border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] bg-white dark:bg-[#1C252E] sticky bottom-0 z-10 flex gap-3">
                            <Button 
                                variant="outline" 
                                className="flex-1 rounded-full border-red-200 dark:border-red-800/40 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-300"
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

