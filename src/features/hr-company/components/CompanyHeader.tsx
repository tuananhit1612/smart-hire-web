"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
    MapPin,
    Globe,
    Building2,
    Users,
    Calendar,
    Mail,
    Phone,
    Pencil,
    Check,
    X,
} from "lucide-react";
import { Company, COMPANY_SIZES } from "../types/company";
import { LogoUpload } from "./LogoUpload";
import { Button } from "@/shared/components/ui/button";
import { useCompanyStore } from "../stores/company-store";

interface CompanyHeaderProps {
    company: Company;
    onUpdate?: (updates: Partial<Company>) => void;
    editable?: boolean;
}

export function CompanyHeader({ company, onUpdate, editable = true }: CompanyHeaderProps) {
    const { uploadLogo } = useCompanyStore();
    const [isEditing, setIsEditing] = React.useState(false);
    const [editData, setEditData] = React.useState({
        name: company.name,
        tagline: company.tagline || "",
    });

    const handleSave = () => {
        onUpdate?.({
            name: editData.name,
            tagline: editData.tagline,
        });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditData({
            name: company.name,
            tagline: company.tagline || "",
        });
        setIsEditing(false);
    };

    const handleLogoChange = async (urlOrFile: string | File | null) => {
        if (urlOrFile instanceof File) {
            await uploadLogo(urlOrFile);
        } else if (typeof urlOrFile === "string") {
            onUpdate?.({ logoUrl: urlOrFile });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl border border-white/40 shadow-xl shadow-[#22c55e]/20"
        >
            {/* Cover Image */}
            <div className="h-48 sm:h-56 relative overflow-hidden">
                {company.coverUrl ? (
                    <img
                        src={company.coverUrl}
                        alt="Company Cover"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#22c55e] via-[#10b981] to-[#10b981]" />
                )}
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                {/* Edit Cover Button */}
                {editable && (
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="absolute top-4 right-4 px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-medium flex items-center gap-1 hover:bg-white/30 transition-colors"
                    >
                        <Pencil className="w-3 h-3" />
                        Đổi ảnh bìa
                    </motion.button>
                )}
            </div>

            {/* Content */}
            <div className="relative px-6 pb-6">
                {/* Logo - Positioned to overlap cover */}
                <div className="absolute -top-16 left-6">
                    <div className="p-1 bg-white rounded-2xl shadow-xl">
                        <LogoUpload
                            currentLogo={company.logoUrl}
                            size="lg"
                            editable={editable}
                            onLogoChange={handleLogoChange}
                        />
                    </div>
                </div>

                {/* Company Info */}
                <div className="pt-20">
                    {isEditing ? (
                        <div className="space-y-3">
                            <input
                                type="text"
                                value={editData.name}
                                onChange={(e) =>
                                    setEditData({ ...editData, name: e.target.value })
                                }
                                className="w-full text-2xl font-bold bg-[#22c55e]/10 rounded-xl px-4 py-2 border-2 border-[#22c55e]/30 focus:border-[#22c55e]/30 focus:outline-none text-[#1C252E]"
                                placeholder="Tên công ty"
                            />
                            <input
                                type="text"
                                value={editData.tagline}
                                onChange={(e) =>
                                    setEditData({ ...editData, tagline: e.target.value })
                                }
                                className="w-full text-base bg-[#22c55e]/10 rounded-xl px-4 py-2 border-2 border-[#22c55e]/30 focus:border-[#22c55e]/30 focus:outline-none text-[#22c55e]"
                                placeholder="Slogan công ty"
                            />
                            <div className="flex gap-2">
                                <Button
                                    onClick={handleSave}
                                    className="bg-green-500 hover:bg-green-600 text-white rounded-full px-4"
                                >
                                    <Check className="w-4 h-4 mr-1" />
                                    Lưu
                                </Button>
                                <Button
                                    onClick={handleCancel}
                                    variant="outline"
                                    className="rounded-full px-4"
                                >
                                    <X className="w-4 h-4 mr-1" />
                                    Hủy
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-start justify-between">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-[#1C252E]">
                                    {company.name}
                                </h1>
                                {company.tagline && (
                                    <p className="text-[#22c55e] mt-1 text-lg">{company.tagline}</p>
                                )}
                            </div>
                            {editable && (
                                <Button
                                    onClick={() => setIsEditing(true)}
                                    variant="outline"
                                    className="rounded-full border-[#22c55e]/30 hover:bg-[#22c55e]/10"
                                >
                                    <Pencil className="w-4 h-4 mr-1" />
                                    Chỉnh sửa
                                </Button>
                            )}
                        </div>
                    )}

                    {/* Quick Stats */}
                    <div className="flex flex-wrap gap-4 mt-6">
                        <QuickStat
                            icon={<Building2 className="w-4 h-4" />}
                            label={company.industry}
                        />
                        <QuickStat
                            icon={<Users className="w-4 h-4" />}
                            label={COMPANY_SIZES[company.size]}
                        />
                        <QuickStat
                            icon={<MapPin className="w-4 h-4" />}
                            label={company.location}
                        />
                        {company.founded && (
                            <QuickStat
                                icon={<Calendar className="w-4 h-4" />}
                                label={`Thành lập ${company.founded}`}
                            />
                        )}
                    </div>

                    {/* Contact & Links */}
                    <div className="flex flex-wrap gap-3 mt-4">
                        {company.website && (
                            <a
                                href={company.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#22c55e]/10 rounded-full text-sm text-[#22c55e] hover:bg-[#22c55e]/15 transition-colors"
                            >
                                <Globe className="w-4 h-4" />
                                Website
                            </a>
                        )}
                        {company.email && (
                            <a
                                href={`mailto:${company.email}`}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#22c55e]/10 rounded-full text-sm text-[#22c55e] hover:bg-[#22c55e]/15 transition-colors"
                            >
                                <Mail className="w-4 h-4" />
                                {company.email}
                            </a>
                        )}
                        {company.phone && (
                            <a
                                href={`tel:${company.phone}`}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#22c55e]/10 rounded-full text-sm text-[#22c55e] hover:bg-[#22c55e]/15 transition-colors"
                            >
                                <Phone className="w-4 h-4" />
                                {company.phone}
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function QuickStat({ icon, label }: { icon: React.ReactNode; label: string }) {
    return (
        <div className="flex items-center gap-1.5 text-sm text-[#22c55e]">
            <span className="text-[#22c55e]">{icon}</span>
            <span>{label}</span>
        </div>
    );
}

