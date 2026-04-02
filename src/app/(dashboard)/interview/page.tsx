"use client";

import { BackButton } from "@/shared/components/ui/back-button";
import { motion } from "framer-motion";
import { Mic2, BrainCircuit, ArrowRight, Calendar, Clock, ExternalLink, Video } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/components/ui/button";
import { useMyInterviews } from "@/features/interview/hooks/useInterviewService";

function InterviewHistoryItem({ interview }: { readonly interview: { id: number; roomName: string; scheduledAt: string; status: string; durationMinutes: number; meetingUrl?: string | null; } }) {
    const router = useRouter();
    const date = new Date(interview.scheduledAt);
    const statusColors: Record<string, string> = {
        SCHEDULED: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
        IN_PROGRESS: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
        COMPLETED: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
        CANCELLED: "bg-slate-100 text-slate-600 dark:bg-white/[0.06] dark:text-[#919EAB]",
    };
    const statusLabels: Record<string, string> = {
        SCHEDULED: "Đã lên lịch",
        IN_PROGRESS: "Đang diễn ra",
        COMPLETED: "Hoàn thành",
        CANCELLED: "Đã hủy",
    };

    return (
        <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-[#1C252E] border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-[#22c55e]/10 dark:bg-[#22c55e]/20 flex items-center justify-center shrink-0">
                <BrainCircuit className="w-5 h-5 text-[#22c55e]" />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-base font-semibold text-[#1C252E] dark:text-white truncate">{interview.roomName}</p>
                <div className="flex items-center gap-3 mt-1 text-sm text-[#919EAB]">
                    <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {date.toLocaleDateString("vi-VN")}
                    </span>
                    <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {interview.durationMinutes} phút
                    </span>
                </div>
            </div>
            <span className={`px-2.5 py-1 text-center rounded-full text-xs font-semibold whitespace-nowrap ${statusColors[interview.status] ?? statusColors.SCHEDULED}`}>
                {statusLabels[interview.status] ?? interview.status}
            </span>
            
            {interview.meetingUrl && interview.status !== "CANCELLED" && (
                <Button 
                    onClick={() => router.push(`/interview/room?id=${interview.id}`)}
                    size="sm" 
                    className="ml-2 rounded-full bg-[#22c55e] hover:bg-[#16a34a] text-white flex gap-2 items-center shrink-0 min-w-max"
                >
                    <Video className="w-4 h-4" />
                    <span className="hidden sm:inline">Vào phòng</span>
                </Button>
            )}
        </div>
    );
}

export default function InterviewPage() {
    const { data: interviews, isLoading } = useMyInterviews();

    return (
        <section className="relative z-10 flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-2xl w-full"
            >
                {/* Back button */}
                <div className="flex justify-start mb-8">
                    <BackButton fallbackHref="/dashboard" />
                </div>

                {/* Icon */}
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#22c55e] to-[#10b981] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-[#22c55e]/25">
                    <Mic2 className="w-9 h-9 text-white" />
                </div>

                {/* Content */}
                <h1 className="text-3xl font-bold text-[#1C252E] dark:text-white mb-3">
                    Phỏng vấn AI
                </h1>
                <p className="text-[#637381] dark:text-[#919EAB] text-base leading-relaxed mb-8">
                    Tính năng phỏng vấn thông minh với AI đang được phát triển.
                    Bạn có thể bắt đầu một buổi luyện tập phỏng vấn ngay bây giờ!
                </p>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
                    <Link
                        href="/interview/setup"
                        className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#22c55e] hover:bg-[#16a34a] text-white text-base font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#22c55e]/20"
                    >
                        <BrainCircuit className="w-5 h-5" />
                        Bắt đầu phỏng vấn thử
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>

                {/* Interview History */}
                {!isLoading && interviews && interviews.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-left"
                    >
                        <h2 className="text-lg font-bold text-[#1C252E] dark:text-white mb-4 flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-[#22c55e]" />
                            Lịch sử phỏng vấn
                        </h2>
                        <div className="space-y-3">
                            {interviews.slice(0, 5).map((interview) => (
                                <InterviewHistoryItem key={interview.id} interview={interview} />
                            ))}
                        </div>
                        {interviews.length > 5 && (
                            <p className="text-sm text-[#919EAB] text-center mt-3">
                                Và {interviews.length - 5} buổi phỏng vấn khác...
                            </p>
                        )}
                    </motion.div>
                )}
            </motion.div>
        </section>
    );
}
