"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Download, Edit2, FileText, Save, SlidersHorizontal } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { Button } from "@/shared/components/ui/button";
import { CVData, CVSection, DEFAULT_CV_DATA } from "@/features/cv/types/types";
import { TEMPLATE_COMPONENTS } from "@/features/cv/components/cv-templates";
import { getMockDataForTemplate } from "@/features/cv/data/mock-data";
import { usePDFExport } from "@/features/cv/hooks/usePDFExport";
import { useCVDesign } from "@/features/cv/hooks/useCVDesign";
import { useCvFileStore } from "@/features/cv/stores/cv-file-store";
import { useToast } from "@/shared/components/ui/toast";
import { CVDesignPanel } from "@/features/cv/components/CVDesignPanel";
import { CVDesignPreviewWrapper } from "@/features/cv/components/CVDesignPreviewWrapper";
import { CVPageBreakOverlay } from "@/features/cv/components/CVPageBreakOverlay";
import type { SectionAction } from "@/features/cv/components/CVSectionToolbar";
import { getEmptySections } from "@/features/cv/utils/get-empty-sections";
import { addEmptySectionEntry } from "@/features/cv/utils/create-empty-section-entry";

// ---------------------------------------------------------------------------
// Helpers — read saved preview data from localStorage
// ---------------------------------------------------------------------------

function loadPreviewData(): CVData | null {
    if (typeof window === "undefined") return null;
    try {
        const raw = localStorage.getItem("cv_preview_data");
        return raw ? (JSON.parse(raw) as CVData) : null;
    } catch {
        return null;
    }
}

