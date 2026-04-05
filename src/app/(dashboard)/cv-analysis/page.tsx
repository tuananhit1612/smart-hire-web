'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { profileApi } from '@/features/profile/api/profile-api';
import type { CvFileResponse } from '@/features/profile/types/profile-api-types';
import {
  ScanSearch,
  FileText,
  ArrowRight,
  Loader2,
  AlertTriangle,
  Star,
  Clock,
  Sparkles,
  PenTool,
  Upload,
} from 'lucide-react';

export default function CVAnalysisListPage() {
  const router = useRouter();
  const [cvFiles, setCvFiles] = useState<CvFileResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCvFiles = async () => {
      try {
        const res = await profileApi.getCvFiles();
        setCvFiles(res.data.data || []);
      } catch {
        setError('Không thể tải danh sách CV.');
      } finally {
        setLoading(false);
      }
    };
    fetchCvFiles();
  }, []);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <Loader2 className="w-10 h-10 text-green-500 animate-spin" />
        <p className="text-[#637381] dark:text-[#919EAB] font-medium">Đang tải danh sách CV...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4 text-red-500">
        <AlertTriangle className="w-12 h-12" />
        <p className="font-semibold text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/20">
            <ScanSearch className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#1C252E] dark:text-white">
              Đánh giá CV bằng AI
            </h1>
            <p className="text-sm text-[#637381] dark:text-[#919EAB]">
              Chọn CV để AI phân tích chất lượng, phát hiện lỗi và đưa ra gợi ý cải thiện
            </p>
          </div>
        </div>
      </div>

      {/* CV File List */}
      {cvFiles.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-20 bg-white dark:bg-[#1C252E] rounded-3xl border border-dashed border-[rgba(145,158,171,0.3)] dark:border-white/[0.1]"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-100 to-indigo-100 dark:from-violet-900/20 dark:to-indigo-900/20 flex items-center justify-center mb-5">
            <PenTool className="w-9 h-9 text-violet-500 dark:text-violet-400" />
          </div>
          <h3 className="text-lg font-bold text-[#1C252E] dark:text-white mb-2">
            Chưa có CV nào
          </h3>
          <p className="text-sm text-[#637381] dark:text-[#919EAB] mb-6 text-center max-w-md leading-relaxed">
            Hãy tạo CV từ <strong>Resume Builder</strong> để AI có thể phân tích và highlight
            chính xác các vấn đề cần cải thiện trên CV của bạn.
          </p>
          <button
            onClick={() => router.push('/cv-builder')}
            className="group flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-2xl hover:shadow-lg hover:shadow-green-500/25 transition-all duration-200"
          >
            <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            Tạo CV với Builder
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {cvFiles.map((cv, idx) => {
              const isBuilder = cv.source === 'BUILDER';
              return (
                <motion.div
                  key={cv.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => router.push(`/cv-analysis/${cv.id}`)}
                  className="group relative flex items-center gap-5 p-5 bg-white dark:bg-[#1C252E] rounded-2xl border border-[rgba(145,158,171,0.12)] dark:border-white/[0.06] hover:border-green-300 dark:hover:border-green-800 hover:shadow-lg hover:shadow-green-500/5 cursor-pointer transition-all duration-200"
                >
                  {/* File icon */}
                  <div className={`relative w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border ${
                    isBuilder
                      ? 'bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-violet-900/20 dark:to-indigo-900/20 border-violet-100 dark:border-violet-900/30'
                      : 'bg-gradient-to-br from-blue-50 to-sky-50 dark:from-blue-900/20 dark:to-sky-900/20 border-blue-100 dark:border-blue-900/30'
                  }`}>
                    <FileText className={`w-6 h-6 ${isBuilder ? 'text-violet-500 dark:text-violet-400' : 'text-blue-500 dark:text-blue-400'}`} />
                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center shadow-md ${
                      isBuilder
                        ? 'bg-gradient-to-br from-green-400 to-emerald-500'
                        : 'bg-gradient-to-br from-blue-400 to-sky-500'
                    }`}>
                      {isBuilder
                        ? <PenTool className="w-2.5 h-2.5 text-white" />
                        : <Upload className="w-2.5 h-2.5 text-white" />
                      }
                    </div>
                  </div>

                  {/* File info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-[15px] font-bold text-[#1C252E] dark:text-white truncate">
                        {cv.fileName}
                      </h3>
                      {cv.isPrimary && (
                        <span className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold uppercase bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full shrink-0">
                          <Star className="w-3 h-3" />
                          Chính
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-[#919EAB]">
                      <span className={`flex items-center gap-1 font-medium ${
                        isBuilder ? 'text-violet-500 dark:text-violet-400' : 'text-blue-500 dark:text-blue-400'
                      }`}>
                        {isBuilder
                          ? <><PenTool className="w-3 h-3" /> Builder</>
                          : <><Upload className="w-3 h-3" /> Tải lên</>
                        }
                      </span>
                      <span>•</span>
                      <span>{cv.fileType}</span>
                      <span>•</span>
                      <span>{formatFileSize(cv.fileSize)}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDate(cv.createdAt)}
                      </span>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="flex items-center gap-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                      Đánh giá AI
                    </span>
                    <ArrowRight className="w-4 h-4 text-green-600 dark:text-green-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
