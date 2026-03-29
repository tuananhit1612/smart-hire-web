"use client";

import React, { useCallback, useRef, useEffect } from "react";
import { CVData } from "../types/types";
import { EditableText } from "../components/inline-edit/EditableText";
import { EditableAvatar } from "../components/inline-edit/EditableAvatar";

/* ─────────────────────────────────────────────────────────── */
/*  useEditableCV — provides helper functions that templates   */
/*  call to render either plain text or <EditableText>.        */
/*                                                             */
/*  STABILITY FIX: data & onDataChange are kept in refs so     */
/*  that patch() and all field helpers maintain stable callback */
/*  identities. This prevents React from remounting            */
/*  <EditableText> during typing (which would kill IME input). */
/* ─────────────────────────────────────────────────────────── */

interface UseEditableCVOptions {
    data: CVData;
    editable?: boolean;
    onDataChange?: (updated: CVData) => void;
}

/**
 * A helper that returns render functions used inside CV templates.
 *
 * When `editable` is false (or absent) the helpers return plain React nodes,
 * keeping the rendering zero-cost and PDF-export safe.
 *
 * When `editable` is true they wrap text in `<EditableText>` so users can
 * click-to-edit directly on the CV preview.
 */
export function useEditableCV({ data, editable, onDataChange }: UseEditableCVOptions) {

    // ── Stable refs to avoid re-creating callbacks on every render ──
    const dataRef = useRef(data);
    const onDataChangeRef = useRef(onDataChange);

    useEffect(() => {
        dataRef.current = data;
        onDataChangeRef.current = onDataChange;
    }, [data, onDataChange]);

    /* ── Deep patch helper (stable identity) ──────────────── */
    const patch = useCallback(
        (updater: (draft: CVData) => CVData) => {
            if (!onDataChangeRef.current) return;
            onDataChangeRef.current(updater({ ...dataRef.current }));
        },
        [], // Stable — reads from refs
    );

    /* ── Personal Info field ─────────────────────────────── */
    const personalField = useCallback(
        (
            field: keyof CVData["personalInfo"],
            className?: string,
            opts?: { multiline?: boolean; as?: React.ElementType; placeholder?: string },
        ): React.ReactNode => {
            const value = String(dataRef.current.personalInfo[field] ?? "");
            if (!editable) return value || null;
            return (
                <EditableText
                    value={value}
                    onChange={(v) =>
                        patch((d) => ({
                            ...d,
                            personalInfo: { ...d.personalInfo, [field]: v },
                        }))
                    }
                    className={className}
                    multiline={opts?.multiline}
                    as={opts?.as}
                    placeholder={opts?.placeholder ?? `Enter ${String(field)}…`}
                />
            );
        },
        [editable, patch],
    );

    /* ── Avatar field ─────────────────────────────────────── */
    const avatarField = useCallback(
        (
            className?: string,
            opts?: { size?: string },
        ): React.ReactNode => {
            const avatarUrl = dataRef.current.personalInfo.avatarUrl;
            return (
                <EditableAvatar
                    src={avatarUrl}
                    alt={dataRef.current.personalInfo.fullName || "Avatar"}
                    editable={!!editable}
                    onAvatarChange={(dataUrl) =>
                        patch((d) => ({
                            ...d,
                            personalInfo: {
                                ...d.personalInfo,
                                avatarUrl: dataUrl || undefined,
                            },
                        }))
                    }
                    className={className}
                    size={opts?.size}
                />
            );
        },
        [editable, patch],
    );

    /* ── Summary ─────────────────────────────────────────── */
    const summaryField = useCallback(
        (className?: string): React.ReactNode => {
            if (!editable) return dataRef.current.summary || null;
            return (
                <EditableText
                    value={dataRef.current.summary}
                    onChange={(v) => patch((d) => ({ ...d, summary: v }))}
                    multiline
                    className={className}
                    placeholder="Enter professional summary…"
                />
            );
        },
        [editable, patch],
    );

    /* ── Experience item field ────────────────────────────── */
    const expField = useCallback(
        (
            index: number,
            field: keyof CVData["experience"][number],
            className?: string,
            opts?: { multiline?: boolean; as?: React.ElementType },
        ): React.ReactNode => {
            const exp = dataRef.current.experience[index];
            if (!exp) return null;
            const value = String(exp[field] ?? "");
            if (!editable) return value || null;
            return (
                <EditableText
                    value={value}
                    onChange={(v) =>
                        patch((d) => {
                            const list = [...d.experience];
                            list[index] = { ...list[index], [field]: v };
                            return { ...d, experience: list };
                        })
                    }
                    className={className}
                    multiline={opts?.multiline}
                    as={opts?.as}
                    placeholder={`Enter ${String(field)}…`}
                />
            );
        },
        [editable, patch],
    );

    /* ── Education item field ─────────────────────────────── */
    const eduField = useCallback(
        (
            index: number,
            field: keyof CVData["education"][number],
            className?: string,
        ): React.ReactNode => {
            const edu = dataRef.current.education[index];
            if (!edu) return null;
            const value = String(edu[field] ?? "");
            if (!editable) return value || null;
            return (
                <EditableText
                    value={value}
                    onChange={(v) =>
                        patch((d) => {
                            const list = [...d.education];
                            list[index] = { ...list[index], [field]: v };
                            return { ...d, education: list };
                        })
                    }
                    className={className}
                    placeholder={`Enter ${String(field)}…`}
                />
            );
        },
        [editable, patch],
    );

    /* ── Project item field ───────────────────────────────── */
    const projectField = useCallback(
        (
            index: number,
            field: keyof CVData["projects"][number],
            className?: string,
            opts?: { multiline?: boolean },
        ): React.ReactNode => {
            const proj = dataRef.current.projects[index];
            if (!proj) return null;
            const value = String(proj[field] ?? "");
            if (!editable) return value || null;
            return (
                <EditableText
                    value={value}
                    onChange={(v) =>
                        patch((d) => {
                            const list = [...d.projects];
                            list[index] = { ...list[index], [field]: v };
                            return { ...d, projects: list };
                        })
                    }
                    className={className}
                    multiline={opts?.multiline}
                    placeholder={`Enter ${String(field)}…`}
                />
            );
        },
        [editable, patch],
    );

    /* ── Certification item field ─────────────────────────── */
    const certField = useCallback(
        (
            index: number,
            field: keyof CVData["certifications"][number],
            className?: string,
        ): React.ReactNode => {
            const cert = dataRef.current.certifications[index];
            if (!cert) return null;
            const value = String(cert[field] ?? "");
            if (!editable) return value || null;
            return (
                <EditableText
                    value={value}
                    onChange={(v) =>
                        patch((d) => {
                            const list = [...d.certifications];
                            list[index] = { ...list[index], [field]: v };
                            return { ...d, certifications: list };
                        })
                    }
                    className={className}
                    placeholder={`Enter ${String(field)}…`}
                />
            );
        },
        [editable, patch],
    );

    /* ── Certification item field (ID-based) ────────────────── */
    const certFieldById = useCallback(
        (
            certId: string,
            field: keyof CVData["certifications"][number],
            className?: string,
        ): React.ReactNode => {
            const idx = dataRef.current.certifications.findIndex((c) => c.id === certId);
            const cert = dataRef.current.certifications[idx];
            if (!cert) return null;
            const value = String(cert[field] ?? "");
            if (!editable) return value || null;
            return (
                <EditableText
                    value={value}
                    onChange={(v) =>
                        patch((d) => {
                            const list = [...d.certifications];
                            list[idx] = { ...list[idx], [field]: v };
                            return { ...d, certifications: list };
                        })
                    }
                    className={className}
                    placeholder={`Enter ${String(field)}…`}
                />
            );
        },
        [editable, patch],
    );

    /* ── Skill item field (ID-based for filter-safe lookups) ─ */
    const skillField = useCallback(
        (
            skillId: string,
            field: keyof CVData["skills"][number],
            className?: string,
        ): React.ReactNode => {
            const idx = dataRef.current.skills.findIndex((s) => s.id === skillId);
            const skill = dataRef.current.skills[idx];
            if (!skill) return null;
            const value = String(skill[field] ?? "");
            if (!editable) return value || null;
            return (
                <EditableText
                    value={value}
                    onChange={(v) =>
                        patch((d) => {
                            const list = [...d.skills];
                            list[idx] = { ...list[idx], [field]: v };
                            return { ...d, skills: list };
                        })
                    }
                    className={className}
                    placeholder={`Enter ${String(field)}…`}
                />
            );
        },
        [editable, patch],
    );

    /* ── Language item field (ID-based) ───────────────────── */
    const langField = useCallback(
        (
            langId: string,
            field: keyof CVData["languages"][number],
            className?: string,
        ): React.ReactNode => {
            const idx = dataRef.current.languages.findIndex((l) => l.id === langId);
            const lang = dataRef.current.languages[idx];
            if (!lang) return null;
            const value = String(lang[field] ?? "");
            if (!editable) return value || null;
            return (
                <EditableText
                    value={value}
                    onChange={(v) =>
                        patch((d) => {
                            const list = [...d.languages];
                            list[idx] = { ...list[idx], [field]: v };
                            return { ...d, languages: list };
                        })
                    }
                    className={className}
                    placeholder={`Enter ${String(field)}…`}
                />
            );
        },
        [editable, patch],
    );

    /* ── Award item field ─────────────────────────────────── */
    const awardField = useCallback(
        (
            index: number,
            field: keyof CVData["awards"][number],
            className?: string,
            opts?: { multiline?: boolean },
        ): React.ReactNode => {
            const award = dataRef.current.awards[index];
            if (!award) return null;
            const value = String(award[field] ?? "");
            if (!editable) return value || null;
            return (
                <EditableText
                    value={value}
                    onChange={(v) =>
                        patch((d) => {
                            const list = [...d.awards];
                            list[index] = { ...list[index], [field]: v };
                            return { ...d, awards: list };
                        })
                    }
                    className={className}
                    multiline={opts?.multiline}
                    placeholder={`Enter ${String(field)}…`}
                />
            );
        },
        [editable, patch],
    );

    /* ── Array Helpers (Add, Remove, Move) ────────────────── */
    // Helper to generate IDs
    const generateId = () => Math.random().toString(36).substr(2, 9);

    const arrayHelpers = {
        addExperience: useCallback(() => patch(d => ({
            ...d, experience: [...d.experience, {
                id: generateId(), position: "New Position", company: "Company Name",
                startDate: "2023-01", endDate: "", isCurrent: true, description: "Describe your responsibilities and achievements..."
            }]
        })), [patch]),
        removeExperience: useCallback((idx: number) => patch(d => {
            const list = [...d.experience]; list.splice(idx, 1);
            return { ...d, experience: list };
        }), [patch]),

        addEducation: useCallback(() => patch(d => ({
            ...d, education: [...d.education, {
                id: generateId(), school: "University Name", degree: "Bachelor's",
                field: "Computer Science", startDate: "2019", endDate: "2023"
            }]
        })), [patch]),
        removeEducation: useCallback((idx: number) => patch(d => {
            const list = [...d.education]; list.splice(idx, 1);
            return { ...d, education: list };
        }), [patch]),

        addSkill: useCallback(() => patch(d => ({
            ...d, skills: [...d.skills, {
                id: generateId(), name: "New Skill", level: "intermediate", category: "technical"
            }]
        })), [patch]),
        removeSkill: useCallback((idx: number) => patch(d => {
            const list = [...d.skills]; list.splice(idx, 1);
            return { ...d, skills: list };
        }), [patch]),
        removeSkillById: useCallback((id: string) => patch(d => ({
            ...d, skills: d.skills.filter(s => s.id !== id)
        })), [patch]),

        addProject: useCallback(() => patch(d => ({
            ...d, projects: [...d.projects, {
                id: generateId(), name: "Project Name", technologies: ["Tech 1", "Tech 2"],
                description: "Describe the project..."
            }]
        })), [patch]),
        removeProject: useCallback((idx: number) => patch(d => {
            const list = [...d.projects]; list.splice(idx, 1);
            return { ...d, projects: list };
        }), [patch]),

        addLanguage: useCallback(() => patch(d => ({
            ...d, languages: [...d.languages, {
                id: generateId(), name: "New Language", level: "intermediate"
            }]
        })), [patch]),
        removeLanguageById: useCallback((id: string) => patch(d => ({
            ...d, languages: d.languages.filter(l => l.id !== id)
        })), [patch]),

        addCertification: useCallback(() => patch(d => ({
            ...d, certifications: [...d.certifications, {
                id: generateId(), name: "Certification Name", issuer: "Issuing Organization", date: "2023"
            }]
        })), [patch]),
        removeCertification: useCallback((idx: number) => patch(d => {
            const list = [...d.certifications]; list.splice(idx, 1);
            return { ...d, certifications: list };
        }), [patch]),

        addAward: useCallback(() => patch(d => ({
            ...d, awards: [...d.awards, {
                id: generateId(), title: "Award Title", issuer: "Organization", date: "2023"
            }]
        })), [patch]),
        removeAward: useCallback((idx: number) => patch(d => {
            const list = [...d.awards]; list.splice(idx, 1);
            return { ...d, awards: list };
        }), [patch]),
    };

    return {
        isEditable: !!editable,
        personalField,
        avatarField,
        summaryField,
        expField,
        eduField,
        projectField,
        certField,
        certFieldById,
        skillField,
        langField,
        awardField,
        arrayHelpers,
    };
}
