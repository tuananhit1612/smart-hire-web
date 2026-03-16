"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Settings,
    Bell,
    Shield,
    Globe,
    Cpu,
    Database,
    Mail,
    Lock,
    Eye,
    Palette,
    Clock,
    Zap,
    AlertTriangle,
    Save,
    RotateCcw,
} from "lucide-react";
import { cn } from "@/shared/utils/cn";

// ─── Types ───────────────────────────────────────────
interface SettingToggle {
    id: string;
    label: string;
    description: string;
    icon: typeof Settings;
    defaultValue: boolean;
}

interface SettingSection {
    id: string;
    title: string;
    description: string;
    icon: typeof Settings;
    color: string;
    bg: string;
    settings: SettingToggle[];
}

// ─── Settings Sections ───────────────────────────────
const settingSections: SettingSection[] = [
    {
        id: "general",
        title: "Cài đặt chung",
        description: "Cấu hình cơ bản cho hệ thống",
        icon: Globe,
        color: "text-[#22c55e]",
        bg: "bg-[#22c55e]/10",
        settings: [
            { id: "maintenance_mode", label: "Chế độ bảo trì", description: "Tạm dừng truy cập công khai, chỉ admin có thể truy cập", icon: AlertTriangle, defaultValue: false },
            { id: "new_registration", label: "Cho phép đăng ký mới", description: "Người dùng mới có thể tạo tài khoản trên hệ thống", icon: Lock, defaultValue: true },
            { id: "dark_mode_default", label: "Dark mode mặc định", description: "Giao diện tối được bật mặc định cho người dùng mới", icon: Palette, defaultValue: false },
        ],
    },
    {
        id: "ai",
        title: "AI & Phỏng vấn",
        description: "Cài đặt cho AI Engine và phỏng vấn tự động",
        icon: Cpu,
        color: "text-violet-600",
        bg: "bg-violet-50",
        settings: [
            { id: "ai_interview_enabled", label: "Phỏng vấn AI", description: "Cho phép ứng viên tham gia phỏng vấn AI tự động", icon: Cpu, defaultValue: true },
            { id: "ai_cv_analysis", label: "Phân tích CV tự động", description: "AI tự động phân tích và chấm điểm CV khi ứng viên nộp", icon: Zap, defaultValue: true },
            { id: "ai_matching", label: "AI Matching", description: "Tự động gợi ý ứng viên phù hợp cho nhà tuyển dụng", icon: Cpu, defaultValue: true },
            { id: "ai_auto_scale", label: "Auto-scale AI Engine", description: "Tự động tăng/giảm instances dựa trên traffic", icon: Zap, defaultValue: true },
        ],
    },
    {
        id: "notifications",
        title: "Thông báo",
        description: "Cài đặt hệ thống thông báo và email",
        icon: Bell,
        color: "text-amber-600",
        bg: "bg-amber-50",
        settings: [
            { id: "email_notifications", label: "Email thông báo", description: "Gửi email cho người dùng khi có cập nhật quan trọng", icon: Mail, defaultValue: true },
            { id: "push_notifications", label: "Push notifications", description: "Gửi thông báo đẩy qua trình duyệt", icon: Bell, defaultValue: true },
            { id: "admin_alerts", label: "Cảnh báo admin", description: "Gửi email khi có sự cố hệ thống hoặc báo cáo vi phạm", icon: AlertTriangle, defaultValue: true },
            { id: "weekly_report", label: "Báo cáo tuần", description: "Tự động gửi báo cáo tổng hợp vào thứ Hai hàng tuần", icon: Clock, defaultValue: false },
        ],
    },
    {
        id: "security",
        title: "Bảo mật",
        description: "Cài đặt bảo mật và quyền truy cập",
        icon: Shield,
        color: "text-rose-600",
        bg: "bg-rose-50",
        settings: [
            { id: "two_factor_required", label: "Bắt buộc 2FA", description: "Yêu cầu xác thực 2 lớp cho tất cả tài khoản admin", icon: Shield, defaultValue: true },
            { id: "rate_limiting", label: "Rate limiting", description: "Giới hạn số lượng request từ một IP (500 req/min)", icon: Lock, defaultValue: true },
            { id: "audit_logging", label: "Ghi nhật ký hoạt động", description: "Ghi lại tất cả thao tác của admin vào audit log", icon: Eye, defaultValue: true },
            { id: "auto_ban_spam", label: "Tự động khoá spam", description: "Tự động khoá tài khoản khi phát hiện hành vi spam", icon: AlertTriangle, defaultValue: true },
            { id: "ip_whitelist", label: "IP Whitelist cho Admin", description: "Chỉ cho phép truy cập admin từ các IP được chấp nhận", icon: Globe, defaultValue: false },
        ],
    },
    {
        id: "data",
        title: "Dữ liệu & Backup",
        description: "Quản lý dữ liệu và sao lưu",
        icon: Database,
        color: "text-emerald-600",
        bg: "bg-emerald-50",
        settings: [
            { id: "auto_backup", label: "Tự động sao lưu", description: "Backup dữ liệu tự động mỗi ngày lúc 3:00 AM", icon: Database, defaultValue: true },
            { id: "data_retention", label: "Data retention policy", description: "Tự động xoá dữ liệu cũ hơn 2 năm", icon: Clock, defaultValue: false },
            { id: "analytics_tracking", label: "Analytics tracking", description: "Thu thập dữ liệu sử dụng để cải thiện sản phẩm", icon: Eye, defaultValue: true },
        ],
    },
];

