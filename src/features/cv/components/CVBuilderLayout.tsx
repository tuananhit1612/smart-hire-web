"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
    Save,
    CloudOff,
    Cloud,
    Loader2,
    Eye,
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { format } from "date-fns";

interface CVBuilderLayoutProps {
    /** Section tab bar (CVSectionNav) — rendered above the form */
    sectionTabs: React.ReactNode;
    /** Form panel content */
    formContent: React.ReactNode;
    /** Extra header actions (e.g. autosave indicator) */
    headerActions?: React.ReactNode;
    /** Save handler */
    onSave?: () => void;
    /** Preview / complete handler — navigates to preview page */
    onPreview?: () => void;
    /** Save state */
    isSaving?: boolean;
    autosaveStatus?: "saved" | "saving" | "unsaved";
    lastSaved?: Date;
}

export function CVBuilderLayout({
    sectionTabs,
    formContent,
    headerActions,
    onSave,
    onPreview,
    isSaving = false,
    autosaveStatus = "saved",
    lastSaved,
}: CVBuilderLayoutProps) {
    return (
        <div className="flex flex-col gap-4">
            {/* ─── Top Header Bar ─── */}
            <div className="flex items-center justify-between gap-4 flex-shrink-0">
                {/* Left: Title + Status */}
                <div className="flex items-center gap-3 min-w-0">
                    <h1 className="text-lg font-bold text-gray-900 dark:text-white whitespace-nowrap font-sans">
                        CV Builder
                    </h1>

                    {/* Autosave status */}
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        {autosaveStatus === "saving" ? (
                            <>
                                <Loader2 className="w-3 h-3 animate-spin" />
                                <span>Đang lưu...</span>
                            </>
                        ) : autosaveStatus === "saved" ? (
                            <>
                                <Cloud className="w-3 h-3 text-green-500" />
                                <span className="text-green-600 dark:text-green-400">
                                    {lastSaved
                                        ? `Đã lưu ${format(lastSaved, "HH:mm")}`
                                        : "Đã lưu"}
                                </span>
                            </>
                        ) : (
                            <>
                                <CloudOff className="w-3 h-3 text-amber-500" />
                                <span className="text-amber-500">Chưa lưu</span>
                            </>
                        )}
                    </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2">
                    {headerActions}

                    {onPreview && (
                        <Button
                            variant="outline"
                            size="sm"
                            leftIcon={<Eye className="w-4 h-4" />}
                            onClick={onPreview}
                        >
                            Xem trước
                        </Button>
                    )}

                    {onSave && (
                        <Button
                            variant="primary"
                            size="sm"
                            leftIcon={
                                isSaving ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <Save className="w-4 h-4" />
                                )
                            }
                            onClick={onSave}
                            disabled={isSaving}
                        >
                            {isSaving ? "Đang lưu..." : "Lưu CV"}
                        </Button>
                    )}
                </div>
            </div>

            {/* ─── Flat Layout (no card wrapper) ─── */}
            <div className="flex flex-col max-w-[960px] w-full mx-auto">
                {/* Section Tabs — sticky */}
                <div className="flex-shrink-0 border-b border-gray-100 dark:border-white/[0.06] pb-2 mb-6">
                    {sectionTabs}
                </div>

                {/* Form Content — scrollable */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className=""
                >
                    {formContent}
                </motion.div>
            </div>
        </div>
    );
}
