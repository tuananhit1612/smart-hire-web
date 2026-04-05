"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UploadCVRedirect() {
    const router = useRouter();
    useEffect(() => {
        router.replace("/cv-builder");
    }, [router]);

    return (
        <div className="flex items-center justify-center h-screen bg-slate-50 dark:bg-[#141A21]">
            <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-slate-500 dark:text-gray-400 font-medium text-sm">
                    Đang chuyển hướng...
                </p>
            </div>
        </div>
    );
}
