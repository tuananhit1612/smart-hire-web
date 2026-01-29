"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Eye, Save, Download, Menu, X } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

interface CVBuilderLayoutProps {
    sidebar: React.ReactNode;
    form: React.ReactNode;
    preview?: React.ReactNode;
    onSave?: () => void;
    onPreview?: () => void;
    isSaving?: boolean;
    autosaveIndicator?: React.ReactNode;
}

export function CVBuilderLayout({
    sidebar,
    form,
    preview,
    onSave,
    onPreview,
    isSaving = false,
    autosaveIndicator,
}: CVBuilderLayoutProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    return (
        <div className="relative min-h-screen bg-slate-50 dark:bg-[#0B0F19]">
            {/* Aurora Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[10%] h-[400px] w-[400px] md:h-[600px] md:w-[600px] rounded-full bg-indigo-500/15 blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[20%] h-[300px] w-[300px] md:h-[500px] md:w-[500px] rounded-full bg-purple-500/15 blur-[100px] animate-pulse" />
                <div className="absolute top-[40%] right-[-10%] h-[250px] w-[250px] md:h-[400px] md:w-[400px] rounded-full bg-pink-500/10 blur-[80px] animate-pulse" />
            </div>

            {/* Header Bar */}
            <header className="sticky top-0 z-50 border-b border-gray-200/50 dark:border-white/10 bg-white/80 dark:bg-[#0B0F19]/80 backdrop-blur-xl">
                <div className="max-w-[1800px] mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between gap-4">
                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                    >
                        {isMobileMenuOpen ? (
                            <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                        ) : (
                            <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                        )}
                    </button>

                    {/* Title */}
                    <div className="flex-1 min-w-0">
                        <h1 className="text-lg md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white truncate">
                            CV Builder
                        </h1>
                        <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 hidden sm:block">
                            Tạo CV chuyên nghiệp theo chuẩn ATS
                        </p>
                    </div>

                    {/* Autosave Indicator */}
                    {autosaveIndicator && (
                        <div id="autosave-indicator" className="flex-shrink-0">
                            {autosaveIndicator}
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
                        <Button
                            id="preview-button"
                            variant="outline"
                            size="sm"
                            leftIcon={<Eye className="w-4 h-4" />}
                            onClick={onPreview}
                            className="hidden sm:inline-flex"
                        >
                            Xem trước
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={onPreview}
                            className="sm:hidden"
                        >
                            <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                            id="save-button"
                            variant="primary"
                            size="sm"
                            leftIcon={<Save className="w-4 h-4" />}
                            onClick={onSave}
                            isLoading={isSaving}
                            className="hidden sm:inline-flex"
                        >
                            Lưu CV
                        </Button>
                        <Button
                            variant="primary"
                            size="icon"
                            onClick={onSave}
                            isLoading={isSaving}
                            className="sm:hidden"
                        >
                            <Save className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </header>

            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Mobile Sidebar Drawer */}
            <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: isMobileMenuOpen ? 0 : "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="fixed top-0 left-0 z-50 h-full w-[280px] bg-white dark:bg-[#0B0F19] shadow-2xl lg:hidden overflow-y-auto"
            >
                <div className="p-4 border-b border-gray-200 dark:border-white/10 flex items-center justify-between">
                    <h2 className="font-semibold text-gray-900 dark:text-white">Các mục CV</h2>
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>
                <div className="p-4" onClick={() => setIsMobileMenuOpen(false)}>
                    {sidebar}
                </div>
            </motion.div>

            {/* Main Content */}
            <div className="relative z-10 max-w-[1800px] mx-auto px-4 md:px-6 py-4 md:py-8">
                <div className="flex flex-col lg:flex-row gap-4 md:gap-8">
                    {/* Left Sidebar - Navigation (Desktop Only) */}
                    <motion.aside
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="hidden lg:block w-[280px] flex-shrink-0"
                    >
                        <div className="sticky top-28">
                            <div id="cv-section-nav" className="bg-white/60 dark:bg-black/40 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-3xl p-4">
                                {sidebar}
                            </div>
                        </div>
                    </motion.aside>

                    {/* Center - Form */}
                    <motion.main
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="flex-1 min-w-0"
                    >
                        <div id="cv-builder-form" className="bg-white/60 dark:bg-black/40 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-2xl md:rounded-3xl p-4 md:p-8">
                            {form}
                        </div>
                    </motion.main>

                    {/* Right Sidebar - Preview (Desktop XL Only) */}
                    {preview && (
                        <motion.aside
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="w-[400px] flex-shrink-0 hidden xl:block"
                        >
                            <div className="sticky top-28">
                                <div id="cv-preview-panel" className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-xl rounded-3xl overflow-hidden">
                                    <div className="p-4 border-b border-gray-200 dark:border-zinc-800 flex items-center justify-between">
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Xem trước
                                        </span>
                                        <Button variant="ghost" size="sm" leftIcon={<Download className="w-3 h-3" />}>
                                            PDF
                                        </Button>
                                    </div>
                                    <div className="p-4 h-[600px] overflow-auto">
                                        {preview}
                                    </div>
                                </div>
                            </div>
                        </motion.aside>
                    )}
                </div>
            </div>
        </div>
    );
}
