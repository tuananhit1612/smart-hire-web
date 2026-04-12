"use client";

import { useState, useEffect } from "react";
import { EmployerApplicant } from "../types/mock-applicants";
import { onboardingApi, OnboardingDocumentResponse, VerificationStatus } from "@/features/onboarding/api/onboarding-api";
import { DocumentType as AppDocumentType } from "@/shared/types/enums";
import { 
    FileText, 
    CheckCircle2, 
    XCircle, 
    Loader2, 
    ExternalLink,
    AlertTriangle,
    Eye,
    ShieldCheck,
    MessageSquare
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";

interface ApplicantOnboardingTabProps {
    applicant: EmployerApplicant;
}

const docTypeLabels: Record<AppDocumentType, string> = {
    "RESUME_STAMPED": "Sơ yếu lý lịch đóng dấu",
    "ID_FRONT": "CCCD (Mặt trước)",
    "ID_BACK": "CCCD (Mặt sau)",
    "MEDICAL_CERT": "Giấy khám sức khoẻ (A3)",
    "DEGREE": "Bằng cấp / Chứng chỉ",
    "RESIDENCY_CERT": "Giấy xác nhận cư trú (CT07)",
    "OTHER": "Khác"
};

export function ApplicantOnboardingTab({ applicant }: ApplicantOnboardingTabProps) {
    const [documents, setDocuments] = useState<OnboardingDocumentResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [rejectingId, setRejectingId] = useState<number | null>(null);
    const [rejectReason, setRejectReason] = useState("");
    const [updatingId, setUpdatingId] = useState<number | null>(null);

    const fetchDocuments = async () => {
        setIsLoading(true);
        try {
            const res = await onboardingApi.getDocuments(applicant.id);
            setDocuments(res.data || []);
        } catch (error) {
            console.error("Failed to load onboarding documents:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDocuments();
    }, [applicant.id]);

    const handleDownload = async (docId: number, typeLabel: string) => {
        try {
            const url = await onboardingApi.downloadSecureDocumentAsUrl(docId);
            const a = document.createElement("a");
            a.href = url;
            a.download = `Hoso_${applicant.fullName || "UngVien"}_${typeLabel.replace(/[^a-zA-Z0-9]/g, '_')}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Failed to download document:", error);
            alert("Không thể tải file, vui lòng thử lại sau.");
        }
    };

    const handleUpdateStatus = async (docId: number, status: VerificationStatus, comment?: string) => {
        setUpdatingId(docId);
        try {
            await onboardingApi.updateStatus(docId, status, comment);
            await fetchDocuments();
            if (status === "REJECTED") {
                setRejectingId(null);
                setRejectReason("");
            }
        } catch (error) {
            console.error("Failed to update status", error);
            alert("Có lỗi xảy ra khi cập nhật trạng thái");
        } finally {
            setUpdatingId(null);
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-[#919EAB]">
                <Loader2 className="w-8 h-8 animate-spin mb-4" />
                <p>Đang tải hồ sơ nhận việc...</p>
            </div>
        );
    }

    if (documents.length === 0) {
        return (
            <div className="text-center p-12 bg-white dark:bg-[#1C252E] rounded-2xl border border-[rgba(145,158,171,0.12)] mt-4">
                <FileText className="w-12 h-12 md:w-16 md:h-16 text-[#919EAB] mx-auto mb-4 opacity-50" />
                <h3 className="text-base font-semibold text-[#1C252E] dark:text-white mb-1">
                    Chưa có hồ sơ nhận việc
                </h3>
                <p className="text-sm text-[#637381] dark:text-[#919EAB]">
                    Ứng viên chưa tải lên bất kỳ giấy tờ nào.
                </p>
            </div>
        );
    }

    // Các tài liệu onboarding chuyên biệt
    const onboardingDocTypes: AppDocumentType[] = [
        "RESUME_STAMPED", "ID_FRONT", "ID_BACK", "MEDICAL_CERT", "DEGREE", "RESIDENCY_CERT"
    ];
    
    // Fill in placeholders
    const slots = onboardingDocTypes.map(type => {
        const doc = documents.find(d => d.documentType === type);
        return { type, doc };
    });

    const getStatusUI = (status: VerificationStatus) => {
        if (status === "VERIFIED") return <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-0 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Hợp lệ</Badge>;
        if (status === "REJECTED") return <Badge className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-0 flex items-center gap-1"><XCircle className="w-3.5 h-3.5" /> Từ chối</Badge>;
        return <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-0 flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5" /> Chờ duyệt</Badge>;
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-900/30 text-sm text-blue-800 dark:text-blue-300">
                <ShieldCheck className="w-5 h-5 shrink-0" />
                <p>
                    Đây là khu vực chứa <strong>Dữ liệu cá nhân nhạy cảm (PII)</strong>. Hệ thống AI đã hỗ trợ nhận diện và cross-check CCCD. Tệp tin không cung cấp public URL.
                </p>
            </div>

            {slots.map((slot, index) => {
                const label = docTypeLabels[slot.type] || slot.type;
                const doc = slot.doc;

                if (!doc) {
                    return (
                        <div key={slot.type} className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center p-4 bg-white dark:bg-[#1C252E] rounded-xl border border-[rgba(145,158,171,0.12)] opacity-70 border-dashed">
                            <div>
                                <p className="text-sm font-semibold text-[#1C252E] dark:text-white mb-0.5">{label}</p>
                                <p className="text-xs text-[#919EAB]">Chưa bổ sung</p>
                            </div>
                            <Badge variant="outline" className="text-[#919EAB] border-[#C4CDD5] dark:border-[#637381]">Thiếu</Badge>
                        </div>
                    );
                }

                return (
                    <div key={slot.type} className="flex flex-col gap-3 p-5 bg-white dark:bg-[#1C252E] rounded-xl border border-[rgba(145,158,171,0.12)] shadow-sm">
                        <div className="flex justify-between items-start gap-4">
                            <div className="flex items-start gap-3 flex-1 min-w-0">
                                <FileText className="w-8 h-8 text-[#919EAB] shrink-0" />
                                <div>
                                    <p className="text-sm font-bold text-[#1C252E] dark:text-white mb-1">{label}</p>
                                    <div className="flex items-center gap-2 flex-wrap text-xs text-[#637381] dark:text-[#919EAB]">
                                        <span>Cập nhật lúc: {new Date(doc.updatedAt).toLocaleString("vi-VN")}</span>
                                        •
                                        {getStatusUI(doc.status)}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-2 shrink-0">
                                <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="h-8 rounded-lg text-xs font-semibold pl-2.5"
                                    onClick={() => handleDownload(doc.id, label)}
                                >
                                    <Eye className="w-3.5 h-3.5 mr-1.5" /> Xem / Tải về
                                </Button>
                            </div>
                        </div>

                        {/* AI / HR Feedback */}
                        {doc.aiFeedback && (
                            <div className={`mt-2 p-3 text-xs rounded-lg border-l-2 ${doc.status === "REJECTED" ? "bg-red-50 text-red-700 border-red-500" : "bg-purple-50 text-purple-700 border-purple-500"}`}>
                                <strong>Ghi chú:</strong> {doc.aiFeedback}
                            </div>
                        )}

                        {/* Action Buttons for Pending HR Approval */}
                        {doc.status === "PENDING" && (
                            <div className="mt-2 pt-3 border-t border-[rgba(145,158,171,0.12)] flex items-center justify-end gap-2">
                                {rejectingId === doc.id ? (
                                    <div className="flex w-full gap-2 items-center">
                                        <MessageSquare className="w-4 h-4 text-[#919EAB] shrink-0" />
                                        <input 
                                            type="text" 
                                            placeholder="Nhập lý do từ chối để ứng viên tải lại..." 
                                            className="flex-1 text-sm bg-transparent border-b border-[#C4CDD5] focus:border-red-500 focus:outline-none px-1 py-1"
                                            value={rejectReason}
                                            onChange={e => setRejectReason(e.target.value)}
                                            autoFocus
                                        />
                                        <Button size="sm" variant="ghost" onClick={() => setRejectingId(null)}>Hủy</Button>
                                        <Button 
                                            size="sm" 
                                            className="bg-red-600 hover:bg-red-700 text-white"
                                            disabled={updatingId === doc.id || !rejectReason.trim()}
                                            onClick={() => handleUpdateStatus(doc.id, "REJECTED", rejectReason)}
                                        >
                                            {updatingId === doc.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "Xác nhận"}
                                        </Button>
                                    </div>
                                ) : (
                                    <>
                                        <Button 
                                            size="sm" 
                                            variant="outline" 
                                            className="text-red-600 border-red-200 hover:bg-red-50"
                                            onClick={() => setRejectingId(doc.id)}
                                            disabled={updatingId === doc.id}
                                        >
                                            Từ chối
                                        </Button>
                                        <Button 
                                            size="sm" 
                                            className="bg-green-600 hover:bg-green-700 text-white"
                                            disabled={updatingId === doc.id}
                                            onClick={() => handleUpdateStatus(doc.id, "VERIFIED", "HR đã kiểm tra và phê duyệt")}
                                        >
                                            {updatingId === doc.id ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" /> : <CheckCircle2 className="w-3.5 h-3.5 mr-1" />}
                                            Duyệt hợp lệ
                                        </Button>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
