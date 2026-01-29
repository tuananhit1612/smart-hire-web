"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Linkedin, Globe, Camera, AlertCircle } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
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

export function PersonalInfoSection({ data, onChange }: PersonalInfoSectionProps) {
    const [touched, setTouched] = React.useState<Record<string, boolean>>({});
    const [errors, setErrors] = React.useState<Record<string, string | null>>({});

    const handleChange = (field: keyof PersonalInfo, value: string) => {
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
            case "linkedIn":
            case "portfolio":
                error = validateUrl(value);
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
                <h2 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2 md:gap-3">
                    <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white flex-shrink-0">
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
                <div className="relative group cursor-pointer">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-[2px]">
                        <div className="w-full h-full rounded-2xl bg-gray-100 dark:bg-zinc-800 flex items-center justify-center overflow-hidden">
                            {data.avatarUrl ? (
                                <img
                                    src={data.avatarUrl}
                                    alt="Avatar"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <User className="w-10 h-10 text-gray-400" />
                            )}
                        </div>
                    </div>
                    <div className="absolute inset-0 rounded-2xl bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Camera className="w-6 h-6 text-white" />
                    </div>
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Ảnh đại diện
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                        Tải lên ảnh chân dung chuyên nghiệp (tùy chọn)
                    </p>
                </div>
            </div>

            {/* Form Fields */}
            <div className="grid gap-6">
                {/* Full Name */}
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

                {/* Social Links */}
                <div className="pt-4 border-t border-gray-200 dark:border-white/10">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                        Liên kết mạng xã hội (tùy chọn)
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Input
                                label="LinkedIn"
                                placeholder="linkedin.com/in/your-profile"
                                value={data.linkedIn || ""}
                                onChange={(e) => handleChange("linkedIn", e.target.value)}
                                onBlur={() => handleBlur("linkedIn")}
                                leftIcon={<Linkedin className="w-5 h-5" />}
                                className={getInputClass("linkedIn")}
                            />
                            <FieldError error={getError("linkedIn")} />
                        </div>
                        <div>
                            <Input
                                label="Portfolio/Website"
                                placeholder="yourwebsite.com"
                                value={data.portfolio || ""}
                                onChange={(e) => handleChange("portfolio", e.target.value)}
                                onBlur={() => handleBlur("portfolio")}
                                leftIcon={<Globe className="w-5 h-5" />}
                                className={getInputClass("portfolio")}
                            />
                            <FieldError error={getError("portfolio")} />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
