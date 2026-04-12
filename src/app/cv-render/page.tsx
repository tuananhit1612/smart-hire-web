"use client";

import * as React from "react";
import { TEMPLATE_COMPONENTS } from "@/features/cv/components/cv-templates";
import { CVDesignPreviewWrapper } from "@/features/cv/components/CVDesignPreviewWrapper";
import { MOCK_CV_DATA } from "@/shared/lib/mock-data";

/**
 * Demo version of the CV Render page.
 * Uses mock CV data instead of the server-side pdfCache.
 */
export default function CVRenderPage() {
  const TemplateComponent = TEMPLATE_COMPONENTS["modern-tech"];

  const designTokens = {
    fontFamily: "int",
    fontSize: 1,
    accentColor: "#3b82f6",
    spacing: "normal",
    sectionOrder: [
      "personal",
      "summary",
      "experience",
      "education",
      "skills",
      "projects",
      "languages",
      "certifications",
      "awards",
    ],
    hiddenSections: [] as string[],
    columnLayout: "2-col",
  };

  return (
    <div className="bg-white" style={{ margin: 0, padding: 0 }}>
      <CVDesignPreviewWrapper designTokens={designTokens}>
        <div id="cv-export-content" className="w-[210mm]">
          <TemplateComponent
            data={MOCK_CV_DATA as any}
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
