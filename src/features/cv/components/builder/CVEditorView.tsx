"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Undo2, Redo2, Eye, Save, Download,
    PaintBucket, ListChecks, LayoutGrid, Replace,
    Sparkles, FolderOpen, X, ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCVBuilderStore, type SidebarTab } from "@/features/cv/stores/cv-builder-store";
import { TEMPLATE_COMPONENTS } from "@/features/cv/components/cv-templates";
import { CVDesignPreviewWrapper } from "@/features/cv/components/CVDesignPreviewWrapper";
import { CVPageBreakOverlay } from "@/features/cv/components/CVPageBreakOverlay";
import type { SectionAction } from "@/features/cv/components/CVSectionToolbar";
import { getEmptySections } from "@/features/cv/utils/get-empty-sections";
import { addEmptySectionEntry } from "@/features/cv/utils/create-empty-section-entry";
import { CVDesignPanel } from "@/features/cv/components/CVDesignPanel";
import { usePDFExport } from "@/features/cv/hooks/usePDFExport";
import { useCvFileStore } from "@/features/cv/stores/cv-file-store";
import { useToast } from "@/shared/components/ui/toast";
import { CVSection } from "@/features/cv/types/types";
import { TEMPLATE_REGISTRY } from "@/features/cv/components/cv-templates";
import { CVDataSourceModal } from "./CVDataSourceModal";

/* ─────────────────────────────────────────── */
/*  Sidebar Tab Config                          */
/* ─────────────────────────────────────────── */

const SIDEBAR_TABS: { id: SidebarTab; label: string; icon: React.ElementType }[] = [
    { id: "design", label: "Thiết kế & Font", icon: PaintBucket },
    { id: "sections", label: "Thành mục", icon: ListChecks },
    { id: "layout", label: "Bố cục", icon: LayoutGrid },
    { id: "templates", label: "Đổi mẫu CV", icon: Replace },
    { id: "ai", label: "Gợi ý viết CV", icon: Sparkles },
    { id: "library", label: "Thư viện CV", icon: FolderOpen },
];

/* ─────────────────────────────────────────── */
/*  Main Editor View                           */
/* ─────────────────────────────────────────── */

