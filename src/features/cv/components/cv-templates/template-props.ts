import { CVData, CVSection } from '../../types/types';
import type { SectionAction } from '../CVSectionToolbar';

/**
 * Shared props for all CV template components.
 *
 * - `data` is always required.
 * - `editable` + `onDataChange` are optional; when provided the template
 *   renders inline-editable text fields.
 * - `sectionOrder` + `hiddenSections` are optional; when provided the
 *   template renders sections in the given order and hides specified ones.
 * - `showSectionToolbar` + `onSectionAction` are optional; when provided
 *   the template renders a floating toolbar on section hover.
 */
export interface TemplateProps {
    /** CV data to render */
    data: CVData;
    /** When true, text fields become contentEditable */
    editable?: boolean;
    /** Called whenever data changes via inline editing */
    onDataChange?: (updated: CVData) => void;
    /** Custom section ordering (from design tokens) */
    sectionOrder?: CVSection[];
    /** Sections to hide (from design tokens) */
    hiddenSections?: CVSection[];
    /** When true, show floating toolbar on section hover */
    showSectionToolbar?: boolean;
    /**
     * Called when user clicks a toolbar action (move up/down/hide).
     * `columnSections` contains the ordered sections in the same column
     * so that move-up/down only swaps within one column.
     */
    onSectionAction?: (action: SectionAction, section: CVSection, columnSections?: CVSection[]) => void;
    /** Called when user picks a hidden section to restore via "+" button */
    onRestoreSection?: (section: CVSection) => void;
}
