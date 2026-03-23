"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Briefcase } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Experience } from "../types/profile";

interface ProfileEditExperienceFormProps {
    experiences: Experience[];
    onChange: (experiences: Experience[]) => void;
}

const EMPTY_EXPERIENCE: Omit<Experience, "id"> = {
    title: "",
    companyName: "",
    startDate: "",
    endDate: "",
    description: "",
};

export function ProfileEditExperienceForm({
    experiences,
    onChange,
}: ProfileEditExperienceFormProps) {

    const addExperience = () => {
        const newExperience: Experience = {
            ...EMPTY_EXPERIENCE,
            id: `exp-${Date.now()}`,
        };
        onChange([...experiences, newExperience]);
    };

    const removeExperience = (id: string) => {
        onChange(experiences.filter((e) => e.id !== id));
    };

    const updateExperience = (id: string, field: keyof Experience, value: string) => {
        onChange(
            experiences.map((e) => (e.id === id ? { ...e, [field]: value } : e))
        );
    };

    return (
        <div className="space-y-4 animate-in fade-in zoom-in-95 duration-500">
            <AnimatePresence mode="popLayout">
                {experiences.map((exp, index) => (
                    <motion.div
                        key={exp.id}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        layout
                        className="p-4 rounded-xl bg-muted/30 border border-border/50 space-y-4"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                <Briefcase className="h-4 w-4" />
                                Kinh nghiệm {index + 1}
                            </div>
                            <button
                                onClick={() => removeExperience(exp.id)}
                                className="p-1.5 rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-colors"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Vị trí / Chức danh"
                                placeholder="VD: Lập trình viên Frontend Cao cấp"
                                value={exp.title}
                                onChange={(e) =>
                                    updateExperience(exp.id, "title", e.target.value)
                                }
                            />
                            <Input
                                label="Công ty"
                                placeholder="VD: TechCorp Việt Nam"
                                value={exp.companyName}
                                onChange={(e) =>
                                    updateExperience(exp.id, "companyName", e.target.value)
                                }
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="Ngày bắt đầu"
                                placeholder="VD: 01/2022"
                                value={exp.startDate}
                                onChange={(e) =>
                                    updateExperience(exp.id, "startDate", e.target.value)
                                }
                            />
                            <Input
                                label="Ngày kết thúc"
                                placeholder="VD: Hiện tại"
                                value={exp.endDate}
                                onChange={(e) =>
                                    updateExperience(exp.id, "endDate", e.target.value)
                                }
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Địa điểm"
                                placeholder="VD: TP. Hồ Chí Minh"
                                value={exp.location || ""}
                                onChange={(e) =>
                                    updateExperience(exp.id, "location", e.target.value)
                                }
                            />
                            <div className="grid grid-cols-2 gap-2">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground">Hình thức</label>
                                    <select
                                        className="w-full h-10 rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                        value={exp.locationType || "Onsite"}
                                        onChange={(e) => updateExperience(exp.id, "locationType", e.target.value as any)}
                                    >
                                        <option value="Onsite">Tại văn phòng</option>
                                        <option value="Remote">Từ xa</option>
                                        <option value="Hybrid">Kết hợp</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground">Loại hợp đồng</label>
                                    <select
                                        className="w-full h-10 rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                        value={exp.employmentType || "Full-time"}
                                        onChange={(e) => updateExperience(exp.id, "employmentType", e.target.value as any)}
                                    >
                                        <option value="Full-time">Toàn thời gian</option>
                                        <option value="Part-time">Bán thời gian</option>
                                        <option value="Contract">Hợp đồng</option>
                                        <option value="Freelance">Tự do</option>
                                        <option value="Internship">Thực tập</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">
                                Mô tả công việc
                            </label>
                            <textarea
                                className="w-full min-h-[100px] p-3 rounded-xl bg-card border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                                placeholder="Mô tả trách nhiệm và thành tựu của bạn..."
                                value={exp.description}
                                onChange={(e) =>
                                    updateExperience(exp.id, "description", e.target.value)
                                }
                            />
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>

            {experiences.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                    <Briefcase className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>Chưa có kinh nghiệm nào</p>
                    <p className="text-sm">Nhấn bên dưới để thêm</p>
                </div>
            )}

            <Button
                variant="outline"
                onClick={addExperience}
                className="w-full border-dashed"
            >
                <Plus className="h-4 w-4 mr-2" />
                Thêm kinh nghiệm
            </Button>
        </div>
    );
}
