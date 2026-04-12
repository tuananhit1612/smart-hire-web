import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Chính Sách Bảo Mật | SmartHire",
    description: "Chính sách bảo mật và quyền riêng tư dữ liệu của SmartHire.",
};

export default function PrivacyPage() {
    return (
        <div className="max-w-3xl mx-auto px-4 py-24 sm:py-32">
            <div className="mb-12">
                <p className="text-[#22C55E] font-bold tracking-wider uppercase text-xs mb-3">Pháp Lý</p>
                <h1 className="text-4xl font-extrabold text-[#1C252E] dark:text-white mb-4">
                    Chính Sách Bảo Mật
                </h1>
                <p className="text-sm text-[#919EAB]">Cập nhật lần cuối: 12/04/2026</p>
            </div>

            <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
                <section>
                    <h2 className="text-xl font-bold text-[#1C252E] dark:text-white mb-3">1. Thu thập dữ liệu</h2>
                    <p className="text-[#637381] dark:text-[#919EAB] leading-relaxed">
                        SmartHire thu thập thông tin cá nhân khi bạn đăng ký tài khoản, tải CV, hoặc sử dụng các tính năng AI. Thông tin bao gồm: họ tên, email, số điện thoại, kinh nghiệm làm việc và học vấn.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-[#1C252E] dark:text-white mb-3">2. Sử dụng dữ liệu</h2>
                    <p className="text-[#637381] dark:text-[#919EAB] leading-relaxed">
                        Dữ liệu được sử dụng để: cung cấp dịch vụ tuyển dụng, cải thiện đề xuất AI, gửi thông báo việc làm phù hợp và nâng cao trải nghiệm người dùng.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-[#1C252E] dark:text-white mb-3">3. Bảo vệ dữ liệu</h2>
                    <p className="text-[#637381] dark:text-[#919EAB] leading-relaxed">
                        Chúng tôi áp dụng mã hóa SSL/TLS, xác thực JWT và các biện pháp bảo mật tiêu chuẩn ngành để bảo vệ dữ liệu của bạn. Dữ liệu không bao giờ được bán cho bên thứ ba.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-[#1C252E] dark:text-white mb-3">4. Quyền của bạn</h2>
                    <p className="text-[#637381] dark:text-[#919EAB] leading-relaxed">
                        Bạn có quyền: truy cập, chỉnh sửa, xóa dữ liệu cá nhân; rút lại đồng ý sử dụng dữ liệu; và yêu cầu xuất dữ liệu của mình bất cứ lúc nào.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-[#1C252E] dark:text-white mb-3">5. Cookie</h2>
                    <p className="text-[#637381] dark:text-[#919EAB] leading-relaxed">
                        SmartHire sử dụng cookie cần thiết cho chức năng đăng nhập và phiên làm việc. Không sử dụng cookie theo dõi quảng cáo.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-[#1C252E] dark:text-white mb-3">6. Liên hệ</h2>
                    <p className="text-[#637381] dark:text-[#919EAB] leading-relaxed">
                        Mọi câu hỏi về chính sách bảo mật, vui lòng liên hệ: <span className="text-[#22C55E] font-semibold">privacy@smarthire.vn</span>
                    </p>
                </section>
            </div>
        </div>
    );
}
