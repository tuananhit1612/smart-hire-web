"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    X, User, Mail, Phone, Briefcase, DollarSign, Star, Clock,
    FileText, CheckCircle2, XCircle, Eye, Building2, Sparkles,
    Award, TrendingUp, Send, Download, Search, ChevronLeft,
    UserCheck, UserX, GraduationCap, FolderKanban, Zap,
    MapPin, Globe, ArrowRight, Heart, MessageCircle,
} from "lucide-react";
import { Job } from "../types/job";
import { Applicant, APPLICANT_STATUSES, getApplicantsByJobId } from "../data/mock-applicants";
import type { CVData } from "../../cv/types/types";

// ─────────────────────────────────────────────────
// Compact Applicant Card (Left Panel)
// ─────────────────────────────────────────────────
function ApplicantRow({
    applicant, isSelected, onSelect, onAccept, onReject,
}: {
    applicant: Applicant; isSelected: boolean;
    onSelect: () => void; onAccept: () => void; onReject: () => void;
}) {
    const status = APPLICANT_STATUSES[applicant.status];
    const statusColor: Record<string, string> = {
        new: "bg-sky-100 text-sky-700 border-sky-200",
        reviewing: "bg-amber-100 text-amber-700 border-amber-200",
        shortlisted: "bg-green-100 text-green-700 border-green-200",
        interviewed: "bg-blue-100 text-blue-700 border-blue-200",
        offered: "bg-emerald-100 text-emerald-700 border-emerald-200",
        rejected: "bg-red-100 text-red-700 border-red-200",
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            whileHover={{ x: 4 }}
            onClick={onSelect}
            className={`relative p-4 rounded-2xl cursor-pointer transition-all duration-300 group ${isSelected
                    ? "bg-gradient-to-r from-sky-50 via-white to-sky-50 border-2 border-sky-400 shadow-lg shadow-sky-500/10 ring-2 ring-sky-200/50"
                    : "bg-white/80 backdrop-blur-sm border-2 border-white/60 hover:border-sky-200 hover:shadow-lg hover:shadow-sky-500/5"
                }`}
        >
            {/* Selected glow */}
            {isSelected && (
                <motion.div
                    layoutId="activeGlow"
                    className="absolute -left-0.5 top-3 bottom-3 w-1 bg-gradient-to-b from-sky-400 via-sky-500 to-green-400 rounded-full"
                />
            )}

            <div className="flex items-center gap-3">
                {/* Avatar */}
                <motion.div
                    whileHover={{ scale: 1.08 }}
                    className={`relative w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-lg ${isSelected
                            ? "bg-gradient-to-br from-sky-500 to-sky-600 shadow-sky-500/30"
                            : "bg-gradient-to-br from-sky-400 to-blue-500 shadow-sky-400/20"
                        }`}
                >
                    {applicant.name.charAt(0)}
                    {applicant.rating && applicant.rating >= 4.5 && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full flex items-center justify-center shadow-sm border-2 border-white">
                            <Star className="w-2.5 h-2.5 text-white fill-white" />
                        </div>
                    )}
                </motion.div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                        <h4 className="font-bold text-sm text-sky-900 truncate">{applicant.name}</h4>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex-shrink-0 border ${statusColor[applicant.status]}`}>
                            {status.label}
                        </span>
                    </div>
                    <p className="text-xs text-sky-600/70 flex items-center gap-1 mt-0.5 truncate">
                        <Building2 className="w-3 h-3 flex-shrink-0" />
                        {applicant.currentCompany || "Freelancer"}
                    </p>
                    <div className="flex items-center gap-3 mt-1.5 text-[11px] text-sky-600/60">
                        <span className="flex items-center gap-1">
                            <Briefcase className="w-3 h-3" /> {applicant.experience}
                        </span>
                        <span className="flex items-center gap-1 text-green-600">
                            <DollarSign className="w-3 h-3" />
                            {applicant.expectedSalary ? `${(applicant.expectedSalary / 1000000).toFixed(0)}M` : "TT"}
                        </span>
                        {applicant.rating && (
                            <span className="flex items-center gap-0.5 text-amber-500">
                                <Star className="w-3 h-3 fill-amber-400" /> {applicant.rating}
                            </span>
                        )}
                    </div>
                </div>

                {/* Quick action buttons */}
                <div className={`flex flex-col gap-1 transition-all duration-200 ${isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                    <motion.button
                        whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.85 }}
                        onClick={(e) => { e.stopPropagation(); onAccept(); }}
                        className="p-1.5 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-xl shadow-sm hover:shadow-green-500/30 transition-shadow"
                        title="Chấp nhận"
                    >
                        <CheckCircle2 className="w-3 h-3" />
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.85 }}
                        onClick={(e) => { e.stopPropagation(); onReject(); }}
                        className="p-1.5 bg-gradient-to-r from-red-400 to-rose-500 text-white rounded-xl shadow-sm hover:shadow-red-500/30 transition-shadow"
                        title="Từ chối"
                    >
                        <XCircle className="w-3 h-3" />
                    </motion.button>
                </div>
            </div>

            {/* Skill tags */}
            <div className="flex flex-wrap gap-1 mt-2 pl-[60px]">
                {applicant.skills.slice(0, 3).map((skill) => (
                    <span key={skill} className="px-2 py-0.5 rounded-lg text-[10px] font-medium bg-sky-50 text-sky-600 border border-sky-100">
                        {skill}
                    </span>
                ))}
                {applicant.skills.length > 3 && (
                    <span className="px-2 py-0.5 bg-sky-50/50 text-sky-400 rounded-lg text-[10px]">
                        +{applicant.skills.length - 3}
                    </span>
                )}
            </div>
        </motion.div>
    );
}