export function CVEditorView() {
    const {
        selectedTemplateId, cvData, cvName, designTokens,
        isEditing, zoomLevel, showSidebar, activeSidebarTab,
        autosaveStatus,
        setCvData, setCvName, setView,
        setSidebarTab, toggleSidebar, setShowSidebar,
        setIsEditing, setZoomLevel,
        updateToken, toggleSectionVisibility, reorderSectionOrder,
        resetDesignTokens, setDesignTokens,
        isDataSourceModalOpen, setDataSourceModalOpen,
    } = useCVBuilderStore();

    const templateId = selectedTemplateId || "modern-tech";
    const TemplateComponent = TEMPLATE_COMPONENTS[templateId] || TEMPLATE_COMPONENTS["modern-tech"];

    // 5. PDF Export Configured for Backend Puppeteer Rendering
    const { isExporting, handleExportPDF: executePDFExport } = usePDFExport(cvData, templateId, designTokens);
    const { uploadCvFile } = useCvFileStore();
    const { addToast } = useToast();
    const [isSavingToServer, setIsSavingToServer] = React.useState(false);

    const fileName = `CV_${cvData.personalInfo.fullName || "Untitled"}.pdf`;

    /* ── Section actions (move up/down, delete/hide) ── */
    const handleSectionAction = React.useCallback(
        (action: SectionAction, section: CVSection, columnSections?: CVSection[]) => {
            if (action === "delete") {
                toggleSectionVisibility(section);
                return;
            }
            const order = [...designTokens.sectionOrder];
            const idx = order.indexOf(section);
            if (idx === -1) return;

            if (columnSections && columnSections.length > 1) {
                const colIdx = columnSections.indexOf(section);
                if (colIdx === -1) return;
                let swapWith: CVSection | undefined;
                if (action === "moveUp" && colIdx > 0) swapWith = columnSections[colIdx - 1];
                if (action === "moveDown" && colIdx < columnSections.length - 1) swapWith = columnSections[colIdx + 1];
                if (!swapWith) return;
                const swapIdx = order.indexOf(swapWith);
                if (swapIdx === -1) return;
                [order[idx], order[swapIdx]] = [order[swapIdx], order[idx]];
            } else {
                if (action === "moveUp" && idx > 0) [order[idx - 1], order[idx]] = [order[idx], order[idx - 1]];
                if (action === "moveDown" && idx < order.length - 1) [order[idx + 1], order[idx]] = [order[idx], order[idx + 1]];
            }
            reorderSectionOrder(order);
        },
        [designTokens.sectionOrder, toggleSectionVisibility, reorderSectionOrder],
    );

    const handleRestoreSection = React.useCallback(
        (section: CVSection) => {
            const updated = addEmptySectionEntry(cvData, section);
            if (updated !== cvData) setCvData(updated);
            if (designTokens.hiddenSections.includes(section)) toggleSectionVisibility(section);
        },
        [cvData, designTokens.hiddenSections, setCvData, toggleSectionVisibility],
    );

    const handleDataChange = React.useCallback(
        (updated: typeof cvData) => { setCvData(updated); },
        [setCvData],
    );

    /* ── Export / Save ── */
    const handleExportPDF = () => {
        executePDFExport(fileName);
    };

    const handleSaveToServer = async () => {
        setIsSavingToServer(true);
        addToast("Đang đồng bộ dữ liệu hồ sơ...", "info");
        try {
            const { cvApi } = await import("@/features/cv/api/cv-api");
            
            // 1. Lưu dữ liệu cấu trúc CV
            await cvApi.saveCV({
                title: cvName || "My Awesome CV",
                templateId: templateId,
                cvData: cvData,
            });

            // 2. Xuất bản PDF tự động
            addToast("Đang tạo tệp PDF bản cứng...", "info");
            const pdfBlob = await cvApi.exportPDF({
                templateId: templateId,
                cvData: cvData,
                design: designTokens
            });

            // 3. Upload file PDF vào DB (CvFile thuộc về Candidate Profile)
            const file = new File([pdfBlob], fileName, { type: "application/pdf" });
            await uploadCvFile(file, true, "BUILDER");

            addToast("Đã lưu thiết kế CV thành công vào hồ sơ!", "success", 4000);
        } catch (error) {
            console.error("Lưu CV thất bại:", error);
            addToast("Đồng bộ thất bại! Vui lòng kiểm tra lại kết nối.", "error", 3000);
        } finally {
            setIsSavingToServer(false);
        }
    };

    /* ── Design adapter (bridge to CVDesignPanel which expects useCVDesign shape) ── */
    const designAdapter = React.useMemo(() => ({
        designTokens,
        setDesignTokens,
        updateToken,
        toggleSectionVisibility,
        reorderSections: reorderSectionOrder,
        resetTokens: resetDesignTokens,
    }), [designTokens, setDesignTokens, updateToken, toggleSectionVisibility, reorderSectionOrder, resetDesignTokens]);

    return (
        <div className="h-[calc(100vh-64px)] flex flex-col bg-[#F4F6F8] dark:bg-[#111820] -m-6">
            {/* ─── Header ─── */}
            <header className="flex items-center justify-between px-4 py-2.5 bg-white dark:bg-[#1C252E] border-b border-gray-200 dark:border-white/10 shrink-0 z-20">
                <div className="flex items-center gap-3">
                    {/* Back button */}
                    <button
                        onClick={() => setView("gallery")}
                        className="p-2 rounded-xl text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>

                    {/* CV Name (editable) */}
                    <div className="flex items-center gap-2">
                        <span className="text-green-500 text-lg">📄</span>
                        <input
                            type="text"
                            value={cvName}
                            onChange={(e) => setCvName(e.target.value)}
                            className="bg-transparent border-none outline-none text-sm font-bold text-gray-800 dark:text-white w-48 focus:ring-0"
                            placeholder="Tên CV..."
                        />
                    </div>

                    {/* Autosave indicator */}
                    <div className="hidden sm:flex items-center gap-1.5 text-xs text-gray-400">
                        {autosaveStatus === "saving" && (
                            <><div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" /> Đang lưu...</>
                        )}
                        {autosaveStatus === "saved" && (
                            <><div className="w-2 h-2 rounded-full bg-green-400" /> Đã lưu</>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {/* Undo / Redo placeholder */}
                    <button className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
                        <Undo2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
                        <Redo2 className="w-4 h-4" />
                    </button>

                    <div className="w-px h-6 bg-gray-200 dark:bg-white/10 mx-1" />

                    {/* Export PDF */}
                    <button
                        onClick={handleExportPDF}
                        disabled={isExporting}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors disabled:opacity-50"
                    >
                        {isExporting ? (
                            <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <Download className="w-4 h-4" />
                        )}
                        Xem trước
                    </button>

                    {/* Save to server */}
                    <button
                        onClick={handleSaveToServer}
                        disabled={isSavingToServer || isExporting}
                        className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/20 transition-all disabled:opacity-50"
                    >
                        {isSavingToServer ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <Save className="w-4 h-4" />
                        )}
                        Lưu CV
                    </button>
                </div>
            </header>

            {/* ─── Body: Sidebar + Preview ─── */}
            <div className="flex-1 flex overflow-hidden">
                {/* ─── Left Sidebar ─── */}
                <AnimatePresence initial={false}>
                    {showSidebar && (
                        <motion.aside
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: 320, opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                            className="shrink-0 bg-white dark:bg-[#1C252E] border-r border-gray-200 dark:border-white/10 flex overflow-hidden h-full"
                        >
                            {/* Tab icons column */}
                            <div className="w-14 shrink-0 bg-gray-50 dark:bg-[#141A21] border-r border-gray-200 dark:border-white/10 py-3 flex flex-col gap-1">
                                {SIDEBAR_TABS.map((tab) => {
                                    const Icon = tab.icon;
                                    const isActive = activeSidebarTab === tab.id;
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setSidebarTab(tab.id)}
                                            title={tab.label}
                                            className={cn(
                                                "mx-1.5 p-2.5 rounded-xl transition-all relative group",
                                                isActive
                                                    ? "bg-green-500 text-white shadow-md shadow-green-500/20"
                                                    : "text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/5 hover:text-gray-700 dark:hover:text-gray-200",
                                            )}
                                        >
                                            <Icon className="w-4.5 h-4.5" />
                                            {/* Tooltip */}
                                            <span className="absolute left-full ml-2.5 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-gray-900 text-white text-xs font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                                                {tab.label}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Tab content */}
                            <div className="flex-1 overflow-y-auto overflow-x-hidden">
                                <div className="p-4">
                                    {/* Tab header */}
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-sm font-bold text-gray-800 dark:text-white">
                                            {SIDEBAR_TABS.find((t) => t.id === activeSidebarTab)?.label}
                                        </h3>
                                        <button
                                            onClick={() => setShowSidebar(false)}
                                            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {/* Design & Font tab */}
                                    {activeSidebarTab === "design" && (
                                        <CVDesignPanel design={designAdapter} />
                                    )}

                                    {/* Sections tab */}
                                    {activeSidebarTab === "sections" && (
                                        <SectionsTab />
                                    )}

                                    {/* Layout tab */}
                                    {activeSidebarTab === "layout" && (
                                        <LayoutTab />
                                    )}

                                    {/* Templates tab */}
                                    {activeSidebarTab === "templates" && (
                                        <TemplatesTab />
                                    )}

                                    {/* AI tab */}
                                    {activeSidebarTab === "ai" && (
                                        <div className="text-center py-10">
                                            <Sparkles className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                                            <p className="text-sm text-gray-400">Tính năng đang phát triển</p>
                                        </div>
                                    )}

                                    {/* Library tab */}
                                    {activeSidebarTab === "library" && (
                                        <div className="text-center py-10">
                                            <FolderOpen className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                                            <p className="text-sm text-gray-400">Tính năng đang phát triển</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.aside>
                    )}
                </AnimatePresence>

                {/* Toggle sidebar button (when hidden) */}
                {!showSidebar && (
                    <button
                        onClick={() => setShowSidebar(true)}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-6 h-12 bg-white dark:bg-[#1C252E] border border-l-0 border-gray-200 dark:border-white/10 rounded-r-xl flex items-center justify-center text-gray-400 hover:text-green-500 transition-colors shadow-sm"
                        style={{ marginTop: 32 }}
                    >
                        <PaintBucket className="w-3 h-3" />
                    </button>
                )}

                {/* ─── CV Preview Canvas ─── */}
                <main className="flex-1 overflow-auto relative">
                    {/* Grid background */}
                    <div
                        className="absolute inset-0 opacity-[0.02] pointer-events-none"
                        style={{
                            backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
                            backgroundSize: "20px 20px",
                        }}
                    />

                    <div className="flex justify-center py-8 px-4" style={{ minHeight: "100%" }}>
                        <div
                            className="relative shadow-2xl shadow-slate-300/50 dark:shadow-black/40 bg-white transition-transform origin-top"
                            style={{ transform: `scale(${zoomLevel / 100})` }}
                        >
                            <CVDesignPreviewWrapper designTokens={designTokens}>
                                <div
                                    id="cv-editor-preview-content"
                                    className="w-[210mm] min-h-[297mm]"
                                >
                                    <TemplateComponent
                                        data={cvData}
                                        editable={isEditing}
                                        onDataChange={handleDataChange}
                                        sectionOrder={designTokens.sectionOrder}
                                        hiddenSections={[
                                            ...designTokens.hiddenSections,
                                            ...getEmptySections(cvData).filter(
                                                (s) => !designTokens.hiddenSections.includes(s),
                                            ),
                                        ]}
                                        showSectionToolbar
                                        onSectionAction={handleSectionAction}
                                        onRestoreSection={handleRestoreSection}
                                    />
                                </div>
                                {!isExporting && <CVPageBreakOverlay />}
                            </CVDesignPreviewWrapper>
                        </div>
                    </div>

                    {/* ─── Zoom Controls (bottom-right) ─── */}
                    <div className="fixed bottom-6 right-6 flex items-center gap-2 bg-white dark:bg-[#1C252E] rounded-xl border border-gray-200 dark:border-white/10 shadow-lg px-3 py-1.5 z-20">
                        <button
                            onClick={() => setZoomLevel(zoomLevel - 10)}
                            disabled={zoomLevel <= 50}
                            className="p-1 text-gray-500 hover:text-gray-800 dark:hover:text-white disabled:opacity-30 transition-colors"
                        >
                            −
                        </button>
                        <span className="text-xs font-bold text-gray-600 dark:text-gray-300 w-10 text-center">
                            {zoomLevel}%
                        </span>
                        <button
                            onClick={() => setZoomLevel(zoomLevel + 10)}
                            disabled={zoomLevel >= 200}
                            className="p-1 text-gray-500 hover:text-gray-800 dark:hover:text-white disabled:opacity-30 transition-colors"
                        >
                            +
                        </button>
                    </div>
                </main>
            </div>

            {/* ─── Data Source Modal ─── */}
            <CVDataSourceModal
                isOpen={isDataSourceModalOpen}
                onClose={() => setDataSourceModalOpen(false)}
            />
        </div>
    );
}

/* ─────────────────────────────────────────── */
/*  Sidebar Tab Implementations                 */
/* ─────────────────────────────────────────── */

/** Sections tab — toggle visibility & reorder sections */
function SectionsTab() {
    const { cvData, designTokens, toggleSectionVisibility } = useCVBuilderStore();
    const { hiddenSections } = designTokens;

    const sections: { id: CVSection; label: string; icon: string; description: string }[] = [
        { id: "personal", label: "Thông tin cá nhân", icon: "👤", description: "Họ tên, email, SĐT, địa chỉ" },
        { id: "summary", label: "Giới thiệu bản thân", icon: "📝", description: "Tóm tắt về bản thân" },
        { id: "experience", label: "Kinh nghiệm làm việc", icon: "💼", description: `${cvData.experience.length} mục` },
        { id: "education", label: "Học vấn", icon: "🎓", description: `${cvData.education.length} mục` },
        { id: "skills", label: "Kỹ năng", icon: "⚡", description: `${cvData.skills.length} kỹ năng` },
        { id: "projects", label: "Dự án", icon: "📂", description: `${cvData.projects.length} dự án` },
        { id: "languages", label: "Ngôn ngữ", icon: "🌐", description: `${(cvData.languages || []).length} ngôn ngữ` },
        { id: "certifications", label: "Chứng chỉ", icon: "🏅", description: `${(cvData.certifications || []).length} chứng chỉ` },
        { id: "awards", label: "Giải thưởng", icon: "🏆", description: `${(cvData.awards || []).length} giải thưởng` },
    ];

    return (
        <div className="space-y-1.5">
            <p className="text-xs text-gray-400 mb-3">
                Ẩn/hiện các mục trong CV. Sửa nội dung trực tiếp trên bản xem trước bên phải.
            </p>

            {sections.map((section) => {
                const isHidden = hiddenSections.includes(section.id);

                return (
                    <div
                        key={section.id}
                        className={cn(
                            "flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-colors",
                            isHidden
                                ? "bg-gray-50 dark:bg-gray-800/50 opacity-50"
                                : "bg-green-50/50 dark:bg-green-900/10",
                        )}
                    >
                        <span className="text-base shrink-0">{section.icon}</span>
                        <div className="flex-1 min-w-0">
                            <h4 className="text-[13px] font-semibold text-gray-700 dark:text-gray-200 leading-tight truncate">
                                {section.label}
                            </h4>
                            <p className="text-[11px] text-gray-400 truncate">{section.description}</p>
                        </div>
                        <button
                            onClick={() => toggleSectionVisibility(section.id)}
                            className={cn(
                                "w-9 h-[20px] rounded-full transition-colors relative shrink-0",
                                isHidden ? "bg-gray-300 dark:bg-gray-600" : "bg-green-500",
                            )}
                        >
                            <span
                                className={cn(
                                    "absolute top-[2px] w-4 h-4 rounded-full bg-white shadow transition-transform",
                                    isHidden ? "left-[2px]" : "left-[18px]",
                                )}
                            />
                        </button>
                    </div>
                );
            })}
        </div>
    );
}

/** Layout tab — column layout picker */
function LayoutTab() {
    const { designTokens, updateToken } = useCVBuilderStore();

    return (
        <div className="space-y-4">
            <p className="text-xs text-gray-400">Chọn bố cục hiển thị cho CV</p>
            <div className="grid grid-cols-2 gap-3">
                {(["1-col", "2-col"] as const).map((layout) => (
                    <button
                        key={layout}
                        onClick={() => updateToken("columnLayout", layout)}
                        className={cn(
                            "p-4 rounded-xl border-2 transition-all",
                            designTokens.columnLayout === layout
                                ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                                : "border-gray-200 dark:border-gray-700 hover:border-gray-300",
                        )}
                    >
                        <div className={cn("flex gap-1 mb-2", layout === "2-col" && "")}>
                            {layout === "1-col" ? (
                                <div className="w-full h-16 bg-gray-200 dark:bg-gray-600 rounded" />
                            ) : (
                                <>
                                    <div className="w-1/3 h-16 bg-gray-300 dark:bg-gray-500 rounded" />
                                    <div className="w-2/3 h-16 bg-gray-200 dark:bg-gray-600 rounded" />
                                </>
                            )}
                        </div>
                        <p className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                            {layout === "1-col" ? "Một cột" : "Hai cột"}
                        </p>
                    </button>
                ))}
            </div>
        </div>
    );
}

/** Templates tab — switch template without losing data */
function TemplatesTab() {
    const { selectedTemplateId, selectTemplate, setView } = useCVBuilderStore();

    const templateEntries = React.useMemo(
        () => Object.entries(TEMPLATE_REGISTRY).map(([id, entry]) => ({
            id,
            name: entry.manifest.name,
        })),
        [],
    );

    return (
        <div className="space-y-3">
            <p className="text-xs text-gray-400">Đổi mẫu mà không mất dữ liệu</p>
            <div className="grid grid-cols-2 gap-2">
                {templateEntries.map((t) => (
                    <button
                        key={t.id}
                        onClick={() => {
                            // Just change the template ID, keep data
                            useCVBuilderStore.setState({
                                selectedTemplateId: t.id,
                                currentView: "editor",
                            });
                        }}
                        className={cn(
                            "p-3 rounded-xl border-2 transition-all text-left",
                            selectedTemplateId === t.id
                                ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                                : "border-gray-200 dark:border-gray-700 hover:border-gray-300",
                        )}
                    >
                        {/* Miniature preview */}
                        <div className="aspect-[210/297] bg-gray-100 dark:bg-gray-800 rounded-lg mb-2 flex items-center justify-center">
                            <span className="text-[10px] text-gray-400">{t.id}</span>
                        </div>
                        <p className="text-xs font-semibold text-gray-700 dark:text-gray-200 truncate">
                            {t.name}
                        </p>
                        {selectedTemplateId === t.id && (
                            <span className="text-[10px] text-green-500 font-bold">✓ Đang dùng</span>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
