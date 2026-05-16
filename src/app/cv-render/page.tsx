"use client";

import { TEMPLATE_COMPONENTS } from "@/features/cv/components/cv-templates";
import { CVDesignPreviewWrapper } from "@/features/cv/components/CVDesignPreviewWrapper";
import { DEFAULT_DESIGN_TOKENS,type CVData,type CVDesignTokens } from "@/features/cv/types/types";
import { MOCK_CV_DATA } from "@/shared/lib/mock-data";

/**
 * Demo version of the CV Render page.
 * Uses mock CV data instead of the server-side pdfCache.
 */
export default function CVRenderPage() {
  const TemplateComponent = TEMPLATE_COMPONENTS["modern-tech"];

  const designTokens: CVDesignTokens = {
    ...DEFAULT_DESIGN_TOKENS,
    fontFamily: "sans",
    fontSize: 1,
    accentColor: "#3b82f6",
    spacing: "normal",
    hiddenSections: [],
    columnLayout: "2-col",
  };

  return (
    <div className="bg-white" style={{ margin: 0, padding: 0 }}>
      <CVDesignPreviewWrapper designTokens={designTokens}>
        <div id="cv-export-content" className="w-[210mm]">
          <TemplateComponent
            data={MOCK_CV_DATA as unknown as CVData}
            editable={false}
            sectionOrder={designTokens.sectionOrder}
            hiddenSections={designTokens.hiddenSections}
            showSectionToolbar={false}
          />
        </div>
      </CVDesignPreviewWrapper>
    </div>
  );
}
