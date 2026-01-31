"use client";

import * as React from "react";
import { CVBuilderLayout } from "@/features/cv/components/CVBuilderLayout";
import { CVSectionNav } from "@/features/cv/components/CVSectionNav";
import { CVBuilderForm } from "@/features/cv/components/CVBuilderForm";
import { CVSection, CVData, DEFAULT_CV_DATA } from "@/features/cv/types/types";
import { FileText, Download, X } from "lucide-react";
import { useToast } from "@/shared/components/ui/toast";
import { useAutosave, AutosaveIndicator } from "@/shared/components/ui/autosave-indicator";
import { useSearchParams } from "next/navigation";
import { MOCK_CV_DATA, getMockDataForTemplate } from "@/features/cv/data/mock-data";
import { TEMPLATE_COMPONENTS } from "@/features/cv/components/cv-templates";
import { exportToPDF } from "@/features/cv/utils/export-to-pdf";
export default function CVBuilderPage() {
    const searchParams = useSearchParams();
    const activeTemplateId = searchParams.get('template') || 'modern-tech';
    const mode = searchParams.get('mode'); // 'new' or null

    const [activeSection, setActiveSection] = React.useState<CVSection>("personal");
    const [cvData, setCvData] = React.useState<CVData>(DEFAULT_CV_DATA);
    const [isSaving, setIsSaving] = React.useState(false);
    const { addToast } = useToast();

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

    // Mock save function
    const saveCV = React.useCallback(async (data: CVData) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("CV data saved:", data);
        // In real app, this would call API
    }, []);

    // Autosave hook
    const { status: autosaveStatus, lastSaved, save: triggerSave } = useAutosave(
        cvData,
        saveCV,
        { debounceMs: 3000, enabled: true }
    );

    // Manual save with toast
    const handleSave = async () => {
        setIsSaving(true);
        try {
            await saveCV(cvData);
            addToast("CV đã được lưu thành công!", "success");
        } catch {
            addToast("Có lỗi khi lưu CV. Vui lòng thử lại.", "error");
        } finally {
            setIsSaving(false);
        }
    };

    const [zoomLevel, setZoomLevel] = React.useState(0.65);
    const [pan, setPan] = React.useState({ x: 0, y: 0 });
    const panRef = React.useRef({ x: 0, y: 0 }); // Use Ref for direct mutable access during drag
    const [isPreviewMode, setIsPreviewMode] = React.useState(false);
    const [isPanMode, setIsPanMode] = React.useState(false);
    const [isPanning, setIsPanning] = React.useState(false);
    const previewRef = React.useRef<HTMLDivElement>(null);
    const previewContentRef = React.useRef<HTMLDivElement>(null); // Target for direct transform
    const lastMousePos = React.useRef({ x: 0, y: 0 });

    const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.1, 1.5));
    const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.1, 0.3));
    const handleResetZoom = () => {
        setZoomLevel(0.65);
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
        <div className="flex items-center gap-1 bg-slate-100/50 p-1 rounded-lg border border-slate-200/50">
            <button
                onClick={handleZoomOut}
                className="p-1.5 hover:bg-white hover:shadow-sm rounded-md text-slate-600 transition-all active:scale-95"
                title="Thu nhỏ (Ctrl + Scroll Down)"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" x2="16.65" y1="21" y2="16.65" /><line x1="8" x2="14" y1="11" y2="11" /></svg>
            </button>
            <div className="flex flex-col items-center w-12 cursor-help" title="Giữ Ctrl + Lăn chuột để zoom">
                <span className="text-xs font-mono font-medium text-slate-500 select-none leading-none">{Math.round(zoomLevel * 100)}%</span>
            </div>
            <button
                onClick={handleZoomIn}
                className="p-1.5 hover:bg-white hover:shadow-sm rounded-md text-slate-600 transition-all active:scale-95"
                title="Phóng to (Ctrl + Scroll Up)"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" x2="16.65" y1="21" y2="16.65" /><line x1="11" x2="11" y1="8" y2="14" /><line x1="8" x2="14" y1="11" y2="11" /></svg>
            </button>
            <div className="w-px h-4 bg-slate-300 mx-1"></div>

            {/* Pan Tool Toggle */}
            <button
                onClick={() => setIsPanMode(!isPanMode)}
                className={`p-1.5 rounded-md transition-all active:scale-95 flex items-center gap-1.5 ${isPanMode ? 'bg-sky-100 text-sky-700 shadow-inner' : 'hover:bg-white hover:shadow-sm text-slate-600'}`}
                title={isPanMode ? "Tắt chế độ kéo" : "Bật chế độ kéo (Giữ Ctrl)"}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" /><path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" /><path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" /><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" /></svg>
                <span className="text-xs font-medium hidden lg:inline">Kéo thả</span>
            </button>

            {/* Reset View */}
            <button
                onClick={handleResetZoom}
                className="p-1.5 hover:bg-white hover:shadow-sm rounded-md text-slate-500 hover:text-red-500 transition-all active:scale-95 ml-1"
                title="Reset góc nhìn"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>
            </button>
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
                        initialData={cvData}
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
