/**
 * ═══════════════════════════════════════════════════════════
 *  Shared Number Formatting Utilities
 *  Locale-safe formatters to prevent SSR hydration mismatches.
 *  Use these instead of inline Intl.NumberFormat calls.
 * ═══════════════════════════════════════════════════════════
 */

/** Format a number with comma separators (e.g. 1,234,567) */
export const fmtNumber = (n: number) => new Intl.NumberFormat("en-US").format(n);

/** Format a number as percentage (e.g. 85.5%) */
export const fmtPercent = (n: number, decimals = 1) =>
    `${n.toFixed(decimals)}%`;

/** Format a number in compact notation (e.g. 1.2K, 3.4M) */
export const fmtCompact = (n: number) =>
    new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(n);
