'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { DocumentDuplicateIcon, TrashIcon } from '@heroicons/react/24/outline';
import { CVFile } from '../types';
import { FileCard } from './FileCard';

interface FileListProps {
    files: CVFile[];
    onRemove: (id: string) => void;
    onClearAll: () => void;
}

export function FileList({ files, onRemove, onClearAll }: FileListProps) {
    if (files.length === 0) return null;

    const successCount = files.filter((f) => f.status === 'success').length;
    const errorCount = files.filter((f) => f.status === 'error').length;
    const uploadingCount = files.filter((f) => f.status === 'uploading').length;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-8"
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-green-100 dark:bg-green-900/50">
                        <DocumentDuplicateIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-green-900 dark:text-green-100">
                            File đã tải lên
                        </h3>
                        <div className="flex items-center gap-2 text-sm">
                            {successCount > 0 && (
                                <span className="text-green-600 dark:text-green-400">
                                    {successCount} thành công
                                </span>
                            )}
                            {uploadingCount > 0 && (
                                <>
                                    {successCount > 0 && <span className="text-slate-400">•</span>}
                                    <span className="text-green-600 dark:text-green-400">
                                        {uploadingCount} đang tải
                                    </span>
                                </>
                            )}
                            {errorCount > 0 && (
                                <>
                                    {(successCount > 0 || uploadingCount > 0) && (
                                        <span className="text-slate-400">•</span>
                                    )}
                                    <span className="text-red-600 dark:text-red-400">
                                        {errorCount} lỗi
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Clear All Button */}
                <motion.button
                    onClick={onClearAll}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="
            flex items-center gap-2 px-4 py-2 rounded-full
            bg-red-50 dark:bg-red-900/30
            border border-red-200 dark:border-red-800
            text-red-600 dark:text-red-400
            hover:bg-red-100 dark:hover:bg-red-900/50
            transition-colors duration-200
            text-sm font-medium
          "
                >
                    <TrashIcon className="w-4 h-4" />
                    Xóa tất cả
                </motion.button>
            </div>

            {/* File Grid */}
            <div className="grid gap-3">
                <AnimatePresence mode="popLayout">
                    {files.map((file, index) => (
                        <FileCard
                            key={file.id}
                            file={file}
                            index={index}
                            onRemove={onRemove}
                        />
                    ))}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
