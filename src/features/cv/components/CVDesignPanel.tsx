"use client";

import * as React from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import {
    LayoutGrid,
    Palette,
    Type,
    Layers,
    GripVertical,
    Eye,
    EyeOff,
    RotateCcw,
    Check,
    Minus,
    Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
    CVSection,
    CVDesignTokens,
    CV_SECTIONS,
    FONT_OPTIONS,
    ACCENT_PRESETS,
} from "@/features/cv/types/types";
import type { UseCVDesignReturn } from "@/features/cv/hooks/useCVDesign";

// ─── Tabs ───────────────────────────────────────────────────────────────────

const TABS = [
    { id: "sections", label: "Bố cục", icon: LayoutGrid },
    { id: "style", label: "Phong cách", icon: Palette },
    { id: "typography", label: "Font chữ", icon: Type },
    { id: "layout", label: "Bố trí", icon: Layers },
] as const;

type TabId = (typeof TABS)[number]["id"];

// ─── Main Component ─────────────────────────────────────────────────────────

interface CVDesignPanelProps {
    design: UseCVDesignReturn;
    onSectionClick?: (section: CVSection) => void;
}

export function CVDesignPanel({ design, onSectionClick }: CVDesignPanelProps) {
    const [activeTab, setActiveTab] = React.useState<TabId>("sections");
    const { designTokens, updateToken, toggleSectionVisibility, reorderSections, resetTokens } = design;

    return (
        <div className="flex flex-col h-full">
            {/* Tab bar */}
            <div className="flex items-center gap-1 px-3 py-2 border-b border-gray-100 dark:border-white/[0.06] bg-gray-50/50 dark:bg-white/[0.02]">
                {TABS.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                                isActive
                                    ? "text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-500/15"
                                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/[0.04]"
                            )}
                        >
                            <Icon className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">{tab.label}</span>
                        </button>
                    );
                })}

                {/* Reset button */}
                <button
                    onClick={resetTokens}
                    className="ml-auto p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors cursor-pointer"
                    title="Đặt lại về mặc định"
                >
                    <RotateCcw className="w-3.5 h-3.5" />
                </button>
            </div>

            {/* Tab content */}
            <div className="flex-1 overflow-y-auto p-5 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700">
                <AnimatePresence mode="wait">
                    {activeTab === "sections" && (
                        <TabPanel key="sections">
                            <SectionsTab
                                designTokens={designTokens}
                                onToggle={toggleSectionVisibility}
                                onReorder={reorderSections}
                                onSectionClick={onSectionClick}
                            />
                        </TabPanel>
                    )}
                    {activeTab === "style" && (
                        <TabPanel key="style">
                            <StyleTab designTokens={designTokens} updateToken={updateToken} />
                        </TabPanel>
                    )}
                    {activeTab === "typography" && (
                        <TabPanel key="typography">
                            <TypographyTab designTokens={designTokens} updateToken={updateToken} />
                        </TabPanel>
                    )}
                    {activeTab === "layout" && (
                        <TabPanel key="layout">
                            <LayoutTab designTokens={designTokens} updateToken={updateToken} />
                        </TabPanel>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

// ─── Tab Panel Wrapper ──────────────────────────────────────────────────────

function TabPanel({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
        >
            {children}
        </motion.div>
    );
}

// ═════════════════════════════════════════════════════════════════════════════
// Tab 1 — Sections  (Drag-to-Reorder + Toggle Visibility)
// ═════════════════════════════════════════════════════════════════════════════

function SectionsTab({
    designTokens,
    onToggle,
    onReorder,
    onSectionClick,
}: {
    designTokens: CVDesignTokens;
    onToggle: (s: CVSection) => void;
    onReorder: (order: CVSection[]) => void;
    onSectionClick?: (s: CVSection) => void;
}) {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                    Sắp xếp mục CV
                </h3>
                <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">
                    Kéo để sắp xếp
                </span>
            </div>

            <Reorder.Group
                axis="y"
                values={designTokens.sectionOrder}
                onReorder={onReorder}
                className="space-y-1.5"
            >
                {designTokens.sectionOrder.map((sectionId) => {
                    const sectionMeta = CV_SECTIONS.find((s) => s.id === sectionId);
                    if (!sectionMeta) return null;
                    const isHidden = designTokens.hiddenSections.includes(sectionId);
                    const isPersonal = sectionId === "personal";

                    return (
                        <Reorder.Item
                            key={sectionId}
                            value={sectionId}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all group",
                                isHidden
                                    ? "bg-gray-50 dark:bg-white/[0.02] border-gray-100 dark:border-white/[0.04] opacity-50"
                                    : "bg-white dark:bg-[#1C252E] border-gray-200 dark:border-white/[0.08] shadow-sm hover:shadow-md hover:border-green-300 dark:hover:border-green-500/30"
                            )}
                        >
                            {/* Drag handle */}
                            <div className="cursor-grab active:cursor-grabbing text-gray-300 dark:text-gray-600 group-hover:text-gray-400">
                                <GripVertical className="w-4 h-4" />
                            </div>

                            {/* Section label */}
                            <button
                                onClick={() => onSectionClick?.(sectionId)}
                                className="flex-1 text-left cursor-pointer"
                            >
                                <span className={cn(
                                    "text-sm font-medium",
                                    isHidden
                                        ? "text-gray-400 dark:text-gray-500 line-through"
                                        : "text-gray-800 dark:text-gray-200"
                                )}>
                                    {sectionMeta.title}
                                </span>
                                <span className="block text-[11px] text-gray-400 dark:text-gray-500 mt-0.5">
                                    {sectionMeta.description}
                                </span>
                            </button>

                            {/* Toggle visibility */}
                            {!isPersonal && (
                                <button
                                    onClick={() => onToggle(sectionId)}
                                    className={cn(
                                        "p-1.5 rounded-lg transition-colors cursor-pointer",
                                        isHidden
                                            ? "text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-white/[0.06]"
                                            : "text-green-500 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-500/10"
                                    )}
                                    title={isHidden ? "Hiện mục này" : "Ẩn mục này"}
                                >
                                    {isHidden ? (
                                        <EyeOff className="w-4 h-4" />
                                    ) : (
                                        <Eye className="w-4 h-4" />
                                    )}
                                </button>
                            )}
                        </Reorder.Item>
                    );
                })}
            </Reorder.Group>
        </div>
    );
}

