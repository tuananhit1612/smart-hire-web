"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Plus, X, Sparkles, Zap, Check } from "lucide-react";

interface CompanyTechStackProps {
    techStack: string[];
    onUpdate?: (techStack: string[]) => void;
    editable?: boolean;
}

const TECH_SUGGESTIONS = [
    "React", "Vue", "Angular", "Next.js", "Node.js", "Python", "Java", "Go",
    "TypeScript", "JavaScript", "PostgreSQL", "MongoDB", "Redis", "AWS",
    "GCP", "Azure", "Docker", "Kubernetes", "GraphQL", "REST API",
    ".NET", "Spring Boot", "FastAPI", "Django", "Laravel", "Ruby on Rails",
];

// Tech color mapping for visual variety
const TECH_COLORS: Record<string, { bg: string; text: string; glow: string }> = {
    "React": { bg: "from-[#22c55e] to-[#10b981]", text: "text-white", glow: "shadow-green-500/20" },
    "Vue": { bg: "from-emerald-400 to-green-600", text: "text-white", glow: "shadow-emerald-500/40" },
    "Angular": { bg: "from-red-400 to-red-600", text: "text-white", glow: "shadow-red-500/40" },
    "Next.js": { bg: "from-slate-700 to-slate-900", text: "text-white", glow: "shadow-slate-500/40" },
    "Node.js": { bg: "from-green-500 to-emerald-700", text: "text-white", glow: "shadow-green-500/40" },
    "Python": { bg: "from-yellow-400 to-[#10b981]", text: "text-white", glow: "shadow-yellow-500/40" },
    "Java": { bg: "from-orange-500 to-red-600", text: "text-white", glow: "shadow-orange-500/40" },
    "Go": { bg: "from-[#22c55e] to-[#10b981]", text: "text-white", glow: "shadow-green-500/20" },
    "TypeScript": { bg: "from-[#22c55e] to-[#10b981]", text: "text-white", glow: "shadow-green-500/20" },
    "PostgreSQL": { bg: "from-[#22c55e] to-[#10b981]", text: "text-white", glow: "shadow-green-500/20" },
    "MongoDB": { bg: "from-green-500 to-green-700", text: "text-white", glow: "shadow-green-500/40" },
    "AWS": { bg: "from-orange-400 to-yellow-500", text: "text-slate-900", glow: "shadow-orange-500/40" },
    "Docker": { bg: "from-[#22c55e] to-[#10b981]", text: "text-white", glow: "shadow-green-500/20" },
    "Kubernetes": { bg: "from-[#22c55e] to-[#10b981]", text: "text-white", glow: "shadow-green-500/20" },
    "GraphQL": { bg: "from-pink-500 to-purple-600", text: "text-white", glow: "shadow-pink-500/40" },
};

const DEFAULT_COLOR = { bg: "from-purple-400 to-[#10b981]", text: "text-white", glow: "shadow-purple-500/40" };

