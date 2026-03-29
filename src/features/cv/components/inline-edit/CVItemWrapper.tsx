"use client";

import React from "react";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface CVItemWrapperProps {
    children: React.ReactNode;
    onRemove?: () => void;
    editable?: boolean;
    className?: string;
}

export function CVItemWrapper({ children, onRemove, editable = true, className }: CVItemWrapperProps) {
    if (!editable || !onRemove) return <>{children}</>;

    return (
        <div className={cn("relative group/cvitem transition-all duration-200", className)}>
            {children}
            <button
                type="button"
                onClick={(e) => { 
                    e.preventDefault(); 
                    e.stopPropagation(); 
                    onRemove(); 
                }}
                className="absolute -right-2 -top-2 p-1 bg-red-500 text-white rounded-md opacity-0 group-hover/cvitem:opacity-100 transition-opacity z-[99] scale-75 hover:scale-90 shadow-sm"
                title="Xóa mục này"
            >
                <Trash2 className="w-3.5 h-3.5" />
            </button>
        </div>
    );
}
