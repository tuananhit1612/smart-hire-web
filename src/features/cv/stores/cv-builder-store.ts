"use client";

import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import {
    CVData,
    CVSection,
    CVDesignTokens,
    DEFAULT_CV_DATA,
    DEFAULT_DESIGN_TOKENS,
    DEFAULT_SECTION_ORDER,
    Education,
    Experience,
    Skill,
    Project,
    Language,
    Certification,
    Award,
} from "@/features/cv/types/types";
import { SAMPLE_CV_DATA } from "@/features/cv/data/mock-data";

/* ─────────────────────────────────────────────────────────── */
/*  Types                                                      */
/* ─────────────────────────────────────────────────────────── */

export type BuilderView = "gallery" | "editor";
export type SidebarTab = "design" | "sections" | "layout" | "templates" | "ai" | "library";
export type AutosaveStatus = "idle" | "saving" | "saved" | "error";

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

/* ─────────────────────────────────────────────────────────── */
/*  Store shape                                                */
/* ─────────────────────────────────────────────────────────── */

export interface CVBuilderState {
    /* ── View ── */
    currentView: BuilderView;
    selectedTemplateId: string | null;
    activeSidebarTab: SidebarTab;
    showSidebar: boolean;

    /* ── CV Data ── */
    cvData: CVData;
    cvName: string;

    /* ── Design Tokens ── */
    designTokens: CVDesignTokens;

    /* ── UI State ── */
    isEditing: boolean;
    zoomLevel: number;
    autosaveStatus: AutosaveStatus;
    isDirty: boolean;
    isDataSourceModalOpen: boolean;

    /* ── View actions ── */
    setView: (view: BuilderView) => void;
    selectTemplate: (id: string) => void;
    setSidebarTab: (tab: SidebarTab) => void;
    toggleSidebar: () => void;
    setShowSidebar: (show: boolean) => void;

    /* ── CV Data actions ── */
    setCvData: (data: CVData) => void;
    patchCvData: (partial: Partial<CVData>) => void;
    resetCvData: () => void;
    setCvName: (name: string) => void;
    updatePersonalInfo: (patch: Partial<CVData["personalInfo"]>) => void;
    updateSummary: (summary: string) => void;

    /* ── Section item CRUD ── */
    updateSectionItem: <S extends ArraySection>(
        section: S, itemId: string, patch: Partial<SectionItemMap[S]>,
    ) => void;
    addSectionItem: <S extends ArraySection>(
        section: S, item: SectionItemMap[S],
    ) => void;
    removeSectionItem: <S extends ArraySection>(
        section: S, itemId: string,
    ) => void;
    reorderSection: <S extends ArraySection>(
        section: S, orderedIds: string[],
    ) => void;

    /* ── Design Token actions ── */
    setDesignTokens: (tokens: CVDesignTokens) => void;
    updateToken: <K extends keyof CVDesignTokens>(key: K, value: CVDesignTokens[K]) => void;
    toggleSectionVisibility: (section: CVSection) => void;
    reorderSectionOrder: (newOrder: CVSection[]) => void;
    resetDesignTokens: () => void;

    /* ── UI actions ── */
    setIsEditing: (editing: boolean) => void;
    setZoomLevel: (zoom: number) => void;
    setAutosaveStatus: (status: AutosaveStatus) => void;
    setDataSourceModalOpen: (open: boolean) => void;

    /* ── Persistence ── */
    loadFromStorage: () => void;
    saveToStorage: () => void;
}

/* ─────────────────────────────────────────────────────────── */
/*  localStorage keys                                          */
/* ─────────────────────────────────────────────────────────── */

const STORAGE_KEY = "cv_builder_state";
const AUTOSAVE_DEBOUNCE_MS = 1_000;

/* ─────────────────────────────────────────────────────────── */
/*  Store implementation                                       */
/* ─────────────────────────────────────────────────────────── */

