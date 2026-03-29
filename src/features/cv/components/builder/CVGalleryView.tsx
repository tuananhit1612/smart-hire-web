"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Sparkles, Search } from "lucide-react";
import { ParticleBackground } from "@/shared/components/effects/ParticleBackground";
import { TEMPLATES, filterTemplates, type CVTemplate, type TemplateStyle } from "@/features/cv/types/template-types";
import { TEMPLATE_REGISTRY } from "@/features/cv/components/cv-templates";
import { useCVBuilderStore } from "@/features/cv/stores/cv-builder-store";
import { getMockDataForTemplate } from "@/features/cv/data/mock-data";

/* ─── Style tags ─── */
const STYLE_TAGS: { id: TemplateStyle | "all"; label: string }[] = [
    { id: "all", label: "Tất cả" },
    { id: "professional", label: "Chuyên nghiệp" },
    { id: "minimal", label: "Đơn giản" },
    { id: "creative", label: "Hiện đại" },
    { id: "ats-friendly", label: "ATS" },
];

/* ─── Live Template Preview (renders actual CV component at miniature scale) ─── */
function LiveTemplatePreview({ templateId }: { templateId: string }) {
    const entry = TEMPLATE_REGISTRY[templateId];
    if (!entry) return <FallbackSkeleton />;

    const TemplateComponent = entry.component;
    const sampleData = getMockDataForTemplate(templateId);

    return (
        <div className="w-full h-full overflow-hidden relative">
            {/* Render full A4 at real size, then scale down to fit */}
            <div
                className="origin-top-left"
                style={{
                    width: 794,           /* A4 px width at 96dpi */
                    minHeight: 1123,      /* A4 px height at 96dpi */
                    transform: "scale(var(--preview-scale, 0.36))",
                    transformOrigin: "top left",
                }}
            >
                <TemplateComponent
                    data={sampleData}
                    editable={false}
                />
            </div>
        </div>
    );
}

/* ─── Fallback skeleton for templates without a registered component ─── */
function FallbackSkeleton() {
    return (
        <div className="absolute inset-3 bg-white dark:bg-[#222] rounded-lg shadow-inner p-4 flex flex-col gap-2">
            <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600" />
                <div className="flex-1">
                    <div className="h-2.5 bg-gray-200 dark:bg-gray-600 rounded-full w-3/4 mb-1" />
                    <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full w-1/2" />
                </div>
            </div>
            {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full" style={{ width: `${90 - i * 8}%` }} />
            ))}
        </div>
    );
}

