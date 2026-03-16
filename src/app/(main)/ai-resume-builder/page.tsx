import { AIResumeBuilderPage } from "@/features/landing/components/ai-resume-builder-page";
import { ParticleBackground } from "@/shared/components/effects/ParticleBackground";

export const metadata = {
    title: "Trình Tạo CV Chuẩn ATS Miễn Phí | SmartHire",
    description: "Tạo một CV chất lượng thân thiện với hệ thống ATS chỉ trong 2 phút. Bắt đầu miễn phí - có nhiều cơ hội phỏng vấn hơn ngay hôm nay!",
};

export default function AIResumeBuilderRoute() {
    return (
        <div className="relative min-h-screen font-body overflow-x-hidden">
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <ParticleBackground showRings={true} />
            </div>

            <main className="flex flex-col items-center w-full relative z-10">
                <AIResumeBuilderPage />
            </main>
        </div>
    );
}
