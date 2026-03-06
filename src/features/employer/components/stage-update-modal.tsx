"use client";

/**
 * ═════════════════════════════════════════════════════════
 *  Stage Update Modal
 *  Shown when moving a candidate between pipeline stages.
 *  Allows adding notes, scheduling interviews, and confirming
 *  the stage transition.
 * ═════════════════════════════════════════════════════════
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    ArrowRight,
    MessageSquare,
    Calendar,
    Clock,
    Star,
    CheckCircle2,
    AlertTriangle,
    User,
    Video,
    MapPin,
} from "lucide-react";
import { cn } from "@/shared/utils/cn";

// ─── Types ───────────────────────────────────────────
type StageId = "applied" | "screening" | "interview" | "offer" | "hired" | "rejected";

interface StageUpdateCandidate {
    id: string;
    name: string;
    avatar: string;
    position: string;
    aiScore: number;
}

interface StageUpdateModalProps {
    /** Whether modal is open */
    readonly isOpen: boolean;
    /** Close handler */
    readonly onClose: () => void;
    /** Confirm handler with note and schedule data */
    readonly onConfirm: (data: StageUpdateData) => void;
    /** Candidate being moved */
    readonly candidate: StageUpdateCandidate | null;
    /** Source stage */
    readonly fromStage: StageId;
    /** Target stage */
    readonly toStage: StageId;
}

export interface StageUpdateData {
    candidateId: string;
    fromStage: StageId;
    toStage: StageId;
    note: string;
    scheduleDate: string;
    scheduleTime: string;
    scheduleType: "online" | "onsite" | "phone";
    scheduleLocation: string;
}

// ─── Stage Config ────────────────────────────────────
const STAGE_META: Record<StageId, { label: string; color: string; bg: string; dot: string }> = {
    applied: { label: "Ứng tuyển", color: "text-sky-700 dark:text-sky-400", bg: "bg-sky-100 dark:bg-sky-900/30", dot: "bg-sky-400" },
    screening: { label: "Sàng lọc", color: "text-violet-700 dark:text-violet-400", bg: "bg-violet-100 dark:bg-violet-900/30", dot: "bg-violet-400" },
    interview: { label: "Phỏng vấn", color: "text-amber-700 dark:text-amber-400", bg: "bg-amber-100 dark:bg-amber-900/30", dot: "bg-amber-400" },
    offer: { label: "Đề nghị", color: "text-emerald-700 dark:text-emerald-400", bg: "bg-emerald-100 dark:bg-emerald-900/30", dot: "bg-emerald-400" },
    hired: { label: "Đã tuyển", color: "text-teal-700 dark:text-teal-400", bg: "bg-teal-100 dark:bg-teal-900/30", dot: "bg-teal-400" },
    rejected: { label: "Từ chối", color: "text-rose-700 dark:text-rose-400", bg: "bg-rose-100 dark:bg-rose-900/30", dot: "bg-rose-400" },
};

const NOTE_TEMPLATES: Record<string, string[]> = {
    screening: [
        "CV phù hợp yêu cầu, chuyển sang vòng phỏng vấn.",
        "Kinh nghiệm phù hợp, cần check kỹ năng kỹ thuật.",
        "Profile ấn tượng, ưu tiên phỏng vấn sớm.",
    ],
    interview: [
        "Lên lịch phỏng vấn kỹ thuật vòng 1.",
        "Chuyển phỏng vấn culture fit + team lead.",
        "Phỏng vấn final với CTO.",
    ],
    offer: [
        "Kết quả phỏng vấn tốt, chuẩn bị offer letter.",
        "Đàm phán mức lương, gửi offer chính thức.",
    ],
    hired: [
        "Ứng viên đã chấp nhận offer. Chuẩn bị onboarding.",
        "Ngày bắt đầu: tuần tới. Setup tài khoản và thiết bị.",
    ],
    rejected: [
        "Không đáp ứng yêu cầu kỹ thuật.",
        "Culture fit không phù hợp.",
        "Ứng viên rút đơn ứng tuyển.",
        "Đã chọn ứng viên khác cho vị trí này.",
    ],
};

