import { NextResponse } from "next/server";
import { pdfCache } from "@/features/cv/api/pdf-cache";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> } // In Next.js App Router API, params are now Promise
) {
  try {
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json({ message: "Bad Request: No ID provided" }, { status: 400 });
    }

    const payload = pdfCache.get(id);

    if (!payload) {
      return NextResponse.json(
        { message: "Not Found: No data found for this ID or it has expired" },
        { status: 404 }
      );
    }

    // Only return the payload, don't delete to allow rendering to complete
    return NextResponse.json({
      data: payload.cvData,
      templateId: payload.templateId,
      design: payload.design, 
    });
  } catch (error) {
    console.error("[CACHE API error]:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
