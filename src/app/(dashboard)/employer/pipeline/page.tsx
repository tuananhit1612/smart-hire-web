"use client";

import { useState, useMemo, useRef, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    Kanban,
    Search,
    Clock,
    MoreHorizontal,
    ArrowRight,
    ArrowLeft,
    ChevronDown,
    GripVertical,
    Briefcase,
} from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { ScoreBadge } from "@/shared/components/ui/status-badge";
import { AvatarInitials } from "@/shared/components/ui/avatar-initials";
import { PageSection } from "@/shared/components/layout/page-section";

import { employerApplicantApi } from "@/features/employer/api/employer-api";
import { StageUpdateModal, type StageUpdateData } from "@/features/employer/components/stage-update-modal";
import { interviewService } from "@/features/interview/api/interviewService";

// ─── Types ───────────────────────────────────────────
type StageId = "APPLIED" | "INTERVIEW" | "HIRED" | "REJECTED";

interface PipelineCandidate {
    id: string;
    jobId: string;
    name: string;
    avatar: string;
    email: string;
    position: string;
    aiScore: number;
    appliedDate: string;
    daysInStage: number;
    tags: string[];
}

interface PipelineStage {
    id: StageId;
    label: string;
    color: string;
    bg: string;
    headerBg: string;
    dot: string;
}

interface DragState {
    candidateId: string;
    fromStage: StageId;
    candidate: PipelineCandidate;
    x: number;
    y: number;
    offsetX: number;
    offsetY: number;
}

/** Pending move waiting for modal confirmation */
interface PendingMove {
    candidateId: string;
    from: StageId;
    to: StageId;
    candidate: PipelineCandidate;
}

// ─── Stage Config ────────────────────────────────────
const stages: PipelineStage[] = [
    { id: "APPLIED",   label: "Ứng tuyển", color: "text-[#22c55e] dark:text-[#22c55e]",      bg: "bg-[#22c55e]/10 dark:bg-[#22c55e]/20",      headerBg: "bg-[#22c55e]/15 dark:bg-[#22c55e]/20",      dot: "bg-[#22c55e]" },
    { id: "INTERVIEW", label: "Phỏng vấn", color: "text-amber-700 dark:text-amber-400",  bg: "bg-amber-50 dark:bg-amber-900/20",  headerBg: "bg-amber-100 dark:bg-amber-900/30",  dot: "bg-amber-400" },
    { id: "HIRED",     label: "Đã tuyển",  color: "text-teal-700 dark:text-teal-400",    bg: "bg-teal-50 dark:bg-teal-900/20",    headerBg: "bg-teal-100 dark:bg-teal-900/30",    dot: "bg-teal-400" },
    { id: "REJECTED",  label: "Từ chối",   color: "text-rose-700 dark:text-rose-400",    bg: "bg-rose-50 dark:bg-rose-900/20",    headerBg: "bg-rose-100 dark:bg-rose-900/30",    dot: "bg-rose-400" },
];

const emptyBoard: Record<StageId, PipelineCandidate[]> = {
    APPLIED: [], INTERVIEW: [], HIRED: [], REJECTED: []
};

/** Map pipeline StageId to the lowercase stage IDs used by StageUpdateModal */
const toModalStage = (s: StageId): "applied" | "interview" | "hired" | "rejected" => {
    return s.toLowerCase() as "applied" | "interview" | "hired" | "rejected";
};

