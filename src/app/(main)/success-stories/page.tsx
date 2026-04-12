import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Câu Chuyện Thành Công | SmartHire",
    description: "Câu chuyện từ những ứng viên đã tìm được công việc mơ ước qua SmartHire.",
};

export default function SuccessStoriesPage() {
    return (
        <div className="max-w-5xl mx-auto px-4 py-24 sm:py-32">
            <div className="text-center mb-16">
                <p className="text-[#22C55E] font-bold tracking-wider uppercase text-xs mb-3">Câu Chuyện Thành Công</p>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1C252E] dark:text-white mb-4">
                    Họ đã thành công cùng SmartHire
                </h1>
                <p className="text-lg text-[#637381] dark:text-[#919EAB] max-w-xl mx-auto">
                    Những câu chuyện truyền cảm hứng từ ứng viên và doanh nghiệp sử dụng SmartHire.
                </p>
            </div>

            <div className="rounded-3xl p-12 sm:p-16 text-center bg-white dark:bg-[#1C252E] border border-[rgba(145,158,171,0.12)] dark:border-white/[0.06] shadow-sm">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#22C55E]/10 to-[#10B981]/5 dark:from-[#22C55E]/20 dark:to-[#10B981]/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-[#22C55E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-[#1C252E] dark:text-white mb-3">Sắp ra mắt</h2>
                <p className="text-[#637381] dark:text-[#919EAB] max-w-md mx-auto mb-8">
                    Chúng tôi đang thu thập những câu chuyện tuyệt vời. Hãy quay lại sau nhé!
                </p>
                <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-white font-semibold text-sm shadow-lg shadow-[#22C55E]/25 hover:shadow-[#22C55E]/40 hover:-translate-y-0.5 transition-all">
                    Về trang chủ
                </Link>
            </div>
        </div>
    );
}
