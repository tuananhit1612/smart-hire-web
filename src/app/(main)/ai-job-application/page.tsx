import { AIJobApplicationPage } from "@/features/landing/components/ai-job-application-page";
import { ParticleBackground } from "@/shared/components/effects/ParticleBackground";

export const metadata = {
    title: "Ứng Tuyển Việc Làm Bằng AI | SmartHire",
    description: "Bot ứng tuyển tự động bằng AI giúp bạn nộp đơn vào các vị trí tốt nhất một cách nhanh chóng và cá nhân hóa.",
};

export default function AIJobApplicationRoute() {
    return (
        <div className="relative min-h-screen font-body overflow-x-hidden">
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <ParticleBackground showRings={true} />
            </div>

            <main className="flex flex-col items-center w-full relative z-10">
                <AIJobApplicationPage />
            </main>
        </div>
    );
}
