import type { Metadata } from "next";
import { AuthLayout } from "@/features/auth/components/auth-layout";
import { Suspense } from "react";
import { ResetPasswordPageContent } from "@/features/auth/components/reset-password-page-content";

export const metadata: Metadata = {
    title: "Đặt lại mật khẩu | SmartHire",
    description: "Tạo mật khẩu mới cho tài khoản của bạn.",
};

export default function ResetPasswordPage() {
    return (
        <AuthLayout heading="Bảo mật tài khoản" subheading="Tạo mật khẩu mới để bảo vệ tài khoản của bạn">
            <Suspense fallback={<div className="py-12 text-center text-[#637381]">Đang tải...</div>}>
                <ResetPasswordPageContent />
            </Suspense>
        </AuthLayout>
    );
}
