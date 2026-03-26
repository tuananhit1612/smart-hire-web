"use client";

import { Suspense } from "react";
import { useSearchParams, redirect } from "next/navigation";
import { AuthLayout } from "@/features/auth/components/auth-layout";
import { ResetPasswordForm } from "@/features/auth/components/reset-password-form";

function ResetPasswordFallback() {
    return (
        <div className="flex flex-col items-center justify-center py-12 text-center space-y-4 animate-pulse">
            <div className="w-14 h-14 bg-slate-200 dark:bg-slate-700 rounded-2xl" />
            <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-full w-48" />
            <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded-full w-64" />
            <div className="h-12 bg-slate-100 dark:bg-slate-800 rounded-xl w-full mt-4" />
            <div className="h-12 bg-slate-100 dark:bg-slate-800 rounded-xl w-full" />
            <div className="h-12 bg-slate-200 dark:bg-slate-700 rounded-xl w-full" />
        </div>
    );
}

/** Inner component that reads searchParams (requires Suspense wrapper) */
function ResetPasswordContent() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    if (!token) {
        redirect("/forgot-password");
    }

    return <ResetPasswordForm token={token} />;
}

export default function ResetPasswordPage() {
    return (
        <AuthLayout heading="Bảo mật tài khoản" subheading="Tạo mật khẩu mới để bảo vệ tài khoản của bạn">
            <Suspense fallback={<ResetPasswordFallback />}>
                <ResetPasswordContent />
            </Suspense>
        </AuthLayout>
    );
}
