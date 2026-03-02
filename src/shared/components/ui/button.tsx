"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/shared/utils/cn";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost" | "glass" | "danger" | "link" | "cta" | "gradient" | "yellow";
    size?: "sm" | "md" | "lg" | "icon";
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant = "primary",
            size = "md",
            isLoading = false,
            leftIcon,
            rightIcon,
            children,
            disabled,
            type = "button",
            asChild = false,
            ...props
        },
        ref
    ) => {
        // Design System colors - Black/White primary, Green accent
        const variants = {
            // Primary - Black (Design System)
            primary:
                "bg-[#1C252E] text-white hover:bg-[#2D3748] shadow-lg shadow-gray-500/20 hover:shadow-gray-500/30 border border-transparent dark:bg-white dark:text-[#1C252E] dark:hover:bg-gray-100 dark:shadow-gray-900/20",
            // Secondary - White/Gray
            secondary:
                "bg-white dark:bg-slate-800 text-[#1C252E] hover:bg-[#F9FAFB] dark:hover:bg-slate-700 border border-gray-200 dark:border-gray-700",
            // CTA - Green accent (Design System)
            cta:
                "bg-gradient-to-r from-[#22c55e] to-[#10b981] text-white hover:from-[#10b981] hover:to-[#22c55e] shadow-lg shadow-green-500/25 hover:shadow-green-500/40 border border-transparent dark:from-[#16A34A] dark:to-[#059669] dark:shadow-green-900/30",
            // Gradient - Animated Green to Yellow (Design System)
            gradient:
                "bg-gradient-to-r from-[#22c55e] via-[#10b981] to-[#FFAB00] text-white shadow-lg hover:shadow-xl border border-transparent bg-[length:200%_200%] hover:bg-[length:100%_100%] transition-all duration-500 dark:from-[#22c55e] dark:via-[#10b981] dark:to-[#FFAB00]",
            // Outline - Green border (Design System)
            outline:
                "bg-transparent border-2 border-[#22c55e] text-[#22c55e] hover:bg-[#22c55e] hover:text-white hover:shadow-lg shadow-sm dark:border-[#4ADE80] dark:text-[#4ADE80] dark:hover:bg-[#4ADE80] dark:hover:text-[#141A21]",
            // Ghost - Gray text (Design System)
            ghost:
                "bg-transparent text-[#637381] hover:bg-[#F9FAFB] dark:hover:bg-[#1C252E] border border-transparent hover:text-[#22c55e] dark:text-[#919EAB] dark:hover:text-[#4ADE80]",
            // Glass - Glassmorphism (Design System)
            glass:
                "bg-white/80 dark:bg-[#1C252E]/80 backdrop-blur-xl border border-gray-200 dark:border-gray-700 text-[#1C252E] dark:text-white hover:bg-white dark:hover:bg-[#1C252E] shadow-lg hover:shadow-xl",
            // Danger - Red (Design System)
            danger:
                "bg-[#FF5630] text-white hover:bg-[#E64A1F] shadow-lg shadow-red-500/20 hover:shadow-red-500/30 border border-transparent dark:bg-[#DC2626] dark:hover:bg-[#B91C1C] dark:shadow-red-900/30",
            // Link - Green (Design System)
            link:
                "bg-transparent text-[#22c55e] hover:text-[#10b981] p-0 h-auto font-semibold underline-offset-4 hover:underline dark:text-[#4ADE80] dark:hover:text-[#22c55e]",
            // Yellow - Yellow gradient accent (Design System)
            yellow:
                "bg-gradient-to-r from-[#FFAB00] to-[#FFD666] text-[#1C252E] hover:from-[#FFD666] hover:to-[#FFAB00] shadow-lg shadow-yellow-500/25 hover:shadow-yellow-500/40 border border-transparent dark:from-[#D97706] dark:to-[#F59E0B] dark:text-white dark:shadow-yellow-900/30",
        };

        const sizes = {
            sm: "h-9 px-4 text-xs rounded-lg",
            md: "h-11 px-6 text-sm rounded-lg",
            lg: "h-14 px-8 text-base rounded-xl",
            icon: "h-11 w-11 p-0 rounded-lg flex items-center justify-center",
        };

        const baseStyles = cn(
            "relative inline-flex items-center justify-center font-semibold transition-all duration-250 ease-out focus:outline-none focus:ring-2 focus:ring-[#22c55e] focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed cursor-pointer",
            "hover:scale-[1.02] active:scale-[0.98]",
            variants[variant],
            sizes[size],
            className
        );

        if (asChild) {
            return (
                <Slot ref={ref} className={baseStyles} {...props}>
                    {children}
                </Slot>
            );
        }

        return (
            <motion.button
                ref={ref}
                type={type}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={baseStyles}
                disabled={disabled || isLoading}
                {...(props as HTMLMotionProps<"button">)}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
                {children}
                {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
            </motion.button>
        );
    }
);

Button.displayName = "Button";

export { Button };
