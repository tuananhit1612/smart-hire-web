"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Pencil, Check, X, Target, Eye, Sparkles, Quote } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

interface CompanyAboutProps {
    about: string;
    mission?: string;
    vision?: string;
    onUpdate?: (updates: { about?: string; mission?: string; vision?: string }) => void;
    editable?: boolean;
}

export function CompanyAbout({
    about,
    mission,
    vision,
    onUpdate,
    editable = true,
}: CompanyAboutProps) {
    const [isEditing, setIsEditing] = React.useState(false);
    const [editData, setEditData] = React.useState({ about, mission: mission || "", vision: vision || "" });

    const handleSave = () => {
        onUpdate?.(editData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditData({ about, mission: mission || "", vision: vision || "" });
        setIsEditing(false);
    };

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <motion.div
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-lg shadow-sky-500/30"
                    >
                        <FileText className="w-6 h-6 text-white" />
                    </motion.div>
                    <div>
                        <h2 className="text-xl font-bold text-sky-900">Giới thiệu công ty</h2>
                        <p className="text-sm text-sky-600">Câu chuyện và giá trị cốt lõi</p>
                    </div>
                </div>
                {editable && !isEditing && (
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 px-4 py-2 text-sky-600 hover:text-sky-700 hover:bg-sky-50 rounded-full font-medium transition-all"
                    >
                        <Pencil className="w-4 h-4" />
                        Chỉnh sửa
                    </motion.button>
                )}
            </div>

            <AnimatePresence mode="wait">
                {isEditing ? (
                    <motion.div
                        key="editing"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-5"
                    >
                        {/* About textarea with gradient border */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                <Quote className="w-4 h-4 text-sky-500" />
                                Giới thiệu
                            </label>
                            <div className="relative group">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-500 to-blue-600 rounded-2xl opacity-20 group-focus-within:opacity-100 blur-sm transition-opacity" />
                                <textarea
                                    value={editData.about}
                                    onChange={(e) => setEditData({ ...editData, about: e.target.value })}
                                    rows={5}
                                    className="relative w-full bg-white rounded-xl px-5 py-4 border-2 border-slate-200 focus:border-sky-500 focus:outline-none text-slate-800 resize-none"
                                    placeholder="Mô tả về công ty của bạn..."
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {/* Mission */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                    <Target className="w-4 h-4 text-purple-500" />
                                    Sứ mệnh
                                </label>
                                <div className="relative group">
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl opacity-20 group-focus-within:opacity-100 blur-sm transition-opacity" />
                                    <textarea
                                        value={editData.mission}
                                        onChange={(e) => setEditData({ ...editData, mission: e.target.value })}
                                        rows={3}
                                        className="relative w-full bg-white rounded-xl px-5 py-4 border-2 border-slate-200 focus:border-purple-500 focus:outline-none text-slate-800 resize-none"
                                        placeholder="Sứ mệnh của công ty..."
                                    />
                                </div>
                            </div>

                            {/* Vision */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                    <Eye className="w-4 h-4 text-green-500" />
                                    Tầm nhìn
                                </label>
                                <div className="relative group">
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl opacity-20 group-focus-within:opacity-100 blur-sm transition-opacity" />
                                    <textarea
                                        value={editData.vision}
                                        onChange={(e) => setEditData({ ...editData, vision: e.target.value })}
                                        rows={3}
                                        className="relative w-full bg-white rounded-xl px-5 py-4 border-2 border-slate-200 focus:border-green-500 focus:outline-none text-slate-800 resize-none"
                                        placeholder="Tầm nhìn của công ty..."
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 pt-2">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleSave}
                                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-semibold shadow-lg shadow-green-500/30 hover:shadow-xl transition-all"
                            >
                                <Check className="w-4 h-4" />
                                Lưu thay đổi
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleCancel}
                                className="flex items-center gap-2 px-6 py-3 bg-white text-slate-600 rounded-full font-semibold border-2 border-slate-200 hover:border-slate-300 transition-all"
                            >
                                <X className="w-4 h-4" />
                                Hủy
                            </motion.button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="viewing"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-5"
                    >
                        {/* About content with decorative quote */}
                        <div className="relative">
                            <Quote className="absolute -left-2 -top-2 w-8 h-8 text-sky-200" />
                            <p className="text-slate-700 leading-relaxed whitespace-pre-line pl-6 text-lg">
                                {about}
                            </p>
                        </div>

                        {/* Mission & Vision Cards */}
                        {(mission || vision) && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                                {mission && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 }}
                                        whileHover={{ y: -4, scale: 1.02 }}
                                        className="relative overflow-hidden p-5 rounded-2xl bg-gradient-to-br from-purple-50 via-white to-indigo-50 border border-purple-100 shadow-lg shadow-purple-500/5 group"
                                    >
                                        {/* Decorative gradient */}
                                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-400/20 to-indigo-400/10 rounded-full blur-xl" />

                                        <div className="relative">
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                                                    <Target className="w-4 h-4 text-white" />
                                                </div>
                                                <h3 className="font-bold text-purple-900">Sứ mệnh</h3>
                                            </div>
                                            <p className="text-purple-700 leading-relaxed">{mission}</p>
                                        </div>
                                    </motion.div>
                                )}
                                {vision && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 }}
                                        whileHover={{ y: -4, scale: 1.02 }}
                                        className="relative overflow-hidden p-5 rounded-2xl bg-gradient-to-br from-green-50 via-white to-emerald-50 border border-green-100 shadow-lg shadow-green-500/5 group"
                                    >
                                        {/* Decorative gradient */}
                                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-400/20 to-emerald-400/10 rounded-full blur-xl" />

                                        <div className="relative">
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                                                    <Eye className="w-4 h-4 text-white" />
                                                </div>
                                                <h3 className="font-bold text-green-900">Tầm nhìn</h3>
                                            </div>
                                            <p className="text-green-700 leading-relaxed">{vision}</p>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
