"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useToastHelpers } from "@/shared/components/ui/toast";
import { tokenStorage } from "@/features/auth/lib/token-storage";
export default function GitHubOAuthCallbackSuccess() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const toast = useToastHelpers();
    const hasCalledAuth = useRef(false);

    useEffect(() => {
        if (hasCalledAuth.current) return;
        hasCalledAuth.current = true;

        const accessToken = searchParams.get("access_token");
        const refreshToken = searchParams.get("refresh_token");
        const role = searchParams.get("role");
        const onboarded = searchParams.get("onboarded") === "true";

        if (!accessToken || !refreshToken) {
             toast.error("Lỗi đăng nhập", "Không nhận được token xác thực.");
             router.replace("/login");
             return;
        }

        try {
             tokenStorage.setTokens(accessToken, refreshToken);

             // Create Next.js App Router Session Cookie so middleware detects it immediately
             const payloadStr = atob(accessToken.split(".")[1]);
             const payloadContent = JSON.parse(payloadStr);

             // Note: User profile is partially recreated from token payload for the cookie.
             // Usually, useAuth hook fetches the full profile later via /me
             const sessionCookie = {
                 user: {
                     role: role ? role.toLowerCase() : null,
                     isOnboarded: onboarded
                 },
                 accessToken: accessToken,
                 refreshToken: refreshToken,
                 exp: payloadContent.exp
             };
             
             document.cookie = `smarthire-session=${encodeURIComponent(JSON.stringify(sessionCookie))}; path=/; max-age=604800; SameSite=Lax`;

             toast.success("Đăng nhập GitHub thành công!");
             
             if (role && role.toLowerCase() === "candidate" && !onboarded) {
                 window.location.href = "/dashboard/onboarding";
             } else {
                 window.location.href = "/dashboard";
             }
             
        } catch (err: any) {
             toast.error("Đăng nhập thất bại", "Lỗi xử lý phiên bản đăng nhập.");
             router.replace("/login");
        }

    }, [searchParams, router, toast]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-[#161c24]">
            <div className="p-8 text-center bg-white dark:bg-[#212b36] shadow-xl rounded-2xl flex flex-col items-center">
                <svg className="w-12 h-12 text-[#22c55e] mb-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <h2 className="text-xl font-bold dark:text-white mb-2">Đăng nhập thành công!</h2>
                <p className="text-gray-500 dark:text-gray-400">Đang chuyển hướng vào hệ thống...</p>
            </div>
        </div>
    );
}
