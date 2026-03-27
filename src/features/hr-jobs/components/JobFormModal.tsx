"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    Briefcase,
    MapPin,
    DollarSign,
    FileText,
    Sparkles,
    Plus,
    Trash2,
    Save,
    Eye,
    Building2,
    Target,
    Star,
    CheckCircle2,
    ChevronRight,
    Zap,
    Users,
    Clock,
    Calendar,
    Heart,
    Share2,
    Layers,
    Globe,
} from "lucide-react";
import { CustomSelect } from "@/shared/components/ui/custom-select";
import { useJobStore } from "../stores/job-store";
import {
    Job,
    Skill,
    JOB_TYPES,
    JOB_LEVELS,
    JOB_REMOTES,
    DEPARTMENTS,
    SKILL_LEVELS,
    DEFAULT_JOB,
    SkillLevel,
} from "../types/job";
import { MOCK_COMPANIES } from "../../hr-company/data/mock-companies";

// Modern input field - larger and cleaner
function FormField({
    label,
    value,
    onChange,
    placeholder,
    type = "text",
    required,
    icon: Icon,
}: {
    label: string;
    value: string | number;
    onChange: (value: string) => void;
    placeholder?: string;
    type?: string;
    required?: boolean;
    icon?: React.ElementType;
}) {
    return (
        <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-[#1C252E]">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="relative">
                {Icon && (
                    <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#22c55e]" />
                )}
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className={`w-full ${Icon ? "pl-12" : "pl-4"} pr-4 py-3.5 bg-white border-2 border-[rgba(145,158,171,0.12)] rounded-2xl focus:border-[#22c55e]/30 focus:ring-4 focus:ring-[#22c55e]/30 focus:outline-none transition-all text-[#1C252E] placeholder:text-[#22c55e] text-base`}
                />
            </div>
        </div>
    );
}

// FormSelect removed - using CustomSelect instead

// Modern textarea - larger
function FormTextarea({
    label,
    value,
    onChange,
    placeholder,
    rows = 4,
    required,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    rows?: number;
    required?: boolean;
}) {
    return (
        <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-[#1C252E]">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                rows={rows}
                className="w-full px-4 py-3.5 bg-white border-2 border-[rgba(145,158,171,0.12)] rounded-2xl focus:border-[#22c55e]/30 focus:ring-4 focus:ring-[#22c55e]/30 focus:outline-none transition-all text-[#1C252E] placeholder:text-[#22c55e] resize-none text-base"
            />
        </div>
    );
}

// Skill Tag Input - inline
function SkillTagInput({
    label,
    skills,
    onAdd,
    onRemove,
    suggestedSkills,
    colorClass,
}: {
    label: string;
    skills: Skill[];
    onAdd: (name: string) => void;
    onRemove: (id: string) => void;
    suggestedSkills: string[];
    colorClass: string;
}) {
    const [input, setInput] = React.useState("");
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleAdd = (name: string) => {
        if (name && !skills.find((s) => s.name.toLowerCase() === name.toLowerCase())) {
            onAdd(name);
        }
        setInput("");
        inputRef.current?.focus();
    };

    const filtered = suggestedSkills
        .filter((s) => s.toLowerCase().includes(input.toLowerCase()))
        .filter((s) => !skills.find((sk) => sk.name.toLowerCase() === s.toLowerCase()))
        .slice(0, 4);

    return (
        <div className="space-y-2">
            <label className="block text-sm font-semibold text-[#1C252E]">{label}</label>

            {/* Skills */}
            <div className="flex flex-wrap gap-2 min-h-[36px]">
                {skills.map((skill) => (
                    <span
                        key={skill.id}
                        className={`flex items-center gap-1.5 px-3 py-1.5 ${colorClass} text-white rounded-full text-sm font-medium`}
                    >
                        {skill.name}
                        <button
                            onClick={() => onRemove(skill.id!)}
                            className="opacity-70 hover:opacity-100"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    </span>
                ))}
            </div>

            {/* Input */}
            <div className="flex gap-2">
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && input.trim()) {
                            e.preventDefault();
                            handleAdd(input.trim());
                        }
                    }}
                    placeholder="Nhập kỹ năng..."
                    className="flex-1 px-4 py-2.5 bg-white border-2 border-dashed border-[#22c55e]/30 rounded-xl focus:border-[#22c55e]/30 focus:border-solid focus:outline-none transition-all text-sm"
                />
                <button
                    onClick={() => input.trim() && handleAdd(input.trim())}
                    className="px-4 py-2.5 bg-[#22c55e]/15 text-[#22c55e] rounded-xl hover:bg-[rgba(145,158,171,0.04)] transition-colors font-medium text-sm"
                >
                    <Plus className="w-4 h-4" />
                </button>
            </div>

            {/* Quick suggestions */}
            {filtered.length > 0 && input && (
                <div className="flex flex-wrap gap-1.5">
                    {filtered.map((s) => (
                        <button
                            key={s}
                            onClick={() => handleAdd(s)}
                            className="px-2.5 py-1 bg-[#22c55e]/10 text-[#22c55e] rounded-lg text-xs hover:bg-[#22c55e]/15 transition-colors"
                        >
                            + {s}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

// Live Preview Component
function LivePreview({ formData, company }: { formData: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>; company: typeof MOCK_COMPANIES[0] }) {
    const formatSalary = (min?: number, max?: number) => {
        if (!min && !max) return "Thỏa thuận";
        const format = (n: number) => (n / 1000000).toFixed(0);
        if (min && max) return `${format(min)} - ${format(max)} triệu VND`;
        if (min) return `Từ ${format(min)} triệu VND`;
        return `Đến ${format(max!)} triệu VND`;
    };

    return (
        <div className="h-full flex flex-col min-h-0">
            {/* Preview Header */}
            <div className="bg-gradient-to-r from-[#22c55e] to-[#10b981] text-white p-4 rounded-t-2xl">
                <div className="flex items-center gap-2 text-white/80 text-xs mb-2">
                    <Eye className="w-3.5 h-3.5" />
                    Xem trước tin tuyển dụng
                </div>
                <h3 className="text-lg font-bold truncate">
                    {formData.title || "Tiêu đề vị trí..."}
                </h3>
                <p className="text-white/80 text-sm flex items-center gap-1 mt-0.5">
                    <Building2 className="w-3.5 h-3.5" />
                    {company?.name}
                </p>
            </div>

            {/* Preview Content */}
            <div className="flex-1 bg-white rounded-b-2xl border-2 border-t-0 border-[rgba(145,158,171,0.12)] p-4 space-y-4 overflow-y-auto">
                {/* Info pills */}
                <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        {formatSalary(formData.salaryMin, formData.salaryMax)}
                    </span>
                    <span className="px-3 py-1.5 bg-[#22c55e]/15 text-[#22c55e] rounded-full text-xs font-medium flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {formData.location || "Địa điểm..."}
                    </span>
                    <span className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-xs font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {JOB_TYPES[formData.type]}
                    </span>
                </div>

                {/* Skills preview */}
                {formData.mustHaveSkills.length > 0 && (
                    <div>
                        <h4 className="text-xs font-semibold text-[#1C252E] mb-2 flex items-center gap-1">
                            <Star className="w-3 h-3 text-orange-500" />
                            Kỹ năng bắt buộc
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                            {formData.mustHaveSkills.map((skill) => (
                                <span
                                    key={skill.id}
                                    className="px-2 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full text-xs font-medium"
                                >
                                    {skill.name}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {formData.niceToHaveSkills.length > 0 && (
                    <div>
                        <h4 className="text-xs font-semibold text-[#1C252E] mb-2 flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-[#22c55e]" />
                            Kỹ năng ưu tiên
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                            {formData.niceToHaveSkills.map((skill) => (
                                <span
                                    key={skill.id}
                                    className="px-2 py-1 bg-gradient-to-r from-[#22c55e] to-[#10b981] text-white rounded-full text-xs font-medium"
                                >
                                    {skill.name}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Description */}
                {formData.description && (
                    <div>
                        <h4 className="text-xs font-semibold text-[#1C252E] mb-1.5 flex items-center gap-1">
                            <Briefcase className="w-3 h-3 text-[#22c55e]" />
                            Mô tả công việc
                        </h4>
                        <p className="text-xs text-[#22c55e] whitespace-pre-line bg-[#22c55e]/10 rounded-xl p-3 line-clamp-4">
                            {formData.description}
                        </p>
                    </div>
                )}

                {/* Requirements */}
                {formData.requirements && (
                    <div>
                        <h4 className="text-xs font-semibold text-[#1C252E] mb-1.5 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-green-500" />
                            Yêu cầu ứng viên
                        </h4>
                        <p className="text-xs text-[#22c55e] whitespace-pre-line bg-green-50 rounded-xl p-3 line-clamp-4">
                            {formData.requirements}
                        </p>
                    </div>
                )}

                {/* Benefits */}
                {formData.benefits && (
                    <div>
                        <h4 className="text-xs font-semibold text-[#1C252E] mb-1.5 flex items-center gap-1">
                            <Heart className="w-3 h-3 text-pink-500" />
                            Quyền lợi
                        </h4>
                        <p className="text-xs text-[#22c55e] whitespace-pre-line bg-pink-50 rounded-xl p-3 line-clamp-4">
                            {formData.benefits}
                        </p>
                    </div>
                )}

                {/* Mock Apply Button */}
                <div className="pt-2">
                    <button className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold text-sm opacity-60 cursor-not-allowed flex items-center justify-center gap-2">
                        <Zap className="w-4 h-4" />
                        Ứng tuyển nhanh
                    </button>
                </div>
            </div>
        </div>
    );
}

export function JobFormModal() {
    const { selectedJob, setFormOpen, addJob, updateJob, selectJob } = useJobStore();
    const isEditing = !!selectedJob;

    const company = MOCK_COMPANIES[0];
    const suggestedSkills = [
        ...(company?.techStack || []),
        "Communication",
        "Problem Solving",
        "Leadership",
        "Teamwork",
        "Agile",
        "Scrum",
    ];

    const [formData, setFormData] = React.useState<Omit<Job, 'id' | 'createdAt' | 'updatedAt'>>({
        ...DEFAULT_JOB,
        companyId: company?.id || "",
        ...(selectedJob || {}),
    });

    const handleClose = () => {
        setFormOpen(false);
        selectJob(null);
    };

    const handleSubmit = () => {
        if (isEditing && selectedJob) {
            updateJob(selectedJob.id, formData);
        } else {
            addJob(formData);
        }
        handleClose();
    };

    const updateField = <K extends keyof typeof formData>(field: K, value: typeof formData[K]) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const addMustHaveSkill = (name: string) => {
        updateField("mustHaveSkills", [
            ...formData.mustHaveSkills,
            { id: `skill-${Date.now()}`, name, level: "intermediate" },
        ]);
    };

    const addNiceToHaveSkill = (name: string) => {
        updateField("niceToHaveSkills", [
            ...formData.niceToHaveSkills,
            { id: `skill-${Date.now()}`, name, level: "intermediate" },
        ]);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleClose}
        >
            {/* Split View Container */}
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-6xl h-[90vh] bg-gradient-to-br from-[rgba(145,158,171,0.04)] to-white rounded-3xl shadow-2xl overflow-hidden flex"
            >
                {/* Left: Form Input */}
                <div className="flex-1 flex flex-col min-w-0">
                    {/* Header */}
                    <div className="flex items-center justify-between p-5 border-b border-[rgba(145,158,171,0.12)] bg-white/80">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#22c55e] to-[#10b981] flex items-center justify-center shadow-lg">
                                <Briefcase className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-[#1C252E]">
                                    {isEditing ? "Chỉnh sửa tin" : "Tạo tin tuyển dụng"}
                                </h2>
                                <p className="text-sm text-[#22c55e]">{company?.name}</p>
                            </div>
                        </div>
                        <button
                            onClick={handleClose}
                            className="p-2 hover:bg-[#22c55e]/15 rounded-xl transition-colors text-[#22c55e]"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Form Content */}
                    <div className="flex-1 p-5 space-y-5 overflow-y-auto">
                        {/* Basic Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <FormField
                                    label="Tiêu đề vị trí"
                                    value={formData.title}
                                    onChange={(v) => updateField("title", v)}
                                    placeholder="VD: Senior Frontend Developer"
                                    required
                                    icon={Briefcase}
                                />
                            </div>
                            <CustomSelect
                                label="Phòng ban"
                                value={formData.department}
                                onChange={(v) => updateField("department", v)}
                                options={DEPARTMENTS.map((d) => ({ value: d, label: d, icon: Layers }))}
                                required
                            />
                            <CustomSelect
                                label="Loại công việc"
                                value={formData.type}
                                onChange={(v) => updateField("type", v as Job["type"])}
                                options={Object.entries(JOB_TYPES).map(([value, label]) => ({ value, label, icon: Clock }))}
                            />
                            <CustomSelect
                                label="Cấp bậc"
                                value={formData.level}
                                onChange={(v) => updateField("level", v as Job["level"])}
                                options={Object.entries(JOB_LEVELS).map(([value, label]) => ({ value, label, icon: Target }))}
                            />
                            <CustomSelect
                                label="Hình thức"
                                value={formData.remote}
                                onChange={(v) => updateField("remote", v as Job["remote"])}
                                options={Object.entries(JOB_REMOTES).map(([value, label]) => ({ value, label, icon: Globe }))}
                            />
                        </div>

                        {/* Location & Salary */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <FormField
                                label="Địa điểm"
                                value={formData.location}
                                onChange={(v) => updateField("location", v)}
                                placeholder="TP. Hồ Chí Minh"
                                icon={MapPin}
                            />
                            <FormField
                                label="Lương tối thiểu"
                                value={formData.salaryMin || ""}
                                onChange={(v) => updateField("salaryMin", parseInt(v) || undefined)}
                                placeholder="25000000"
                                type="number"
                            />
                            <FormField
                                label="Lương tối đa"
                                value={formData.salaryMax || ""}
                                onChange={(v) => updateField("salaryMax", parseInt(v) || undefined)}
                                placeholder="40000000"
                                type="number"
                            />
                        </div>

                        {/* Description */}
                        <FormTextarea
                            label="Mô tả công việc"
                            value={formData.description}
                            onChange={(v) => updateField("description", v)}
                            placeholder="Mô tả trách nhiệm, nhiệm vụ chính..."
                            rows={4}
                            required
                        />

                        <FormTextarea
                            label="Yêu cầu ứng viên"
                            value={formData.requirements}
                            onChange={(v) => updateField("requirements", v)}
                            placeholder="Kinh nghiệm, kỹ năng, bằng cấp yêu cầu..."
                            rows={3}
                            required
                        />

                        <FormTextarea
                            label="Quyền lợi"
                            value={formData.benefits || ""}
                            onChange={(v) => updateField("benefits", v)}
                            placeholder="Lương thưởng, bảo hiểm, đãi ngộ..."
                            rows={3}
                        />

                        {/* Skills */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <SkillTagInput
                                label="Kỹ năng bắt buộc"
                                skills={formData.mustHaveSkills}
                                onAdd={addMustHaveSkill}
                                onRemove={(id) =>
                                    updateField("mustHaveSkills", formData.mustHaveSkills.filter((s) => s.id !== id))
                                }
                                suggestedSkills={suggestedSkills}
                                colorClass="bg-gradient-to-r from-orange-500 to-red-500"
                            />
                            <SkillTagInput
                                label="Kỹ năng ưu tiên"
                                skills={formData.niceToHaveSkills}
                                onAdd={addNiceToHaveSkill}
                                onRemove={(id) =>
                                    updateField("niceToHaveSkills", formData.niceToHaveSkills.filter((s) => s.id !== id))
                                }
                                suggestedSkills={suggestedSkills}
                                colorClass="bg-gradient-to-r from-[#22c55e] to-[#10b981]"
                            />
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-5 border-t border-[rgba(145,158,171,0.12)] bg-white/80 flex justify-end gap-3">
                        <button
                            onClick={handleClose}
                            className="px-6 py-2.5 text-[#22c55e] font-medium hover:bg-[#22c55e]/10 rounded-xl transition-colors"
                        >
                            Hủy
                        </button>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleSubmit}
                            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-green-500/30"
                        >
                            <Save className="w-4 h-4" />
                            {isEditing ? "Cập nhật" : "Tạo tin"}
                        </motion.button>
                    </div>
                </div>

                {/* Right: Live Preview */}
                <div className="w-[380px] bg-slate-50 border-l border-[rgba(145,158,171,0.12)] p-5 hidden lg:flex flex-col overflow-hidden flex-shrink-0">
                    <LivePreview formData={formData} company={company} />
                </div>
            </motion.div>
        </motion.div>
    );
}

