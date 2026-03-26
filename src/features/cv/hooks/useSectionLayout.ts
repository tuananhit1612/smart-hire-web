import { useMemo } from 'react';
import { CVSection, DEFAULT_SECTION_ORDER } from '@/features/cv/types/types';

export type { CVSection };

/**
 * Resolves the ordered list of visible sections.
 *
 * Templates call this hook with the optional `sectionOrder` and
 * `hiddenSections` props from design tokens. It returns:
 * - `visibleSections` — sections in the correct order, with hidden ones removed
 * - `isVisible(id)` — quick predicate for individual checks
 * - `sectionIndex(id)` — index of the section among visible sections (-1 if hidden)
 * - `totalVisible` — total count of visible sections
 */
export function useSectionLayout(
    sectionOrder?: CVSection[],
    hiddenSections?: CVSection[],
) {
    const hidden = hiddenSections ?? [];
    const order = sectionOrder ?? DEFAULT_SECTION_ORDER;

    const visibleSections = useMemo(
        () => order.filter((s) => !hidden.includes(s)),
        [order, hidden],
    );

    const isVisible = useMemo(() => {
        const set = new Set(hidden);
        return (section: CVSection) => !set.has(section);
    }, [hidden]);

    const sectionIndex = useMemo(() => {
        const map = new Map(visibleSections.map((s, i) => [s, i]));
        return (section: CVSection) => map.get(section) ?? -1;
    }, [visibleSections]);

    const totalVisible = visibleSections.length;

    return { visibleSections, isVisible, sectionIndex, totalVisible } as const;
}

