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
    educations: Education[];
    onSave: (educations: Education[]) => void;
}

const EMPTY_EDUCATION: Omit<Education, "id"> = {
    school: "",
    degree: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
};

export function ProfileEditEducation({
    open,
    onOpenChange,
    educations: initialEducations,
    onSave,
}: ProfileEditEducationProps) {
    const [educations, setEducations] = React.useState<Education[]>(initialEducations);

    React.useEffect(() => {
        if (open) {
            setEducations(initialEducations);
        }
    }, [open, initialEducations]);

    const addEducation = () => {
        const newEducation: Education = {
            ...EMPTY_EDUCATION,
            id: `edu-${Date.now()}`,
        };
        setEducations([...educations, newEducation]);
    };

    const removeEducation = (id: string) => {
        setEducations(educations.filter((e) => e.id !== id));
    };

    const updateEducation = (id: string, field: keyof Education, value: string) => {
        setEducations(
            educations.map((e) => (e.id === id ? { ...e, [field]: value } : e))
        );
    };

    const handleSave = () => {
        const validEducations = educations.filter(
            (e) => e.school.trim() && e.degree.trim()
        );
        onSave(validEducations);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Education</DialogTitle>
                    <DialogDescription>Add your educational background</DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
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
                                        Education {index + 1}
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
                                        label="School / University"
                                        placeholder="e.g. Stanford University"
                                        value={edu.school}
                                        onChange={(e) =>
                                            updateEducation(edu.id, "school", e.target.value)
                                        }
                                    />
                                    <Input
                                        label="Degree"
                                        placeholder="e.g. Bachelor's Degree"
                                        value={edu.degree}
                                        onChange={(e) =>
                                            updateEducation(edu.id, "degree", e.target.value)
                                        }
                                    />
                                </div>

                                <Input
                                    label="Field of Study"
                                    placeholder="e.g. Computer Science"
                                    value={edu.fieldOfStudy}
                                    onChange={(e) =>
                                        updateEducation(edu.id, "fieldOfStudy", e.target.value)
                                    }
                                />

                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        label="Start Date"
                                        placeholder="e.g. Sep 2018"
                                        value={edu.startDate}
                                        onChange={(e) =>
                                            updateEducation(edu.id, "startDate", e.target.value)
                                        }
                                    />
                                    <Input
                                        label="End Date"
                                        placeholder="e.g. Jun 2022"
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
                            <p>No education entries yet</p>
                            <p className="text-sm">Click below to add your first entry</p>
                        </div>
                    )}

                    <Button
                        variant="outline"
                        onClick={addEducation}
                        className="w-full border-dashed"
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Education
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
