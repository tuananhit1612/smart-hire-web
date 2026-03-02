import { AICoverLetterGeneratorPage } from "@/features/landing/components/ai-cover-letter-generator-page";
import { ParticleBackground } from "@/shared/components/effects/ParticleBackground";

export const metadata = {
    title: "Trình Tạo Thư Xin Việc Bằng AI | SmartHire",
    description: "Tạo một bức thư xin việc (Cover Letter) cá nhân hoá chỉ trong 30 giây. Trình tạo miễn phí bằng công nghệ AI ghép nối kỹ năng của bạn với mô tả công việc (JD).",
};

export default function AICoverLetterRoute() {
    return (
        <div className="relative min-h-screen font-body overflow-x-hidden">
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <ParticleBackground showRings={true} />
            </div>

            <main className="flex flex-col items-center w-full relative z-10">
                <AICoverLetterGeneratorPage />
            </main>
        </div>
    );
}
