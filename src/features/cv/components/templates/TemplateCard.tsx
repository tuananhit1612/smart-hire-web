"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Eye, Check, Star, Zap } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { CVTemplate } from "@/features/cv/types/template-types";
import { TEMPLATE_COMPONENTS } from "@/features/cv/components/cv-templates";
import {
    MOCK_DATA_INTERN,
    MOCK_DATA_LEADER,
    MOCK_DATA_SENIOR,
    MOCK_DATA_SALES_ADMIN,
    MOCK_DATA_CHRO,
    MOCK_DATA_SALES_EXEC,
    MOCK_DATA_BA,
    getMockDataForTemplate
} from "@/features/cv/data/mock-data";

interface TemplateCardProps {
    template: CVTemplate;
    onSelect: (template: CVTemplate) => void;
    onPreview: (template: CVTemplate) => void;
    isRecommended?: boolean;
}

export function TemplateCard({ template, onSelect, onPreview, isRecommended }: TemplateCardProps) {
    const [isHovered, setIsHovered] = React.useState(false);
    const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
    const cardRef = React.useRef<HTMLDivElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [scale, setScale] = React.useState(0.22);

    React.useEffect(() => {
        const updateScale = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.offsetWidth;
                // A4 width is 210mm approx 794px at 96dpi
                // We calculate scale to fit the width perfectly
                const newScale = containerWidth / 794;
                setScale(newScale);
            }
        };

        // Initial calculation
        updateScale();

        const observer = new ResizeObserver(updateScale);
        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // 3D Tilt effect
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x, y });
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setMousePosition({ x: 0.5, y: 0.5 });
    };

    const tiltX = isHovered ? (mousePosition.y - 0.5) * -10 : 0;
    const tiltY = isHovered ? (mousePosition.x - 0.5) * 10 : 0;

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            onMouseMove={handleMouseMove}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={handleMouseLeave}
            style={{
                transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
                transformStyle: "preserve-3d"
            }}
            className="group relative transition-transform duration-200 ease-out"
        >
            {/* Holographic border on hover - Sky/Green */}
            <div className={cn(
                "absolute -inset-[2px] rounded-3xl bg-gradient-to-r from-sky-500 via-emerald-400 to-lime-500 opacity-0 transition-opacity duration-500",
                isHovered && "opacity-100"
            )} />

            {/* Recommended badge */}
            {isRecommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                    <motion.div
                        initial={{ scale: 0, y: 10 }}
                        animate={{ scale: 1, y: 0 }}
                        className="px-3 py-1 rounded-full bg-gradient-to-r from-sky-500 via-emerald-500 to-lime-500 text-white text-xs font-bold shadow-lg flex items-center gap-1"
                    >
                        <Star className="w-3 h-3 fill-current" />
                        Phù hợp nhất
                    </motion.div>
                </div>
            )}

            {/* Card */}
            <div className={cn(
                "relative bg-white dark:bg-[#1C252E] backdrop-blur-xl rounded-3xl overflow-hidden",
                "border border-[rgba(145,158,171,0.15)] dark:border-white/[0.08]",
                "shadow-[0_8px_30px_rgb(0,0,0,0.06)]",
                "transition-shadow duration-500",
                isHovered && "shadow-2xl"
            )}>
                {/* Thumbnail */}
                <div className="relative aspect-[3/4] bg-[#F4F6F8] dark:bg-[#161C24] overflow-hidden" ref={containerRef}>
                    {/* Live CV Preview */}
                    <div className="absolute inset-0 w-full h-full overflow-hidden bg-[rgba(145,158,171,0.06)] dark:bg-black/20">
                        <div
                            className="w-[210mm] min-h-[297mm] bg-white text-[10px] transform origin-top-left shadow-sm transition-transform duration-75 ease-out"
                            style={{ transform: `scale(${scale})` }}
                        >
                            {(() => {
                                const TemplateComponent = TEMPLATE_COMPONENTS[template.id] || TEMPLATE_COMPONENTS['modern-tech'];
                                const mockData = getMockDataForTemplate(template.id);

                                return (
                                    <div className="pointer-events-none select-none">
                                        <TemplateComponent data={mockData} />
                                    </div>
                                );
                            })()}
                        </div>
                    </div>

                    {/* Hover overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        className="absolute inset-0 bg-gradient-to-t from-sky-900/60 via-sky-900/20 to-transparent flex items-end justify-center pb-6"
                    >
                        <div className="flex gap-3">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => onPreview(template)}
                                className="px-4 py-2 rounded-xl bg-white/20 backdrop-blur-md text-white text-sm font-medium flex items-center gap-2 hover:bg-white/30 transition-colors"
                            >
                                <Eye className="w-4 h-4" />
                                Xem trước
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => onSelect(template)}
                                className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-green-500 text-white text-sm font-medium flex items-center gap-2 shadow-lg shadow-sky-500/25"
                            >
                                <Check className="w-4 h-4" />
                                Chọn
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Popularity badge */}
                    {template.popularity >= 90 && !isRecommended && (
                        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-semibold flex items-center gap-1 shadow-lg">
                            <Star className="w-3 h-3 fill-current" />
                            Phổ biến
                        </div>
                    )}

                    {/* ATS badge */}
                    {template.style === 'ats-friendly' && (
                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-semibold flex items-center gap-1 shadow-lg">
                            <Zap className="w-3 h-3" />
                            ATS
                        </div>
                    )}
                </div>

                {/* Info */}
                <div className="p-4 space-y-2">
                    <h3 className="font-semibold text-[#1C252E] dark:text-white">
                        {template.name}
                    </h3>
                    <p className="text-sm text-[#637381] dark:text-[#919EAB] line-clamp-2">
                        {template.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                        {template.features.slice(0, 3).map((feature) => (
                            <span
                                key={feature}
                                className="px-2 py-0.5 rounded-md bg-[rgba(145,158,171,0.1)] dark:bg-white/[0.06] text-xs text-[#637381] dark:text-[#919EAB]"
                            >
                                {feature}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
