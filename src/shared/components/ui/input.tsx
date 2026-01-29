"use client";

import * as React from "react";
import { cn } from "@/shared/utils/cn";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string;
    label?: string;
    leftIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, error, label, leftIcon, ...props }, ref) => {
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, error, label, startIcon, endIcon, ...props }, ref) => {
        return (
            <div className="w-full space-y-2">
                {label && (
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 dark:text-gray-300">
                        {label}
                    </label>
                )}
                <div className="relative">
                    {leftIcon && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10">
                            {leftIcon}
                    {startIcon && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                            {startIcon}
                        </div>
                    )}
                    <input
                        type={type}
                        className={cn(
                            "flex h-11 w-full rounded-xl border border-gray-200 bg-transparent px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-900/50 dark:ring-offset-zinc-950 dark:placeholder:text-gray-400 dark:text-white transition-all duration-200",
                            startIcon && "pl-10",
                            endIcon && "pr-10",
                            error && "border-red-500 focus-visible:ring-red-500",
                            leftIcon && "pl-11",
                            className
                        )}
                        ref={ref}
                        {...props}
                    />
                    {endIcon && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                            {endIcon}
                        </div>
                    )}
                </div>
                {error && (
                    <p className="text-xs font-medium text-red-500 flex items-center gap-1 mt-1">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);
Input.displayName = "Input";

export { Input };
