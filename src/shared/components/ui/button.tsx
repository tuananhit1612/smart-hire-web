"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/shared/utils/cn";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost" | "glass" | "danger";
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
            ...props
        },
        ref
    ) => {
        const variants = {
            primary:
                "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:opacity-90 shadow-lg shadow-blue-500/20 border-transparent",
            secondary:
                "bg-white text-gray-900 border-gray-200 hover:bg-gray-50 dark:bg-zinc-800 dark:text-white dark:border-zinc-700 dark:hover:bg-zinc-700",
            outline:
                "bg-transparent border-gray-200 text-gray-700 hover:bg-gray-50 dark:border-zinc-700 dark:text-gray-300 dark:hover:bg-zinc-800 border",
            ghost:
                "bg-transparent text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-zinc-800",
            glass:
                "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 shadow-xl",
            danger:
                "bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/20",
        };

        const sizes = {
            sm: "h-9 px-4 text-xs rounded-lg",
            md: "h-11 px-6 text-sm rounded-xl",
            lg: "h-14 px-8 text-base rounded-2xl",
            icon: "h-11 w-11 p-0 rounded-xl flex items-center justify-center",
        };

        return (
            <motion.button
                ref={ref}
                type={type}
                whileTap={{ scale: 0.96 }}
                className={cn(
                    "relative inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-black disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed",
                    variants[variant],
                    sizes[size],
                    className
                )}
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
