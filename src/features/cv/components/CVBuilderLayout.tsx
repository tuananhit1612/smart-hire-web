"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Save, Download, Menu, X } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { ParticleBackground } from "@/shared/components/effects/ParticleBackground";
import { exportToPDF } from "../utils/export-to-pdf";

import { Header } from "@/shared/components/layout/Header";

interface CVBuilderLayoutProps {
    sidebar: React.ReactNode;
    form: React.ReactNode;
    preview?: React.ReactNode;
    headerToolbar?: React.ReactNode;
    onSave?: () => void;
    onPreview?: () => void;
    isSaving?: boolean;
    autosaveIndicator?: React.ReactNode;
}

export function CVBuilderLayout({
    sidebar,
    form,
    preview,
    headerToolbar,
    onSave,
    onPreview,
    isSaving = false,
    autosaveIndicator,
}: CVBuilderLayoutProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    return (
        <div className="relative min-h-screen bg-white">
            <ParticleBackground />

            {/* Global Header */}
            <Header />

            {/* Main Layout Content - Add padding top to account for Global Header */}
            <div className="pt-24 lg:pt-28">
                {/* Header Bar */}
                <header id="cv-builder-header" className="sticky top-0 z-30 border-b border-gray-100 bg-white/80 backdrop-blur-xl">
                    <div className="max-w-[1800px] mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between gap-4">
                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-5 h-5 text-gray-700" />
                            ) : (
                                <Menu className="w-5 h-5 text-gray-700" />
                            )}
                        </button>

                        {/* Title */}
                        <div className="flex-1 min-w-0">
                            <h1 className="text-lg md:text-2xl font-bold tracking-tight text-sky-900 truncate">
                                CV Builder
                            </h1>
                            <p className="text-xs md:text-sm text-sky-700 invisible sm:visible block">
                                Tạo CV chuyên nghiệp theo chuẩn ATS
                            </p>
                        </div>

                        {/* Flex Container for Toolbar + Actions */}
                        <div className="flex items-center gap-4 flex-shrink-0">

                            {/* Injected Toolbar (Zoom/Pan) */}
                            {headerToolbar && (
                                <div className="hidden md:flex items-center gap-2 mr-2 border-r border-gray-200 pr-4">
                                    {headerToolbar}
                                </div>
                            )}

                            {/* Autosave Indicator */}
                            {autosaveIndicator && (
                                <div id="autosave-indicator" className="hidden lg:block flex-shrink-0">
                                    {autosaveIndicator}
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex items-center gap-2 md:gap-3">
                                <Button
                                    id="preview-button"
                                    variant="outline"
                                    size="sm"
                                    leftIcon={<Eye className="w-4 h-4" />}
                                    onClick={onPreview}
                                    className="hidden sm:inline-flex border-sky-200 hover:bg-sky-50 text-sky-700 hover:border-sky-300 transition-all hover:scale-105 active:scale-95"
                                >
                                    Xem trước
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={onPreview}
                                    className="sm:hidden border-sky-200 text-sky-700 transition-all hover:scale-105 active:scale-95"
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
                                    className="hidden sm:inline-flex bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/20 border-none transition-all hover:scale-105 active:scale-95"
                                >
                                    Lưu CV
                                </Button>
                                <Button
                                    variant="primary"
                                    size="icon"
                                    onClick={onSave}
                                    isLoading={isSaving}
                                    className="sm:hidden bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/20 border-none transition-all hover:scale-105 active:scale-95"
                                >
                                    <Save className="w-4 h-4" />
                                </Button>
                            </div>
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
                    className="fixed top-0 left-0 z-50 h-full w-[280px] bg-white shadow-2xl lg:hidden overflow-y-auto"
                >
                    <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                        <h2 className="font-semibold text-gray-900">Các mục CV</h2>
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="p-2 rounded-lg hover:bg-gray-100"
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
                                <div id="cv-section-nav" className="bg-white/80 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl p-4">
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
                            <div id="cv-builder-form" className="bg-white/80 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl md:rounded-3xl p-4 md:p-8">
                                {form}
                            </div>
                        </motion.main>

                        {/* Right Sidebar - Preview (Desktop XL Only) */}
                        {preview && (
                            <motion.aside
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="w-[420px] flex-shrink-0 hidden xl:block"
                            >
                                <div className="sticky top-28">
                                    <div id="cv-preview-panel" className="bg-white/80 backdrop-blur-2xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl overflow-hidden flex flex-col h-[800px]">
                                        {/* Toolbar */}
                                        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white/50 backdrop-blur-md z-10">
                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-green-400 to-emerald-500 shadow-lg shadow-green-500/20 text-white">
                                                    <Eye className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <h3 className="text-sm font-bold text-gray-800">Bản xem trước</h3>
                                                    <p className="text-[10px] text-gray-500 font-medium tracking-wide uppercase">Live Preview</p>
                                                </div>
                                            </div>

                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="bg-white hover:bg-green-50 text-green-700 border-green-200 hover:border-green-300 shadow-sm transition-all hover:scale-105 active:scale-95 gap-2"
                                                onClick={async () => {
                                                    const btn = document.getElementById('btn-export-pdf');
                                                    if (btn) {
                                                        const originalText = btn.innerText;
                                                        btn.innerText = 'Đang xuất...';
                                                        btn.setAttribute('disabled', 'true');

                                                        await exportToPDF('cv-pdf-content', 'smarthire-cv.pdf');

                                                        btn.innerText = originalText;
                                                        btn.removeAttribute('disabled');
                                                    } else {
                                                        exportToPDF('cv-pdf-content', 'smarthire-cv.pdf');
                                                    }
                                                }}
                                            >
                                                <div id="btn-export-pdf" className="flex items-center gap-2">
                                                    <Download className="w-4 h-4" />
                                                    <span className="font-semibold">Xuất PDF</span>
                                                </div>
                                            </Button>
                                        </div>

                                        {/* Canvas Area */}
                                        <div className="flex-1 overflow-hidden bg-slate-50 relative group">
                                            {/* decorative grid pattern */}
                                            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

                                            <div className="h-full w-full flex items-center justify-center p-6">
                                                <div id="cv-pdf-content" className="h-full w-full shadow-2xl shadow-slate-200/50 bg-white transition-transform duration-300 ease-out origin-top hover:scale-[1.02]">
                                                    {preview}
                                                </div>
                                            </div>

                                            {/* Hover Overlay Hint */}
                                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/70 backdrop-blur-md rounded-full text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none translate-y-2 group-hover:translate-y-0 duration-300">
                                                Cuộn hoặc thu phóng để xem chi tiết
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.aside>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
