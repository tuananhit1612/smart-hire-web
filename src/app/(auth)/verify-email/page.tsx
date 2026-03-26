"use client";

import { Suspense } from "react";
import { VerifyEmailContent } from "@/features/auth/components/verify-email-content";
import { AuthLayout } from "@/features/auth/components/auth-layout";

function VerifyEmailFallback() {
    return (
        <div className="flex flex-col items-center justify-center py-12 text-center space-y-4 animate-pulse">
            <div className="w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded-full" />
            <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded-full w-48" />
            <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded-full w-64" />
        </div>
    );
}

export default function VerifyEmailPage() {
    return (
        <AuthLayout heading="Xác thực email" subheading="Hoàn tất bước cuối để kích hoạt tài khoản">
            <Suspense fallback={<VerifyEmailFallback />}>
                <VerifyEmailContent />
            </Suspense>
        </AuthLayout>
    );
}
