/**
 * ═══════════════════════════════════════════════════════════
 *  Pipeline Fixtures
 *  Board state data per job posting.
 *  Provides typed mock data for the Kanban pipeline board.
 * ═══════════════════════════════════════════════════════════
 */

// ─── Types ───────────────────────────────────────────

export type StageId = "applied" | "interview" | "hired" | "rejected";

export interface PipelineCandidate {
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

export type BoardState = Record<StageId, PipelineCandidate[]>;

export interface PipelineJob {
    jobId: string;
    title: string;
    department: string;
    totalCandidates: number;
    board: BoardState;
}

export interface StageNote {
    id: string;
    candidateId: string;
    fromStage: StageId;
    toStage: StageId;
    note: string;
    author: string;
    createdAt: string;
}

export interface PipelineStageConfig {
    id: StageId;
    label: string;
    color: string;
    bg: string;
    headerBg: string;
    dot: string;
}

// ─── Stage Config ────────────────────────────────────

export const PIPELINE_STAGES: PipelineStageConfig[] = [
    { id: "applied", label: "Ứng tuyển", color: "text-sky-700", bg: "bg-sky-50", headerBg: "bg-sky-100", dot: "bg-sky-400" },
    { id: "interview", label: "Phỏng vấn", color: "text-amber-700", bg: "bg-amber-50", headerBg: "bg-amber-100", dot: "bg-amber-400" },
    { id: "hired", label: "Đã tuyển", color: "text-teal-700", bg: "bg-teal-50", headerBg: "bg-teal-100", dot: "bg-teal-400" },
    { id: "rejected", label: "Từ chối", color: "text-rose-700", bg: "bg-rose-50", headerBg: "bg-rose-100", dot: "bg-rose-400" },
];

// ─── Job 1: Senior React Developer ────────────────────

const frontendBoard: BoardState = {
    applied: [
        { id: "fe-c1", name: "Nguyễn Văn An", avatar: "NVA", email: "nguyenvanan@gmail.com", position: "Senior React Developer", aiScore: 82, appliedDate: "2 ngày trước", daysInStage: 2, tags: ["React", "TypeScript"] },
        { id: "fe-c2", name: "Trần Thị Bảo", avatar: "TTB", email: "tranthibao@gmail.com", position: "Senior React Developer", aiScore: 75, appliedDate: "3 ngày trước", daysInStage: 3, tags: ["Vue.js", "CSS"] },
        { id: "fe-c3", name: "Lê Minh Cường", avatar: "LMC", email: "leminhcuong@gmail.com", position: "Senior React Developer", aiScore: 91, appliedDate: "1 ngày trước", daysInStage: 1, tags: ["React", "Next.js", "GraphQL"] },
        { id: "fe-c4", name: "Phạm Ngọc Dung", avatar: "PND", email: "phamngocdung@gmail.com", position: "Senior React Developer", aiScore: 68, appliedDate: "4 ngày trước", daysInStage: 4, tags: ["Angular", "RxJS"] },
    ],
    interview: [
        { id: "fe-c7", name: "Đặng Quốc Gia", avatar: "DQG", email: "dangquocgia@gmail.com", position: "Senior React Developer", aiScore: 94, appliedDate: "10 ngày trước", daysInStage: 3, tags: ["React", "TypeScript", "AWS"] },
        { id: "fe-c8", name: "Bùi Thanh Hải", avatar: "BTH", email: "buithanhai@gmail.com", position: "Senior React Developer", aiScore: 86, appliedDate: "8 ngày trước", daysInStage: 2, tags: ["React", "Node.js"] },
    ],
    hired: [
        { id: "fe-c10", name: "Lý Minh Long", avatar: "LML", email: "lyminhlong@gmail.com", position: "Senior React Developer", aiScore: 90, appliedDate: "20 ngày trước", daysInStage: 0, tags: ["React", "Next.js"] },
    ],
    rejected: [
        { id: "fe-c11", name: "Mai Phương Nam", avatar: "MPN", email: "maiphuongnam@gmail.com", position: "Senior React Developer", aiScore: 45, appliedDate: "7 ngày trước", daysInStage: 1, tags: ["jQuery"] },
    ],
};

// ─── Job 2: Backend Engineer (Go) ─────────────────────

const backendBoard: BoardState = {
    applied: [
        { id: "be-c1", name: "Trịnh Anh Tuấn", avatar: "TAT", email: "trinhanhtuan@gmail.com", position: "Backend Engineer (Go)", aiScore: 85, appliedDate: "1 ngày trước", daysInStage: 1, tags: ["Go", "gRPC", "PostgreSQL"] },
        { id: "be-c2", name: "Ngô Thị Mai", avatar: "NTM", email: "ngothimai@gmail.com", position: "Backend Engineer (Go)", aiScore: 72, appliedDate: "2 ngày trước", daysInStage: 2, tags: ["Go", "REST", "Redis"] },
        { id: "be-c3", name: "Phan Văn Sơn", avatar: "PVS", email: "phanvanson@gmail.com", position: "Backend Engineer (Go)", aiScore: 78, appliedDate: "3 ngày trước", daysInStage: 3, tags: ["Go", "Docker", "K8s"] },
    ],
    interview: [
        { id: "be-c5", name: "Lương Thị Quỳnh", avatar: "LTQ", email: "luongthiquynh@gmail.com", position: "Backend Engineer (Go)", aiScore: 88, appliedDate: "8 ngày trước", daysInStage: 3, tags: ["Go", "gRPC", "CI/CD"] },
        { id: "be-c6", name: "Hà Xuân Trường", avatar: "HXT", email: "haxuantruong@gmail.com", position: "Backend Engineer (Go)", aiScore: 83, appliedDate: "9 ngày trước", daysInStage: 4, tags: ["Go", "PostgreSQL"] },
    ],
    hired: [],
    rejected: [
        { id: "be-c7", name: "Tô Minh Uy", avatar: "TMU", email: "tominhuy@gmail.com", position: "Backend Engineer (Go)", aiScore: 48, appliedDate: "6 ngày trước", daysInStage: 1, tags: ["Python"] },
    ],
};

// ─── Job 3: DevOps Engineer ───────────────────────────

const devopsBoard: BoardState = {
    applied: [
        { id: "do-c1", name: "Châu Quốc Vĩnh", avatar: "CQV", email: "chauquocvinh@gmail.com", position: "DevOps Engineer", aiScore: 80, appliedDate: "2 ngày trước", daysInStage: 2, tags: ["Docker", "K8s", "Terraform"] },
        { id: "do-c2", name: "Kiều Anh Xuân", avatar: "KAX", email: "kieuanhxuan@gmail.com", position: "DevOps Engineer", aiScore: 74, appliedDate: "3 ngày trước", daysInStage: 3, tags: ["AWS", "CI/CD"] },
    ],
    interview: [
        { id: "do-c4", name: "Lâm Hoàng Zung", avatar: "LHZ", email: "lamhoangzung@gmail.com", position: "DevOps Engineer", aiScore: 87, appliedDate: "7 ngày trước", daysInStage: 2, tags: ["Docker", "Jenkins", "GCP"] },
    ],
    hired: [],
    rejected: [],
};

// ─── Job 4: UI/UX Designer ────────────────────────────

const designBoard: BoardState = {
    applied: [
        { id: "ux-c1", name: "Trương Thuý Hà", avatar: "TTH", email: "truongthuyhа@gmail.com", position: "UI/UX Designer", aiScore: 77, appliedDate: "1 ngày trước", daysInStage: 1, tags: ["Figma", "Design System"] },
    ],
    interview: [],
    hired: [
        { id: "ux-c4", name: "Đoàn Thanh Mai", avatar: "DTM", email: "doanthanhmai@gmail.com", position: "UI/UX Designer", aiScore: 93, appliedDate: "18 ngày trước", daysInStage: 0, tags: ["Figma", "Design System", "Motion"] },
    ],
    rejected: [
        { id: "ux-c5", name: "Võ Tuấn Ngọc", avatar: "VTN", email: "votuanngoc@gmail.com", position: "UI/UX Designer", aiScore: 42, appliedDate: "6 ngày trước", daysInStage: 2, tags: ["Canva"] },
    ],
};

// ─── All Pipeline Jobs ───────────────────────────────

function countBoard(board: BoardState): number {
    return Object.values(board).reduce((sum, arr) => sum + arr.length, 0);
}

export const pipelineJobs: PipelineJob[] = [
    {
        jobId: "job-fe-01",
        title: "Senior React Developer",
        department: "Engineering",
        totalCandidates: countBoard(frontendBoard),
        board: frontendBoard,
    },
    {
        jobId: "job-be-01",
        title: "Backend Engineer (Go)",
        department: "Engineering",
        totalCandidates: countBoard(backendBoard),
        board: backendBoard,
    },
    {
        jobId: "job-do-01",
        title: "DevOps Engineer",
        department: "Infrastructure",
        totalCandidates: countBoard(devopsBoard),
        board: devopsBoard,
    },
    {
        jobId: "job-ux-01",
        title: "UI/UX Designer",
        department: "Design",
        totalCandidates: countBoard(designBoard),
        board: designBoard,
    },
];

// ─── Stage Notes ─────────────────────────────────────

export const mockStageNotes: StageNote[] = [
    { id: "n1", candidateId: "fe-c7", fromStage: "applied", toStage: "interview", note: "CV ấn tượng, kinh nghiệm 5 năm React. Lên lịch phỏng vấn kỹ thuật.", author: "Trần Thị Bảo", createdAt: "2025-12-01T10:30:00" },
    { id: "n2", candidateId: "fe-c9", fromStage: "interview", toStage: "hired", note: "Phỏng vấn xuất sắc. Kỹ năng leadership tốt.", author: "Trần Thị Bảo", createdAt: "2025-12-05T14:00:00" },
    { id: "n3", candidateId: "fe-c10", fromStage: "interview", toStage: "hired", note: "Đã chấp nhận offer. Mức lương 45M. Bắt đầu 15/12.", author: "HR Team", createdAt: "2025-12-08T09:00:00" },
    { id: "n4", candidateId: "fe-c11", fromStage: "applied", toStage: "rejected", note: "Không đáp ứng yêu cầu kỹ thuật cơ bản. Chưa có kinh nghiệm React.", author: "Trần Thị Bảo", createdAt: "2025-12-02T16:00:00" },
    { id: "n5", candidateId: "be-c5", fromStage: "applied", toStage: "interview", note: "Kinh nghiệm Go 3 năm, hiểu biết microservices. Phỏng vấn system design.", author: "Lê Hoàng Cường", createdAt: "2025-12-03T11:00:00" },
    { id: "n6", candidateId: "do-c5", fromStage: "interview", toStage: "hired", note: "Kết quả phỏng vấn rất tốt. Chuyên gia IaC. Gửi offer ASAP.", author: "Lê Hoàng Cường", createdAt: "2025-12-06T13:00:00" },
    { id: "n7", candidateId: "ux-c4", fromStage: "interview", toStage: "hired", note: "Designer xuất sắc, portfolio ấn tượng. Đã nhận offer.", author: "HR Team", createdAt: "2025-12-04T10:00:00" },
    { id: "n8", candidateId: "be-c7", fromStage: "applied", toStage: "rejected", note: "Ứng tuyển Backend Go nhưng chỉ có kinh nghiệm Python. Không phù hợp.", author: "Lê Hoàng Cường", createdAt: "2025-12-02T15:30:00" },
];

// ─── Utility Functions ───────────────────────────────

/** Get board for a specific job */
export function getBoardByJobId(jobId: string): BoardState | null {
    const job = pipelineJobs.find((j) => j.jobId === jobId);
    return job?.board ?? null;
}

/** Get notes for a specific candidate */
export function getNotesByCandidate(candidateId: string): StageNote[] {
    return mockStageNotes.filter((n) => n.candidateId === candidateId);
}

/** Get candidates in a specific stage across all jobs */
export function getCandidatesByStage(stageId: StageId): PipelineCandidate[] {
    return pipelineJobs.flatMap((job) => job.board[stageId]);
}

/** Get stage distribution for a job */
export function getStageDistribution(jobId: string): Record<StageId, number> {
    const board = getBoardByJobId(jobId);
    if (!board) return { applied: 0, interview: 0, hired: 0, rejected: 0 };
    return {
        applied: board.applied.length,
        interview: board.interview.length,
        hired: board.hired.length,
        rejected: board.rejected.length,
    };
}

/** Get average AI score per stage for a job */
export function getAvgScoreByStage(jobId: string): Record<StageId, number> {
    const board = getBoardByJobId(jobId);
    if (!board) return { applied: 0, interview: 0, hired: 0, rejected: 0 };

    const avg = (arr: PipelineCandidate[]) =>
        arr.length > 0 ? Math.round(arr.reduce((s, c) => s + c.aiScore, 0) / arr.length) : 0;

    return {
        applied: avg(board.applied),
        interview: avg(board.interview),
        hired: avg(board.hired),
        rejected: avg(board.rejected),
    };
}

/** Get conversion rate between consecutive stages */
export function getConversionRates(jobId: string): { from: string; to: string; rate: number }[] {
    const dist = getStageDistribution(jobId);
    const order: StageId[] = ["applied", "interview", "hired"];
    const results: { from: string; to: string; rate: number }[] = [];

    for (let i = 0; i < order.length - 1; i++) {
        const fromCount = dist[order[i]];
        const toCount = dist[order[i + 1]];
        const rate = fromCount > 0 ? Math.round((toCount / fromCount) * 100) : 0;
        results.push({
            from: PIPELINE_STAGES.find((s) => s.id === order[i])?.label ?? order[i],
            to: PIPELINE_STAGES.find((s) => s.id === order[i + 1])?.label ?? order[i + 1],
            rate,
        });
    }
    return results;
}

/** Get pipeline summary across all jobs */
export function getPipelineSummary() {
    return {
        totalJobs: pipelineJobs.length,
        totalCandidates: pipelineJobs.reduce((s, j) => s + j.totalCandidates, 0),
        totalNotes: mockStageNotes.length,
        stageDistribution: {
            applied: getCandidatesByStage("applied").length,
            interview: getCandidatesByStage("interview").length,
            hired: getCandidatesByStage("hired").length,
            rejected: getCandidatesByStage("rejected").length,
        },
    };
}
