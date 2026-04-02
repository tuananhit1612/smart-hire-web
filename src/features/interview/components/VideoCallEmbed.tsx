"use client";

import { AlertCircle, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";

interface VideoCallEmbedProps {
    meetingUrl: string;
}

export function VideoCallEmbed({ meetingUrl }: VideoCallEmbedProps) {
    const isGoogleMeet = meetingUrl.includes("meet.google.com");

    if (isGoogleMeet) {
        return (
            <div className="flex flex-col items-center justify-center h-full bg-slate-50 dark:bg-[#141A21] p-6 text-center rounded-3xl border border-[rgba(145,158,171,0.12)]">
                <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-3xl flex items-center justify-center mb-6">
                    <img src="https://www.gstatic.com/meet/app_icon_192.png" alt="Google Meet" className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-[#1C252E] dark:text-white mb-4">Tham gia qua Google Meet</h3>
                <p className="text-[#637381] dark:text-[#919EAB] mb-8 max-w-md">
                    Google Meet không hỗ trợ nhúng trực tiếp trên ứng dụng. Vui lòng bấm nút bên dưới để mở cuộc gọi trong tab mới.
                </p>
                <Link href={meetingUrl} target="_blank" rel="noopener noreferrer">
                    <Button className="rounded-full px-8 py-6 text-lg bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 flex gap-2 items-center transition-all hover:scale-105">
                        Mở Google Meet <ExternalLink className="w-5 h-5" />
                    </Button>
                </Link>
            </div>
        );
    }

    if (!meetingUrl) {
         return (
            <div className="flex flex-col items-center justify-center h-full bg-slate-50 dark:bg-[#141A21] p-6 text-center text-red-500">
                <AlertCircle className="w-12 h-12 mb-4" />
                <p>Không tìm thấy đường dẫn phòng họp.</p>
            </div>
        );
    }

    // Embed for Jitsi, BBB, or others
    return (
        <div className="w-full h-full rounded-2xl overflow-hidden border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] shadow-2xl bg-[#1C252E]">
            <iframe
                src={meetingUrl}
                allow="camera; microphone; display-capture; autoplay; clipboard-write"
                className="w-full h-full border-none"
                style={{ minHeight: "600px" }}
            />
        </div>
    );
}
