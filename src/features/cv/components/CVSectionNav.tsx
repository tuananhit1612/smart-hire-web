"use client";

import * as React from "react";
import { motion, LayoutGroup } from "framer-motion";
import { CVSection, CV_SECTIONS } from "../types/types";
import { cn } from "@/lib/utils";
import {
    User,
    FileText,
    GraduationCap,
    Briefcase,
    Zap,
    FolderKanban,
    Globe,
    Award,
    Trophy,
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
    Globe,
    Award,
    Trophy,
};

export function CVSectionNav({
    activeSection,
    onSectionChange,
    completedSections = [],
}: CVSectionNavProps) {
    const navRef = React.useRef<HTMLDivElement>(null);
    const buttonRefs = React.useRef<Map<string, HTMLButtonElement>>(new Map());

    // Auto-scroll the active tab into view (centered)
    React.useEffect(() => {
        const btn = buttonRefs.current.get(activeSection);
        if (btn && navRef.current) {
            const nav = navRef.current;
            const btnRect = btn.getBoundingClientRect();
            const navRect = nav.getBoundingClientRect();
            const scrollLeft =
                btn.offsetLeft - nav.offsetWidth / 2 + btnRect.width / 2;
            nav.scrollTo({ left: scrollLeft, behavior: "smooth" });
        }
    }, [activeSection]);

    return (
        <LayoutGroup>
            <nav
                ref={navRef}
                className="relative flex items-center gap-1 overflow-x-auto py-1 px-1 [&::-webkit-scrollbar]:hidden"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {CV_SECTIONS.map((section, index) => {
                    const Icon = iconMap[section.icon];
                    const isActive = activeSection === section.id;
                    const isCompleted = completedSections.includes(section.id);

                    return (
                        <button
                            key={section.id}
                            ref={(el) => {
                                if (el) buttonRefs.current.set(section.id, el);
                            }}
                            onClick={() => onSectionChange(section.id)}
                            className={cn(
                                "relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors cursor-pointer font-sans",
                                isActive
                                    ? "text-green-700 dark:text-green-400"
                                    : isCompleted
                                        ? "text-green-600/70 dark:text-green-500/70 hover:text-green-700 dark:hover:text-green-400"
                                        : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                            )}
                        >
                            {/* Sliding active pill background */}
                            {isActive && (
                                <motion.div
                                    layoutId="activeSectionPill"
                                    className="absolute inset-0 rounded-xl bg-green-50 dark:bg-green-500/15 border border-green-200/60 dark:border-green-500/25 shadow-sm"
                                    transition={{
                                        type: "spring",
                                        stiffness: 350,
                                        damping: 30,
                                        mass: 0.8,
                                    }}
                                    style={{ originX: 0.5, originY: 0.5 }}
                                />
                            )}

                            {/* Icon */}
                            <span className="relative z-10">
                                {isCompleted && !isActive ? (
                                    <Check className="w-3.5 h-3.5" />
                                ) : (
                                    <Icon className="w-3.5 h-3.5" />
                                )}
                            </span>

                            {/* Label */}
                            <span className="relative z-10 hidden sm:inline">
                                {section.title}
                            </span>

                            {/* Step dot (mobile) */}
                            <span className="relative z-10 sm:hidden text-[10px] opacity-60">
                                {index + 1}
                            </span>
                        </button>
                    );
                })}
            </nav>
        </LayoutGroup>
    );
}
