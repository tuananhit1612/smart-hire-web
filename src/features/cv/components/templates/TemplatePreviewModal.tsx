"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ChevronLeft, ChevronRight, Download, ExternalLink } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { CVTemplate } from "@/features/cv/types/template-types";

interface TemplatePreviewModalProps {
    template: CVTemplate | null;
    isOpen: boolean;
    onClose: () => void;
    onSelect: (template: CVTemplate) => void;
}

export function TemplatePreviewModal({ template, isOpen, onClose, onSelect }: TemplatePreviewModalProps) {
    // Close on escape
    React.useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    if (!template) return null;

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
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="fixed inset-4 md:inset-10 z-50 flex items-center justify-center"
                    >
                        <div className="relative w-full max-w-5xl h-full max-h-[90vh] bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200 dark:border-zinc-800">
                                <div className="flex items-center gap-4">
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                                        style={{ backgroundColor: template.colors.primary + '20' }}
                                    >
                                        <div
                                            className="w-5 h-5 rounded-lg"
                                            style={{ backgroundColor: template.colors.primary }}
                                        />
                                    </div>
                                    <div>
                                        <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                                            {template.name}
                                        </h2>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {template.description}
                                        </p>
                                    </div>
                                </div>

                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                                >
                                    <X className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>

                            {/* Preview content */}
                            <div className="flex-1 overflow-auto p-4 md:p-8 bg-gray-100 dark:bg-zinc-950">
                                <div className="max-w-3xl mx-auto">
                                    {/* CV Preview - A4 ratio */}
                                    <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl overflow-hidden aspect-[1/1.414]">
                                        <div className="p-8 md:p-12 space-y-6">
                                            {/* Header section */}
                                            <div className="flex items-start gap-6">
                                                <div
                                                    className="w-20 h-20 md:w-24 md:h-24 rounded-2xl flex-shrink-0"
                                                    style={{ backgroundColor: template.colors.primary + '20' }}
                                                />
                                                <div className="flex-1 space-y-2">
                                                    <div
                                                        className="h-6 md:h-8 rounded-lg w-2/3"
                                                        style={{ backgroundColor: template.colors.primary }}
                                                    />
                                                    <div className="h-4 bg-gray-200 dark:bg-zinc-700 rounded-lg w-1/2" />
                                                    <div className="flex gap-2 mt-3">
                                                        <div className="h-3 bg-gray-200 dark:bg-zinc-700 rounded-full w-24" />
                                                        <div className="h-3 bg-gray-200 dark:bg-zinc-700 rounded-full w-32" />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Summary */}
                                            <div className="space-y-3">
                                                <div
                                                    className="h-4 rounded-lg w-24"
                                                    style={{ backgroundColor: template.colors.secondary }}
                                                />
                                                <div className="space-y-2">
                                                    <div className="h-3 bg-gray-200 dark:bg-zinc-700 rounded-full w-full" />
                                                    <div className="h-3 bg-gray-200 dark:bg-zinc-700 rounded-full w-11/12" />
                                                    <div className="h-3 bg-gray-200 dark:bg-zinc-700 rounded-full w-4/5" />
                                                </div>
                                            </div>

                                            {/* Experience */}
                                            <div className="space-y-3">
                                                <div
                                                    className="h-4 rounded-lg w-32"
                                                    style={{ backgroundColor: template.colors.secondary }}
                                                />
                                                <div className="space-y-4">
                                                    {[1, 2].map((i) => (
                                                        <div key={i} className="space-y-2 pl-4 border-l-2" style={{ borderColor: template.colors.accent }}>
                                                            <div className="h-3 bg-gray-300 dark:bg-zinc-600 rounded-full w-1/2" />
                                                            <div className="h-2.5 bg-gray-200 dark:bg-zinc-700 rounded-full w-1/3" />
                                                            <div className="space-y-1.5">
                                                                <div className="h-2 bg-gray-200 dark:bg-zinc-700 rounded-full w-full" />
                                                                <div className="h-2 bg-gray-200 dark:bg-zinc-700 rounded-full w-5/6" />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Skills */}
                                            <div className="space-y-3">
                                                <div
                                                    className="h-4 rounded-lg w-20"
                                                    style={{ backgroundColor: template.colors.secondary }}
                                                />
                                                <div className="flex flex-wrap gap-2">
                                                    {[1, 2, 3, 4, 5, 6].map((i) => (
                                                        <div
                                                            key={i}
                                                            className="h-6 px-3 rounded-full"
                                                            style={{
                                                                backgroundColor: template.colors.accent + '30',
                                                                width: `${60 + Math.random() * 40}px`
                                                            }}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between p-4 md:p-6 border-t border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                                <div className="flex flex-wrap gap-2">
                                    {template.features.map((feature) => (
                                        <span
                                            key={feature}
                                            className="px-3 py-1 rounded-full bg-gray-100 dark:bg-zinc-800 text-xs font-medium text-gray-600 dark:text-gray-400"
                                        >
                                            {feature}
                                        </span>
                                    ))}
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => onSelect(template)}
                                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold flex items-center gap-2 shadow-lg shadow-indigo-500/25"
                                >
                                    <Check className="w-5 h-5" />
                                    Sử dụng mẫu này
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
