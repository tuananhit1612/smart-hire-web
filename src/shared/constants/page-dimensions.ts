/**
 * A4 page dimensions — single source of truth for preview, export, and print CSS.
 *
 * widthPx / heightPx  → used by CVPreviewPanel (fixed inner render size)
 * widthMm / heightMm  → used by export-to-pdf (html2canvas / jspdf)
 * exportPixelRatio     → device pixel ratio for high-DPI PDF capture
 */
export const A4 = {
    /** A4 width in millimeters */
    widthMm: 210,
    /** A4 height in millimeters */
    heightMm: 297,
    /** A4 width in pixels at 96 DPI (210mm × 96 / 25.4) */
    widthPx: 794,
    /** A4 height in pixels at 96 DPI (297mm × 96 / 25.4) */
    heightPx: 1123,
    /** Pixel ratio for high-quality PDF export */
    exportPixelRatio: 3,
} as const;
