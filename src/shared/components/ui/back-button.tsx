"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

interface BackButtonProps {
    /** Fallback href if there is no browser history */
    fallbackHref?: string;
    /** Custom label, defaults to "Quay lại" */
    label?: string;
    className?: string;
}

export function BackButton({
    fallbackHref = "/dashboard",
    label = "Quay lại",
    className = "",
}: BackButtonProps) {
    const router = useRouter();

    const handleBack = () => {
        if (window.history.length > 1) {
            router.back();
        } else {
            router.push(fallbackHref);
        }
    };

    return (
        <motion.button
            onClick={handleBack}
            whileHover={{ x: -3 }}
            whileTap={{ scale: 0.96 }}
            className={`inline-flex items-center gap-1.5 text-sm font-medium text-[#637381] dark:text-[#919EAB] hover:text-[#1C252E] dark:hover:text-white transition-colors cursor-pointer ${className}`}
        >
            <ArrowLeft className="w-4 h-4" />
            {label}
        </motion.button>
    );
}
