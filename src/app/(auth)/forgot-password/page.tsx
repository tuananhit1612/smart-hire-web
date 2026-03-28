import type { Metadata } from "next";
import { AuthLayout } from "@/features/auth/components/auth-layout";
import { Suspense } from "react";
import { ForgotPasswordPageContent } from "@/features/auth/components/forgot-password-page-content";

export const metadata: Metadata = {
    title: "Quên mật khẩu | SmartHire",
    description: "Đặt lại mật khẩu tài khoản SmartHire của bạn.",
};

export default function ForgotPasswordPage() {
    return (
        <AuthLayout heading="Khôi phục tài khoản" subheading="Chúng tôi sẽ giúp bạn lấy lại quyền truy cập">
            <Suspense fallback={<div className="py-12 text-center text-[#637381]">Đang tải...</div>}>
                <ForgotPasswordPageContent />
            </Suspense>
        </AuthLayout>
    );
}
