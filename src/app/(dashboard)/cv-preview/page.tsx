"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Download, Edit2, FileText } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { CVData, DEFAULT_CV_DATA } from "@/features/cv/types/types";
import { TEMPLATE_COMPONENTS } from "@/features/cv/components/cv-templates";
import { getMockDataForTemplate } from "@/features/cv/data/mock-data";
import { usePDFExport } from "@/features/cv/hooks/usePDFExport";

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
    const { isExporting, handleExportFromModal } = usePDFExport();

    // Resolve template id — URL param takes priority, then localStorage
    const templateId = searchParams.get("template") || loadPreviewTemplate();

    // Resolve CV data — localStorage takes priority, then mock data for template
    const [cvData, setCvData] = React.useState<CVData>(DEFAULT_CV_DATA);
    const [isLoaded, setIsLoaded] = React.useState(false);

    React.useEffect(() => {
        const saved = loadPreviewData();
        setCvData(saved || getMockDataForTemplate(templateId));
        setIsLoaded(true);
    }, [templateId]);

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
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/cv-builder?template=${templateId}`)}
                        className="gap-2 border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300"
                    >
                        <Edit2 className="w-4 h-4" />
                        <span className="hidden sm:inline">Chỉnh sửa</span>
                    </Button>
                    <Button
                        size="sm"
                        onClick={() => handleExportFromModal("cv-preview-content", fileName)}
                        disabled={isExporting}
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

                <div className="relative shadow-2xl shadow-slate-200 dark:shadow-black/40 bg-white">
                    <div
                        id="cv-preview-content"
                        className="w-[210mm] min-h-[297mm]"
                    >
                        <TemplateComponent data={cvData} />
                    </div>
                </div>
            </main>
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
