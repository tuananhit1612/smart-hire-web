"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Image, X, Check, Camera } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

interface CoverUploadModalProps {
    currentCover?: string;
    onUpload: (file: File | null, url?: string) => void;
    onClose: () => void;
}

// Sample cover images for quick selection
const SAMPLE_COVERS = [
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=400&fit=crop",
    "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&h=400&fit=crop",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=400&fit=crop",
    "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=1200&h=400&fit=crop",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&h=400&fit=crop",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=400&fit=crop",
];

export function CoverUploadModal({ currentCover, onUpload, onClose }: CoverUploadModalProps) {
    const [preview, setPreview] = React.useState<string | null>(null);
    const [selectedSample, setSelectedSample] = React.useState<string | null>(null);
    const [isDragging, setIsDragging] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleFileSelect = (file: File) => {
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
                setSelectedSample(null);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) handleFileSelect(file);
    };

    const handleSampleSelect = (url: string) => {
        setSelectedSample(url);
        setPreview(null);
    };

    const handleSave = () => {
        if (selectedSample) {
            onUpload(null, selectedSample);
        } else if (preview) {
            // In a real app, you'd upload the file and get a URL
            onUpload(null, preview);
        }
        onClose();
    };

    const displayImage = preview || selectedSample || currentCover;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#1C252E] rounded-3xl shadow-2xl"
                >
                    {/* Header */}
                    <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-white dark:bg-[#1C252E] border-b border-[rgba(145,158,171,0.12)] dark:border-white/[0.08]">
                        <h2 className="text-xl font-bold text-[#1C252E] dark:text-white flex items-center gap-2">
                            <Image className="w-5 h-5 text-[#22c55e]" />
                            Đổi ảnh bìa
                        </h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-[#22c55e]/10 dark:hover:bg-white/[0.06] rounded-full transition-colors"
                        >
                            <X className="w-5 h-5 text-[#22c55e] dark:text-[#C4CDD5]" />
                        </button>
                    </div>

                    <div className="p-6 space-y-6">
                        {/* Preview */}
                        {displayImage && (
                            <div className="relative h-48 rounded-2xl overflow-hidden">
                                <img
                                    src={displayImage}
                                    alt="Cover Preview"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                                <div className="absolute bottom-3 left-3 px-3 py-1 bg-white/90 dark:bg-[#1C252E]/90 rounded-full text-sm font-medium text-[#22c55e] dark:text-[#C4CDD5]">
                                    Xem trước
                                </div>
                            </div>
                        )}

                        {/* Upload Zone */}
                        <div
                            onDrop={handleDrop}
                            onDragOver={(e) => {
                                e.preventDefault();
                                setIsDragging(true);
                            }}
                            onDragLeave={() => setIsDragging(false)}
                            onClick={() => inputRef.current?.click()}
                            className={`relative p-8 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${isDragging
                                    ? "border-[#22c55e]/30 bg-[#22c55e]/10 dark:bg-[#22c55e]/20"
                                    : "border-[#22c55e]/30 dark:border-white/[0.08] hover:border-[#22c55e]/30 dark:hover:border-white/[0.16] hover:bg-[#22c55e]/10 dark:hover:bg-white/[0.02]"
                                }`}
                        >
                            <div className="flex flex-col items-center gap-3 text-center">
                                <div className="w-14 h-14 rounded-full bg-[#22c55e]/15 dark:bg-[#22c55e]/20 flex items-center justify-center">
                                    <Upload className="w-6 h-6 text-[#22c55e] dark:text-[#22c55e]" />
                                </div>
                                <div>
                                    <p className="font-medium text-[#1C252E] dark:text-white">
                                        Kéo thả ảnh vào đây hoặc nhấn để chọn
                                    </p>
                                    <p className="text-sm text-[#22c55e] dark:text-[#919EAB] mt-1">
                                        PNG, JPG tối đa 5MB. Kích thước đề xuất: 1200x400px
                                    </p>
                                </div>
                            </div>
                            <input
                                ref={inputRef}
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) handleFileSelect(file);
                                }}
                                className="hidden"
                            />
                        </div>

                        {/* Sample Images */}
                        <div>
                            <h3 className="text-sm font-medium text-[#22c55e] dark:text-[#C4CDD5] mb-3">
                                Hoặc chọn từ thư viện
                            </h3>
                            <div className="grid grid-cols-3 gap-3">
                                {SAMPLE_COVERS.map((url, index) => (
                                    <motion.button
                                        key={index}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => handleSampleSelect(url)}
                                        className={`relative h-24 rounded-xl overflow-hidden border-2 transition-all ${selectedSample === url
                                                ? "border-[#22c55e]/30 ring-2 ring-[#22c55e]/50"
                                                : "border-transparent hover:border-[#22c55e]/30"
                                            }`}
                                    >
                                        <img
                                            src={url}
                                            alt={`Sample ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                        {selectedSample === url && (
                                            <div className="absolute inset-0 bg-[#22c55e]/20 flex items-center justify-center">
                                                <Check className="w-6 h-6 text-white drop-shadow-lg" />
                                            </div>
                                        )}
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3 pt-4 border-t border-[rgba(145,158,171,0.12)] dark:border-white/[0.08]">
                            <Button
                                onClick={handleSave}
                                disabled={!preview && !selectedSample}
                                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-full py-3 disabled:opacity-50"
                            >
                                <Check className="w-4 h-4 mr-2" />
                                Áp dụng
                            </Button>
                            <Button
                                onClick={onClose}
                                variant="outline"
                                className="flex-1 rounded-full py-3 border-[#22c55e]/30 dark:border-white/[0.08] dark:text-[#C4CDD5] dark:hover:bg-white/[0.04]"
                            >
                                <X className="w-4 h-4 mr-2" />
                                Hủy bỏ
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

