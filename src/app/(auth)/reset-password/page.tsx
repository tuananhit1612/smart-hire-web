"use client";

import { Suspense } from "react";
import { useSearchParams, redirect } from "next/navigation";
import { AuthLayout } from "@/features/auth/components/auth-layout";
import { ResetPasswordForm } from "@/features/auth/components/reset-password-form";

function ResetPasswordContent() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    if (!token) {
        redirect("/forgot-password");
    }

    return (
        <AuthLayout heading="Bảo mật tài khoản" subheading="Tạo mật khẩu mới để bảo vệ tài khoản của bạn">
            <ResetPasswordForm token={token} />
        </AuthLayout>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
            </div>
        }>
            <ResetPasswordContent />
        </Suspense>
    );
}
