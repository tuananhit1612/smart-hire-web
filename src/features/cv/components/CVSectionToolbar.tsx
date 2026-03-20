"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, ArrowDown, Plus, Trash2, Eye } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { CVSection, CV_SECTIONS } from "@/features/cv/types/types";

export type SectionAction = "delete" | "moveUp" | "moveDown";

interface CVSectionToolbarProps {
    sectionLabel: string;
    isFirst: boolean;
    isLast: boolean;
    /** Sections currently hidden — drives the "+" dropdown */
    hiddenSections?: CVSection[];
    onAction: (action: SectionAction) => void;
    /** Called when user picks a hidden section to restore */
    onRestoreSection?: (section: CVSection) => void;
}

const BTN =
    "flex items-center justify-center w-7 h-7 rounded-md transition-colors duration-150 disabled:opacity-30 disabled:cursor-not-allowed";

/**
 * Floating mini-toolbar shown on section hover.
 * Provides add-back / delete / move-up / move-down quick actions.
 */
export function CVSectionToolbar({
    sectionLabel,
    isFirst,
    isLast,
    hiddenSections = [],
    onAction,
    onRestoreSection,
}: CVSectionToolbarProps) {
    const [showDropdown, setShowDropdown] = React.useState(false);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    // Stop clicks from propagating to the section wrapper / scaling container
    const fire = (action: SectionAction) => (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        onAction(action);
    };

    // Close dropdown on outside click
    React.useEffect(() => {
        if (!showDropdown) return;
        const handleClick = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [showDropdown]);

    const handleAddClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        if (hiddenSections.length === 0) return;
        setShowDropdown((p) => !p);
    };

    const handleRestore = (section: CVSection) => (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        onRestoreSection?.(section);
        setShowDropdown(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={cn(
                "absolute -top-3 right-3 z-50 flex items-center gap-0.5",
                "bg-gray-900/90 backdrop-blur-md rounded-lg shadow-xl shadow-black/20",
                "border border-white/10 px-1.5 py-1",
            )}
        >
            {/* Section label chip */}
            <span className="text-[10px] font-semibold text-white/60 pl-1.5 pr-2 select-none whitespace-nowrap">
                {sectionLabel}
            </span>

            <div className="w-px h-4 bg-white/15 mx-0.5" />

            {/* Add (restore hidden section) — shows dropdown */}
            <div className="relative" ref={dropdownRef}>
                <button
                    type="button"
                    title={hiddenSections.length > 0 ? "Thêm mục đã ẩn" : "Không có mục đang ẩn"}
                    disabled={hiddenSections.length === 0}
                    onClick={handleAddClick}
                    className={cn(BTN, "text-green-400/80 hover:text-green-300 hover:bg-green-500/20")}
                >
                    <Plus className="w-3.5 h-3.5" />
                </button>

                {/* Dropdown listing hidden sections */}
                <AnimatePresence>
                    {showDropdown && hiddenSections.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: -4, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -4, scale: 0.95 }}
                            transition={{ duration: 0.12 }}
                            className={cn(
                                "absolute top-full right-0 mt-1.5 min-w-[160px]",
                                "bg-gray-900/95 backdrop-blur-md rounded-lg shadow-xl shadow-black/30",
                                "border border-white/10 py-1 z-[60]",
                            )}
                        >
                            <div className="px-2.5 py-1.5 text-[10px] font-semibold text-white/40 uppercase tracking-wider">
                                Mục đang ẩn
                            </div>
                            {hiddenSections.map((sectionId) => {
                                const cfg = CV_SECTIONS.find((s) => s.id === sectionId);
                                return (
                                    <button
                                        key={sectionId}
                                        type="button"
                                        onClick={handleRestore(sectionId)}
                                        className={cn(
                                            "w-full flex items-center gap-2 px-2.5 py-1.5 text-left",
                                            "text-xs text-white/70 hover:text-white hover:bg-white/10",
                                            "transition-colors duration-100",
                                        )}
                                    >
                                        <Eye className="w-3 h-3 text-green-400/70 shrink-0" />
                                        <span>{cfg?.title ?? sectionId}</span>
                                    </button>
                                );
                            })}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Delete / hide section */}
            <button
                type="button"
                title="Ẩn mục này"
                onClick={fire("delete")}
                className={cn(BTN, "text-red-400/80 hover:text-red-300 hover:bg-red-500/20")}
            >
                <Trash2 className="w-3.5 h-3.5" />
            </button>

            <div className="w-px h-4 bg-white/15 mx-0.5" />

            {/* Move up */}
            <button
                type="button"
                title="Di chuyển lên"
                disabled={isFirst}
                onClick={fire("moveUp")}
                className={cn(BTN, "text-white/70 hover:text-white hover:bg-white/15")}
            >
                <ArrowUp className="w-3.5 h-3.5" />
            </button>

            {/* Move down */}
            <button
                type="button"
                title="Di chuyển xuống"
                disabled={isLast}
                onClick={fire("moveDown")}
                className={cn(BTN, "text-white/70 hover:text-white hover:bg-white/15")}
            >
                <ArrowDown className="w-3.5 h-3.5" />
            </button>
        </motion.div>
    );
}
