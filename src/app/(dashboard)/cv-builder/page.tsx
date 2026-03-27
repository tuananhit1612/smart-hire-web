"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { CVBuilderLayout } from "@/features/cv/components/CVBuilderLayout";
import { CVSectionNav } from "@/features/cv/components/CVSectionNav";
import { CVBuilderForm } from "@/features/cv/components/CVBuilderForm";
import { CVSection } from "@/features/cv/types/types";
import { AutosaveIndicator } from "@/shared/components/ui/autosave-indicator";
import { useCVData } from "@/features/cv/hooks/useCVData";

function CVBuilderContent() {
    const router = useRouter();
    const [activeSection, setActiveSection] = React.useState<CVSection>("personal");

    // Data hook — CV state, template, display data, save
    const {
        cvData,
        setCvData,
        displayData,
        activeTemplateId,
        isSaving,
        autosaveStatus,
        lastSaved,
        handleSave,
        handleFillProfileData,
    } = useCVData();

    /** Save data + navigate to /cv-preview */
    const handleGoToPreview = React.useCallback(() => {
        handleSave();
        // Persist data so cv-preview can render it
        localStorage.setItem("cv_preview_data", JSON.stringify(displayData));
        localStorage.setItem("cv_preview_template", activeTemplateId);
        router.push(`/cv-preview?template=${activeTemplateId}`);
    }, [handleSave, displayData, activeTemplateId, router]);

    return (
        <CVBuilderLayout
            sectionTabs={
                <CVSectionNav
                    activeSection={activeSection}
                    onSectionChange={setActiveSection}
                />
            }
            formContent={
                <CVBuilderForm
                    data={cvData}
                    activeSection={activeSection}
                    onSectionChange={setActiveSection}
                    onDataChange={setCvData}
                    onComplete={handleGoToPreview}
                />
            }
            onSave={handleSave}
            onPreview={handleGoToPreview}
            onAutoFill={handleFillProfileData}
            isSaving={isSaving}
            headerActions={
                <AutosaveIndicator status={autosaveStatus} lastSaved={lastSaved} />
            }
        />
    );
}

export default function CVBuilderPage() {
    return (
        <React.Suspense fallback={
            <div className="flex items-center justify-center h-screen bg-slate-50 dark:bg-[#141A21]">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-slate-500 dark:text-gray-400 font-medium text-sm">Đang tải trình tạo CV...</p>
                </div>
            </div>
        }>
            <CVBuilderContent />
        </React.Suspense>
    );
}
