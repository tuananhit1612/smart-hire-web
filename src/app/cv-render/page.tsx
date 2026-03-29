import * as React from "react";
import { pdfCache } from "@/features/cv/api/pdf-cache";
import { TEMPLATE_COMPONENTS } from "@/features/cv/components/cv-templates";
import { CVDesignPreviewWrapper } from "@/features/cv/components/CVDesignPreviewWrapper";
import { redirect } from "next/navigation";
import { getEmptySections } from "@/features/cv/utils/get-empty-sections";

interface CVRenderPageProps {
  searchParams: Promise<{ id?: string }>;
}

export default async function CVRenderPage({ searchParams }: CVRenderPageProps) {
  const { id } = await searchParams;

  if (!id) {
    return <div className="p-10 text-xl font-bold">Lỗi: Không tìm thấy ID của CV</div>;
  }

  // Retrieve CV json from memory cache directly on the server without internal HTTP fetch
  const payload = pdfCache.get(id);

  if (!payload || !payload.cvData || !payload.templateId) {
    return <div className="p-10 text-xl font-bold">Lỗi: Cache đã quá hạn hoặc không hợp lệ. Vui lòng thử lại.</div>;
  }

  const TemplateComponent = TEMPLATE_COMPONENTS[payload.templateId];

  if (!TemplateComponent) {
    return <div className="p-10 text-xl font-bold">Lỗi: Không tìm thấy Template {payload.templateId}</div>;
  }

  const { cvData, design } = payload;
  
  // Setup fallback design tokens if missing
  const designTokens = design || {
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
    hiddenSections: [],
    columnLayout: "2-col",
  };

  try {
    const autoHiddenSections = getEmptySections(cvData);
    const hiddenSections = Array.from(new Set([...(designTokens.hiddenSections || []), ...autoHiddenSections]));

    return (
      <div className="bg-white" style={{ margin: 0, padding: 0 }}>
        <CVDesignPreviewWrapper designTokens={designTokens}>
          <div id="cv-export-content" className="w-[210mm]">
            <TemplateComponent
              data={cvData}
              editable={false}
              sectionOrder={designTokens.sectionOrder || []}
              hiddenSections={hiddenSections}
              showSectionToolbar={false}
            />
          </div>
        </CVDesignPreviewWrapper>
      </div>
    );
  } catch (err: any) {
    return (
      <div className="p-10" style={{ color: "red", fontFamily: "monospace" }}>
        <h1 className="text-2xl font-bold">Lỗi Render Template</h1>
        <p>{err.message}</p>
        <pre className="mt-4 whitespace-pre-wrap">{err.stack}</pre>
      </div>
    );
  }
}
