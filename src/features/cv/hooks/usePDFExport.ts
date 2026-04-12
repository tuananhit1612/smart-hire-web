"use client";

import * as React from "react";
import { cvApi } from "@/features/cv/api/cv-api";
import { useToast } from "@/shared/components/ui/toast";
import { CVData, CVDesignTokens } from "@/features/cv/types/types";

interface UsePDFExportReturn {
    isExporting: boolean;
    handleExportPDF: (fileName: string) => Promise<void>;
}

export function usePDFExport(
    cvData?: CVData, 
    templateId?: string, 
    designTokens?: CVDesignTokens
): UsePDFExportReturn {
    const [isExporting, setIsExporting] = React.useState(false);
    const { addToast } = useToast();

    const handleExportPDF = async (fileName: string) => {
        if (!cvData || !templateId) {
            addToast("Dữ liệu không đầy đủ để xuất PDF.", "error");
            return;
        }

        setIsExporting(true);
        addToast("Hệ thống đang sinh file PDF chuẩn Vector...", "info");

        try {
            const blob = await cvApi.exportPDF({
                cvData,
                templateId,
                design: designTokens
            });

            // Create object URL and open in a new tab for preview
            const url = window.URL.createObjectURL(blob);
            window.open(url, "_blank");
            // Object URL is not revoked immediately to give the new tab time to load the PDF.

            addToast("Đã tạo bản xem trước PDF!", "success", 4000);
        } catch (error) {
            console.error("Lỗi khi tạo File PDF:", error);
            addToast("Thiết lập server PDF chưa hoàn tất. Vui lòng thử tải báo cáo gốc.", "error");
        } finally {
            setIsExporting(false);
        }
    };

    return {
        isExporting,
        handleExportPDF,
    };
}
