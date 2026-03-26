/**
 * ═══════════════════════════════════════════════════════════
 *  Export Utilities — CSV and PDF generation helpers
 *
 *  These are browser-only helpers for exporting data that
 *  the user sees on the reporting dashboard. They work
 *  independently of backend export endpoints as a fallback.
 * ═══════════════════════════════════════════════════════════
 */

// ─── CSV Export ──────────────────────────────────────────

interface CSVRow {
    [key: string]: string | number | boolean | null | undefined;
}

/**
 * Convert an array of objects to a CSV string with BOM
 * for correct UTF-8 display in Excel.
 */
export function toCSV(rows: CSVRow[], columns?: string[]): string {
    if (rows.length === 0) return "";

    const keys = columns ?? Object.keys(rows[0]);
    const escape = (val: unknown) => {
        const str = String(val ?? "");
        return str.includes(",") || str.includes('"') || str.includes("\n")
            ? `"${str.replace(/"/g, '""')}"`
            : str;
    };

    const header = keys.map(escape).join(",");
    const body = rows
        .map((row) => keys.map((k) => escape(row[k])).join(","))
        .join("\n");

    // UTF-8 BOM so Excel opens Vietnamese chars correctly
    return `\uFEFF${header}\n${body}`;
}

/**
 * Trigger a file download in the browser from raw content.
 */
export function downloadFile(
    content: string | Blob,
    fileName: string,
    mimeType = "text/csv;charset=utf-8"
): void {
    const blob =
        content instanceof Blob
            ? content
            : new Blob([content], { type: mimeType });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();

    // Cleanup
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
}

/**
 * Export rows as a CSV file download.
 */
export function exportToCSV(
    rows: CSVRow[],
    fileName: string,
    columns?: string[]
): void {
    const csv = toCSV(rows, columns);
    downloadFile(csv, fileName, "text/csv;charset=utf-8");
}

// ─── Date Helpers ────────────────────────────────────────

/** Format ISO date string to dd/MM/yyyy */
export function formatDate(iso: string | null | undefined): string {
    if (!iso) return "—";
    const d = new Date(iso);
    return d.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
}

/** Get Vietnamese label for application stage */
export function getStageLabel(stage: string): string {
    const labels: Record<string, string> = {
        APPLIED: "Đã nộp",
        SCREENING: "Đang xét duyệt",
        INTERVIEW: "Phỏng vấn",
        OFFER: "Đề nghị",
        HIRED: "Đã nhận",
        REJECTED: "Từ chối",
        WITHDRAWN: "Đã rút",
    };
    return labels[stage] ?? stage;
}
