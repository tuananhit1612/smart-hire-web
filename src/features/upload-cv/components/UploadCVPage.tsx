'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    DocumentTextIcon,
    ArrowRightIcon,
    SparklesIcon,
} from '@heroicons/react/24/outline';
import { useFileUpload } from '../hooks/useFileUpload';
import { DropZone } from './DropZone';
import { FileList } from './FileList';
import { FeatureCards } from './FeatureCards';
import { MAX_FILES } from '../types';

export function UploadCVPage() {
    const {
        files,
        isDragging,
        isUploading,
        addFiles,
        removeFile,
        clearAll,
        handleDragEnter,
        handleDragLeave,
        handleDragOver,
        handleDrop,
    } = useFileUpload();

    const successfulFiles = files.filter((f) => f.status === 'success');
    const canProceed = successfulFiles.length > 0 && !isUploading;

    return (
        <div className="w-full relative pt-6 pb-12">
            {/* Background Elements */}
            <div className="aurora-blob aurora-blob-1" />
            <div className="aurora-blob aurora-blob-2" />

            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-10"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                        className="inline-flex items-center justify-center p-4 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 shadow-lg shadow-sky-500/30 mb-6"
                    >
                        <DocumentTextIcon className="w-10 h-10 text-white" />
                    </motion.div>

                    <h1 className="text-4xl md:text-5xl font-bold text-sky-900 dark:text-white mb-4">
                        Tải lên{' '}
                        <span className="bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                            CV của bạn
                        </span>
                    </h1>
                    <p className="text-lg text-sky-600/80 dark:text-sky-300/80 max-w-2xl mx-auto">
                        Hệ thống AI sẽ tự động phân tích và đánh giá CV của bạn để tìm kiếm công việc phù hợp nhất
                    </p>
                </motion.div>

                {/* Main Upload Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="
            bg-white/70 dark:bg-sky-950/30
            backdrop-blur-xl
            border border-white/40 dark:border-sky-800/30
            rounded-3xl
            p-6 md:p-8
            shadow-xl shadow-sky-500/5
          "
                >
                    {/* Drop Zone */}
                    <DropZone
                        isDragging={isDragging}
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        onFileSelect={(fileList) => addFiles(fileList)}
                        disabled={files.length >= MAX_FILES}
                    />

                    {/* File List */}
                    <FileList files={files} onRemove={removeFile} onClearAll={clearAll} />

                    {/* Action Button */}
                    {canProceed && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="mt-8 flex justify-center"
                        >
                            <Link href="/cv-analysis">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="
                    inline-flex items-center gap-3 px-8 py-4 rounded-full
                    bg-gradient-to-r from-green-500 to-emerald-600
                    text-white font-semibold text-lg
                    shadow-lg shadow-green-500/30
                    hover:shadow-xl hover:shadow-green-500/40
                    transition-shadow duration-300
                  "
                                >
                                    <SparklesIcon className="w-6 h-6" />
                                    Phân tích CV với AI
                                    <ArrowRightIcon className="w-5 h-5" />
                                </motion.button>
                            </Link>
                        </motion.div>
                    )}
                </motion.div>

                {/* Feature Cards */}
                <FeatureCards />

                {/* Tips Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="
            mt-10
            bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/20
            border border-sky-200/50 dark:border-sky-800/30
            rounded-2xl p-6
          "
                >
                    <h3 className="text-lg font-semibold text-sky-900 dark:text-sky-100 mb-4 flex items-center gap-2">
                        <SparklesIcon className="w-5 h-5 text-sky-500" />
                        Mẹo để CV được đánh giá tốt hơn
                    </h3>
                    <ul className="grid md:grid-cols-2 gap-3 text-sm text-sky-700 dark:text-sky-300">
                        {[
                            'Sử dụng định dạng PDF để giữ nguyên layout',
                            'Đảm bảo thông tin liên hệ rõ ràng và dễ tìm',
                            'Liệt kê kỹ năng và kinh nghiệm phù hợp với công việc',
                            'Sử dụng các từ khóa liên quan đến ngành nghề',
                        ].map((tip, index) => (
                            <motion.li
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6 + index * 0.1 }}
                                className="flex items-start gap-2"
                            >
                                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-sky-500 text-white text-xs flex items-center justify-center">
                                    {index + 1}
                                </span>
                                {tip}
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>
            </div>
        </div>
    );
}
