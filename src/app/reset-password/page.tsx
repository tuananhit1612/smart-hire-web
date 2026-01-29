import type { Metadata } from "next";
import { AuthLayout } from "@/features/auth/components/auth-layout";
import { ResetPasswordForm } from "@/features/auth/components/reset-password-form";

export const metadata: Metadata = {
    title: "Reset Credentials | SmartHire Ultra",
    description: "Establish new security credentials for your SmartHire Ultra account.",
};

export default function ResetPasswordPage() {
    return (
        <AuthLayout>
            <ResetPasswordForm />
        </AuthLayout>
    );
}
