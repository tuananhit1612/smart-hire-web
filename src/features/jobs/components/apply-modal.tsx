"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  FileText,
  Check,
  Upload,
  Sparkles,
  Eye,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Briefcase,
  PartyPopper,
  ArrowRight,
  Trash2
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Job } from "@/features/jobs/types/job";
import { profileApi } from "@/features/profile/api/profile-api";
import { CvFileResponse } from "@/features/profile/types/profile-api-types";
import { useRouter } from "next/navigation";
import { useApplicationStore } from "../stores/application-store";
import Link from "next/link";

type ModalState = "form" | "submitting" | "success" | "already-applied" | "job-closed";

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
  const [modalState, setModalState] = useState<ModalState>("form");
  const [cvFiles, setCvFiles] = useState<CvFileResponse[]>([]);
  const [isLoadingCvs, setIsLoadingCvs] = useState(false);
  const hasInitializedRef = useRef(false);

  const { applyToJob, hasApplied, withdrawApplication, submitError, clearSubmitError } = useApplicationStore();

  // Check for selected CV from URL params (returning from preview page)
  // Only run once when modal opens
  useEffect(() => {
    if (isOpen && !hasInitializedRef.current) {
      hasInitializedRef.current = true;

      setIsLoadingCvs(true);
      profileApi.getCvFiles()
        .then(res => {
          const files = res.data.data.sort((a,b) => (a.isPrimary === b.isPrimary ? 0 : a.isPrimary ? -1 : 1));
          setCvFiles(files);
          
          if (typeof window !== "undefined") {
            const urlParams = new URLSearchParams(window.location.search);
            const cvFromUrl = urlParams.get("selectedCV");
            if (cvFromUrl) {
              setSelectedCV(cvFromUrl);
              window.history.replaceState({}, "", `/jobs/${job.id}?openApply=true`);
            } else {
              const primaryCv = files.find(c => c.isPrimary);
              if (primaryCv) setSelectedCV(primaryCv.id.toString());
            }
          }
        })
        .finally(() => setIsLoadingCvs(false));

      // Check job status and application status
      if (job.status === "closed") {
        setModalState("job-closed");
      } else if (hasApplied(job.id)) {
        setModalState("already-applied");
      } else {
        setModalState("form");
      }
    }
  }, [isOpen, job.id, job.status, hasApplied]);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      hasInitializedRef.current = false;
      setTimeout(() => {
        setSelectedCV("");
        setCoverLetter("");
        setModalState("form");
      }, 300);
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
  const handleViewCV = (cv: CvFileResponse) => {
    if (cv.source === 'BUILDER') {
      onClose();
      router.push(`/cv-preview?id=${cv.id}&returnTo=apply&jobId=${job.id}`);
    } else if (cv.downloadUrl) {
      window.open(cv.downloadUrl, '_blank');
    }
  };

  // Handle submit
  const handleSubmit = async () => {
    if (!selectedCV) return;
    setModalState("submitting");
    clearSubmitError();

    try {
      const parsedId = parseInt(selectedCV, 10);
      if (!parsedId) throw new Error("Invalid CV ID");

      await applyToJob({
        jobId: Number(job.id),
        cvFileId: parsedId,
      });
      setModalState("success");
    } catch {
      // submitError is already set in the store
      setModalState("form");
    }
  };

  // Handle close after success
  const handleCloseAfterSuccess = () => {
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
            onClick={modalState === "submitting" ? undefined : onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Main Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl md:max-h-[90vh] bg-white dark:bg-[#1C252E] rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08]"
          >
            {/* Render based on state */}
            {modalState === "success" && (
              <SuccessView job={job} onClose={handleCloseAfterSuccess} />
            )}
            {modalState === "already-applied" && (
              <AlreadyAppliedView
                job={job}
                onClose={onClose}
                onWithdraw={async () => {
                  await withdrawApplication(job.id);
                  setModalState("form");
                }}
              />
            )}
            {modalState === "job-closed" && (
              <JobClosedView job={job} onClose={onClose} />
            )}
            {(modalState === "form" || modalState === "submitting") && (
              <FormView
                job={job}
                cvFiles={cvFiles}
                isLoadingCvs={isLoadingCvs}
                selectedCV={selectedCV}
                coverLetter={coverLetter}
                isSubmitting={modalState === "submitting"}
                submitError={submitError}
                onCoverLetterChange={setCoverLetter}
                onSelectCV={setSelectedCV}
                onViewCV={handleViewCV}
                onSubmit={handleSubmit}
                onClose={onClose}
                formatDate={formatDate}
              />
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ==================== Success View ====================
function SuccessView({ job, onClose }: { job: Job; onClose: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-[400px] text-center">
      {/* Animated Success Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
        className="relative mb-6"
      >
        {/* Background glow */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 w-24 h-24 bg-green-400 rounded-full blur-xl"
        />
        {/* Icon container */}
        <div className="relative w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.3 }}
          >
            <CheckCircle2 className="w-12 h-12 text-white" />
          </motion.div>
        </div>

        {/* Confetti particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              scale: 0,
              x: 0,
              y: 0,
              rotate: 0
            }}
            animate={{
              scale: [0, 1, 1, 0],
              x: Math.cos(i * 30 * Math.PI / 180) * 100,
              y: Math.sin(i * 30 * Math.PI / 180) * 100,
              rotate: Math.random() * 360
            }}
            transition={{
              duration: 1.5,
              delay: 0.4 + i * 0.05,
              ease: "easeOut"
            }}
            className="absolute top-1/2 left-1/2 w-3 h-3 rounded-sm"
            style={{
              backgroundColor: ["#10B981", "#3B82F6", "#8B5CF6", "#F59E0B", "#EC4899"][i % 5],
              marginTop: -6,
              marginLeft: -6
            }}
          />
        ))}
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <PartyPopper className="w-6 h-6 text-yellow-500" />
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Ứng tuyển thành công!
          </h2>
          <PartyPopper className="w-6 h-6 text-yellow-500 scale-x-[-1]" />
        </div>
        <p className="text-slate-500 dark:text-slate-400 mb-2">
          Hồ sơ của bạn đã được gửi đến
        </p>
        <p className="text-lg font-semibold text-[#22C55E] mb-6">
          {job.company}
        </p>
      </motion.div>

      {/* Info card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-full max-w-sm bg-slate-50 dark:bg-slate-800 rounded-2xl p-4 mb-6"
      >
        <div className="flex items-center gap-3">
          <img
            src={job.logoUrl}
            alt={job.company}
            className="w-12 h-12 rounded-xl object-cover"
          />
          <div className="text-left">
            <p className="font-semibold text-slate-900 dark:text-white">
              {job.title}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {job.company} • {job.location}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Action buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-3 w-full max-w-sm"
      >
        <Link href="/applications" className="flex-1">
          <Button
            variant="outline"
            className="w-full rounded-full"
          >
            <Briefcase className="w-4 h-4 mr-2" />
            Xem đơn ứng tuyển
          </Button>
        </Link>
        <Button
          onClick={onClose}
          className="flex-1 bg-[#1C252E] dark:bg-white text-white dark:text-[#1C252E] hover:bg-[#1C252E]/90 dark:hover:bg-white/90 rounded-xl"
        >
          Tiếp tục tìm việc
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </motion.div>
    </div>
  );
}

// ==================== Already Applied View ====================
function AlreadyAppliedView({ job, onClose, onWithdraw }: { job: Job; onClose: () => void; onWithdraw: () => void }) {
  const { getApplicationDate } = useApplicationStore();
  const appliedDate = getApplicationDate(job.id);
  const [confirmWithdraw, setConfirmWithdraw] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-[400px] text-center">
      {/* Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-orange-500/30"
      >
        <AlertTriangle className="w-10 h-10 text-white" />
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Bạn đã ứng tuyển rồi!
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6">
          Bạn đã gửi hồ sơ cho vị trí này trước đó
        </p>
      </motion.div>

      {/* Info card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="w-full max-w-sm bg-amber-50 dark:bg-amber-900/20 rounded-2xl p-4 mb-6 border border-amber-200 dark:border-amber-800"
      >
        <div className="flex items-center gap-3">
          <img
            src={job.logoUrl}
            alt={job.company}
            className="w-12 h-12 rounded-xl object-cover"
          />
          <div className="text-left flex-1">
            <p className="font-semibold text-slate-900 dark:text-white">
              {job.title}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {job.company}
            </p>
            {appliedDate && (
              <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                Đã ứng tuyển: {new Date(appliedDate).toLocaleDateString("vi-VN")}
              </p>
            )}
          </div>
          <div className="px-3 py-1 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 rounded-full text-xs font-medium">
            Đã gửi
          </div>
        </div>
      </motion.div>

      {/* Action buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-3 w-full max-w-sm"
      >
        <Link href="/applications" className="flex-1">
          <Button
            variant="outline"
            className="w-full rounded-full"
          >
            <Briefcase className="w-4 h-4 mr-2" />
            Xem trạng thái
          </Button>
        </Link>
        <Button
          onClick={onClose}
          className="flex-1 bg-[#1C252E] dark:bg-white text-white dark:text-[#1C252E] hover:bg-[#1C252E]/90 dark:hover:bg-white/90 rounded-xl"
        >
          Tìm việc khác
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </motion.div>

      {/* Withdraw action */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-2"
      >
        {!confirmWithdraw ? (
          <button
            onClick={() => setConfirmWithdraw(true)}
            className="text-xs text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 transition-colors flex items-center gap-1 mx-auto"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Rút hồ sơ & ứng tuyển lại
          </button>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <span className="text-xs text-red-500">Bạn chắc chứ?</span>
            <button
              onClick={onWithdraw}
              className="text-xs font-semibold text-red-600 hover:text-red-700 underline"
            >
              Xác nhận
            </button>
            <button
              onClick={() => setConfirmWithdraw(false)}
              className="text-xs text-slate-400 hover:text-slate-600"
            >
              Huỷ
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

// ==================== Job Closed View ====================
function JobClosedView({ job, onClose }: { job: Job; onClose: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-[400px] text-center">
      {/* Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="w-20 h-20 bg-gradient-to-br from-slate-400 to-slate-600 rounded-full flex items-center justify-center mb-6 shadow-lg"
      >
        <XCircle className="w-10 h-10 text-white" />
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Tin tuyển dụng đã đóng
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6">
          Rất tiếc, vị trí này không còn nhận hồ sơ
        </p>
      </motion.div>

      {/* Info card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="w-full max-w-sm bg-slate-100 dark:bg-slate-800 rounded-2xl p-4 mb-6"
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={job.logoUrl}
              alt={job.company}
              className="w-12 h-12 rounded-xl object-cover grayscale opacity-60"
            />
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <X className="w-3 h-3 text-white" />
            </div>
          </div>
          <div className="text-left flex-1">
            <p className="font-semibold text-slate-500 dark:text-slate-400 line-through">
              {job.title}
            </p>
            <p className="text-sm text-slate-400 dark:text-slate-500">
              {job.company}
            </p>
          </div>
          <div className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full text-xs font-medium">
            Đã đóng
          </div>
        </div>
      </motion.div>

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-sm bg-[#22c55e]/10 dark:bg-[#22c55e]/20 rounded-2xl p-4 mb-6 border border-[#22c55e]/30 dark:border-[#22c55e]/30"
      >
        <p className="text-sm text-[#22c55e] dark:text-[#22c55e]">
          💡 <strong>Tip:</strong> Hãy lưu công ty này vào danh sách theo dõi để nhận thông báo khi có vị trí mới!
        </p>
      </motion.div>

      {/* Action buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col sm:flex-row gap-3 w-full max-w-sm"
      >
        <Button
          variant="outline"
          onClick={onClose}
          className="flex-1 rounded-full"
        >
          Đóng
        </Button>
        <Link href="/jobs" className="flex-1">
          <Button
            className="w-full bg-[#1C252E] dark:bg-white text-white dark:text-[#1C252E] hover:bg-[#1C252E]/90 dark:hover:bg-white/90 rounded-xl"
          >
            Tìm việc khác
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}

// ==================== Form View (Original) ====================
interface FormViewProps {
  job: Job;
  cvFiles: CvFileResponse[];
  isLoadingCvs: boolean;
  selectedCV: string;
  coverLetter: string;
  isSubmitting: boolean;
  submitError: string | null;
  onCoverLetterChange: (value: string) => void;
  onSelectCV: (cvId: string) => void;
  onViewCV: (cv: CvFileResponse) => void;
  onSubmit: () => void;
  onClose: () => void;
  formatDate: (date: string) => string;
}

function FormView({
  job,
  cvFiles,
  isLoadingCvs,
  selectedCV,
  coverLetter,
  isSubmitting,
  submitError,
  onCoverLetterChange,
  onSelectCV,
  onViewCV,
  onSubmit,
  onClose,
  formatDate,
}: FormViewProps) {
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-[rgba(145,158,171,0.12)] dark:border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#22C55E]/10 rounded-xl flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-[#22C55E]" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#1C252E] dark:text-white">
              Ứng tuyển
            </h2>
            <p className="text-sm text-[#919EAB]">
              {job.title} - {job.company}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          disabled={isSubmitting}
          className="w-10 h-10 rounded-full hover:bg-[rgba(145,158,171,0.08)] flex items-center justify-center transition-colors disabled:opacity-50"
        >
          <X className="w-5 h-5 text-[#919EAB]" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* CV Selection */}
        <div>
          <label className="block text-sm font-semibold text-[#1C252E] dark:text-[#C4CDD5] mb-2">
            Chọn CV để ứng tuyển
          </label>
          <p className="text-xs text-[#919EAB] mb-3">
            Click vào CV để chọn, hoặc click "Xem CV" để xem chi tiết và chỉnh sửa
          </p>
          <div className="space-y-3">
            {isLoadingCvs ? (
              <div className="flex items-center justify-center p-8 bg-[rgba(145,158,171,0.04)] dark:bg-[rgba(145,158,171,0.08)] rounded-xl">
                 <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-5 h-5 border-2 border-[#22C55E]/30 border-t-[#22C55E] rounded-full" />
                 <span className="ml-3 text-sm text-[#919EAB]">Đang tải CV...</span>
              </div>
            ) : cvFiles.length === 0 ? (
              <div className="text-center p-8 bg-[rgba(145,158,171,0.04)] dark:bg-[rgba(145,158,171,0.08)] rounded-xl border border-dashed border-[rgba(145,158,171,0.2)]">
                <FileText className="w-10 h-10 text-[#919EAB] mx-auto mb-3" />
                <p className="text-[#1C252E] dark:text-white font-medium mb-1">Bạn chưa có CV nào</p>
                <p className="text-sm text-[#919EAB] mb-4">Vui lòng tải lên hoặc tạo CV mới để ứng tuyển</p>
                <Link href="/cv-files">
                  <Button variant="outline" size="sm" className="rounded-full">Đi tới Quản lý CV</Button>
                </Link>
              </div>
            ) : (
              cvFiles.map((cv) => (
                <CVCard
                  key={cv.id}
                  cv={cv}
                  isSelected={selectedCV === cv.id.toString()}
                  onSelect={() => onSelectCV(cv.id.toString())}
                  onView={() => onViewCV(cv)}
                  formatDate={formatDate}
                />
              ))
            )}
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
                Đã chọn: <strong>{cvFiles.find((cv) => cv.id.toString() === selectedCV)?.fileName}</strong>
              </p>
            </div>

            <label className="block text-sm font-semibold text-[#1C252E] dark:text-[#C4CDD5] mb-2">
              <strong>Bước 2:</strong> Viết thư xin việc (Tùy chọn)
            </label>
            <textarea
              value={coverLetter}
              onChange={(e) => onCoverLetterChange(e.target.value)}
              placeholder="Viết thư xin việc để giới thiệu bản thân và thể hiện sự quan tâm đến vị trí này..."
              className="w-full h-40 px-4 py-3 rounded-xl border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] bg-white dark:bg-[#1C252E] text-[#1C252E] dark:text-white placeholder:text-[#919EAB] focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/20 outline-none resize-none"
              disabled={isSubmitting}
            />
            <p className="text-xs text-[#919EAB] mt-2">
              💡 Tip: Một thư xin việc tốt sẽ tăng cơ hội được nhà tuyển dụng chú ý!
            </p>
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-[rgba(145,158,171,0.12)] dark:border-white/[0.06] bg-[rgba(145,158,171,0.02)] dark:bg-[rgba(145,158,171,0.04)]">
        <div className="flex items-center justify-between">
          <div className="text-sm text-[#919EAB]">
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
          {submitError && (
            <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg">
              {submitError}
            </div>
          )}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-full px-6"
            >
              Hủy
            </Button>
            <Button
              onClick={onSubmit}
              disabled={!selectedCV || isSubmitting}
              className="bg-[#1C252E] dark:bg-white text-white dark:text-[#1C252E] hover:bg-[#1C252E]/90 dark:hover:bg-white/90 rounded-xl px-8 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
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
    </>
  );
}

// ==================== CV Card Component ====================
interface CVCardProps {
  cv: CvFileResponse;
  isSelected: boolean;
  onSelect: () => void;
  onView: () => void;
  formatDate: (date: string) => string;
}

function CVCard({ cv, isSelected, onSelect, onView, formatDate }: CVCardProps) {
  return (
    <motion.div
      onClick={onSelect}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={`relative flex items-start gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${isSelected
        ? "border-[#22C55E] bg-[#22C55E]/5 dark:bg-[#22C55E]/10"
        : "border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] hover:border-[#22C55E]/50 hover:bg-[#22C55E]/5 bg-white dark:bg-[#1C252E]"
        }`}
    >
      {/* Thumbnail */}
      <div className="w-16 h-20 rounded-lg overflow-hidden bg-[rgba(145,158,171,0.04)] dark:bg-[rgba(145,158,171,0.08)] shrink-0 flex items-center justify-center">
        <FileText className="w-8 h-8 text-[#919EAB]" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h4 className="font-semibold text-[#1C252E] dark:text-white truncate max-w-xs">
            {cv.fileName}
          </h4>
          {cv.isPrimary && (
            <span className="px-2 py-0.5 text-xs font-medium bg-[#FFAB00]/10 text-[#FFAB00] rounded-full shrink-0">
              Mặc định
            </span>
          )}
          {isSelected && (
            <span className="px-2 py-0.5 text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full flex items-center gap-1 shrink-0">
              <Check className="w-3 h-3" />
              Đã chọn
            </span>
          )}
        </div>
        <p className="text-sm text-[#919EAB] mt-0.5">
          {cv.source === "BUILDER" ? "Tạo từ SmartHire" : "Tải lên từ máy"} • {cv.fileType}
        </p>
        <p className="text-xs text-[#919EAB] mt-1">
          Cập nhật: {formatDate(cv.createdAt)}
        </p>
      </div>

      {/* View button - separate click handler */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onView();
        }}
        className="flex items-center gap-2 shrink-0 text-[#22C55E] hover:text-[#22C55E]/80 px-3 py-2 rounded-xl hover:bg-[#22C55E]/5 transition-colors"
      >
        <span className="text-xs hidden sm:block">Xem CV</span>
        <Eye className="w-5 h-5" />
      </button>
    </motion.div>
  );
}

