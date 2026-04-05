"use client";

import * as React from "react";
import { CVDesignTokens, FONT_OPTIONS } from "@/features/cv/types/types";

/**
 * Wraps the CV template preview and injects design-token CSS custom properties.
 * Uses scoped CSS to override Tailwind accent colors across ALL 6 template
 * variants without modifying each template file individually.
 */
interface CVDesignPreviewWrapperProps {
    designTokens: CVDesignTokens;
    children: React.ReactNode;
}

export function CVDesignPreviewWrapper({
    designTokens,
    children,
}: CVDesignPreviewWrapperProps) {
    const fontMeta = FONT_OPTIONS.find((f) => f.id === designTokens.fontFamily);
    const fontFamily = fontMeta?.family ?? "'Inter', sans-serif";

    const spacingScale = {
        compact: 0.75,
        normal: 1,
        relaxed: 1.35,
    }[designTokens.spacing];

    const accent = designTokens.accentColor;

    // Derive tints from the hex accent color
    const accentBg = `${accent}18`; // ~10% opacity
    const accentBorder = `${accent}30`; // ~19% opacity
    const accentLight = `${accent}dd`; // slightly lighter

    const cssVars: React.CSSProperties & Record<string, string | number> = {
        "--cv-font-family": fontFamily,
        "--cv-font-scale": designTokens.fontSize,
        "--cv-accent": accent,
        "--cv-accent-bg": accentBg,
        "--cv-accent-border": accentBorder,
        "--cv-accent-light": accentLight,
        "--cv-spacing-scale": spacingScale,
        fontFamily,
        fontSize: `${designTokens.fontSize}rem`,
    };

    /**
     * Comprehensive scoped CSS that overrides accent colors for ALL templates.
     *
     * Accent class mapping:
     * ─ ModernTechTemplate:        rose-{50,100,200,500,600,700}
     * ─ MinimalCleanTemplate:      green-{500,600} (hover only)
     * ─ ExecutiveHRTemplate:       emerald-{50,100,200,300,600,700,800,900}
     * ─ CreativeBATemplate:        #fff3cd, #e9bc2e, #d4a017
     * ─ ModernSalesTemplate:       #0fa3b1
     * ─ ProfessionalSalesTemplate: #fcede8, #eddcd2, #8e5252
     */
    const scopedCSS = `
/* ═══════════ Font Family ═══════════ */
.cv-design-preview,
.cv-design-preview * {
    font-family: var(--cv-font-family) !important;
}

/* ═══════════ Font scale ═══════════ */
.cv-design-preview { font-size: calc(1rem * var(--cv-font-scale)) !important; }
.cv-design-preview .text-xs { font-size: calc(0.75rem * var(--cv-font-scale)) !important; line-height: calc(1rem * var(--cv-font-scale)) !important; }
.cv-design-preview .text-sm { font-size: calc(0.875rem * var(--cv-font-scale)) !important; line-height: calc(1.25rem * var(--cv-font-scale)) !important; }
.cv-design-preview .text-base { font-size: calc(1rem * var(--cv-font-scale)) !important; line-height: calc(1.5rem * var(--cv-font-scale)) !important; }
.cv-design-preview .text-lg { font-size: calc(1.125rem * var(--cv-font-scale)) !important; line-height: calc(1.75rem * var(--cv-font-scale)) !important; }
.cv-design-preview .text-xl { font-size: calc(1.25rem * var(--cv-font-scale)) !important; line-height: calc(1.75rem * var(--cv-font-scale)) !important; }
.cv-design-preview .text-2xl { font-size: calc(1.5rem * var(--cv-font-scale)) !important; line-height: calc(2rem * var(--cv-font-scale)) !important; }
.cv-design-preview .text-3xl { font-size: calc(1.875rem * var(--cv-font-scale)) !important; line-height: calc(2.25rem * var(--cv-font-scale)) !important; }
.cv-design-preview .text-4xl { font-size: calc(2.25rem * var(--cv-font-scale)) !important; line-height: calc(2.5rem * var(--cv-font-scale)) !important; }
.cv-design-preview .text-5xl { font-size: calc(3rem * var(--cv-font-scale)) !important; line-height: 1 !important; }

/* ═══════════ TEXT: accent color ═══════════ */
.cv-design-preview [class*="text-rose-"],
.cv-design-preview [class*="text-emerald-5"],
.cv-design-preview [class*="text-emerald-6"],
.cv-design-preview [class*="text-emerald-7"],
.cv-design-preview [class*="text-emerald-8"],
.cv-design-preview [class*="text-emerald-9"],
.cv-design-preview [class*="text-teal-"],
.cv-design-preview [class*="text-red-"],
.cv-design-preview [class*="text-indigo-"],
.cv-design-preview [class*="text-amber-"],
.cv-design-preview [class*="text-blue-"] {
    color: var(--cv-accent) !important;
}
/* Lighter accent text on dark bg (emerald-100/200/300) */
.cv-design-preview [class*="text-emerald-1"],
.cv-design-preview [class*="text-emerald-2"],
.cv-design-preview [class*="text-emerald-3"] {
    color: color-mix(in srgb, var(--cv-accent) 60%, white) !important;
}
/* Hex-based accent text */
.cv-design-preview [class*="text-\\[\\#d4a017\\]"],
.cv-design-preview [class*="text-\\[\\#8e5252\\]"] {
    color: var(--cv-accent) !important;
}

/* ═══════════ BG: solid accent ═══════════ */
.cv-design-preview [class*="bg-rose-5"],
.cv-design-preview [class*="bg-rose-6"],
.cv-design-preview [class*="bg-emerald-6"],
.cv-design-preview [class*="bg-emerald-9"],
.cv-design-preview [class*="bg-red-6"],
.cv-design-preview [class*="bg-indigo-6"],
.cv-design-preview [class*="bg-blue-6"],
.cv-design-preview [class*="bg-teal-400"],
.cv-design-preview [class*="bg-\\[\\#0fa3b1\\]"] {
    background-color: var(--cv-accent) !important;
}
/* Darker shade for secondary bg */
.cv-design-preview [class*="bg-emerald-8"] {
    background-color: var(--cv-accent-light) !important;
}

/* ═══════════ BG: light tint (badges, cards) ═══════════ */
.cv-design-preview [class*="bg-rose-50"],
.cv-design-preview [class*="bg-rose-100"],
.cv-design-preview [class*="bg-emerald-50"],
.cv-design-preview [class*="bg-indigo-50"],
.cv-design-preview [class*="bg-amber-50"],
.cv-design-preview [class*="bg-blue-50"],
.cv-design-preview [class*="bg-\\[\\#fff3cd\\]"],
.cv-design-preview [class*="bg-\\[\\#fcede8\\]"] {
    background-color: var(--cv-accent-bg) !important;
}

/* ═══════════ BORDER: accent ═══════════ */
.cv-design-preview [class*="border-rose-1"],
.cv-design-preview [class*="border-rose-2"],
.cv-design-preview [class*="border-emerald-1"],
.cv-design-preview [class*="border-emerald-7"],
.cv-design-preview [class*="border-teal-"],
.cv-design-preview [class*="border-red-"],
.cv-design-preview [class*="border-indigo-"],
.cv-design-preview [class*="border-amber-"],
.cv-design-preview [class*="border-blue-"],
.cv-design-preview [class*="border-\\[\\#e9bc2e\\]"],
.cv-design-preview [class*="border-\\[\\#8e5252\\]"],
.cv-design-preview [class*="border-\\[\\#eddcd2\\]"] {
    border-color: var(--cv-accent-border) !important;
}

/* ═══════════ RING ═══════════ */
.cv-design-preview [class*="ring-rose-"],
.cv-design-preview [class*="ring-red-"],
.cv-design-preview [class*="ring-indigo-"],
.cv-design-preview [class*="ring-blue-"] {
    --tw-ring-color: var(--cv-accent-border) !important;
}

/* ═══════════ HOVER states ═══════════ */
.cv-design-preview [class*="hover\\:text-rose-"]:hover,
.cv-design-preview [class*="group-hover\\:text-rose-"],
.cv-design-preview [class*="group-hover\\:text-green-"],
.cv-design-preview [class*="group-hover\\:text-teal-"],
.cv-design-preview [class*="group-hover\\:text-red-"],
.cv-design-preview [class*="group-hover\\:text-indigo-"],
.cv-design-preview [class*="group-hover\\:text-amber-"],
.cv-design-preview [class*="group-hover\\:text-blue-"],
.cv-design-preview .group:hover [class*="group-hover\\:text-rose-"],
.cv-design-preview .group:hover [class*="group-hover\\:text-green-"] {
    color: var(--cv-accent) !important;
}
.cv-design-preview .group:hover [class*="group-hover\\:bg-rose-"],
.cv-design-preview .group:hover [class*="group-hover\\:bg-red-"],
.cv-design-preview .group:hover [class*="group-hover\\:bg-indigo-"] {
    background-color: var(--cv-accent) !important;
}
.cv-design-preview .group:hover [class*="group-hover\\:ring-rose-"] {
    --tw-ring-color: var(--cv-accent-border) !important;
}

/* ═══════════ GRADIENT bars ═══════════ */
.cv-design-preview [class*="from-rose-"] {
    --tw-gradient-from: var(--cv-accent) !important;
}
.cv-design-preview [class*="to-rose-"] {
    --tw-gradient-to: var(--cv-accent) !important;
}

/* ═══════════ Skill progress bars ═══════════ */
.cv-design-preview [class*="bg-emerald-600"][style*="width"],
.cv-design-preview [class*="bg-red-6"][style*="width"],
.cv-design-preview [class*="bg-blue-6"][style*="width"],
.cv-design-preview [class*="bg-indigo-6"][style*="width"] {
    background-color: var(--cv-accent) !important;
}

/* ═══════════ Spacing scale ═══════════ */
.cv-design-preview .space-y-10 > * + * {
    margin-top: calc(2.5rem * var(--cv-spacing-scale)) !important;
}
.cv-design-preview .space-y-8 > * + * {
    margin-top: calc(2rem * var(--cv-spacing-scale)) !important;
}
.cv-design-preview .space-y-6 > * + * {
    margin-top: calc(1.5rem * var(--cv-spacing-scale)) !important;
}
.cv-design-preview .space-y-4 > * + * {
    margin-top: calc(1rem * var(--cv-spacing-scale)) !important;
}
.cv-design-preview .space-y-3 > * + * {
    margin-top: calc(0.75rem * var(--cv-spacing-scale)) !important;
}
.cv-design-preview .space-y-2 > * + * {
    margin-top: calc(0.5rem * var(--cv-spacing-scale)) !important;
}
`;

    return (
        <div className="cv-design-preview" style={cssVars}>
            <style dangerouslySetInnerHTML={{ __html: scopedCSS }} />
            {children}
        </div>
    );
}
