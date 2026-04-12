"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { mockCVVersions } from "@/features/cv/types/cv-versions";
import { TEMPLATE_COMPONENTS } from "@/features/cv/components/cv-templates";
import { CVDesignPreviewWrapper } from "@/features/cv/components/CVDesignPreviewWrapper";
import { useCVBuilderStore } from "@/features/cv/stores/cv-builder-store";

export default function CVApplicationViewer() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    
    // Read user's custom edits from Builder Store
    const customCvData = useCVBuilderStore((state) => state.cvData);
    const designTokens = useCVBuilderStore((state) => state.designTokens);
    const loadFromStorage = useCVBuilderStore((state) => state.loadFromStorage);
    
    const [isLoaded, setIsLoaded] = useState(false);
    
    const cv = mockCVVersions.find((c) => c.id === id) || mockCVVersions[0];

    // Load data from localStorage (cross-tab persistence) FIRST
    useEffect(() => {
        loadFromStorage();
        setIsLoaded(true);
    }, [loadFromStorage]);
    
    // Auto-trigger print dialog after layout settles
    useEffect(() => {
        if (!cv || !isLoaded) return;
        
        const triggerPrint = async () => {
            // Wait for layouts, fonts, and images to settle completely
            await new Promise((resolve) => setTimeout(resolve, 800));
            
            // Execute native browser PDF Print Engine for perfect A4 pagination
            window.print();
        };
        
        triggerPrint();
    }, [cv, isLoaded]);

    if (!cv) {
        return <div className="p-10 text-center text-red-500">Không tìm thấy bản đồ CV được yêu cầu!</div>;
    }

    const TemplateComponent = TEMPLATE_COMPONENTS[cv.templateId] || TEMPLATE_COMPONENTS["modern-tech"];

    return (
        <div className="min-h-screen bg-slate-200 print:bg-white flex items-center justify-center py-10 overflow-auto">
            
            {/* Native print styling ensures flawless A4 page breaks like Microsoft Word */}
            <style dangerouslySetInnerHTML={{__html: `
                @media print {
                    @page { margin: 0; size: A4 portrait; }
                    body {
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                        margin: 0;
                        padding: 0;
                    }
                    .print-container {
                        box-shadow: none !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        width: 100% !important;
                    }
                    .hide-on-print { display: none !important; }
                }
            `}} />

            <div className="fixed top-0 left-0 w-full bg-slate-800 text-white p-4 flex justify-between items-center shadow-lg z-50 hide-on-print">
                <div className="flex flex-col">
                    <h2 className="text-lg font-bold">Trình xuất PDF Nâng cao</h2>
                    <p className="text-xs text-slate-300">Vui lòng chọn <b>"Save as PDF" (Lưu dưới dạng PDF)</b> trong hộp thoại in để lấy file trang chuẩn A4.</p>
                </div>
                <button 
                    onClick={() => window.print()}
                    className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-lg shadow-md font-semibold transition"
                >
                    Xuất File PDF
                </button>
            </div>

            <div className="relative mt-16 print:mt-0">
                <CVDesignPreviewWrapper designTokens={designTokens}>
                    <div id="rendering-cv-content" className="print-container w-[210mm] min-h-[297mm] bg-white text-black p-0 mx-auto shadow-2xl">
                        <TemplateComponent
                            data={customCvData}
                            editable={false}
                            onDataChange={() => {}}
                            sectionOrder={designTokens.sectionOrder}
                            hiddenSections={designTokens.hiddenSections}
                            showSectionToolbar={false}
                        />
                    </div>
                </CVDesignPreviewWrapper>
            </div>
        </div>
    );
}
