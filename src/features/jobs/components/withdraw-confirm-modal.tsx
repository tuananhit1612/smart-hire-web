"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

interface WithdrawConfirmModalProps {
  isOpen: boolean;
  jobTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function WithdrawConfirmModal({
  isOpen,
  jobTitle,
  onConfirm,
  onCancel,
  isLoading = false,
}: WithdrawConfirmModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        // Backdrop
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onCancel}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="relative bg-white dark:bg-[#1C252E] rounded-2xl shadow-2xl w-full max-w-md p-6 border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onCancel}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-[#919EAB] hover:text-[#1C252E] dark:hover:text-white hover:bg-[rgba(145,158,171,0.1)] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Icon */}
            <div className="w-14 h-14 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center mx-auto mb-5">
              <AlertTriangle className="w-7 h-7 text-red-500" />
            </div>

            {/* Content */}
            <div className="text-center mb-6">
              <h3 className="text-lg font-bold text-[#1C252E] dark:text-white mb-2">
                Xác nhận rút hồ sơ
              </h3>
              <p className="text-[#637381] dark:text-[#919EAB] text-sm leading-relaxed">
                Bạn có chắc muốn rút hồ sơ khỏi vị trí{" "}
                <span className="font-semibold text-[#1C252E] dark:text-white">
                  &quot;{jobTitle}&quot;
                </span>
                ? Bạn vẫn có thể ứng tuyển lại sau.
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 h-11 rounded-xl border-[rgba(145,158,171,0.3)] text-[#637381] hover:text-[#1C252E] dark:hover:text-white"
                onClick={onCancel}
                disabled={isLoading}
              >
                Huỷ
              </Button>
              <Button
                className="flex-1 h-11 rounded-xl bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/20 transition-all"
                onClick={onConfirm}
                disabled={isLoading}
              >
                {isLoading ? "Đang rút..." : "Xác nhận rút"}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
