"use client";

import { ResetPasswordForm } from "@/features/auth/components/reset-password-form";
import { redirect,useSearchParams } from "next/navigation";

export default function ResetPasswordContent() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    if (!token) {
        redirect("/forgot-password");
    }

    return <ResetPasswordForm token={token} />;
}
