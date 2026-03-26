"use client";

import * as React from "react";

const A4_HEIGHT_MM = 297;

/**
 * Renders dashed page-break lines at every A4 boundary (297mm intervals)
 * over the CV preview canvas.
 *
 * Uses a ResizeObserver to dynamically track the content height and
 * compute how many page breaks to draw.
 *
 * The overlay is fully transparent to pointer events so it doesn't
 * interfere with editing or toolbar interactions.
 */
export function CVPageBreakOverlay({
    targetId = "cv-preview-content",
}: {
    /** DOM id of the element to observe */
    targetId?: string;
}) {
    const [pageCount, setPageCount] = React.useState(1);

    React.useEffect(() => {
        const target = document.getElementById(targetId);
        if (!target) return;

        const compute = () => {
            const heightPx = target.scrollHeight;
            // Convert 297mm to px (1mm ≈ 3.7795px at 96 DPI)
            const a4Px = A4_HEIGHT_MM * 3.7795;
            setPageCount(Math.max(1, Math.ceil(heightPx / a4Px)));
        };

        compute();

        const ro = new ResizeObserver(compute);
        ro.observe(target);
        return () => ro.disconnect();
    }, [targetId]);

    // No breaks needed if content fits in 1 page
    if (pageCount <= 1) return null;

    // We draw (pageCount - 1) break lines
    const breaks = Array.from({ length: pageCount - 1 }, (_, i) => i + 1);

    return (
        <div
            className="absolute inset-0 pointer-events-none z-20"
            aria-hidden
        >
            {breaks.map((n) => (
                <div
                    key={n}
                    className="absolute left-0 right-0 flex items-center"
                    style={{ top: `${n * A4_HEIGHT_MM}mm` }}
                >
                    {/* Dashed line */}
                    <div className="flex-1 border-t-2 border-dashed border-red-400/60" />

                    {/* Page label */}
                    <span className="mx-3 shrink-0 text-[10px] font-semibold tracking-wider uppercase text-red-400/80 bg-white dark:bg-[#1C252E] px-2 py-0.5 rounded-full shadow-sm border border-red-200/40 dark:border-red-800/30">
                        Trang {n + 1}
                    </span>

                    {/* Dashed line (right side) */}
                    <div className="flex-1 border-t-2 border-dashed border-red-400/60" />
                </div>
            ))}
        </div>
    );
}
