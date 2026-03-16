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
                        ? 'border-green-500 bg-green-500/10 scale-[1.02] shadow-xl shadow-green-500/20'
                        : 'border-slate-200 dark:border-white/10 bg-white/60 dark:bg-[#1C252E] hover:border-green-400 hover:bg-slate-50/80 dark:hover:bg-white/[0.04]'
                    }
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          backdrop-blur-xl
        `}
            >
                {/* Animated gradient background when dragging */}
                {isDragging && (
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-green-400/20 via-emerald-500/20 to-emerald-500/20"
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
                                ? 'bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-500/40'
                                : 'bg-slate-100 dark:bg-slate-800/50'
                            }
            `}
                    >
                        <CloudArrowUpIcon
                            className={`w-12 h-12 ${isDragging ? 'text-white' : 'text-green-600 dark:text-green-400'}`}
                        />
                    </motion.div>

                    {/* Text Content */}
                    <div className="text-center space-y-2">
                        <motion.h3
                            className="text-xl font-semibold text-[#1C252E] dark:text-white"
                            animate={isDragging ? { scale: 1.05 } : { scale: 1 }}
                        >
                            {isDragging ? 'Thả file vào đây!' : 'Kéo thả CV của bạn vào đây'}
                        </motion.h3>
                        <p className="text-[#637381] dark:text-[#919EAB]">
                            hoặc{' '}
                            <span className="text-green-600 dark:text-green-400 font-medium underline underline-offset-2">
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
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800">
                            <DocumentIcon className="w-4 h-4 text-emerald-500" />
                            <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">DOCX</span>
                        </div>
                    </div>

                    {/* Size Limit Info */}
                    <p className="text-sm text-slate-400 dark:text-slate-500">
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
