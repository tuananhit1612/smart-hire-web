import { Metadata } from "next";
import { AuthLayout } from "@/features/auth/components/auth-layout";
import { RegisterRoleSelection } from "@/features/auth/components/register-role-selection";

export const metadata: Metadata = {
    title: "Đăng ký | SmartHire - Nền tảng tuyển dụng thông minh",
    description: "Tạo tài khoản SmartHire để tìm việc hoặc tuyển dụng nhân tài.",
};

export default function RegisterPage() {
    return (
        <AuthLayout>
            <RegisterRoleSelection />
        </AuthLayout>
    );
}
