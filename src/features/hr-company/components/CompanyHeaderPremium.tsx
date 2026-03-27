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
    Sparkles,
    Star,
    TrendingUp,
    Award,
    Settings,
} from "lucide-react";
import { Company, COMPANY_SIZES } from "../types/company";
import { LogoUpload } from "./LogoUpload";
import { Button } from "@/shared/components/ui/button";
import { AnimatedCounter, StatCard } from "./ui/premium-effects";
import { CoverUploadModal } from "./CoverUploadModal";
import { CompanyInfoEditor } from "./CompanyInfoEditor";
import { useCompanyStore } from "../stores/company-store";

interface CompanyHeaderProps {
    company: Company;
    onUpdate?: (updates: Partial<Company>) => void;
    editable?: boolean;
}

export function CompanyHeaderPremium({ company, onUpdate, editable = true }: CompanyHeaderProps) {
    const { uploadLogo } = useCompanyStore();
    const [isQuickEdit, setIsQuickEdit] = React.useState(false);
    const [showCoverModal, setShowCoverModal] = React.useState(false);
    const [showInfoEditor, setShowInfoEditor] = React.useState(false);
    const [editData, setEditData] = React.useState({
        name: company.name,
        tagline: company.tagline || "",
    });

    const handleQuickSave = () => {
        onUpdate?.({
            name: editData.name,
            tagline: editData.tagline,
        });
        setIsQuickEdit(false);
    };

    const handleQuickCancel = () => {
        setEditData({
            name: company.name,
            tagline: company.tagline || "",
        });
        setIsQuickEdit(false);
    };

    const handleCoverUpload = (_file: File | null, url?: string) => {
        if (url) {
            onUpdate?.({ coverUrl: url });
        }
    };

    const handleLogoChange = async (urlOrFile: string | File | null) => {
        if (urlOrFile instanceof File) {
            await uploadLogo(urlOrFile);
        } else if (typeof urlOrFile === "string") {
            onUpdate?.({ logoUrl: urlOrFile });
        }
    };

    // Calculate stats from company data
    const yearsActive = company.founded
        ? new Date().getFullYear() - parseInt(company.founded)
        : 5;
    const employeeCount =
        company.size === "1000+"
            ? 1200
            : company.size === "501-1000"
                ? 750
                : company.size === "201-500"
                    ? 350
                    : company.size === "51-200"
                        ? 120
                        : company.size === "11-50"
                            ? 30
                            : 8;
    const benefitCount = company.benefits.length;
    const techCount = company.techStack.length;

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
            >
                <div
                    className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-white/90 via-white/80 to-[#22c55e]/5 dark:from-[#1C252E] dark:via-[#1C252E] dark:to-[#1C252E] backdrop-blur-2xl border border-white/60 dark:border-white/[0.08] shadow-2xl shadow-[#22c55e]/20"
                >
                    {/* Animated gradient border */}
                    <div className="absolute inset-0 rounded-[2rem] p-[1px] bg-gradient-to-r from-[#22c55e]/30 via-green-400/30 to-[#10b981]/30 animate-pulse" />

                    {/* Cover Image with Parallax */}
                    <div className="h-56 sm:h-64 relative overflow-hidden">
                        {company.coverUrl ? (
                            <img
                                src={company.coverUrl}
                                alt="Company Cover"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-[#22c55e] via-[#10b981] to-[#10b981] relative overflow-hidden">
                                {/* Animated waves */}
                                <svg
                                    className="absolute bottom-0 left-0 w-full"
                                    viewBox="0 0 1200 120"
                                    preserveAspectRatio="none"
                                >
                                    <motion.path
                                        animate={{
                                            d: [
                                                "M0,60 C300,120 600,0 900,60 C1050,90 1150,30 1200,60 L1200,120 L0,120 Z",
                                                "M0,80 C300,40 600,100 900,60 C1050,40 1150,80 1200,60 L1200,120 L0,120 Z",
                                                "M0,60 C300,120 600,0 900,60 C1050,90 1150,30 1200,60 L1200,120 L0,120 Z",
                                            ],
                                        }}
                                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                                        fill="rgba(255,255,255,0.1)"
                                    />
                                </svg>
                                {/* Floating particles in cover */}
                                {[...Array(6)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{
                                            y: [0, -20, 0],
                                            x: [0, 10 * (i % 2 === 0 ? 1 : -1), 0],
                                            opacity: [0.3, 0.7, 0.3],
                                        }}
                                        transition={{
                                            duration: 3 + i,
                                            repeat: Infinity,
                                            delay: i * 0.5,
                                        }}
                                        className="absolute w-2 h-2 bg-white rounded-full"
                                        style={{
                                            left: `${15 + i * 15}%`,
                                            top: `${30 + (i % 3) * 20}%`,
                                        }}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

                        {/* Verified Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 }}
                            className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 bg-green-500/90 backdrop-blur-sm rounded-full text-white text-sm font-medium shadow-lg"
                        >
                            <Check className="w-4 h-4" />
                            Đã xác minh
                            <Sparkles className="w-3 h-3" />
                        </motion.div>

                        {/* Edit Cover Button */}
                        {editable && (
                            <motion.button
                                onClick={() => setShowCoverModal(true)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="absolute top-4 right-4 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-medium flex items-center gap-2 hover:bg-white/30 transition-colors border border-white/30"
                            >
                                <Pencil className="w-4 h-4" />
                                Đổi ảnh bìa
                            </motion.button>
                        )}
                    </div>

                    {/* Content Section */}
                    <div className="relative px-8 pb-8">
                        {/* Logo - Breathing animation */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                            className="absolute -top-16 left-8"
                        >
                            <motion.div
                                animate={{
                                    boxShadow: [
                                        "0 0 0 0 rgba(14, 165, 233, 0.3)",
                                        "0 0 0 15px rgba(14, 165, 233, 0)",
                                    ],
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="p-1.5 bg-white dark:bg-[#1C252E] rounded-2xl shadow-2xl"
                            >
                                <LogoUpload
                                    currentLogo={company.logoUrl}
                                    size="lg"
                                    editable={editable}
                                    onLogoChange={handleLogoChange}
                                />
                            </motion.div>
                        </motion.div>

                        {/* Company Info */}
                        <div className="pt-24">
                            {isQuickEdit ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="space-y-3"
                                >
                                    <input
                                        type="text"
                                        value={editData.name}
                                        onChange={(e) =>
                                            setEditData({ ...editData, name: e.target.value })
                                        }
                                        className="w-full text-2xl font-bold bg-[#22c55e]/10 dark:bg-white/[0.04] rounded-xl px-4 py-2 border-2 border-[#22c55e]/30 dark:border-white/[0.08] focus:border-[#22c55e]/30 focus:outline-none text-[#1C252E] dark:text-white"
                                        placeholder="Tên công ty"
                                    />
                                    <input
                                        type="text"
                                        value={editData.tagline}
                                        onChange={(e) =>
                                            setEditData({ ...editData, tagline: e.target.value })
                                        }
                                        className="w-full text-base bg-[#22c55e]/10 dark:bg-white/[0.04] rounded-xl px-4 py-2 border-2 border-[#22c55e]/30 dark:border-white/[0.08] focus:border-[#22c55e]/30 focus:outline-none text-[#22c55e] dark:text-[#C4CDD5]"
                                        placeholder="Slogan công ty"
                                    />
                                    <div className="flex gap-2">
                                        <Button
                                            onClick={handleQuickSave}
                                            className="bg-green-500 hover:bg-green-600 text-white rounded-full px-5"
                                        >
                                            <Check className="w-4 h-4 mr-1" />
                                            Lưu
                                        </Button>
                                        <Button
                                            onClick={handleQuickCancel}
                                            variant="outline"
                                            className="rounded-full px-5"
                                        >
                                            <X className="w-4 h-4 mr-1" />
                                            Hủy
                                        </Button>
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                    <div>
                                        <motion.h1
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.4 }}
                                            className="text-3xl sm:text-4xl font-bold text-[#1C252E] dark:text-white"
                                        >
                                            {company.name}
                                        </motion.h1>
                                        {company.tagline && (
                                            <motion.p
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.5 }}
                                                className="text-[#22c55e] dark:text-[#C4CDD5] mt-2 text-lg flex items-center gap-2"
                                            >
                                                <Sparkles className="w-4 h-4 text-yellow-500" />
                                                {company.tagline}
                                            </motion.p>
                                        )}
                                    </div>
                                    {editable && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.6 }}
                                            className="flex gap-2"
                                        >
                                            <Button
                                                onClick={() => setIsQuickEdit(true)}
                                                className="bg-gradient-to-r from-[#22c55e] to-[#10b981] hover:from-[#22c55e] hover:to-[#10b981] text-white rounded-full px-5 shadow-lg hover:shadow-xl transition-all"
                                            >
                                                <Pencil className="w-4 h-4 mr-2" />
                                                Sửa nhanh
                                            </Button>
                                            <Button
                                                onClick={() => setShowInfoEditor(true)}
                                                variant="outline"
                                                className="rounded-full px-5 border-[#22c55e]/30 dark:border-white/[0.08] hover:border-[#22c55e]/30 dark:hover:border-white/[0.16] hover:bg-[#22c55e]/10 dark:hover:bg-white/[0.04] dark:text-[#C4CDD5]"
                                            >
                                                <Settings className="w-4 h-4 mr-2" />
                                                Tất cả thông tin
                                            </Button>
                                        </motion.div>
                                    )}
                                </div>
                            )}

                            {/* Quick Stats - Bento Style */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                                className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8"
                            >
                                <StatCard
                                    icon={<Calendar className="w-5 h-5" />}
                                    value={yearsActive}
                                    label="Năm hoạt động"
                                    suffix="+"
                                    gradient="bg-gradient-to-br from-[#22c55e] to-[#10b981]"
                                    delay={0.1}
                                />
                                <StatCard
                                    icon={<Users className="w-5 h-5" />}
                                    value={employeeCount}
                                    label="Nhân viên"
                                    suffix="+"
                                    gradient="bg-gradient-to-br from-green-500 to-emerald-600"
                                    delay={0.2}
                                />
                                <StatCard
                                    icon={<Award className="w-5 h-5" />}
                                    value={benefitCount}
                                    label="Phúc lợi"
                                    gradient="bg-gradient-to-br from-purple-500 to-[#10b981]"
                                    delay={0.3}
                                />
                                <StatCard
                                    icon={<TrendingUp className="w-5 h-5" />}
                                    value={techCount}
                                    label="Công nghệ"
                                    gradient="bg-gradient-to-br from-orange-500 to-red-500"
                                    delay={0.4}
                                />
                            </motion.div>

                            {/* Info Pills - Clickable to edit */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.9 }}
                                className="flex flex-wrap gap-3 mt-6"
                            >
                                <InfoPill
                                    icon={<Building2 className="w-4 h-4" />}
                                    text={company.industry || "Chưa cập nhật ngành nghề"}
                                    onClick={editable ? () => setShowInfoEditor(true) : undefined}
                                />
                                <InfoPill
                                    icon={<MapPin className="w-4 h-4" />}
                                    text={company.location || "Chưa cập nhật địa chỉ"}
                                    onClick={editable ? () => setShowInfoEditor(true) : undefined}
                                />
                                {company.website ? (
                                    <a href={company.website} target="_blank" rel="noopener noreferrer">
                                        <InfoPill icon={<Globe className="w-4 h-4" />} text="Website" clickable />
                                    </a>
                                ) : editable && (
                                    <InfoPill
                                        icon={<Globe className="w-4 h-4" />}
                                        text="Thêm website"
                                        onClick={() => setShowInfoEditor(true)}
                                        isAdd
                                    />
                                )}
                                {company.email ? (
                                    <a href={`mailto:${company.email}`}>
                                        <InfoPill icon={<Mail className="w-4 h-4" />} text={company.email} clickable />
                                    </a>
                                ) : editable && (
                                    <InfoPill
                                        icon={<Mail className="w-4 h-4" />}
                                        text="Thêm email"
                                        onClick={() => setShowInfoEditor(true)}
                                        isAdd
                                    />
                                )}
                                {company.phone ? (
                                    <a href={`tel:${company.phone}`}>
                                        <InfoPill icon={<Phone className="w-4 h-4" />} text={company.phone} clickable />
                                    </a>
                                ) : editable && (
                                    <InfoPill
                                        icon={<Phone className="w-4 h-4" />}
                                        text="Thêm SĐT"
                                        onClick={() => setShowInfoEditor(true)}
                                        isAdd
                                    />
                                )}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Cover Upload Modal */}
            {showCoverModal && (
                <CoverUploadModal
                    currentCover={company.coverUrl}
                    onUpload={handleCoverUpload}
                    onClose={() => setShowCoverModal(false)}
                />
            )}

            {/* Full Info Editor Modal */}
            {showInfoEditor && (
                <CompanyInfoEditor
                    company={company}
                    onUpdate={(updates) => onUpdate?.(updates)}
                    onClose={() => setShowInfoEditor(false)}
                />
            )}
        </>
    );
}

