import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Tuyển Dụng | SmartHire",
    description: "Gia nhập đội ngũ SmartHire — xây dựng tương lai tuyển dụng thông minh.",
};

export default function CareersPage() {
    return (
        <div className="max-w-5xl mx-auto px-4 py-24 sm:py-32">
            <div className="text-center mb-16">
                <p className="text-[#22C55E] font-bold tracking-wider uppercase text-xs mb-3">Tuyển Dụng</p>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1C252E] dark:text-white mb-4">
                    Gia nhập SmartHire
                </h1>
                <p className="text-lg text-[#637381] dark:text-[#919EAB] max-w-xl mx-auto">
                    Cùng chúng tôi xây dựng nền tảng tuyển dụng AI hàng đầu Việt Nam.
                </p>
            </div>

            <div className="rounded-3xl p-12 sm:p-16 text-center bg-white dark:bg-[#1C252E] border border-[rgba(145,158,171,0.12)] dark:border-white/[0.06] shadow-sm">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#22C55E]/10 to-[#10B981]/5 dark:from-[#22C55E]/20 dark:to-[#10B981]/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-[#22C55E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-[#1C252E] dark:text-white mb-3">Hiện chưa có vị trí mở</h2>
                <p className="text-[#637381] dark:text-[#919EAB] max-w-md mx-auto mb-8">
                    Chúng tôi luôn tìm kiếm nhân tài. Gửi hồ sơ tới <span className="text-[#22C55E] font-semibold">careers@smarthire.vn</span> để chúng tôi liên hệ khi có cơ hội phù hợp.
                </p>
                <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-white font-semibold text-sm shadow-lg shadow-[#22C55E]/25 hover:shadow-[#22C55E]/40 hover:-translate-y-0.5 transition-all">
                    Về trang chủ
                </Link>
            </div>
        </div>
    );
}
