"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { mockCVVersions } from "@/features/cv/types/cv-versions";
import { TEMPLATE_COMPONENTS } from "@/features/cv/components/cv-templates";
import { CVDesignPreviewWrapper } from "@/features/cv/components/CVDesignPreviewWrapper";
import { useCVBuilderStore } from "@/features/cv/stores/cv-builder-store";
import { Loader2 } from "lucide-react";

export default function CVDowloadRenderer() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id") || "cv-1";
    
    const customCvData = useCVBuilderStore((state) => state.cvData);
    const designTokens = useCVBuilderStore((state) => state.designTokens);
    const loadFromStorage = useCVBuilderStore((state) => state.loadFromStorage);
    
    const [isLoaded, setIsLoaded] = useState(false);
    
    const cv = mockCVVersions.find((c) => c.id === id) || mockCVVersions[0];

    useEffect(() => {
        loadFromStorage();
        setIsLoaded(true);
    }, [loadFromStorage]);
    
    if (!cv) {
        return <div className="p-10 text-center text-red-500 font-sans">Không tìm thấy bản CV được yêu cầu!</div>;
    }

    if (!isLoaded) {
        return (
            <div className="flex h-screen items-center justify-center bg-white">
                <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
            </div>
        );
    }

    const TemplateComponent = TEMPLATE_COMPONENTS[cv.templateId] || TEMPLATE_COMPONENTS["modern-tech"];

    // A4 Native Print Styling Override with advanced Page Break Handlers
    const globalPrintStyles = `
        @page { size: A4 portrait; margin: 0; }
        @media print {
            body { 
                -webkit-print-color-adjust: exact !important; 
                print-color-adjust: exact !important; 
                margin: 0 !important; 
                padding: 0 !important; 
                background-color: white !important; 
            }
            .print-hidden { display: none !important; }
            
            /* HIDE DASHBOARD LAYOUT ELEMENTS DURING PRINT */
            aside, header { display: none !important; }
            main { padding: 0 !important; margin: 0 !important; }
            .flex.flex-col.flex-1.min-w-0 { margin-left: 0 !important; }
            
            /* Remove fixed heights allowing natural flow */
            .print-A4-wrapper, .cv-design-preview > div { 
                width: 100% !important; 
                max-width: 100% !important; 
                margin: 0 !important; 
                box-shadow: none !important; 
                min-h: 0 !important;
                height: auto !important;
            }
            
            /* Smart Page Breaks */
            section, .cv-section-wrapper { 
                page-break-inside: avoid !important; 
                break-inside: avoid !important; 
            }
            
            h1, h2, h3, h4, h5 {
                page-break-after: avoid !important;
                break-after: avoid !important;
            }
            
            ul, ol, div {
                page-break-inside: auto;
            }
        }
    `;

    return (
        <div className="bg-white min-h-screen font-sans print-A4-wrapper">
            <style dangerouslySetInnerHTML={{ __html: globalPrintStyles }} />
            
            {/* Native Screen instructions (hidden during PDF print) */}
            <div className="print-hidden bg-white dark:bg-[#1C252E] p-4 flex flex-col md:flex-row justify-between items-start md:items-center shadow-sm border-b border-[rgba(145,158,171,0.12)] mb-6 rounded-xl">
                <div>
                    <h1 className="font-bold text-lg text-[#1C252E] dark:text-white">Xem trước & Xuất PDF</h1>
                    <p className="text-sm text-[#637381] mt-1">Hồ sơ của bạn được hiển thị 1:1. Bạn có thể xem trước hoặc tải xuống bản PDF tiêu chuẩn.</p>
                </div>
                <div className="flex gap-3 mt-4 md:mt-0">
                    <button onClick={() => window.print()} className="px-5 py-2.5 bg-[#22C55E] hover:bg-[#16a34a] text-white rounded-xl font-bold shadow-sm transition-colors text-sm flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                        Tải CV File PDF
                    </button>
                    <button onClick={() => window.close()} className="px-5 py-2.5 bg-[rgba(145,158,171,0.08)] hover:bg-[rgba(145,158,171,0.16)] text-[#1C252E] dark:text-white rounded-xl font-bold transition-colors text-sm">
                        Đóng cửa sổ
                    </button>
                </div>
            </div>

            {/* Render directly to DOM for Browser Print Engine to parse cleanly */}
            <div className="w-full bg-white print-A4-wrapper shadow-[0_8px_30px_rgb(0,0,0,0.04)] mx-auto overflow-hidden">
                <CVDesignPreviewWrapper designTokens={designTokens}>
                    <TemplateComponent
                        data={customCvData}
                        editable={false}
                        onDataChange={() => {}}
                        sectionOrder={designTokens?.sectionOrder || ["personalInfo", "summary", "experience", "education", "skills", "projects", "certifications", "activities"]}
                        hiddenSections={designTokens?.hiddenSections || []}
                        showSectionToolbar={false}
                    />
                </CVDesignPreviewWrapper>
            </div>
        </div>
    );
}