/* ─── Template Card ─── */
function TemplateCard({ template, onSelect }: { template: CVTemplate; onSelect: (t: CVTemplate) => void }) {
    const cardRef = React.useRef<HTMLDivElement>(null);

    // Calculate scale dynamically based on card width
    React.useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const cardWidth = entry.contentRect.width;
                const scale = cardWidth / 794; // A4 width in px
                card.style.setProperty("--preview-scale", String(scale));
            }
        });

        resizeObserver.observe(card);
        return () => resizeObserver.disconnect();
    }, []);

    return (
        <motion.div
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group cursor-pointer"
            onClick={() => onSelect(template)}
        >
            <div className="relative bg-white dark:bg-[#1C252E] rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
                {/* Preview area — live rendered template */}
                <div
                    ref={cardRef}
                    className="aspect-[210/297] bg-white dark:bg-white relative overflow-hidden"
                >
                    <LiveTemplatePreview templateId={template.id} />

                    {/* Fade gradient at bottom to blend into footer */}
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white dark:from-[#1C252E] to-transparent pointer-events-none" />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center z-10">
                        <div className="opacity-0 group-hover:opacity-100 px-6 py-2.5 bg-white rounded-xl font-semibold text-sm text-gray-800 shadow-xl transition-opacity duration-200">
                            Sử dụng mẫu này
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-4 py-3">
                    {/* Color dots */}
                    <div className="flex items-center gap-1.5 mb-2">
                        {Object.values(template.colors).map((color, i) => (
                            <span
                                key={i}
                                className="w-3.5 h-3.5 rounded-full border-2 border-white dark:border-gray-700 shadow-sm"
                                style={{ backgroundColor: color }}
                            />
                        ))}
                    </div>
                    {/* Name */}
                    <h3 className="font-bold text-sm text-gray-800 dark:text-white mb-1.5">
                        {template.name}
                    </h3>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                        <span className="px-2 py-0.5 text-[11px] font-medium rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                            {template.style === 'ats-friendly' ? 'ATS' : template.style}
                        </span>
                        {template.features.slice(0, 2).map((f) => (
                            <span key={f} className="px-2 py-0.5 text-[11px] font-medium rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                                {f}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

/* ─── Main Gallery View ─── */
export function CVGalleryView() {
    const selectTemplate = useCVBuilderStore((s) => s.selectTemplate);
    const [selectedStyle, setSelectedStyle] = React.useState<TemplateStyle | "all">("all");
    const [searchQuery, setSearchQuery] = React.useState("");

    // Build full template list from TEMPLATES + TEMPLATE_REGISTRY
    const allTemplates = React.useMemo(() => {
        const registryIds = Object.keys(TEMPLATE_REGISTRY);
        const templateIds = TEMPLATES.map((t) => t.id);

        const extraTemplates: CVTemplate[] = registryIds
            .filter((id) => !templateIds.includes(id))
            .map((id) => {
                const entry = TEMPLATE_REGISTRY[id];
                return {
                    id,
                    name: entry.manifest.name,
                    description: `Template ${entry.manifest.name}`,
                    thumbnail: `/templates/${id}.png`,
                    style: "professional" as TemplateStyle,
                    positions: ["other" as const],
                    features: ["Chuyên nghiệp"],
                    popularity: 70,
                    colors: { primary: "#22C55E", secondary: "#f0fdf4", accent: "#059669" },
                };
            });

        return [...TEMPLATES, ...extraTemplates];
    }, []);

    const filteredTemplates = React.useMemo(() => {
        let list = filterTemplates(allTemplates, null, selectedStyle);
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            list = list.filter(
                (t) =>
                    t.name.toLowerCase().includes(q) ||
                    t.description.toLowerCase().includes(q),
            );
        }
        return list;
    }, [allTemplates, selectedStyle, searchQuery]);

    const handleSelect = (template: CVTemplate) => {
        selectTemplate(template.id);
    };

    return (
        <div className="w-full relative overflow-hidden min-h-[80vh]">
            <ParticleBackground />

            <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 md:py-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 dark:bg-green-900/30 border border-green-100 dark:border-green-800/50 mb-4"
                    >
                        <Sparkles className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-medium text-green-600 dark:text-green-300">
                            Bước 1: Chọn mẫu
                        </span>
                    </motion.div>
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-[#1C252E] dark:text-white mb-3">
                        Mẫu CV xin việc
                        <span className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                            {" "}chuyên nghiệp
                        </span>
                    </h1>
                    <p className="text-[#637381] dark:text-[#919EAB] text-base md:text-lg max-w-2xl mx-auto">
                        Tuyển chọn {allTemplates.length} mẫu CV đa dạng phong cách, giúp bạn tạo dấu ấn cá nhân
                    </p>
                </motion.div>

                {/* Filter tags */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="flex items-center justify-center gap-2 flex-wrap mb-8"
                >
                    {STYLE_TAGS.map((tag) => (
                        <button
                            key={tag.id}
                            onClick={() => setSelectedStyle(tag.id)}
                            className={`
                                px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200
                                ${selectedStyle === tag.id
                                    ? "bg-green-500 text-white shadow-lg shadow-green-500/30"
                                    : "bg-white dark:bg-[#1C252E] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/10 hover:border-green-300 dark:hover:border-green-700 hover:text-green-600"
                                }
                            `}
                        >
                            {tag.label}
                        </button>
                    ))}
                </motion.div>

                {/* Search */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-md mx-auto mb-10"
                >
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm mẫu CV..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white dark:bg-[#1C252E] border border-gray-200 dark:border-white/10 text-sm text-gray-800 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-400 transition-all"
                        />
                    </div>
                </motion.div>

                {/* Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {filteredTemplates.map((template, i) => (
                        <motion.div
                            key={template.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05 * i }}
                        >
                            <TemplateCard template={template} onSelect={handleSelect} />
                        </motion.div>
                    ))}
                </motion.div>

                {filteredTemplates.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-400 text-lg">Không tìm thấy mẫu CV phù hợp</p>
                    </div>
                )}
            </div>
        </div>
    );
}
