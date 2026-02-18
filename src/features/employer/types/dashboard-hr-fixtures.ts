/**
 * ═══════════════════════════════════════════════════════════
 *  HR Dashboard Fixtures
 *  Mock data cho HR Dashboard — dùng để phát triển UI/UX
 *  và test mà không cần backend thật.
 * ═══════════════════════════════════════════════════════════
 */

// ─── Types ───────────────────────────────────────────
export interface HRStatCard {
    id: string;
    label: string;
    value: number;
    displayValue: string;
    change: string;
    trend: "up" | "down";
    icon: string;
    color: string;
}

export interface HRFunnelStage {
    id: string;
    label: string;
    count: number;
    color: string;
}

export interface HRTopJob {
    id: string;
    title: string;
    department: string;
    applicants: number;
    views: number;
    status: "hot" | "active" | "closing" | "closed";
    postedDate: string;
}

export interface HRRecentActivity {
    id: string;
    action: string;
    subject: string;
    time: string;
    type: "application" | "interview" | "hired" | "posted" | "rejected";
}

export interface HRPassRateRow {
    position: string;
    department: string;
    totalApplicants: number;
    passed: number;
    passRate: number;
    prevRate: number;
    avgTimeToHire: number;
}

export interface HRMissingSkill {
    skill: string;
    category: "technical" | "soft" | "tool" | "certification";
    demandCount: number;
    candidateGap: number;
    trend: "rising" | "stable" | "declining";
    suggestedAction?: string;
}

export interface HRDashboardFixture {
    metadata: {
        generatedAt: string;
        period: string;
        companyName: string;
    };
    stats: HRStatCard[];
    funnel: HRFunnelStage[];
    topJobs: HRTopJob[];
    recentActivities: HRRecentActivity[];
    passRates: HRPassRateRow[];
    missingSkills: HRMissingSkill[];
    weeklyApplicants: { week: string; count: number }[];
}

