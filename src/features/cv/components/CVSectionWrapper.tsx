"use client";

import * as React from "react";
import { AnimatePresence } from "framer-motion";
import { cn } from "@/shared/utils/cn";
import { CVSection, CV_SECTIONS } from "@/features/cv/types/types";
import {
    CVSectionToolbar,
    type SectionAction,
} from "./CVSectionToolbar";

interface CVSectionWrapperProps {
    /** Which section this wraps */
    section: CVSection;
    /** Current index in the visible ordering (column-relative for multi-column templates) */
    index: number;
    /** Total number of visible sections (in the same column for multi-column templates) */
    total: number;
    /** Whether to show the hover toolbar */
    showToolbar?: boolean;
    /** Ordered list of sections in the same column (for column-aware reordering) */
    columnSections?: CVSection[];
    /** Sections currently hidden — forwarded to toolbar "+" dropdown */
    hiddenSections?: CVSection[];
    /** Callback when the user clicks a toolbar action */
    onAction?: (action: SectionAction, section: CVSection, columnSections?: CVSection[]) => void;
    /** Callback to add a new item to this section's list */
    onAddItem?: () => void;
    children: React.ReactNode;
    className?: string;
}

/**
 * Wraps a single CV section, adding a hover overlay + floating toolbar.
 *
 * When `showToolbar` is falsy (e.g. during PDF export) it renders just
 * a plain `<div>` with zero visual overhead.
 */
export function CVSectionWrapper({
    section,
    index,
    total,
    showToolbar = false,
    columnSections,
    onAction,
    onAddItem,
    children,
    className,
}: CVSectionWrapperProps) {
    const [hovered, setHovered] = React.useState(false);
    const wrapperRef = React.useRef<HTMLDivElement>(null);
    const leaveTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    // Resolve human-readable label for the toolbar chip
    const label =
        CV_SECTIONS.find((s) => s.id === section)?.title ?? section;

    const handleMouseEnter = React.useCallback(() => {
        if (leaveTimer.current) {
            clearTimeout(leaveTimer.current);
            leaveTimer.current = null;
        }
        setHovered(true);
    }, []);

    const handleMouseLeave = React.useCallback(
        (e: React.MouseEvent) => {
            // Check if the mouse moved to a child element (e.g. the toolbar
            // which is positioned outside bounds via negative top).
            const related = e.relatedTarget;
            if (
                related instanceof Node &&
                wrapperRef.current?.contains(related)
            ) {
                return; // still inside our tree — stay hovered
            }
            // Small delay so brief boundary crosses don't flicker
            leaveTimer.current = setTimeout(() => setHovered(false), 80);
        },
        [],
    );

    // Cleanup timer on unmount
    React.useEffect(() => {
        return () => {
            if (leaveTimer.current) clearTimeout(leaveTimer.current);
        };
    }, []);

    if (!showToolbar) {
        return <div className={className}>{children}</div>;
    }

    return (
        <div
            ref={wrapperRef}
            className={cn("relative group/section", className)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Hover highlight ring */}
            <div
                className={cn(
                    "absolute inset-0 rounded-lg pointer-events-none transition-all duration-200 -m-1",
                    hovered
                        ? "ring-2 ring-purple-400/40 bg-purple-50/5"
                        : "ring-0 ring-transparent",
                )}
            />

            {/* Floating toolbar */}
            <AnimatePresence>
                {hovered && (
                    <CVSectionToolbar
                        sectionLabel={label}
                        isFirst={index === 0}
                        isLast={index === total - 1}
                        onAction={(action) => onAction?.(action, section, columnSections)}
                        onAddItem={onAddItem}
                    />
                )}
            </AnimatePresence>

            {children}
        </div>
    );
}
