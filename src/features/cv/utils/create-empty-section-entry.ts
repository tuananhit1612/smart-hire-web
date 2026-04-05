import { CVData, CVSection, Education, Experience, Skill, Language, Certification, Award, Project } from '../types/types';

/**
 * Generates a unique ID for new entries.
 */
function uid(): string {
    return `new_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * Creates one empty placeholder entry for the given section
 * and returns a NEW `CVData` with that entry injected.
 *
 * For 'summary' it sets a single space (so `.trim()` checks still see it as
 * "present" inside the template) and for array-based sections it pushes
 * one blank record.
 *
 * Sections that already contain data are returned unchanged.
 */
export function addEmptySectionEntry(data: CVData, section: CVSection): CVData {
    switch (section) {
        case 'summary':
            if (data.summary && data.summary.trim().length > 0) return data;
            return { ...data, summary: ' ' };

        case 'education':
            if (data.education.length > 0) return data;
            return {
                ...data,
                education: [{
                    id: uid(),
                    school: '',
                    degree: '',
                    field: '',
                    startDate: '',
                    endDate: '',
                } satisfies Education],
            };

        case 'experience':
            if (data.experience.length > 0) return data;
            return {
                ...data,
                experience: [{
                    id: uid(),
                    company: '',
                    position: '',
                    location: '',
                    startDate: '',
                    endDate: '',
                    isCurrent: false,
                    description: '',
                } satisfies Experience],
            };

        case 'skills':
            if (data.skills.length > 0) return data;
            return {
                ...data,
                skills: [{
                    id: uid(),
                    name: '',
                    level: 'beginner',
                    category: 'technical',
                } satisfies Skill],
            };

        case 'languages':
            if (data.languages.length > 0) return data;
            return {
                ...data,
                languages: [{
                    id: uid(),
                    name: '',
                    level: 'beginner',
                } satisfies Language],
            };

        case 'certifications':
            if (data.certifications.length > 0) return data;
            return {
                ...data,
                certifications: [{
                    id: uid(),
                    name: '',
                    issuer: '',
                    date: '',
                } satisfies Certification],
            };

        case 'awards':
            if (data.awards.length > 0) return data;
            return {
                ...data,
                awards: [{
                    id: uid(),
                    title: '',
                    issuer: '',
                    date: '',
                } satisfies Award],
            };

        case 'projects':
            if (data.projects.length > 0) return data;
            return {
                ...data,
                projects: [{
                    id: uid(),
                    name: '',
                    description: '',
                    technologies: [],
                } satisfies Project],
            };

        default:
            return data;
    }
}
