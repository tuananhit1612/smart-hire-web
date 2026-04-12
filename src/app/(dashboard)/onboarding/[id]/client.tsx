"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, CheckCircle2, AlertTriangle, AlertCircle, FileType, Check, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { onboardingApi, OnboardingDocumentResponse, VerificationStatus } from "@/features/onboarding/api/onboarding-api";
import { DocumentType } from "@/shared/types/enums";
import { useApplicationStore } from "@/features/jobs/stores/application-store";
import { cn } from "@/shared/lib/utils";

// Mapping các giấy tờ với tiêu đề và thông điệp hướng dẫn rõ ràng
const REQUIRED_DOCS = [
  {
    type: "RESUME_STAMPED" as DocumentType,
    title: "1. Sơ yếu lý lịch tự thuật",
    desc: "Bản gốc có dán ảnh và đóng dấu giáp lai của UBND phường/xã.",
    accept: ".pdf,.doc,.docx",
    aiVerified: false,
    color: "amber",
  },
  {
    type: "ID_FRONT" as DocumentType,
    title: "2. Căn cước công dân (Mặt Trước)",
    desc: "Bản gốc / Chụp rõ nét không loá hay che khuất. AI sẽ tự động kiểm duyệt.",
    accept: "image/jpeg,image/png,image/webp",
    aiVerified: true,
    color: "indigo",
  },
  {
    type: "ID_BACK" as DocumentType,
    title: "3. Căn cước công dân (Mặt Sau)",
    desc: "Chụp rõ nét mặt sau có mã vạch và đặc điểm nhân dạng.",
    accept: "image/jpeg,image/png,image/webp",
    aiVerified: true,
    color: "indigo",
  },
  {
    type: "MEDICAL_CERT" as DocumentType,
    title: "4. Giấy khám sức khỏe (Mẫu A3)",
    desc: "Cấp bởi bệnh viện tuyến huyện trở lên, còn hạn trong vòng 6 tháng.",
    accept: ".pdf,image/*",
    aiVerified: false,
    color: "green",
  },
  {
    type: "DEGREE" as DocumentType,
    title: "5. Bằng cấp, Chứng chỉ",
    desc: "Bản photo công chứng bằng Đại học / Cao đẳng và các chứng chỉ liên quan.",
    accept: ".pdf,image/*",
    aiVerified: false,
    color: "blue",
  },
  {
    type: "RESIDENCY_CERT" as DocumentType,
    title: "6. Xác nhận cư trú (Mẫu CT07)",
    desc: "In từ ứng dụng VNeID hoặc làm tại Công an phường/xã.",
    accept: ".pdf,.doc,.docx,image/*",
    aiVerified: false,
    color: "rose",
  },
];

