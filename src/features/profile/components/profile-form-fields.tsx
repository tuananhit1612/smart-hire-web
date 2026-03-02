"use client";

import { cn } from "@/lib/utils";

/* ─── Form Field (Text Input) ─── */
interface FormFieldProps {
    label: string;
    value?: string;
    type?: string;
    placeholder?: string;
    disabled?: boolean;
}

export function FormField({ label, value, type = "text", placeholder, disabled }: FormFieldProps) {
    return (
        <div className="space-y-2">
            <label className="block text-[13px] font-semibold text-[#637381] dark:text-[#919EAB]">
                {label}
            </label>
            <input
                type={type}
                defaultValue={value || ""}
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
}

export function FormSelect({ label, value, options, disabled }: FormSelectProps) {
    return (
        <div className="space-y-2">
            <label className="block text-[13px] font-semibold text-[#637381] dark:text-[#919EAB]">
                {label}
            </label>
            <select
                defaultValue={value || ""}
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
}

export function FormTextarea({ label, value, placeholder, rows = 4 }: FormTextareaProps) {
    return (
        <div className="space-y-2">
            {label && (
                <label className="block text-[13px] font-semibold text-[#637381] dark:text-[#919EAB]">
                    {label}
                </label>
            )}
            <textarea
                defaultValue={value || ""}
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

/* ─── Save Button (§3.1 Primary Inverted) ─── */
export function SaveButton({ label = "Lưu thay đổi" }: { label?: string }) {
    return (
        <div className="flex justify-end pt-2">
            <button className="h-12 px-8 bg-[#1C252E] dark:bg-white text-white dark:text-[#1C252E] text-[14px] font-bold rounded-xl hover:bg-[#1C252E]/90 dark:hover:bg-white/90 transition-all">
                {label}
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