// ─── Component ───────────────────────────────────────
export function StageUpdateModal({
    isOpen,
    onClose,
    onConfirm,
    candidate,
    fromStage,
    toStage,
}: StageUpdateModalProps) {
    const [note, setNote] = useState("");
    const [scheduleDate, setScheduleDate] = useState("");
    const [scheduleTime, setScheduleTime] = useState("09:00");
    const [scheduleType, setScheduleType] = useState<"online" | "onsite" | "phone">("online");
    const [scheduleLocation, setScheduleLocation] = useState("");

    const fromMeta = STAGE_META[fromStage];
    const toMeta = STAGE_META[toStage];
    const templates = NOTE_TEMPLATES[toStage] ?? [];
    const showSchedule = toStage === "interview";
    const isRejection = toStage === "rejected";

    const handleConfirm = () => {
        if (!candidate) return;
        onConfirm({
            candidateId: candidate.id,
            fromStage,
            toStage,
            note,
            scheduleDate,
            scheduleTime,
            scheduleType,
            scheduleLocation,
        });
        // Reset form
        setNote("");
        setScheduleDate("");
        setScheduleTime("09:00");
        setScheduleType("online");
        setScheduleLocation("");
    };

    if (!candidate) return null;

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
                        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    >
                        <div className="bg-white dark:bg-[#1C252E] rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto">
                            {/* Header */}
                            <div className="px-6 py-4 border-b border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] flex items-center justify-between">
                                <h2 className="text-base font-bold text-[#1C252E] dark:text-white">Chuyển giai đoạn</h2>
                                <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[rgba(145,158,171,0.08)] dark:hover:bg-white/[0.06] transition-colors cursor-pointer">
                                    <X className="w-4 h-4 text-[#919EAB]" />
                                </button>
                            </div>

                            <div className="px-6 py-4 space-y-5">
                                {/* Candidate Info */}
                                <div className="flex items-center gap-3 bg-[rgba(145,158,171,0.06)] dark:bg-white/[0.04] rounded-xl p-3">
                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-sky-100 to-violet-100 dark:from-sky-900/30 dark:to-violet-900/30 flex items-center justify-center text-xs font-bold text-sky-700 dark:text-sky-400">
                                        {candidate.avatar}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-[#1C252E] dark:text-white">{candidate.name}</p>
                                        <p className="text-[11px] text-[#919EAB]">{candidate.position}</p>
                                    </div>
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-400 flex items-center gap-0.5">
                                        <Star className="w-2.5 h-2.5" /> {candidate.aiScore}
                                    </span>
                                </div>

                                {/* Stage Transition */}
                                <div className="flex items-center justify-center gap-3">
                                    <div className={cn("px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5", fromMeta.bg, fromMeta.color)}>
                                        <span className={cn("w-2 h-2 rounded-full", fromMeta.dot)} />
                                        {fromMeta.label}
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-[#C4CDD5] dark:text-[#637381]" />
                                    <div className={cn("px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5", toMeta.bg, toMeta.color)}>
                                        <span className={cn("w-2 h-2 rounded-full", toMeta.dot)} />
                                        {toMeta.label}
                                    </div>
                                </div>

                                {/* Warning for rejection */}
                                {isRejection && (
                                    <div className="flex items-start gap-2 bg-rose-50 rounded-lg p-3">
                                        <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                                        <p className="text-xs text-rose-600">
                                            Ứng viên sẽ bị từ chối và nhận thông báo qua email. Hành động này có thể hoàn tác.
                                        </p>
                                    </div>
                                )}

                                {/* Note Templates */}
                                {templates.length > 0 && (
                                    <div>
                                        <p className="text-xs font-semibold text-[#637381] dark:text-[#919EAB] mb-2">Ghi chú nhanh:</p>
                                        <div className="flex flex-wrap gap-1.5">
                                            {templates.map((t, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => setNote(t)}
                                                    className={cn(
                                                        "text-[10px] px-2.5 py-1 rounded-full border transition-colors cursor-pointer",
                                                        note === t
                                                            ? "bg-sky-100 dark:bg-sky-900/30 border-sky-300 dark:border-sky-700/50 text-sky-700 dark:text-sky-400"
                                                            : "bg-white dark:bg-white/[0.04] border-[rgba(145,158,171,0.2)] dark:border-white/[0.08] text-[#637381] dark:text-[#919EAB] hover:border-sky-200 dark:hover:border-sky-700/50"
                                                    )}
                                                >
                                                    {t}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Note Input */}
                                <div>
                                    <label className="text-xs font-semibold text-[#637381] dark:text-[#919EAB] mb-1.5 flex items-center gap-1">
                                        <MessageSquare className="w-3 h-3" /> Ghi chú
                                    </label>
                                    <textarea
                                        value={note}
                                        onChange={(e) => setNote(e.target.value)}
                                        placeholder="Thêm ghi chú cho lần chuyển giai đoạn này..."
                                        rows={3}
                                        className="w-full px-3 py-2 text-sm bg-white dark:bg-white/[0.04] border border-[rgba(145,158,171,0.2)] dark:border-white/[0.08] rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-200 dark:focus:ring-sky-800 focus:border-sky-400 resize-none transition-all text-[#1C252E] dark:text-white placeholder:text-[#919EAB]"
                                    />
                                </div>

                                {/* Schedule Section (only for interview stage) */}
                                {showSchedule && (
                                    <div className="space-y-3 bg-amber-50/50 dark:bg-amber-900/10 rounded-xl p-4 border border-amber-100 dark:border-amber-800/30">
                                        <p className="text-xs font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                                            <Calendar className="w-3.5 h-3.5" /> Lịch phỏng vấn (tuỳ chọn)
                                        </p>

                                        {/* Interview Type */}
                                        <div className="flex gap-2">
                                            {([
                                                { key: "online" as const, icon: Video, label: "Online" },
                                                { key: "onsite" as const, icon: MapPin, label: "Onsite" },
                                                { key: "phone" as const, icon: User, label: "Phone" },
                                            ]).map((opt) => (
                                                <button
                                                    key={opt.key}
                                                    onClick={() => setScheduleType(opt.key)}
                                                    className={cn(
                                                        "flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer",
                                                        scheduleType === opt.key
                                                            ? "bg-amber-200 dark:bg-amber-800/40 text-amber-800 dark:text-amber-300"
                                                            : "bg-white dark:bg-white/[0.04] text-[#637381] dark:text-[#919EAB] hover:bg-amber-100 dark:hover:bg-amber-900/20"
                                                    )}
                                                >
                                                    <opt.icon className="w-3 h-3" /> {opt.label}
                                                </button>
                                            ))}
                                        </div>

                                        {/* Date & Time */}
                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                <label className="text-[10px] font-semibold text-amber-600 dark:text-amber-400 mb-1 block">Ngày</label>
                                                <input
                                                    type="date"
                                                    value={scheduleDate}
                                                    onChange={(e) => setScheduleDate(e.target.value)}
                                                    className="w-full px-3 py-1.5 text-xs bg-white dark:bg-white/[0.04] border border-amber-200 dark:border-amber-800/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-200 text-[#1C252E] dark:text-white"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-semibold text-amber-600 dark:text-amber-400 mb-1 block">Giờ</label>
                                                <input
                                                    type="time"
                                                    value={scheduleTime}
                                                    onChange={(e) => setScheduleTime(e.target.value)}
                                                    className="w-full px-3 py-1.5 text-xs bg-white dark:bg-white/[0.04] border border-amber-200 dark:border-amber-800/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-200 text-[#1C252E] dark:text-white"
                                                />
                                            </div>
                                        </div>

                                        {/* Location */}
                                        {scheduleType === "onsite" && (
                                            <div>
                                                <label className="text-[10px] font-semibold text-amber-600 dark:text-amber-400 mb-1 block">Địa điểm</label>
                                                <input
                                                    type="text"
                                                    value={scheduleLocation}
                                                    onChange={(e) => setScheduleLocation(e.target.value)}
                                                    placeholder="VD: Tầng 5, Toà nhà ABC, Q.1, TP.HCM"
                                                    className="w-full px-3 py-1.5 text-xs bg-white dark:bg-white/[0.04] border border-amber-200 dark:border-amber-800/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-200 text-[#1C252E] dark:text-white placeholder:text-[#919EAB]"
                                                />
                                            </div>
                                        )}
                                        {scheduleType === "online" && (
                                            <p className="text-[10px] text-amber-500">
                                                Link Google Meet sẽ được tự động tạo sau khi xác nhận.
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="px-6 py-4 border-t border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] flex items-center justify-end gap-2">
                                <button
                                    onClick={onClose}
                                    className="px-4 py-2 text-xs font-semibold text-[#637381] dark:text-[#919EAB] bg-white dark:bg-white/[0.04] border border-[rgba(145,158,171,0.2)] dark:border-white/[0.08] rounded-xl hover:bg-[rgba(145,158,171,0.06)] dark:hover:bg-white/[0.06] transition-colors cursor-pointer"
                                >
                                    Huỷ
                                </button>
                                <button
                                    onClick={handleConfirm}
                                    className={cn(
                                        "px-5 py-2 text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5",
                                        isRejection
                                            ? "bg-rose-600 text-white hover:bg-rose-700"
                                            : "bg-sky-600 text-white hover:bg-sky-700"
                                    )}
                                >
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    {isRejection ? "Xác nhận từ chối" : "Xác nhận chuyển"}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
