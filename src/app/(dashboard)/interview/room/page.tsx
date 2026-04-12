"use client";

import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { BackButton } from "@/shared/components/ui/back-button";
import { DeviceTest } from "@/features/interview/components/DeviceTest";
import { VideoCallEmbed } from "@/features/interview/components/VideoCallEmbed";
import { useMyInterviews } from "@/features/interview/hooks/useInterviewService";

function InterviewRoomContent() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    
    const { data: interviews, isLoading } = useMyInterviews();
    const [isDeviceTested, setIsDeviceTested] = useState(false);

    if (isLoading) return <div className="p-8 text-center text-slate-400">Đang tải...</div>;
    
    const interview = interviews?.find((i) => i.id === Number(id));
    
    if (!interview) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 z-10 relative">
                <h2 className="text-xl font-bold dark:text-white">Không tìm thấy phòng phỏng vấn</h2>
                <BackButton fallbackHref="/interview" />
            </div>
        );
    }

    return (
        <div className="flex flex-col h-[calc(100vh-120px)] w-full max-w-5xl mx-auto z-10 relative">
            <div className="flex items-center gap-4 mb-2 mt-4 px-4 sm:px-0">
                <BackButton fallbackHref="/interview" />
                <div>
                    <h1 className="text-2xl font-bold text-[#1C252E] dark:text-white">
                        Phòng: {interview.roomName}
                    </h1>
                    <p className="text-sm text-slate-500 font-medium">Vòng: {interview.round || 1}</p>
                </div>
            </div>

            <div className="flex-1 w-full flex flex-col pt-4 px-4 sm:px-0">
                {!isDeviceTested ? (
                    <DeviceTest onComplete={() => setIsDeviceTested(true)} />
                ) : (
                    <VideoCallEmbed meetingUrl={interview.meetingUrl || ""} />
                )}
            </div>
        </div>
    );
}

export default function InterviewRoomPage() {
    return (
        <Suspense fallback={<div className="p-8 text-center text-slate-400 z-10 relative">Đang khởi tạo phòng họp...</div>}>
            <InterviewRoomContent />
        </Suspense>
    );
}
