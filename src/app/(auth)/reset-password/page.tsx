"use client";

import { useSearchParams, redirect } from "next/navigation";
import { AuthLayout } from "@/features/auth/components/auth-layout";
import { ResetPasswordForm } from "@/features/auth/components/reset-password-form";

export default function ResetPasswordPage() {
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
