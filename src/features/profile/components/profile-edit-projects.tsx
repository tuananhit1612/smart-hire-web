"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { FolderGit2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Project } from "../types/profile";

interface ProfileEditProjectsProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    project: Project | null;
    onSave: (project: Omit<Project, "id"> | Project) => Promise<void>;
}

const EMPTY_PROJECT: Omit<Project, "id"> = {
    projectName: "",
    technologies: [],
    startDate: "",
    endDate: "",
    description: "",
    link: "",
};

export function ProfileEditProjects({
    open,
    onOpenChange,
    project: initialProject,
    onSave,
}: ProfileEditProjectsProps) {
    const [proj, setProj] = React.useState<Project | Omit<Project, "id">>(EMPTY_PROJECT);
    const [isSaving, setIsSaving] = React.useState(false);
    const [techInput, setTechInput] = React.useState("");

    React.useEffect(() => {
        if (open) {
            setProj(initialProject || EMPTY_PROJECT);
            setTechInput("");
        }
    }, [open, initialProject]);

    const handleChange = (field: keyof Project, value: any) => {
        setProj(prev => ({ ...prev, [field]: value }));
    };

    const handleAddTech = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && techInput.trim()) {
            e.preventDefault();
            if (!proj.technologies.includes(techInput.trim())) {
                handleChange("technologies", [...proj.technologies, techInput.trim()]);
            }
            setTechInput("");
        }
    };

    const removeTech = (tech: string) => {
        handleChange("technologies", proj.technologies.filter(t => t !== tech));
    };

    const handleSave = async () => {
        if (!proj.projectName.trim()) return;
        
        setIsSaving(true);
        try {
            await onSave(proj);
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
                    <DialogTitle>{initialProject ? "Sửa Dự Án" : "Thêm Dự Án"}</DialogTitle>
                    <DialogDescription>Chi tiết dự án cá nhân hoặc dự án nổi bật của bạn</DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="p-4 rounded-xl bg-muted/30 border border-border/50 space-y-4">
                        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-4">
                            <FolderGit2 className="h-4 w-4" />
                            Thông tin dự án
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Tên dự án"
                                placeholder="VD: E-commerce Platform"
                                value={proj.projectName}
                                onChange={(e) => handleChange("projectName", e.target.value)}
                            />
                            <Input
                                label="Đường dẫn (Link)"
                                placeholder="VD: https://github.com/..."
                                value={proj.link || ""}
                                onChange={(e) => handleChange("link", e.target.value)}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="Bắt đầu"
                                placeholder="VD: Jan 2023"
                                value={proj.startDate}
                                onChange={(e) => handleChange("startDate", e.target.value)}
                            />
                            <Input
                                label="Kết thúc"
                                placeholder="VD: Present"
                                value={proj.endDate}
                                onChange={(e) => handleChange("endDate", e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">
                                Công nghệ sử dụng (Nhấn Enter để thêm)
                            </label>
                            <Input
                                placeholder="VD: React, Node.js..."
                                value={techInput}
                                onChange={(e) => setTechInput(e.target.value)}
                                onKeyDown={handleAddTech}
                            />
                            <div className="flex flex-wrap gap-2 mt-2">
                                {proj.technologies.map(tech => (
                                    <span key={tech} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium">
                                        {tech}
                                        <button type="button" onClick={() => removeTech(tech)} className="hover:text-red-500 ml-1">
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">
                                Mô tả
                            </label>
                            <textarea
                                className="w-full min-h-[100px] p-3 rounded-xl bg-card/50 border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                                placeholder="Mô tả các tính năng và vai trò của bạn..."
                                value={proj.description}
                                onChange={(e) => handleChange("description", e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSaving}>
                        Hủy
                    </Button>
                    <Button onClick={handleSave} className="bg-[#A855F7] hover:bg-[#9333EA] text-white" disabled={isSaving || !proj.projectName.trim()}>
                        {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