// ─────────────────────────────────────────────────
// Inline CV Viewer (Right Panel) — DESIGN_STANDARD colors
// ─────────────────────────────────────────────────
function InlineCVViewer({ cvData, applicant }: { cvData: CVData; applicant: Applicant }) {
    const { personalInfo, summary, experience, education, skills, projects } = cvData;

    return (
        <div className="space-y-5 p-6">
            {/* CV Header Card */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-sky-600 via-sky-500 to-sky-400 rounded-3xl p-6 text-white relative overflow-hidden shadow-xl shadow-sky-500/20"
            >
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                </div>
                <div className="relative flex items-center gap-5">
                    {personalInfo.avatarUrl ? (
                        <div className="w-20 h-20 rounded-2xl overflow-hidden border-3 border-white/30 shadow-lg flex-shrink-0">
                            <img src={personalInfo.avatarUrl} alt={personalInfo.fullName} className="w-full h-full object-cover" />
                        </div>
                    ) : (
                        <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-4xl font-bold border-2 border-white/30 flex-shrink-0">
                            {personalInfo.fullName.charAt(0)}
                        </div>
                    )}
                    <div className="flex-1 min-w-0">
                        <h2 className="text-2xl font-extrabold tracking-tight">{personalInfo.fullName}</h2>
                        <p className="text-sky-100 font-semibold text-sm mt-0.5 uppercase tracking-wider">{personalInfo.title || "Ứng viên"}</p>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-xs text-white/80">
                            {personalInfo.email && (
                                <span className="flex items-center gap-1.5"><Mail className="w-3 h-3" /> {personalInfo.email}</span>
                            )}
                            {personalInfo.phone && (
                                <span className="flex items-center gap-1.5"><Phone className="w-3 h-3" /> {personalInfo.phone}</span>
                            )}
                            {personalInfo.location && (
                                <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /> {personalInfo.location}</span>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Summary */}
            {summary && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                    className="bg-white/80 backdrop-blur-xl rounded-2xl p-5 border border-sky-100 shadow-lg shadow-sky-900/5"
                >
                    <h3 className="text-sm font-bold text-sky-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-sky-400 to-sky-500 flex items-center justify-center">
                            <FileText className="w-3.5 h-3.5 text-white" />
                        </div>
                        Giới thiệu bản thân
                    </h3>
                    <p className="text-sm text-sky-900 leading-relaxed whitespace-pre-line">{summary}</p>
                </motion.div>
            )}

            {/* Experience + Education grid */}
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-5">
                {/* Experience - wider */}
                {experience.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="xl:col-span-3 bg-white/80 backdrop-blur-xl rounded-2xl p-5 border border-sky-100 shadow-lg shadow-sky-900/5"
                    >
                        <h3 className="text-sm font-bold text-sky-700 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                                <Briefcase className="w-3.5 h-3.5 text-white" />
                            </div>
                            Kinh nghiệm làm việc
                        </h3>
                        <div className="space-y-4">
                            {experience.map((exp, i) => (
                                <motion.div
                                    key={exp.id}
                                    initial={{ opacity: 0, x: -5 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.15 + i * 0.05 }}
                                    className="relative pl-4 border-l-2 border-sky-200 hover:border-sky-400 transition-colors group"
                                >
                                    <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-sky-300 group-hover:bg-sky-500 transition-colors ring-2 ring-white" />
                                    <div className="flex items-baseline justify-between gap-2 mb-1">
                                        <h4 className="font-bold text-sky-900 text-sm group-hover:text-sky-700 transition-colors">{exp.position}</h4>
                                        <span className="text-[10px] text-sky-500 font-semibold bg-sky-50 px-2 py-0.5 rounded-full flex-shrink-0">
                                            {exp.startDate} — {exp.isCurrent ? "Hiện tại" : exp.endDate}
                                        </span>
                                    </div>
                                    <p className="text-xs text-sky-600 font-semibold mb-2">{exp.company}</p>
                                    <p className="text-xs text-sky-800/70 leading-relaxed whitespace-pre-line">{exp.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Education - narrower */}
                {education.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="xl:col-span-2 bg-white/80 backdrop-blur-xl rounded-2xl p-5 border border-sky-100 shadow-lg shadow-sky-900/5"
                    >
                        <h3 className="text-sm font-bold text-sky-700 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-purple-400 to-purple-500 flex items-center justify-center">
                                <GraduationCap className="w-3.5 h-3.5 text-white" />
                            </div>
                            Học vấn
                        </h3>
                        <div className="space-y-4">
                            {education.map((edu, i) => (
                                <motion.div
                                    key={edu.id}
                                    initial={{ opacity: 0, x: -5 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 + i * 0.05 }}
                                    className="p-3 bg-gradient-to-r from-sky-50/50 to-white rounded-xl border border-sky-50 hover:border-sky-200 transition-all hover:shadow-md"
                                >
                                    <h4 className="font-bold text-sky-900 text-sm">{edu.school}</h4>
                                    <p className="text-xs text-sky-600 font-semibold mt-0.5">{edu.degree}</p>
                                    <p className="text-[11px] text-sky-500 mt-0.5">{edu.field}</p>
                                    <p className="text-[10px] text-sky-400 mt-1">{edu.startDate} — {edu.endDate}</p>
                                    {edu.description && (
                                        <p className="text-[11px] text-sky-700/60 mt-2 whitespace-pre-line">{edu.description}</p>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Skills */}
            {skills.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white/80 backdrop-blur-xl rounded-2xl p-5 border border-sky-100 shadow-lg shadow-sky-900/5"
                >
                    <h3 className="text-sm font-bold text-sky-700 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center">
                            <Zap className="w-3.5 h-3.5 text-white" />
                        </div>
                        Kỹ năng
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                        {/* Technical */}
                        <div>
                            <p className="text-[10px] font-bold text-sky-500 uppercase tracking-wider mb-2">Chuyên môn</p>
                            <div className="flex flex-wrap gap-2">
                                {skills.filter(s => s.category === "technical").map((s) => (
                                    <motion.span
                                        key={s.id}
                                        whileHover={{ scale: 1.05 }}
                                        className="px-3 py-1.5 bg-gradient-to-r from-sky-50 to-blue-50 text-sky-700 rounded-xl text-xs font-semibold border border-sky-200 hover:border-sky-400 hover:shadow-md transition-all cursor-default"
                                    >
                                        {s.name}
                                    </motion.span>
                                ))}
                            </div>
                        </div>
                        {/* Soft */}
                        <div>
                            <p className="text-[10px] font-bold text-green-500 uppercase tracking-wider mb-2">Kỹ năng mềm</p>
                            <div className="flex flex-wrap gap-2">
                                {skills.filter(s => s.category === "soft").map((s) => (
                                    <motion.span
                                        key={s.id}
                                        whileHover={{ scale: 1.05 }}
                                        className="px-3 py-1.5 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 rounded-xl text-xs font-semibold border border-green-200 hover:border-green-400 hover:shadow-md transition-all cursor-default"
                                    >
                                        {s.name}
                                    </motion.span>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Projects */}
            {projects.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="bg-white/80 backdrop-blur-xl rounded-2xl p-5 border border-sky-100 shadow-lg shadow-sky-900/5"
                >
                    <h3 className="text-sm font-bold text-sky-700 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center">
                            <FolderKanban className="w-3.5 h-3.5 text-white" />
                        </div>
                        Dự án nổi bật
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                        {projects.map((p, i) => (
                            <motion.div
                                key={p.id}
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + i * 0.05 }}
                                whileHover={{ y: -2 }}
                                className="p-4 bg-gradient-to-r from-sky-50/60 to-white rounded-xl border border-sky-100 hover:border-sky-200 hover:shadow-lg transition-all"
                            >
                                <h4 className="font-bold text-sky-900 text-sm">{p.name}</h4>
                                <div className="flex flex-wrap gap-1.5 mt-2">
                                    {p.technologies.map((t) => (
                                        <span key={t} className="text-[10px] px-2 py-0.5 bg-white border border-sky-100 rounded-lg text-sky-600 font-semibold shadow-sm">{t}</span>
                                    ))}
                                </div>
                                <p className="text-xs text-sky-800/70 mt-2.5 leading-relaxed">{p.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}
        </div>
    );
}

// ─────────────────────────────────────────────────
// Right Panel: Full CV Detail View
// ─────────────────────────────────────────────────
function CVDetailView({
    applicant, onAccept, onReject,
}: {
    applicant: Applicant; onAccept: () => void; onReject: () => void;
}) {
    const status = APPLICANT_STATUSES[applicant.status];
    const statusColor: Record<string, string> = {
        new: "bg-sky-100 text-sky-700 border-sky-200",
        reviewing: "bg-amber-100 text-amber-700 border-amber-200",
        shortlisted: "bg-green-100 text-green-700 border-green-200",
        interviewed: "bg-blue-100 text-blue-700 border-blue-200",
        offered: "bg-emerald-100 text-emerald-700 border-emerald-200",
        rejected: "bg-red-100 text-red-700 border-red-200",
    };

    return (
        <div className="h-full flex flex-col">
            {/* Top Action Bar */}
            <div className="flex items-center gap-3 px-6 py-3.5 border-b border-sky-100 bg-white/80 backdrop-blur-xl flex-shrink-0">
                <div className="flex items-center gap-3 flex-1">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400 to-sky-500 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-sky-500/20">
                        {applicant.name.charAt(0)}
                    </div>
                    <div>
                        <h3 className="font-bold text-sky-900 text-sm">{applicant.name}</h3>
                        <p className="text-[11px] text-sky-500">{applicant.currentCompany || "Freelancer"} • {applicant.experience}</p>
                    </div>
                </div>

                {/* Contact shortcuts */}
                <a href={`mailto:${applicant.email}`}
                    className="flex items-center gap-1.5 px-3 py-2 bg-sky-50 text-sky-600 rounded-xl text-xs font-semibold hover:bg-sky-100 border border-sky-100 hover:border-sky-200 transition-all hover:scale-105">
                    <Mail className="w-3.5 h-3.5" /> Email
                </a>
                <a href={`tel:${applicant.phone}`}
                    className="flex items-center gap-1.5 px-3 py-2 bg-sky-50 text-sky-600 rounded-xl text-xs font-semibold hover:bg-sky-100 border border-sky-100 hover:border-sky-200 transition-all hover:scale-105">
                    <Phone className="w-3.5 h-3.5" /> Gọi
                </a>

                {/* Actions */}
                {applicant.status !== "shortlisted" && applicant.status !== "offered" && (
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                        onClick={onAccept}
                        className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-full text-xs font-bold shadow-lg shadow-green-500/25 hover:shadow-xl transition-all">
                        <UserCheck className="w-3.5 h-3.5" /> Chấp nhận
                    </motion.button>
                )}
                {applicant.status !== "rejected" && (
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                        onClick={onReject}
                        className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-red-400 to-rose-500 text-white rounded-full text-xs font-bold shadow-lg shadow-red-500/25 hover:shadow-xl transition-all">
                        <UserX className="w-3.5 h-3.5" /> Từ chối
                    </motion.button>
                )}
                <button
                    onClick={() => alert("📄 Tính năng tải CV sẽ được triển khai khi kết nối API!")}
                    className="flex items-center gap-1.5 px-3 py-2 bg-white text-sky-600 rounded-xl text-xs font-semibold border-2 border-sky-200 hover:border-sky-400 hover:bg-sky-50 transition-all hover:scale-105">
                    <Download className="w-3.5 h-3.5" /> Tải CV
                </button>
                <span className={`px-3 py-1.5 rounded-full text-[10px] font-bold border ${statusColor[applicant.status]}`}>
                    {status.label}
                </span>
            </div>

            {/* CV Content */}
            <div className="flex-1 overflow-y-auto bg-gradient-to-br from-sky-50/30 via-white to-blue-50/20">
                {applicant.cvData ? (
                    <InlineCVViewer cvData={applicant.cvData} applicant={applicant} />
                ) : (
                    <FallbackCVView applicant={applicant} />
                )}
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────────
// Fallback when no CVData
// ─────────────────────────────────────────────────
function FallbackCVView({ applicant }: { applicant: Applicant }) {
    return (
        <div className="p-6 space-y-5">
            <div className="grid grid-cols-3 gap-4">
                {[
                    { icon: Mail, label: "Email", value: applicant.email, color: "sky" },
                    { icon: Phone, label: "Điện thoại", value: applicant.phone, color: "green" },
                    { icon: DollarSign, label: "Mức lương", value: applicant.expectedSalary ? `${(applicant.expectedSalary / 1000000).toFixed(0)} triệu VND` : "Thỏa thuận", color: "purple" },
                ].map((item, i) => (
                    <motion.div key={item.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                        className={`flex items-center gap-3 p-4 bg-gradient-to-r from-${item.color}-50 to-${item.color}-50/30 rounded-2xl border border-${item.color}-100`}>
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br from-${item.color}-400 to-${item.color}-500 flex items-center justify-center text-white`}>
                            <item.icon className="w-5 h-5" />
                        </div>
                        <div>
                            <p className={`text-[10px] text-${item.color}-500 font-semibold uppercase`}>{item.label}</p>
                            <p className={`text-sm text-${item.color}-900 font-bold`}>{item.value}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-5 border border-sky-100 shadow-lg shadow-sky-900/5">
                <h3 className="text-sm font-bold text-sky-700 mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" /> Kỹ năng
                </h3>
                <div className="flex flex-wrap gap-2">
                    {applicant.skills.map((skill) => (
                        <span key={skill} className="px-4 py-2 bg-gradient-to-r from-sky-50 to-blue-50 text-sky-700 rounded-xl text-sm font-semibold border border-sky-200">{skill}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────────
// Empty State Placeholder
// ─────────────────────────────────────────────────
function EmptyCVState() {
    return (
        <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-sky-50/30 via-white to-blue-50/20">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                <motion.div
                    animate={{ y: [-6, 6, -6] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="w-24 h-24 mx-auto mb-5 rounded-3xl bg-gradient-to-br from-sky-100 to-blue-100 flex items-center justify-center shadow-xl shadow-sky-500/10"
                >
                    <FileText className="w-12 h-12 text-sky-400" />
                </motion.div>
                <h3 className="text-xl font-bold text-sky-900 mb-2">Xem CV ứng viên</h3>
                <p className="text-sky-500 max-w-xs mx-auto text-sm">
                    Chọn một ứng viên từ danh sách bên trái để xem hồ sơ chi tiết
                </p>
                <motion.div
                    animate={{ x: [-3, 3, -3] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="flex items-center gap-2 mt-5 text-sky-400 justify-center"
                >
                    <ChevronLeft className="w-5 h-5" />
                    <span className="text-sm font-medium">Chọn ứng viên</span>
                </motion.div>
            </motion.div>
        </div>
    );
}

// ─────────────────────────────────────────────────
// Main ApplicantPanel
// ─────────────────────────────────────────────────
export function ApplicantPanel({ job, onClose }: { job: Job; onClose: () => void }) {
    const [applicants, setApplicants] = React.useState<Applicant[]>([]);
    const [filter, setFilter] = React.useState("all");
    const [searchValue, setSearchValue] = React.useState("");
    const [selectedApplicant, setSelectedApplicant] = React.useState<Applicant | null>(null);

    React.useEffect(() => {
        setApplicants(getApplicantsByJobId(job.id));
    }, [job.id]);

    const handleAccept = (applicant: Applicant) => {
        setApplicants((prev) => prev.map((a) => a.id === applicant.id ? { ...a, status: "shortlisted" as const } : a));
        if (selectedApplicant?.id === applicant.id) setSelectedApplicant((p) => p ? { ...p, status: "shortlisted" as const } : null);
    };

    const handleReject = (applicant: Applicant) => {
        setApplicants((prev) => prev.map((a) => a.id === applicant.id ? { ...a, status: "rejected" as const } : a));
        if (selectedApplicant?.id === applicant.id) setSelectedApplicant((p) => p ? { ...p, status: "rejected" as const } : null);
    };

    const filteredApplicants = React.useMemo(() => {
        let result = filter === "all" ? applicants : applicants.filter((a) => a.status === filter);
        if (searchValue) {
            const q = searchValue.toLowerCase();
            result = result.filter((a) =>
                a.name.toLowerCase().includes(q) || a.skills.some((s) => s.toLowerCase().includes(q)) || a.currentCompany?.toLowerCase().includes(q)
            );
        }
        return result;
    }, [applicants, filter, searchValue]);

    const statusCounts = Object.keys(APPLICANT_STATUSES).reduce((acc, key) => {
        acc[key] = applicants.filter((a) => a.status === key).length;
        return acc;
    }, {} as Record<string, number>);

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-sky-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-3"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.92, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.92, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 22, stiffness: 250 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-[92vw] h-[90vh] bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-sky-900/10 overflow-hidden flex border border-sky-100"
            >
                {/* ═══ LEFT PANEL: Applicant List ═══ */}
                <div className="w-[380px] flex-shrink-0 flex flex-col bg-gradient-to-b from-white to-sky-50/50 border-r border-sky-100">
                    {/* Header */}
                    <div className="relative overflow-hidden flex-shrink-0">
                        <div className="absolute inset-0 bg-gradient-to-br from-sky-600 via-sky-500 to-sky-400" />
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
                        </div>
                        <div className="relative p-4">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
                                        <User className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="text-white">
                                        <h2 className="text-base font-bold">Ứng viên</h2>
                                        <p className="text-white/70 text-[11px] truncate max-w-[180px]">{job.title}</p>
                                    </div>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }}
                                    onClick={onClose}
                                    className="p-2 bg-white/20 rounded-xl hover:bg-white/30 transition-colors text-white"
                                >
                                    <X className="w-4 h-4" />
                                </motion.button>
                            </div>

                            {/* Stats */}
                            <div className="flex items-center gap-3">
                                {[
                                    { icon: TrendingUp, value: applicants.length, label: "Tổng", bg: "bg-white/20" },
                                    { icon: Award, value: statusCounts.shortlisted || 0, label: "Đậu", bg: "bg-green-500/30" },
                                    { icon: Clock, value: statusCounts.new || 0, label: "Mới", bg: "bg-amber-500/30" },
                                ].map((s) => (
                                    <div key={s.label} className="flex items-center gap-2">
                                        <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center`}>
                                            <s.icon className="w-4 h-4 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-lg font-bold text-white leading-none">{s.value}</p>
                                            <p className="text-[9px] text-white/60">{s.label}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Search + Filters */}
                    <div className="p-3 space-y-2 flex-shrink-0">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sky-400" />
                            <input
                                type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)}
                                placeholder="Tìm theo tên, kỹ năng..."
                                className="w-full pl-9 pr-3 py-2.5 bg-white border-2 border-sky-100 rounded-2xl focus:border-sky-400 focus:ring-2 focus:ring-sky-100 focus:outline-none transition-all text-sm text-sky-900 placeholder:text-sky-300"
                            />
                        </div>
                        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
                            <button onClick={() => setFilter("all")}
                                className={`px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap transition-all ${filter === "all"
                                        ? "bg-gradient-to-r from-sky-500 to-sky-400 text-white shadow-md shadow-sky-500/20"
                                        : "bg-white text-sky-600 border border-sky-200 hover:border-sky-300 hover:scale-105"
                                    }`}>
                                Tất cả ({applicants.length})
                            </button>
                            {Object.entries(APPLICANT_STATUSES).map(([key, val]) => (
                                <button key={key} onClick={() => setFilter(key)}
                                    className={`px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap transition-all ${filter === key
                                            ? "bg-gradient-to-r from-sky-500 to-sky-400 text-white shadow-md shadow-sky-500/20"
                                            : "bg-white text-sky-600 border border-sky-200 hover:border-sky-300 hover:scale-105"
                                        }`}>
                                    {val.label} ({statusCounts[key] || 0})
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Applicant List */}
                    <div className="flex-1 overflow-y-auto px-3 pb-3 space-y-2">
                        <AnimatePresence mode="popLayout">
                            {filteredApplicants.length > 0 ? (
                                filteredApplicants.map((applicant) => (
                                    <ApplicantRow
                                        key={applicant.id}
                                        applicant={applicant}
                                        isSelected={selectedApplicant?.id === applicant.id}
                                        onSelect={() => setSelectedApplicant(applicant)}
                                        onAccept={() => handleAccept(applicant)}
                                        onReject={() => handleReject(applicant)}
                                    />
                                ))
                            ) : (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-10">
                                    <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-sky-50 flex items-center justify-center">
                                        <User className="w-7 h-7 text-sky-300" />
                                    </div>
                                    <h3 className="text-sm font-bold text-sky-800 mb-1">Không tìm thấy</h3>
                                    <p className="text-sky-500 text-xs">{searchValue ? "Thử từ khóa khác" : "Chưa có ứng viên"}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* ═══ RIGHT PANEL: CV Preview ═══ */}
                <div className="flex-1 min-w-0">
                    <AnimatePresence mode="wait">
                        {selectedApplicant ? (
                            <motion.div
                                key={selectedApplicant.id}
                                initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -15 }}
                                transition={{ duration: 0.2 }}
                                className="h-full"
                            >
                                <CVDetailView
                                    applicant={selectedApplicant}
                                    onAccept={() => handleAccept(selectedApplicant)}
                                    onReject={() => handleReject(selectedApplicant)}
                                />
                            </motion.div>
                        ) : (
                            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
                                <EmptyCVState />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </motion.div>
    );
}
