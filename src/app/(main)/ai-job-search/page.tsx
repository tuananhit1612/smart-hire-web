import { AIJobSearchPage } from "@/features/landing/components/ai-job-search-page";
import { ParticleBackground } from "@/shared/components/effects/ParticleBackground";
import { Header } from "@/shared/components/layout/Header";

export const metadata = {
    title: "AI Tìm Kiếm Việc Làm | SmartHire",
    description: "Tiết kiệm thời gian tìm việc với công cụ AI thông minh. SmartHire giúp bạn ghép nối việc làm, tạo CV ATS-friendly và viết thư xin việc cá nhân hóa.",
};

export default function AIJobSearchRoute() {
    return (
        <div className="relative min-h-screen font-body overflow-x-hidden pt-24 md:pt-28">
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <ParticleBackground showRings={true} />
            </div>
            <Header />

            <main className="flex flex-col items-center w-full relative z-10">
                <AIJobSearchPage />
            </main>
        </div>
    );
}
