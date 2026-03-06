"use client";

import { Job } from "../types/job";
import Link from "next/link";
import {
    ArrowLeft,
    MapPin,
    Briefcase,
    Clock,
    DollarSign,
    Users,
    Calendar,
    Globe,
    Building2,
    Mail,
    Phone,
    Send,
    Bookmark,
    Share2,
    CheckCircle2,
} from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { motion } from "framer-motion";
import { useState } from "react";

interface JobDetailProps {
    job: Job;
}

export function JobDetail({ job }: JobDetailProps) {
    const [isSaved, setIsSaved] = useState(false);

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    const daysAgo = (dateStr: string) => {
        const diff = Date.now() - new Date(dateStr).getTime();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        if (days === 0) return "Hôm nay";
        if (days === 1) return "Hôm qua";
        return `${days} ngày trước`;
    };

    return (
        <div className="min-h-screen bg-[#F9FAFB] dark:bg-[#141A21]">
            {/* Cover Image */}
            {job.companyInfo?.coverImageUrl && (
                <div className="relative h-48 md:h-64 w-full overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: `url(${job.companyInfo.coverImageUrl})`,
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
            )}

            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
                {/* Back button */}
                <Link
                    href="/jobs"
                    className="inline-flex items-center gap-2 text-[14px] text-[#637381] dark:text-[#919EAB] hover:text-[#1C252E] dark:hover:text-white transition-colors mb-6"
                >
                    <ArrowLeft size={16} />
                    Quay lại danh sách
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Header Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white dark:bg-[#1C252E] rounded-2xl p-6 shadow-sm border border-[#919EAB]/12 dark:border-white/8"
                        >
                            <div className="flex items-start gap-4">
                                <img
                                    src={job.logoUrl}
                                    alt={job.company}
                                    className="w-16 h-16 rounded-xl object-cover border border-[#919EAB]/12"
                                />
                                <div className="flex-1 min-w-0">
                                    <h1 className="text-2xl font-bold text-[#1C252E] dark:text-white mb-1">
                                        {job.title}
                                    </h1>
                                    <p className="text-[15px] text-[#637381] dark:text-[#919EAB] mb-3">
                                        {job.company}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-medium bg-[#22C55E]/10 text-[#22C55E]">
                                            <Briefcase size={12} />
                                            {job.type}
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-medium bg-[#919EAB]/8 text-[#637381] dark:text-[#919EAB]">
                                            {job.level}
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-medium bg-[#919EAB]/8 text-[#637381] dark:text-[#919EAB]">
                                            <MapPin size={12} />
                                            {job.location}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-4 text-[13px] text-[#919EAB]">
                                        <span className="flex items-center gap-1">
                                            <DollarSign size={14} />
                                            {job.salary}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock size={14} />
                                            {daysAgo(job.postedAt)}
                                        </span>
                                        {job.deadline && (
                                            <span className="flex items-center gap-1">
                                                <Calendar size={14} />
                                                Hạn: {formatDate(job.deadline)}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Action buttons */}
                            <div className="flex gap-3 mt-6 pt-5 border-t border-[#919EAB]/12 dark:border-white/8">
                                <button className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#22C55E] hover:bg-[#16A34A] text-white text-[14px] font-semibold rounded-xl transition-colors">
                                    <Send size={16} />
                                    Ứng tuyển ngay
                                </button>
                                <button
                                    onClick={() => setIsSaved(!isSaved)}
                                    className={cn(
                                        "inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[14px] font-medium transition-colors border",
                                        isSaved
                                            ? "bg-[#FF5630]/10 border-[#FF5630]/20 text-[#FF5630]"
                                            : "bg-white dark:bg-[#1C252E] border-[#919EAB]/20 text-[#637381] dark:text-[#919EAB] hover:border-[#919EAB]/40"
                                    )}
                                >
                                    <Bookmark
                                        size={16}
                                        fill={isSaved ? "currentColor" : "none"}
                                    />
                                    {isSaved ? "Đã lưu" : "Lưu"}
                                </button>
                                <button className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[14px] font-medium transition-colors border bg-white dark:bg-[#1C252E] border-[#919EAB]/20 text-[#637381] dark:text-[#919EAB] hover:border-[#919EAB]/40">
                                    <Share2 size={16} />
                                </button>
                            </div>
                        </motion.div>

                        {/* Description */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white dark:bg-[#1C252E] rounded-2xl p-6 shadow-sm border border-[#919EAB]/12 dark:border-white/8"
                        >
                            <h2 className="text-lg font-bold text-[#1C252E] dark:text-white mb-4">
                                Mô tả công việc
                            </h2>
                            <div className="text-[14px] leading-relaxed text-[#454F5B] dark:text-[#C4CDD5] whitespace-pre-line">
                                {job.fullDescription || job.description}
                            </div>
                        </motion.div>

                        {/* Responsibilities */}
                        {job.responsibilities && job.responsibilities.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.15 }}
                                className="bg-white dark:bg-[#1C252E] rounded-2xl p-6 shadow-sm border border-[#919EAB]/12 dark:border-white/8"
                            >
                                <h2 className="text-lg font-bold text-[#1C252E] dark:text-white mb-4">
                                    Trách nhiệm
                                </h2>
                                <ul className="space-y-3">
                                    {job.responsibilities.map((item, i) => (
                                        <li
                                            key={i}
                                            className="flex items-start gap-3 text-[14px] text-[#454F5B] dark:text-[#C4CDD5]"
                                        >
                                            <CheckCircle2
                                                size={16}
                                                className="text-[#22C55E] mt-0.5 shrink-0"
                                            />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        )}

                        {/* Requirements */}
                        {job.requirements && job.requirements.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white dark:bg-[#1C252E] rounded-2xl p-6 shadow-sm border border-[#919EAB]/12 dark:border-white/8"
                            >
                                <h2 className="text-lg font-bold text-[#1C252E] dark:text-white mb-4">
                                    Yêu cầu
                                </h2>
                                <ul className="space-y-3">
                                    {job.requirements.map((item, i) => (
                                        <li
                                            key={i}
                                            className="flex items-start gap-3 text-[14px] text-[#454F5B] dark:text-[#C4CDD5]"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#919EAB] mt-2 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        )}

                        {/* Benefits */}
                        {job.benefits && job.benefits.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.25 }}
                                className="bg-white dark:bg-[#1C252E] rounded-2xl p-6 shadow-sm border border-[#919EAB]/12 dark:border-white/8"
                            >
                                <h2 className="text-lg font-bold text-[#1C252E] dark:text-white mb-4">
                                    Phúc lợi
                                </h2>
                                <ul className="space-y-3">
                                    {job.benefits.map((item, i) => (
                                        <li
                                            key={i}
                                            className="flex items-start gap-3 text-[14px] text-[#454F5B] dark:text-[#C4CDD5]"
                                        >
                                            <CheckCircle2
                                                size={16}
                                                className="text-[#22C55E] mt-0.5 shrink-0"
                                            />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        )}

                        {/* Skills */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white dark:bg-[#1C252E] rounded-2xl p-6 shadow-sm border border-[#919EAB]/12 dark:border-white/8"
                        >
                            <h2 className="text-lg font-bold text-[#1C252E] dark:text-white mb-4">
                                Kỹ năng yêu cầu
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {job.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-3 py-1.5 rounded-lg text-[13px] font-medium bg-[#919EAB]/8 text-[#454F5B] dark:text-[#C4CDD5]"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Quick Info */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white dark:bg-[#1C252E] rounded-2xl p-5 shadow-sm border border-[#919EAB]/12 dark:border-white/8"
                        >
                            <h3 className="text-[15px] font-bold text-[#1C252E] dark:text-white mb-4">
                                Thông tin chung
                            </h3>
                            <div className="space-y-4">
                                <InfoRow
                                    icon={<DollarSign size={16} />}
                                    label="Mức lương"
                                    value={job.salary}
                                />
                                <InfoRow
                                    icon={<Briefcase size={16} />}
                                    label="Hình thức"
                                    value={job.type}
                                />
                                <InfoRow
                                    icon={<Users size={16} />}
                                    label="Cấp bậc"
                                    value={job.level}
                                />
                                <InfoRow
                                    icon={<MapPin size={16} />}
                                    label="Địa điểm"
                                    value={
                                        job.locationInfo?.address ||
                                        job.location
                                    }
                                />
                                {job.workingHours && (
                                    <InfoRow
                                        icon={<Clock size={16} />}
                                        label="Giờ làm việc"
                                        value={job.workingHours}
                                    />
                                )}
                                {job.teamSize && (
                                    <InfoRow
                                        icon={<Users size={16} />}
                                        label="Quy mô đội"
                                        value={job.teamSize}
                                    />
                                )}
                                <InfoRow
                                    icon={<Calendar size={16} />}
                                    label="Đăng ngày"
                                    value={formatDate(job.postedAt)}
                                />
                                {job.deadline && (
                                    <InfoRow
                                        icon={<Calendar size={16} />}
                                        label="Hạn nộp"
                                        value={formatDate(job.deadline)}
                                    />
                                )}
                            </div>
                        </motion.div>

                        {/* Company Info */}
                        {job.companyInfo && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white dark:bg-[#1C252E] rounded-2xl p-5 shadow-sm border border-[#919EAB]/12 dark:border-white/8"
                            >
                                <h3 className="text-[15px] font-bold text-[#1C252E] dark:text-white mb-4">
                                    Về công ty
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 mb-3">
                                        <img
                                            src={
                                                job.companyInfo.logoUrl ||
                                                job.logoUrl
                                            }
                                            alt={job.companyInfo.name}
                                            className="w-10 h-10 rounded-lg object-cover"
                                        />
                                        <div>
                                            <p className="text-[14px] font-semibold text-[#1C252E] dark:text-white">
                                                {job.companyInfo.name}
                                            </p>
                                            {job.companyInfo.industry && (
                                                <p className="text-[12px] text-[#919EAB]">
                                                    {job.companyInfo.industry}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    {job.companyInfo.size && (
                                        <InfoRow
                                            icon={<Building2 size={16} />}
                                            label="Quy mô"
                                            value={job.companyInfo.size}
                                        />
                                    )}
                                    {job.companyInfo.website && (
                                        <InfoRow
                                            icon={<Globe size={16} />}
                                            label="Website"
                                            value={
                                                <a
                                                    href={
                                                        job.companyInfo.website
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-[#22C55E] hover:underline"
                                                >
                                                    {job.companyInfo.website.replace(
                                                        /^https?:\/\//,
                                                        ""
                                                    )}
                                                </a>
                                            }
                                        />
                                    )}
                                    {job.companyInfo.description && (
                                        <p className="text-[13px] text-[#637381] dark:text-[#919EAB] leading-relaxed mt-2">
                                            {job.companyInfo.description}
                                        </p>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {/* Contact Info */}
                        {job.contactInfo && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-white dark:bg-[#1C252E] rounded-2xl p-5 shadow-sm border border-[#919EAB]/12 dark:border-white/8"
                            >
                                <h3 className="text-[15px] font-bold text-[#1C252E] dark:text-white mb-4">
                                    Liên hệ
                                </h3>
                                <div className="space-y-3">
                                    <p className="text-[14px] font-medium text-[#1C252E] dark:text-white">
                                        {job.contactInfo.name}
                                    </p>
                                    {job.contactInfo.title && (
                                        <p className="text-[12px] text-[#919EAB] -mt-2">
                                            {job.contactInfo.title}
                                        </p>
                                    )}
                                    <InfoRow
                                        icon={<Mail size={16} />}
                                        label="Email"
                                        value={
                                            <a
                                                href={`mailto:${job.contactInfo.email}`}
                                                className="text-[#22C55E] hover:underline"
                                            >
                                                {job.contactInfo.email}
                                            </a>
                                        }
                                    />
                                    <InfoRow
                                        icon={<Phone size={16} />}
                                        label="SĐT"
                                        value={job.contactInfo.phone}
                                    />
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function InfoRow({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: React.ReactNode;
}) {
    return (
        <div className="flex items-start gap-3">
            <span className="text-[#919EAB] mt-0.5 shrink-0">{icon}</span>
            <div className="min-w-0">
                <p className="text-[12px] text-[#919EAB] mb-0.5">{label}</p>
                <p className="text-[13px] font-medium text-[#454F5B] dark:text-[#C4CDD5]">
                    {value}
                </p>
            </div>
        </div>
    );
}