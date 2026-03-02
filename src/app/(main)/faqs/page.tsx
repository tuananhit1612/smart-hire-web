import { FaqsPage } from "@/features/landing/components/faqs-page";
import { ParticleBackground } from "@/shared/components/effects/ParticleBackground";

export const metadata = {
    title: "Câu hỏi thường gặp (FAQs) | SmartHire",
    description: "Tìm kiếm các câu trả lời và thông tin hữu ích về nền tảng hỗ trợ xin việc qua AI SmartHire.",
};

export default function FaqsRoute() {
    return (
        <div className="relative min-h-screen font-body overflow-x-hidden">
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <ParticleBackground showRings={true} />
            </div>

            <main className="flex flex-col items-center w-full relative z-10">
                <FaqsPage />
            </main>
        </div>
    );
}
