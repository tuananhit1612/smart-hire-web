"use client";

import { redirect,useSearchParams } from "next/navigation";
import { ResetPasswordForm } from "./reset-password-form";

export function ResetPasswordPageContent() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    if (!token) {
        redirect("/forgot-password");
    }

    return <ResetPasswordForm token={token} />;
}
