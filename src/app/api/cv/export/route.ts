import { NextResponse } from "next/server";
import { pdfCache, CachedCVPayload } from "@/features/cv/api/pdf-cache";
import puppeteer from "puppeteer";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const payload: CachedCVPayload = await req.json();

    if (!payload.cvData || !payload.templateId) {
      return NextResponse.json(
        { message: "Missing required data (cvData or templateId)" },
        { status: 400 }
      );
    }

    // 1. Generate unique request ID and cache the data
    const requestId = crypto.randomUUID();
    pdfCache.set(requestId, payload);

    // 2. Determine base URL (localhost in development, domain in production)
    const origin = req.headers.get("origin");
    const host = req.headers.get("host");
    const protocol = host?.includes("localhost") ? "http" : "https";
    const baseUrl = origin || `${protocol}://${host}`;

    const renderUrl = `${baseUrl}/cv-render?id=${requestId}`;

    console.log(`[PDF EXPORT] Launching Puppeteer for ${renderUrl}`);

    // 3. Launch Puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    
    // Set viewport to approximate A4 dimensions
    await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });

    // Navigate and wait for network activity to finish (fonts and images)
    await page.goto(renderUrl, { waitUntil: "networkidle0", timeout: 30000 });

    // Ensure all custom fonts are ready
    await page.evaluateHandle("document.fonts.ready");

    console.log(`[PDF EXPORT] Generating PDF...`);

    // 4. Print to PDF
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: 0, bottom: 0, left: 0, right: 0 },
    });

    await browser.close();

    // 5. Cleanup memory
    pdfCache.delete(requestId);

    console.log(`[PDF EXPORT] Complete. Buffer size: ${pdfBuffer.length} bytes`);

    // 6. Return PDF Buffer as response
    return new NextResponse(Buffer.from(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="smart-hire-cv.pdf"',
      },
    });
  } catch (error) {
    console.error("[PDF EXPORT] Error generation PDF:", error);
    return NextResponse.json(
      { message: "Error generating PDF", error: (error as Error).message },
      { status: 500 }
    );
  }
}
