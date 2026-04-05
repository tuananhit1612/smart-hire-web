import { NextRequest, NextResponse } from "next/server";
import { pdfCache, CachedCVPayload } from "@/features/cv/api/pdf-cache";
import puppeteer, { HTTPRequest } from "puppeteer";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  let cid = "";
  try {
    const body: CachedCVPayload = await req.json();

    if (!body.cvData || !body.templateId) {
      return NextResponse.json({ error: "Missing cvData or templateId" }, { status: 400 });
    }

    // Cache the payload so the headless browser can fetch and render it
    cid = crypto.randomUUID();
    pdfCache.set(cid, body);

    console.log("PDF Request received. Launching Puppeteer...");

    // Launch Headless Browser
    const browser = await puppeteer.launch({
      headless: true,
      channel: "chrome", // Fallback to system Chrome
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
    });

    try {
      const page = await browser.newPage();

      // Optimize page loading
      await page.setRequestInterception(true);
      page.on('request', (request: HTTPRequest) => {
        if (['image', 'font'].includes(request.resourceType())) {
          request.continue();
        } else if (['stylesheet', 'script', 'document', 'fetch', 'xhr'].includes(request.resourceType())) {
             request.continue();
        } else {
             request.abort();
        }
      });

      const rootUrl = process.env.NEXT_PUBLIC_APP_URL || "http://127.0.0.1:3000";
      const targetUrl = `${rootUrl}/cv-pdf-render?id=${cid}`;
      
      console.log(`Puppeteer navigating to: ${targetUrl}`);
      
      // Navigate to the hidden Render page. Use networkidle2 because Next.js dev mode has an active WebSocket for HMR.
      await page.goto(targetUrl, { waitUntil: "networkidle2", timeout: 25000 });

      // Ensure the content wrapper is ready
      await page.waitForSelector("#rendering-cv-content", { timeout: 10000 });
      
      // Give 500ms for tailwind or animations to settle
      await new Promise(r => setTimeout(r, 500));

      const pdfBuffer = await page.pdf({
        format: "A4",
        printBackground: true,
        preferCSSPageSize: true, // Let @page size map natively
        margin: { top: "0", bottom: "0", left: "0", right: "0" },
      });

      await browser.close();

      console.log("PDF Buffer generated successfully.");

      return new Response(pdfBuffer as BodyInit, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `inline; filename="cv-export-${cid}.pdf"`,
        },
      });
    } catch (pageError) {
      await browser.close();
      throw pageError;
    }
  } catch (error: any) {
    console.error("Puppeteer PDF generation error:", error);
    return NextResponse.json({ error: error.message || "Failed to generate PDF" }, { status: 500 });
  } finally {
    // Always clean up the filesystem cache payload
    pdfCache.delete(cid);
  }
}
