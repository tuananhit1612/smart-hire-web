"use client";

import { useSearchParams, redirect } from "next/navigation";
import { ResetPasswordForm } from "@/features/auth/components/reset-password-form";

export default function ResetPasswordContent() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    if (!token) {
        redirect("/forgot-password");
    }

    return <ResetPasswordForm token={token} />;
}
