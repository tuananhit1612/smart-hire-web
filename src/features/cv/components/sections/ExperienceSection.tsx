"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Briefcase, Plus, Trash2, Building, MapPin } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { DatePicker } from "@/shared/components/ui/date-picker";
import { useConfirmDialog } from "@/shared/components/ui/confirm-dialog";
import { SortableList } from "@/shared/components/ui/sortable-list";
import { Experience } from "../../types/types";

interface ExperienceSectionProps {
    data: Experience[];
    onChange: (data: Experience[]) => void;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

export function ExperienceSection({ data, onChange }: ExperienceSectionProps) {
    const { confirm, DialogComponent } = useConfirmDialog();

    const handleAdd = () => {
        const newItem: Experience = {
            id: generateId(),
            company: "",
            position: "",
            location: "",
            startDate: "",
            endDate: "",
            isCurrent: false,
            description: "",
        };
        onChange([...data, newItem]);
    };

    const handleRemove = async (id: string) => {
        const confirmed = await confirm({
            title: "Xóa kinh nghiệm",
            message: "Bạn có chắc muốn xóa mục kinh nghiệm này? Hành động này không thể hoàn tác.",
            variant: "danger",
        });

        if (confirmed) {
            onChange(data.filter((item) => item.id !== id));
        }
    };

    const handleUpdate = (id: string, field: keyof Experience, value: string | boolean) => {
        onChange(
            data.map((item) =>
                item.id === id ? { ...item, [field]: value } : item
            )
        );
    };

    const handleReorder = (newItems: Experience[]) => {
        onChange(newItems);
    };

    return (
        <>
            {DialogComponent}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
            >
                {/* Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2 md:gap-3">
                            <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white flex-shrink-0">
                                <Briefcase className="w-4 h-4 md:w-5 md:h-5" />
                            </div>
                            <span>Kinh nghiệm làm việc</span>
                        </h2>
                        <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mt-2">
                            Liệt kê các công việc và kinh nghiệm chuyên môn của bạn
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        leftIcon={<Plus className="w-4 h-4" />}
                        onClick={handleAdd}
                        className="w-fit flex-shrink-0"
                    >
                        Thêm
                    </Button>
                </div>

                {/* Experience Items with Drag & Drop */}
                <div className="space-y-4">
                    {data.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="border-2 border-dashed border-gray-200 dark:border-zinc-800 rounded-2xl p-8 text-center"
                        >
                            <Briefcase className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
                            <p className="text-gray-500 dark:text-gray-400 text-sm">
                                Chưa có kinh nghiệm làm việc
                            </p>
                            <Button
                                variant="ghost"
                                size="sm"
                                leftIcon={<Plus className="w-4 h-4" />}
                                onClick={handleAdd}
                                className="mt-3"
                            >
                                Thêm kinh nghiệm
                            </Button>
                        </motion.div>
                    ) : (
                        <SortableList
                            items={data}
                            onReorder={handleReorder}
                            renderItem={(item, index, dragHandle) => (
                                <div className="relative bg-white dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800 rounded-2xl p-4 md:p-6 hover:shadow-lg transition-shadow group">
                                    {/* Drag Handle */}
                                    <div className="absolute left-2 top-1/2 -translate-y-1/2 hidden md:block">
                                        {dragHandle}
                                    </div>

                                    {/* Delete Button */}
                                    <button
                                        onClick={() => handleRemove(item.id)}
                                        className="absolute top-4 right-4 p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors opacity-100 md:opacity-0 md:group-hover:opacity-100"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>

                                    {/* Item Number Badge */}
                                    <div className="absolute -left-3 top-6 flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold shadow-lg hidden md:flex">
                                        {index + 1}
                                    </div>

                                    <div className="space-y-4 md:pl-8">
                                        {/* Mobile Drag Handle & Number */}
                                        <div className="flex items-center gap-2 md:hidden">
                                            {dragHandle}
                                            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                                                #{index + 1}
                                            </span>
                                        </div>

                                        {/* Company & Position Row */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="relative">
                                                <div className="absolute left-3 top-[42px] text-gray-400 pointer-events-none z-10">
                                                    <Building className="w-4 h-4" />
                                                </div>
                                                <Input
                                                    label="Công ty *"
                                                    placeholder="Tên công ty"
                                                    value={item.company}
                                                    onChange={(e) =>
                                                        handleUpdate(item.id, "company", e.target.value)
                                                    }
                                                    className="pl-10"
                                                />
                                            </div>
                                            <Input
                                                label="Vị trí *"
                                                placeholder="Frontend Developer"
                                                value={item.position}
                                                onChange={(e) =>
                                                    handleUpdate(item.id, "position", e.target.value)
                                                }
                                            />
                                        </div>

                                        {/* Location */}
                                        <div className="relative">
                                            <div className="absolute left-3 top-[42px] text-gray-400 pointer-events-none z-10">
                                                <MapPin className="w-4 h-4" />
                                            </div>
                                            <Input
                                                label="Địa điểm"
                                                placeholder="TP. Hồ Chí Minh"
                                                value={item.location || ""}
                                                onChange={(e) =>
                                                    handleUpdate(item.id, "location", e.target.value)
                                                }
                                                className="pl-10"
                                            />
                                        </div>

                                        {/* Date Range with DatePicker */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <DatePicker
                                                label="Bắt đầu"
                                                value={item.startDate}
                                                onChange={(value) =>
                                                    handleUpdate(item.id, "startDate", value)
                                                }
                                                placeholder="Chọn tháng bắt đầu"
                                            />
                                            <DatePicker
                                                label="Kết thúc"
                                                value={item.endDate}
                                                onChange={(value) =>
                                                    handleUpdate(item.id, "endDate", value)
                                                }
                                                placeholder="Chọn tháng kết thúc"
                                                minDate={item.startDate}
                                                disabled={item.isCurrent}
                                            />
                                        </div>

                                        {/* Is Current Checkbox */}
                                        <label className="flex items-center gap-3 cursor-pointer group/checkbox">
                                            <div className="relative">
                                                <input
                                                    type="checkbox"
                                                    checked={item.isCurrent}
                                                    onChange={(e) =>
                                                        handleUpdate(item.id, "isCurrent", e.target.checked)
                                                    }
                                                    className="sr-only"
                                                />
                                                <div className={`w-5 h-5 rounded-md border-2 transition-all duration-200 flex items-center justify-center ${item.isCurrent
                                                        ? "bg-gradient-to-r from-indigo-500 to-purple-500 border-transparent"
                                                        : "border-gray-300 dark:border-gray-600 group-hover/checkbox:border-indigo-400"
                                                    }`}>
                                                    {item.isCurrent && (
                                                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    )}
                                                </div>
                                            </div>
                                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                                Tôi đang làm việc tại đây
                                            </span>
                                        </label>

                                        {/* Description */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Mô tả công việc
                                            </label>
                                            <textarea
                                                value={item.description}
                                                onChange={(e) =>
                                                    handleUpdate(item.id, "description", e.target.value)
                                                }
                                                placeholder="Mô tả các trách nhiệm và thành tựu chính của bạn..."
                                                rows={3}
                                                className="w-full rounded-xl border border-gray-200 dark:border-zinc-800 bg-transparent px-4 py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-zinc-900/50 dark:text-white transition-all duration-200 resize-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        />
                    )}
                </div>
            </motion.div>
        </>
    );
}