// ─── Toggle Switch ───────────────────────────────────
function ToggleSwitch({
    checked,
    onChange,
}: {
    readonly checked: boolean;
    readonly onChange: (v: boolean) => void;
}) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            onClick={() => onChange(!checked)}
            className={cn(
                "relative w-11 h-6 rounded-full transition-colors duration-200 cursor-pointer shrink-0",
                checked ? "bg-[#22c55e]" : "bg-slate-200"
            )}
        >
            <motion.span
                animate={{ x: checked ? 20 : 2 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute top-1 left-0 w-4 h-4 bg-white rounded-full shadow-sm"
            />
        </button>
    );
}

// ─── Main Page ───────────────────────────────────────
export default function SystemSettingsPage() {
    // Build initial state from defaults
    const [toggles, setToggles] = useState<Record<string, boolean>>(() => {
        const initial: Record<string, boolean> = {};
        for (const section of settingSections) {
            for (const setting of section.settings) {
                initial[setting.id] = setting.defaultValue;
            }
        }
        return initial;
    });

    const [saved, setSaved] = useState(false);

    const handleToggle = (id: string, value: boolean) => {
        setToggles((prev) => ({ ...prev, [id]: value }));
        setSaved(false);
    };

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const handleReset = () => {
        const initial: Record<string, boolean> = {};
        for (const section of settingSections) {
            for (const setting of section.settings) {
                initial[setting.id] = setting.defaultValue;
            }
        }
        setToggles(initial);
        setSaved(false);
    };

    const totalSettings = settingSections.reduce((s, sec) => s + sec.settings.length, 0);
    const enabledCount = Object.values(toggles).filter(Boolean).length;

    return (
        <section className="relative z-10 pt-24 pb-12 md:pt-28">
            <div className="mx-auto max-w-4xl px-4 sm:px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-2">
                                <Settings className="w-6 h-6 text-[#22c55e]" />
                                <h1 className="text-2xl font-bold text-[#1C252E]">Cài đặt hệ thống</h1>
                            </div>
                            <p className="text-sm text-slate-500 mt-1">
                                {enabledCount}/{totalSettings} tính năng đang bật — Quản lý cấu hình hệ thống
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleReset}
                                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-500 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                            >
                                <RotateCcw className="w-3.5 h-3.5" />
                                Đặt lại
                            </button>
                            <button
                                onClick={handleSave}
                                className={cn(
                                    "flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer",
                                    saved
                                        ? "bg-emerald-500 text-white"
                                        : "bg-[#22c55e] text-white hover:bg-[#22c55e]"
                                )}
                            >
                                {saved ? (
                                    <><CheckCircle className="w-3.5 h-3.5" /> Đã lưu!</>
                                ) : (
                                    <><Save className="w-3.5 h-3.5" /> Lưu thay đổi</>
                                )}
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Sections */}
                <div className="space-y-6">
                    {settingSections.map((section, si) => {
                        const SectionIcon = section.icon;
                        return (
                            <motion.div
                                key={section.id}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + si * 0.08 }}
                                className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
                            >
                                {/* Section Header */}
                                <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-3">
                                    <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center", section.bg)}>
                                        <SectionIcon className={cn("w-4.5 h-4.5", section.color)} />
                                    </div>
                                    <div>
                                        <h2 className="text-sm font-bold text-[#1C252E]">{section.title}</h2>
                                        <p className="text-[11px] text-slate-400">{section.description}</p>
                                    </div>
                                    <span className="ml-auto text-[10px] text-slate-300 font-medium">
                                        {section.settings.filter((s) => toggles[s.id]).length}/{section.settings.length} bật
                                    </span>
                                </div>

                                {/* Settings List */}
                                <div className="divide-y divide-slate-50">
                                    {section.settings.map((setting, i) => {
                                        const Icon = setting.icon;
                                        return (
                                            <motion.div
                                                key={setting.id}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.15 + si * 0.08 + i * 0.04 }}
                                                className="px-5 py-3.5 flex items-center gap-3 hover:bg-slate-50/50 transition-colors"
                                            >
                                                <Icon className={cn("w-4 h-4 shrink-0", toggles[setting.id] ? "text-[#22c55e]" : "text-slate-300")} />
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-semibold text-[#1C252E]">{setting.label}</p>
                                                    <p className="text-[11px] text-slate-400 mt-0.5">{setting.description}</p>
                                                </div>
                                                <ToggleSwitch
                                                    checked={toggles[setting.id]}
                                                    onChange={(v) => handleToggle(setting.id, v)}
                                                />
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Bottom Note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-6 text-center"
                >
                    <p className="text-[10px] text-slate-300">
                        Các thay đổi chỉ có hiệu lực sau khi nhấn &quot;Lưu thay đổi&quot;. Một số cài đặt có thể mất vài phút để áp dụng.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

// CheckCircle for saved state (inline to avoid import conflict)
function CheckCircle({ className }: { readonly className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
            className={className}>
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
    );
}

