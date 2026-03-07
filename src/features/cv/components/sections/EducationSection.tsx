"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Plus, Trash2, Building } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { DatePicker } from "@/shared/components/ui/date-picker";
import { useConfirmDialog } from "@/shared/components/ui/confirm-dialog";
import { SortableList } from "@/shared/components/ui/sortable-list";
import { Education } from "../../types/types";

interface EducationSectionProps {
    data: Education[];
    onChange: (data: Education[]) => void;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

export function EducationSection({ data, onChange }: EducationSectionProps) {
    const { confirm, DialogComponent } = useConfirmDialog();

    const handleAdd = () => {
        const newItem: Education = {
            id: generateId(),
            school: "",
            degree: "",
            field: "",
            startDate: "",
            endDate: "",
            description: "",
        };
        onChange([...data, newItem]);
    };

    const handleRemove = async (id: string) => {
        const confirmed = await confirm({
            title: "Xóa học vấn",
            message: "Bạn có chắc muốn xóa mục học vấn này? Hành động này không thể hoàn tác.",
            variant: "danger",
        });

        if (confirmed) {
            onChange(data.filter((item) => item.id !== id));
        }
    };

    const handleUpdate = (id: string, field: keyof Education, value: string) => {
        onChange(
            data.map((item) =>
                item.id === id ? { ...item, [field]: value } : item
            )
        );
    };

    const handleReorder = (newItems: Education[]) => {
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
                        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-green-900 flex items-center gap-2 md:gap-3">
                            <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-gradient-to-r from-green-500 to-green-500 text-white flex-shrink-0 shadow-lg shadow-green-500/20">
                                <GraduationCap className="w-4 h-4 md:w-5 md:h-5" />
                            </div>
                            <span>Học vấn</span>
                        </h2>
                        <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mt-2">
                            Thông tin về trình độ học vấn và các chứng chỉ của bạn
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

                {/* Education Items with Drag & Drop */}
                <div className="space-y-4">
                    {data.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="border-2 border-dashed border-gray-200 dark:border-zinc-800 rounded-2xl p-8 text-center"
                        >
                            <GraduationCap className="w-12 h-12 mx-auto text-green-200 mb-3" />
                            <p className="text-gray-500 text-sm">
                                Chưa có thông tin học vấn
                            </p>
                            <Button
                                variant="ghost"
                                size="sm"
                                leftIcon={<Plus className="w-4 h-4" />}
                                onClick={handleAdd}
                                className="mt-3"
                            >
                                Thêm học vấn
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
                                    <div className="absolute -left-3 top-6 flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-r from-green-500 to-green-500 text-white text-xs font-bold shadow-lg hidden md:flex">
                                        {index + 1}
                                    </div>

                                    <div className="space-y-4 md:pl-8">
                                        {/* Mobile Drag Handle & Number */}
                                        <div className="flex items-center gap-2 md:hidden">
                                            {dragHandle}
                                            <span className="text-xs font-semibold text-green-600">
                                                #{index + 1}
                                            </span>
                                        </div>

                                        {/* School & Degree Row */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="relative">
                                                <div className="absolute left-3 top-[42px] text-gray-400 pointer-events-none z-10">
                                                    <Building className="w-4 h-4" />
                                                </div>
                                                <Input
                                                    label="Trường/Tổ chức *"
                                                    placeholder="Đại học Bách Khoa"
                                                    value={item.school}
                                                    onChange={(e) =>
                                                        handleUpdate(item.id, "school", e.target.value)
                                                    }
                                                    className="pl-10"
                                                />
                                            </div>
                                            <Input
                                                label="Bằng cấp *"
                                                placeholder="Cử nhân, Thạc sĩ..."
                                                value={item.degree}
                                                onChange={(e) =>
                                                    handleUpdate(item.id, "degree", e.target.value)
                                                }
                                            />
                                        </div>

                                        {/* Field */}
                                        <Input
                                            label="Chuyên ngành"
                                            placeholder="Công nghệ thông tin"
                                            value={item.field}
                                            onChange={(e) =>
                                                handleUpdate(item.id, "field", e.target.value)
                                            }
                                        />

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
