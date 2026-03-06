"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Upload, Camera, X, Check } from "lucide-react";

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
                // Call with data URL string for immediate preview update
                onLogoChange?.(dataUrl);
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

    const displayImage = preview || currentLogo;

    return (
        <motion.div
            className={`relative ${sizeClasses[size]} rounded-2xl overflow-hidden cursor-pointer group`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            whileHover={{ scale: editable ? 1.05 : 1 }}
            whileTap={{ scale: editable ? 0.98 : 1 }}
        >
            {/* Background */}
            <div
                className={`absolute inset-0 transition-all duration-300 ${isDragging
                    ? "bg-sky-100 dark:bg-sky-900/30 border-2 border-dashed border-sky-500"
                    : displayImage
                        ? "bg-white dark:bg-[#1C252E]"
                        : "bg-gradient-to-br from-sky-50 to-white dark:from-sky-900/10 dark:to-[#1C252E] border-2 border-dashed border-sky-200 dark:border-white/[0.08]"
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
                <div className="absolute inset-0 flex flex-col items-center justify-center text-sky-400 dark:text-sky-500">
                    <Upload className={iconSizes[size]} />
                    {size === "lg" && (
                        <span className="text-xs mt-1 font-medium">Upload Logo</span>
                    )}
                </div>
            )}

            {/* Hover Overlay */}
            {editable && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    className="absolute inset-0 bg-sky-900/60 backdrop-blur-sm flex items-center justify-center"
                >
                    <div className="text-white text-center">
                        <Camera className={iconSizes[size]} />
                        {size === "lg" && (
                            <span className="text-xs mt-1 block">Đổi Logo</span>
                        )}
                    </div>
                </motion.div>
            )}

            {/* Clear Button */}
            {displayImage && editable && isHovered && (
                <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    onClick={clearLogo}
                    className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-red-600 transition-colors z-10"
                >
                    <X className="w-3 h-3" />
                </motion.button>
            )}

            {/* Drag Indicator */}
            {isDragging && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 flex items-center justify-center bg-sky-500/20"
                >
                    <div className="bg-white rounded-xl px-3 py-2 shadow-lg flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-medium text-sky-700 dark:text-sky-400">Thả để upload</span>
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
        </motion.div>
    );
}
