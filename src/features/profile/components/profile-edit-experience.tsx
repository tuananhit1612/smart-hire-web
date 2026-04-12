"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Briefcase } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Experience } from "../types/profile";

interface ProfileEditExperienceProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    experience: Experience | null; // null means ADD mode
    onSave: (experience: Omit<Experience, "id"> | Experience) => Promise<void>;
}

const EMPTY_EXPERIENCE: Omit<Experience, "id"> = {
    title: "",
    companyName: "",
    startDate: "",
    endDate: "",
    description: "",
};

export function ProfileEditExperience({
    open,
    onOpenChange,
    experience: initialExperience,
    onSave,
}: ProfileEditExperienceProps) {
    const [exp, setExp] = React.useState<Experience | Omit<Experience, "id">>(EMPTY_EXPERIENCE);
    const [isSaving, setIsSaving] = React.useState(false);

    React.useEffect(() => {
        if (open) {
            setExp(initialExperience || EMPTY_EXPERIENCE);
        }
    }, [open, initialExperience]);

    const handleChange = (field: keyof Experience, value: string) => {
        setExp(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        if (!exp.title.trim() || !exp.companyName.trim()) return;
        
        setIsSaving(true);
        try {
            await onSave(exp);
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
                    <DialogTitle>{initialExperience ? "Sửa Kinh Nghiệm" : "Thêm Kinh Nghiệm"}</DialogTitle>
                    <DialogDescription>Chi tiết kinh nghiệm làm việc của bạn</DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="p-4 rounded-xl bg-muted/30 border border-border/50 space-y-4">
                        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-4">
                            <Briefcase className="h-4 w-4" />
                            Thông tin
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Chức danh / Vị trí"
                                placeholder="VD: Senior Frontend Developer"
                                value={exp.title}
                                onChange={(e) => handleChange("title", e.target.value)}
                            />
                            <Input
                                label="Công ty"
                                placeholder="VD: TechCorp"
                                value={exp.companyName}
                                onChange={(e) => handleChange("companyName", e.target.value)}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="Bắt đầu"
                                placeholder="VD: Jan 2022"
                                value={exp.startDate}
                                onChange={(e) => handleChange("startDate", e.target.value)}
                            />
                            <Input
                                label="Kết thúc"
                                placeholder="VD: Present"
                                value={exp.endDate}
                                onChange={(e) => handleChange("endDate", e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">
                                Mô tả
                            </label>
                            <textarea
                                className="w-full min-h-[100px] p-3 rounded-xl bg-card/50 border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                                placeholder="Mô tả công việc và thành tựu..."
                                value={exp.description}
                                onChange={(e) => handleChange("description", e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSaving}>
                        Hủy
                    </Button>
                    <Button onClick={handleSave} className="bg-[#22C55E] hover:bg-[#16a34a] text-white" disabled={isSaving || !exp.title.trim()}>
                        {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
