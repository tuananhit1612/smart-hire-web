"use client";

import React, { useRef, useState } from "react";
import { Camera, Trash2, User } from "lucide-react";
import { validateFile, AVATAR_RULES } from "@/shared/utils/file-validation";

interface EditableAvatarProps {
    src?: string;
    alt?: string;
    editable?: boolean;
    onAvatarChange?: (dataUrl: string | null) => void;
    className?: string;
    /** Size of the avatar container (Tailwind classes e.g. "w-32 h-32") */
    size?: string;
}

/**
 * Avatar component that supports click-to-upload when in editable mode.
 * Reads the file locally as a data URL and passes it to onAvatarChange.
 * In non-editable mode, renders as a simple <img>.
 */
export function EditableAvatar({
    src,
    alt = "Avatar",
    editable = false,
    onAvatarChange,
    className = "",
    size = "w-32 h-32",
}: EditableAvatarProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isHovering, setIsHovering] = useState(false);

    const handleClick = () => {
        if (!editable) return;
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (fileInputRef.current) fileInputRef.current.value = "";
        if (!file) return;

        // Validate file
        const validation = validateFile(file, AVATAR_RULES);
        if (!validation.valid) {
            alert(validation.errors[0]);
            return;
        }

        // Read as data URL
        const reader = new FileReader();
        reader.onload = (event) => {
            const dataUrl = event.target?.result as string;
            onAvatarChange?.(dataUrl);
        };
        reader.readAsDataURL(file);
    };

    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation();
        onAvatarChange?.(null);
    };

    // Non-editable: simple render
    if (!editable) {
        if (!src) return null;
        return (
            <img
                src={src}
                alt={alt}
                className={`${size} object-cover ${className}`}
            />
        );
    }

    // Editable mode
    return (
        <div
            className={`${size} relative group cursor-pointer ${className}`}
            onClick={handleClick}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            {/* Avatar image or placeholder */}
            {src ? (
                <img
                    src={src}
                    alt={alt}
                    className="w-full h-full object-cover"
                />
            ) : (
                <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <User className="w-1/3 h-1/3 text-gray-400 dark:text-gray-500" />
                </div>
            )}

            {/* Hover overlay */}
            <div
                className={`absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-1 transition-opacity duration-200 ${
                    isHovering ? "opacity-100" : "opacity-0"
                }`}
            >
                <Camera className="w-5 h-5 text-white" />
                <span className="text-[10px] text-white font-medium">
                    {src ? "Đổi ảnh" : "Thêm ảnh"}
                </span>
                {src && (
                    <button
                        onClick={handleRemove}
                        className="absolute bottom-1 right-1 p-1 bg-red-500/80 rounded-full hover:bg-red-600 transition-colors"
                        title="Xóa ảnh"
                    >
                        <Trash2 className="w-3 h-3 text-white" />
                    </button>
                )}
            </div>

            {/* Hidden file input */}
            <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
            />
        </div>
    );
}