// ─── Fixture Data ────────────────────────────────────
export const hrDashboardFixture: HRDashboardFixture = {
    metadata: {
        generatedAt: "2026-02-17T00:00:00Z",
        period: "Tháng 2, 2026",
        companyName: "TechCorp Vietnam",
    },

    stats: [
        { id: "total-applicants", label: "Tổng ứng viên", value: 1284, displayValue: "1,284", change: "+12.5%", trend: "up", icon: "Users", color: "sky" },
        { id: "job-postings", label: "Tin tuyển dụng", value: 24, displayValue: "24", change: "+3", trend: "up", icon: "Briefcase", color: "violet" },
        { id: "interviewing", label: "Đang phỏng vấn", value: 38, displayValue: "38", change: "+8.2%", trend: "up", icon: "FileSearch", color: "emerald" },
        { id: "hired-this-month", label: "Đã tuyển tháng này", value: 7, displayValue: "7", change: "-2", trend: "down", icon: "UserCheck", color: "amber" },
    ],

    funnel: [
        { id: "applied", label: "Ứng tuyển", count: 1284, color: "sky" },
        { id: "screened", label: "Sàng lọc", count: 642, color: "violet" },
        { id: "interview", label: "Phỏng vấn", count: 198, color: "amber" },
        { id: "offer", label: "Offer", count: 45, color: "emerald" },
        { id: "hired", label: "Tuyển dụng", count: 32, color: "rose" },
    ],

    topJobs: [
        { id: "job-1", title: "Senior Frontend Developer", department: "Engineering", applicants: 142, views: 3200, status: "hot", postedDate: "2026-01-15" },
        { id: "job-2", title: "Backend Engineer (Node.js)", department: "Engineering", applicants: 98, views: 2100, status: "hot", postedDate: "2026-01-20" },
        { id: "job-3", title: "UX/UI Designer", department: "Design", applicants: 76, views: 1800, status: "active", postedDate: "2026-01-25" },
        { id: "job-4", title: "DevOps Engineer", department: "Infrastructure", applicants: 45, views: 1200, status: "active", postedDate: "2026-02-01" },
        { id: "job-5", title: "Data Analyst", department: "Data", applicants: 34, views: 890, status: "closing", postedDate: "2026-01-10" },
        { id: "job-6", title: "Product Manager", department: "Product", applicants: 28, views: 760, status: "active", postedDate: "2026-02-05" },
        { id: "job-7", title: "Mobile Developer (React Native)", department: "Engineering", applicants: 52, views: 1450, status: "hot", postedDate: "2026-02-03" },
        { id: "job-8", title: "QA Engineer", department: "Engineering", applicants: 38, views: 920, status: "closing", postedDate: "2026-01-08" },
    ],

    recentActivities: [
        { id: "a1", action: "Ứng viên mới ứng tuyển", subject: "Nguyễn Văn A — Senior Frontend Dev", time: "5 phút trước", type: "application" },
        { id: "a2", action: "Lên lịch phỏng vấn", subject: "Trần Thị B — UX Designer", time: "32 phút trước", type: "interview" },
        { id: "a3", action: "Đã tuyển dụng", subject: "Lê Văn C — Backend Engineer", time: "2 giờ trước", type: "hired" },
        { id: "a4", action: "Đăng tin mới", subject: "DevOps Engineer — Remote", time: "3 giờ trước", type: "posted" },
        { id: "a5", action: "Ứng viên mới ứng tuyển", subject: "Phạm Thị D — Data Analyst", time: "5 giờ trước", type: "application" },
        { id: "a6", action: "Ứng viên bị từ chối", subject: "Hoàng Văn E — Junior Dev", time: "6 giờ trước", type: "rejected" },
        { id: "a7", action: "Lên lịch phỏng vấn", subject: "Vũ Thị F — QA Engineer", time: "8 giờ trước", type: "interview" },
        { id: "a8", action: "Đã tuyển dụng", subject: "Đặng Văn G — DevOps", time: "1 ngày trước", type: "hired" },
        { id: "a9", action: "Đăng tin mới", subject: "Product Manager — Hybrid", time: "1 ngày trước", type: "posted" },
        { id: "a10", action: "Ứng viên mới ứng tuyển", subject: "Bùi Thị H — Mobile Dev", time: "2 ngày trước", type: "application" },
    ],

    passRates: [
        { position: "Senior Frontend Dev", department: "Engineering", totalApplicants: 142, passed: 12, passRate: 8.5, prevRate: 7.2, avgTimeToHire: 14 },
        { position: "Backend Engineer", department: "Engineering", totalApplicants: 98, passed: 15, passRate: 15.3, prevRate: 18.1, avgTimeToHire: 18 },
        { position: "UX/UI Designer", department: "Design", totalApplicants: 76, passed: 8, passRate: 10.5, prevRate: 10.5, avgTimeToHire: 12 },
        { position: "DevOps Engineer", department: "Infrastructure", totalApplicants: 45, passed: 5, passRate: 11.1, prevRate: 9.0, avgTimeToHire: 21 },
        { position: "Data Analyst", department: "Data", totalApplicants: 34, passed: 6, passRate: 17.6, prevRate: 15.0, avgTimeToHire: 10 },
        { position: "Product Manager", department: "Product", totalApplicants: 28, passed: 3, passRate: 10.7, prevRate: 12.5, avgTimeToHire: 24 },
        { position: "Mobile Developer", department: "Engineering", totalApplicants: 52, passed: 4, passRate: 7.7, prevRate: 6.1, avgTimeToHire: 16 },
        { position: "QA Engineer", department: "Engineering", totalApplicants: 38, passed: 7, passRate: 18.4, prevRate: 20.0, avgTimeToHire: 9 },
    ],

    missingSkills: [
        { skill: "TypeScript", category: "technical", demandCount: 18, candidateGap: 62, trend: "rising", suggestedAction: "Thêm vào yêu cầu tuyển dụng hoặc đào tạo nội bộ" },
        { skill: "System Design", category: "technical", demandCount: 12, candidateGap: 78, trend: "rising", suggestedAction: "Tổ chức mock interview về system design" },
        { skill: "CI/CD Pipeline", category: "tool", demandCount: 10, candidateGap: 55, trend: "stable", suggestedAction: "Workshop DevOps basics cho candidates" },
        { skill: "AWS / Cloud", category: "tool", demandCount: 14, candidateGap: 68, trend: "rising", suggestedAction: "Cân nhắc đào tạo AWS certification" },
        { skill: "Agile / Scrum", category: "soft", demandCount: 20, candidateGap: 35, trend: "stable" },
        { skill: "Leadership", category: "soft", demandCount: 8, candidateGap: 72, trend: "rising", suggestedAction: "Mentoring program cho senior candidates" },
        { skill: "Docker / K8s", category: "tool", demandCount: 11, candidateGap: 58, trend: "stable", suggestedAction: "Thêm Docker basics vào technical assessment" },
        { skill: "GraphQL", category: "technical", demandCount: 6, candidateGap: 45, trend: "declining" },
        { skill: "Data Analysis", category: "technical", demandCount: 9, candidateGap: 52, trend: "rising", suggestedAction: "Mở thêm vị trí data intern" },
        { skill: "PMP / PRINCE2", category: "certification", demandCount: 4, candidateGap: 85, trend: "stable", suggestedAction: "Sponsor certification cho internal PM" },
    ],

    weeklyApplicants: [
        { week: "T1", count: 45 },
        { week: "T2", count: 62 },
        { week: "T3", count: 38 },
        { week: "T4", count: 78 },
        { week: "T5", count: 55 },
        { week: "T6", count: 92 },
        { week: "T7", count: 67 },
        { week: "T8", count: 85 },
    ],
};

// ─── Utility Functions ───────────────────────────────

/** Get stats by ID */
export function getHRStatById(id: string) {
    return hrDashboardFixture.stats.find((s) => s.id === id);
}

/** Get funnel conversion rate between two stages */
export function getFunnelConversion(fromId: string, toId: string): number {
    const from = hrDashboardFixture.funnel.find((f) => f.id === fromId);
    const to = hrDashboardFixture.funnel.find((f) => f.id === toId);
    if (!from || !to || from.count === 0) return 0;
    return Math.round((to.count / from.count) * 100);
}

/** Get top jobs filtered by status */
export function getTopJobsByStatus(status?: HRTopJob["status"]) {
    if (!status) return hrDashboardFixture.topJobs;
    return hrDashboardFixture.topJobs.filter((j) => j.status === status);
}

/** Get activities filtered by type */
export function getActivitiesByType(type?: HRRecentActivity["type"]) {
    if (!type) return hrDashboardFixture.recentActivities;
    return hrDashboardFixture.recentActivities.filter((a) => a.type === type);
}

/** Get pass rates sorted by a field */
export function getPassRatesSorted(by: "passRate" | "totalApplicants" | "avgTimeToHire" = "passRate", desc = true) {
    return [...hrDashboardFixture.passRates].sort((a, b) => desc ? b[by] - a[by] : a[by] - b[by]);
}

/** Get critical missing skills (gap >= threshold) */
export function getCriticalSkills(threshold = 70) {
    return hrDashboardFixture.missingSkills.filter((s) => s.candidateGap >= threshold);
}

/** Get overall hiring rate */
export function getOverallHiringRate(): number {
    const funnel = hrDashboardFixture.funnel;
    if (funnel.length < 2) return 0;
    return Math.round((funnel[funnel.length - 1].count / funnel[0].count) * 100);
}
