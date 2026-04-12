import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
    const id = req.nextUrl.searchParams.get("id");
    
    // Redirect old backend legacy URLs to the new client-side PDF renderer
    if (id) {
        return NextResponse.redirect(new URL(`/cv-preview?id=${id}`, req.url));
    }
    
    return NextResponse.redirect(new URL("/cv-builder", req.url));
}
