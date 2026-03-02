import type { Metadata } from "next";
import { AuthLayout } from "@/features/auth/components/auth-layout";
import { ForgotPasswordForm } from "@/features/auth/components/forgot-password-form";

export const metadata: Metadata = {
    title: "Quên mật khẩu | SmartHire",
    description: "Đặt lại mật khẩu tài khoản SmartHire của bạn.",
};

export default function ForgotPasswordPage() {
    return (
        <AuthLayout heading="Khôi phục tài khoản" subheading="Chúng tôi sẽ giúp bạn lấy lại quyền truy cập">
            <ForgotPasswordForm />
        </AuthLayout>
    );
}