// ═════════════════════════════════════════════════════════════════════════════
// Tab 2 — Style  (Accent Color + Spacing)
// ═════════════════════════════════════════════════════════════════════════════

function StyleTab({
    designTokens,
    updateToken,
}: {
    designTokens: CVDesignTokens;
    updateToken: UseCVDesignReturn["updateToken"];
}) {
    return (
        <div className="space-y-6">
            {/* Accent color */}
            <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                    Màu nhấn
                </h3>
                <div className="grid grid-cols-5 gap-2.5">
                    {ACCENT_PRESETS.map((color) => {
                        const isActive = designTokens.accentColor === color;
                        return (
                            <button
                                key={color}
                                onClick={() => updateToken("accentColor", color)}
                                className={cn(
                                    "w-full aspect-square rounded-xl border-2 transition-all relative cursor-pointer hover:scale-110",
                                    isActive
                                        ? "border-gray-800 dark:border-white shadow-lg scale-110"
                                        : "border-transparent hover:border-gray-300 dark:hover:border-white/30"
                                )}
                                style={{ backgroundColor: color }}
                                title={color}
                            >
                                {isActive && (
                                    <Check className="w-4 h-4 text-white absolute inset-0 m-auto drop-shadow-md" />
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Custom color picker */}
                <div className="flex items-center gap-3 mt-2">
                    <label className="text-xs text-gray-500 dark:text-gray-400">
                        Tùy chỉnh:
                    </label>
                    <input
                        type="color"
                        value={designTokens.accentColor}
                        onChange={(e) => updateToken("accentColor", e.target.value)}
                        className="w-8 h-8 rounded-lg border-0 cursor-pointer"
                    />
                    <span className="text-xs font-mono text-gray-500 dark:text-gray-400 uppercase">
                        {designTokens.accentColor}
                    </span>
                </div>
            </div>

            {/* Spacing */}
            <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                    Khoảng cách
                </h3>
                <div className="grid grid-cols-3 gap-2">
                    {(["compact", "normal", "relaxed"] as const).map((spacing) => {
                        const labels = { compact: "Chặt", normal: "Thường", relaxed: "Rộng" };
                        const isActive = designTokens.spacing === spacing;
                        return (
                            <button
                                key={spacing}
                                onClick={() => updateToken("spacing", spacing)}
                                className={cn(
                                    "px-4 py-2.5 rounded-xl text-xs font-semibold border-2 transition-all cursor-pointer",
                                    isActive
                                        ? "border-green-500 bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400"
                                        : "border-gray-200 dark:border-white/[0.08] text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-white/[0.12]"
                                )}
                            >
                                {labels[spacing]}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Header style */}
            <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                    Kiểu phần đầu
                </h3>
                <div className="grid grid-cols-3 gap-2">
                    {(["classic", "modern", "minimal"] as const).map((style) => {
                        const labels = { classic: "Cổ điển", modern: "Hiện đại", minimal: "Tối giản" };
                        const isActive = designTokens.headerStyle === style;
                        return (
                            <button
                                key={style}
                                onClick={() => updateToken("headerStyle", style)}
                                className={cn(
                                    "px-4 py-2.5 rounded-xl text-xs font-semibold border-2 transition-all cursor-pointer",
                                    isActive
                                        ? "border-green-500 bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400"
                                        : "border-gray-200 dark:border-white/[0.08] text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-white/[0.12]"
                                )}
                            >
                                {labels[style]}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

// ═════════════════════════════════════════════════════════════════════════════
// Tab 3 — Typography  (Font Family + Size Scale)
// ═════════════════════════════════════════════════════════════════════════════

function TypographyTab({
    designTokens,
    updateToken,
}: {
    designTokens: CVDesignTokens;
    updateToken: UseCVDesignReturn["updateToken"];
}) {
    return (
        <div className="space-y-6">
            {/* Font family */}
            <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                    Font chữ
                </h3>
                <div className="space-y-1.5">
                    {FONT_OPTIONS.map((font) => {
                        const isActive = designTokens.fontFamily === font.id;
                        return (
                            <button
                                key={font.id}
                                onClick={() => updateToken("fontFamily", font.id)}
                                className={cn(
                                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all cursor-pointer text-left",
                                    isActive
                                        ? "border-green-500 bg-green-50 dark:bg-green-500/10"
                                        : "border-gray-100 dark:border-white/[0.06] hover:border-gray-200 dark:hover:border-white/[0.1]"
                                )}
                            >
                                <div
                                    className="text-lg font-semibold text-gray-800 dark:text-gray-200 leading-none"
                                    style={{ fontFamily: font.family }}
                                >
                                    Aa
                                </div>
                                <div className="flex-1">
                                    <div className={cn(
                                        "text-sm font-medium",
                                        isActive ? "text-green-700 dark:text-green-400" : "text-gray-700 dark:text-gray-300"
                                    )}>
                                        {font.label}
                                    </div>
                                </div>
                                {isActive && (
                                    <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                                        <Check className="w-3 h-3 text-white" />
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Font size scale */}
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                        Cỡ chữ
                    </h3>
                    <span className="text-xs font-mono text-gray-400">
                        {Math.round(designTokens.fontSize * 100)}%
                    </span>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() =>
                            updateToken("fontSize", Math.max(0.8, designTokens.fontSize - 0.05))
                        }
                        className="p-2 rounded-lg border border-gray-200 dark:border-white/[0.08] text-gray-500 hover:bg-gray-50 dark:hover:bg-white/[0.04] transition-colors cursor-pointer"
                    >
                        <Minus className="w-3.5 h-3.5" />
                    </button>
                    <input
                        type="range"
                        min={0.8}
                        max={1.2}
                        step={0.05}
                        value={designTokens.fontSize}
                        onChange={(e) => updateToken("fontSize", parseFloat(e.target.value))}
                        className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer accent-green-500"
                    />
                    <button
                        onClick={() =>
                            updateToken("fontSize", Math.min(1.2, designTokens.fontSize + 0.05))
                        }
                        className="p-2 rounded-lg border border-gray-200 dark:border-white/[0.08] text-gray-500 hover:bg-gray-50 dark:hover:bg-white/[0.04] transition-colors cursor-pointer"
                    >
                        <Plus className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>
        </div>
    );
}

// ═════════════════════════════════════════════════════════════════════════════
// Tab 4 — Layout  (Column layout)
// ═════════════════════════════════════════════════════════════════════════════

function LayoutTab({
    designTokens,
    updateToken,
}: {
    designTokens: CVDesignTokens;
    updateToken: UseCVDesignReturn["updateToken"];
}) {
    return (
        <div className="space-y-6">
            {/* Column layout */}
            <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                    Bố trí cột
                </h3>
                <div className="grid grid-cols-2 gap-3">
                    {(["1-col", "2-col"] as const).map((layout) => {
                        const isActive = designTokens.columnLayout === layout;
                        return (
                            <button
                                key={layout}
                                onClick={() => updateToken("columnLayout", layout)}
                                className={cn(
                                    "flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer",
                                    isActive
                                        ? "border-green-500 bg-green-50 dark:bg-green-500/10"
                                        : "border-gray-200 dark:border-white/[0.08] hover:border-gray-300 dark:hover:border-white/[0.12]"
                                )}
                            >
                                {/* Mini preview diagram */}
                                <div className="w-full aspect-[3/4] rounded-lg border border-gray-200 dark:border-white/[0.1] bg-white dark:bg-[#1C252E] p-2 flex gap-1">
                                    {layout === "1-col" ? (
                                        <div className="flex-1 flex flex-col gap-1">
                                            <div className="h-3 rounded bg-gray-200 dark:bg-white/[0.1]" />
                                            <div className="h-2 rounded bg-gray-100 dark:bg-white/[0.05]" />
                                            <div className="h-2 rounded bg-gray-100 dark:bg-white/[0.05]" />
                                            <div className="flex-1 rounded bg-gray-50 dark:bg-white/[0.03]" />
                                        </div>
                                    ) : (
                                        <>
                                            <div className="w-1/3 flex flex-col gap-1">
                                                <div className="h-3 rounded bg-gray-200 dark:bg-white/[0.1]" />
                                                <div className="flex-1 rounded bg-gray-50 dark:bg-white/[0.03]" />
                                            </div>
                                            <div className="flex-1 flex flex-col gap-1">
                                                <div className="h-2 rounded bg-gray-100 dark:bg-white/[0.05]" />
                                                <div className="h-2 rounded bg-gray-100 dark:bg-white/[0.05]" />
                                                <div className="flex-1 rounded bg-gray-50 dark:bg-white/[0.03]" />
                                            </div>
                                        </>
                                    )}
                                </div>
                                <span className={cn(
                                    "text-xs font-semibold",
                                    isActive
                                        ? "text-green-700 dark:text-green-400"
                                        : "text-gray-600 dark:text-gray-400"
                                )}>
                                    {layout === "1-col" ? "1 Cột" : "2 Cột"}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Info box */}
            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20">
                <p className="text-xs text-blue-700 dark:text-blue-400 leading-relaxed">
                    💡 Bố trí cột chỉ áp dụng khi mẫu CV hỗ trợ. Một số mẫu sẽ giữ bố cục riêng.
                </p>
            </div>
        </div>
    );
}
