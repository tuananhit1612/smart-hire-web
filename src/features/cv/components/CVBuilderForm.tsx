"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { CVData, CVSection, CV_SECTIONS, DEFAULT_CV_DATA } from "../types/types";
import { PersonalInfoSection } from "./sections/PersonalInfoSection";
import { SummarySection } from "./sections/SummarySection";
import { EducationSection } from "./sections/EducationSection";
import { ExperienceSection } from "./sections/ExperienceSection";
import { SkillsSection } from "./sections/SkillsSection";
import { ProjectsSection } from "./sections/ProjectsSection";

interface CVBuilderFormProps {
    data?: CVData;
    activeSection: CVSection;
    onSectionChange: (section: CVSection) => void;
    onDataChange?: (data: CVData) => void;
}

export function CVBuilderForm({
    data = DEFAULT_CV_DATA,
    activeSection,
    onSectionChange,
    onDataChange,
}: CVBuilderFormProps) {
    // REMOVED LOCAL STATE - Now strictly controlled by parent

    // Get current section index
    const currentIndex = CV_SECTIONS.findIndex((s) => s.id === activeSection);
    const isFirst = currentIndex === 0;
    const isLast = currentIndex === CV_SECTIONS.length - 1;

    const handlePrev = () => {
        if (!isFirst) {
            onSectionChange(CV_SECTIONS[currentIndex - 1].id);
        }
    };

    const handleNext = () => {
        if (!isLast) {
            onSectionChange(CV_SECTIONS[currentIndex + 1].id);
        }
    };

    // Helper to safely update data
    const updateData = (section: keyof CVData, value: any) => {
        if (onDataChange) {
            onDataChange({
                ...data,
                [section]: value
            });
        }
    };

    // Render current section
    const renderSection = () => {
        switch (activeSection) {
            case "personal":
                return (
                    <PersonalInfoSection
                        data={data.personalInfo}
                        onChange={(personalInfo) => updateData("personalInfo", personalInfo)}
                    />
                );
            case "summary":
                return (
                    <SummarySection
                        data={data.summary}
                        onChange={(summary) => updateData("summary", summary)}
                    />
                );
            case "education":
                return (
                    <EducationSection
                        data={data.education}
                        onChange={(education) => updateData("education", education)}
                    />
                );
            case "experience":
                return (
                    <ExperienceSection
                        data={data.experience}
                        onChange={(experience) => updateData("experience", experience)}
                    />
                );
            case "skills":
                return (
                    <SkillsSection
                        data={data.skills}
                        onChange={(skills) => updateData("skills", skills)}
                    />
                );
            case "projects":
                return (
                    <ProjectsSection
                        data={data.projects}
                        onChange={(projects) => updateData("projects", projects)}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="space-y-8">
            {/* Section Content with Animation */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeSection}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                >
                    {renderSection()}
                </motion.div>
            </AnimatePresence>

            {/* Navigation Footer */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                <Button
                    variant="outline"
                    size="md"
                    leftIcon={<ChevronLeft className="w-4 h-4" />}
                    onClick={handlePrev}
                    disabled={isFirst}
                >
                    Quay lại
                </Button>

                {/* Progress Indicator */}
                <div className="flex items-center gap-2">
                    {CV_SECTIONS.map((section, index) => (
                        <button
                            key={section.id}
                            onClick={() => onSectionChange(section.id)}
                            className={`w-2 h-2 rounded-full transition-all duration-200 ${index === currentIndex
                                ? "w-6 bg-green-500 shadow-lg shadow-green-500/30"
                                : index < currentIndex
                                    ? "bg-sky-400"
                                    : "bg-gray-200"
                                }`}
                        />
                    ))}
                </div>

                <Button
                    variant={isLast ? "primary" : "outline"}
                    size="md"
                    rightIcon={<ChevronRight className="w-4 h-4" />}
                    onClick={handleNext}
                    disabled={isLast}
                >
                    {isLast ? "Hoàn thành" : "Tiếp theo"}
                </Button>
            </div>
        </div>
    );
}
