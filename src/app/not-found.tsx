import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9FAFB] dark:bg-[#161c24] px-4">
            {/* Animated 404 */}
            <div className="relative mb-8">
                <h1 className="text-[160px] sm:text-[200px] font-black text-transparent bg-clip-text bg-gradient-to-br from-[#22C55E] to-[#10B981] leading-none select-none opacity-20">
                    404
                </h1>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#22C55E] to-[#16A34A] flex items-center justify-center shadow-2xl shadow-[#22C55E]/30">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-12 h-12 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Text */}
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1C252E] dark:text-white mb-3 text-center">
                Trang không tồn tại
            </h2>
            <p className="text-[#637381] dark:text-[#919EAB] text-base sm:text-lg max-w-md text-center mb-8 leading-relaxed">
                Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
                <Link
                    href="/"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-white font-semibold text-sm shadow-lg shadow-[#22C55E]/25 hover:shadow-[#22C55E]/40 hover:-translate-y-0.5 transition-all"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Về trang chủ
                </Link>
                <Link
                    href="/dashboard"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl border border-[rgba(145,158,171,0.32)] dark:border-white/20 text-[#1C252E] dark:text-white font-semibold text-sm hover:bg-[rgba(145,158,171,0.08)] dark:hover:bg-white/[0.06] transition-all"
                >
                    Dashboard
                </Link>
            </div>
        </div>
    );
}
