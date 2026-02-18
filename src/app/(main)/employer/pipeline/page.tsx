"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Kanban,
    Search,
    User,
    Mail,
    Clock,
    Star,
    MoreHorizontal,
    Eye,
    MessageSquare,
    ArrowRight,
    ArrowLeft,
    ChevronDown,
    GripVertical,
    Briefcase,
} from "lucide-react";
import { cn } from "@/shared/utils/cn";

// ─── Types ───────────────────────────────────────────
type StageId = "applied" | "screening" | "interview" | "offer" | "hired" | "rejected";

interface PipelineCandidate {
    id: string;
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

// ─── Stage Config ────────────────────────────────────
const stages: PipelineStage[] = [
    { id: "applied", label: "Ứng tuyển", color: "text-sky-700", bg: "bg-sky-50", headerBg: "bg-sky-100", dot: "bg-sky-400" },
    { id: "screening", label: "Sàng lọc", color: "text-violet-700", bg: "bg-violet-50", headerBg: "bg-violet-100", dot: "bg-violet-400" },
    { id: "interview", label: "Phỏng vấn", color: "text-amber-700", bg: "bg-amber-50", headerBg: "bg-amber-100", dot: "bg-amber-400" },
    { id: "offer", label: "Đề nghị", color: "text-emerald-700", bg: "bg-emerald-50", headerBg: "bg-emerald-100", dot: "bg-emerald-400" },
    { id: "hired", label: "Đã tuyển", color: "text-teal-700", bg: "bg-teal-50", headerBg: "bg-teal-100", dot: "bg-teal-400" },
    { id: "rejected", label: "Từ chối", color: "text-rose-700", bg: "bg-rose-50", headerBg: "bg-rose-100", dot: "bg-rose-400" },
];

// ─── Mock Data ───────────────────────────────────────
const initialCandidates: Record<StageId, PipelineCandidate[]> = {
    applied: [
        { id: "c1", name: "Nguyễn Văn An", avatar: "NVA", email: "nguyenvanan@gmail.com", position: "Frontend Developer", aiScore: 82, appliedDate: "2 ngày trước", daysInStage: 2, tags: ["React", "TypeScript"] },
        { id: "c2", name: "Trần Thị Bảo", avatar: "TTB", email: "tranthibao@gmail.com", position: "Frontend Developer", aiScore: 75, appliedDate: "3 ngày trước", daysInStage: 3, tags: ["Vue.js", "CSS"] },
        { id: "c3", name: "Lê Minh Cường", avatar: "LMC", email: "leminhcuong@gmail.com", position: "Backend Developer", aiScore: 91, appliedDate: "1 ngày trước", daysInStage: 1, tags: ["Node.js", "PostgreSQL"] },
        { id: "c4", name: "Phạm Ngọc Dung", avatar: "PND", email: "phamngocdung@gmail.com", position: "UI/UX Designer", aiScore: 68, appliedDate: "4 ngày trước", daysInStage: 4, tags: ["Figma", "Design System"] },
    ],
    screening: [
        { id: "c5", name: "Hoàng Đức Em", avatar: "HDE", email: "hoangducem@gmail.com", position: "Frontend Developer", aiScore: 88, appliedDate: "5 ngày trước", daysInStage: 2, tags: ["React", "Next.js"] },
        { id: "c6", name: "Vũ Thị Phương", avatar: "VTP", email: "vuthiphuong@gmail.com", position: "Backend Developer", aiScore: 79, appliedDate: "6 ngày trước", daysInStage: 3, tags: ["Java", "Spring Boot"] },
    ],
    interview: [
        { id: "c7", name: "Đặng Quốc Gia", avatar: "DQG", email: "dangquocgia@gmail.com", position: "Full-Stack Developer", aiScore: 94, appliedDate: "10 ngày trước", daysInStage: 3, tags: ["React", "Node.js", "AWS"] },
        { id: "c8", name: "Bùi Thanh Hải", avatar: "BTH", email: "buithanhai@gmail.com", position: "DevOps Engineer", aiScore: 86, appliedDate: "8 ngày trước", daysInStage: 2, tags: ["Docker", "K8s", "CI/CD"] },
        { id: "c9", name: "Cao Thị Ivy", avatar: "CTI", email: "caothiivy@gmail.com", position: "Frontend Developer", aiScore: 72, appliedDate: "12 ngày trước", daysInStage: 5, tags: ["Angular", "RxJS"] },
    ],
    offer: [
        { id: "c10", name: "Đinh Quốc Khánh", avatar: "DQK", email: "dinhquockhanh@gmail.com", position: "Senior React Developer", aiScore: 96, appliedDate: "15 ngày trước", daysInStage: 2, tags: ["React", "TypeScript", "Lead"] },
    ],
    hired: [
        { id: "c11", name: "Lý Minh Long", avatar: "LML", email: "lyminhlong@gmail.com", position: "Backend Developer", aiScore: 90, appliedDate: "20 ngày trước", daysInStage: 0, tags: ["Go", "gRPC", "Microservices"] },
    ],
    rejected: [
        { id: "c12", name: "Mai Phương Nam", avatar: "MPN", email: "maiphuongnam@gmail.com", position: "Frontend Developer", aiScore: 45, appliedDate: "7 ngày trước", daysInStage: 1, tags: ["jQuery"] },
        { id: "c13", name: "Ngô Văn Oanh", avatar: "NVO", email: "ngovanoanh@gmail.com", position: "QA Engineer", aiScore: 52, appliedDate: "9 ngày trước", daysInStage: 2, tags: ["Manual Testing"] },
    ],
};

// ─── Score Badge ──────────────────────────────────────
function ScoreBadge({ score }: { readonly score: number }) {
    const color =
        score >= 85 ? "bg-emerald-100 text-emerald-700" :
        score >= 70 ? "bg-sky-100 text-sky-700" :
        score >= 55 ? "bg-amber-100 text-amber-700" :
        "bg-rose-100 text-rose-700";

    return (
        <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5", color)}>
            <Star className="w-2.5 h-2.5" /> {score}
        </span>
    );
}

// ─── Candidate Card ──────────────────────────────────
function CandidateCard({
    candidate,
    stageId,
    onMove,
}: {
    readonly candidate: PipelineCandidate;
    readonly stageId: StageId;
    readonly onMove: (candidateId: string, from: StageId, to: StageId) => void;
}) {
    const [showActions, setShowActions] = useState(false);
    const stageIndex = stages.findIndex((s) => s.id === stageId);
    const canMoveLeft = stageIndex > 0;
    const canMoveRight = stageIndex < stages.length - 1;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-xl border border-slate-100 p-3 shadow-sm hover:shadow-md transition-shadow group cursor-grab active:cursor-grabbing"
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-100 to-violet-100 flex items-center justify-center text-[10px] font-bold text-sky-700 shrink-0">
                        {candidate.avatar}
                    </div>
                    <div className="min-w-0">
                        <p className="text-sm font-semibold text-sky-900 truncate">{candidate.name}</p>
                        <p className="text-[10px] text-slate-400 truncate">{candidate.position}</p>
                    </div>
                </div>
                <div className="relative">
                    <button
                        onClick={() => setShowActions(!showActions)}
                        className="w-6 h-6 rounded-md flex items-center justify-center hover:bg-slate-100 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
                    >
                        <MoreHorizontal className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                    <AnimatePresence>
                        {showActions && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="absolute right-0 top-7 z-20 bg-white rounded-lg border border-slate-100 shadow-lg py-1 min-w-[140px]"
                            >
                                <button className="w-full px-3 py-1.5 text-xs text-left hover:bg-slate-50 flex items-center gap-2 text-slate-600 cursor-pointer">
                                    <Eye className="w-3 h-3" /> Xem hồ sơ
                                </button>
                                <button className="w-full px-3 py-1.5 text-xs text-left hover:bg-slate-50 flex items-center gap-2 text-slate-600 cursor-pointer">
                                    <MessageSquare className="w-3 h-3" /> Gửi tin nhắn
                                </button>
                                <button className="w-full px-3 py-1.5 text-xs text-left hover:bg-slate-50 flex items-center gap-2 text-slate-600 cursor-pointer">
                                    <Mail className="w-3 h-3" /> Gửi email
                                </button>
                                {canMoveLeft && (
                                    <button
                                        onClick={() => { onMove(candidate.id, stageId, stages[stageIndex - 1].id); setShowActions(false); }}
                                        className="w-full px-3 py-1.5 text-xs text-left hover:bg-slate-50 flex items-center gap-2 text-amber-600 cursor-pointer"
                                    >
                                        <ArrowLeft className="w-3 h-3" /> Lùi về {stages[stageIndex - 1].label}
                                    </button>
                                )}
                                {canMoveRight && (
                                    <button
                                        onClick={() => { onMove(candidate.id, stageId, stages[stageIndex + 1].id); setShowActions(false); }}
                                        className="w-full px-3 py-1.5 text-xs text-left hover:bg-slate-50 flex items-center gap-2 text-emerald-600 cursor-pointer"
                                    >
                                        <ArrowRight className="w-3 h-3" /> Chuyển {stages[stageIndex + 1].label}
                                    </button>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-2">
                {candidate.tags.map((tag) => (
                    <span key={tag} className="text-[9px] font-medium px-1.5 py-0.5 rounded-md bg-slate-50 text-slate-500">
                        {tag}
                    </span>
                ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                <div className="flex items-center gap-1 text-[10px] text-slate-400">
                    <Clock className="w-2.5 h-2.5" />
                    {candidate.daysInStage > 0 ? `${candidate.daysInStage} ngày` : "Hôm nay"}
                </div>
                <ScoreBadge score={candidate.aiScore} />
            </div>
        </motion.div>
    );
}

// ─── Main Page ───────────────────────────────────────
export default function PipelineBoardPage() {
    const [boardData, setBoardData] = useState(initialCandidates);
    const [search, setSearch] = useState("");
    const [positionFilter, setPositionFilter] = useState("all");

    const handleMove = (candidateId: string, from: StageId, to: StageId) => {
        setBoardData((prev) => {
            const candidate = prev[from].find((c) => c.id === candidateId);
            if (!candidate) return prev;
            return {
                ...prev,
                [from]: prev[from].filter((c) => c.id !== candidateId),
                [to]: [...prev[to], { ...candidate, daysInStage: 0 }],
            };
        });
    };

    const allPositions = useMemo(() => {
        const set = new Set<string>();
        for (const stage of Object.values(initialCandidates)) {
            for (const c of stage) set.add(c.position);
        }
        return Array.from(set);
    }, []);

    const filteredBoard = useMemo(() => {
        const result: Record<StageId, PipelineCandidate[]> = { applied: [], screening: [], interview: [], offer: [], hired: [], rejected: [] };
        for (const stage of stages) {
            let candidates = boardData[stage.id];
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

    return (
        <section className="relative z-10 pt-24 pb-12 md:pt-28">
            <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6"
                >
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <div className="flex items-center gap-2">
                                <Kanban className="w-6 h-6 text-sky-600" />
                                <h1 className="text-2xl font-bold text-sky-900">Pipeline tuyển dụng</h1>
                            </div>
                            <p className="text-sm text-slate-500 mt-1">
                                {totalCandidates} ứng viên đang trong pipeline — Kéo thả hoặc dùng menu để chuyển giai đoạn
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
                                    className="pl-9 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 transition-all w-48"
                                />
                            </div>
                            <div className="relative">
                                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                                <select
                                    value={positionFilter}
                                    onChange={(e) => setPositionFilter(e.target.value)}
                                    className="appearance-none pl-8 pr-8 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 cursor-pointer"
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
                        return (
                            <motion.div
                                key={stage.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + si * 0.06 }}
                                className="flex-shrink-0 w-[260px] snap-start"
                            >
                                {/* Column Header */}
                                <div className={cn("rounded-t-xl px-3 py-2.5 flex items-center justify-between", stage.headerBg)}>
                                    <div className="flex items-center gap-2">
                                        <span className={cn("w-2 h-2 rounded-full", stage.dot)} />
                                        <span className={cn("text-xs font-bold", stage.color)}>{stage.label}</span>
                                    </div>
                                    <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded-full", stage.bg, stage.color)}>
                                        {candidates.length}
                                    </span>
                                </div>

                                {/* Cards Container */}
                                <div className={cn("rounded-b-xl min-h-[400px] p-2 space-y-2 border border-t-0 border-slate-100", stage.bg, "bg-opacity-30")}>
                                    <AnimatePresence mode="popLayout">
                                        {candidates.map((candidate) => (
                                            <CandidateCard
                                                key={candidate.id}
                                                candidate={candidate}
                                                stageId={stage.id}
                                                onMove={handleMove}
                                            />
                                        ))}
                                    </AnimatePresence>

                                    {candidates.length === 0 && (
                                        <div className="flex flex-col items-center justify-center py-8 text-center">
                                            <GripVertical className="w-6 h-6 text-slate-200 mb-1" />
                                            <p className="text-[10px] text-slate-300 font-medium">Chưa có ứng viên</p>
                                        </div>
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
                    className="mt-4 flex items-center justify-between rounded-xl bg-white border border-slate-100 px-5 py-3"
                >
                    <div className="flex items-center gap-4">
                        {stages.map((stage) => (
                            <div key={stage.id} className="flex items-center gap-1.5">
                                <span className={cn("w-2 h-2 rounded-full", stage.dot)} />
                                <span className="text-[10px] text-slate-500 font-medium">{stage.label}</span>
                                <span className={cn("text-[10px] font-bold", stage.color)}>
                                    {filteredBoard[stage.id].length}
                                </span>
                            </div>
                        ))}
                    </div>
                    <span className="text-[10px] text-slate-400">
                        Tổng: {Object.values(filteredBoard).reduce((s, arr) => s + arr.length, 0)} ứng viên
                    </span>
                </motion.div>
            </div>
        </section>
    );
}
