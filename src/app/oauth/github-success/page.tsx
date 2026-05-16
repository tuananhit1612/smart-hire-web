"use client";

import { tokenStorage } from "@/features/auth/lib/token-storage";
import { useToastHelpers } from "@/shared/components/ui/toast";
import { useRouter,useSearchParams } from "next/navigation";
import { useEffect,useRef } from "react";
export default function GitHubOAuthCallbackSuccess() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const toast = useToastHelpers();
    const hasCalledAuth = useRef(false);

    useEffect(() => {
        if (hasCalledAuth.current) return;
        hasCalledAuth.current = true;

        const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ""));
        const accessToken = hashParams.get("access_token") ?? searchParams.get("access_token");
        const refreshToken = hashParams.get("refresh_token") ?? searchParams.get("refresh_token");
        const role = hashParams.get("role") ?? searchParams.get("role");
        const onboarded = (hashParams.get("onboarded") ?? searchParams.get("onboarded")) === "true";
        const returnedState = hashParams.get("state") ?? searchParams.get("state");
        const expectedState = sessionStorage.getItem("smarthire-github-oauth-state");

        if (expectedState && returnedState !== expectedState) {
             sessionStorage.removeItem("smarthire-github-oauth-state");
             toast.error("Lá»—i Ä‘Äƒng nháº­p", "PhiÃªn Ä‘Äƒng nháº­p GitHub khÃ´ng há»£p lá»‡.");
             router.replace("/login");
             return;
        }
        sessionStorage.removeItem("smarthire-github-oauth-state");

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
                 role: role ? role.toLowerCase() : null,
                 isNewUser: !onboarded,
                 exp: payloadContent.exp
             };

             const secure = window.location.protocol === "https:" ? "; Secure" : "";
             document.cookie = `smarthire-session=${encodeURIComponent(JSON.stringify(sessionCookie))}; path=/; max-age=604800; SameSite=Lax${secure}`;

             toast.success("Đăng nhập GitHub thành công!");

             if (role && role.toLowerCase() === "candidate" && !onboarded) {
                 window.location.href = "/dashboard/onboarding";
             } else {
                 window.location.href = "/dashboard";
             }
             
        } catch (_err: unknown) {
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