export function OnboardingClient() {
  const params = useParams();
  const router = useRouter();
  const applicationId = Number(params.id);

  const [documents, setDocuments] = useState<OnboardingDocumentResponse[]>([]);
  const [loadingInitial, setLoadingInitial] = useState(true);
  
  const [uploadingState, setUploadingState] = useState<Record<string, boolean>>({});
  const [errorState, setErrorState] = useState<Record<string, string | null>>({});

  const fetchDocs = useCallback(async () => {
    try {
      setLoadingInitial(true);
      const res = await onboardingApi.getDocuments(applicationId);
      if (res.success && res.data) {
        setDocuments(res.data);
      }
    } catch (err: any) {
      console.error("Failed to fetch documents:", err);
    } finally {
      setLoadingInitial(false);
    }
  }, [applicationId]);

  useEffect(() => {
    fetchDocs();
  }, [fetchDocs]);

  const handleFileUpload = async (file: File, docType: DocumentType) => {
    try {
      setUploadingState((prev) => ({ ...prev, [docType]: true }));
      setErrorState((prev) => ({ ...prev, [docType]: null }));

      const res = await onboardingApi.uploadDocument(applicationId, file, docType);
      
      if (res.success && res.data) {
        setDocuments((prev) => {
          const filtered = prev.filter((d) => d.documentType !== docType);
          return [...filtered, res.data];
        });
      } else {
        setErrorState((prev) => ({ ...prev, [docType]: res.message || "Tải lên thất bại." }));
      }
    } catch (err: any) {
      setErrorState((prev) => ({ 
        ...prev, 
        [docType]: err?.response?.data?.message || err.message || "Lỗi giao tiếp máy chủ" 
      }));
    } finally {
      setUploadingState((prev) => ({ ...prev, [docType]: false }));
    }
  };

  const getDocStatus = (docType: DocumentType) => documents.find((d) => d.documentType === docType);

  if (loadingInitial) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-24 text-[#919EAB]">
        <Loader2 className="w-10 h-10 animate-spin mb-4 text-[#22c55e]" />
        <p>Đang tải dữ liệu hồ sơ công ty...</p>
      </div>
    );
  }

  return (
    <div className="min-h-[100vh] bg-gradient-to-br from-slate-50 to-slate-100 dark:from-[#161C24] dark:to-[#1C252E] py-12 pb-24 font-sans text-[#1C252E] dark:text-white">
      <div className="container max-w-5xl mx-auto px-4">
        
        <div className="mb-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
          <Link 
            href="/onboarding"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-white/5 border border-[rgba(145,158,171,0.2)] dark:border-white/10 text-sm font-bold text-[#637381] hover:text-purple-500 hover:border-purple-500/30 transition-all mb-8 shadow-sm group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Quay lại danh sách
          </Link>
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 shadow-xl shadow-purple-500/20 flex items-center justify-center text-white shrink-0 rotate-2">
              <FileType className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-extrabold text-[#1C252E] dark:text-white tracking-tight mb-2">Cập nhật hồ sơ nhận việc</h1>
              <p className="text-[#637381] dark:text-[#919EAB] font-medium text-lg max-w-3xl leading-relaxed">
                Hoàn tất các bước cuối cùng để chuẩn bị cho ngày đầu tiên gia nhập đội ngũ.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-12 p-6 rounded-3xl bg-indigo-50/50 dark:bg-indigo-500/5 border border-indigo-100 dark:border-indigo-500/20 flex flex-col md:flex-row items-center md:items-center gap-6 relative overflow-hidden group">
          <div className="w-12 h-12 rounded-2xl bg-white dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0 shadow-sm ring-1 ring-indigo-200 dark:ring-indigo-800">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h4 className="font-bold text-indigo-900 dark:text-indigo-100 text-lg mb-1">Dữ liệu được bảo mật tối đa</h4>
            <p className="text-indigo-700/80 dark:text-indigo-300/80 text-base font-medium leading-relaxed">
              SmartHire sử dụng mã hóa <strong>AES-256</strong> và công nghệ <strong>AI Fraud Detection</strong> để bảo vệ thông tin cá nhân của bạn.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
          {REQUIRED_DOCS.map((doc, idx) => {
            const uploadedDoc = getDocStatus(doc.type);
            const isUploading = uploadingState[doc.type];
            const errorText = errorState[doc.type];

            let statusCardCSS = "bg-white dark:bg-[#212B36] border-[rgba(145,158,171,0.2)] dark:border-[#919EAB]/20";
            if (uploadedDoc) {
              if (uploadedDoc.status === "VERIFIED") statusCardCSS = "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-700 shadow-lg shadow-emerald-500/5";
              if (uploadedDoc.status === "REJECTED") statusCardCSS = "bg-rose-50 dark:bg-rose-950/20 border-rose-300 dark:border-rose-700 ring-2 ring-rose-500/20";
              if (uploadedDoc.status === "PENDING") statusCardCSS = "bg-amber-50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-700";
            }

            return (
              <motion.div 
                key={doc.type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={cn(
                  "p-6 rounded-3xl border transition-all duration-300 relative overflow-hidden group hover:shadow-xl", 
                  statusCardCSS
                )}
              >
                {doc.aiVerified && (
                  <div className="absolute top-0 right-0 py-1.5 px-4 bg-gradient-to-l from-indigo-500 to-purple-500 rounded-bl-2xl text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                    <span>✨ AI Kiểm duyệt tự động</span>
                  </div>
                )}

                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  {doc.title}
                </h3>
                <p className="text-sm text-[#637381] dark:text-[#919EAB] mb-6 pr-4 h-10">
                  {doc.desc}
                </p>

                <div className="relative">
                  {isUploading ? (
                    <div className="h-32 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#22c55e] bg-[#22c55e]/5 animate-pulse">
                        <Loader2 className="w-8 h-8 text-[#22c55e] animate-spin mb-3" />
                        <span className="text-sm font-bold text-[#22c55e]">Đang tải và xử lý bằng AI...</span>
                    </div>
                  ) : (
                    <div className="relative group cursor-pointer">
                      <input
                        type="file"
                        accept={doc.accept}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) handleFileUpload(f, doc.type);
                        }}
                      />
                      <div className="h-32 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[rgba(145,158,171,0.3)] bg-transparent transition-all group-hover:bg-[rgba(145,158,171,0.05)] group-hover:border-[#22c55e] group-hover:text-[#22c55e]">
                        <UploadCloud className="w-8 h-8 mb-2 text-[#919EAB] group-hover:text-[#22c55e] transition-colors" />
                        <span className="text-sm font-semibold text-[#637381] group-hover:text-[#22c55e]">
                          Nhấn hoặc kéo thả file
                        </span>
                        <span className="text-xs text-[#919EAB] mt-1">{doc.accept}</span>
                      </div>
                    </div>
                  )}
                </div>

                {errorText && (
                  <p className="mt-3 text-sm text-red-500 font-semibold">{errorText}</p>
                )}
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
