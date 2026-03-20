"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Plus, X } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { useConfirmDialog } from "@/shared/components/ui/confirm-dialog";
import { Award } from "../../types/types";

const generateId = () => Math.random().toString(36).substr(2, 9);

interface AwardsSectionProps {
    data: Award[];
    onChange: (data: Award[]) => void;
}

export function AwardsSection({ data, onChange }: AwardsSectionProps) {
    const { DialogComponent, confirm } = useConfirmDialog();

    const addAward = () => {
        onChange([...data, { id: generateId(), title: "", issuer: "", date: "" }]);
    };

    const updateAward = (id: string, field: keyof Award, value: string) => {
        onChange(data.map(award => award.id === id ? { ...award, [field]: value } : award));
    };

    const removeAward = async (id: string) => {
        const award = data.find(a => a.id === id);
        const confirmed = await confirm({
            title: "Xóa giải thưởng",
            message: `Bạn có chắc muốn xóa "${award?.title || "giải thưởng này"}"?`,
            confirmText: "Xóa",
            cancelText: "Hủy",
            variant: "danger",
        });
        if (confirmed) {
            onChange(data.filter(a => a.id !== id));
        }
    };

    return (
        <div className="space-y-6">
            {DialogComponent}

            {/* Header */}
            <div className="flex items-center gap-3 pb-2 border-b border-gray-100 dark:border-zinc-700">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 shadow-lg">
                    <Trophy className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Giải thưởng</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Giải thưởng và thành tích nổi bật</p>
                </div>
            </div>

            {/* Award Items */}
            <AnimatePresence mode="popLayout">
                {data.map((award) => (
                    <motion.div
                        key={award.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20, scale: 0.95 }}
                        layout
                        className="group relative bg-white dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700 rounded-2xl p-4 hover:border-rose-200 dark:hover:border-rose-700 hover:shadow-md transition-all duration-200"
                    >
                        {/* Remove button */}
                        <button
                            type="button"
                            onClick={() => removeAward(award.id)}
                            className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all"
                        >
                            <X className="w-4 h-4 text-red-400" />
                        </button>

                        <div className="space-y-3">
                            {/* Row 1: Title + Issuer */}
                            <div className="grid grid-cols-2 gap-3">
                                <Input
                                    value={award.title}
                                    onChange={(e) => updateAward(award.id, "title", e.target.value)}
                                    placeholder="Tên giải thưởng"
                                    className="h-9 rounded-xl"
                                />
                                <Input
                                    value={award.issuer}
                                    onChange={(e) => updateAward(award.id, "issuer", e.target.value)}
                                    placeholder="Tổ chức trao giải"
                                    className="h-9 rounded-xl"
                                />
                            </div>

                            {/* Row 2: Date + Description */}
                            <div className="grid grid-cols-3 gap-3">
                                <Input
                                    type="month"
                                    value={award.date}
                                    onChange={(e) => updateAward(award.id, "date", e.target.value)}
                                    placeholder="Thời gian"
                                    className="h-9 rounded-xl text-sm"
                                />
                                <div className="col-span-2">
                                    <Input
                                        value={award.description || ""}
                                        onChange={(e) => updateAward(award.id, "description", e.target.value)}
                                        placeholder="Mô tả (tùy chọn)"
                                        className="h-9 rounded-xl text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>

            {/* Add Button */}
            <Button
                variant="outline"
                size="md"
                leftIcon={<Plus className="w-4 h-4" />}
                onClick={addAward}
                className="w-full border-dashed border-gray-300 dark:border-zinc-600 hover:border-rose-400 hover:text-rose-600"
            >
                Thêm giải thưởng
            </Button>
        </div>
    );
}
