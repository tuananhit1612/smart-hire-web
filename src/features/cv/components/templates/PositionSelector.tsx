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

// Unique colors for each position
const positionColors: Record<JobPosition, { bg: string; border: string; icon: string; shadow: string; text: string }> = {
    developer: {
        bg: "bg-blue-50 dark:bg-blue-950/50",
        border: "border-blue-500",
        icon: "from-blue-500 to-cyan-500",
        shadow: "shadow-blue-500/30",
        text: "text-blue-600 dark:text-blue-400"
    },
    designer: {
        bg: "bg-pink-50 dark:bg-pink-950/50",
        border: "border-pink-500",
        icon: "from-pink-500 to-rose-500",
        shadow: "shadow-pink-500/30",
        text: "text-pink-600 dark:text-pink-400"
    },
    marketing: {
        bg: "bg-orange-50 dark:bg-orange-950/50",
        border: "border-orange-500",
        icon: "from-orange-500 to-amber-500",
        shadow: "shadow-orange-500/30",
        text: "text-orange-600 dark:text-orange-400"
    },
    business: {
        bg: "bg-emerald-50 dark:bg-emerald-950/50",
        border: "border-emerald-500",
        icon: "from-emerald-500 to-teal-500",
        shadow: "shadow-emerald-500/30",
        text: "text-emerald-600 dark:text-emerald-400"
    },
    other: {
        bg: "bg-violet-50 dark:bg-violet-950/50",
        border: "border-violet-500",
        icon: "from-violet-500 to-purple-500",
        shadow: "shadow-violet-500/30",
        text: "text-violet-600 dark:text-violet-400"
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
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Bạn đang tìm việc vị trí gì?
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
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
                                    : "border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:border-gray-300 dark:hover:border-zinc-600 hover:shadow-md"
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
                                        : "bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400"
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
                                    isSelected ? colors.text : "text-gray-900 dark:text-white"
                                )}>
                                    {position.name}
                                </p>
                                <p className="text-xs hidden md:block text-gray-500 dark:text-gray-400 line-clamp-1">
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
