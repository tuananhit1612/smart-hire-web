import type { CVData, CVSection } from '../types/types';

/**
 * Returns an array of CVSection ids whose data is empty.
 *
 * Templates already skip rendering these sections (returning `null`),
 * but the floating toolbar's "+" restore dropdown needs to know about
 * them so the button is enabled and users can see which sections exist
 * but have no data yet.
 *
 * The check mirrors the guards inside every template's `renderSection`.
 */
export function getEmptySections(data: CVData): CVSection[] {
    const empty: CVSection[] = [];

    if (!data.summary?.trim()) empty.push('summary');
    if (!data.education || data.education.length === 0) empty.push('education');
    if (!data.experience || data.experience.length === 0) empty.push('experience');
    if (!data.skills || data.skills.length === 0) empty.push('skills');
    if (!data.projects || data.projects.length === 0) empty.push('projects');
    if (!data.languages || data.languages.length === 0) empty.push('languages');
    if (!data.certifications || data.certifications.length === 0) empty.push('certifications');
    if (!data.awards || data.awards.length === 0) empty.push('awards');

    return empty;
}
