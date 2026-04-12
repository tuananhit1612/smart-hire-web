import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Blog | SmartHire",
    description: "Cập nhật tin tức, xu hướng tuyển dụng và mẹo nghề nghiệp từ SmartHire.",
};

export default function BlogPage() {
    return (
        <div className="max-w-5xl mx-auto px-4 py-24 sm:py-32">
            <div className="text-center mb-16">
                <p className="text-[#22C55E] font-bold tracking-wider uppercase text-xs mb-3">Blog</p>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1C252E] dark:text-white mb-4">
                    Tin tức & Kiến thức
                </h1>
                <p className="text-lg text-[#637381] dark:text-[#919EAB] max-w-xl mx-auto">
                    Cập nhật xu hướng tuyển dụng mới nhất, mẹo viết CV và phỏng vấn hiệu quả.
                </p>
            </div>

            {/* Coming Soon Card */}
            <div className="rounded-3xl p-12 sm:p-16 text-center bg-white dark:bg-[#1C252E] border border-[rgba(145,158,171,0.12)] dark:border-white/[0.06] shadow-sm">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#22C55E]/10 to-[#10B981]/5 dark:from-[#22C55E]/20 dark:to-[#10B981]/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-[#22C55E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-[#1C252E] dark:text-white mb-3">
                    Sắp ra mắt
                </h2>
                <p className="text-[#637381] dark:text-[#919EAB] max-w-md mx-auto mb-8">
                    Chúng tôi đang chuẩn bị những bài viết chất lượng. Hãy quay lại sau nhé!
                </p>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-white font-semibold text-sm shadow-lg shadow-[#22C55E]/25 hover:shadow-[#22C55E]/40 hover:-translate-y-0.5 transition-all"
                >
                    Về trang chủ
                </Link>
            </div>
        </div>
    );
}
