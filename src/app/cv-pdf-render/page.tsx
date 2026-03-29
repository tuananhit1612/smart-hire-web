import { pdfCache } from "@/features/cv/api/pdf-cache";
import { TEMPLATE_COMPONENTS } from "@/features/cv/components/cv-templates";
import { CVDesignPreviewWrapper } from "@/features/cv/components/CVDesignPreviewWrapper";
import { DEFAULT_SECTION_ORDER } from "@/features/cv/types/types";

export default async function CVPdfRenderServerPage({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
}) {
  const { id } = await searchParams;

  if (!id) {
    return <div className="p-10 text-center text-red-500">Missing ID</div>;
  }

  // Fetch from the server-side memory block
  const payload = pdfCache.get(id);

  if (!payload || !payload.cvData) {
    return <div className="p-10 text-center text-red-500">Expired or invalid payload for Puppeteer</div>;
  }

  const TemplateComponent = TEMPLATE_COMPONENTS[payload.templateId] || TEMPLATE_COMPONENTS["modern-tech"];

  // Inject a stylesheet specifically optimized for A4 Puppeteer printing
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
      <CVDesignPreviewWrapper designTokens={payload.design || {}}>
          <div id="rendering-cv-content" className="w-[210mm] min-h-[297mm] bg-white text-black p-0 m-0 shadow-none">
              <TemplateComponent
                  data={payload.cvData}
                  editable={false}
                  onDataChange={() => {}}
                  sectionOrder={payload.design?.sectionOrder || DEFAULT_SECTION_ORDER}
                  hiddenSections={payload.design?.hiddenSections || []}
                  showSectionToolbar={false}
              />
          </div>
      </CVDesignPreviewWrapper>
    </div>
  );
}