export const useCVBuilderStore = create<CVBuilderState>()(
    subscribeWithSelector((set, get) => ({
        /* ── Initial state ── */
        currentView: "gallery",
        selectedTemplateId: null,
        activeSidebarTab: "design",
        showSidebar: true,

        cvData: SAMPLE_CV_DATA,
        cvName: "CV của bạn",

        designTokens: DEFAULT_DESIGN_TOKENS,

        isEditing: true,
        zoomLevel: 100,
        autosaveStatus: "idle" as AutosaveStatus,
        isDirty: false,
        isDataSourceModalOpen: false,

        /* ── View actions ── */
        setView: (view) => set({ currentView: view }),

        selectTemplate: (id) => set({
            selectedTemplateId: id,
            currentView: "editor",
            isDataSourceModalOpen: true,
        }),

        setSidebarTab: (tab) => set({
            activeSidebarTab: tab,
            showSidebar: true,
        }),

        toggleSidebar: () => set((s) => ({ showSidebar: !s.showSidebar })),
        setShowSidebar: (show) => set({ showSidebar: show }),

        /* ── CV Data actions ── */
        setCvData: (data) => set({ cvData: data, isDirty: true }),

        patchCvData: (partial) =>
            set((s) => ({ cvData: { ...s.cvData, ...partial }, isDirty: true })),

        resetCvData: () => set({ cvData: DEFAULT_CV_DATA, isDirty: false }),

        setCvName: (name) => set({ cvName: name }),

        updatePersonalInfo: (patch) =>
            set((s) => ({
                cvData: {
                    ...s.cvData,
                    personalInfo: { ...s.cvData.personalInfo, ...patch },
                },
                isDirty: true,
            })),

        updateSummary: (summary) =>
            set((s) => ({
                cvData: { ...s.cvData, summary },
                isDirty: true,
            })),

        /* ── Section item CRUD ── */
        updateSectionItem: (section, itemId, patch) =>
            set((s) => {
                const list = s.cvData[section] as { id: string }[];
                const idx = list.findIndex((item) => item.id === itemId);
                if (idx === -1) return s;
                const updated = [...list];
                updated[idx] = { ...updated[idx], ...patch };
                return { cvData: { ...s.cvData, [section]: updated }, isDirty: true };
            }),

        addSectionItem: (section, item) =>
            set((s) => ({
                cvData: {
                    ...s.cvData,
                    [section]: [...(s.cvData[section] as unknown[]), item],
                },
                isDirty: true,
            })),

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

        reorderSection: (section, orderedIds) =>
            set((s) => {
                const list = s.cvData[section] as { id: string }[];
                const idMap = new Map(list.map((item) => [item.id, item]));
                const reordered = orderedIds.map((id) => idMap.get(id)).filter(Boolean);
                return { cvData: { ...s.cvData, [section]: reordered }, isDirty: true };
            }),

        /* ── Design Token actions ── */
        setDesignTokens: (tokens) => set({ designTokens: tokens, isDirty: true }),

        updateToken: (key, value) =>
            set((s) => ({
                designTokens: { ...s.designTokens, [key]: value },
                isDirty: true,
            })),

        toggleSectionVisibility: (section) =>
            set((s) => {
                const isHidden = s.designTokens.hiddenSections.includes(section);
                return {
                    designTokens: {
                        ...s.designTokens,
                        hiddenSections: isHidden
                            ? s.designTokens.hiddenSections.filter((ss) => ss !== section)
                            : [...s.designTokens.hiddenSections, section],
                    },
                    isDirty: true,
                };
            }),

        reorderSectionOrder: (newOrder) =>
            set((s) => ({
                designTokens: { ...s.designTokens, sectionOrder: newOrder },
                isDirty: true,
            })),

        resetDesignTokens: () => set({ designTokens: DEFAULT_DESIGN_TOKENS }),

        /* ── UI actions ── */
        setIsEditing: (editing) => set({ isEditing: editing }),
        setZoomLevel: (zoom) => set({ zoomLevel: Math.max(50, Math.min(200, zoom)) }),
        setAutosaveStatus: (status) => set({ autosaveStatus: status }),
        setDataSourceModalOpen: (open) => set({ isDataSourceModalOpen: open }),

        /* ── Persistence ── */
        loadFromStorage: () => {
            if (typeof window === "undefined") return;
            try {
                const raw = localStorage.getItem(STORAGE_KEY);
                if (!raw) return;
                const saved = JSON.parse(raw) as Partial<CVBuilderState>;
                set({
                    selectedTemplateId: saved.selectedTemplateId ?? null,
                    cvData: saved.cvData ?? DEFAULT_CV_DATA,
                    cvName: saved.cvName ?? "CV của bạn",
                    designTokens: saved.designTokens
                        ? { ...DEFAULT_DESIGN_TOKENS, ...saved.designTokens }
                        : DEFAULT_DESIGN_TOKENS,
                    currentView: saved.selectedTemplateId ? "editor" : "gallery",
                });
            } catch {
                // ignore
            }
        },

        saveToStorage: () => {
            if (typeof window === "undefined") return;
            const { selectedTemplateId, cvData, cvName, designTokens } = get();
            try {
                localStorage.setItem(
                    STORAGE_KEY,
                    JSON.stringify({
                        selectedTemplateId,
                        cvData,
                        cvName,
                        designTokens,
                        timestamp: Date.now(),
                    }),
                );
            } catch {
                // storage full
            }
        },
    })),
);

/* ─────────────────────────────────────────────────────────── */
/*  Autosave subscriber                                        */
/* ─────────────────────────────────────────────────────────── */

let autosaveTimer: ReturnType<typeof setTimeout> | null = null;

export function initBuilderAutosave() {
    return useCVBuilderStore.subscribe(
        (s) => ({ cvData: s.cvData, designTokens: s.designTokens, cvName: s.cvName }),
        () => {
            const { setAutosaveStatus, saveToStorage } = useCVBuilderStore.getState();
            setAutosaveStatus("saving");

            if (autosaveTimer) clearTimeout(autosaveTimer);
            autosaveTimer = setTimeout(() => {
                try {
                    saveToStorage();
                    setAutosaveStatus("saved");
                    setTimeout(() => setAutosaveStatus("idle"), 2000);
                } catch {
                    setAutosaveStatus("error");
                }
            }, AUTOSAVE_DEBOUNCE_MS);
        },
        { equalityFn: (a, b) => a.cvData === b.cvData && a.designTokens === b.designTokens && a.cvName === b.cvName },
    );
}