// ─── Floating Ghost Card ──────────────────────────────
function DragGhost({ dragState }: { dragState: DragState }) {
    return createPortal(
        <div
            style={{
                position: "fixed",
                left: dragState.x - dragState.offsetX,
                top: dragState.y - dragState.offsetY,
                width: 244,
                pointerEvents: "none",
                zIndex: 9999,
                rotate: "2deg",
                opacity: 0.95,
            }}
            className="bg-white dark:bg-[#1C252E] rounded-xl border-2 border-[#22c55e]/30 dark:border-[#22c55e]/30 p-3 shadow-2xl shadow-green-500/20 dark:shadow-[#22c55e]/20"
        >
            <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                    <AvatarInitials initials={dragState.candidate.avatar} size="sm" />
                    <div className="min-w-0">
                        <p className="text-sm font-semibold text-[#1C252E] dark:text-white truncate">{dragState.candidate.name}</p>
                        <p className="text-[10px] text-[#919EAB] truncate">{dragState.candidate.position}</p>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-[rgba(145,158,171,0.12)] dark:border-white/[0.08]">
                <div className="flex items-center gap-1 text-[10px] text-[#919EAB]">
                    <Clock className="w-2.5 h-2.5" />
                    {dragState.candidate.daysInStage > 0 ? `${dragState.candidate.daysInStage} ngày` : "Hôm nay"}
                </div>
                <ScoreBadge score={dragState.candidate.aiScore} />
            </div>
        </div>,
        document.body
    );
}

