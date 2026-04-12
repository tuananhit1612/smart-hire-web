"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Building2,
    MapPin,
    Globe,
    Mail,
    Phone,
    Calendar,
    Users,
    Pencil,
    Check,
    X,
    ChevronDown,
    Sparkles,
    Briefcase,
    Zap,
} from "lucide-react";
import { Company, COMPANY_SIZES, INDUSTRIES } from "../types/company";
import { Button } from "@/shared/components/ui/button";

interface CompanyInfoEditorProps {
    company: Company;
    onUpdate: (updates: Partial<Company>) => void;
    onClose: () => void;
}

export function CompanyInfoEditor({ company, onUpdate, onClose }: CompanyInfoEditorProps) {
    const [formData, setFormData] = React.useState({
        name: company.name || "",
        tagline: company.tagline || "",
        industry: company.industry || "",
        size: company.size || "SMALL",
        location: company.location || "",
        address: company.address || "",
        website: company.website || "",
        email: company.email || "",
        phone: company.phone || "",
        founded: company.founded || "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdate(formData);
        onClose();
    };

    const handleChange = (field: keyof typeof formData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <motion.div
            key="editor-inline"
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: "auto", opacity: 1, marginTop: 32 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            className="overflow-hidden w-full relative z-20"
        >
            <div className="relative w-full max-w-4xl mx-auto rounded-[2rem] shadow-xl border-2 border-[#22c55e]/30 dark:border-white/10 dark:bg-[#1C252E]">
                {/* Content */}
                <div className="relative bg-white dark:bg-[#1C252E] rounded-[2rem] overflow-hidden">
                        {/* Header with gradient */}
                        <div className="relative px-8 pt-8 pb-6 bg-gradient-to-br from-[rgba(145,158,171,0.04)] via-white to-green-50/30 dark:from-[rgba(145,158,171,0.04)] dark:via-[#1C252E] dark:to-green-900/5">
                            {/* Decorative elements */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#22c55e]/10 to-green-400/10 rounded-full blur-2xl" />
                            <div className="absolute top-10 left-10 w-3 h-3 bg-[#22c55e] rounded-full animate-pulse" />
                            <div className="absolute top-6 right-20 w-2 h-2 bg-green-400 rounded-full animate-pulse delay-300" />

                            <div className="relative flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <motion.div
                                        animate={{ rotate: [0, 10, -10, 0] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#22c55e] to-[#10b981] flex items-center justify-center shadow-lg shadow-green-500/20"
                                    >
                                        <Pencil className="w-5 h-5 text-white" />
                                    </motion.div>
                                    <div>
                                        <h2 className="text-xl font-bold text-[#1C252E] dark:text-white">
                                            Chỉnh sửa thông tin
                                        </h2>
                                        <p className="text-sm text-[#22c55e] dark:text-[#919EAB]">
                                            Cập nhật hồ sơ công ty của bạn
                                        </p>
                                    </div>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.1, rotate: 90 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={onClose}
                                    className="p-2 hover:bg-[#22c55e]/15 dark:hover:bg-white/[0.06] rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5 text-[#22c55e] dark:text-[#C4CDD5]" />
                                </motion.button>
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
                            {/* Section: Thông tin cơ bản */}
                            <FormSection
                                icon={<Building2 className="w-4 h-4" />}
                                title="Thông tin cơ bản"
                                gradient="from-[#22c55e] to-[#10b981]"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <PremiumInput
                                        label="Tên công ty"
                                        icon={<Building2 className="w-4 h-4" />}
                                        value={formData.name}
                                        onChange={(v) => handleChange("name", v)}
                                        required
                                        gradient="sky"
                                    />
                                    <PremiumInput
                                        label="Slogan"
                                        icon={<Sparkles className="w-4 h-4" />}
                                        value={formData.tagline}
                                        onChange={(v) => handleChange("tagline", v)}
                                        placeholder="Khẩu hiệu công ty"
                                        gradient="green"
                                    />
                                </div>
                            </FormSection>

                            {/* Section: Phân loại */}
                            <FormSection
                                icon={<Briefcase className="w-4 h-4" />}
                                title="Phân loại"
                                gradient="from-purple-500 to-[#10b981]"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <PremiumSelect
                                        label="Ngành nghề"
                                        icon={<Briefcase className="w-4 h-4" />}
                                        value={formData.industry}
                                        onChange={(v) => handleChange("industry", v)}
                                        options={INDUSTRIES.map((ind) => ({ value: ind, label: ind }))}
                                        placeholder="Chọn ngành nghề"
                                        gradient="purple"
                                    />
                                    <PremiumSelect
                                        label="Quy mô"
                                        icon={<Users className="w-4 h-4" />}
                                        value={formData.size}
                                        onChange={(v) => handleChange("size", v as Company["size"])}
                                        options={Object.entries(COMPANY_SIZES).map(([key, label]) => ({
                                            value: key,
                                            label,
                                        }))}
                                        gradient="indigo"
                                    />
                                </div>
                            </FormSection>

                            {/* Section: Địa điểm */}
                            <FormSection
                                icon={<MapPin className="w-4 h-4" />}
                                title="Địa điểm"
                                gradient="from-orange-500 to-red-500"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <PremiumInput
                                        label="Thành phố"
                                        icon={<MapPin className="w-4 h-4" />}
                                        value={formData.location}
                                        onChange={(v) => handleChange("location", v)}
                                        placeholder="TP. Hồ Chí Minh"
                                        gradient="orange"
                                    />
                                    <PremiumInput
                                        label="Địa chỉ chi tiết"
                                        icon={<MapPin className="w-4 h-4" />}
                                        value={formData.address}
                                        onChange={(v) => handleChange("address", v)}
                                        placeholder="Tầng 15, Tòa nhà ABC"
                                        gradient="red"
                                    />
                                </div>
                            </FormSection>

                            {/* Section: Liên hệ */}
                            <FormSection
                                icon={<Phone className="w-4 h-4" />}
                                title="Thông tin liên hệ"
                                gradient="from-green-500 to-emerald-600"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <PremiumInput
                                        label="Website"
                                        icon={<Globe className="w-4 h-4" />}
                                        value={formData.website}
                                        onChange={(v) => handleChange("website", v)}
                                        placeholder="https://..."
                                        type="url"
                                        gradient="teal"
                                    />
                                    <PremiumInput
                                        label="Email"
                                        icon={<Mail className="w-4 h-4" />}
                                        value={formData.email}
                                        onChange={(v) => handleChange("email", v)}
                                        placeholder="hr@company.com"
                                        type="email"
                                        gradient="green"
                                    />
                                    <PremiumInput
                                        label="Điện thoại"
                                        icon={<Phone className="w-4 h-4" />}
                                        value={formData.phone}
                                        onChange={(v) => handleChange("phone", v)}
                                        placeholder="+84 28 ..."
                                        type="tel"
                                        gradient="emerald"
                                    />
                                </div>
                            </FormSection>

                            {/* Section: Năm thành lập */}
                            <FormSection
                                icon={<Calendar className="w-4 h-4" />}
                                title="Lịch sử"
                                gradient="from-amber-500 to-orange-500"
                            >
                                <PremiumInput
                                    label="Năm thành lập"
                                    icon={<Calendar className="w-4 h-4" />}
                                    value={formData.founded}
                                    onChange={(v) => handleChange("founded", v)}
                                    placeholder="2015"
                                    type="number"
                                    gradient="amber"
                                />
                            </FormSection>
                        </form>

                        {/* Footer with buttons */}
                        <div className="relative px-8 py-6 bg-gradient-to-r from-[rgba(145,158,171,0.04)] via-white to-green-50/30 dark:from-[rgba(145,158,171,0.04)] dark:via-[#1C252E] dark:to-green-900/5 border-t border-[rgba(145,158,171,0.12)] dark:border-white/[0.08]">
                            <div className="flex gap-4">
                                <motion.button
                                    type="submit"
                                    onClick={handleSubmit}
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex-1 py-4 px-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-2xl font-semibold shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 transition-all flex items-center justify-center gap-2"
                                >
                                    <Check className="w-5 h-5" />
                                    Lưu thay đổi
                                    <Zap className="w-4 h-4" />
                                </motion.button>
                                <motion.button
                                    type="button"
                                    onClick={onClose}
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex-1 py-4 px-6 bg-white dark:bg-white/[0.04] hover:bg-[#22c55e]/10 dark:hover:bg-white/[0.06] text-[#22c55e] dark:text-[#C4CDD5] rounded-2xl font-semibold border-2 border-[#22c55e]/30 dark:border-white/[0.08] hover:border-[#22c55e]/30 dark:hover:border-white/[0.16] transition-all flex items-center justify-center gap-2"
                                >
                                    <X className="w-5 h-5" />
                                    Hủy bỏ
                                </motion.button>
                            </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// Form Section Component
function FormSection({
    icon,
    title,
    gradient,
    children,
}: {
    icon: React.ReactNode;
    title: string;
    gradient: string;
    children: React.ReactNode;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
        >
            <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-lg`}>
                    {icon}
                </div>
                <h3 className="font-semibold text-[#1C252E] dark:text-white">{title}</h3>
            </div>
            <div className="pl-10">{children}</div>
        </motion.div>
    );
}

// Premium Input Component
interface PremiumInputProps {
    label: string;
    icon: React.ReactNode;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    type?: string;
    required?: boolean;
    gradient?: string;
}

function PremiumInput({
    label,
    icon,
    value,
    onChange,
    placeholder,
    type = "text",
    required = false,
    gradient = "sky",
}: PremiumInputProps) {
    const [isFocused, setIsFocused] = React.useState(false);

    const gradientColors: Record<string, string> = {
        sky: "from-[#22c55e] to-[#10b981]",
        green: "from-green-500 to-emerald-600",
        purple: "from-purple-500 to-[#10b981]",
        orange: "from-orange-500 to-red-500",
        red: "from-red-500 to-pink-500",
        teal: "from-teal-500 to-[#10b981]",
        emerald: "from-emerald-500 to-green-600",
        amber: "from-amber-500 to-orange-500",
        indigo: "from-[#22c55e] to-purple-600",
    };

    return (
        <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-600 dark:text-[#C4CDD5] flex items-center gap-1.5">
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${gradientColors[gradient]}`}>
                    {icon}
                </span>
                {label}
                {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
                <motion.div
                    animate={{
                        opacity: isFocused ? 1 : 0,
                        scale: isFocused ? 1 : 0.95,
                    }}
                    className={`absolute -inset-0.5 bg-gradient-to-r ${gradientColors[gradient]} rounded-2xl blur-sm`}
                />
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    required={required}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="relative w-full px-4 py-3 bg-white dark:bg-[#1C252E] rounded-xl border-2 border-slate-200 dark:border-white/[0.08] focus:border-transparent focus:outline-none text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-[#637381] transition-all"
                />
            </div>
        </div>
    );
}

// Premium Select Component (Custom Dropdown)
interface PremiumSelectProps {
    label: string;
    icon: React.ReactNode;
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
    placeholder?: string;
    gradient?: string;
}

function PremiumSelect({
    label,
    icon,
    value,
    onChange,
    options,
    placeholder = "Chọn...",
    gradient = "sky",
}: PremiumSelectProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [isFocused, setIsFocused] = React.useState(false);
    const ref = React.useRef<HTMLDivElement>(null);

    const gradientColors: Record<string, string> = {
        sky: "from-[#22c55e] to-[#10b981]",
        green: "from-green-500 to-emerald-600",
        purple: "from-purple-500 to-[#10b981]",
        indigo: "from-[#22c55e] to-purple-600",
        orange: "from-orange-500 to-red-500",
    };

    const selectedOption = options.find((opt) => opt.value === value);

    React.useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setIsOpen(false);
                setIsFocused(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="space-y-1.5" ref={ref}>
            <label className="text-sm font-medium text-slate-600 dark:text-[#C4CDD5] flex items-center gap-1.5">
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${gradientColors[gradient]}`}>
                    {icon}
                </span>
                {label}
            </label>
            <div className="relative">
                <motion.div
                    animate={{
                        opacity: isFocused || isOpen ? 1 : 0,
                        scale: isFocused || isOpen ? 1 : 0.95,
                    }}
                    className={`absolute -inset-0.5 bg-gradient-to-r ${gradientColors[gradient]} rounded-2xl blur-sm`}
                />
                <motion.button
                    type="button"
                    onClick={() => {
                        setIsOpen(!isOpen);
                        setIsFocused(true);
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="relative w-full px-4 py-3 bg-white dark:bg-[#1C252E] rounded-xl border-2 border-slate-200 dark:border-white/[0.08] focus:border-transparent focus:outline-none text-left flex items-center justify-between transition-all"
                >
                    <span className={selectedOption ? "text-slate-800 dark:text-white" : "text-slate-400 dark:text-[#637381]"}>
                        {selectedOption?.label || placeholder}
                    </span>
                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <ChevronDown className="w-5 h-5 text-slate-400 dark:text-[#637381]" />
                    </motion.div>
                </motion.button>

                {/* Dropdown */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            className="absolute z-50 w-full mt-2 bg-white dark:bg-[#1C252E] rounded-2xl shadow-2xl shadow-slate-200/50 dark:shadow-black/30 border border-slate-100 dark:border-white/[0.08] overflow-hidden"
                        >
                            {/* Gradient header */}
                            <div className={`h-1 bg-gradient-to-r ${gradientColors[gradient]}`} />

                            <div className="max-h-60 overflow-y-auto py-2">
                                {options.map((option, index) => (
                                    <motion.button
                                        key={option.value}
                                        type="button"
                                        onClick={() => {
                                            onChange(option.value);
                                            setIsOpen(false);
                                            setIsFocused(false);
                                        }}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.02 }}
                                        whileHover={{ backgroundColor: "rgba(14, 165, 233, 0.1)", x: 4 }}
                                        className={`w-full px-4 py-3 text-left flex items-center gap-3 transition-colors ${value === option.value
                                                ? "bg-[#22c55e]/10 dark:bg-[#22c55e]/20 text-[#22c55e] dark:text-[#22c55e]"
                                                : "text-slate-700 dark:text-[#C4CDD5] hover:text-[#22c55e] dark:hover:text-[#22c55e]"
                                            }`}
                                    >
                                        <div
                                            className={`w-2 h-2 rounded-full ${value === option.value
                                                    ? `bg-gradient-to-r ${gradientColors[gradient]}`
                                                    : "bg-slate-300 dark:bg-[#637381]"
                                                }`}
                                        />
                                        <span className="font-medium">{option.label}</span>
                                        {value === option.value && (
                                            <Check className="w-4 h-4 ml-auto text-green-500" />
                                        )}
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

