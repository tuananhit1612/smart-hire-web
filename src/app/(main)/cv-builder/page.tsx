"use client";

import * as React from "react";
import { CVBuilderLayout } from "@/features/cv/components/CVBuilderLayout";
import { CVSectionNav } from "@/features/cv/components/CVSectionNav";
import { CVBuilderForm } from "@/features/cv/components/CVBuilderForm";
import { CVSection, CVData, DEFAULT_CV_DATA } from "@/features/cv/types/types";
import { FileText } from "lucide-react";
import { useToast } from "@/shared/components/ui/toast";
import { useAutosave, AutosaveIndicator } from "@/shared/components/ui/autosave-indicator";
import { OnboardingTour } from "@/shared/components/ui/onboarding-tour";
import { SpotlightTour } from "@/shared/components/ui/spotlight-tour";

export default function CVBuilderPage() {
    const [activeSection, setActiveSection] = React.useState<CVSection>("personal");
    const [cvData, setCvData] = React.useState<CVData>(DEFAULT_CV_DATA);
    const [isSaving, setIsSaving] = React.useState(false);
    const { addToast } = useToast();

    // Mock save function
    const saveCV = React.useCallback(async (data: CVData) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("CV data saved:", data);
        // In real app, this would call API
    }, []);

    // Autosave hook
    const { status: autosaveStatus, lastSaved, save: triggerSave } = useAutosave(
        cvData,
        saveCV,
        { debounceMs: 3000, enabled: true }
    );

    // Manual save with toast
    const handleSave = async () => {
        setIsSaving(true);
        try {
            await saveCV(cvData);
            addToast("CV đã được lưu thành công!", "success");
        } catch {
            addToast("Có lỗi khi lưu CV. Vui lòng thử lại.", "error");
        } finally {
            setIsSaving(false);
        }
    };

    const handlePreview = () => {
        addToast("Tính năng xem trước đang được phát triển", "info");
    };

    // Calculate completion percentage
    const calculateProgress = (): number => {
        let completed = 0;
        const total = 6;

        if (cvData.personalInfo.fullName && cvData.personalInfo.email) completed++;
        if (cvData.summary.length > 50) completed++;
        if (cvData.education.length > 0) completed++;
        if (cvData.experience.length > 0) completed++;
        if (cvData.skills.length > 0) completed++;
        if (cvData.projects.length > 0) completed++;

        return Math.round((completed / total) * 100);
    };

    // CV Preview Placeholder
    const PreviewPlaceholder = (
        <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 flex items-center justify-center mb-4">
                <FileText className="w-8 h-8 text-indigo-500" />
            </div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                Xem trước CV
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 max-w-[200px]">
                CV của bạn sẽ hiển thị ở đây khi bạn điền thông tin
            </p>

            {/* Progress indicator */}
            <div className="mt-6 w-full px-4">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <span>Hoàn thành</span>
                    <span className="font-medium text-indigo-600">{calculateProgress()}%</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
                        style={{ width: `${calculateProgress()}%` }}
                    />
                </div>
            </div>
        </div>
    );

    return (
        <>
            <SpotlightTour />
            <CVBuilderLayout
                sidebar={
                    <CVSectionNav
                        activeSection={activeSection}
                        onSectionChange={setActiveSection}
                    />
                }
                form={
                    <CVBuilderForm
                        initialData={cvData}
                        activeSection={activeSection}
                        onSectionChange={setActiveSection}
                        onDataChange={setCvData}
                    />
                }
                preview={PreviewPlaceholder}
                onSave={handleSave}
                onPreview={handlePreview}
                isSaving={isSaving}
                autosaveIndicator={
                    <AutosaveIndicator status={autosaveStatus} lastSaved={lastSaved} />
                }
            />
        </>
    );
}
