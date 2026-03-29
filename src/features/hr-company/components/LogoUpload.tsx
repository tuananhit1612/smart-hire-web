"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Upload, Camera, X, Check } from "lucide-react";
import { getImageUrl } from "@/shared/lib/api-client";

interface LogoUploadProps {
    currentLogo?: string;
    onLogoChange?: (urlOrFile: string | File | null) => void;
    size?: "sm" | "md" | "lg";
    editable?: boolean;
}

export function LogoUpload({
    currentLogo,
    onLogoChange,
    size = "lg",
    editable = true,
}: LogoUploadProps) {
    const [preview, setPreview] = React.useState<string | null>(null);
    const [isDragging, setIsDragging] = React.useState(false);
    const [isHovered, setIsHovered] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const sizeClasses = {
        sm: "w-16 h-16",
        md: "w-24 h-24",
        lg: "w-32 h-32",
    };

    const iconSizes = {
        sm: "w-6 h-6",
        md: "w-8 h-8",
        lg: "w-10 h-10",
    };

    const handleFileSelect = (file: File) => {
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const dataUrl = reader.result as string;
                setPreview(dataUrl);
                // Call with the actual File object to trigger multipart upload
                onLogoChange?.(file);
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

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleClick = () => {
        if (editable) {
            inputRef.current?.click();
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFileSelect(file);
    };

    const clearLogo = (e: React.MouseEvent) => {
        e.stopPropagation();
        setPreview(null);
        onLogoChange?.(null);
    };

    const displayImage = preview ? preview : getImageUrl(currentLogo);

    return (
        <div
            className={`relative ${sizeClasses[size]} rounded-md overflow-hidden group`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
        >
            {/* Background */}
            <div
                className={`absolute inset-0 transition-all duration-300 ${isDragging
                    ? "bg-[#22c55e]/15 dark:bg-[#22c55e]/20 border-2 border-dashed border-[#22c55e]/30"
                    : displayImage
                        ? "bg-transparent"
                        : "bg-gradient-to-br from-[rgba(145,158,171,0.04)] to-white dark:from-[rgba(145,158,171,0.04)] dark:to-[#1C252E] border-2 border-dashed border-[#22c55e]/30 dark:border-white/[0.08]"
                    }`}
            />

            {/* Logo Image or Placeholder */}
            {displayImage ? (
                <img
                    src={displayImage}
                    alt="Company Logo"
                    className="absolute inset-0 w-full h-full object-cover"
                />
            ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-[#22c55e] dark:text-[#22c55e]">
                    <Upload className={iconSizes[size]} />
                    {size === "lg" && (
                        <span className="text-xs mt-1 font-medium">Upload Logo</span>
                    )}
                </div>
            )}

            {/* Edit Button Corner Overlay */}
            {editable && (
                <button
                    onClick={handleClick}
                    className="absolute bottom-1 right-1 p-1.5 bg-white dark:bg-[#1C252E] rounded-full shadow border border-gray-200 dark:border-gray-700 text-gray-500 hover:text-green-500 transition-colors z-10"
                    title="Đổi Logo"
                >
                    <Camera className="w-4 h-4" />
                </button>
            )}


            {/* Drag Indicator */}
            {isDragging && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 flex items-center justify-center bg-[#22c55e]/20"
                >
                    <div className="bg-white rounded-xl px-3 py-2 shadow-lg flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-medium text-[#22c55e] dark:text-[#22c55e]">Thả để upload</span>
                    </div>
                </motion.div>
            )}

            {/* Hidden Input */}
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={handleInputChange}
                className="hidden"
            />
        </div>
    );
}

