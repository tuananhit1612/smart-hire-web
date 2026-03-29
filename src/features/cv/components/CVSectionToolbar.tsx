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
    onAddItem?: () => void;
    onAction: (action: SectionAction) => void;
}

const BTN =
    "flex items-center justify-center w-7 h-7 rounded-md transition-colors duration-150 disabled:opacity-30 disabled:cursor-not-allowed";

export function CVSectionToolbar({
    sectionLabel,
    isFirst,
    isLast,
    onAction,
    onAddItem,
}: CVSectionToolbarProps) {
    // 

    const fire = (action: SectionAction) => (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        onAction(action);
    };

    const handleAddClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        onAddItem?.();
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

            {/* Add item */}
            {onAddItem && (
                <button
                    type="button"
                    title="Thêm mục con"
                    onClick={handleAddClick}
                    className={cn(BTN, "text-green-400/80 hover:text-green-300 hover:bg-green-500/20")}
                >
                    <Plus className="w-3.5 h-3.5" />
                </button>
            )}

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
