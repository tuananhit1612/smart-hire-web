"use client";

/**
 * VerifyEmailContent — Reads ?token= from the URL and calls
 * the verify-email API. Shows success or error feedback.
 *
 * Must be wrapped in <Suspense> because it uses useSearchParams().
 */

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Loader2, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { authApi } from "../api/auth-api";
import { isApiError } from "@/shared/lib/api-error";

type VerifyState = "loading" | "success" | "error" | "no-token";

export function VerifyEmailContent() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const [state, setState] = useState<VerifyState>(token ? "loading" : "no-token");
    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {
        if (!token) return;

        let isMounted = true;
        (async () => {
            try {
                await authApi.verifyEmail(token);
                if (isMounted) setState("success");
            } catch (error) {
                if (isMounted) {
                    setState("error");
                    setErrorMessage(
                        isApiError(error)
                            ? error.message
                            : "Đã xảy ra lỗi khi xác thực email. Vui lòng thử lại."
                    );
                }
            }
        })();

        return () => { isMounted = false; };
    }, [token]);

    // ── No Token ─────────────────────────────────────
    if (state === "no-token") {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-8 text-center space-y-5"
            >
                <div className="w-16 h-16 bg-amber-50 dark:bg-amber-900/20 rounded-full flex items-center justify-center">
                    <Mail className="w-8 h-8 text-amber-500" />
                </div>
                <div className="space-y-2">
                    <h3 className="text-xl font-bold text-[#1C252E] dark:text-white">
                        Liên kết không hợp lệ
                    </h3>
                    <p className="text-sm text-[#637381] dark:text-[#C4CDD5] max-w-xs mx-auto">
                        Không tìm thấy mã xác thực. Vui lòng kiểm tra lại email và nhấn vào đúng liên kết.
                    </p>
                </div>
                <Link href="/login" className="block w-full max-w-xs">
                    <Button
                        variant="primary"
                        className="w-full h-11 rounded-xl bg-[#1C252E] dark:bg-white text-white dark:text-[#1C252E]"
                    >
                        Đi đến đăng nhập
                    </Button>
                </Link>
            </motion.div>
        );
    }

    // ── Loading ───────────────────────────────────────
    if (state === "loading") {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center space-y-5"
            >
                <div className="relative w-16 h-16 flex items-center justify-center">
                    <div className="absolute inset-0 bg-[#22C55E]/10 rounded-full animate-ping" />
                    <Loader2 className="w-8 h-8 text-[#22C55E] animate-spin relative z-10" />
                </div>
                <div className="space-y-2">
                    <h3 className="text-xl font-bold text-[#1C252E] dark:text-white">
                        Đang xác thực...
                    </h3>
                    <p className="text-sm text-[#637381] dark:text-[#C4CDD5]">
                        Vui lòng đợi trong giây lát
                    </p>
                </div>
            </motion.div>
        );
    }

    // ── Success ───────────────────────────────────────
    if (state === "success") {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="flex flex-col items-center justify-center py-8 text-center space-y-6"
            >
                <div className="relative w-20 h-20 flex items-center justify-center">
                    <div className="absolute inset-0 bg-[#22C55E]/15 blur-xl rounded-full animate-pulse" />
                    <CheckCircle2 className="w-14 h-14 text-[#22C55E] relative z-10" />
                </div>
                <div className="space-y-2">
                    <h3 className="text-xl font-bold text-[#1C252E] dark:text-white">
                        Xác thực thành công!
                    </h3>
                    <p className="text-sm text-[#637381] dark:text-[#C4CDD5] max-w-xs mx-auto">
                        Email của bạn đã được xác thực. Bây giờ bạn có thể đăng nhập và sử dụng đầy đủ tính năng.
                    </p>
                </div>
                <Link href="/login" className="block w-full max-w-xs">
                    <Button
                        variant="primary"
                        className="w-full h-12 text-base font-semibold rounded-xl bg-[#1C252E] dark:bg-white text-white dark:text-[#1C252E] hover:bg-[#1C252E]/90 dark:hover:bg-white/90 transition-all"
                    >
                        Đăng nhập ngay
                        <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                </Link>
            </motion.div>
        );
    }

    // ── Error ─────────────────────────────────────────
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-8 text-center space-y-6"
        >
            <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                <XCircle className="w-8 h-8 text-red-500" />
            </div>
            <div className="space-y-2">
                <h3 className="text-xl font-bold text-[#1C252E] dark:text-white">
                    Xác thực thất bại
                </h3>
                <p className="text-sm text-[#637381] dark:text-[#C4CDD5] max-w-xs mx-auto">
                    {errorMessage || "Liên kết xác thực đã hết hạn hoặc không hợp lệ."}
                </p>
            </div>
            <div className="w-full max-w-xs space-y-3">
                <Link href="/register" className="block w-full">
                    <Button
                        variant="outline"
                        className="w-full h-11 rounded-xl border-[rgba(145,158,171,0.2)] dark:border-[rgba(145,158,171,0.12)] text-[#1C252E] dark:text-white hover:bg-[rgba(145,158,171,0.08)]"
                    >
                        Đăng ký lại
                    </Button>
                </Link>
                <Link href="/login" className="block w-full">
                    <Button
                        variant="ghost"
                        className="w-full text-[#919EAB] hover:text-[#1C252E] dark:hover:text-white"
                    >
                        Đi đến đăng nhập
                    </Button>
                </Link>
            </div>
        </motion.div>
    );
}
