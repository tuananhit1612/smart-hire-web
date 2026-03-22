"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Linkedin, Globe, Camera, AlertCircle, Briefcase, Plus, Trash2, Github, Facebook, Instagram, Twitter, Dribbble } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { PersonalInfo } from "../../types/types";
import { cn } from "@/lib/utils";

interface PersonalInfoSectionProps {
    data: PersonalInfo;
    onChange: (data: PersonalInfo) => void;
}

// Validation helpers
const validateEmail = (email: string): string | null => {
    if (!email) return null;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Email không hợp lệ";
    return null;
};

const validatePhone = (phone: string): string | null => {
    if (!phone) return null;
    const phoneRegex = /^[0-9+\-\s()]{9,15}$/;
    if (!phoneRegex.test(phone)) return "Số điện thoại không hợp lệ";
    return null;
};

const validateUrl = (url: string): string | null => {
    if (!url) return null;
    try {
        const fullUrl = url.startsWith("http") ? url : `https://${url}`;
        new URL(fullUrl);
        return null;
    } catch {
        return "URL không hợp lệ";
    }
};

const validateFullName = (name: string): string | null => {
    if (!name.trim()) return "Họ và tên là bắt buộc";
    if (name.length < 2) return "Tên phải có ít nhất 2 ký tự";
    return null;
};

import { useDropzone } from "react-dropzone";

// Avatar Dropzone Component
function AvatarDropzone({ value, onChange }: { value?: string; onChange: (url: string) => void }) {
    const onDrop = React.useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result as string;
                onChange(result);
            };
            reader.readAsDataURL(file);
        }
    }, [onChange]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': [],
            'image/png': [],
            'image/webp': []
        },
        maxFiles: 1,
        maxSize: 2097152 // 2MB
    });

    return (
        <div
            {...getRootProps()}
            className={cn(
                "relative group cursor-pointer transition-all duration-200 ease-in-out transform",
                isDragActive ? "scale-105" : "hover:scale-105"
            )}
        >
            <input {...getInputProps()} />
            <div className={cn(
                "w-24 h-24 rounded-2xl p-[2px] transition-all duration-300",
                isDragActive
                    ? "bg-gradient-to-r from-pink-500 via-amber-500 to-emerald-500 shadow-xl shadow-amber-500/30"
                    : "bg-gradient-to-r from-green-400 via-[#10b981] to-emerald-400"
            )}>
                <div className="w-full h-full rounded-2xl bg-gray-50 dark:bg-[#1C252E] flex items-center justify-center overflow-hidden relative">
                    {value ? (
                        <img
                            src={value}
                            alt="Avatar"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <User className="w-10 h-10 text-gray-400" />
                    )}

                    {/* Overlay */}
                    <div className={cn(
                        "absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-200",
                        isDragActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    )}>
                        <Camera className="w-6 h-6 text-white drop-shadow-md" />
                    </div>
                </div>
            </div>

            {/* Status Indicator */}
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-md">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
            </div>
        </div>
    );
}

// Error Display Component
function FieldError({ error }: { error: string | null }) {
    if (!error) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-1.5 text-red-500 text-xs mt-1"
        >
            <AlertCircle className="w-3 h-3" />
            <span>{error}</span>
        </motion.div>
    );
}

// Custom Social Select Component
const SOCIAL_NETWORKS = [
    { value: 'LinkedIn', label: 'LinkedIn', icon: Linkedin },
    { value: 'GitHub', label: 'GitHub', icon: Github },
    { value: 'Website', label: 'Website', icon: Globe },
    { value: 'Dribbble', label: 'Dribbble', icon: Dribbble },
    { value: 'Twitter', label: 'Twitter / X', icon: Twitter },
    { value: 'Facebook', label: 'Facebook', icon: Facebook },
    { value: 'Instagram', label: 'Instagram', icon: Instagram },
    { value: 'Other', label: 'Khác', icon: Globe },
] as const;

