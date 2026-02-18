/**
 * ═══════════════════════════════════════════════════════════
 *  Admin Dashboard Fixtures
 *  Mock data cho Admin Dashboard — system-wide overview
 *  dùng để phát triển UI/UX và test mà không cần backend thật.
 * ═══════════════════════════════════════════════════════════
 */

// ─── Types ───────────────────────────────────────────
export interface AdminStatCard {
    id: string;
    label: string;
    value: number;
    displayValue: string;
    change: string;
    trend: "up" | "down";
    icon: string;
    color: string;
}

export interface SystemHealthMetric {
    id: string;
    name: string;
    value: string;
    numericValue: number;
    unit: string;
    status: "healthy" | "warning" | "critical";
    icon: string;
    lastChecked: string;
}

export interface UserGrowthPoint {
    month: string;
    count: number;
    employers: number;
    candidates: number;
}

export interface PendingAction {
    id: string;
    label: string;
    count: number;
    urgency: "high" | "medium" | "low";
    icon: string;
    route: string;
}

export interface AdminActivity {
    id: string;
    action: string;
    detail: string;
    time: string;
    timestamp: string;
    type: "user" | "employer" | "system" | "security" | "content";
    severity: "info" | "warning" | "error" | "success";
}

export interface PlatformMetrics {
    dailyActiveUsers: number;
    monthlyActiveUsers: number;
    avgSessionDuration: string;
    bounceRate: number;
    topBrowsers: { name: string; percentage: number }[];
    topDevices: { name: string; percentage: number }[];
}

export interface AdminDashboardFixture {
    metadata: {
        generatedAt: string;
        period: string;
        platformName: string;
        version: string;
    };
    stats: AdminStatCard[];
    systemHealth: SystemHealthMetric[];
    userGrowth: UserGrowthPoint[];
    pendingActions: PendingAction[];
    activities: AdminActivity[];
    platformMetrics: PlatformMetrics;
}

// ─── Fixture Data ────────────────────────────────────
export const adminDashboardFixture: AdminDashboardFixture = {
    metadata: {
        generatedAt: "2026-02-17T00:00:00Z",
        period: "Tháng 2, 2026",
        platformName: "SmartHire AI",
        version: "1.4.2",
    },

    stats: [
        { id: "total-users", label: "Tổng người dùng", value: 12485, displayValue: "12,485", change: "+324", trend: "up", icon: "Users", color: "sky" },
        { id: "employers", label: "Nhà tuyển dụng", value: 486, displayValue: "486", change: "+18", trend: "up", icon: "Building2", color: "violet" },
        { id: "job-postings", label: "Tin tuyển dụng", value: 1842, displayValue: "1,842", change: "+67", trend: "up", icon: "Briefcase", color: "emerald" },
        { id: "cvs-created", label: "CV đã tạo", value: 8294, displayValue: "8,294", change: "+412", trend: "up", icon: "FileText", color: "amber" },
        { id: "ai-interviews", label: "Phỏng vấn AI", value: 3156, displayValue: "3,156", change: "+89", trend: "up", icon: "ShieldCheck", color: "rose" },
        { id: "reports", label: "Báo cáo vi phạm", value: 23, displayValue: "23", change: "-5", trend: "down", icon: "AlertTriangle", color: "orange" },
    ],

    systemHealth: [
        { id: "api", name: "API Response", value: "124ms", numericValue: 124, unit: "ms", status: "healthy", icon: "Globe", lastChecked: "2026-02-17T16:00:00Z" },
        { id: "database", name: "Database Uptime", value: "99.98%", numericValue: 99.98, unit: "%", status: "healthy", icon: "Server", lastChecked: "2026-02-17T16:00:00Z" },
        { id: "ai-engine", name: "AI Engine", value: "348ms", numericValue: 348, unit: "ms", status: "warning", icon: "ShieldCheck", lastChecked: "2026-02-17T16:00:00Z" },
        { id: "storage", name: "Storage Used", value: "72%", numericValue: 72, unit: "%", status: "healthy", icon: "BarChart3", lastChecked: "2026-02-17T16:00:00Z" },
        { id: "cdn", name: "CDN Availability", value: "99.99%", numericValue: 99.99, unit: "%", status: "healthy", icon: "Globe", lastChecked: "2026-02-17T16:00:00Z" },
        { id: "queue", name: "Job Queue", value: "12 pending", numericValue: 12, unit: "jobs", status: "healthy", icon: "Server", lastChecked: "2026-02-17T16:00:00Z" },
    ],

    userGrowth: [
        { month: "T9/25", count: 1820, employers: 320, candidates: 1500 },
        { month: "T10/25", count: 2150, employers: 358, candidates: 1792 },
        { month: "T11/25", count: 2480, employers: 390, candidates: 2090 },
        { month: "T12/25", count: 1960, employers: 410, candidates: 1550 },
        { month: "T1/26", count: 2720, employers: 445, candidates: 2275 },
        { month: "T2/26", count: 3240, employers: 486, candidates: 2754 },
    ],

    pendingActions: [
        { id: "pa1", label: "NTD chờ duyệt", count: 12, urgency: "high", icon: "Building2", route: "/admin/employers/pending" },
        { id: "pa2", label: "Tin bị report", count: 8, urgency: "high", icon: "AlertTriangle", route: "/admin/reports/jobs" },
        { id: "pa3", label: "Yêu cầu xoá tài khoản", count: 3, urgency: "medium", icon: "XCircle", route: "/admin/users/deletion-requests" },
        { id: "pa4", label: "Ticket hỗ trợ", count: 27, urgency: "medium", icon: "FileText", route: "/admin/support/tickets" },
        { id: "pa5", label: "NTD chờ upgrade", count: 5, urgency: "low", icon: "UserPlus", route: "/admin/employers/upgrades" },
        { id: "pa6", label: "CV bị flag", count: 2, urgency: "low", icon: "FileText", route: "/admin/reports/cvs" },
    ],

    activities: [
        { id: "aa1", action: "Người dùng mới đăng ký", detail: "nguyenvana@gmail.com — via Google OAuth", time: "2 phút trước", timestamp: "2026-02-17T16:50:00Z", type: "user", severity: "info" },
        { id: "aa2", action: "NTD mới được duyệt", detail: "TechCorp Vietnam — Lĩnh vực IT", time: "15 phút trước", timestamp: "2026-02-17T16:37:00Z", type: "employer", severity: "success" },
        { id: "aa3", action: "Tin tuyển dụng bị report", detail: "\"Senior Dev — Lương $10k\" — spam suspected", time: "28 phút trước", timestamp: "2026-02-17T16:24:00Z", type: "security", severity: "warning" },
        { id: "aa4", action: "AI Engine auto-scale", detail: "Tăng từ 2 → 4 instances (traffic spike)", time: "45 phút trước", timestamp: "2026-02-17T16:07:00Z", type: "system", severity: "info" },
        { id: "aa5", action: "Batch CV analysis hoàn tất", detail: "156 CVs processed — avg 2.3s/CV", time: "1 giờ trước", timestamp: "2026-02-17T15:52:00Z", type: "content", severity: "success" },
        { id: "aa6", action: "Người dùng bị khoá", detail: "spammer_bot_99@test.com — vi phạm ToS", time: "2 giờ trước", timestamp: "2026-02-17T14:52:00Z", type: "security", severity: "error" },
        { id: "aa7", action: "Database backup thành công", detail: "Full backup — 4.2 GB compressed", time: "3 giờ trước", timestamp: "2026-02-17T13:52:00Z", type: "system", severity: "success" },
        { id: "aa8", action: "NTD upgrade plan", detail: "DesignStudio Pro → Enterprise plan", time: "4 giờ trước", timestamp: "2026-02-17T12:52:00Z", type: "employer", severity: "info" },
        { id: "aa9", action: "Người dùng mới đăng ký", detail: "tranthib@outlook.com — via Email", time: "5 giờ trước", timestamp: "2026-02-17T11:52:00Z", type: "user", severity: "info" },
        { id: "aa10", action: "API rate limit triggered", detail: "IP 103.xx.xx.xx — 500 req/min exceeded", time: "6 giờ trước", timestamp: "2026-02-17T10:52:00Z", type: "security", severity: "error" },
        { id: "aa11", action: "Cập nhật AI model", detail: "Gemini 2.0 Flash → Gemini 2.5 Pro", time: "8 giờ trước", timestamp: "2026-02-17T08:52:00Z", type: "system", severity: "info" },
        { id: "aa12", action: "NTD mới đăng ký", detail: "StartupXYZ — Lĩnh vực Fintech", time: "10 giờ trước", timestamp: "2026-02-17T06:52:00Z", type: "employer", severity: "info" },
    ],

    platformMetrics: {
        dailyActiveUsers: 2845,
        monthlyActiveUsers: 9673,
        avgSessionDuration: "12m 34s",
        bounceRate: 24.5,
        topBrowsers: [
            { name: "Chrome", percentage: 68 },
            { name: "Safari", percentage: 18 },
            { name: "Firefox", percentage: 8 },
            { name: "Edge", percentage: 4 },
            { name: "Khác", percentage: 2 },
        ],
        topDevices: [
            { name: "Desktop", percentage: 56 },
            { name: "Mobile", percentage: 38 },
            { name: "Tablet", percentage: 6 },
        ],
    },
};

