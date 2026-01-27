import { Metadata } from "next";
import { AuthLayout } from "@/features/auth/components/auth-layout";
import { LoginForm } from "@/features/auth/components/login-form";

export const metadata: Metadata = {
    title: "Đăng nhập | SmartHire",
    description: "Đăng nhập vào hệ thống SmartHire để tìm việc hoặc tuyển dụng.",
};

export default function LoginPage() {
    return (
        <AuthLayout>
            <LoginForm />
        </AuthLayout>
    );
}
