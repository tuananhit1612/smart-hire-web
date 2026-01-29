'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { CloudArrowUpIcon, DocumentIcon } from '@heroicons/react/24/outline';

interface DropZoneProps {
    isDragging: boolean;
    onDragEnter: (e: React.DragEvent) => void;
    onDragLeave: (e: React.DragEvent) => void;
    onDragOver: (e: React.DragEvent) => void;
    onDrop: (e: React.DragEvent) => void;
    onFileSelect: (files: FileList) => void;
    disabled?: boolean;
}

export function DropZone({
    isDragging,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDrop,
    onFileSelect,
    disabled = false,
}: DropZoneProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        if (!disabled) {
            inputRef.current?.click();
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            onFileSelect(e.target.files);
            e.target.value = ''; // Reset input
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
            <div
                onClick={handleClick}
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDragOver={onDragOver}
                onDrop={onDrop}
                className={`
          relative overflow-hidden cursor-pointer
          rounded-3xl border-2 border-dashed
          transition-all duration-300 ease-out
          ${isDragging
                        ? 'border-sky-500 bg-sky-500/10 scale-[1.02] shadow-xl shadow-sky-500/20'
                        : 'border-sky-200 dark:border-sky-800 bg-white/60 dark:bg-sky-950/30 hover:border-sky-400 hover:bg-sky-50/80 dark:hover:bg-sky-900/40'
                    }
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          backdrop-blur-xl
        `}
            >
                {/* Animated gradient background when dragging */}
                {isDragging && (
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-sky-400/20 via-blue-500/20 to-indigo-500/20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />
                )}

                <div className="relative z-10 p-12 flex flex-col items-center justify-center gap-6">
                    {/* Icon Container */}
                    <motion.div
                        animate={isDragging ? { scale: 1.1, y: -5 } : { scale: 1, y: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        className={`
              p-6 rounded-full
              ${isDragging
                                ? 'bg-gradient-to-br from-sky-500 to-blue-600 shadow-lg shadow-sky-500/40'
                                : 'bg-gradient-to-br from-sky-100 to-blue-100 dark:from-sky-900 dark:to-blue-900'
                            }
            `}
                    >
                        <CloudArrowUpIcon
                            className={`w-12 h-12 ${isDragging ? 'text-white' : 'text-sky-600 dark:text-sky-400'}`}
                        />
                    </motion.div>

                    {/* Text Content */}
                    <div className="text-center space-y-2">
                        <motion.h3
                            className="text-xl font-semibold text-sky-900 dark:text-sky-100"
                            animate={isDragging ? { scale: 1.05 } : { scale: 1 }}
                        >
                            {isDragging ? 'Thả file vào đây!' : 'Kéo thả CV của bạn vào đây'}
                        </motion.h3>
                        <p className="text-sky-600/80 dark:text-sky-300/80">
                            hoặc{' '}
                            <span className="text-sky-600 dark:text-sky-400 font-medium underline underline-offset-2">
                                nhấn để chọn file
                            </span>
                        </p>
                    </div>

                    {/* File Types Badge */}
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800">
                            <DocumentIcon className="w-4 h-4 text-red-500" />
                            <span className="text-sm font-medium text-red-600 dark:text-red-400">PDF</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800">
                            <DocumentIcon className="w-4 h-4 text-blue-500" />
                            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">DOCX</span>
                        </div>
                    </div>

                    {/* Size Limit Info */}
                    <p className="text-sm text-sky-500/70 dark:text-sky-400/70">
                        Tối đa 10MB • Tối đa 5 file
                    </p>
                </div>

                {/* Hidden file input */}
                <input
                    ref={inputRef}
                    type="file"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    multiple
                    onChange={handleChange}
                    className="hidden"
                    disabled={disabled}
                />
            </div>
        </motion.div>
    );
}
