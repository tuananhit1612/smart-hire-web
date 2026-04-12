import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Liên Hệ | SmartHire",
    description: "Liên hệ với đội ngũ SmartHire để được hỗ trợ và tư vấn.",
};

export default function ContactPage() {
    return (
        <div className="max-w-5xl mx-auto px-4 py-24 sm:py-32">
            <div className="text-center mb-16">
                <p className="text-[#22C55E] font-bold tracking-wider uppercase text-xs mb-3">Liên Hệ</p>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1C252E] dark:text-white mb-4">
                    Chúng tôi luôn sẵn sàng hỗ trợ
                </h1>
                <p className="text-lg text-[#637381] dark:text-[#919EAB] max-w-xl mx-auto">
                    Gửi câu hỏi hoặc phản hồi cho chúng tôi. Đội ngũ SmartHire sẽ phản hồi trong vòng 24 giờ.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Contact Form */}
                <div className="rounded-2xl p-8 bg-white dark:bg-[#1C252E] border border-[rgba(145,158,171,0.12)] dark:border-white/[0.06] shadow-sm">
                    <h2 className="text-xl font-bold text-[#1C252E] dark:text-white mb-6">Gửi tin nhắn</h2>
                    <form className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-[#1C252E] dark:text-white mb-1.5">Họ và tên</label>
                            <input type="text" placeholder="Nhập họ và tên" className="w-full px-4 py-3 rounded-xl border border-[rgba(145,158,171,0.32)] dark:border-white/10 bg-transparent text-[#1C252E] dark:text-white placeholder:text-[#919EAB] focus:outline-none focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/20 transition-all text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-[#1C252E] dark:text-white mb-1.5">Email</label>
                            <input type="email" placeholder="email@example.com" className="w-full px-4 py-3 rounded-xl border border-[rgba(145,158,171,0.32)] dark:border-white/10 bg-transparent text-[#1C252E] dark:text-white placeholder:text-[#919EAB] focus:outline-none focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/20 transition-all text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-[#1C252E] dark:text-white mb-1.5">Nội dung</label>
                            <textarea rows={5} placeholder="Viết nội dung tin nhắn..." className="w-full px-4 py-3 rounded-xl border border-[rgba(145,158,171,0.32)] dark:border-white/10 bg-transparent text-[#1C252E] dark:text-white placeholder:text-[#919EAB] focus:outline-none focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/20 transition-all text-sm resize-none" />
                        </div>
                        <button type="button" className="w-full py-3 rounded-xl bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-white font-semibold text-sm shadow-lg shadow-[#22C55E]/25 hover:shadow-[#22C55E]/40 hover:-translate-y-0.5 transition-all">
                            Gửi tin nhắn
                        </button>
                    </form>
                </div>

                {/* Info */}
                <div className="space-y-6">
                    {[
                        { title: "Email", value: "support@smarthire.vn", icon: "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" },
                        { title: "Điện thoại", value: "+84 (0)28 7300 xxxx", icon: "M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" },
                        { title: "Địa chỉ", value: "TP. Hồ Chí Minh, Việt Nam", icon: "M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" },
                    ].map((item) => (
                        <div key={item.title} className="rounded-2xl p-6 bg-white dark:bg-[#1C252E] border border-[rgba(145,158,171,0.12)] dark:border-white/[0.06] shadow-sm flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#22C55E]/10 to-[#10B981]/5 dark:from-[#22C55E]/20 dark:to-[#10B981]/10 flex items-center justify-center shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#22C55E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-[#1C252E] dark:text-white mb-1">{item.title}</h3>
                                <p className="text-sm text-[#637381] dark:text-[#919EAB]">{item.value}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