// ─── Candidate Card ──────────────────────────────────
function CandidateCard({
    candidate,
    stageId,
    onRequestMove,
    onDragStarted,
    isDragging,
}: {
    readonly candidate: PipelineCandidate;
    readonly stageId: StageId;
    readonly onRequestMove: (candidateId: string, from: StageId, to: StageId) => void;
    readonly onDragStarted: (ds: DragState) => void;
    readonly isDragging: boolean;
}) {
    const [showActions, setShowActions] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const stageIndex = stages.findIndex((s) => s.id === stageId);
    const canMoveLeft = stageIndex > 0;
    const canMoveRight = stageIndex < stages.length - 1;

    const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if ((e.target as HTMLElement).closest("button")) return;
        e.preventDefault();

        const rect = cardRef.current!.getBoundingClientRect();
        onDragStarted({
            candidateId: candidate.id,
            fromStage: stageId,
            candidate,
            x: e.clientX,
            y: e.clientY,
            offsetX: e.clientX - rect.left,
            offsetY: e.clientY - rect.top,
        });
    }, [candidate, stageId, onDragStarted]);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isDragging ? 0 : 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
        >
            {isDragging ? (
                <div className="rounded-xl border-2 border-dashed border-[#22c55e]/30 dark:border-[#22c55e]/30 bg-[#22c55e]/10 dark:bg-[#22c55e]/20 h-[120px] flex items-center justify-center">
                    <GripVertical className="w-5 h-5 text-[#22c55e] dark:text-[#22c55e]" />
                </div>
            ) : (
                <div
                    ref={cardRef}
                    onMouseDown={handleMouseDown}
                    className="bg-white dark:bg-[#1C252E] rounded-xl border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] p-3 shadow-sm hover:shadow-md hover:border-[#22c55e]/30 dark:hover:border-[#22c55e]/30 transition-all cursor-grab active:cursor-grabbing group select-none"
                >
                    <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <AvatarInitials initials={candidate.avatar} size="sm" />
                            <div className="min-w-0">
                                <p className="text-sm font-semibold text-[#1C252E] dark:text-white truncate">{candidate.name}</p>
                                <p className="text-[10px] text-[#919EAB] truncate">{candidate.position}</p>
                            </div>
                        </div>
                        <div className="relative">
                            <button
                                onMouseDown={(e) => e.stopPropagation()}
                                onClick={() => setShowActions(!showActions)}
                                className="w-6 h-6 rounded-md flex items-center justify-center hover:bg-[rgba(145,158,171,0.08)] dark:hover:bg-white/[0.06] transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
                            >
                                <MoreHorizontal className="w-3.5 h-3.5 text-slate-400" />
                            </button>
                            <AnimatePresence>
                                {showActions && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="absolute right-0 top-7 z-20 bg-white dark:bg-[#1C252E] rounded-lg border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] shadow-lg dark:shadow-black/30 py-1 min-w-[148px]"
                                    >

                                        {canMoveLeft && (
                                            <button
                                                onClick={() => { onRequestMove(candidate.id, stageId, stages[stageIndex - 1].id); setShowActions(false); }}
                                                className="w-full px-3 py-1.5 text-xs text-left hover:bg-[rgba(145,158,171,0.06)] dark:hover:bg-white/[0.04] flex items-center gap-2 text-amber-600"
                                            >
                                                <ArrowLeft className="w-3 h-3" /> Lùi về {stages[stageIndex - 1].label}
                                            </button>
                                        )}
                                        {canMoveRight && (
                                            <button
                                                onClick={() => { onRequestMove(candidate.id, stageId, stages[stageIndex + 1].id); setShowActions(false); }}
                                                className="w-full px-3 py-1.5 text-xs text-left hover:bg-[rgba(145,158,171,0.06)] dark:hover:bg-white/[0.04] flex items-center gap-2 text-emerald-600"
                                            >
                                                <ArrowRight className="w-3 h-3" /> Chuyển {stages[stageIndex + 1].label}
                                            </button>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-2">
                        {candidate.tags.map((tag) => (
                            <span key={tag} className="text-[9px] font-medium px-1.5 py-0.5 rounded-md bg-[rgba(145,158,171,0.08)] dark:bg-white/[0.06] text-[#637381] dark:text-[#919EAB]">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[rgba(145,158,171,0.12)] dark:border-white/[0.08]">
                        <div className="flex items-center gap-1 text-[10px] text-[#919EAB]">
                            <Clock className="w-2.5 h-2.5" />
                            {candidate.daysInStage > 0 ? `${candidate.daysInStage} ngày` : "Hôm nay"}
                        </div>
                        <ScoreBadge score={candidate.aiScore} />
                    </div>
                </div>
            )}
        </motion.div>
    );
}

// ─── Main Page ───────────────────────────────────────
export default function PipelineBoardPage() {
    const [boardData, setBoardData] = useState<Record<StageId, PipelineCandidate[]>>(emptyBoard);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [positionFilter, setPositionFilter] = useState("all");
    const [dragState, setDragState] = useState<DragState | null>(null);
    const [dragOverStage, setDragOverStage] = useState<StageId | null>(null);
    const columnRefs = useRef<Partial<Record<StageId, HTMLDivElement>>>({});

    // ─── Interview Modal State ─────────────────────
    const [pendingMove, setPendingMove] = useState<PendingMove | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);

    useEffect(() => {
        const fetchBoard = async () => {
            setIsLoading(true);
            try {
                const res = await employerApplicantApi.getAll();
                const data = res.data.data || [];
                
                const grouped: Record<StageId, PipelineCandidate[]> = {
                    APPLIED: [], INTERVIEW: [], HIRED: [], REJECTED: []
                };
                
                data.forEach((app: any) => {
                    const stage = app.status as StageId || "APPLIED";
                    
                    const appliedDate = new Date(app.appliedAt || new Date());
                    const diffTime = Math.abs(new Date().getTime() - appliedDate.getTime());
                    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));

                    const candidate: PipelineCandidate = {
                        id: String(app.id),
                        jobId: String(app.jobId),
                        name: app.name || "Unknown",
                        avatar: app.name ? app.name.slice(0, 2).toUpperCase() : "?",
                        email: app.email,
                        position: app.jobTitle || "Vị trí",
                        aiScore: app.aiAnalysis?.matchScore || 0,
                        appliedDate: appliedDate.toLocaleDateString('vi-VN'),
                        daysInStage: days,
                        tags: app.skills || []
                    };
                    
                    if (grouped[stage]) {
                        grouped[stage].push(candidate);
                    }
                });
                setBoardData(grouped);
            } catch (err) {
                console.error("Failed to load pipeline data:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchBoard();
    }, []);

    /**
     * Request a move — always goes through the confirmation modal.
     */
    const requestMove = useCallback((candidateId: string, from: StageId, to: StageId) => {
        if (from === to) return;
        const candidate = boardData[from]?.find((c) => c.id === candidateId);
        if (!candidate) return;

        setPendingMove({ candidateId, from, to, candidate });
        setIsModalOpen(true);
    }, [boardData]);

    /**
     * Called when HR confirms in the modal.
     * 1. Update stage via API (always).
     * 2. Create Interview room + send SMTP email (only if moving to INTERVIEW).
     * 3. Optimistically update UI.
     */
    const handleConfirm = useCallback(async (data: StageUpdateData) => {
        if (!pendingMove) return;

        setIsConfirming(true);
        const { candidateId, from, to, candidate } = pendingMove;

        // Optimistic UI update
        setBoardData((prev) => ({
            ...prev,
            [from]: prev[from].filter((c) => c.id !== candidateId),
            [to]: [...prev[to], { ...candidate, daysInStage: 0 }],
        }));

        setIsModalOpen(false);
        setPendingMove(null);

        // ── Step 1: Update stage (critical) ──────────────────────────────
        let stageUpdateOk = false;
        try {
            await employerApplicantApi.updateStage(candidate.jobId, candidateId, {
                stage: to,
                note: data.note || undefined,
            });
            stageUpdateOk = true;
        } catch (err) {
            console.error("updateStage failed:", err);
            // Rollback optimistic update
            setBoardData((prev) => ({
                ...prev,
                [from]: [...prev[from], { ...candidate }],
                [to]: prev[to].filter((c) => c.id !== candidateId),
            }));
            alert("Lỗi khi cập nhật trạng thái. Vui lòng thử lại.");
            setIsConfirming(false);
            return;
        }

        // ── Step 2: Create interview room + fire SMTP email (non-critical) ──
        if (stageUpdateOk && to === "INTERVIEW" && data.scheduleDate && data.scheduleTime) {
            try {
                const scheduledAt = `${data.scheduleDate}T${data.scheduleTime}:00`;

                let meetingUrl: string | undefined;
                if (data.scheduleType === "online") {
                    // Call Next.js API route → Google Calendar API → real Meet link
                    const scheduledAt = `${data.scheduleDate}T${data.scheduleTime}:00`;
                    const meetRes = await fetch("/api/interview/create-meet", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            title: `Phỏng vấn — ${candidate.position} — ${candidate.name}`,
                            scheduledAt,
                            durationMinutes: 60,
                        }),
                    });
                    if (meetRes.ok) {
                        const { meetUrl } = await meetRes.json();
                        meetingUrl = meetUrl;
                    } else {
                        // Fallback to Jitsi Meet if Google Calendar API fails
                        const roomId = "SmartHire-" + Math.random().toString(36).substring(2, 7).toUpperCase()
                            + "-" + Math.random().toString(36).substring(2, 7).toUpperCase();
                        meetingUrl = `https://meet.jit.si/${roomId}`;
                        console.warn("Google Calendar API failed, falling back to Jitsi Meet");
                    }
                } else if (data.scheduleType === "onsite" && data.scheduleLocation) {
                    meetingUrl = data.scheduleLocation;
                }
                // phone → meetingUrl is undefined → backend handles as phone type

                await interviewService.create({
                    applicationId: Number(candidateId),
                    roomName: `Phỏng vấn — ${candidate.position} — ${candidate.name}`,
                    scheduledAt,
                    durationMinutes: 60,
                    meetingUrl,
                    note: data.note || undefined,
                });
            } catch (err) {
                console.error("createInterview (email) failed:", err);
                // Stage update already succeeded — just warn, don't rollback
                alert("Trạng thái đã được cập nhật, nhưng không thể tạo lịch phỏng vấn / gửi email. Vui lòng tạo lại lịch thủ công.");
            }
        }

        setIsConfirming(false);
    }, [pendingMove]);

    const handleModalClose = useCallback(() => {
        setIsModalOpen(false);
        setPendingMove(null);
    }, []);

    // Global mouse move & up listeners for drag-and-drop
    useEffect(() => {
        if (!dragState) return;

        const onMouseMove = (e: MouseEvent) => {
            setDragState((prev) => prev ? { ...prev, x: e.clientX, y: e.clientY } : null);

            let found: StageId | null = null;
            for (const stageId of Object.keys(columnRefs.current) as StageId[]) {
                const el = columnRefs.current[stageId];
                if (!el) continue;
                const rect = el.getBoundingClientRect();
                if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
                    found = stageId;
                    break;
                }
            }
            setDragOverStage(found);
        };

        const onMouseUp = () => {
            if (dragState && dragOverStage && dragOverStage !== dragState.fromStage) {
                // Open modal instead of calling API directly
                requestMove(dragState.candidateId, dragState.fromStage, dragOverStage);
            }
            setDragState(null);
            setDragOverStage(null);
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
        document.body.style.userSelect = "none";

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
            document.body.style.userSelect = "";
        };
    }, [dragState, dragOverStage, requestMove]);

    const allPositions = useMemo(() => {
        const set = new Set<string>();
        for (const stage of Object.values(boardData)) {
            for (const c of stage) set.add(c.position);
        }
        return Array.from(set);
    }, [boardData]);

    const filteredBoard = useMemo(() => {
        const result: Record<StageId, PipelineCandidate[]> = {
            APPLIED: [], INTERVIEW: [], HIRED: [], REJECTED: []
        };
        for (const stage of stages) {
            let candidates = boardData[stage.id] || [];
            if (search.trim()) {
                const q = search.toLowerCase();
                candidates = candidates.filter(
                    (c) => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.tags.some((t) => t.toLowerCase().includes(q))
                );
            }
            if (positionFilter !== "all") {
                candidates = candidates.filter((c) => c.position === positionFilter);
            }
            result[stage.id] = candidates;
        }
        return result;
    }, [boardData, search, positionFilter]);

    const totalCandidates = Object.values(boardData).reduce((s, arr) => s + arr.length, 0);
    const isDraggingId = dragState?.candidateId ?? null;

    return (
        <PageSection maxWidth="max-w-[1400px]">
            {/* Floating Ghost Card */}
            {dragState && <DragGhost dragState={dragState} />}

            {/* Stage Update / Interview Modal */}
            <StageUpdateModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onConfirm={handleConfirm}
                candidate={pendingMove ? {
                    id: pendingMove.candidateId,
                    fullName: pendingMove.candidate.name,
                    avatarUrl: pendingMove.candidate.avatar,
                    position: pendingMove.candidate.position,
                    aiScore: pendingMove.candidate.aiScore,
                } : null}
                fromStage={pendingMove ? toModalStage(pendingMove.from) : "applied"}
                toStage={pendingMove ? toModalStage(pendingMove.to) : "interview"}
            />

            {/* Confirming overlay */}
            {isConfirming && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/20 backdrop-blur-sm">
                    <div className="bg-white dark:bg-[#1C252E] rounded-2xl px-6 py-4 shadow-2xl flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full border-2 border-[#22c55e] border-t-transparent animate-spin" />
                        <p className="text-sm font-semibold text-[#1C252E] dark:text-white">Đang xử lý & gửi email...</p>
                    </div>
                </div>
            )}

            {/* Header */}
            <motion.div initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <div className="flex items-center gap-2">
                            <Kanban className="w-6 h-6 text-[#22c55e]" />
                            <h1 className="text-2xl font-bold text-[#1C252E] dark:text-white">Pipeline tuyển dụng</h1>
                        </div>
                        <p className="text-sm text-[#637381] dark:text-[#919EAB] mt-1">
                            {isLoading ? "Đang tải dữ liệu..." : `${totalCandidates} ứng viên đang trong pipeline — Kéo thả hoặc dùng menu để chuyển giai đoạn`}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Tìm ứng viên..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-9 pr-4 py-2 text-sm bg-white dark:bg-[#1C252E] border border-[rgba(145,158,171,0.2)] dark:border-white/[0.08] rounded-xl text-[#1C252E] dark:text-white placeholder:text-[#919EAB] focus:outline-none focus:ring-2 focus:ring-[#22c55e]/30 focus:border-[#22c55e]/30 transition-all w-48"
                            />
                        </div>
                        <div className="relative">
                            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                            <select
                                value={positionFilter}
                                onChange={(e) => setPositionFilter(e.target.value)}
                                className="appearance-none pl-8 pr-8 py-2 text-sm bg-white dark:bg-[#1C252E] border border-[rgba(145,158,171,0.2)] dark:border-white/[0.08] rounded-xl text-[#1C252E] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#22c55e]/30 focus:border-[#22c55e]/30 cursor-pointer"
                            >
                                <option value="all">Tất cả vị trí</option>
                                {allPositions.map((p) => (
                                    <option key={p} value={p}>{p}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Kanban Board */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex gap-4 overflow-x-auto pb-4 snap-x"
            >
                {stages.map((stage, si) => {
                    const candidates = filteredBoard[stage.id];
                    const isDropTarget = dragOverStage === stage.id && dragState?.fromStage !== stage.id;

                    return (
                        <motion.div
                            key={stage.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + si * 0.06 }}
                            className="flex-shrink-0 w-[260px] snap-start"
                        >
                            {/* Column Header */}
                            <div className={cn("rounded-t-xl px-3 py-2.5 flex items-center justify-between transition-colors", stage.headerBg, isDropTarget && "brightness-110")}>
                                <div className="flex items-center gap-2">
                                    <span className={cn("w-2 h-2 rounded-full transition-transform", stage.dot, isDropTarget && "scale-125")} />
                                    <span className={cn("text-xs font-bold", stage.color)}>{stage.label}</span>
                                </div>
                                <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded-full", stage.bg, stage.color)}>
                                    {candidates.length}
                                </span>
                            </div>

                            {/* Cards Drop Zone */}
                            <div
                                ref={(el) => { if (el) columnRefs.current[stage.id] = el; }}
                                className={cn(
                                    "rounded-b-xl min-h-[400px] p-2 space-y-2 border border-t-0 transition-all duration-150",
                                    stage.bg,
                                    isDropTarget
                                        ? "border-[#22c55e]/30 dark:border-[#22c55e]/30 ring-2 ring-inset ring-[#22c55e]/50 dark:ring-[#22c55e]/50"
                                        : "border-[rgba(145,158,171,0.12)] dark:border-white/[0.08]"
                                )}
                            >
                                <AnimatePresence mode="popLayout">
                                    {candidates.map((candidate) => (
                                        <CandidateCard
                                            key={candidate.id}
                                            candidate={candidate}
                                            stageId={stage.id}
                                            onRequestMove={requestMove}
                                            onDragStarted={setDragState}
                                            isDragging={isDraggingId === candidate.id}
                                        />
                                    ))}
                                </AnimatePresence>

                                {/* Empty state / Drop indicator */}
                                {candidates.length === 0 && !isDropTarget && (
                                    <div className="flex flex-col items-center justify-center py-8 text-center rounded-lg border-2 border-dashed border-[rgba(145,158,171,0.15)] dark:border-white/[0.06] mx-1">
                                        <GripVertical className="w-6 h-6 text-[#C4CDD5] dark:text-[#637381] mb-1" />
                                        <p className="text-[10px] text-[#C4CDD5] dark:text-[#637381] font-medium">Chưa có ứng viên</p>
                                    </div>
                                )}
                                {isDropTarget && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        className="rounded-xl border-2 border-dashed border-[#22c55e]/30 dark:border-[#22c55e]/30 bg-[#22c55e]/10 dark:bg-[#22c55e]/20 p-4 flex items-center justify-center"
                                    >
                                        <p className="text-xs font-semibold text-[#22c55e] dark:text-[#22c55e]">Thả vào đây</p>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>

            {/* Summary Bar */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-4 flex items-center justify-between rounded-xl bg-white dark:bg-[#1C252E] border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] px-5 py-3"
            >
                <div className="flex items-center gap-4 flex-wrap">
                    {stages.map((stage) => (
                        <div key={stage.id} className="flex items-center gap-1.5">
                            <span className={cn("w-2 h-2 rounded-full", stage.dot)} />
                            <span className="text-[10px] text-[#637381] dark:text-[#919EAB] font-medium">{stage.label}</span>
                            <span className={cn("text-[10px] font-bold", stage.color)}>
                                {filteredBoard[stage.id].length}
                            </span>
                        </div>
                    ))}
                </div>
                <span className="text-[10px] text-[#919EAB]">
                    Tổng: {Object.values(filteredBoard).reduce((s, arr) => s + arr.length, 0)} ứng viên
                </span>
            </motion.div>
        </PageSection>
    );
}
