"use client";

import { LucideIcon, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: LucideIcon;
    iconBg?: string; // tailwind gradient classes
    trend?: { value: string; positive: boolean };
}

export function StatCard({ title, value, subtitle, icon: Icon, iconBg, trend }: Props) {
    return (
        <div
            className={cn(
                "relative group rounded-2xl p-6 transition-all duration-500",
                "bg-white dark:bg-[#1C252E]",
                "border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08]",
                "hover:border-[#22C55E]/30 dark:hover:border-[#22C55E]/20",
                "hover:shadow-[0_20px_60px_-15px_rgba(34,197,94,0.15)]",
                "hover:-translate-y-1"
            )}
        >
            {/* Subtle glow on hover */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#22C55E]/5 to-transparent pointer-events-none" />

            <div className="relative flex items-start justify-between gap-4">
                {/* Icon */}
                <div
                    className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-lg",
                        iconBg ?? "bg-gradient-to-br from-[#22C55E] to-[#16A34A] shadow-[#22C55E]/25"
                    )}
                >
                    <Icon className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-500" />
                </div>

                {/* Trend badge */}
                {trend && (
                    <span
                        className={cn(
                            "inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider",
                            trend.positive
                                ? "bg-[rgba(34,197,94,0.1)] text-[#16A34A] border border-[rgba(34,197,94,0.2)] dark:bg-[rgba(34,197,94,0.2)] dark:text-[#4ADE80] dark:border-[rgba(34,197,94,0.3)]"
                                : "bg-[rgba(255,86,48,0.1)] text-[#DC2626] border border-[rgba(255,86,48,0.2)] dark:bg-[rgba(255,86,48,0.2)] dark:text-[#FF6B4A] dark:border-[rgba(255,86,48,0.3)]"
                        )}
                    >
                        <TrendingUp className="w-3.5 h-3.5" />
                        {trend.value}
                    </span>
                )}
            </div>

            <div className="relative mt-5">
                <p className="text-xs font-bold uppercase tracking-wider text-[#919EAB] dark:text-[#637381] group-hover:text-[#22c55e] transition-colors">
                    {title}
                </p>
                <p className="text-3xl font-bold text-[#1C252E] dark:text-white mt-1.5 tabular-nums tracking-tight">
                    {value}
                </p>
                {subtitle && (
                    <p className="text-[13px] text-[#637381] dark:text-[#919EAB] mt-1.5 font-medium">{subtitle}</p>
                )}
            </div>
        </div>
    );
}
