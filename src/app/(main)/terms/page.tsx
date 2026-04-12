import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Điều Khoản Sử Dụng | SmartHire",
    description: "Điều khoản và điều kiện sử dụng nền tảng SmartHire.",
};

export default function TermsPage() {
    return (
        <div className="max-w-3xl mx-auto px-4 py-24 sm:py-32">
            <div className="mb-12">
                <p className="text-[#22C55E] font-bold tracking-wider uppercase text-xs mb-3">Pháp Lý</p>
                <h1 className="text-4xl font-extrabold text-[#1C252E] dark:text-white mb-4">
                    Điều Khoản Sử Dụng
                </h1>
                <p className="text-sm text-[#919EAB]">Cập nhật lần cuối: 12/04/2026</p>
            </div>

            <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
                <section>
                    <h2 className="text-xl font-bold text-[#1C252E] dark:text-white mb-3">1. Giới thiệu</h2>
                    <p className="text-[#637381] dark:text-[#919EAB] leading-relaxed">
                        Chào mừng bạn đến với SmartHire. Bằng việc sử dụng nền tảng của chúng tôi, bạn đồng ý tuân thủ các điều khoản và điều kiện sau đây. Vui lòng đọc kỹ trước khi sử dụng dịch vụ.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-[#1C252E] dark:text-white mb-3">2. Tài khoản người dùng</h2>
                    <p className="text-[#637381] dark:text-[#919EAB] leading-relaxed">
                        Bạn chịu trách nhiệm bảo mật thông tin đăng nhập và tất cả hoạt động xảy ra dưới tài khoản của mình. Thông tin đăng ký phải chính xác và cập nhật.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-[#1C252E] dark:text-white mb-3">3. Quyền sở hữu trí tuệ</h2>
                    <p className="text-[#637381] dark:text-[#919EAB] leading-relaxed">
                        Nội dung bạn tải lên (CV, cover letter, v.v.) thuộc quyền sở hữu của bạn. SmartHire chỉ sử dụng để cung cấp dịch vụ và cải thiện trải nghiệm người dùng theo chính sách bảo mật.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-[#1C252E] dark:text-white mb-3">4. Giới hạn trách nhiệm</h2>
                    <p className="text-[#637381] dark:text-[#919EAB] leading-relaxed">
                        SmartHire không đảm bảo kết quả tuyển dụng cụ thể. Các đề xuất AI mang tính tham khảo và không thay thế cho quyết định chuyên môn.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-[#1C252E] dark:text-white mb-3">5. Liên hệ</h2>
                    <p className="text-[#637381] dark:text-[#919EAB] leading-relaxed">
                        Nếu bạn có câu hỏi về điều khoản này, vui lòng liên hệ qua email: <span className="text-[#22C55E] font-semibold">legal@smarthire.vn</span>
                    </p>
                </section>
            </div>
        </div>
    );
}
