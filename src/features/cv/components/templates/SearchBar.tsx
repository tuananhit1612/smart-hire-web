"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Minimize2, Palette, Code, Briefcase, TrendingUp, LayoutGrid, Zap } from "lucide-react";
import { cn } from "@/shared/utils/cn";

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

// Quick search tags like Canva
const quickTags = [
    { label: "ATS-friendly", icon: Zap, color: "from-emerald-500 to-teal-500", shadow: "shadow-emerald-500/30" },
    { label: "Minimal", icon: Minimize2, color: "from-slate-500 to-zinc-600", shadow: "shadow-slate-500/30" },
    { label: "Creative", icon: Palette, color: "from-pink-500 to-rose-500", shadow: "shadow-pink-500/30" },
    { label: "Tech", icon: Code, color: "from-sky-500 to-blue-500", shadow: "shadow-sky-500/30" },
    { label: "Business", icon: Briefcase, color: "from-amber-500 to-orange-500", shadow: "shadow-amber-500/30" },
    { label: "Marketing", icon: TrendingUp, color: "from-purple-500 to-violet-500", shadow: "shadow-purple-500/30" },
    { label: "Clean layout", icon: LayoutGrid, color: "from-indigo-500 to-blue-500", shadow: "shadow-indigo-500/30" }
];

export function SearchBar({ value, onChange, placeholder = "Tìm kiếm trong hàng triệu mẫu..." }: SearchBarProps) {
    const [isFocused, setIsFocused] = React.useState(false);

    const handleTagClick = (tag: string) => {
        if (value.toLowerCase().includes(tag.toLowerCase())) {
            onChange(value.replace(new RegExp(tag, 'gi'), '').trim());
        } else {
            onChange(value ? `${value} ${tag}` : tag);
        }
    };

    const isTagActive = (tag: string) => value.toLowerCase().includes(tag.toLowerCase());

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-5"
        >
            {/* Search input - Larger like Canva */}
            <div className="relative max-w-3xl mx-auto">
                {/* Animated glow effect - Sky/Green */}
                <motion.div
                    className={cn(
                        "absolute -inset-1 rounded-2xl bg-gradient-to-r from-sky-500 via-emerald-400 to-lime-500 blur-md transition-opacity duration-500",
                        isFocused ? "opacity-60" : "opacity-0"
                    )}
                    animate={isFocused ? {
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                    } : {}}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    style={{ backgroundSize: "200% 200%" }}
                />

                <div className="relative bg-white dark:bg-[#1C252E] rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-black/30">
                    <Search className={cn(
                        "absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 transition-all duration-300",
                        isFocused ? "text-sky-500 scale-110" : "text-[#919EAB]"
                    )} />

                    <input
                        type="text"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder={placeholder}
                        className={cn(
                            "w-full h-16 pl-14 pr-14 rounded-2xl text-base",
                            "bg-transparent",
                            "border-2 border-[rgba(145,158,171,0.15)] dark:border-white/[0.08]",
                            "text-[#1C252E] dark:text-white placeholder:text-[#919EAB]",
                            "focus:outline-none focus:border-transparent",
                            "transition-all duration-300"
                        )}
                    />

                    {/* Clear button with animation */}
                    <AnimatePresence>
                        {value && (
                            <motion.button
                                initial={{ scale: 0, rotate: -90 }}
                                animate={{ scale: 1, rotate: 0 }}
                                exit={{ scale: 0, rotate: 90 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                onClick={() => onChange("")}
                                className="absolute right-5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[rgba(145,158,171,0.12)] dark:bg-white/[0.08] hover:bg-[rgba(145,158,171,0.2)] dark:hover:bg-white/[0.12] transition-colors"
                            >
                                <X className="w-4 h-4 text-[#637381] dark:text-[#919EAB]" />
                            </motion.button>
                        )}
                    </AnimatePresence>

                    {/* Submit arrow */}
                    {!value && (
                        <motion.div
                            className="absolute right-5 top-1/2 -translate-y-1/2 p-3 rounded-xl bg-[rgba(145,158,171,0.1)] dark:bg-white/[0.06]"
                            whileHover={{ scale: 1.05, x: 3 }}
                        >
                            <svg className="w-4 h-4 text-[#919EAB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Quick tags with stagger animation */}
            <div className="flex flex-wrap items-center justify-center gap-2.5">
                {quickTags.map((tag, index) => {
                    const Icon = tag.icon;
                    const isActive = isTagActive(tag.label);

                    return (
                        <motion.button
                            key={tag.label}
                            initial={{ opacity: 0, y: 15, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{
                                delay: index * 0.06,
                                type: "spring",
                                stiffness: 200
                            }}
                            whileHover={{
                                scale: 1.08,
                                y: -2
                            }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleTagClick(tag.label)}
                            className={cn(
                                "relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                                isActive
                                    ? `bg-gradient-to-r ${tag.color} text-white shadow-lg ${tag.shadow}`
                                    : "bg-white dark:bg-[#1C252E] border border-[rgba(145,158,171,0.2)] dark:border-white/[0.08] text-[#637381] dark:text-[#919EAB] hover:border-[rgba(145,158,171,0.4)] dark:hover:border-white/[0.16] hover:shadow-md"
                            )}
                        >
                            {/* Ripple effect on active */}
                            {isActive && (
                                <motion.div
                                    className={cn("absolute inset-0 rounded-full bg-gradient-to-r", tag.color)}
                                    initial={{ scale: 0.8, opacity: 0.5 }}
                                    animate={{ scale: 1.2, opacity: 0 }}
                                    transition={{ duration: 0.6 }}
                                />
                            )}

                            <motion.div
                                animate={isActive ? { rotate: [0, -10, 10, 0] } : {}}
                                transition={{ duration: 0.4 }}
                            >
                                <Icon className="w-4 h-4" />
                            </motion.div>
                            <span className="relative z-10">{tag.label}</span>

                            {/* Checkmark for active */}
                            <AnimatePresence>
                                {isActive && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                        className="ml-0.5"
                                    >
                                        <X className="w-3 h-3" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    );
                })}
            </div>
        </motion.div>
    );
}
