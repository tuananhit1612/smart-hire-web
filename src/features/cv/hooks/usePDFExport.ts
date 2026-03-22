"use client";

import * as React from "react";
import { exportToPDF } from "@/features/cv/utils/export-to-pdf";
import { useToast } from "@/shared/components/ui/toast";

interface UsePDFExportReturn {
    isExporting: boolean;
    handleExportFromModal: (elementId: string, fileName: string) => Promise<void>;
}

export function usePDFExport(): UsePDFExportReturn {
    const [isExporting, setIsExporting] = React.useState(false);
    const { addToast } = useToast();

    const handleExportFromModal = async (elementId: string, fileName: string) => {
        setIsExporting(true);
        try {
            const success = await exportToPDF(elementId, fileName);
            if (success) {
                addToast("Xuất PDF thành công!", "success", 4000, "CV của bạn đã được tải xuống.");
            } else {
                addToast("Xuất PDF thất bại", "error", 5000, "Có lỗi xảy ra, vui lòng thử lại.");
            }
        } finally {
            setIsExporting(false);
        }
    };

    return {
        isExporting,
        handleExportFromModal,
    };
}
