"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Code2, Palette, TrendingUp, Briefcase, MoreHorizontal, Check } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { JobPosition, POSITIONS, TEMPLATES } from "@/features/cv/types/template-types";

const iconMap = {
    Code2,
    Palette,
    TrendingUp,
    Briefcase,
    MoreHorizontal
};

const positionColors: Record<JobPosition, { bg: string; border: string; icon: string; shadow: string; text: string }> = {
    developer: {
        bg: "bg-blue-50",
        border: "border-blue-500",
        icon: "from-blue-500 to-indigo-500",
        shadow: "shadow-blue-500/30",
        text: "text-blue-700"
    },
    designer: {
        bg: "bg-indigo-50",
        border: "border-indigo-500",
        icon: "from-indigo-500 to-violet-500",
        shadow: "shadow-indigo-500/30",
        text: "text-indigo-700"
    },
    marketing: {
        bg: "bg-sky-50",
        border: "border-sky-500",
        icon: "from-sky-500 to-cyan-500",
        shadow: "shadow-sky-500/30",
        text: "text-sky-700"
    },
    business: {
        bg: "bg-emerald-50",
        border: "border-emerald-500",
        icon: "from-emerald-500 to-green-500",
        shadow: "shadow-emerald-500/30",
        text: "text-emerald-700"
    },
    other: {
        bg: "bg-slate-50",
        border: "border-slate-400",
        icon: "from-slate-500 to-gray-500",
        shadow: "shadow-slate-500/30",
        text: "text-slate-700"
    }
};

// Count templates per position
function getTemplateCount(positionId: JobPosition): number {
    return TEMPLATES.filter(t => t.positions.includes(positionId)).length;
}

interface PositionSelectorProps {
    selectedPosition: JobPosition | null;
    onSelect: (position: JobPosition | null) => void;
}

export function PositionSelector({ selectedPosition, onSelect }: PositionSelectorProps) {
    return (
        <div className="space-y-4">
            <div className="text-center space-y-2">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#1C252E] dark:text-white">
                    Bạn đang tìm việc vị trí gì?
                </h2>
                <p className="text-[#637381] dark:text-[#919EAB] text-sm">
                    Chọn vị trí để xem các mẫu CV phù hợp nhất
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
                {POSITIONS.map((position, index) => {
                    const Icon = iconMap[position.icon as keyof typeof iconMap];
                    const isSelected = selectedPosition === position.id;
                    const colors = positionColors[position.id];
                    const templateCount = getTemplateCount(position.id);

                    return (
                        <motion.button
                            key={position.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.03, y: -4 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => onSelect(isSelected ? null : position.id)}
                            className={cn(
                                "relative p-4 md:p-6 rounded-2xl border-2 transition-all duration-300",
                                "flex flex-col items-center gap-3 text-center",
                                isSelected
                                    ? `${colors.border} ${colors.bg} shadow-lg ${colors.shadow}`
                                    : "border-[rgba(145,158,171,0.2)] dark:border-white/[0.08] bg-white dark:bg-[#1C252E] hover:border-[rgba(145,158,171,0.4)] dark:hover:border-white/[0.16] hover:shadow-md"
                            )}
                        >
                            {/* Selected checkmark */}
                            {isSelected && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className={cn(
                                        "absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center",
                                        `bg-gradient-to-br ${colors.icon}`
                                    )}
                                >
                                    <Check className="w-3.5 h-3.5 text-white" />
                                </motion.div>
                            )}

                            {/* Template count badge */}
                            <div className="absolute top-2 left-2">
                                <span className={cn(
                                    "px-2 py-0.5 rounded-full text-xs font-semibold",
                                    isSelected
                                        ? `bg-gradient-to-r ${colors.icon} text-white`
                                        : "bg-[rgba(145,158,171,0.1)] dark:bg-white/[0.06] text-[#637381] dark:text-[#919EAB]"
                                )}>
                                    {templateCount} mẫu
                                </span>
                            </div>

                            {/* Icon with gradient */}
                            <div className={cn(
                                "w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 mt-2",
                                `bg-gradient-to-br ${colors.icon} text-white`,
                                isSelected && `shadow-lg ${colors.shadow}`
                            )}>
                                <Icon className="w-7 h-7" />
                            </div>

                            {/* Text */}
                            <div className="space-y-1">
                                <p className={cn(
                                    "font-bold text-sm md:text-base",
                                    isSelected ? colors.text : "text-[#1C252E] dark:text-white"
                                )}>
                                    {position.name}
                                </p>
                                <p className="text-xs hidden md:block text-[#637381] dark:text-[#919EAB] line-clamp-1">
                                    {position.description}
                                </p>
                            </div>
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
}
