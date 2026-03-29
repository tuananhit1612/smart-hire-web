"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, PenLine, User, Upload, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { useCVBuilderStore } from "@/features/cv/stores/cv-builder-store";
import { getMockDataForTemplate } from "@/features/cv/data/mock-data";

interface CVDataSourceModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const DATA_SOURCES = [
    {
        id: "manual" as const,
        icon: PenLine,
        title: "Nhập tay",
        description: "Tự điền thông tin từng mục trong CV",
        color: "from-blue-500 to-cyan-500",
        bgColor: "bg-blue-50 dark:bg-blue-900/20",
        iconColor: "text-blue-500",
    },
    {
        id: "profile" as const,
        icon: User,
        title: "Lấy từ Hồ sơ",
        description: "Tự động điền từ thông tin cá nhân có sẵn",
        color: "from-green-500 to-emerald-500",
        bgColor: "bg-green-50 dark:bg-green-900/20",
        iconColor: "text-green-500",
    },
    {
        id: "upload" as const,
        icon: Upload,
        title: "Upload CV có sẵn",
        description: "Tải lên file PDF/DOCX, AI sẽ trích xuất thông tin",
        color: "from-purple-500 to-violet-500",
        bgColor: "bg-purple-50 dark:bg-purple-900/20",
        iconColor: "text-purple-500",
        badge: "AI",
    },
];

export function CVDataSourceModal({ isOpen, onClose }: CVDataSourceModalProps) {
    const { selectedTemplateId, setCvData } = useCVBuilderStore();
    const [selectedSource, setSelectedSource] = React.useState<string | null>(null);

    const handleSelectSource = (sourceId: string) => {
        setSelectedSource(sourceId);

        setTimeout(() => {
            switch (sourceId) {
                case "manual":
                    // Load sample data — user edits directly on preview
                    const sampleData = getMockDataForTemplate(selectedTemplateId || "modern-tech");
                    setCvData(sampleData);
                    break;
                case "profile":
                    // Load mock data as profile simulation
                    // In real app, this would call mapProfileToCVData
                    const mockData = getMockDataForTemplate(selectedTemplateId || "modern-tech");
                    setCvData(mockData);
                    break;
                case "upload":
                    // For now, load mock data
                    // In real app, this would open file picker + AI parse
                    const templateData = getMockDataForTemplate(selectedTemplateId || "modern-tech");
                    setCvData(templateData);
                    break;
            }
            onClose();
            setSelectedSource(null);
        }, 600);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="bg-white dark:bg-[#1C252E] rounded-3xl shadow-2xl p-8 max-w-lg w-full mx-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                                    Bắt đầu tạo CV
                                </h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    Chọn cách bạn muốn nhập thông tin
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Options */}
                        <div className="space-y-3">
                            {DATA_SOURCES.map((source) => {
                                const Icon = source.icon;
                                const isSelected = selectedSource === source.id;

                                return (
                                    <motion.button
                                        key={source.id}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => handleSelectSource(source.id)}
                                        disabled={!!selectedSource}
                                        className={`
                                            w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left
                                            ${isSelected
                                                ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                                                : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md"
                                            }
                                            disabled:cursor-not-allowed
                                        `}
                                    >
                                        {/* Icon */}
                                        <div className={`w-12 h-12 rounded-xl ${source.bgColor} flex items-center justify-center shrink-0`}>
                                            {isSelected ? (
                                                <CheckCircle2 className="w-6 h-6 text-green-500" />
                                            ) : (
                                                <Icon className={`w-6 h-6 ${source.iconColor}`} />
                                            )}
                                        </div>

                                        {/* Text */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-sm font-bold text-gray-800 dark:text-white">
                                                    {source.title}
                                                </h3>
                                                {source.badge && (
                                                    <span className="px-1.5 py-0.5 text-[10px] font-bold bg-gradient-to-r from-purple-500 to-violet-500 text-white rounded-md">
                                                        {source.badge}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                                {source.description}
                                            </p>
                                        </div>

                                        {/* Arrow */}
                                        <ArrowRight className={`w-4 h-4 shrink-0 transition-colors ${isSelected ? "text-green-500" : "text-gray-300"}`} />
                                    </motion.button>
                                );
                            })}
                        </div>

                        {/* Skip hint */}
                        <p className="text-center text-xs text-gray-400 mt-5">
                            Bạn có thể thay đổi dữ liệu bất kỳ lúc nào sau khi chọn
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
