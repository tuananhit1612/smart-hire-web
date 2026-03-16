import { useState, useEffect, useCallback } from "react";
import { CVData } from "../types/types";

export interface CVSnapshot {
    id: string;
    timestamp: number;
    name: string;
    data: CVData;
}

const STORAGE_KEY = "cv_history_snapshots";
const EVENT_KEY = "cv-history-local-change";

export function useCVHistory() {
    const [history, setHistory] = useState<CVSnapshot[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Helpers to read/write directly to Storage (Source of Truth)
    const getStoredHistory = (): CVSnapshot[] => {
        if (typeof window === 'undefined') return [];
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch (e) {
            console.error("Failed to parse history", e);
            return [];
        }
    };

    const setStoredHistory = (newHistory: CVSnapshot[]) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));

        // Dispatch custom event for same-tab sync
        window.dispatchEvent(new Event(EVENT_KEY));

        // Dispatch storage event manually for other tabs (optional, but good practice)
        // Note: standard 'storage' event only fires on other tabs, not the current one.
    };

    // Initial Load & Listeners
    useEffect(() => {
        // Initial load
        setHistory(getStoredHistory());
        setIsLoaded(true);

        // Listener for changes from other hook instances in THIS tab
        const handleLocalChange = () => {
            setHistory(getStoredHistory());
        };

        // Listener for changes from OTHER tabs
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === STORAGE_KEY) {
                setHistory(getStoredHistory());
            }
        };

        window.addEventListener(EVENT_KEY, handleLocalChange);
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener(EVENT_KEY, handleLocalChange);
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    // Mutation methods - ALWAYS read from Storage first to avoid Stale State
    const saveSnapshot = useCallback((data: CVData, name: string = "Bản lưu tự động") => {
        const currentList = getStoredHistory();
        const newSnapshot: CVSnapshot = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
            timestamp: Date.now(),
            name,
            data: JSON.parse(JSON.stringify(data)) // Deep copy
        };
        const newList = [newSnapshot, ...currentList];

        setStoredHistory(newList);
        setHistory(newList);
    }, []);

    const deleteSnapshot = useCallback((id: string) => {
        const currentList = getStoredHistory();
        const newList = currentList.filter(item => item.id !== id);

        setStoredHistory(newList);
        setHistory(newList);
    }, []);

    const clearHistory = useCallback(() => {
        setStoredHistory([]);
        setHistory([]);
    }, []);

    return {
        history,
        saveSnapshot,
        deleteSnapshot,
        clearHistory
    };
}
