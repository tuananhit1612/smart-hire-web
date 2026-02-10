'use client';

import { motion } from 'framer-motion';
import { FileText, Trash2, CheckCircle2, Loader2, AlertTriangle, File } from 'lucide-react';
import { formatFileSize, getFileExtension } from '../utils/validation';
import type { UploadedFile } from '../types';

interface FileCardProps {
    file: UploadedFile;
    onRemove: (id: string) => void;
}

function getFileIcon(filename: string) {
    const ext = getFileExtension(filename);
    switch (ext) {
        case 'pdf':
            return <FileText className="w-6 h-6 text-red-500" />;
        case 'doc':
        case 'docx':
            return <FileText className="w-6 h-6 text-blue-500" />;
        default:
            return <File className="w-6 h-6 text-slate-500" />;
    }
}

function getStatusIndicator(status: UploadedFile['status'], progress: number) {
    switch (status) {
        case 'uploading':
            return (
                <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 text-sky-500 animate-spin" />
                    <span className="text-xs text-sky-600 font-medium">{Math.round(progress)}%</span>
                </div>
            );
        case 'success':
            return (
                <div className="flex items-center gap-1.5 text-green-600">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-xs font-medium">Hoàn thành</span>
                </div>
            );
        case 'error':
            return (
                <div className="flex items-center gap-1.5 text-red-500">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-xs font-medium">Lỗi</span>
                </div>
            );
        default:
            return null;
    }
}

export function FileCard({ file, onRemove }: FileCardProps) {
    const isUploading = file.status === 'uploading';
    const isError = file.status === 'error';

    return (
        <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`
                relative flex items-center gap-4 p-4 rounded-xl 
                bg-white dark:bg-slate-900 
                border border-slate-200 dark:border-slate-800
                shadow-sm hover:shadow-md transition-shadow
                ${isError ? 'border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-950/20' : ''}
            `}
        >
            {/* File Icon */}
            <div className="flex-shrink-0 p-3 rounded-lg bg-slate-100 dark:bg-slate-800">
                {getFileIcon(file.name)}
            </div>

            {/* File Info */}
            <div className="flex-1 min-w-0">
                <h4 className="font-medium text-slate-800 dark:text-slate-100 truncate">
                    {file.name}
                </h4>
                <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                        {formatFileSize(file.size)}
                    </span>
                    {getStatusIndicator(file.status, file.progress)}
                </div>

                {/* Progress Bar */}
                {isUploading && (
                    <div className="mt-2 h-1 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-sky-500 to-blue-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${file.progress}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                )}
            </div>

            {/* Delete Button */}
            <motion.button
                onClick={() => onRemove(file.id)}
                className={`
                    flex-shrink-0 p-2 rounded-lg
                    text-slate-400 hover:text-red-500 
                    hover:bg-red-50 dark:hover:bg-red-950/30
                    transition-colors
                    ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}
                `}
                disabled={isUploading}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                <Trash2 className="w-5 h-5" />
            </motion.button>
        </motion.div>
    );
}