function loadPreviewTemplate(): string {
    if (typeof window === "undefined") return "modern-tech";
    return localStorage.getItem("cv_preview_template") || "modern-tech";
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

function CVPreviewContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { isExporting, handleExportFromModal, exportToBlob } = usePDFExport();
    const { uploadCvFile } = useCvFileStore();
    const { addToast } = useToast();
    const [isSavingToServer, setIsSavingToServer] = React.useState(false);

    // Design tokens (section order, hidden sections, colors, fonts, spacing)
    const design = useCVDesign();
    const { designTokens } = design;

    // Toggle design sidebar open/close
    const [showDesignPanel, setShowDesignPanel] = React.useState(false);

    // Resolve template id — URL param takes priority, then localStorage
    const templateId = searchParams.get("template") || loadPreviewTemplate();

    // Resolve CV data — localStorage takes priority, then mock data for template
    const [cvData, setCvData] = React.useState<CVData>(DEFAULT_CV_DATA);
    const [isLoaded, setIsLoaded] = React.useState(false);

    // Inline editing mode
    const [isEditing, setIsEditing] = React.useState(false);
    const [hasUnsavedChanges, setHasUnsavedChanges] = React.useState(false);

    React.useEffect(() => {
        const saved = loadPreviewData();
        setCvData(saved || getMockDataForTemplate(templateId));
        setIsLoaded(true);
    }, [templateId]);

    // Handle inline data changes from the template
    const handleDataChange = React.useCallback((updated: CVData) => {
        setCvData(updated);
        setHasUnsavedChanges(true);
    }, []);

    // Persist edits to localStorage
    const handleSaveEdits = React.useCallback(() => {
        localStorage.setItem("cv_preview_data", JSON.stringify(cvData));
        setHasUnsavedChanges(false);
    }, [cvData]);

    // Handle floating-toolbar actions (add / delete / move up / move down)
    const handleSectionAction = React.useCallback(
        (action: SectionAction, section: CVSection, columnSections?: CVSection[]) => {
            // "delete" hides the section
            if (action === "delete") {
                design.toggleSectionVisibility(section);
                return;
            }

            const order = [...designTokens.sectionOrder];
            const idx = order.indexOf(section);
            if (idx === -1) return;

            if (columnSections && columnSections.length > 1) {
                // Column-aware swap: find the neighbor within the same column
                const colIdx = columnSections.indexOf(section);
                if (colIdx === -1) return;

                let swapWith: CVSection | undefined;
                if (action === "moveUp" && colIdx > 0) {
                    swapWith = columnSections[colIdx - 1];
                } else if (action === "moveDown" && colIdx < columnSections.length - 1) {
                    swapWith = columnSections[colIdx + 1];
                }
                if (!swapWith) return;

                const swapIdx = order.indexOf(swapWith);
                if (swapIdx === -1) return;

                [order[idx], order[swapIdx]] = [order[swapIdx], order[idx]];
                design.reorderSections(order);
            } else {
                // Fallback: simple adjacent swap (single-column templates)
                if (action === "moveUp" && idx > 0) {
                    [order[idx - 1], order[idx]] = [order[idx], order[idx - 1]];
                    design.reorderSections(order);
                } else if (action === "moveDown" && idx < order.length - 1) {
                    [order[idx + 1], order[idx]] = [order[idx], order[idx + 1]];
                    design.reorderSections(order);
                }
            }
        },
        [design, designTokens.sectionOrder],
    );

    // Restore a hidden / empty section: inject one empty placeholder entry
    // into cvData so the template renders the section, and un-hide it.
    const handleRestoreSection = React.useCallback(
        (section: CVSection) => {
            // 1. Inject empty placeholder data so the template doesn't `return null`
            const updated = addEmptySectionEntry(cvData, section);
            if (updated !== cvData) {
                setCvData(updated);
                setHasUnsavedChanges(true);
            }
            // 2. Un-hide the section (toggle only if currently hidden)
            if (designTokens.hiddenSections.includes(section)) {
                design.toggleSectionVisibility(section);
            }
        },
        [cvData, design, designTokens.hiddenSections],
    );

    // Get the template component (same one used in the builder)
    const TemplateComponent =
        TEMPLATE_COMPONENTS[templateId] || TEMPLATE_COMPONENTS["modern-tech"];

    if (!isLoaded) {
        return (
            <div className="flex items-center justify-center h-screen bg-slate-50 dark:bg-[#141A21]">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-slate-500 dark:text-gray-400 font-medium text-sm">
                        Đang tải bản xem trước…
                    </p>
                </div>
            </div>
        );
    }

    const fileName = `CV_${cvData.personalInfo.fullName || "Untitled"}.pdf`;

    const handleSaveToServer = async () => {
        setIsSavingToServer(true);
        addToast("Đang tạo tệp PDF...", "info");
        try {
            const file = await exportToBlob("cv-preview-content", fileName);
            if (!file) return;

            addToast("Đang tải lên hệ thống...", "info");
            // Set as primary CV immediately since they just built it? Let's leave it false by default.
            await uploadCvFile(file, false, "BUILDER");
            addToast("Lưu CV thành công!", "success", 4000, "Bạn có thể xem CV này ở mục Quản lý CV.");
            router.push("/cv-files");
        } catch (error) {
            console.error("Lưu CV thất bại:", error);
            // Error is handled by store internally
        } finally {
            setIsSavingToServer(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#141A21] flex flex-col">
            {/* ─── Header ─── */}
            <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-3 bg-white/80 dark:bg-[#1C252E]/80 backdrop-blur-xl border-b border-gray-200 dark:border-white/10">
                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push(`/cv-builder?template=${templateId}`)}
                        className="gap-2 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Quay lại chỉnh sửa
                    </Button>

                    <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <FileText className="w-4 h-4 text-green-500" />
                        <span className="font-semibold text-gray-800 dark:text-white">
                            {cvData.personalInfo.fullName || "CV của bạn"}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {/* Design panel toggle */}
                    <Button
                        variant={showDesignPanel ? "primary" : "outline"}
                        size="sm"
                        onClick={() => setShowDesignPanel((v) => !v)}
                        className={cn(
                            "gap-2",
                            showDesignPanel
                                ? "bg-purple-500 hover:bg-purple-600 text-white"
                                : "border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300",
                        )}
                    >
                        <SlidersHorizontal className="w-4 h-4" />
                        <span className="hidden sm:inline">
                            {showDesignPanel ? "Ẩn thiết kế" : "Thiết kế"}
                        </span>
                    </Button>

                    {/* Inline edit toggle */}
                    <Button
                        variant={isEditing ? "primary" : "outline"}
                        size="sm"
                        onClick={() => setIsEditing((v) => !v)}
                        className={cn(
                            "gap-2",
                            isEditing
                                ? "bg-blue-500 hover:bg-blue-600 text-white"
                                : "border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300",
                        )}
                    >
                        <Edit2 className="w-4 h-4" />
                        <span className="hidden sm:inline">
                            {isEditing ? "Đang sửa" : "Sửa trực tiếp"}
                        </span>
                    </Button>

                    {/* Save inline edits */}
                    {hasUnsavedChanges && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleSaveEdits}
                            className="gap-2 border-green-300 text-green-600 hover:bg-green-50 dark:border-green-700 dark:text-green-400"
                        >
                            <Save className="w-4 h-4" />
                            <span className="hidden sm:inline">Lưu tạm</span>
                        </Button>
                    )}

                    <Button
                        size="sm"
                        onClick={handleSaveToServer}
                        disabled={isSavingToServer || isExporting}
                        className="gap-2 bg-purple-500 hover:bg-purple-600 text-white shadow-lg shadow-purple-500/20"
                    >
                        {isSavingToServer ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <Save className="w-4 h-4" />
                        )}
                        <span className="hidden sm:inline">
                            {isSavingToServer ? "Đang lưu…" : "Lưu vào Hồ sơ"}
                        </span>
                    </Button>

                    <Button
                        size="sm"
                        onClick={() => handleExportFromModal("cv-preview-content", fileName)}
                        disabled={isExporting || isSavingToServer}
                        className="gap-2 bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/20"
                    >
                        {isExporting ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <Download className="w-4 h-4" />
                        )}
                        <span className="hidden sm:inline">
                            {isExporting ? "Đang xuất…" : "Tải PDF"}
                        </span>
                    </Button>
                </div>
            </header>

            {/* Editing mode banner */}
            {isEditing && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border-b border-blue-200 dark:border-blue-800/40 px-6 py-2 text-center text-sm text-blue-700 dark:text-blue-300">
                    ✏️ Chế độ sửa trực tiếp — nhấn vào bất kỳ đoạn văn bản nào trên CV để chỉnh sửa
                </div>
            )}

            {/* ─── Body: Sidebar + CV Canvas ─── */}
            <div className="flex-1 flex overflow-hidden">
                {/* Design panel sidebar */}
                {showDesignPanel && (
                    <aside className="w-80 shrink-0 border-r border-gray-200 dark:border-white/10 bg-white dark:bg-[#1C252E] overflow-y-auto">
                        <CVDesignPanel design={design} />
                    </aside>
                )}

                {/* ─── CV Canvas ─── */}
                <main className="flex-1 overflow-auto p-6 md:p-12 flex justify-center relative">
                    {/* Grid background */}
                    <div
                        className="absolute inset-0 opacity-[0.03] pointer-events-none"
                        style={{
                            backgroundImage:
                                "radial-gradient(#000 1px, transparent 1px)",
                            backgroundSize: "20px 20px",
                        }}
                    />

                    <div className={cn(
                        "relative shadow-2xl shadow-slate-200 dark:shadow-black/40 bg-white",
                        isEditing && "ring-2 ring-blue-400/50 ring-offset-4 ring-offset-slate-50 dark:ring-offset-[#141A21]",
                    )}>
                        <CVDesignPreviewWrapper designTokens={designTokens}>
                            <div
                                id="cv-preview-content"
                                className="w-[210mm] min-h-[297mm]"
                            >
                                <TemplateComponent
                                    data={cvData}
                                    editable={isEditing}
                                    onDataChange={handleDataChange}
                                    sectionOrder={designTokens.sectionOrder}
                                    hiddenSections={[
                                        ...designTokens.hiddenSections,
                                        ...getEmptySections(cvData).filter(
                                            (s) => !designTokens.hiddenSections.includes(s),
                                        ),
                                    ]}
                                    showSectionToolbar={!isExporting}
                                    onSectionAction={handleSectionAction}
                                    onRestoreSection={handleRestoreSection}
                                />
                            </div>

                            {/* Page-break indicators (hidden during export) */}
                            {!isExporting && <CVPageBreakOverlay />}
                        </CVDesignPreviewWrapper>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default function CVPreviewPage() {
    return (
        <React.Suspense
            fallback={
                <div className="flex items-center justify-center h-screen bg-slate-50 dark:bg-[#141A21]">
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
                        <p className="text-slate-500 dark:text-gray-400 font-medium text-sm">
                            Đang tải bản xem trước…
                        </p>
                    </div>
                </div>
            }
        >
            <CVPreviewContent />
        </React.Suspense>
    );
}
