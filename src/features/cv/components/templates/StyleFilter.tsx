"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { LayoutGrid, Award, Sparkles, Minus, ScanLine } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { TemplateStyle, STYLES } from "@/features/cv/types/template-types";

const iconMap = {
    LayoutGrid,
    Award,
    Sparkles,
    Minus,
    ScanLine
};

interface StyleFilterProps {
    selectedStyle: TemplateStyle | 'all';
    onSelect: (style: TemplateStyle | 'all') => void;
}

export function StyleFilter({ selectedStyle, onSelect }: StyleFilterProps) {
    return (
        <div className="flex items-center justify-center gap-2 flex-wrap">
            {STYLES.map((style) => {
                const Icon = iconMap[style.icon as keyof typeof iconMap];
                const isSelected = selectedStyle === style.id;

                return (
                    <motion.button
                        key={style.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onSelect(style.id)}
                        className={cn(
                            "relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300",
                            "flex items-center gap-2",
                            isSelected
                                ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-indigo-500/25"
                                : "bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl border border-gray-200 dark:border-zinc-800 text-gray-700 dark:text-gray-300 hover:border-indigo-400 dark:hover:border-indigo-500"
                        )}
                    >
                        <Icon className="w-4 h-4" />
                        <span>{style.name}</span>

                        {/* Active indicator dot */}
                        {isSelected && (
                            <motion.div
                                layoutId="styleIndicator"
                                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"
                            />
                        )}
                    </motion.button>
                );
            })}
        </div>
    );
}
