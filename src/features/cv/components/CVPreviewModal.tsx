"use client";

import * as React from "react";
import { FileText, Download, X } from "lucide-react";
import { CVData } from "@/features/cv/types/types";
import { usePDFExport } from "@/features/cv/hooks/usePDFExport";

interface CVPreviewModalProps {
    displayData: CVData;
    cvData: CVData;
    TemplateComponent: React.ComponentType<{ data: CVData }>;
    onClose: () => void;
}

export function CVPreviewModal({
    displayData,
    cvData,
    TemplateComponent,
    onClose,
}: CVPreviewModalProps) {
    // Provide a mocked template ID since this modal might be a generic standalone component. 
    // In actual usage, designTokens and templateId should be passed via props.
    const { handleExportPDF } = usePDFExport(cvData, "modern-tech", undefined);

    return (
        <div className="fixed inset-0 z-50 bg-white/95 dark:bg-[#141A21]/95 backdrop-blur-xl flex flex-col animate-in fade-in duration-200">
            <div className="flex items-center justify-between px-6 py-4 bg-white/50 dark:bg-[#1C252E]/50 border-b border-gray-100 dark:border-white/10 text-gray-900 dark:text-white">
                <h2 className="text-lg font-bold flex items-center gap-2 text-green-900 dark:text-white">
                    <FileText className="w-5 h-5 text-green-600" />
                    Xem trước CV
                </h2>
                <div className="flex gap-3">
                    <button
                        onClick={() =>
                            handleExportPDF(`CV_${cvData.personalInfo.fullName || 'Untitled'}.pdf`)
                        }
                        className="px-5 py-2.5 bg-green-500 hover:bg-green-600 shadow-lg shadow-green-500/20 text-white rounded-full text-sm font-bold transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                    >
                        <Download className="w-4 h-4" />
                        Tải xuống PDF
                    </button>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors text-gray-500 dark:text-gray-400 hover:text-red-500"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>
            </div>
            <div className="flex-1 overflow-auto p-8 md:p-12 flex justify-center bg-slate-50 dark:bg-[#141A21] relative">
                {/* Grid Background */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

                <div className="relative shadow-2xl shadow-slate-200 dark:shadow-black/40 bg-white">
                    <div id="cv-modal-content" className="w-[210mm] min-h-[297mm]">
                        <TemplateComponent data={displayData} />
                    </div>
                </div>
            </div>
        </div>
    );
}
