"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Plus, Crown } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { CVTemplate, filterTemplates, TEMPLATES, JobPosition, TemplateStyle } from "@/features/cv/types/template-types";
import { TemplateCard } from "./TemplateCard";
import { SortDropdown, SortOption } from "./SortDropdown";
import { SkeletonTemplateGrid } from "@/shared/components/ui/skeleton";

interface TemplatesGridProps {
    selectedPosition: JobPosition | null;
    selectedStyle: TemplateStyle | 'all';
    searchQuery: string;
    onSelectTemplate: (template: CVTemplate) => void;
    onPreviewTemplate: (template: CVTemplate) => void;
    onStartFromScratch: () => void;
}

// Get recommended templates based on position
function getRecommendedTemplates(position: JobPosition | null, templates: CVTemplate[]): CVTemplate[] {
    if (!position) return [];
    return templates
        .filter(t => t.positions.includes(position))
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0, 2);
}

// Sort templates
function sortTemplates(templates: CVTemplate[], sortBy: SortOption): CVTemplate[] {
    const sorted = [...templates];
    switch (sortBy) {
        case 'popular':
            return sorted.sort((a, b) => b.popularity - a.popularity);
        case 'newest':
            // Mock: reverse order to simulate "newest"
            return sorted.reverse();
        case 'name':
            return sorted.sort((a, b) => a.name.localeCompare(b.name));
        default:
            return sorted;
    }
}

// Search filter
function searchTemplates(templates: CVTemplate[], query: string): CVTemplate[] {
    if (!query.trim()) return templates;
    const lowerQuery = query.toLowerCase();
    return templates.filter(t =>
        t.name.toLowerCase().includes(lowerQuery) ||
        t.description.toLowerCase().includes(lowerQuery) ||
        t.features.some(f => f.toLowerCase().includes(lowerQuery))
    );
}

export function TemplatesGrid({
    selectedPosition,
    selectedStyle,
    searchQuery,
    onSelectTemplate,
    onPreviewTemplate,
    onStartFromScratch
}: TemplatesGridProps) {
    const [sortBy, setSortBy] = React.useState<SortOption>('popular');
    const [isLoading, setIsLoading] = React.useState(false);

    // Simulate loading when filters change
    React.useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => setIsLoading(false), 300);
        return () => clearTimeout(timer);
    }, [selectedPosition, selectedStyle, searchQuery, sortBy]);

    // Filter, search, and sort
    let filteredTemplates = filterTemplates(TEMPLATES, selectedPosition, selectedStyle);
    filteredTemplates = searchTemplates(filteredTemplates, searchQuery);
    filteredTemplates = sortTemplates(filteredTemplates, sortBy);

    const recommendedTemplates = getRecommendedTemplates(selectedPosition, filteredTemplates);
    const recommendedIds = recommendedTemplates.map(t => t.id);

    // Show skeleton when loading
    if (isLoading) {
        return <SkeletonTemplateGrid count={6} />;
    }

    return (
        <div className="space-y-8">
            {/* Recommended Section */}
            <AnimatePresence>
                {selectedPosition && recommendedTemplates.length > 0 && !searchQuery && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-4"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-gradient-to-r from-sky-500 to-green-500">
                                <Crown className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-[#1C252E] dark:text-white">
                                    Đề xuất cho bạn
                                </h3>
                                <p className="text-sm text-[#637381] dark:text-[#919EAB]">
                                    Mẫu CV được đánh giá cao nhất cho vị trí này
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {recommendedTemplates.map((template, index) => (
                                <motion.div
                                    key={template.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <TemplateCard
                                        template={template}
                                        onSelect={onSelectTemplate}
                                        onPreview={onPreviewTemplate}
                                        isRecommended
                                    />
                                </motion.div>
                            ))}
                        </div>

                        {/* Divider */}
                        <div className="relative py-4">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-[rgba(145,158,171,0.15)] dark:border-white/[0.08]" />
                            </div>
                            <div className="relative flex justify-center">
                                <span className="px-4 bg-white dark:bg-[#141A21] text-sm text-[#637381] dark:text-[#919EAB]">
                                    Tất cả mẫu CV
                                </span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Results count & Sort */}
            <div className="flex items-center justify-between">
                <p className="text-sm text-[#637381] dark:text-[#919EAB]">
                    <span className="font-semibold text-[#1C252E] dark:text-white">
                        {filteredTemplates.length}
                    </span>{" "}
                    mẫu CV phù hợp
                    {searchQuery && (
                        <span className="ml-1">
                            cho "<span className="font-medium text-sky-600">{searchQuery}</span>"
                        </span>
                    )}
                </p>

                {/* Sort dropdown */}
                <SortDropdown value={sortBy} onChange={setSortBy} />
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Start from scratch card */}
                <motion.button
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onStartFromScratch}
                    className="group relative aspect-[3/4] rounded-3xl border-2 border-dashed border-[rgba(145,158,171,0.3)] dark:border-white/[0.12] hover:border-sky-400 dark:hover:border-sky-500 transition-all duration-300 flex flex-col items-center justify-center gap-4 bg-white dark:bg-[#1C252E] hover:bg-sky-50/50 dark:hover:bg-sky-900/10"
                >
                    {/* Icon */}
                    <div className="w-16 h-16 rounded-2xl bg-sky-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Plus className="w-8 h-8 text-sky-600" />
                    </div>

                    <div className="text-center space-y-1">
                        <p className="font-semibold text-[#1C252E] dark:text-white">
                            Tạo CV từ đầu
                        </p>
                        <p className="text-sm text-[#637381] dark:text-[#919EAB]">
                            Bắt đầu với template trống
                        </p>
                    </div>

                    {/* Hover glow */}
                    <div className="absolute inset-0 rounded-3xl bg-sky-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>

                {/* Template cards (exclude recommended if already shown) */}
                <AnimatePresence mode="popLayout">
                    {filteredTemplates
                        .filter(t => !selectedPosition || searchQuery || !recommendedIds.includes(t.id))
                        .map((template, index) => (
                            <motion.div
                                key={template.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <TemplateCard
                                    template={template}
                                    onSelect={onSelectTemplate}
                                    onPreview={onPreviewTemplate}
                                />
                            </motion.div>
                        ))}
                </AnimatePresence>
            </div>

            {/* Empty state */}
            {filteredTemplates.length === 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-16"
                >
                    <div className="w-20 h-20 rounded-2xl bg-[rgba(145,158,171,0.08)] dark:bg-white/[0.04] flex items-center justify-center mx-auto mb-4">
                        <FileText className="w-10 h-10 text-[#919EAB]" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#1C252E] dark:text-white mb-2">
                        Không tìm thấy mẫu CV phù hợp
                    </h3>
                    <p className="text-[#637381] dark:text-[#919EAB] mb-4">
                        {searchQuery
                            ? `Không có kết quả cho "${searchQuery}"`
                            : "Thử thay đổi bộ lọc hoặc tạo CV từ đầu"
                        }
                    </p>
                    <button
                        onClick={onStartFromScratch}
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-emerald-500 text-white font-semibold shadow-lg shadow-sky-500/20"
                    >
                        Tạo CV từ đầu
                    </button>
                </motion.div>
            )}
        </div>
    );
}
