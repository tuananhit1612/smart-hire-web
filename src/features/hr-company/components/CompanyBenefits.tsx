"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Plus, X, Sparkles, Check } from "lucide-react";
import { Benefit } from "../types/company";

interface CompanyBenefitsProps {
    benefits: Benefit[];
    onUpdate?: (benefits: Benefit[]) => void;
    editable?: boolean;
}

const EMOJI_OPTIONS = ["💰", "🏥", "📚", "🏠", "🎮", "✈️", "🍔", "🚗", "💻", "🎯", "🌴", "🏋️", "☕", "🎁", "💎", "🚀"];

// Gradient colors for benefit cards
const CARD_GRADIENTS = [
    { bg: "from-sky-50 via-white to-blue-50", border: "border-sky-200", hover: "hover:border-sky-300" },
    { bg: "from-green-50 via-white to-emerald-50", border: "border-green-200", hover: "hover:border-green-300" },
    { bg: "from-purple-50 via-white to-indigo-50", border: "border-purple-200", hover: "hover:border-purple-300" },
    { bg: "from-orange-50 via-white to-amber-50", border: "border-orange-200", hover: "hover:border-orange-300" },
    { bg: "from-pink-50 via-white to-rose-50", border: "border-pink-200", hover: "hover:border-pink-300" },
    { bg: "from-teal-50 via-white to-cyan-50", border: "border-teal-200", hover: "hover:border-teal-300" },
];

export function CompanyBenefits({ benefits, onUpdate, editable = true }: CompanyBenefitsProps) {
    const [isAdding, setIsAdding] = React.useState(false);
    const [newBenefit, setNewBenefit] = React.useState<Partial<Benefit>>({
        icon: "🎁",
        title: "",
        description: "",
    });

    const handleAdd = () => {
        if (newBenefit.title && newBenefit.description) {
            const benefit: Benefit = {
                id: `b-${Date.now()}`,
                icon: newBenefit.icon || "🎁",
                title: newBenefit.title,
                description: newBenefit.description,
            };
            onUpdate?.([...benefits, benefit]);
            setNewBenefit({ icon: "🎁", title: "", description: "" });
            setIsAdding(false);
        }
    };

    const handleRemove = (id: string) => {
        onUpdate?.(benefits.filter((b) => b.id !== id));
    };

    return (
        <div className="space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <motion.div
                        animate={{
                            rotate: [0, -10, 10, 0],
                            scale: [1, 1.1, 1]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30"
                    >
                        <Gift className="w-6 h-6 text-white" />
                    </motion.div>
                    <div>
                        <h2 className="text-xl font-bold text-sky-900">Phúc lợi & Đãi ngộ</h2>
                        <p className="text-sm text-sky-600">Những gì bạn nhận được khi làm việc cùng chúng tôi</p>
                    </div>
                </div>
                {editable && !isAdding && (
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsAdding(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-medium shadow-lg shadow-green-500/30 hover:shadow-xl transition-all"
                    >
                        <Plus className="w-4 h-4" />
                        Thêm mới
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
                        <div className="p-6 bg-gradient-to-br from-green-50 via-white to-emerald-50 rounded-2xl border-2 border-dashed border-green-300">
                            <div className="space-y-4">
                                {/* Emoji Picker */}
                                <div>
                                    <label className="block text-sm font-semibold text-green-700 mb-3">
                                        <Sparkles className="w-4 h-4 inline mr-1" />
                                        Chọn biểu tượng
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {EMOJI_OPTIONS.map((emoji) => (
                                            <motion.button
                                                key={emoji}
                                                type="button"
                                                whileHover={{ scale: 1.2 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => setNewBenefit({ ...newBenefit, icon: emoji })}
                                                className={`w-12 h-12 rounded-xl text-2xl flex items-center justify-center transition-all ${newBenefit.icon === emoji
                                                    ? "bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-500/30 ring-4 ring-green-200"
                                                    : "bg-white hover:bg-green-50 border-2 border-green-100"
                                                    }`}
                                            >
                                                {emoji}
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>

                                {/* Input fields with gradient focus */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-sm font-semibold text-slate-600">Tiêu đề</label>
                                        <input
                                            type="text"
                                            value={newBenefit.title}
                                            onChange={(e) => setNewBenefit({ ...newBenefit, title: e.target.value })}
                                            placeholder="Ví dụ: Bảo hiểm sức khỏe"
                                            className="w-full bg-white rounded-xl px-4 py-3 border-2 border-slate-200 focus:border-green-500 focus:outline-none transition-colors"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-semibold text-slate-600">Mô tả chi tiết</label>
                                        <input
                                            type="text"
                                            value={newBenefit.description}
                                            onChange={(e) => setNewBenefit({ ...newBenefit, description: e.target.value })}
                                            placeholder="Bảo hiểm cao cấp cho bạn và gia đình"
                                            className="w-full bg-white rounded-xl px-4 py-3 border-2 border-slate-200 focus:border-green-500 focus:outline-none transition-colors"
                                        />
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="flex gap-3 pt-2">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleAdd}
                                        disabled={!newBenefit.title || !newBenefit.description}
                                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Check className="w-4 h-4" />
                                        Thêm phúc lợi
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setIsAdding(false)}
                                        className="px-6 py-3 bg-white text-slate-600 rounded-full font-semibold border-2 border-slate-200"
                                    >
                                        Hủy
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Benefits Grid */}
            {benefits.length > 0 ? (
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.08 },
                        },
                    }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                    {benefits.map((benefit, index) => {
                        const gradient = CARD_GRADIENTS[index % CARD_GRADIENTS.length];
                        return (
                            <motion.div
                                key={benefit.id}
                                variants={{
                                    hidden: { opacity: 0, y: 20, scale: 0.9 },
                                    visible: { opacity: 1, y: 0, scale: 1 },
                                }}
                                whileHover={{ y: -8, scale: 1.02 }}
                                className={`group relative overflow-hidden p-5 bg-gradient-to-br ${gradient.bg} rounded-2xl border ${gradient.border} ${gradient.hover} shadow-lg hover:shadow-xl transition-all duration-300`}
                            >
                                {/* Decorative gradient blob */}
                                <div className="absolute -top-10 -right-10 w-24 h-24 bg-gradient-to-br from-white/50 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                                {/* Remove button */}
                                {editable && (
                                    <motion.button
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        whileHover={{ scale: 1.1 }}
                                        onClick={() => handleRemove(benefit.id)}
                                        className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all shadow-lg hover:bg-red-600 z-10"
                                    >
                                        <X className="w-4 h-4" />
                                    </motion.button>
                                )}

                                {/* Icon */}
                                <div className="text-4xl mb-3 transition-transform duration-200 group-hover:scale-110">
                                    {benefit.icon}
                                </div>

                                {/* Content */}
                                <h3 className="font-bold text-slate-800 mb-1">{benefit.title}</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">{benefit.description}</p>
                            </motion.div>
                        );
                    })}
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12 rounded-2xl bg-gradient-to-br from-slate-50 to-white border-2 border-dashed border-slate-200"
                >
                    <Gift className="w-16 h-16 mx-auto mb-3 text-slate-300" />
                    <p className="text-slate-500 font-medium">Chưa có phúc lợi nào được thêm</p>
                    {editable && (
                        <p className="text-sm text-slate-400 mt-1">Nhấn "Thêm mới" để bắt đầu</p>
                    )}
                </motion.div>
            )}
        </div>
    );
}
