"use client";

import * as React from "react";
import { cn } from "@/shared/utils/cn";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string;
    label?: string;
    startIcon?: React.ReactNode;
    leftIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    variant?: "default" | "glass";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, error, label, startIcon, leftIcon, endIcon, variant = "default", ...props }, ref) => {
        const iconLeft = startIcon || leftIcon;
        
        // Design System colors - Purple primary (#7635dc)
        const variants = {
            default: "bg-transparent border border-[#E5E7EB] dark:border-[#2D3748] text-[#1C252E] dark:text-white placeholder:text-[#637381] focus:border-[#7635dc] focus:ring-[#7635dc]/20",
            glass: "bg-white/50 dark:bg-[#1C252E]/50 backdrop-blur-sm border border-[#E5E7EB]/50 dark:border-[#2D3748]/50 text-[#1C252E] dark:text-white placeholder:text-[#637381] focus:border-[#7635dc] focus:ring-[#7635dc]/20",
        };

        return (
            <div className="w-full space-y-2">
                {label && (
                    <label className="text-sm font-semibold leading-none text-[#1C252E] dark:text-white">
                        {label}
                    </label>
                )}
                <div className="relative">
                    {iconLeft && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#637381] pointer-events-none">
                            {iconLeft}
                        </div>
                    )}
                    <input
                        type={type}
                        className={cn(
                            "flex h-12 w-full px-4 py-2 text-sm rounded-lg",
                            "ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                            "disabled:cursor-not-allowed disabled:opacity-50",
                            "transition-all duration-200",
                            variants[variant],
                            iconLeft && "pl-11",
                            endIcon && "pr-11",
                            error && "border-[#FF5630] focus-visible:ring-[#FF5630] focus-visible:border-[#FF5630]",
                            className
                        )}
                        ref={ref}
                        {...props}
                    />
                    {endIcon && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#637381]">
                            {endIcon}
                        </div>
                    )}
                </div>
                {error && (
                    <p className="text-xs font-medium text-[#FF5630] flex items-center gap-1">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);
Input.displayName = "Input";

export { Input };