export function CompanyTechStack({ techStack, onUpdate, editable = true }: CompanyTechStackProps) {
    const [isAdding, setIsAdding] = React.useState(false);
    const [newTech, setNewTech] = React.useState("");

    const handleAdd = (tech: string) => {
        if (tech && !techStack.includes(tech)) {
            onUpdate?.([...techStack, tech]);
            setNewTech("");
            setIsAdding(false);
        }
    };

    const handleRemove = (tech: string) => {
        onUpdate?.(techStack.filter((t) => t !== tech));
    };

    const availableSuggestions = TECH_SUGGESTIONS.filter((t) => !techStack.includes(t));

    const getTechColor = (tech: string) => TECH_COLORS[tech] || DEFAULT_COLOR;

    return (
        <div className="space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <motion.div
                        animate={{
                            rotate: [0, 360],
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-[#10b981] flex items-center justify-center shadow-lg shadow-purple-500/30"
                    >
                        <Code2 className="w-6 h-6 text-white" />
                    </motion.div>
                    <div>
                        <h2 className="text-xl font-bold text-[#1C252E] dark:text-white flex items-center gap-2">
                            Tech Stack
                            <Zap className="w-5 h-5 text-yellow-500" />
                        </h2>
                        <p className="text-sm text-[#22c55e] dark:text-[#919EAB]">Công nghệ chúng tôi sử dụng</p>
                    </div>
                </div>
                {editable && !isAdding && (
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsAdding(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-[#10b981] text-white rounded-full font-medium shadow-lg shadow-purple-500/30 hover:shadow-xl transition-all"
                    >
                        <Plus className="w-4 h-4" />
                        Thêm
                    </motion.button>
                )}
            </div>

            {/* Add Form */}
            <AnimatePresence>
                {isAdding && (
                    <motion.div
                        initial={{ opacity: 0, height: 0, y: -20 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -20 }}
                        className="overflow-hidden"
                    >
                        <div className="p-6 bg-gradient-to-br from-purple-50 via-white to-[#22c55e]/5 dark:from-purple-900/10 dark:via-[#1C252E] dark:to-[#22c55e]/5 rounded-2xl border-2 border-dashed border-purple-300 dark:border-purple-700">
                            <div className="space-y-4">
                                {/* Input row */}
                                <div className="flex gap-3">
                                    <div className="flex-1 relative group">
                                        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-[#10b981] rounded-xl opacity-20 group-focus-within:opacity-100 blur-sm transition-opacity" />
                                        <input
                                            type="text"
                                            value={newTech}
                                            onChange={(e) => setNewTech(e.target.value)}
                                            placeholder="Nhập tên công nghệ..."
                                            className="relative w-full bg-white dark:bg-[#1C252E] rounded-xl px-4 py-3 border-2 border-slate-200 dark:border-white/[0.08] focus:border-purple-500 focus:outline-none text-slate-800 dark:text-white transition-colors"
                                            onKeyDown={(e) => e.key === "Enter" && handleAdd(newTech)}
                                        />
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => handleAdd(newTech)}
                                        disabled={!newTech}
                                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-[#10b981] text-white rounded-xl font-semibold shadow-lg disabled:opacity-50"
                                    >
                                        <Check className="w-4 h-4" />
                                        Thêm
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setIsAdding(false)}
                                        className="px-6 py-3 bg-white dark:bg-white/[0.04] text-slate-600 dark:text-[#C4CDD5] rounded-xl font-semibold border-2 border-slate-200 dark:border-white/[0.08]"
                                    >
                                        Hủy
                                    </motion.button>
                                </div>

                                {/* Suggestions */}
                                {availableSuggestions.length > 0 && (
                                    <div>
                                        <p className="text-sm font-medium text-purple-700 dark:text-purple-400 mb-3 flex items-center gap-1">
                                            <Sparkles className="w-4 h-4" />
                                            Gợi ý phổ biến:
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {availableSuggestions.slice(0, 12).map((tech) => {
                                                const colors = getTechColor(tech);
                                                return (
                                                    <motion.button
                                                        key={tech}
                                                        type="button"
                                                        whileHover={{ scale: 1.05, y: -2 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        onClick={() => handleAdd(tech)}
                                                        className={`px-4 py-2 bg-gradient-to-r ${colors.bg} ${colors.text} rounded-full text-sm font-medium shadow-lg ${colors.glow} hover:shadow-xl transition-all`}
                                                    >
                                                        + {tech}
                                                    </motion.button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Tech Stack Tags */}
            {techStack.length > 0 ? (
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.05 },
                        },
                    }}
                    className="flex flex-wrap gap-3"
                >
                    {techStack.map((tech, index) => {
                        const colors = getTechColor(tech);
                        return (
                            <motion.div
                                key={tech}
                                variants={{
                                    hidden: { opacity: 0, scale: 0.5, rotate: -10 },
                                    visible: { opacity: 1, scale: 1, rotate: 0 },
                                }}
                                whileHover={{ scale: 1.1, y: -4 }}
                                className={`group relative px-5 py-2.5 bg-gradient-to-r ${colors.bg} ${colors.text} rounded-full font-semibold shadow-lg ${colors.glow} hover:shadow-xl transition-all`}
                            >
                                {/* Shine effect */}
                                <div className="absolute inset-0 rounded-full overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                </div>

                                <span className="relative">{tech}</span>

                                {/* Remove button */}
                                {editable && (
                                    <motion.button
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        whileHover={{ scale: 1.2 }}
                                        onClick={() => handleRemove(tech)}
                                        className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all shadow-lg hover:bg-red-600"
                                    >
                                        <X className="w-3 h-3" />
                                    </motion.button>
                                )}
                            </motion.div>
                        );
                    })}
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12 rounded-2xl bg-gradient-to-br from-slate-50 to-white dark:from-white/[0.02] dark:to-[#1C252E] border-2 border-dashed border-slate-200 dark:border-white/[0.08]"
                >
                    <Code2 className="w-16 h-16 mx-auto mb-3 text-slate-300 dark:text-[#637381]" />
                    <p className="text-slate-500 dark:text-[#919EAB] font-medium">Chưa có công nghệ nào được thêm</p>
                    {editable && (
                        <p className="text-sm text-slate-400 dark:text-[#637381] mt-1">Nhấn "Thêm" để bắt đầu</p>
                    )}
                </motion.div>
            )}
        </div>
    );
}

