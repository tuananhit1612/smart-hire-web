'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileStack, Trash2 } from 'lucide-react';
import { useFileUpload } from '../hooks/useFileUpload';
import { FileDropzone } from './FileDropzone';
import { FileCard } from './FileCard';
import { Button } from '@/shared/components/ui/button';
import { useToastHelpers } from '@/shared/components/ui/toast';

export function UploadCVPage() {
    const toastHelpers = useToastHelpers();

    const { files, isUploading, addFiles, removeFile, clearFiles } = useFileUpload({
        onError: (error, message) => {
            toastHelpers.error('Lỗi tải file', message);
        },
        onSuccess: (file) => {
            toastHelpers.success('Tải lên thành công', `${file.name} đã được tải lên.`);
        },
    });

    const hasFiles = files.length > 0;

    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <div className="inline-flex items-center justify-center p-3 mb-4 rounded-2xl bg-sky-50 dark:bg-sky-950/30">
                        <Upload className="w-8 h-8 text-sky-600 dark:text-sky-400" />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                        Tải CV lên
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                        Tải lên CV của bạn để ứng tuyển nhanh chóng. Hỗ trợ PDF, DOC, DOCX.
                    </p>
                </motion.div>

                {/* Dropzone */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <FileDropzone
                        onFilesSelected={addFiles}
                        disabled={isUploading}
                    />
                </motion.div>

                {/* File List */}
                <AnimatePresence mode="popLayout">
                    {hasFiles && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-8"
                        >
                            {/* List Header */}
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                                    <FileStack className="w-5 h-5" />
                                    <span className="font-semibold">
                                        File đã tải ({files.length})
                                    </span>
                                </div>

                                {files.length > 1 && !isUploading && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={clearFiles}
                                        className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                                    >
                                        <Trash2 className="w-4 h-4 mr-1.5" />
                                        Xóa tất cả
                                    </Button>
                                )}
                            </div>

                            {/* File Cards */}
                            <div className="space-y-3">
                                <AnimatePresence mode="popLayout">
                                    {files.map((file) => (
                                        <FileCard
                                            key={file.id}
                                            file={file}
                                            onRemove={removeFile}
                                        />
                                    ))}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