function SocialSelect({ value, onChange }: { value: string; onChange: (value: string) => void }) {
    const [isOpen, setIsOpen] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selected = SOCIAL_NETWORKS.find(n => n.value === value) || SOCIAL_NETWORKS[0];
    const Icon = selected.icon;

    return (
        <div className="relative" ref={containerRef}>
            <button
                type="button" // Prevent form submission
                onClick={() => setIsOpen(!isOpen)}
                className="w-full h-11 pl-3 pr-2 bg-white dark:bg-[#141A21] border border-gray-200 dark:border-white/10 rounded-xl text-sm text-gray-700 dark:text-gray-300 flex items-center justify-between hover:border-green-300 dark:hover:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
            >
                <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-gray-400" />
                    <span>{selected.label}</span>
                </div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`ml-2 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                >
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-1 w-full bg-white dark:bg-[#1C252E] border border-gray-100 dark:border-white/10 rounded-xl shadow-xl shadow-gray-200/50 dark:shadow-none z-50 max-h-60 overflow-y-auto py-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                    {SOCIAL_NETWORKS.map((network) => {
                        const NetworkIcon = network.icon;
                        return (
                            <button
                                key={network.value}
                                type="button"
                                onClick={() => {
                                    onChange(network.value);
                                    setIsOpen(false);
                                }}
                                className="w-full px-3 py-2 text-sm text-left flex items-center gap-2 hover:bg-green-50 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300 hover:text-green-700 dark:hover:text-white transition-colors"
                            >
                                <NetworkIcon className="w-4 h-4 text-gray-400" />
                                {network.label}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export function PersonalInfoSection({ data, onChange }: PersonalInfoSectionProps) {
    const [touched, setTouched] = React.useState<Record<string, boolean>>({});
    const [errors, setErrors] = React.useState<Record<string, string | null>>({});

    const handleChange = (field: keyof PersonalInfo, value: any) => {
        onChange({ ...data, [field]: value });
    };

    const handleBlur = (field: keyof PersonalInfo) => {
        setTouched((prev) => ({ ...prev, [field]: true }));
        validateField(field, data[field] as string);
    };

    const validateField = (field: keyof PersonalInfo, value: string) => {
        let error: string | null = null;

        switch (field) {
            case "fullName":
                error = validateFullName(value);
                break;
            case "email":
                error = validateEmail(value);
                break;
            case "phone":
                error = validatePhone(value);
                break;
        }

        setErrors((prev) => ({ ...prev, [field]: error }));
    };

    const getError = (field: keyof PersonalInfo) => {
        return touched[field] ? errors[field] : null;
    };

    const getInputClass = (field: keyof PersonalInfo) => {
        return cn(
            touched[field] && errors[field] && "border-red-500 focus:ring-red-500"
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 md:space-y-8"
        >
            {/* Section Header */}
            <div>
                <h2 className="text-xl md:text-2xl font-bold tracking-tight text-green-900 dark:text-white flex items-center gap-2 md:gap-3">
                    <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-gradient-to-r from-green-500 to-green-500 text-white flex-shrink-0 shadow-lg shadow-green-500/20">
                        <User className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                    <span>Thông tin cá nhân</span>
                </h2>
                <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mt-2">
                    Thông tin liên hệ cơ bản để nhà tuyển dụng có thể liên lạc với bạn
                </p>
            </div>

            {/* Avatar Upload */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <AvatarDropzone
                    value={data.avatarUrl}
                    onChange={(url) => handleChange("avatarUrl", url)}
                />
                <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Ảnh đại diện
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 max-w-[200px] leading-relaxed">
                        Kéo thả hoặc click để tải ảnh lên (Max 2MB).
                        <br />Khuyên dùng ảnh chân dung chuyên nghiệp.
                    </p>
                </div>
            </div>

            {/* Form Fields */}
            <div className="grid gap-6">
                {/* Full Name & Job Title */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <Input
                            label="Họ và tên *"
                            placeholder="Nguyễn Văn A"
                            value={data.fullName}
                            onChange={(e) => handleChange("fullName", e.target.value)}
                            onBlur={() => handleBlur("fullName")}
                            leftIcon={<User className="w-5 h-5" />}
                            className={getInputClass("fullName")}
                        />
                        <FieldError error={getError("fullName")} />
                    </div>
                    <div>
                        <Input
                            label="Vị trí ứng tuyển"
                            placeholder="e.g. Sales Manager"
                            value={data.title || ""}
                            onChange={(e) => handleChange("title", e.target.value)}
                            leftIcon={<Briefcase className="w-5 h-5" />}
                        />
                    </div>
                </div>

                {/* Email & Phone Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <Input
                            label="Email *"
                            type="email"
                            placeholder="email@example.com"
                            value={data.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            onBlur={() => handleBlur("email")}
                            leftIcon={<Mail className="w-5 h-5" />}
                            className={getInputClass("email")}
                        />
                        <FieldError error={getError("email")} />
                    </div>
                    <div>
                        <Input
                            label="Số điện thoại *"
                            type="tel"
                            placeholder="0901234567"
                            value={data.phone}
                            onChange={(e) => handleChange("phone", e.target.value)}
                            onBlur={() => handleBlur("phone")}
                            leftIcon={<Phone className="w-5 h-5" />}
                            className={getInputClass("phone")}
                        />
                        <FieldError error={getError("phone")} />
                    </div>
                </div>

                {/* Location */}
                <Input
                    label="Địa chỉ"
                    placeholder="TP. Hồ Chí Minh, Việt Nam"
                    value={data.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                    leftIcon={<MapPin className="w-5 h-5" />}
                />

                {/* Social Links Dynamic List */}
                <div className="pt-6 border-t border-slate-100 dark:border-white/10">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-sm font-semibold text-slate-800 dark:text-white flex items-center gap-2">
                                <Globe className="w-4 h-4 text-green-500" />
                                Mạng xã hội & Liên kết
                            </p>
                            <p className="text-xs text-slate-500 dark:text-gray-400 mt-1">Thêm các liên kết như LinkedIn, Portfolio, GitHub...</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {data.socials?.map((social, index) => (
                            <motion.div
                                key={social.id}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="group flex flex-col sm:flex-row items-start sm:items-center gap-3 transition-colors"
                            >
                                <div className="w-full sm:w-[160px] flex-shrink-0">
                                    <SocialSelect
                                        value={social.network}
                                        onChange={(value) => {
                                            const newSocials = [...(data.socials || [])];
                                            newSocials[index].network = value as any;
                                            handleChange('socials', newSocials);
                                        }}
                                    />
                                </div>
                                <div className="flex-1 w-full relative">
                                    <input
                                        type="text"
                                        className="w-full h-11 px-4 bg-white dark:bg-[#141A21] border border-gray-200 dark:border-white/10 rounded-xl text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all hover:border-green-300 dark:hover:border-green-500"
                                        placeholder={
                                            social.network === 'LinkedIn' ? 'linkedin.com/in/username' :
                                                social.network === 'GitHub' ? 'github.com/username' :
                                                    'URL liên kết của bạn'
                                        }
                                        value={social.url}
                                        onChange={(e) => {
                                            const newSocials = [...(data.socials || [])];
                                            newSocials[index].url = e.target.value;
                                            handleChange('socials', newSocials);
                                        }}
                                    />
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => {
                                        const newSocials = data.socials.filter((_, i) => i !== index);
                                        handleChange('socials', newSocials);
                                    }}
                                    className="h-11 w-11 flex-shrink-0 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors sm:static absolute top-0 right-0"
                                    title="Xóa liên kết"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </Button>
                            </motion.div>
                        ))}

                        <Button
                            variant="outline"
                            onClick={() => {
                                const newSocials = [
                                    ...(data.socials || []),
                                    { id: Date.now().toString() + Math.random().toString(36).substr(2, 9), network: 'LinkedIn', url: '' }
                                ];
                                handleChange('socials', newSocials);
                            }}
                            className="w-full border-dashed border-2 border-slate-200 dark:border-white/10 text-slate-600 dark:text-gray-400 hover:border-green-500 dark:hover:border-green-500 hover:text-green-600 dark:hover:text-white hover:bg-green-50 dark:hover:bg-white/5 h-12 rounded-xl text-sm font-medium transition-all duration-200"
                        >
                            <Plus className="w-5 h-5 mr-2" />
                            Thêm liên kết mới
                        </Button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}


