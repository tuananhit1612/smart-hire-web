"use client";

import { useEffect, useRef, useState } from "react";
import { Mic, MicOff, Video, VideoOff, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { motion } from "framer-motion";

interface DeviceTestProps {
    onComplete: () => void;
}

export function DeviceTest({ onComplete }: DeviceTestProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [error, setError] = useState<string>("");
    const [micEnabled, setMicEnabled] = useState(true);
    const [camEnabled, setCamEnabled] = useState(true);

    useEffect(() => {
        let currentStream: MediaStream | null = null;
        async function setupDevices() {
            try {
                const s = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                currentStream = s;
                setStream(s);
                if (videoRef.current) {
                    videoRef.current.srcObject = s;
                }
            } catch (err: any) {
                setError(err.name === "NotAllowedError" ? "Vui lòng cấp quyền truy cập Camera và Microphone." : "Không tìm thấy Camera hoặc Microphone.");
            }
        }
        setupDevices();

        return () => {
            currentStream?.getTracks().forEach((track) => track.stop());
        };
    }, []);

    const toggleMic = () => {
        if (stream) {
            stream.getAudioTracks().forEach((track) => {
                track.enabled = !micEnabled;
            });
            setMicEnabled(!micEnabled);
        }
    };

    const toggleCam = () => {
        if (stream) {
            stream.getVideoTracks().forEach((track) => {
                track.enabled = !camEnabled;
            });
            setCamEnabled(!camEnabled);
        }
    };

    const handleJoin = () => {
        stream?.getTracks().forEach((track) => track.stop());
        onComplete();
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center bg-white dark:bg-[#1C252E] rounded-3xl p-8 shadow-2xl max-w-2xl w-full border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08]"
        >
            <h2 className="text-2xl font-bold text-[#1C252E] dark:text-white mb-6">Kiểm tra Thiết bị</h2>

            <div className="relative w-full max-w-md aspect-video bg-black rounded-2xl overflow-hidden shadow-inner mb-8 border border-white/10 flex items-center justify-center">
                {error ? (
                    <div className="flex flex-col items-center text-red-400 gap-3 text-center px-4">
                        <AlertCircle className="w-10 h-10" />
                        <p>{error}</p>
                    </div>
                ) : (
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className={`w-full h-full object-cover transition-opacity duration-300 ${!camEnabled ? "opacity-0" : "opacity-100"}`}
                    />
                )}
                
                {!camEnabled && !error && (
                    <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                        <VideoOff className="w-12 h-12" />
                    </div>
                )}
            </div>

            <div className="flex gap-4 mb-8">
                <Button
                    onClick={toggleMic}
                    variant={micEnabled ? "primary" : "danger"}
                    className={`rounded-full w-14 h-14 p-0 flex items-center justify-center transition-all ${
                        micEnabled ? "bg-[#1C252E] hover:bg-[#212B36] dark:bg-slate-800 dark:hover:bg-slate-700 text-white" : ""
                    }`}
                >
                    {micEnabled ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6 text-white" />}
                </Button>
                <Button
                    onClick={toggleCam}
                    variant={camEnabled ? "primary" : "danger"}
                    className={`rounded-full w-14 h-14 p-0 flex items-center justify-center transition-all ${
                        camEnabled ? "bg-[#1C252E] hover:bg-[#212B36] dark:bg-slate-800 dark:hover:bg-slate-700 text-white" : ""
                    }`}
                >
                    {camEnabled ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6 text-white" />}
                </Button>
            </div>

            <Button
                onClick={handleJoin}
                disabled={!!error}
                className="w-full max-w-xs rounded-full py-6 text-lg font-semibold bg-[#22c55e] hover:bg-[#16a34a] hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[#22c55e]/30 flex gap-2 items-center justify-center text-white"
            >
                <CheckCircle2 className="w-5 h-5" />
                Vào phòng phỏng vấn
            </Button>
        </motion.div>
    );
}
