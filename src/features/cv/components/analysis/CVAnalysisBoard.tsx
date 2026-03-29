"use client";

import React, { useEffect, useState, useRef } from "react";
import { 
  Loader2, CheckCircle, AlertTriangle, Info, Star, ChevronDown, ChevronUp, Quote
} from "lucide-react";
import { cvAiApi, AiCvReviewResponse, CvIssue, CvSuggestion } from "../../api/cv-ai-api";
import { motion, AnimatePresence } from "framer-motion";
import { ApiError } from "@/shared/lib/api-error";
import { tokenStorage } from "@/features/auth/lib/token-storage";

interface CVAnalysisBoardProps {
    cvFileId: number;
}

export function CVAnalysisBoard({ cvFileId }: CVAnalysisBoardProps) {
    const token = typeof window !== 'undefined' ? tokenStorage.getAccessToken() || "" : "";

    const [isLoading, setIsLoading] = useState(true);
    const [review, setReview] = useState<AiCvReviewResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const triggerStarted = useRef(false);

    // Expand state for issues
    const [expandedIssue, setExpandedIssue] = useState<number | null>(null);

    useEffect(() => {
        const fetchReview = async () => {
            try {
                // Try fetching first
                setIsLoading(true);
                const res = await cvAiApi.getReview(cvFileId);
                if (res.data.data) {
                     setReview(res.data.data);
                } else {
                     // If no review found, trigger a new one
                     if (!triggerStarted.current) {
                         triggerStarted.current = true;
                         const triggerRes = await cvAiApi.triggerReview(cvFileId);
                         setReview(triggerRes.data.data);
                     }
                }
            } catch (err) {
                if (err instanceof ApiError && err.status === 404) {
                    // Not found = no review yet, must trigger
                    if (!triggerStarted.current) {
                        triggerStarted.current = true;
                        try {
                            const triggerRes = await cvAiApi.triggerReview(cvFileId);
                            setReview(triggerRes.data.data);
                        } catch (e: any) {
                            setError(e.response?.data?.message || "Lỗi khi phân tích CV.");
                            console.error("Không thể phân tích CV.", e);
                        }
                    }
                } else {
                    setError("Lỗi kết nối máy chủ AI.");
                    console.error("Lỗi kết nối máy chủ AI.", err);
                }
            } finally {
                setIsLoading(false);
            }
        };

        if (cvFileId) {
            fetchReview();
        }
    }, [cvFileId]);

    if (isLoading) {
         return (
             <div className="w-full h-full flex flex-col items-center justify-center p-10">
                 <Loader2 className="w-12 h-12 text-green-500 animate-spin mb-4" />
                 <h2 className="text-xl font-bold text-[#1C252E] dark:text-white mb-2">Đang phân tích CV...</h2>
                 <p className="text-[#637381] dark:text-[#919EAB] text-center max-w-sm">Hệ thống AI đang đọc và đánh giá các kỹ năng, kinh nghiệm của bạn. Quá trình này có thể kéo dài lên tới 15 giây.</p>
             </div>
         );
    }

    if (error || !review) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center p-10 text-red-500">
                <AlertTriangle className="w-12 h-12 mb-4" />
                <h2 className="text-xl font-bold">Lỗi phân tích CV</h2>
                <p>{error}</p>
            </div>
        );
    }

    // Parsed JSON fields safely
    let issues: CvIssue[] = [];
    let suggestions: CvSuggestion[] = [];
    let strengths: string[] = [];
    let weaknesses: string[] = [];
    try {
        issues = JSON.parse(review.issues || "[]");
        suggestions = JSON.parse(review.suggestions || "[]");
        strengths = JSON.parse(review.strengths || "[]");
        weaknesses = JSON.parse(review.weaknesses || "[]");
    } catch (e) {
        console.error("Parse JSON review data failed:", e);
    }

    // PDF URL Corrected: Remove /api/v1 because NEXT_PUBLIC_API_URL is '/api'
    const pdfUrl = `${process.env.NEXT_PUBLIC_API_URL}/candidate/profile/cv-files/${cvFileId}/download?access_token=${token}`;

    const getSeverityIcon = (level: string) => {
        if (level === "HIGH") return <AlertTriangle className="w-4 h-4 text-red-500" />;
        if (level === "MEDIUM") return <Info className="w-4 h-4 text-orange-500" />;
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
    };
    
    const getSeverityBadge = (level: string) => {
        if (level === "HIGH") return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
        if (level === "MEDIUM") return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400";
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
    };

    return (
        <div className="flex w-full h-full p-4 gap-6 px-6 lg:px-10 pb-10">
            {/* LEFT: PDF VIEWER */}
            <div className="w-1/2 h-full bg-white dark:bg-[#1C252E] rounded-3xl shadow-lg border border-[rgba(145,158,171,0.12)] overflow-hidden">
                <iframe 
                   src={`${pdfUrl}#toolbar=0`} 
                   className="w-full h-full"
                   title="CV Viewer"
                />
            </div>

            {/* RIGHT: ANALYSIS BOARD */}
            <div className="w-1/2 h-full overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-6">
                
                {/* Header Score Board */}
                <div className="bg-white dark:bg-[#1C252E] rounded-3xl p-6 shadow-sm border border-[rgba(145,158,171,0.12)]">
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-[#1C252E] dark:text-white mb-2">Báo cáo đánh giá CV</h1>
                            <p className="text-sm text-[#637381] dark:text-[#919EAB]">{review.summary}</p>
                        </div>
                        <div className="flex flex-col items-center bg-green-50 dark:bg-green-900/20 px-4 py-3 rounded-2xl border border-green-200 dark:border-green-800 shrink-0 ml-4">
                            <span className="text-3xl font-black text-green-600 dark:text-green-400">{review.overallRating}/10</span>
                            <span className="text-xs uppercase font-bold text-green-700 dark:text-green-500 mt-1 flex items-center gap-1"><Star className="w-3 h-3"/> ĐIỂM AI</span>
                        </div>
                    </div>
                </div>

                {/* Strengths & Weaknesses */}
                <div className="grid grid-cols-2 gap-4">
                    {/* Strengths */}
                    <div className="bg-gradient-to-br from-green-50 to-white dark:from-green-900/10 dark:to-transparent rounded-3xl p-5 border border-green-200/50 dark:border-green-900/50">
                        <h3 className="font-bold text-green-800 dark:text-green-400 mb-3 flex items-center gap-2">
                            <CheckCircle className="w-5 h-5" /> Điểm mạnh nổi bật
                        </h3>
                        {strengths.length > 0 ? (
                            <ul className="space-y-2">
                                {strengths.map((str, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm text-[#1C252E] dark:text-gray-300">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                                        <span>{str}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : <p className="text-sm text-gray-500">Chưa tìm thấy.</p>}
                    </div>

                    {/* Weaknesses */}
                    <div className="bg-gradient-to-br from-red-50 to-white dark:from-red-900/10 dark:to-transparent rounded-3xl p-5 border border-red-200/50 dark:border-red-900/50">
                        <h3 className="font-bold text-red-800 dark:text-red-400 mb-3 flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5" /> Điểm cần cải thiện
                        </h3>
                        {weaknesses.length > 0 ? (
                            <ul className="space-y-2">
                                {weaknesses.map((weak, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm text-[#1C252E] dark:text-gray-300">
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                                        <span>{weak}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : <p className="text-sm text-gray-500"> Rất tốt, không tìm thấy nhược điểm lớn.</p>}
                    </div>
                </div>

                {/* Specific Issues & Highlights */}
                <div className="bg-white dark:bg-[#1C252E] rounded-3xl p-6 shadow-sm border border-[rgba(145,158,171,0.12)]">
                    <h3 className="text-lg font-bold text-[#1C252E] dark:text-white mb-4">Lỗi chi tiết & Trích dẫn từ CV</h3>
                    {issues.length > 0 ? (
                        <div className="space-y-3">
                            {issues.map((issue, idx) => (
                                <div key={idx} className="border border-[rgba(145,158,171,0.2)] dark:border-white/[0.1] rounded-2xl overflow-hidden">
                                    <div 
                                        className="w-full flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors"
                                        onClick={() => setExpandedIssue(expandedIssue === idx ? null : idx)}
                                    >
                                        <div className="flex items-center gap-3">
                                           {getSeverityIcon(issue.severity)}
                                           <span className="font-semibold text-sm text-[#1C252E] dark:text-white line-clamp-1">{issue.description}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${getSeverityBadge(issue.severity)}`}>
                                                {issue.severity}
                                            </span>
                                            {expandedIssue === idx ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                                        </div>
                                    </div>
                                    
                                    <AnimatePresence>
                                        {expandedIssue === idx && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="bg-gray-50 dark:bg-[rgba(145,158,171,0.03)] border-t border-[rgba(145,158,171,0.1)] px-5 py-4"
                                            >
                                                {issue.quote && issue.quote !== "N/A" && issue.quote.trim() !== "" ? (
                                                    <div className="mb-4">
                                                        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 block flex items-center gap-1">
                                                            <Quote className="w-3 h-3" /> Trích dẫn từ CV của bạn:
                                                        </span>
                                                        <blockquote className="border-l-4 border-orange-400 pl-3 py-1 bg-white dark:bg-[#1C252E] rounded-r-lg text-sm text-[#1C252E] dark:text-white font-medium shadow-sm">
                                                            "{issue.quote}"
                                                        </blockquote>
                                                    </div>
                                                ) : (
                                                    <div className="mb-4 text-xs italic text-gray-400">Không có trích dẫn cụ thể (lỗi tổng quan/thiếu phần)</div>
                                                )}
                                                
                                                <div>
                                                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1 block">
                                                        Chi tiết Lỗi ({issue.category}):
                                                    </span>
                                                    <p className="text-sm text-[#637381] dark:text-[#919EAB]">{issue.description}</p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500 text-center py-6">CV của bạn không có lỗi rõ ràng nào.</p>
                    )}
                </div>

                 {/* General Suggestions */}
                 <div className="bg-white dark:bg-[#1C252E] rounded-3xl p-6 shadow-sm border border-[rgba(145,158,171,0.12)]">
                    <h3 className="text-lg font-bold text-[#1C252E] dark:text-white mb-4">Các gợi ý cải thiện chung</h3>
                    {suggestions.length > 0 ? (
                        <ul className="space-y-4">
                            {suggestions.map((sug, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm shrink-0">
                                        {idx + 1}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-sm text-[#1C252E] dark:text-white">{sug.section}</p>
                                        <p className="text-sm text-[#637381] dark:text-[#919EAB] mt-0.5">{sug.suggestion}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-gray-500 text-center py-6">CV của bạn đã rất tốt, không có gợi ý cải thiện.</p>
                    )}
                </div>

            </div>
        </div>
    );
}

