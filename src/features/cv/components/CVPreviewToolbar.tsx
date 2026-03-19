"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Wand2, ChevronRight, ChevronLeft } from "lucide-react";
import { VersionHistoryDialog } from "@/features/cv/components/history/VersionHistoryDialog";
import { CVData } from "@/features/cv/types/types";

interface CVPreviewToolbarProps {
    zoomLevel: number;
    isPanMode: boolean;
    isAutoFilling: boolean;
    hasTemplate: boolean;
    cvData: CVData;
    TemplateComponent: React.ComponentType<{ data: CVData }>;
    onZoomIn: () => void;
    onZoomOut: () => void;
    onResetZoom: () => void;
    onTogglePanMode: () => void;
    onFillMockData: () => void;
    onRestore: (data: CVData) => void;
}

export function CVPreviewToolbar({
    zoomLevel,
    isPanMode,
    isAutoFilling,
    hasTemplate,
    cvData,
    TemplateComponent,
    onZoomIn,
    onZoomOut,
    onResetZoom,
    onTogglePanMode,
    onFillMockData,
    onRestore,
}: CVPreviewToolbarProps) {
    const [isToolbarOpen, setIsToolbarOpen] = React.useState(false);

    return (
        <div className="flex items-center">
            {/* Toggle Button (Always Visible) */}
            <button
                onClick={() => setIsToolbarOpen(!isToolbarOpen)}
                className={`flex items-center justify-center p-2 border border-green-100 bg-white hover:bg-green-50 text-green-600 transition-all z-20 h-10 w-10 focus:outline-none focus:ring-0 ${isToolbarOpen ? 'rounded-l-full border-r-0' : 'rounded-full shadow-md hover:shadow-lg'}`}
                title={isToolbarOpen ? "Thu gọn" : "Mở rộng công cụ"}
            >
                {isToolbarOpen ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </button>

            {/* Collapsible Content */}
            <AnimatePresence>
                {isToolbarOpen && (
                    <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: "auto", opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="flex items-center gap-1 bg-white border border-l-0 border-green-100 p-1 pl-1 rounded-r-full shadow-sm overflow-hidden whitespace-nowrap origin-left h-10"
                    >
                        {/* Zoom Controls */}
                        <div className="flex items-center px-1">
                            <button
                                onClick={onZoomOut}
                                className="h-8 w-8 flex items-center justify-center hover:bg-slate-100 rounded-md text-slate-600 hover:text-green-600 transition-all"
                                title="Thu nhỏ (Ctrl + Scroll Down)"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" x2="16.65" y1="21" y2="16.65" /><line x1="8" x2="14" y1="11" y2="11" /></svg>
                            </button>
                            <div className="flex flex-col items-center w-8 cursor-help mx-0.5" title="Giữ Ctrl + Lăn chuột để zoom">
                                <span className="text-xs font-mono font-medium text-slate-500 select-none">{Math.round(zoomLevel * 100)}%</span>
                            </div>
                            <button
                                onClick={onZoomIn}
                                className="h-8 w-8 flex items-center justify-center hover:bg-slate-100 rounded-md text-slate-600 hover:text-green-600 transition-all"
                                title="Phóng to (Ctrl + Scroll Up)"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" x2="16.65" y1="21" y2="16.65" /><line x1="11" x2="11" y1="8" y2="14" /><line x1="8" x2="14" y1="11" y2="11" /></svg>
                            </button>
                        </div>

                        <div className="w-px h-5 bg-slate-200 mx-1"></div>

                        {/* Pan Tool */}
                        <button
                            onClick={onTogglePanMode}
                            className={`h-8 flex items-center gap-2 px-3 rounded-md text-sm font-medium transition-all !ring-0 !outline-none !border-transparent border-0 ring-0 outline-none shadow-none hover:shadow-none focus:ring-0 focus:outline-none focus:border-transparent ${isPanMode
                                ? 'bg-green-100 text-green-700 shadow-inner'
                                : 'text-slate-600 hover:bg-green-50 hover:text-green-600 active:bg-green-100 active:text-green-700 active:shadow-inner'
                                }`}
                            title={isPanMode ? "Tắt chế độ kéo" : "Bật chế độ kéo (Giữ Ctrl)"}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" /><path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" /><path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" /><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" /></svg>
                            <span className="hidden xl:inline">Kéo thả</span>
                        </button>

                        <div className="w-px h-5 bg-slate-200 mx-1"></div>

                        {/* Special Actions (Mock & History) */}
                        <div className="flex items-center gap-1">
                            <button
                                className="h-8 flex items-center gap-2 px-3 rounded-md text-sm font-medium transition-all !ring-0 !outline-none !border-transparent border-0 ring-0 outline-none shadow-none hover:shadow-none focus:ring-0 focus:outline-none focus:border-transparent text-slate-600 hover:text-green-600 hover:bg-green-50 active:bg-green-100 active:text-green-700 active:shadow-inner disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={hasTemplate || isAutoFilling}
                                title={hasTemplate ? "Đã có mẫu CV được chọn" : "Tạo dữ liệu mẫu với AI"}
                                onClick={onFillMockData}
                            >
                                <Wand2 className={`w-4 h-4 ${isAutoFilling ? 'animate-spin' : ''}`} />
                                <span className="hidden xl:inline">{isAutoFilling ? 'Đang viết...' : 'Dữ liệu mẫu'}</span>
                            </button>

                            <VersionHistoryDialog
                                currentData={cvData}
                                Template={TemplateComponent}
                                onRestore={onRestore}
                            />
                        </div>

                        <div className="w-px h-5 bg-slate-200 mx-1"></div>

                        {/* Reset */}
                        <button
                            onClick={onResetZoom}
                            className="h-8 w-8 flex items-center justify-center hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-md transition-all mr-1"
                            title="Reset góc nhìn"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
