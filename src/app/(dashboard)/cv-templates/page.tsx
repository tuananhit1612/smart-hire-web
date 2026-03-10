"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowLeft, Sparkles } from "lucide-react";
import { ParticleBackground } from "@/shared/components/effects/ParticleBackground";
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
        router.push('/cv-builder?mode=new');
    };

    return (
        <div className="w-full relative overflow-hidden bg-white dark:bg-[#141A21]">
            {/* Animated Background - Particle Theme */}
            <ParticleBackground />

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 md:py-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8 md:mb-12"
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 dark:bg-green-900/30 border border-green-100 dark:border-green-800/50 mb-4"
                    >
                        <Sparkles className="w-4 h-4 text-green-500 dark:text-green-400" />
                        <span className="text-sm font-medium text-green-600 dark:text-green-300">
                            Thư viện mẫu CV
                        </span>
                    </motion.div>

                    {/* Title */}
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-[#1C252E] dark:text-white mb-3">
                        Chọn mẫu CV
                        <span className="bg-gradient-to-r from-green-500 via-emerald-500 to-emerald-500 bg-clip-text text-transparent">
                            {" "}phù hợp với bạn
                        </span>
                    </h1>
                    <p className="text-[#637381] dark:text-[#919EAB] text-base md:text-lg max-w-2xl mx-auto">
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
