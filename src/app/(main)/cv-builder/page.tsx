"use client";

import * as React from "react";
import { CVBuilderLayout } from "@/features/cv/components/CVBuilderLayout";
import { CVSectionNav } from "@/features/cv/components/CVSectionNav";
import { CVBuilderForm } from "@/features/cv/components/CVBuilderForm";
import { CVSection, CVData, DEFAULT_CV_DATA } from "@/features/cv/types/types";
import { FileText, Download, X, Wand2, History, ChevronRight, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/shared/components/ui/toast";
import { useAutosave, AutosaveIndicator } from "@/shared/components/ui/autosave-indicator";
import { useSearchParams } from "next/navigation";
import { MOCK_CV_DATA, MOCK_DATA_MAP, getMockDataForTemplate } from "@/features/cv/data/mock-data";
import { TEMPLATE_COMPONENTS } from "@/features/cv/components/cv-templates";
import { Button } from "@/shared/components/ui/button";

import { VersionHistoryDialog } from "@/features/cv/components/history/VersionHistoryDialog";
import { exportToPDF } from "@/features/cv/utils/export-to-pdf";
import { useCVAutoFill } from "@/features/cv/hooks/useCVAutoFill";
import { useCVHistory } from "@/features/cv/hooks/useCVHistory";
import { format } from "date-fns";
function CVBuilderContent() {
    const searchParams = useSearchParams();
    const activeTemplateId = searchParams.get('template') || 'modern-tech';
    const mode = searchParams.get('mode'); // 'new' or null

    const [activeSection, setActiveSection] = React.useState<CVSection>("personal");
    const [cvData, setCvData] = React.useState<CVData>(DEFAULT_CV_DATA);
    const [isSaving, setIsSaving] = React.useState(false);
    const { addToast } = useToast();
    const { fillData, isFilling: isAutoFilling } = useCVAutoFill(setCvData);
    const { saveSnapshot } = useCVHistory();

    // Select Template Component
    const TemplateComponent = TEMPLATE_COMPONENTS[activeTemplateId] || TEMPLATE_COMPONENTS['modern-tech'];

    // Get base mock data for specific template
    const templateMockData = React.useMemo(() => getMockDataForTemplate(activeTemplateId), [activeTemplateId]);

    // Deep merge function for display data (Mock + User Input)
    const displayData: CVData = React.useMemo(() => {
        // If mode is 'new', we DO NOT show mock data. Use empty fields.
        if (mode === 'new') {
            return cvData;
        }

        // Otherwise (Select Template mode), we show Mock Data until user overrides it.
        return {
            personalInfo: {
                fullName: cvData.personalInfo.fullName || templateMockData.personalInfo.fullName,
                title: cvData.personalInfo.title || templateMockData.personalInfo.title,
                email: cvData.personalInfo.email || templateMockData.personalInfo.email,
                phone: cvData.personalInfo.phone || templateMockData.personalInfo.phone,
                location: cvData.personalInfo.location || templateMockData.personalInfo.location,
                website: cvData.personalInfo.website || templateMockData.personalInfo.website,
                avatarUrl: cvData.personalInfo.avatarUrl || templateMockData.personalInfo.avatarUrl,
                additionalInfo: cvData.personalInfo.additionalInfo || templateMockData.personalInfo.additionalInfo,
                socials: (cvData.personalInfo.socials && cvData.personalInfo.socials.length > 0)
                    ? cvData.personalInfo.socials
                    : templateMockData.personalInfo.socials,
            },
            summary: cvData.summary || templateMockData.summary,
            // For lists, we only show Mock data if the user has NO entries at all.
            experience: cvData.experience.length > 0 ? cvData.experience : templateMockData.experience,
            education: cvData.education.length > 0 ? cvData.education : templateMockData.education,
            skills: cvData.skills.length > 0 ? cvData.skills : templateMockData.skills,
            projects: cvData.projects.length > 0 ? cvData.projects : templateMockData.projects,
        };
    }, [cvData, mode, templateMockData]);

    // Real save function (Using Local Storage History for now)
    const saveCV = React.useCallback(async (data: CVData) => {
        // In valid app, this calls API.
        // Here we simulate API delay then save to History.
        await new Promise((resolve) => setTimeout(resolve, 800));
        saveSnapshot(data, `Tự động lưu ${format(new Date(), "HH:mm")}`);
        console.log("CV data saved to history");
    }, [saveSnapshot]);

    // Use Ref to keep track of latest data for event listeners without re-attaching them constantly
    const cvDataRef = React.useRef(cvData);
    React.useEffect(() => {
        cvDataRef.current = cvData;
    }, [cvData]);

    // 1. REMOVED: Interval Auto-save
    // User requested to ONLY save on exit/close.

    // 2. Save on Tab Close / Refresh (beforeunload)
    React.useEffect(() => {
        const handleBeforeUnload = () => {
            const currentData = cvDataRef.current;
            saveSnapshot(currentData, `Lưu tự động trước khi thoát ${format(new Date(), "HH:mm")}`);
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [saveSnapshot]);

    // 3. Save on Component Unmount (Navigation away within App)
    React.useEffect(() => {
        return () => {
            const currentData = cvDataRef.current;
            // Ensure we don't save default empty data if user just opened and closed immediately
            if (currentData !== DEFAULT_CV_DATA) {
                saveSnapshot(currentData, `Lưu tự động khi thoát ${format(new Date(), "HH:mm")}`);
            }
        };
    }, [saveSnapshot]);

    // NOTE: useAutosave removed to prevent periodic API calls or history spam.
    // We mock the return values for UI compatibility if needed, or remove UI usage.
    // For now, let mocks exist so we don't break the UI below.
    const autosaveStatus = "saved" as const;
    const lastSaved = new Date();
    const triggerSave = async () => { }; // No-op

    // Manual save with toast
    const handleSave = async () => {
        setIsSaving(true);
        try {
            // Save as a named snapshot
            saveSnapshot(cvData, `Bản lưu thủ công ${format(new Date(), "HH:mm dd/MM")}`);

            // Also trigger the "API save" simulation
            await new Promise((resolve) => setTimeout(resolve, 500));

            addToast("CV đã được lưu vào Lịch sử!", "success");
        } catch {
            addToast("Có lỗi khi lưu CV. Vui lòng thử lại.", "error");
        } finally {
            setIsSaving(false);
        }
    };

    const [zoomLevel, setZoomLevel] = React.useState(0.45);
    const [pan, setPan] = React.useState({ x: 0, y: 0 });
    const panRef = React.useRef({ x: 0, y: 0 }); // Use Ref for direct mutable access during drag
    const [isPreviewMode, setIsPreviewMode] = React.useState(false);
    const [isPanMode, setIsPanMode] = React.useState(false);

    const [isPanning, setIsPanning] = React.useState(false);
    const [isToolbarOpen, setIsToolbarOpen] = React.useState(false);
    const previewRef = React.useRef<HTMLDivElement>(null);
    const previewContentRef = React.useRef<HTMLDivElement>(null); // Target for direct transform
    const lastMousePos = React.useRef({ x: 0, y: 0 });

    const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.1, 1.5));
    const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.1, 0.3));
    const handleResetZoom = () => {
        setZoomLevel(0.45);
        setPan({ x: 0, y: 0 });
        panRef.current = { x: 0, y: 0 };
    };

    // Sync Ref with State when State changes (e.g. initial load or reset)
    React.useEffect(() => {
        panRef.current = pan;
    }, [pan]);

    // Pan Handlers
    const handleMouseDown = (e: React.MouseEvent) => {
        if (!isPanMode || !previewRef.current) return;
        setIsPanning(true);
        lastMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isPanning || !previewRef.current || !previewContentRef.current) return;

        // Calculate Delta
        const deltaX = e.clientX - lastMousePos.current.x;
        const deltaY = e.clientY - lastMousePos.current.y;

        // Update Ref (No Re-render)
        panRef.current = {
            x: panRef.current.x + deltaX,
            y: panRef.current.y + deltaY
        };

        // Direct DOM Update for Performance
        previewContentRef.current.style.transform = `translate(${panRef.current.x}px, ${panRef.current.y}px) scale(${zoomLevel})`;

        lastMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
        if (isPanning) {
            setIsPanning(false);
            setPan(panRef.current); // Sync back to React State to persist
        }
    };

    const handlePreview = () => {
        setIsPreviewMode(true);
    };

    // Wheel Zoom Handler
    React.useEffect(() => {
        const container = previewRef.current;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                const delta = e.deltaY * -0.01;
                const smoothDelta = Math.max(Math.min(delta, 0.2), -0.2);

                setZoomLevel(prev => {
                    const newZoom = prev + smoothDelta;
                    // Apply immediately to current transform to avoid jump
                    if (previewContentRef.current) {
                        previewContentRef.current.style.transform = `translate(${panRef.current.x}px, ${panRef.current.y}px) scale(${Math.max(0.3, Math.min(newZoom, 2.0))})`;
                    }
                    return Math.max(0.3, Math.min(newZoom, 2.0));
                });
            } else if (isPanMode) {
                e.preventDefault();
                panRef.current = {
                    x: panRef.current.x - e.deltaX,
                    y: panRef.current.y - e.deltaY
                };
                if (previewContentRef.current) {
                    previewContentRef.current.style.transform = `translate(${panRef.current.x}px, ${panRef.current.y}px) scale(${zoomLevel})`;
                }
                // We debounce sync to state for wheel pan to avoid too many renders, or just sync on idle. 
                // For simplicity here, we might not sync constantly or accept a small delay.
                // Or better: wrapping this in a requestAnimationFrame if needed, but wheel events are less frequent than mousemove.
                setPan(panRef.current);
            }
        };

        container.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            container.removeEventListener('wheel', handleWheel);
        };
    }, [isPanMode, zoomLevel]);

    // Ctrl Key Pan Handler
    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Control') {
                setIsPanMode(true);
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.key === 'Control') {
                setIsPanMode(false);
                setIsPanning(false);
                // Ensure state is synced if key released mid-drag
                if (isPanning) setPan(panRef.current);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [isPanning]); // Added dependency to capture isPanning closure correctly or use ref for isPanning if needed.

    // Header Toolbar Content
    const headerToolbar = (
        <div className="flex items-center">
            {/* Toggle Button (Always Visible) */}
            <button
                onClick={() => setIsToolbarOpen(!isToolbarOpen)}
                className={`flex items-center justify-center p-2 border border-sky-100 bg-white hover:bg-sky-50 text-sky-600 transition-all z-20 h-10 w-10 focus:outline-none focus:ring-0 ${isToolbarOpen ? 'rounded-l-full border-r-0' : 'rounded-full shadow-md hover:shadow-lg'}`}
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
                        className="flex items-center gap-1 bg-white border border-l-0 border-sky-100 p-1 pl-1 rounded-r-full shadow-sm overflow-hidden whitespace-nowrap origin-left h-10"
                    >
                        {/* Zoom Controls */}
                        <div className="flex items-center px-1">
                            <button
                                onClick={handleZoomOut}
                                className="h-8 w-8 flex items-center justify-center hover:bg-slate-100 rounded-md text-slate-600 hover:text-sky-600 transition-all"
                                title="Thu nhỏ (Ctrl + Scroll Down)"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" x2="16.65" y1="21" y2="16.65" /><line x1="8" x2="14" y1="11" y2="11" /></svg>
                            </button>
                            <div className="flex flex-col items-center w-8 cursor-help mx-0.5" title="Giữ Ctrl + Lăn chuột để zoom">
                                <span className="text-xs font-mono font-medium text-slate-500 select-none">{Math.round(zoomLevel * 100)}%</span>
                            </div>
                            <button
                                onClick={handleZoomIn}
                                className="h-8 w-8 flex items-center justify-center hover:bg-slate-100 rounded-md text-slate-600 hover:text-sky-600 transition-all"
                                title="Phóng to (Ctrl + Scroll Up)"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" x2="16.65" y1="21" y2="16.65" /><line x1="11" x2="11" y1="8" y2="14" /><line x1="8" x2="14" y1="11" y2="11" /></svg>
                            </button>
                        </div>

                        <div className="w-px h-5 bg-slate-200 mx-1"></div>

                        {/* Pan Tool */}
                        <button
                            onClick={() => setIsPanMode(!isPanMode)}
                            className={`h-8 flex items-center gap-2 px-3 rounded-md text-sm font-medium transition-all !ring-0 !outline-none !border-transparent border-0 ring-0 outline-none shadow-none hover:shadow-none focus:ring-0 focus:outline-none focus:border-transparent ${isPanMode
                                ? 'bg-sky-100 text-sky-700 shadow-inner'
                                : 'text-slate-600 hover:bg-sky-50 hover:text-sky-600 active:bg-sky-100 active:text-sky-700 active:shadow-inner'
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
                                className="h-8 flex items-center gap-2 px-3 rounded-md text-sm font-medium transition-all !ring-0 !outline-none !border-transparent border-0 ring-0 outline-none shadow-none hover:shadow-none focus:ring-0 focus:outline-none focus:border-transparent text-slate-600 hover:text-sky-600 hover:bg-sky-50 active:bg-sky-100 active:text-sky-700 active:shadow-inner disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={!!searchParams.get('template') || isAutoFilling}
                                title={searchParams.get('template') ? "Đã có mẫu CV được chọn" : "Tạo dữ liệu mẫu với AI"}
                                onClick={() => {
                                    const dataToLoad = MOCK_DATA_MAP[activeTemplateId] || MOCK_CV_DATA;
                                    fillData(dataToLoad);
                                    addToast("AI đang viết CV cho bạn...", "info");
                                }}
                            >
                                <Wand2 className={`w-4 h-4 ${isAutoFilling ? 'animate-spin' : ''}`} />
                                <span className="hidden xl:inline">{isAutoFilling ? 'Đang viết...' : 'Dữ liệu mẫu'}</span>
                            </button>

                            <VersionHistoryDialog
                                currentData={cvData}
                                Template={TemplateComponent}
                                onRestore={(data) => {
                                    setCvData(data);
                                    addToast("Đã khôi phục phiên bản CV!", "success");
                                }}
                            />
                        </div>

                        <div className="w-px h-5 bg-slate-200 mx-1"></div>

                        {/* Reset */}
                        <button
                            onClick={handleResetZoom}
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

    return (
        <>
            <CVBuilderLayout
                sidebar={
                    <CVSectionNav
                        activeSection={activeSection}
                        onSectionChange={setActiveSection}
                    />
                }
                form={
                    <CVBuilderForm
                        data={displayData}
                        activeSection={activeSection}
                        onSectionChange={setActiveSection}
                        onDataChange={setCvData}
                    />
                }
                headerToolbar={headerToolbar}
                preview={
                    <div className="relative bg-slate-100/50 h-full flex flex-col overflow-hidden select-none">
                        {/* Interactive Preview Canvas */}
                        <div
                            ref={previewRef}
                            className={`flex-1 overflow-hidden p-8 flex items-center justify-center ${isPanMode ? 'cursor-grab active:cursor-grabbing' : ''}`}
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                        >
                            <div
                                ref={previewContentRef}
                                style={{
                                    transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoomLevel})`,
                                    transformOrigin: 'center center',
                                    transition: isPanning ? 'none' : 'transform 0.1s ease-out',
                                    willChange: 'transform' // Hardware acceleration hint
                                }}
                                className="shadow-2xl bg-white pointer-events-none"
                            >
                                <div className="w-[210mm] min-h-[297mm]">
                                    <TemplateComponent data={displayData} />
                                </div>
                            </div>
                        </div>
                    </div>
                }
                onSave={handleSave}
                onPreview={handlePreview}
                isSaving={isSaving}
                autosaveIndicator={
                    <AutosaveIndicator status={autosaveStatus} lastSaved={lastSaved} />
                }
            />

            {/* Full Screen Preview Modal */}
            {isPreviewMode && (
                <div className="fixed inset-0 z-50 bg-white/95 backdrop-blur-xl flex flex-col animate-in fade-in duration-200">
                    <div className="flex items-center justify-between px-6 py-4 bg-white/50 border-b border-gray-100 text-gray-900">
                        <h2 className="text-lg font-bold flex items-center gap-2 text-sky-900">
                            <FileText className="w-5 h-5 text-sky-600" />
                            Xem trước CV
                        </h2>
                        <div className="flex gap-3">
                            <button
                                onClick={async () => {
                                    const success = await exportToPDF('cv-modal-content', `CV_${cvData.personalInfo.fullName || 'Untitled'}.pdf`);
                                    if (success) {
                                        addToast("Xuất PDF thành công!", "success", 4000, "CV của bạn đã được tải xuống.");
                                    } else {
                                        addToast("Xuất PDF thất bại", "error", 5000, "Có lỗi xảy ra, vui lòng thử lại.");
                                    }
                                }}
                                className="px-5 py-2.5 bg-green-500 hover:bg-green-600 shadow-lg shadow-green-500/20 text-white rounded-full text-sm font-bold transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                            >
                                <Download className="w-4 h-4" />
                                Tải xuống PDF
                            </button>
                            <button
                                onClick={() => setIsPreviewMode(false)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-red-500"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                    <div className="flex-1 overflow-auto p-8 md:p-12 flex justify-center bg-slate-50 relative">
                        {/* Grid Background */}
                        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

                        <div className="relative shadow-2xl shadow-slate-200 bg-white">
                            <div id="cv-modal-content" className="w-[210mm] min-h-[297mm]">
                                <TemplateComponent data={displayData} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default function CVBuilderPage() {
    return (
        <React.Suspense fallback={
            <div className="flex items-center justify-center h-screen bg-slate-50">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-slate-500 font-medium text-sm">Đang tải trình tạo CV...</p>
                </div>
            </div>
        }>
            <CVBuilderContent />
        </React.Suspense>
    );
}