// ─── Utility Functions ───────────────────────────────

/** Get admin stat by ID */
export function getAdminStatById(id: string) {
    return adminDashboardFixture.stats.find((s) => s.id === id);
}

/** Get system health metrics filtered by status */
export function getHealthByStatus(status?: SystemHealthMetric["status"]) {
    if (!status) return adminDashboardFixture.systemHealth;
    return adminDashboardFixture.systemHealth.filter((m) => m.status === status);
}

/** Check if system is overall healthy */
export function isSystemHealthy(): boolean {
    return adminDashboardFixture.systemHealth.every((m) => m.status !== "critical");
}

/** Get pending actions filtered by urgency */
export function getPendingByUrgency(urgency?: PendingAction["urgency"]) {
    if (!urgency) return adminDashboardFixture.pendingActions;
    return adminDashboardFixture.pendingActions.filter((a) => a.urgency === urgency);
}

/** Get total pending action count */
export function getTotalPendingCount(): number {
    return adminDashboardFixture.pendingActions.reduce((sum, a) => sum + a.count, 0);
}

/** Get activities filtered by type */
export function getAdminActivitiesByType(type?: AdminActivity["type"]) {
    if (!type) return adminDashboardFixture.activities;
    return adminDashboardFixture.activities.filter((a) => a.type === type);
}

/** Get activities filtered by severity */
export function getActivitiesBySeverity(severity: AdminActivity["severity"]) {
    return adminDashboardFixture.activities.filter((a) => a.severity === severity);
}

/** Get user growth rate (latest vs previous month) */
export function getUserGrowthRate(): number {
    const g = adminDashboardFixture.userGrowth;
    if (g.length < 2) return 0;
    const current = g[g.length - 1].count;
    const previous = g[g.length - 2].count;
    return Math.round(((current - previous) / previous) * 100 * 10) / 10;
}

/** Get total users across all months */
export function getTotalNewUsers(): number {
    return adminDashboardFixture.userGrowth.reduce((sum, g) => sum + g.count, 0);
}
