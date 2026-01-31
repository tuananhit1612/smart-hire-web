"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ChevronLeft, ChevronRight, Download, ExternalLink } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { CVTemplate } from "@/features/cv/types/template-types";
import { TEMPLATE_COMPONENTS } from "@/features/cv/components/cv-templates";
import { MOCK_DATA_INTERN, MOCK_DATA_LEADER, MOCK_DATA_SENIOR } from "@/features/cv/data/mock-data";
import { CVData } from "@/features/cv/types/types";

interface TemplatePreviewModalProps {
    template: CVTemplate | null;
    isOpen: boolean;
    onClose: () => void;
    onSelect: (template: CVTemplate) => void;
}

import { getMockDataForTemplate } from "@/features/cv/data/mock-data";

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
                        <div className="relative w-full max-w-5xl h-full max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col">
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
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
                                        <h2 className="text-lg md:text-xl font-bold text-gray-900">
                                            {template.name}
                                        </h2>
                                        <p className="text-sm text-gray-500">
                                            {template.description}
                                        </p>
                                    </div>
                                </div>

                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
                                >
                                    <X className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>

                            {/* Preview content */}
                            <div className="flex-1 overflow-auto p-4 md:p-8 bg-gray-100">
                                <div className="max-w-3xl mx-auto">
                                    {/* CV Preview - A4 ratio with dynamic component */}
                                    <div className="bg-white rounded-xl shadow-xl overflow-hidden min-h-[800px] origin-top">
                                        <div className="scale-[0.85] origin-top w-[210mm] min-h-[297mm] mx-auto bg-white">
                                            {(() => {
                                                const TemplateComponent = TEMPLATE_COMPONENTS[template.id] || TEMPLATE_COMPONENTS['modern-tech'];
                                                const mockData = getMockDataForTemplate(template.id);
                                                return <TemplateComponent data={mockData} />;
                                            })()}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between p-4 md:p-6 border-t border-gray-200 bg-white">
                                <div className="flex flex-wrap gap-2">
                                    {template.features.map((feature) => (
                                        <span
                                            key={feature}
                                            className="px-3 py-1 rounded-full bg-gray-100 text-xs font-medium text-gray-600"
                                        >
                                            {feature}
                                        </span>
                                    ))}
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => onSelect(template)}
                                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 via-emerald-500 to-green-500 text-white font-semibold flex items-center gap-2 shadow-lg shadow-sky-500/25"
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
