'use client';

import { motion } from 'framer-motion';
import {
    DocumentIcon,
    XMarkIcon,
    CheckCircleIcon,
    ExclamationCircleIcon,
    ArrowPathIcon,
} from '@heroicons/react/24/outline';
import { DocumentTextIcon } from '@heroicons/react/24/solid';
import { CVFile } from '../types';
import { formatFileSize, isPDF, isWord } from '../utils/fileValidation';

interface FileCardProps {
    file: CVFile;
    index: number;
    onRemove: (id: string) => void;
}

export function FileCard({ file, index, onRemove }: FileCardProps) {
    const getStatusIcon = () => {
        switch (file.status) {
            case 'uploading':
                return (
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                        <ArrowPathIcon className="w-5 h-5 text-sky-500" />
                    </motion.div>
                );
            case 'success':
                return (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    >
                        <CheckCircleIcon className="w-5 h-5 text-green-500" />
                    </motion.div>
                );
            case 'error':
                return <ExclamationCircleIcon className="w-5 h-5 text-red-500" />;
            default:
                return null;
        }
    };

    const getFileIcon = () => {
        // Check file type based on stored type or extension
        const fileType = file.type || '';
        const fileName = file.name || '';

        if (fileType === 'application/pdf' || fileName.toLowerCase().endsWith('.pdf')) {
            return (
                <div className="p-3 rounded-2xl bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/50 dark:to-red-800/50">
                    <DocumentTextIcon className="w-6 h-6 text-red-500" />
                </div>
            );
        }

        // DOCX/DOC
        return (
            <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/50 dark:to-blue-800/50">
                <DocumentIcon className="w-6 h-6 text-blue-500" />
            </div>
        );
    };

    const getStatusColor = () => {
        switch (file.status) {
            case 'uploading':
                return 'border-sky-200 dark:border-sky-800';
            case 'success':
                return 'border-green-200 dark:border-green-800';
            case 'error':
                return 'border-red-200 dark:border-red-800';
            default:
                return 'border-slate-200 dark:border-slate-700';
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            layout
            className={`
        relative group
        bg-white/70 dark:bg-sky-950/40
        backdrop-blur-xl
        border ${getStatusColor()}
        rounded-2xl p-4
        hover:shadow-lg hover:shadow-sky-500/10
        transition-all duration-300
      `}
        >
            <div className="flex items-center gap-4">
                {/* File Icon */}
                <motion.div
                    whileHover={{ scale: 1.05, rotate: 3 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                >
                    {getFileIcon()}
                </motion.div>

                {/* File Info */}
                <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-sky-900 dark:text-sky-100 truncate">
                        {file.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-sky-500/70 dark:text-sky-400/70">
                            {formatFileSize(file.size)}
                        </span>
                        {file.status === 'uploading' && (
                            <span className="text-xs text-sky-500 dark:text-sky-400">
                                • {Math.round(file.progress)}%
                            </span>
                        )}
                        {file.status === 'error' && file.errorMessage && (
                            <span className="text-xs text-red-500 truncate">
                                • {file.errorMessage}
                            </span>
                        )}
                    </div>

                    {/* Progress Bar */}
                    {file.status === 'uploading' && (
                        <div className="mt-2 h-1.5 bg-sky-100 dark:bg-sky-900 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-sky-500 to-blue-500 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${file.progress}%` }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                            />
                        </div>
                    )}
                </div>

                {/* Status Icon */}
                <div className="flex-shrink-0">{getStatusIcon()}</div>

                {/* Remove Button */}
                <motion.button
                    onClick={() => onRemove(file.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`
            flex-shrink-0 p-2 rounded-full
            bg-slate-100 dark:bg-slate-800
            hover:bg-red-100 dark:hover:bg-red-900/50
            text-slate-400 hover:text-red-500
            transition-colors duration-200
            opacity-0 group-hover:opacity-100
          `}
                >
                    <XMarkIcon className="w-4 h-4" />
                </motion.button>
            </div>
        </motion.div>
    );
}
