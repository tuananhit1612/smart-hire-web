"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Eye, Check, Star, Zap } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { CVTemplate } from "@/features/cv/types/template-types";

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
            {/* Holographic border on hover */}
            <div className={cn(
                "absolute -inset-[2px] rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 transition-opacity duration-500",
                isHovered && "opacity-100"
            )} />

            {/* Recommended badge */}
            {isRecommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                    <motion.div
                        initial={{ scale: 0, y: 10 }}
                        animate={{ scale: 1, y: 0 }}
                        className="px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-xs font-bold shadow-lg flex items-center gap-1"
                    >
                        <Star className="w-3 h-3 fill-current" />
                        Phù hợp nhất
                    </motion.div>
                </div>
            )}

            {/* Card */}
            <div className={cn(
                "relative bg-white dark:bg-zinc-900 backdrop-blur-xl rounded-3xl overflow-hidden",
                "border border-gray-200/50 dark:border-zinc-800/50",
                "shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)]",
                "transition-shadow duration-500",
                isHovered && "shadow-2xl"
            )}>
                {/* Thumbnail */}
                <div className="relative aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-zinc-800 dark:to-zinc-900 overflow-hidden">
                    {/* Placeholder CV preview */}
                    <div
                        className="absolute inset-4 bg-white dark:bg-zinc-950 rounded-lg shadow-lg p-4 space-y-3 transition-transform duration-300"
                        style={{ transform: `translateZ(${isHovered ? 20 : 0}px)` }}
                    >
                        {/* Header */}
                        <div className="flex items-center gap-3">
                            <div
                                className="w-10 h-10 rounded-full"
                                style={{ backgroundColor: template.colors.primary + '30' }}
                            />
                            <div className="flex-1 space-y-1.5">
                                <div
                                    className="h-2.5 rounded-full w-3/4"
                                    style={{ backgroundColor: template.colors.primary }}
                                />
                                <div className="h-2 bg-gray-200 dark:bg-zinc-700 rounded-full w-1/2" />
                            </div>
                        </div>

                        {/* Sections */}
                        <div className="space-y-2">
                            <div
                                className="h-1.5 rounded-full w-1/4"
                                style={{ backgroundColor: template.colors.secondary }}
                            />
                            <div className="space-y-1">
                                <div className="h-1.5 bg-gray-200 dark:bg-zinc-700 rounded-full w-full" />
                                <div className="h-1.5 bg-gray-200 dark:bg-zinc-700 rounded-full w-5/6" />
                                <div className="h-1.5 bg-gray-200 dark:bg-zinc-700 rounded-full w-4/6" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div
                                className="h-1.5 rounded-full w-1/3"
                                style={{ backgroundColor: template.colors.secondary }}
                            />
                            <div className="space-y-1">
                                <div className="h-1.5 bg-gray-200 dark:bg-zinc-700 rounded-full w-full" />
                                <div className="h-1.5 bg-gray-200 dark:bg-zinc-700 rounded-full w-3/4" />
                            </div>
                        </div>

                        {/* Skills */}
                        <div className="flex gap-1 flex-wrap">
                            {[1, 2, 3].map((i) => (
                                <div
                                    key={i}
                                    className="h-4 px-2 rounded-full"
                                    style={{ backgroundColor: template.colors.accent + '40' }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Hover overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-center pb-6"
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
                                className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium flex items-center gap-2 shadow-lg shadow-indigo-500/25"
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
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                        {template.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                        {template.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                        {template.features.slice(0, 3).map((feature) => (
                            <span
                                key={feature}
                                className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-zinc-800 text-xs text-gray-600 dark:text-gray-400"
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
