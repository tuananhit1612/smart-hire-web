/**
 * ═══════════════════════════════════════════════════════════
 *  Admin Fixtures
 *  Mock data cho Admin pages — User Management, Audit Log,
 *  System Settings. Dùng để phát triển UI/UX và test
 *  mà không cần backend thật.
 * ═══════════════════════════════════════════════════════════
 */

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  USER MANAGEMENT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export type UserRole = "candidate" | "employer" | "admin";
export type UserStatus = "active" | "inactive" | "banned" | "pending";

export interface AdminUser {
    id: string;
    name: string;
    email: string;
    avatar: string;
    role: UserRole;
    status: UserStatus;
    joinedDate: string;
    lastActive: string;
    company?: string;
    phone?: string;
    location?: string;
}

export const adminUsers: AdminUser[] = [
    { id: "u1", name: "Nguyễn Văn An", email: "nguyenvanan@gmail.com", avatar: "NVA", role: "candidate", status: "active", joinedDate: "2025-08-12", lastActive: "2 phút trước", phone: "0901-xxx-xxx", location: "TP.HCM" },
    { id: "u2", name: "Trần Thị Bảo", email: "tranthibao@techcorp.vn", avatar: "TTB", role: "employer", status: "active", joinedDate: "2025-06-20", lastActive: "15 phút trước", company: "TechCorp Vietnam", phone: "0912-xxx-xxx", location: "Hà Nội" },
    { id: "u3", name: "Lê Hoàng Cường", email: "lehoangcuong@admin.smarthire.ai", avatar: "LHC", role: "admin", status: "active", joinedDate: "2025-01-01", lastActive: "Đang online", phone: "0903-xxx-xxx", location: "TP.HCM" },
    { id: "u4", name: "Phạm Minh Duy", email: "phamminhduy@outlook.com", avatar: "PMD", role: "candidate", status: "inactive", joinedDate: "2025-11-05", lastActive: "30 ngày trước", location: "Đà Nẵng" },
    { id: "u5", name: "Hoàng Thị Ema", email: "hoangthiema@designstudio.vn", avatar: "HTE", role: "employer", status: "active", joinedDate: "2025-09-15", lastActive: "1 giờ trước", company: "DesignStudio Pro", phone: "0934-xxx-xxx", location: "TP.HCM" },
    { id: "u6", name: "Vũ Đức Phong", email: "vuducphong@gmail.com", avatar: "VDP", role: "candidate", status: "banned", joinedDate: "2025-10-28", lastActive: "—", location: "Hà Nội" },
    { id: "u7", name: "Đặng Ngọc Gia", email: "dangngocgia@startupxyz.vn", avatar: "DNG", role: "employer", status: "pending", joinedDate: "2026-02-14", lastActive: "3 giờ trước", company: "StartupXYZ", phone: "0945-xxx-xxx", location: "TP.HCM" },
    { id: "u8", name: "Bùi Thanh Hải", email: "buithanhai@yahoo.com", avatar: "BTH", role: "candidate", status: "active", joinedDate: "2025-07-03", lastActive: "5 phút trước", location: "Cần Thơ" },
    { id: "u9", name: "Cao Thị Ivy", email: "caothiivy@fintech.vn", avatar: "CTI", role: "employer", status: "active", joinedDate: "2025-12-01", lastActive: "45 phút trước", company: "FinTech Solutions", phone: "0956-xxx-xxx", location: "TP.HCM" },
    { id: "u10", name: "Đinh Quốc Khánh", email: "dinhquockhanh@gmail.com", avatar: "DQK", role: "candidate", status: "active", joinedDate: "2026-01-10", lastActive: "20 phút trước", location: "Hà Nội" },
    { id: "u11", name: "Lý Minh Long", email: "lyminhlong@admin.smarthire.ai", avatar: "LML", role: "admin", status: "active", joinedDate: "2025-03-15", lastActive: "10 phút trước", phone: "0907-xxx-xxx", location: "TP.HCM" },
    { id: "u12", name: "Mai Phương Nam", email: "maiphuongnam@gmail.com", avatar: "MPN", role: "candidate", status: "inactive", joinedDate: "2025-05-20", lastActive: "60 ngày trước", location: "Huế" },
    { id: "u13", name: "Ngô Thị Oanh", email: "ngothioanh@edutech.vn", avatar: "NTO", role: "employer", status: "active", joinedDate: "2025-10-10", lastActive: "2 giờ trước", company: "EduTech Vietnam", phone: "0968-xxx-xxx", location: "Hà Nội" },
    { id: "u14", name: "Phan Văn Quân", email: "phanvanquan@gmail.com", avatar: "PVQ", role: "candidate", status: "active", joinedDate: "2026-02-01", lastActive: "8 phút trước", location: "TP.HCM" },
    { id: "u15", name: "Trịnh Hồng Sơn", email: "trinhhongson@gmail.com", avatar: "THS", role: "candidate", status: "pending", joinedDate: "2026-02-16", lastActive: "1 giờ trước", location: "Đà Nẵng" },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  AUDIT LOG
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export type AuditCategory = "auth" | "user" | "content" | "system" | "security";
export type AuditSeverity = "info" | "warning" | "error" | "success";

export interface AuditLogEntry {
    id: string;
    timestamp: string;
    displayTime: string;
    actor: string;
    actorRole: "admin" | "employer" | "candidate" | "system";
    action: string;
    target: string;
    category: AuditCategory;
    severity: AuditSeverity;
    ip?: string;
    details?: string;
}

export const auditLogs: AuditLogEntry[] = [
    { id: "log-01", timestamp: "2026-02-18T12:18:00Z", displayTime: "12:18", actor: "Lê Hoàng Cường", actorRole: "admin", action: "Duyệt NTD", target: "StartupXYZ", category: "user", severity: "success", ip: "103.45.xx.xx", details: "Duyệt tài khoản nhà tuyển dụng StartupXYZ — lĩnh vực Fintech" },
    { id: "log-02", timestamp: "2026-02-18T12:10:00Z", displayTime: "12:10", actor: "system", actorRole: "system", action: "Auto backup", target: "Database", category: "system", severity: "success", details: "Full backup hoàn tất — 4.2 GB compressed" },
    { id: "log-03", timestamp: "2026-02-18T11:55:00Z", displayTime: "11:55", actor: "Lý Minh Long", actorRole: "admin", action: "Khoá tài khoản", target: "spammer_bot_99@test.com", category: "security", severity: "error", ip: "10.0.xx.xx", details: "Vi phạm ToS — spam hàng loạt" },
    { id: "log-04", timestamp: "2026-02-18T11:42:00Z", displayTime: "11:42", actor: "Nguyễn Văn An", actorRole: "candidate", action: "Đăng nhập", target: "Web App", category: "auth", severity: "info", ip: "118.69.xx.xx" },
    { id: "log-05", timestamp: "2026-02-18T11:30:00Z", displayTime: "11:30", actor: "system", actorRole: "system", action: "AI auto-scale", target: "AI Engine", category: "system", severity: "warning", details: "Tăng từ 2 → 4 instances do traffic spike" },
    { id: "log-06", timestamp: "2026-02-18T11:15:00Z", displayTime: "11:15", actor: "Trần Thị Bảo", actorRole: "employer", action: "Đăng tin tuyển dụng", target: "Senior React Developer", category: "content", severity: "info", ip: "42.114.xx.xx" },
    { id: "log-07", timestamp: "2026-02-18T10:58:00Z", displayTime: "10:58", actor: "system", actorRole: "system", action: "Rate limit triggered", target: "IP 203.xx.xx.xx", category: "security", severity: "error", details: "500 req/min — blocked for 15 minutes" },
    { id: "log-08", timestamp: "2026-02-18T10:45:00Z", displayTime: "10:45", actor: "Lê Hoàng Cường", actorRole: "admin", action: "Xoá tin vi phạm", target: "\"Lương $50k — Easy money\"", category: "content", severity: "warning", ip: "10.0.xx.xx", details: "Tin tuyển dụng spam — xoá vĩnh viễn" },
    { id: "log-09", timestamp: "2026-02-18T10:30:00Z", displayTime: "10:30", actor: "Hoàng Thị Ema", actorRole: "employer", action: "Cập nhật profile", target: "DesignStudio Pro", category: "user", severity: "info", ip: "113.161.xx.xx" },
    { id: "log-10", timestamp: "2026-02-18T10:12:00Z", displayTime: "10:12", actor: "Phạm Minh Duy", actorRole: "candidate", action: "Đăng xuất", target: "Web App", category: "auth", severity: "info", ip: "171.244.xx.xx" },
    { id: "log-11", timestamp: "2026-02-18T09:50:00Z", displayTime: "09:50", actor: "system", actorRole: "system", action: "SSL certificate renewed", target: "*.smarthire.ai", category: "system", severity: "success", details: "Tự động gia hạn — hết hạn 2027-02-18" },
    { id: "log-12", timestamp: "2026-02-18T09:30:00Z", displayTime: "09:30", actor: "Lý Minh Long", actorRole: "admin", action: "Thay đổi vai trò", target: "ngothioanh@edutech.vn", category: "user", severity: "warning", ip: "10.0.xx.xx", details: "Nâng cấp employer → enterprise employer" },
    { id: "log-13", timestamp: "2026-02-18T09:15:00Z", displayTime: "09:15", actor: "Bùi Thanh Hải", actorRole: "candidate", action: "Tạo CV mới", target: "CV — Full-Stack Developer", category: "content", severity: "info", ip: "14.161.xx.xx" },
    { id: "log-14", timestamp: "2026-02-18T08:45:00Z", displayTime: "08:45", actor: "system", actorRole: "system", action: "Cron job completed", target: "Email notifications", category: "system", severity: "success", details: "Gửi 342 email thông báo — 0 failed" },
    { id: "log-15", timestamp: "2026-02-18T08:20:00Z", displayTime: "08:20", actor: "Cao Thị Ivy", actorRole: "employer", action: "Đăng nhập", target: "Web App", category: "auth", severity: "info", ip: "27.72.xx.xx" },
    { id: "log-16", timestamp: "2026-02-18T07:55:00Z", displayTime: "07:55", actor: "system", actorRole: "system", action: "Failed login attempt", target: "admin@smarthire.ai", category: "security", severity: "error", details: "5 lần đăng nhập sai — tạm khoá 30 phút", ip: "185.220.xx.xx" },
    { id: "log-17", timestamp: "2026-02-18T07:30:00Z", displayTime: "07:30", actor: "Lê Hoàng Cường", actorRole: "admin", action: "Cập nhật cấu hình", target: "AI Model Settings", category: "system", severity: "info", ip: "10.0.xx.xx", details: "Chuyển Gemini 2.0 Flash → Gemini 2.5 Pro" },
    { id: "log-18", timestamp: "2026-02-18T07:00:00Z", displayTime: "07:00", actor: "system", actorRole: "system", action: "Scheduled maintenance", target: "Database", category: "system", severity: "warning", details: "Bảo trì 15 phút — optimize indexes" },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  SYSTEM SETTINGS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface SettingToggle {
    id: string;
    label: string;
    description: string;
    icon: string;
    defaultValue: boolean;
}

export interface SettingSection {
    id: string;
    title: string;
    description: string;
    icon: string;
    color: string;
    settings: SettingToggle[];
}

export const systemSettings: SettingSection[] = [
    {
        id: "general",
        title: "Cài đặt chung",
        description: "Cấu hình cơ bản cho hệ thống",
        icon: "Globe",
        color: "sky",
        settings: [
            { id: "maintenance_mode", label: "Chế độ bảo trì", description: "Tạm dừng truy cập công khai, chỉ admin có thể truy cập", icon: "AlertTriangle", defaultValue: false },
            { id: "new_registration", label: "Cho phép đăng ký mới", description: "Người dùng mới có thể tạo tài khoản trên hệ thống", icon: "Lock", defaultValue: true },
            { id: "dark_mode_default", label: "Dark mode mặc định", description: "Giao diện tối được bật mặc định cho người dùng mới", icon: "Palette", defaultValue: false },
        ],
    },
    {
        id: "ai",
        title: "AI & Phỏng vấn",
        description: "Cài đặt cho AI Engine và phỏng vấn tự động",
        icon: "Cpu",
        color: "violet",
        settings: [
            { id: "ai_interview_enabled", label: "Phỏng vấn AI", description: "Cho phép ứng viên tham gia phỏng vấn AI tự động", icon: "Cpu", defaultValue: true },
            { id: "ai_cv_analysis", label: "Phân tích CV tự động", description: "AI tự động phân tích và chấm điểm CV khi ứng viên nộp", icon: "Zap", defaultValue: true },
            { id: "ai_matching", label: "AI Matching", description: "Tự động gợi ý ứng viên phù hợp cho nhà tuyển dụng", icon: "Cpu", defaultValue: true },
            { id: "ai_auto_scale", label: "Auto-scale AI Engine", description: "Tự động tăng/giảm instances dựa trên traffic", icon: "Zap", defaultValue: true },
        ],
    },
    {
        id: "notifications",
        title: "Thông báo",
        description: "Cài đặt hệ thống thông báo và email",
        icon: "Bell",
        color: "amber",
        settings: [
            { id: "email_notifications", label: "Email thông báo", description: "Gửi email cho người dùng khi có cập nhật quan trọng", icon: "Mail", defaultValue: true },
            { id: "push_notifications", label: "Push notifications", description: "Gửi thông báo đẩy qua trình duyệt", icon: "Bell", defaultValue: true },
            { id: "admin_alerts", label: "Cảnh báo admin", description: "Gửi email khi có sự cố hệ thống hoặc báo cáo vi phạm", icon: "AlertTriangle", defaultValue: true },
            { id: "weekly_report", label: "Báo cáo tuần", description: "Tự động gửi báo cáo tổng hợp vào thứ Hai hàng tuần", icon: "Clock", defaultValue: false },
        ],
    },
    {
        id: "security",
        title: "Bảo mật",
        description: "Cài đặt bảo mật và quyền truy cập",
        icon: "Shield",
        color: "rose",
        settings: [
            { id: "two_factor_required", label: "Bắt buộc 2FA", description: "Yêu cầu xác thực 2 lớp cho tất cả tài khoản admin", icon: "Shield", defaultValue: true },
            { id: "rate_limiting", label: "Rate limiting", description: "Giới hạn số lượng request từ một IP (500 req/min)", icon: "Lock", defaultValue: true },
            { id: "audit_logging", label: "Ghi nhật ký hoạt động", description: "Ghi lại tất cả thao tác của admin vào audit log", icon: "Eye", defaultValue: true },
            { id: "auto_ban_spam", label: "Tự động khoá spam", description: "Tự động khoá tài khoản khi phát hiện hành vi spam", icon: "AlertTriangle", defaultValue: true },
            { id: "ip_whitelist", label: "IP Whitelist cho Admin", description: "Chỉ cho phép truy cập admin từ các IP được chấp nhận", icon: "Globe", defaultValue: false },
        ],
    },
    {
        id: "data",
        title: "Dữ liệu & Backup",
        description: "Quản lý dữ liệu và sao lưu",
        icon: "Database",
        color: "emerald",
        settings: [
            { id: "auto_backup", label: "Tự động sao lưu", description: "Backup dữ liệu tự động mỗi ngày lúc 3:00 AM", icon: "Database", defaultValue: true },
            { id: "data_retention", label: "Data retention policy", description: "Tự động xoá dữ liệu cũ hơn 2 năm", icon: "Clock", defaultValue: false },
            { id: "analytics_tracking", label: "Analytics tracking", description: "Thu thập dữ liệu sử dụng để cải thiện sản phẩm", icon: "Eye", defaultValue: true },
        ],
    },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  UTILITY FUNCTIONS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// ─── User Management ─────────────────────────────────

/** Get users filtered by role */
export function getUsersByRole(role?: UserRole) {
    if (!role) return adminUsers;
    return adminUsers.filter((u) => u.role === role);
}

/** Get users filtered by status */
export function getUsersByStatus(status: UserStatus) {
    return adminUsers.filter((u) => u.status === status);
}

/** Get user by ID */
export function getUserById(id: string) {
    return adminUsers.find((u) => u.id === id);
}

/** Search users by name, email, or company */
export function searchUsers(query: string) {
    const q = query.toLowerCase();
    return adminUsers.filter(
        (u) =>
            u.name.toLowerCase().includes(q) ||
            u.email.toLowerCase().includes(q) ||
            (u.company?.toLowerCase().includes(q) ?? false)
    );
}

/** Get user count summary */
export function getUserCountSummary() {
    return {
        total: adminUsers.length,
        active: adminUsers.filter((u) => u.status === "active").length,
        inactive: adminUsers.filter((u) => u.status === "inactive").length,
        banned: adminUsers.filter((u) => u.status === "banned").length,
        pending: adminUsers.filter((u) => u.status === "pending").length,
        candidates: adminUsers.filter((u) => u.role === "candidate").length,
        employers: adminUsers.filter((u) => u.role === "employer").length,
        admins: adminUsers.filter((u) => u.role === "admin").length,
    };
}

// ─── Audit Log ───────────────────────────────────────

/** Get audit logs filtered by category */
export function getLogsByCategory(category?: AuditCategory) {
    if (!category) return auditLogs;
    return auditLogs.filter((l) => l.category === category);
}

/** Get audit logs filtered by severity */
export function getLogsBySeverity(severity: AuditSeverity) {
    return auditLogs.filter((l) => l.severity === severity);
}

/** Get audit logs by actor */
export function getLogsByActor(actor: string) {
    return auditLogs.filter((l) => l.actor.toLowerCase().includes(actor.toLowerCase()));
}

/** Search audit logs */
export function searchAuditLogs(query: string) {
    const q = query.toLowerCase();
    return auditLogs.filter(
        (l) =>
            l.actor.toLowerCase().includes(q) ||
            l.action.toLowerCase().includes(q) ||
            l.target.toLowerCase().includes(q) ||
            (l.details?.toLowerCase().includes(q) ?? false)
    );
}

/** Get audit log severity summary */
export function getAuditSeveritySummary() {
    return {
        total: auditLogs.length,
        info: auditLogs.filter((l) => l.severity === "info").length,
        success: auditLogs.filter((l) => l.severity === "success").length,
        warning: auditLogs.filter((l) => l.severity === "warning").length,
        error: auditLogs.filter((l) => l.severity === "error").length,
    };
}

/** Get audit log category summary */
export function getAuditCategorySummary() {
    return {
        auth: auditLogs.filter((l) => l.category === "auth").length,
        user: auditLogs.filter((l) => l.category === "user").length,
        content: auditLogs.filter((l) => l.category === "content").length,
        system: auditLogs.filter((l) => l.category === "system").length,
        security: auditLogs.filter((l) => l.category === "security").length,
    };
}

// ─── System Settings ─────────────────────────────────

/** Get all settings as flat array */
export function getAllSettings() {
    return systemSettings.flatMap((s) => s.settings);
}

/** Get setting by ID */
export function getSettingById(id: string) {
    for (const section of systemSettings) {
        const found = section.settings.find((s) => s.id === id);
        if (found) return { ...found, sectionId: section.id, sectionTitle: section.title };
    }
    return undefined;
}

/** Get default toggle states */
export function getDefaultToggleStates(): Record<string, boolean> {
    const states: Record<string, boolean> = {};
    for (const section of systemSettings) {
        for (const setting of section.settings) {
            states[setting.id] = setting.defaultValue;
        }
    }
    return states;
}

/** Get settings summary */
export function getSettingsSummary() {
    const all = getAllSettings();
    return {
        totalSettings: all.length,
        totalSections: systemSettings.length,
        enabledByDefault: all.filter((s) => s.defaultValue).length,
        disabledByDefault: all.filter((s) => !s.defaultValue).length,
    };
}
