"use client";

import * as React from "react";
import { useCVBuilderStore, initBuilderAutosave } from "@/features/cv/stores/cv-builder-store";
import { CVGalleryView } from "@/features/cv/components/builder/CVGalleryView";
import { CVEditorView } from "@/features/cv/components/builder/CVEditorView";

function CVBuilderContent() {
    const currentView = useCVBuilderStore((s) => s.currentView);
    const loadFromStorage = useCVBuilderStore((s) => s.loadFromStorage);

    // Load saved state & init autosave on mount
    React.useEffect(() => {
        loadFromStorage();
        const unsub = initBuilderAutosave();
        return unsub;
    }, [loadFromStorage]);

    return (
        <>
            {currentView === "gallery" && <CVGalleryView />}
            {currentView === "editor" && <CVEditorView />}
        </>
    );
}

export default function CVBuilderPage() {
    return (
        <React.Suspense
            fallback={
                <div className="flex items-center justify-center h-screen bg-slate-50 dark:bg-[#141A21]">
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
                        <p className="text-slate-500 dark:text-gray-400 font-medium text-sm">
                            Đang tải trình tạo CV...
                        </p>
                    </div>
                </div>
            }
        >
            <CVBuilderContent />
        </React.Suspense>
    );
}
