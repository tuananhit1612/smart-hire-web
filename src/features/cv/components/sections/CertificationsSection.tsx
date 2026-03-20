"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Plus, X, ExternalLink } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { useConfirmDialog } from "@/shared/components/ui/confirm-dialog";
import { Certification } from "../../types/types";

const generateId = () => Math.random().toString(36).substr(2, 9);

interface CertificationsSectionProps {
    data: Certification[];
    onChange: (data: Certification[]) => void;
}

export function CertificationsSection({ data, onChange }: CertificationsSectionProps) {
    const { DialogComponent, confirm } = useConfirmDialog();

    const addCertification = () => {
        onChange([...data, { id: generateId(), name: "", issuer: "", date: "" }]);
    };

    const updateCert = (id: string, field: keyof Certification, value: string) => {
        onChange(data.map(cert => cert.id === id ? { ...cert, [field]: value } : cert));
    };

    const removeCert = async (id: string) => {
        const cert = data.find(c => c.id === id);
        const confirmed = await confirm({
            title: "Xóa chứng chỉ",
            message: `Bạn có chắc muốn xóa "${cert?.name || "chứng chỉ này"}"?`,
            confirmText: "Xóa",
            cancelText: "Hủy",
            variant: "danger",
        });
        if (confirmed) {
            onChange(data.filter(c => c.id !== id));
        }
    };

    return (
        <div className="space-y-6">
            {DialogComponent}

            {/* Header */}
            <div className="flex items-center gap-3 pb-2 border-b border-gray-100 dark:border-zinc-700">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg">
                    <ShieldCheck className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Chứng chỉ</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Các chứng chỉ và chứng nhận bạn đạt được</p>
                </div>
            </div>

            {/* Certification Items */}
            <AnimatePresence mode="popLayout">
                {data.map((cert) => (
                    <motion.div
                        key={cert.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20, scale: 0.95 }}
                        layout
                        className="group relative bg-white dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700 rounded-2xl p-4 hover:border-amber-200 dark:hover:border-amber-700 hover:shadow-md transition-all duration-200"
                    >
                        {/* Remove button */}
                        <button
                            type="button"
                            onClick={() => removeCert(cert.id)}
                            className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all"
                        >
                            <X className="w-4 h-4 text-red-400" />
                        </button>

                        <div className="space-y-3">
                            {/* Row 1: Name + Issuer */}
                            <div className="grid grid-cols-2 gap-3">
                                <Input
                                    value={cert.name}
                                    onChange={(e) => updateCert(cert.id, "name", e.target.value)}
                                    placeholder="Tên chứng chỉ"
                                    className="h-9 rounded-xl"
                                />
                                <Input
                                    value={cert.issuer}
                                    onChange={(e) => updateCert(cert.id, "issuer", e.target.value)}
                                    placeholder="Tổ chức cấp"
                                    className="h-9 rounded-xl"
                                />
                            </div>

                            {/* Row 2: Date + Expiry + URL */}
                            <div className="grid grid-cols-3 gap-3">
                                <Input
                                    type="month"
                                    value={cert.date}
                                    onChange={(e) => updateCert(cert.id, "date", e.target.value)}
                                    placeholder="Ngày cấp"
                                    className="h-9 rounded-xl text-sm"
                                />
                                <Input
                                    type="month"
                                    value={cert.expiry || ""}
                                    onChange={(e) => updateCert(cert.id, "expiry", e.target.value)}
                                    placeholder="Hết hạn (tùy chọn)"
                                    className="h-9 rounded-xl text-sm"
                                />
                                <div className="relative">
                                    <Input
                                        value={cert.url || ""}
                                        onChange={(e) => updateCert(cert.id, "url", e.target.value)}
                                        placeholder="URL xác minh"
                                        className="h-9 rounded-xl text-sm pr-8"
                                    />
                                    {cert.url && (
                                        <a
                                            href={cert.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-amber-500"
                                        >
                                            <ExternalLink className="w-3.5 h-3.5" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>

            {/* Add Button */}
            <Button
                variant="outline"
                size="md"
                leftIcon={<Plus className="w-4 h-4" />}
                onClick={addCertification}
                className="w-full border-dashed border-gray-300 dark:border-zinc-600 hover:border-amber-400 hover:text-amber-600"
            >
                Thêm chứng chỉ
            </Button>
        </div>
    );
}
