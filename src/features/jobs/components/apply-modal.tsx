"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, FileText, Check, Upload, Sparkles, Eye } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Job } from "@/features/jobs/types/job";
import { mockCVVersions, CVVersion } from "@/features/cv/types/cv-versions";
import { useRouter } from "next/navigation";

interface ApplyModalProps {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function ApplyModal({ job, isOpen, onClose, onSuccess }: ApplyModalProps) {
  const router = useRouter();
  const [selectedCV, setSelectedCV] = useState<string>("");
  const [coverLetter, setCoverLetter] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check for selected CV from sessionStorage (returning from preview page)
  useEffect(() => {
    if (isOpen) {
      const storedCVId = sessionStorage.getItem("selectedCVId");
      if (storedCVId) {
        setSelectedCV(storedCVId);
        sessionStorage.removeItem("selectedCVId");
      }
    }
  }, [isOpen]);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Handle view CV - navigate to full preview page
  const handleViewCV = (cv: CVVersion) => {
    // Close modal and navigate to preview page
    onClose();
    router.push(`/cv-preview?id=${cv.id}&returnTo=apply&jobId=${job.id}`);
  };

  // Handle submit
  const handleSubmit = async () => {
    if (!selectedCV) return;
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    onSuccess();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Main Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl md:max-h-[90vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-sky-500 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Ứng tuyển
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {job.title} - {job.company}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* CV Selection */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Chọn CV để ứng tuyển
                </label>
                <p className="text-xs text-slate-400 mb-3">
                  <strong>Bước 1:</strong> Click vào CV để xem đầy đủ nội dung và chỉnh sửa (nếu cần)
                </p>
                <div className="space-y-3">
                  {mockCVVersions.map((cv) => (
                    <CVCard
                      key={cv.id}
                      cv={cv}
                      isSelected={selectedCV === cv.id}
                      onView={() => handleViewCV(cv)}
                      formatDate={formatDate}
                    />
                  ))}
                </div>
              </div>

              {/* Cover Letter - only show when CV is selected */}
              {selectedCV && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                >
                  <div className="mb-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                    <p className="text-sm text-green-700 dark:text-green-400 flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      Đã chọn: <strong>{mockCVVersions.find((cv) => cv.id === selectedCV)?.name}</strong>
                    </p>
                  </div>
                  
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    <strong>Bước 2:</strong> Viết thư xin việc (Tùy chọn)
                  </label>
                  <textarea
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    placeholder="Viết thư xin việc để giới thiệu bản thân và thể hiện sự quan tâm đến vị trí này..."
                    className="w-full h-40 px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent resize-none"
                  />
                  <p className="text-xs text-slate-400 mt-2">
                    💡 Tip: Một thư xin việc tốt sẽ tăng cơ hội được nhà tuyển dụng chú ý!
                  </p>
                </motion.div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
              <div className="flex items-center justify-between">
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  {selectedCV ? (
                    <span className="text-green-600 dark:text-green-400 font-medium">
                      ✓ Sẵn sàng ứng tuyển
                    </span>
                  ) : (
                    <span className="text-orange-500">
                      ⚠ Vui lòng xem và chọn CV trước
                    </span>
                  )}
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={onClose}
                    className="rounded-full px-6"
                  >
                    Hủy
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={!selectedCV || isSubmitting}
                    className="bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white shadow-lg shadow-blue-500/25 rounded-full px-8 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full mr-2"
                        />
                        Đang gửi...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Gửi hồ sơ
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// CV Card component
interface CVCardProps {
  cv: CVVersion;
  isSelected: boolean;
  onView: () => void;
  formatDate: (date: string) => string;
}

function CVCard({ cv, isSelected, onView, formatDate }: CVCardProps) {
  return (
    <motion.div
      onClick={onView}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={`relative flex items-start gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
        isSelected
          ? "border-green-500 bg-green-50 dark:bg-green-900/20"
          : "border-slate-200 dark:border-slate-700 hover:border-sky-400 dark:hover:border-sky-500 hover:bg-sky-50 dark:hover:bg-sky-900/10 bg-white dark:bg-slate-800"
      }`}
    >
      {/* Thumbnail */}
      <div className="w-16 h-22 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-700 shrink-0">
        {cv.thumbnail ? (
          <img
            src={cv.thumbnail}
            alt={cv.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FileText className="w-6 h-6 text-slate-400" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h4 className="font-semibold text-slate-900 dark:text-white">
            {cv.name}
          </h4>
          {cv.isDefault && (
            <span className="px-2 py-0.5 text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full">
              Mặc định
            </span>
          )}
          {isSelected && (
            <span className="px-2 py-0.5 text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full flex items-center gap-1">
              <Check className="w-3 h-3" />
              Đã chọn
            </span>
          )}
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Template: {cv.templateName}
        </p>
        <p className="text-xs text-slate-400 mt-1">
          Cập nhật: {formatDate(cv.updatedAt)}
        </p>
        
        {/* Skills preview */}
        <div className="flex flex-wrap gap-1 mt-2">
          {cv.data.skills.slice(0, 4).map((skill) => (
            <span
              key={skill.id}
              className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
            >
              {skill.name}
            </span>
          ))}
          {cv.data.skills.length > 4 && (
            <span className="text-xs text-slate-400">+{cv.data.skills.length - 4}</span>
          )}
        </div>
      </div>

      {/* View button */}
      <div className="flex items-center gap-2 shrink-0 text-sky-600 dark:text-sky-400">
        <span className="text-xs hidden sm:block">Xem CV</span>
        <Eye className="w-5 h-5" />
      </div>
    </motion.div>
  );
}
