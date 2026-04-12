"use client";

import * as React from "react";
import {
    CVDesignTokens,
    CVSection,
    DEFAULT_DESIGN_TOKENS,
} from "@/features/cv/types/types";

const STORAGE_KEY = "cv_design_tokens";

export interface UseCVDesignReturn {
    designTokens: CVDesignTokens;
    setDesignTokens: ((tokens: CVDesignTokens) => void) | React.Dispatch<React.SetStateAction<CVDesignTokens>>;
    updateToken: <K extends keyof CVDesignTokens>(key: K, value: CVDesignTokens[K]) => void;
    toggleSectionVisibility: (section: CVSection) => void;
    reorderSections: (newOrder: CVSection[]) => void;
    resetTokens: () => void;
}


export function useCVDesign(): UseCVDesignReturn {
    const [designTokens, setDesignTokens] = React.useState<CVDesignTokens>(() => {
        if (typeof window === "undefined") return DEFAULT_DESIGN_TOKENS;
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                return { ...DEFAULT_DESIGN_TOKENS, ...JSON.parse(stored) };
            }
        } catch {
            // ignore parse errors
        }
        return DEFAULT_DESIGN_TOKENS;
    });

    // Persist on change
    React.useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(designTokens));
        } catch {
            // storage full or unavailable
        }
    }, [designTokens]);

    const updateToken = React.useCallback(
        <K extends keyof CVDesignTokens>(key: K, value: CVDesignTokens[K]) => {
            setDesignTokens((prev) => ({ ...prev, [key]: value }));
        },
        [],
    );

    const toggleSectionVisibility = React.useCallback((section: CVSection) => {
        setDesignTokens((prev) => {
            const isHidden = prev.hiddenSections.includes(section);
            return {
                ...prev,
                hiddenSections: isHidden
                    ? prev.hiddenSections.filter((s) => s !== section)
                    : [...prev.hiddenSections, section],
            };
        });
    }, []);

    const reorderSections = React.useCallback((newOrder: CVSection[]) => {
        setDesignTokens((prev) => ({ ...prev, sectionOrder: newOrder }));
    }, []);

    const resetTokens = React.useCallback(() => {
        setDesignTokens(DEFAULT_DESIGN_TOKENS);
    }, []);

    return {
        designTokens,
        setDesignTokens,
        updateToken,
        toggleSectionVisibility,
        reorderSections,
        resetTokens,
    };
}
