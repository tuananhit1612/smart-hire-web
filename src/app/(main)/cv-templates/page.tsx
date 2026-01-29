"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowLeft, Sparkles } from "lucide-react";
import { JobPosition, TemplateStyle, CVTemplate, TEMPLATES } from "@/features/cv/types/template-types";
import {
    PositionSelector,
    StyleFilter,
    TemplatesGrid,
    TemplatePreviewModal,
    SearchBar
} from "@/features/cv/components/templates";

export default function CVTemplatesPage() {
    const router = useRouter();
    const [selectedPosition, setSelectedPosition] = React.useState<JobPosition | null>(null);
    const [selectedStyle, setSelectedStyle] = React.useState<TemplateStyle | 'all'>('all');
    const [previewTemplate, setPreviewTemplate] = React.useState<CVTemplate | null>(null);
    const [isPreviewOpen, setIsPreviewOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState("");

    const handleSelectTemplate = (template: CVTemplate) => {
        router.push(`/cv-builder?template=${template.id}`);
    };

    const handlePreviewTemplate = (template: CVTemplate) => {
        setPreviewTemplate(template);
        setIsPreviewOpen(true);
    };

    const handleStartFromScratch = () => {
        router.push('/cv-builder');
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-gray-50 dark:bg-zinc-950">
            {/* Animated Aurora background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                {/* Blob 1 - Purple */}
                <motion.div
                    animate={{
                        x: [0, 30, -20, 0],
                        y: [0, -50, 20, 0],
                        scale: [1, 1.1, 0.9, 1]
                    }}
                    transition={{
                        duration: 7,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-0 -left-40 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-[120px] opacity-25 dark:opacity-35"
                />
                {/* Blob 2 - Indigo */}
                <motion.div
                    animate={{
                        x: [0, -30, 20, 0],
                        y: [0, 30, -40, 0],
                        scale: [1, 0.9, 1.1, 1]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                    className="absolute top-20 -right-40 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-[120px] opacity-25 dark:opacity-35"
                />
                {/* Blob 3 - Pink */}
                <motion.div
                    animate={{
                        x: [0, 40, -30, 0],
                        y: [0, -30, 40, 0],
                        scale: [1, 1.2, 0.8, 1]
                    }}
                    transition={{
                        duration: 9,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                    }}
                    className="absolute -bottom-40 left-1/3 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-[120px] opacity-25 dark:opacity-35"
                />
                {/* Blob 4 - Cyan (new) */}
                <motion.div
                    animate={{
                        x: [0, -20, 40, 0],
                        y: [0, 40, -20, 0],
                        scale: [1, 0.85, 1.15, 1]
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 3
                    }}
                    className="absolute top-1/2 right-1/4 w-80 h-80 bg-cyan-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 dark:opacity-30"
                />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 md:py-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8 md:mb-12"
                >
                    {/* Back button */}
                    <button
                        onClick={() => router.back()}
                        className="absolute left-4 top-8 md:top-12 p-2 rounded-xl hover:bg-white/50 dark:hover:bg-zinc-800/50 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </button>

                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 mb-4"
                    >
                        <Sparkles className="w-4 h-4 text-indigo-500" />
                        <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                            Thư viện mẫu CV
                        </span>
                    </motion.div>

                    {/* Title */}
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-3">
                        Chọn mẫu CV
                        <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                            {" "}phù hợp với bạn
                        </span>
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
                        Khám phá bộ sưu tập mẫu CV chuyên nghiệp, được thiết kế tối ưu cho từng ngành nghề
                    </p>
                </motion.div>

                {/* Search bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="mb-8"
                >
                    <SearchBar
                        value={searchQuery}
                        onChange={setSearchQuery}
                        placeholder="Tìm kiếm mẫu CV..."
                    />
                </motion.div>

                {/* Position selector */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8"
                >
                    <PositionSelector
                        selectedPosition={selectedPosition}
                        onSelect={setSelectedPosition}
                    />
                </motion.div>

                {/* Style filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-8"
                >
                    <StyleFilter
                        selectedStyle={selectedStyle}
                        onSelect={setSelectedStyle}
                    />
                </motion.div>

                {/* Templates grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <TemplatesGrid
                        selectedPosition={selectedPosition}
                        selectedStyle={selectedStyle}
                        searchQuery={searchQuery}
                        onSelectTemplate={handleSelectTemplate}
                        onPreviewTemplate={handlePreviewTemplate}
                        onStartFromScratch={handleStartFromScratch}
                    />
                </motion.div>
            </div>

            {/* Preview modal */}
            <TemplatePreviewModal
                template={previewTemplate}
                isOpen={isPreviewOpen}
                onClose={() => setIsPreviewOpen(false)}
                onSelect={handleSelectTemplate}
            />
        </div>
    );
}
