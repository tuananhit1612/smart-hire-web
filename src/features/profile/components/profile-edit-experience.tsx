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
    experiences: Experience[];
    onSave: (experiences: Experience[]) => void;
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
    experiences: initialExperiences,
    onSave,
}: ProfileEditExperienceProps) {
    const [experiences, setExperiences] = React.useState<Experience[]>(initialExperiences);

    React.useEffect(() => {
        if (open) {
            setExperiences(initialExperiences);
        }
    }, [open, initialExperiences]);

    const addExperience = () => {
        const newExperience: Experience = {
            ...EMPTY_EXPERIENCE,
            id: `exp-${Date.now()}`,
        };
        setExperiences([...experiences, newExperience]);
    };

    const removeExperience = (id: string) => {
        setExperiences(experiences.filter((e) => e.id !== id));
    };

    const updateExperience = (id: string, field: keyof Experience, value: string) => {
        setExperiences(
            experiences.map((e) => (e.id === id ? { ...e, [field]: value } : e))
        );
    };

    const handleSave = () => {
        const validExperiences = experiences.filter(
            (e) => e.title.trim() && e.companyName.trim()
        );
        onSave(validExperiences);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Experience</DialogTitle>
                    <DialogDescription>Add your professional experience</DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
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
                                        Experience {index + 1}
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
                                        label="Role / Title"
                                        placeholder="e.g. Senior Frontend Developer"
                                        value={exp.title}
                                        onChange={(e) =>
                                            updateExperience(exp.id, "title", e.target.value)
                                        }
                                    />
                                    <Input
                                        label="Company"
                                        placeholder="e.g. TechCorp"
                                        value={exp.companyName}
                                        onChange={(e) =>
                                            updateExperience(exp.id, "companyName", e.target.value)
                                        }
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        label="Start Date"
                                        placeholder="e.g. Jan 2022"
                                        value={exp.startDate}
                                        onChange={(e) =>
                                            updateExperience(exp.id, "startDate", e.target.value)
                                        }
                                    />
                                    <Input
                                        label="End Date"
                                        placeholder="e.g. Present"
                                        value={exp.endDate}
                                        onChange={(e) =>
                                            updateExperience(exp.id, "endDate", e.target.value)
                                        }
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground">
                                        Description
                                    </label>
                                    <textarea
                                        className="w-full min-h-[100px] p-3 rounded-xl bg-card/50 border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                                        placeholder="Describe your responsibilities and achievements..."
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
                            <p>No experience entries yet</p>
                            <p className="text-sm">Click below to add your first entry</p>
                        </div>
                    )}

                    <Button
                        variant="outline"
                        onClick={addExperience}
                        className="w-full border-dashed"
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Experience
                    </Button>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave} className="bg-primary text-white">
                        Save Changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
