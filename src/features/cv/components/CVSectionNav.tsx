"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { CVSection, CV_SECTIONS } from "../types/types";
import { cn } from "@/lib/utils";
import {
    User,
    FileText,
    GraduationCap,
    Briefcase,
    Zap,
    FolderKanban,
    Check,
} from "lucide-react";

interface CVSectionNavProps {
    activeSection: CVSection;
    onSectionChange: (section: CVSection) => void;
    completedSections?: CVSection[];
}

const iconMap: Record<string, React.ElementType> = {
    User,
    FileText,
    GraduationCap,
    Briefcase,
    Zap,
    FolderKanban,
};

export function CVSectionNav({
    activeSection,
    onSectionChange,
    completedSections = [],
}: CVSectionNavProps) {
    return (
        <nav className="flex flex-col gap-2">
            {/* Header */}
            <div className="mb-4">
                <h2 className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 font-medium">
                    Các mục CV
                </h2>
            </div>

            {/* Section Items */}
            {CV_SECTIONS.map((section, index) => {
                const Icon = iconMap[section.icon];
                const isActive = activeSection === section.id;
                const isCompleted = completedSections.includes(section.id);

                return (
                    <motion.button
                        key={section.id}
                        onClick={() => onSectionChange(section.id)}
                        className={cn(
                            "relative flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 cursor-pointer group",
                            isActive
                                ? "bg-white dark:bg-white/10 shadow-lg"
                                : "hover:bg-gray-100 dark:hover:bg-white/5"
                        )}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {/* Holographic Active Border */}
                        {isActive && (
                            <motion.div
                                layoutId="activeSection"
                                className="absolute inset-0 rounded-xl p-[1px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                                transition={{ type: "spring", duration: 0.5 }}
                            >
                                <div className="absolute inset-[1px] rounded-xl bg-white dark:bg-[#0B0F19]" />
                            </motion.div>
                        )}

                        {/* Content */}
                        <div className="relative z-10 flex items-center gap-3 w-full">
                            {/* Icon with number/check */}
                            <div
                                className={cn(
                                    "flex items-center justify-center w-9 h-9 rounded-lg transition-colors",
                                    isActive
                                        ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                                        : isCompleted
                                            ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                                            : "bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400"
                                )}
                            >
                                {isCompleted && !isActive ? (
                                    <Check className="w-4 h-4" />
                                ) : (
                                    <Icon className="w-4 h-4" />
                                )}
                            </div>

                            {/* Text */}
                            <div className="flex-1 min-w-0">
                                <div
                                    className={cn(
                                        "text-sm font-medium truncate transition-colors",
                                        isActive
                                            ? "text-gray-900 dark:text-white"
                                            : "text-gray-700 dark:text-gray-300"
                                    )}
                                >
                                    {section.title}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-500 truncate">
                                    {section.description}
                                </div>
                            </div>

                            {/* Step number */}
                            <div
                                className={cn(
                                    "text-xs font-medium",
                                    isActive
                                        ? "text-indigo-600 dark:text-indigo-400"
                                        : "text-gray-400 dark:text-gray-600"
                                )}
                            >
                                {index + 1}/{CV_SECTIONS.length}
                            </div>
                        </div>
                    </motion.button>
                );
            })}
        </nav>
    );
}
