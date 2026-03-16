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
                        className="inline-flex items-center justify-center p-4 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-500/30 mb-6"
                    >
                        <DocumentTextIcon className="w-10 h-10 text-white" />
                    </motion.div>

                    <h1 className="text-4xl md:text-5xl font-bold text-[#1C252E] dark:text-white mb-4">
                        Tải lên{' '}
                        <span className="text-[#22c55e]">
                            CV của bạn
                        </span>
                    </h1>
                    <p className="text-lg text-[#637381] dark:text-[#919EAB] max-w-2xl mx-auto">
                        Hệ thống AI sẽ tự động phân tích và đánh giá CV của bạn để tìm kiếm công việc phù hợp nhất
                    </p>
                </motion.div>

                {/* Main Upload Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="
            bg-white dark:bg-[#1C252E]
            backdrop-blur-xl
            border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08]
            rounded-3xl
            p-6 md:p-8
            shadow-xl shadow-green-500/5
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
            bg-[rgba(145,158,171,0.04)] dark:bg-[rgba(145,158,171,0.08)]
            border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08]
            rounded-2xl p-6
          "
                >
                    <h3 className="text-lg font-bold text-[#1C252E] dark:text-white mb-4 flex items-center gap-2">
                        <SparklesIcon className="w-5 h-5 text-[#22c55e]" />
                        Mẹo để CV được đánh giá tốt hơn
                    </h3>
                    <ul className="grid md:grid-cols-2 gap-3 text-sm text-[#637381] dark:text-[#C4CDD5]">
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
                                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[rgba(145,158,171,0.08)] text-[#22c55e] border border-[rgba(145,158,171,0.2)] text-xs font-bold flex items-center justify-center">
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
