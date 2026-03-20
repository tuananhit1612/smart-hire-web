import { CVData, CVSection } from '../../types/types';
import { ModernTechTemplate } from './ModernTechTemplate';
import { MinimalCleanTemplate } from './MinimalCleanTemplate';
import { ProfessionalSalesTemplate } from './ProfessionalSalesTemplate';
import { ExecutiveHRTemplate } from './ExecutiveHRTemplate';
import { ModernSalesTemplate } from './ModernSalesTemplate';
import { CreativeBATemplate } from './CreativeBATemplate';

// ---------------------------------------------------------------------------
// TemplateManifest — runtime metadata that travels with each template
// ---------------------------------------------------------------------------
export interface TemplateManifest {
    /** Unique slug matching TEMPLATES[].id in template-types.ts */
    id: string;
    /** Human-readable name */
    name: string;
    /** Which CV sections the template can render */
    supportedSections: CVSection[];
    /** Page size used for PDF export */
    pageSize: { widthMm: number; heightMm: number };
    /** Safe-area margins in mm (used by PDF renderer) */
    margins: { top: number; right: number; bottom: number; left: number };
    /** Template version — bump when layout changes */
    version: number;
}

// Default page dimensions (A4)
const A4 = { widthMm: 210, heightMm: 297 } as const;
const DEFAULT_MARGINS = { top: 0, right: 0, bottom: 0, left: 0 } as const;

// Full section list — most templates support all sections
const ALL_SECTIONS: CVSection[] = [
    'personal', 'summary', 'experience', 'education',
    'skills', 'projects', 'languages', 'certifications', 'awards',
];

// ---------------------------------------------------------------------------
// Registry: template component + manifest
// ---------------------------------------------------------------------------
export interface TemplateEntry {
    component: React.ComponentType<{ data: CVData }>;
    manifest: TemplateManifest;
}

export const TEMPLATE_REGISTRY: Record<string, TemplateEntry> = {
    'modern-tech': {
        component: ModernTechTemplate,
        manifest: {
            id: 'modern-tech',
            name: 'Modern Tech Lead',
            supportedSections: ALL_SECTIONS,
            pageSize: A4,
            margins: DEFAULT_MARGINS,
            version: 2,
        },
    },
    'minimal-clean': {
        component: MinimalCleanTemplate,
        manifest: {
            id: 'minimal-clean',
            name: 'Minimal Professional',
            supportedSections: ALL_SECTIONS,
            pageSize: A4,
            margins: DEFAULT_MARGINS,
            version: 2,
        },
    },
    'professional-sales': {
        component: ProfessionalSalesTemplate,
        manifest: {
            id: 'professional-sales',
            name: 'Professional Sales',
            supportedSections: ALL_SECTIONS,
            pageSize: A4,
            margins: DEFAULT_MARGINS,
            version: 2,
        },
    },
    'executive-hr': {
        component: ExecutiveHRTemplate,
        manifest: {
            id: 'executive-hr',
            name: 'Executive HR Classic',
            supportedSections: ALL_SECTIONS,
            pageSize: A4,
            margins: DEFAULT_MARGINS,
            version: 2,
        },
    },
    'modern-sales': {
        component: ModernSalesTemplate,
        manifest: {
            id: 'modern-sales',
            name: 'Modern Sales',
            supportedSections: ALL_SECTIONS,
            pageSize: A4,
            margins: DEFAULT_MARGINS,
            version: 2,
        },
    },
    'creative-ba': {
        component: CreativeBATemplate,
        manifest: {
            id: 'creative-ba',
            name: 'Creative BA',
            supportedSections: ALL_SECTIONS,
            pageSize: A4,
            margins: DEFAULT_MARGINS,
            version: 2,
        },
    },
    // Fallbacks for template IDs that don't have dedicated components yet
    'executive-classic': {
        component: MinimalCleanTemplate,
        manifest: {
            id: 'executive-classic',
            name: 'Executive Classic',
            supportedSections: ALL_SECTIONS,
            pageSize: A4,
            margins: DEFAULT_MARGINS,
            version: 1,
        },
    },
    'creative-portfolio': {
        component: ModernTechTemplate,
        manifest: {
            id: 'creative-portfolio',
            name: 'Creative Portfolio',
            supportedSections: ALL_SECTIONS,
            pageSize: A4,
            margins: DEFAULT_MARGINS,
            version: 1,
        },
    },
};

// ---------------------------------------------------------------------------
// Backward-compatible helpers used by useCVData and page.tsx
// ---------------------------------------------------------------------------

/** Flat component map — drop-in replacement for the old TEMPLATE_COMPONENTS */
export const TEMPLATE_COMPONENTS: Record<string, React.ComponentType<{ data: CVData }>> =
    Object.fromEntries(
        Object.entries(TEMPLATE_REGISTRY).map(([id, entry]) => [id, entry.component]),
    );

/** Default fallback template */
export const DefaultTemplate = ModernTechTemplate;

/** Retrieve manifest for a template id (returns undefined for unknown ids) */
export function getTemplateManifest(templateId: string): TemplateManifest | undefined {
    return TEMPLATE_REGISTRY[templateId]?.manifest;
}
