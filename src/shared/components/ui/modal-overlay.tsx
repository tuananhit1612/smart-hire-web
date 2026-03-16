"use client";

/**
 * ═══════════════════════════════════════════════════════════
 *  Modal Overlay — Shared backdrop + centered container
 *  Replaces 10+ duplicated "fixed inset-0 z-50" patterns.
 *  Provides Framer Motion enter/exit animation.
 * ═══════════════════════════════════════════════════════════
 */

import { type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/shared/utils/cn";

interface ModalOverlayProps {
    /** Whether the overlay is visible */
    readonly isOpen: boolean;
    /** Called when clicking the backdrop */
    readonly onClose?: () => void;
    /** Modal content */
    readonly children: ReactNode;
    /** Extra class for the backdrop */
    readonly backdropClassName?: string;
    /** Extra class for the content container */
    readonly containerClassName?: string;
    /** Enable blur on backdrop (default: true) */
    readonly blur?: boolean;
}

export function ModalOverlay({
    isOpen,
    onClose,
    children,
    backdropClassName,
    containerClassName,
    blur = true,
}: ModalOverlayProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className={cn(
                            "fixed inset-0 z-50 bg-black/40",
                            blur && "backdrop-blur-sm",
                            backdropClassName,
                        )}
                    />

                    {/* Content container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96, y: 12 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 12 }}
                        className={cn(
                            "fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none",
                            containerClassName,
                        )}
                    >
                        <div className="pointer-events-auto" onClick={(e) => e.stopPropagation()}>
                            {children}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
