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

/* ═══════════ TEXT: accent color ═══════════ */
.cv-design-preview [class*="text-rose-"],
.cv-design-preview [class*="text-emerald-6"],
.cv-design-preview [class*="text-emerald-7"],
.cv-design-preview [class*="text-emerald-9"] {
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
.cv-design-preview [class*="bg-\\[\\#fff3cd\\]"],
.cv-design-preview [class*="bg-\\[\\#fcede8\\]"] {
    background-color: var(--cv-accent-bg) !important;
}

/* ═══════════ BORDER: accent ═══════════ */
.cv-design-preview [class*="border-rose-1"],
.cv-design-preview [class*="border-rose-2"],
.cv-design-preview [class*="border-emerald-1"],
.cv-design-preview [class*="border-emerald-7"],
.cv-design-preview [class*="border-\\[\\#e9bc2e\\]"],
.cv-design-preview [class*="border-\\[\\#8e5252\\]"],
.cv-design-preview [class*="border-\\[\\#eddcd2\\]"] {
    border-color: var(--cv-accent-border) !important;
}

/* ═══════════ RING ═══════════ */
.cv-design-preview [class*="ring-rose-"] {
    --tw-ring-color: var(--cv-accent-border) !important;
}

/* ═══════════ HOVER states ═══════════ */
.cv-design-preview [class*="hover\\:text-rose-"]:hover,
.cv-design-preview [class*="group-hover\\:text-rose-"],
.cv-design-preview [class*="group-hover\\:text-green-"],
.cv-design-preview .group:hover [class*="group-hover\\:text-rose-"],
.cv-design-preview .group:hover [class*="group-hover\\:text-green-"] {
    color: var(--cv-accent) !important;
}
.cv-design-preview .group:hover [class*="group-hover\\:bg-rose-"] {
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
.cv-design-preview [class*="bg-emerald-600"][style*="width"] {
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
`;

    return (
        <div className="cv-design-preview" style={cssVars}>
            <style dangerouslySetInnerHTML={{ __html: scopedCSS }} />
            {children}
        </div>
    );
}
