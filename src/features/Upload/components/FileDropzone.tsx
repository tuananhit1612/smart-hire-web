'use client';

import { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, AlertCircle } from 'lucide-react';
import { UPLOAD_CONSTRAINTS } from '../types';

interface FileDropzoneProps {
    onFilesSelected: (files: FileList) => void;
    disabled?: boolean;
    className?: string;
}

export function FileDropzone({ onFilesSelected, disabled = false, className = '' }: FileDropzoneProps) {
    const [isDragOver, setIsDragOver] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) {
            setIsDragOver(true);
        }
    }, [disabled]);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);

        if (disabled) return;

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            onFilesSelected(files);
        }
    }, [disabled, onFilesSelected]);

    const handleClick = useCallback(() => {
        if (!disabled) {
            inputRef.current?.click();
        }
    }, [disabled]);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            onFilesSelected(files);
        }
        // Reset input value to allow selecting the same file again
        e.target.value = '';
    }, [onFilesSelected]);

    const acceptTypes = UPLOAD_CONSTRAINTS.ALLOWED_EXTENSIONS.join(',');

    return (
        <motion.div
            onClick={handleClick}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`
                relative cursor-pointer rounded-2xl border-2 border-dashed 
                transition-all duration-300 ease-out
                ${isDragOver
                    ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/30 scale-[1.02]'
                    : 'border-slate-300 dark:border-slate-700 hover:border-sky-400 hover:bg-slate-50 dark:hover:bg-slate-900/50'
                }
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                ${className}
            `}
            whileHover={{ scale: disabled ? 1 : 1.01 }}
            whileTap={{ scale: disabled ? 1 : 0.99 }}
        >
            <input
                ref={inputRef}
                type="file"
                accept={acceptTypes}
                multiple
                onChange={handleInputChange}
                className="hidden"
                disabled={disabled}
            />

            <div className="flex flex-col items-center justify-center py-12 px-6">
                <motion.div
                    className={`
                        mb-4 p-4 rounded-full 
                        ${isDragOver
                            ? 'bg-sky-100 dark:bg-sky-900/50'
                            : 'bg-slate-100 dark:bg-slate-800'
                        }
                    `}
                    animate={{
                        scale: isDragOver ? 1.1 : 1,
                        rotate: isDragOver ? 5 : 0
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                    {isDragOver ? (
                        <FileText className="w-8 h-8 text-sky-600 dark:text-sky-400" />
                    ) : (
                        <Upload className="w-8 h-8 text-slate-500 dark:text-slate-400" />
                    )}
                </motion.div>

                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">
                    {isDragOver ? 'Thả file vào đây' : 'Tải CV lên'}
                </h3>

                <p className="text-sm text-slate-500 dark:text-slate-400 text-center mb-4">
                    Kéo thả hoặc <span className="text-sky-600 dark:text-sky-400 font-medium">chọn file</span> từ máy tính
                </p>

                <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>
                        PDF, DOC, DOCX · Tối đa {UPLOAD_CONSTRAINTS.MAX_FILE_SIZE_MB}MB
                    </span>
                </div>
            </div>

            {/* Animated border when dragging */}
            {isDragOver && (
                <motion.div
                    className="absolute inset-0 rounded-2xl border-2 border-sky-500 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                />
            )}
        </motion.div>
    );
}
