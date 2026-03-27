"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, GraduationCap } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Education } from "../types/profile";

interface ProfileEditEducationProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    education: Education | null; // null means ADD mode
    onSave: (education: Omit<Education, "id"> | Education) => Promise<void>;
}

const EMPTY_EDUCATION: Omit<Education, "id"> = {
    institution: "",
    degree: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
};

export function ProfileEditEducation({
    open,
    onOpenChange,
    education: initialEducation,
    onSave,
}: ProfileEditEducationProps) {
    const [edu, setEdu] = React.useState<Education | Omit<Education, "id">>(EMPTY_EDUCATION);
    const [isSaving, setIsSaving] = React.useState(false);

    React.useEffect(() => {
        if (open) {
            setEdu(initialEducation || EMPTY_EDUCATION);
        }
    }, [open, initialEducation]);

    const handleChange = (field: keyof Education, value: string) => {
        setEdu(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        if (!edu.institution.trim() || !edu.degree.trim()) return;
        
        setIsSaving(true);
        try {
            await onSave(edu);
            onOpenChange(false);
        } catch (error) {
            console.error(error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{initialEducation ? "Sửa Học Vấn" : "Thêm Học Vấn"}</DialogTitle>
                    <DialogDescription>Chi tiết quá trình học tập của bạn</DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="p-4 rounded-xl bg-muted/30 border border-border/50 space-y-4">
                        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-4">
                            <GraduationCap className="h-4 w-4" />
                            Thông tin
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Trường học / Cơ sở đào tạo"
                                placeholder="VD: Đại học Bách Khoa"
                                value={edu.institution}
                                onChange={(e) => handleChange("institution", e.target.value)}
                            />
                            <Input
                                label="Bằng cấp"
                                placeholder="VD: Cử nhân"
                                value={edu.degree}
                                onChange={(e) => handleChange("degree", e.target.value)}
                            />
                        </div>

                        <Input
                            label="Chuyên ngành"
                            placeholder="VD: Khoa học máy tính"
                            value={edu.fieldOfStudy}
                            onChange={(e) => handleChange("fieldOfStudy", e.target.value)}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="Bắt đầu"
                                placeholder="VD: Sep 2018"
                                value={edu.startDate}
                                onChange={(e) => handleChange("startDate", e.target.value)}
                            />
                            <Input
                                label="Kết thúc"
                                placeholder="VD: Jun 2022"
                                value={edu.endDate}
                                onChange={(e) => handleChange("endDate", e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSaving}>
                        Hủy
                    </Button>
                    <Button onClick={handleSave} className="bg-[#FFAB00] hover:bg-[#e09800] text-white" disabled={isSaving || !edu.institution.trim()}>
                        {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
