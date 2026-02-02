"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowLeft, Sparkles } from "lucide-react";
import { ParticleBackground } from "@/shared/components/effects/ParticleBackground";
import { Header } from "@/shared/components/layout/Header";
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
        <div className="min-h-screen relative overflow-hidden bg-white">
            {/* Animated Background - Particle Theme */}
            <ParticleBackground />
            <Header />

            {/* Content - Added padding top for header */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 md:py-12 pt-24 lg:pt-28">
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
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-50 border border-sky-100 mb-4"
                    >
                        <Sparkles className="w-4 h-4 text-sky-500" />
                        <span className="text-sm font-medium text-sky-600">
                            Thư viện mẫu CV
                        </span>
                    </motion.div>

                    {/* Title */}
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 mb-3">
                        Chọn mẫu CV
                        <span className="bg-gradient-to-r from-sky-500 via-blue-500 to-emerald-500 bg-clip-text text-transparent">
                            {" "}phù hợp với bạn
                        </span>
                    </h1>
                    <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
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
