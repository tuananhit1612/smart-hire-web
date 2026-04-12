"use client";

import { TEMPLATE_COMPONENTS } from "@/features/cv/components/cv-templates";
import { CVDesignPreviewWrapper } from "@/features/cv/components/CVDesignPreviewWrapper";
import { DEFAULT_SECTION_ORDER } from "@/features/cv/types/types";
import { MOCK_CV_DATA } from "@/shared/lib/mock-data";

/**
 * Demo version of the CV PDF Render page.
 * Uses mock CV data instead of the server-side pdfCache.
 */
export default function CVPdfRenderPage() {
  const TemplateComponent = TEMPLATE_COMPONENTS["modern-tech"];

  return (
    <div className="bg-white m-0 p-0 text-black w-[210mm] min-h-[297mm]">
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
            @page { margin: 0; size: A4 portrait; }
            body {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
                margin: 0;
                padding: 0;
            }
        }
      `}} />
      <CVDesignPreviewWrapper designTokens={{}}>
          <div id="rendering-cv-content" className="w-[210mm] min-h-[297mm] bg-white text-black p-0 m-0 shadow-none">
              <TemplateComponent
                  data={MOCK_CV_DATA as any}
                  editable={false}
                  onDataChange={() => {}}
                  sectionOrder={DEFAULT_SECTION_ORDER}
                  hiddenSections={[]}
                  showSectionToolbar={false}
              />
          </div>
      </CVDesignPreviewWrapper>
    </div>
  );
}
