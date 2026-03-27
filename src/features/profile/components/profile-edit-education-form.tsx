"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, GraduationCap } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Education } from "../types/profile";
import { useProfileStore } from "../stores/profile-store";

interface ProfileEditEducationFormProps {
    educations: Education[];
    onChange: (educations: Education[]) => void;
}

const EMPTY_EDUCATION: Omit<Education, "id"> = {
    institution: "",
    degree: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
};

export function ProfileEditEducationForm({
    educations,
    onChange,
}: ProfileEditEducationFormProps) {

    const { deleteEducation } = useProfileStore();

    const addEducation = () => {
        const newEducation: Education = {
            ...EMPTY_EDUCATION,
            id: `edu-${Date.now()}`,
        };
        onChange([...educations, newEducation]);
    };

    const removeEducation = async (id: string) => {
        if (id.startsWith("edu-") || id.startsWith("new-")) {
            onChange(educations.filter((e) => e.id !== id));
            return;
        }

        try {
            await deleteEducation(id);
        } catch (e) {
            console.error(e);
        }
    };

    const updateEducation = (id: string, field: keyof Education, value: string) => {
        onChange(
            educations.map((e) => (e.id === id ? { ...e, [field]: value } : e))
        );
    };

    return (
        <div className="space-y-4 animate-in fade-in zoom-in-95 duration-500">
            <AnimatePresence mode="popLayout">
                {educations.map((edu, index) => (
                    <motion.div
                        key={edu.id}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        layout
                        className="p-4 rounded-xl bg-muted/30 border border-border/50 space-y-4"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                <GraduationCap className="h-4 w-4" />
                                Học vấn {index + 1}
                            </div>
                            <button
                                onClick={() => removeEducation(edu.id)}
                                className="p-1.5 rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-colors"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Trường / Đại học"
                                placeholder="VD: Đại học Bách khoa TP. HCM"
                                value={edu.institution}
                                onChange={(e) =>
                                    updateEducation(edu.id, "institution", e.target.value)
                                }
                            />
                            <Input
                                label="Bằng cấp"
                                placeholder="VD: Cử nhân Khoa học"
                                value={edu.degree}
                                onChange={(e) =>
                                    updateEducation(edu.id, "degree", e.target.value)
                                }
                            />
                        </div>

                        <Input
                            label="Chuyên ngành"
                            placeholder="VD: Khoa học Máy tính"
                            value={edu.fieldOfStudy}
                            onChange={(e) =>
                                updateEducation(edu.id, "fieldOfStudy", e.target.value)
                            }
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="Ngày bắt đầu"
                                placeholder="VD: 09/2018"
                                value={edu.startDate}
                                onChange={(e) =>
                                    updateEducation(edu.id, "startDate", e.target.value)
                                }
                            />
                            <Input
                                label="Ngày kết thúc"
                                placeholder="VD: 06/2022"
                                value={edu.endDate}
                                onChange={(e) =>
                                    updateEducation(edu.id, "endDate", e.target.value)
                                }
                            />
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>

            {educations.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                    <GraduationCap className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>Chưa có học vấn nào</p>
                    <p className="text-sm">Nhấn bên dưới để thêm</p>
                </div>
            )}

            <Button
                variant="outline"
                onClick={addEducation}
                className="w-full border-dashed"
            >
                <Plus className="h-4 w-4 mr-2" />
                Thêm học vấn
            </Button>
        </div>
    );
}
