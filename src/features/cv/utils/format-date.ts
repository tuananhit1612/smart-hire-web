/**
 * CV Date Formatting Utilities
 * Converts internal date strings (e.g. "2022-01", "2022") to display format ("01/2022", "2022")
 */

/**
 * Format a single date string for display.
 * - "2022-01" → "01/2022"
 * - "2022"    → "2022"
 * - falsy     → ""
 */
export function formatDate(date: string | undefined | null): string {
    if (!date) return '';
    const trimmed = date.trim();

    // Already formatted as "Nay" or similar Vietnamese text — pass through
    if (/[a-zA-ZÀ-ỹ]/.test(trimmed)) return trimmed;

    // "YYYY-MM" → "MM/YYYY"
    const match = trimmed.match(/^(\d{4})-(\d{1,2})$/);
    if (match) {
        const [, year, month] = match;
        return `${month.padStart(2, '0')}/${year}`;
    }

    // "YYYY" or anything else → return as-is
    return trimmed;
}

/**
 * Format a date range for experience / education entries.
 * @param startDate  e.g. "2022-01" or "2022"
 * @param endDate    e.g. "2024-06" or "2024"
 * @param isCurrent  if true, endDate is replaced with "Hiện tại"
 */
export function formatDateRange(
    startDate: string | undefined | null,
    endDate: string | undefined | null,
    isCurrent?: boolean,
): string {
    const start = formatDate(startDate);
    const end = isCurrent ? 'Hiện tại' : formatDate(endDate);

    if (!start && !end) return '';
    if (!start) return end;
    if (!end) return start;

    return `${start} - ${end}`;
}