function InfoPill({
    icon,
    text,
    clickable = false,
    onClick,
    isAdd = false,
}: {
    icon: React.ReactNode;
    text: string;
    clickable?: boolean;
    onClick?: () => void;
    isAdd?: boolean;
}) {
    const isClickable = clickable || onClick;
    return (
        <motion.div
            onClick={onClick}
            whileHover={isClickable ? { scale: 1.05, y: -2 } : {}}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all ${isAdd
                ? "bg-[#22c55e]/15 dark:bg-[#22c55e]/20 border-dashed border-[#22c55e]/30 dark:border-[#22c55e]/30 text-[#22c55e] dark:text-[#22c55e] hover:bg-[#22c55e]/15 dark:hover:bg-[#22c55e]/20 hover:border-[#22c55e]/30 cursor-pointer"
                : "bg-[#22c55e]/10 dark:bg-white/[0.04] border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] text-[#22c55e] dark:text-[#C4CDD5]"
                } ${isClickable && !isAdd ? "hover:bg-[#22c55e]/15 dark:hover:bg-white/[0.06] hover:border-[#22c55e]/30 dark:hover:border-white/[0.12] cursor-pointer" : ""}`}
        >
            <span className={isAdd ? "text-[#22c55e]" : "text-[#22c55e]"}>{icon}</span>
            {text}
        </motion.div>
    );
}

