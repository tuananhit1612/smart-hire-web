"use client";

import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import {
    CVData,
    CVSection,
    DEFAULT_CV_DATA,
    Education,
    Experience,
    Skill,
    Project,
    Language,
    Certification,
    Award,
} from "@/features/cv/types/types";

/* ─────────────────────────────────────────────────────────────── */
/*  useCVStore — Zustand store, sole source of truth for CV data  */
/* ─────────────────────────────────────────────────────────────── */

// ── Section item type map ──────────────────────────────────────
type SectionItemMap = {
    experience: Experience;
    education: Education;
    skills: Skill;
    projects: Project;
    languages: Language;
    certifications: Certification;
    awards: Award;
};

type ArraySection = keyof SectionItemMap;

// ── Active edit path (form ↔ preview sync) ─────────────────────
export interface ActiveEditPath {
    section: CVSection;
    itemId?: string;
    field?: string;
}

// ── Autosave status ────────────────────────────────────────────
export type AutosaveStatus = "idle" | "saving" | "saved" | "error";

// ── Store shape ────────────────────────────────────────────────
export interface CVStoreState {
    /* ── Data ──────────────────────── */
    cvData: CVData;

    /* ── UI state ──────────────────── */
    activeEditPath: ActiveEditPath | null;
    autosaveStatus: AutosaveStatus;
    isDirty: boolean;

    /* ── Top-level setters ─────────── */
    setCvData: (data: CVData) => void;
    patchCvData: (partial: Partial<CVData>) => void;
    resetCvData: () => void;

    /* ── Personal info ─────────────── */
    updatePersonalInfo: (patch: Partial<CVData["personalInfo"]>) => void;

    /* ── Summary ───────────────────── */
    updateSummary: (summary: string) => void;

    /* ── ID-based section operations ── */
    updateSectionItem: <S extends ArraySection>(
        section: S,
        itemId: string,
        patch: Partial<SectionItemMap[S]>,
    ) => void;

    addSectionItem: <S extends ArraySection>(
        section: S,
        item: SectionItemMap[S],
    ) => void;

    removeSectionItem: <S extends ArraySection>(
        section: S,
        itemId: string,
    ) => void;

    reorderSection: <S extends ArraySection>(
        section: S,
        orderedIds: string[],
    ) => void;

    /* ── UI actions ────────────────── */
    setActiveEditPath: (path: ActiveEditPath | null) => void;
    setAutosaveStatus: (status: AutosaveStatus) => void;
}

// ── Store implementation ───────────────────────────────────────

export const useCVStore = create<CVStoreState>()(
    subscribeWithSelector((set, get) => ({
        /* ── Initial state ─────────────────────────────────── */
        cvData: DEFAULT_CV_DATA,
        activeEditPath: null,
        autosaveStatus: "idle" as AutosaveStatus,
        isDirty: false,

        /* ── Top-level setters ─────────────────────────────── */
        setCvData: (data) => set({ cvData: data, isDirty: true }),

        patchCvData: (partial) =>
            set((s) => ({ cvData: { ...s.cvData, ...partial }, isDirty: true })),

        resetCvData: () => set({ cvData: DEFAULT_CV_DATA, isDirty: false }),

        /* ── Personal info ─────────────────────────────────── */
        updatePersonalInfo: (patch) =>
            set((s) => ({
                cvData: {
                    ...s.cvData,
                    personalInfo: { ...s.cvData.personalInfo, ...patch },
                },
                isDirty: true,
            })),

        /* ── Summary ───────────────────────────────────────── */
        updateSummary: (summary) =>
            set((s) => ({
                cvData: { ...s.cvData, summary },
                isDirty: true,
            })),

        /* ── ID-based section item update ──────────────────── */
        updateSectionItem: (section, itemId, patch) =>
            set((s) => {
                const list = s.cvData[section] as { id: string }[];
                const idx = list.findIndex((item) => item.id === itemId);
                if (idx === -1) return s;

                const updated = [...list];
                updated[idx] = { ...updated[idx], ...patch };

                return {
                    cvData: { ...s.cvData, [section]: updated },
                    isDirty: true,
                };
            }),

        /* ── Add section item ──────────────────────────────── */
        addSectionItem: (section, item) =>
            set((s) => ({
                cvData: {
                    ...s.cvData,
                    [section]: [...(s.cvData[section] as unknown[]), item],
                },
                isDirty: true,
            })),

        /* ── Remove section item by ID ─────────────────────── */
        removeSectionItem: (section, itemId) =>
            set((s) => ({
                cvData: {
                    ...s.cvData,
                    [section]: (s.cvData[section] as { id: string }[]).filter(
                        (item) => item.id !== itemId,
                    ),
                },
                isDirty: true,
            })),

        /* ── Reorder section by ID list ─────────────────────── */
        reorderSection: (section, orderedIds) =>
            set((s) => {
                const list = s.cvData[section] as { id: string }[];
                const idMap = new Map(list.map((item) => [item.id, item]));
                const reordered = orderedIds
                    .map((id) => idMap.get(id))
                    .filter(Boolean);

                return {
                    cvData: { ...s.cvData, [section]: reordered },
                    isDirty: true,
                };
            }),

        /* ── UI actions ────────────────────────────────────── */
        setActiveEditPath: (path) => set({ activeEditPath: path }),
        setAutosaveStatus: (status) => set({ autosaveStatus: status }),
    })),
);

/* ─────────────────────────────────────────────────────────────── */
/*  Autosave subscriber — persists to localStorage on debounce    */
/* ─────────────────────────────────────────────────────────────── */

const AUTOSAVE_KEY = "cv_autosave_draft";
const AUTOSAVE_DEBOUNCE_MS = 1000;

let autosaveTimer: ReturnType<typeof setTimeout> | null = null;

/** Start the autosave subscription. Call once from a top-level component. */
export function initAutosaveSubscription() {
    return useCVStore.subscribe(
        (s) => s.cvData,
        (cvData, prevCvData) => {
            if (cvData === prevCvData) return;

            const { setAutosaveStatus } = useCVStore.getState();
            setAutosaveStatus("saving");

            if (autosaveTimer) clearTimeout(autosaveTimer);

            autosaveTimer = setTimeout(() => {
                try {
                    localStorage.setItem(
                        AUTOSAVE_KEY,
                        JSON.stringify({
                            data: cvData,
                            timestamp: Date.now(),
                        }),
                    );
                    setAutosaveStatus("saved");

                    // Reset to idle after 2s
                    setTimeout(() => setAutosaveStatus("idle"), 2000);
                } catch (e) {
                    console.error("Autosave failed:", e);
                    setAutosaveStatus("error");
                }
            }, AUTOSAVE_DEBOUNCE_MS);
        },
        { equalityFn: Object.is },
    );
}

/** Load saved draft from localStorage (if any). */
export function loadAutosaveDraft(): { data: CVData; timestamp: number } | null {
    if (typeof window === "undefined") return null;
    try {
        const stored = localStorage.getItem(AUTOSAVE_KEY);
        if (!stored) return null;
        return JSON.parse(stored);
    } catch {
        return null;
    }
}

/** Clear the autosave draft from localStorage. */
export function clearAutosaveDraft() {
    localStorage.removeItem(AUTOSAVE_KEY);
}
