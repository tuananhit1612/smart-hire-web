import type { Metadata } from "next";
import { AuthLayout } from "@/features/auth/components/auth-layout";
import { ResetPasswordForm } from "@/features/auth/components/reset-password-form";

export const metadata: Metadata = {
    title: "Đặt lại mật khẩu | SmartHire",
    description: "Tạo mật khẩu mới cho tài khoản SmartHire của bạn.",
};

export default function ResetPasswordPage() {
    return (
        <AuthLayout heading="Bảo mật tài khoản" subheading="Tạo mật khẩu mới để bảo vệ tài khoản của bạn">
            <ResetPasswordForm />
        </AuthLayout>
    );
}
