"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { useProfileStore } from "../stores/profile-store";
import { useToastHelpers } from "@/shared/components/ui/toast";
import { Loader2 } from "lucide-react";

/* ─── Form Field (Text Input) ─── */
interface FormFieldProps {
    label: string;
    value?: string;
    type?: string;
    placeholder?: string;
    disabled?: boolean;
    onChange?: (value: string) => void;
}

export function FormField({ label, value, type = "text", placeholder, disabled, onChange }: FormFieldProps) {
    return (
        <div className="space-y-2">
            <label className="block text-[13px] font-semibold text-[#637381] dark:text-[#919EAB]">
                {label}
            </label>
            <input
                type={type}
                value={value || ""}
                onChange={(e) => onChange?.(e.target.value)}
                placeholder={placeholder || label}
                disabled={disabled}
                className={cn(
                    "w-full h-12 px-4 rounded-xl text-[15px] transition-all outline-none",
                    "border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08]",
                    "bg-white dark:bg-[#1C252E]",
                    "text-[#1C252E] dark:text-white",
                    "placeholder-[#919EAB]",
                    "focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/20",
                    disabled && "opacity-60 cursor-not-allowed"
                )}
            />
        </div>
    );
}

/* ─── Form Select ─── */
interface FormSelectProps {
    label: string;
    value?: string;
    options: string[];
    disabled?: boolean;
    onChange?: (value: string) => void;
}

export function FormSelect({ label, value, options, disabled, onChange }: FormSelectProps) {
    return (
        <div className="space-y-2">
            <label className="block text-[13px] font-semibold text-[#637381] dark:text-[#919EAB]">
                {label}
            </label>
            <select
                value={value || ""}
                onChange={(e) => onChange?.(e.target.value)}
                disabled={disabled}
                className={cn(
                    "w-full h-12 px-4 rounded-xl text-[15px] transition-all outline-none appearance-none cursor-pointer",
                    "border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08]",
                    "bg-white dark:bg-[#1C252E]",
                    "text-[#1C252E] dark:text-white",
                    "focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/20",
                    disabled && "opacity-60 cursor-not-allowed"
                )}
            >
                <option value="">{label}</option>
                {options.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                ))}
            </select>
        </div>
    );
}

/* ─── Form Textarea ─── */
interface FormTextareaProps {
    label?: string;
    value?: string;
    placeholder?: string;
    rows?: number;
    onChange?: (value: string) => void;
}

export function FormTextarea({ label, value, placeholder, rows = 4, onChange }: FormTextareaProps) {
    return (
        <div className="space-y-2">
            {label && (
                <label className="block text-[13px] font-semibold text-[#637381] dark:text-[#919EAB]">
                    {label}
                </label>
            )}
            <textarea
                value={value || ""}
                onChange={(e) => onChange?.(e.target.value)}
                placeholder={placeholder || label}
                rows={rows}
                className={cn(
                    "w-full px-4 py-3 rounded-xl text-[14px] transition-all outline-none resize-none",
                    "border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08]",
                    "bg-white dark:bg-[#1C252E]",
                    "text-[#1C252E] dark:text-white",
                    "placeholder-[#919EAB]",
                    "focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/20"
                )}
            />
        </div>
    );
}

/* ─── Save Button — Wired to profile store API ─── */
export function SaveButton({ label = "Lưu thay đổi" }: { label?: string }) {
    const { saveProfile } = useProfileStore();
    const toast = useToastHelpers();
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await saveProfile();
            toast.success("Lưu thành công", "Hồ sơ của bạn đã được cập nhật.");
        } catch (err: any) {
            console.error("[SaveButton] Error:", err);
            toast.error("Lưu thất bại", err?.message || "Đã xảy ra lỗi khi lưu hồ sơ.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="flex justify-end pt-2">
            <button
                type="button"
                onClick={handleSave}
                disabled={isSaving}
                className={cn(
                    "h-12 px-8 text-[14px] font-bold rounded-xl transition-all inline-flex items-center gap-2",
                    "bg-[#1C252E] dark:bg-white text-white dark:text-[#1C252E]",
                    "hover:bg-[#1C252E]/90 dark:hover:bg-white/90",
                    "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
            >
                {isSaving && <Loader2 className="h-4 w-4 animate-spin" />}
                {isSaving ? "Đang lưu..." : label}
            </button>
        </div>
    );
}

/* ─── Section Card (§4.1) ─── */
export function SectionCard({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={cn(
            "bg-white dark:bg-[#1C252E]",
            "border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08]",
            "rounded-2xl p-6 md:p-8",
            "hover:border-[rgba(145,158,171,0.32)] dark:hover:border-white/[0.12]",
            "transition-all",
            className
        )}>
            {children}
        </div>
    );
}
