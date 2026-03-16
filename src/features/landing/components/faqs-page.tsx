"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ChevronDown, Briefcase, FileText, User } from "lucide-react";

// ============================================
// FAQs PAGE — SmartHire Design System
// Categorized FAQ items translated from Wobo
// ============================================

type FaqCategory = "jobs" | "resume" | "general";

interface FaqItem {
    id: string;
    question: string;
    answer: string;
    category: FaqCategory;
}

const faqsData: FaqItem[] = [
    // --- Category: Apply & Find Jobs ---
    {
        id: "q1",
        category: "jobs",
        question: "Khi nào SmartHire sẽ bắt đầu ứng tuyển các công việc thay tôi?",
        answer: "SmartHire bắt đầu ứng tuyển việc làm sau khi SmartHire Persona của bạn được thiết lập, thường mất khoảng 1-2 ngày. Sau đó, SmartHire sẽ tìm kiếm các công việc phù hợp với hồ sơ của bạn. Nếu bạn đang sử dụng gói trả phí, việc ứng tuyển thường bắt đầu trong khoảng 3-4 ngày sau khi bạn đăng ký và hoàn thành hồ sơ. Hãy nhớ rằng khả năng ứng tuyển việc làm chỉ khả dụng đối với thành viên có trả phí."
    },
    {
        id: "q2",
        category: "jobs",
        question: "Tôi có thể tránh ứng tuyển vào một số công ty nhất định không?",
        answer: "Có, bạn hoàn toàn có thể liệt kê công ty vào danh sách đen (blacklist)! Truy cập phần \"Tài khoản\" trong Bảng điều khiển (Dashboard) của bạn và thêm bất kỳ công ty nào bạn muốn loại trừ."
    },
    {
        id: "q3",
        category: "jobs",
        question: "SmartHire sử dụng tính năng \"Ứng tuyển nhanh\" (Easy Apply) hay nộp đơn trực tiếp trên website công ty?",
        answer: "SmartHire nộp đơn ứng tuyển trực tiếp trên website của các công ty. Chúng tôi tập trung vào chất lượng hơn là số lượng và tránh các tùy chọn \"Easy Apply\" để đảm bảo hồ sơ ứng tuyển của bạn nhận được sự chú ý xứng đáng."
    },
    {
        id: "q4",
        category: "jobs",
        question: "Làm thế nào SmartHire xử lý các «bẫy» AI trong bản mô tả công việc (JD)?",
        answer: "Hệ thống AI tiên tiến của SmartHire phân tích kỹ lưỡng các bản mô tả công việc, bao gồm cả các bẫy AI tiềm năng, để đảm bảo đơn ứng tuyển của bạn cung cấp những câu trả lời chuyên nghiệp, chính xác và bám sát yêu cầu."
    },
    {
        id: "q5",
        category: "jobs",
        question: "SmartHire có tự động ghép tôi với các công việc ngẫu nhiên không?",
        answer: "SmartHire là chuyên viên tuyển dụng AI cá nhân của bạn. Chúng tôi không ghép bạn ngẫu nhiên với các công việc. Chúng tôi quét toàn bộ thị trường việc làm hàng ngày, tìm kiếm các cơ hội tốt nhất phù hợp với mục tiêu và sở thích độc đáo của bạn."
    },
    {
        id: "q6",
        category: "jobs",
        question: "Tôi có thể gỡ bỏ các công việc ra khỏi danh sách phù hợp của mình không?",
        answer: "Chắc chắn rồi! Bạn có toàn quyền kiểm soát danh sách việc làm đẩy vào chờ xử lý của mình. Bạn có thể hủy bỏ những lựa chọn mà bạn không muốn chúng tôi ứng tuyển giúp."
    },
    {
        id: "q7",
        category: "jobs",
        question: "Tại sao tôi lại thấy những công việc có vẻ không liên quan tới mình?",
        answer: "Trí tuệ nhân tạo của SmartHire không ngừng học hỏi. Các gợi ý ban đầu có thể có vài sai lệch nhỏ, bạn hoàn toàn có thể xóa các công việc đó khỏi hàng chờ. SmartHire cũng tự động lọc ra các công việc ít phù hợp hơn trong quá trình sàng lọc."
    },
    {
        id: "q8",
        category: "jobs",
        question: "Sẽ mất bao lâu để SmartHire giúp tôi tìm được việc?",
        answer: "SmartHire sẽ bắt đầu rà soát thị trường xin việc ngay khi hồ sơ Persona của bạn hoàn chỉnh. Mặc dù chúng tôi hướng đến việc giúp bạn càng nhanh càng tốt, việc tìm kiếm công việc phù hợp có thể mất vài tuần tùy thuộc vào thị trường lao động và trình độ chuyên môn của bạn. Thông thường, bạn sẽ bắt đầu nhận được thông tin phản hồi sau khoảng vài tuần."
    },
    {
        id: "q9",
        category: "jobs",
        question: "SmartHire có thể tìm việc nếu tôi chưa điền đầy đủ hồ sơ không?",
        answer: "Không. SmartHire cần tất cả các thông tin cần thiết trong hồ sơ của bạn trước khi nó có thể bắt đầu tìm kiếm việc làm. Hãy đảm bảo điền đầy đủ các thông tin cá nhân như: kinh nghiệm, kỹ năng và kiểu công ty/ vị trí bạn hy vọng. Càng rõ ràng, tỷ lệ đậu càng cao."
    },
    {
        id: "q10",
        category: "jobs",
        question: "Làm thế nào để tăng số lượng đơn ứng tuyển mà SmartHire gửi đi thay tôi?",
        answer: "Để tăng số lượng ứng tuyển hàng tuần, bạn có thể nâng cấp tài khoản của bạn lên bản Plus, Pro hoặc bản cao cấp Premium. Gói Plus đưa tới 20 đơn / tuần. Bản Premium cung cấp hơn 40 đơn / tuần kèm các đánh giá chuyên sâu để bạn hoàn thiện sơ yếu lý lịch cá nhân."
    },

    // --- Category: Resume & cover letter ---
    {
        id: "q11",
        category: "resume",
        question: "SmartHire có tạo thư xin việc (cover letter) duy nhất cho mỗi đơn ứng tuyển không?",
        answer: "SmartHire cung cấp tính năng mạnh mẽ giúp thiết kế một cover letter hoàn toàn được cá nhân hóa cho từng cơ hội việc làm. Với bản cao cấp, AI hiểu cách viết phù hợp cùng kinh nghiệm được lưu tại SmartHire Persona, đưa vào cover letter những gì xuất sắc nhất."
    },
    {
        id: "q12",
        category: "resume",
        question: "CV chuẩn ATS là gì?",
        answer: "CV ATS (Applicant Tracking System) là một định dạng sơ yếu lý lịch được thiết kế để phần mềm lọc đơn của phía nhà tuyển dụng có thể dễ dàng đọc và đánh giá. Các công cụ thiết kế của SmartHire luôn xuất định dạng qua chuẩn ATS tăng khả năng trúng qua bước này thay vì tạch bằng thuật toán của nhà tuyển dụng."
    },
    {
        id: "q13",
        category: "resume",
        question: "Trình tạo CV bằng AI của SmartHire hoạt động như thế nào?",
        answer: "Trình tạo lấy thông tin đã đưa sẵn, kết hợp yêu cầu nhà tuyển dụng nếu có và tạo CV hoàn hảo qua hệ thống ATS có bố cục thiết kế thu hút. Bạn chỉ mất vài cú click để tự có phiên bản xuất sẵn ra máy tính của mình."
    },
    {
        id: "q14",
        category: "resume",
        question: "Tôi có thể tải xuống CV của mình ở định dạng ATS không?",
        answer: "Có. Các hệ thống xuất form của SmartHire đa phần là tạo chuẩn định dạng hỗ trợ ATS, nhằm tránh việc bộ máy AI tự động lọc đơn rác của bên đầu ra (doanh nghiệp) bỏ qua CV của bạn do cấu trúc thiết kế làm lỗi các block văn bản."
    },
    {
        id: "q15",
        category: "resume",
        question: "Trình tạo Thư xin việc (Cover Letter) bằng AI là gì?",
        answer: "Là hệ thống hỗ trợ từ công nghệ Ngôn ngữ lớn để có thể thay bạn viết ra giọng điệu truyền tải qua Text giúp lá thư hấp dẫn như một vị thạc sỹ văn làm thay, bám sát các ý kiến từ nhà tuyển dụng mà không tạo cảm giác cẩu thả từ bạn."
    },
    {
        id: "q16",
        category: "resume",
        question: "Có giới hạn về số lượng CV và thư xin việc tôi có thể tạo không?",
        answer: "Tất nhiên, các tài khoản miễn phí tạo được số lượng rất giới hạn dùng chung nguồn cấp, bạn bắt buộc up-tier các gói đóng phí để tăng các file này cũng như tải về vô hạn."
    },
    {
        id: "q17",
        category: "resume",
        question: "Tại sao CV chuẩn ATS lại quan trọng đối với các đơn ứng tuyển?",
        answer: "Hệ thống Applicant Tracking Systems là một bộ lọc CV đầu tiên không qua con người. Rất nhiều bạn dùng những công cụ đồ hoạ quá đẹp mắt (Photoshop, Illustrator...) để chế CV tuy nhiên do chuẩn font-rendering khiến BOT đọc của bên kia chỉ thấy toàn ký tự trắng. Vượt ATS sẽ được AI cho vào túi qua vòng gửi xe, sau đồ sẽ được những Human HR thật sự chú ý thẩm định."
    },

    // --- Category: General ---
    {
        id: "q18",
        category: "general",
        question: "SmartHire Persona là gì và tại sao nó lại quan trọng?",
        answer: "SmartHire Persona là ảnh đại diện kỹ thuật số của bạn, lưu trữ sở thích, kỹ năng và mục tiêu để thay mặt bạn lọc ra hàng trăm ngàn Data để tìm ra những mô tả công việc phù hợp với hình tượng ấy. Chức năng này tốn 2 3 ngày để xử lý tuỳ quy mô profile của bạn nhưng nó quyết định cốt lõi trải nghiệm dùng công cụ."
    },
    {
        id: "q19",
        category: "general",
        question: "Tôi có thể tự ứng tuyển các công việc trong khi SmartHire đang hỗ trợ không?",
        answer: "Chắc chắn rồi. Hệ thống SmartHire là giải pháp thay bạn mở rộng phễu tìm việc còn thời gian của bạn thì dùng cho việc tối hưu kỹ năng chuyên môn cũng như tự submit tới những Target lớn mà bản thân ao ước không thông qua SmartHire mà mình muốn tự Build hoàn toàn."
    },
    {
        id: "q20",
        category: "general",
        question: "SmartHire là gì và nó giúp ích thế nào cho việc ứng tuyển?",
        answer: "SmartHire là dự án hệ sinh thái nhằm giúp thu hẹp gánh nặng giữa các cuộc rượt đuổi nộp đơn vô căn cứ với các trang tìm việc như LinkedIn mà thay bằng một bộ cỗ máy thay bạn giải các bài test sơ kiểm cũng như nộp CV đúng như nguyện vọng. AI này sẽ tốn chút vài tuần lúc đầu học thói quen, sau đó cứ vài phút nó lại mang tới 1 vài CV giúp giảm tỉ suất trắng Profile mà nộp vài ngàn CV tốn sức."
    },
    {
        id: "q21",
        category: "general",
        question: "Dữ liệu cá nhân của tôi có an toàn với SmartHire không?",
        answer: "Tất nhiên, Thông tin cá nhân hoàn toàn bảo vệ dưới luật GDPR nghiêm khắc và chuẩn quốc tế."
    },
    {
        id: "q22",
        category: "general",
        question: "SmartHire thu thập những loại dữ liệu nào?",
        answer: "Chúng tôi chỉ lấy các metadata liên quan việc tối ưu SmartHire Persona như CV, email liên lạc, các tên file nén chứng chỉ để phục vụ mục tiêu auto tìm việc của Quý vị."
    },
    {
        id: "q23",
        category: "general",
        question: "Tôi có thể xóa tài khoản và dữ liệu SmartHire của mình không?",
        answer: "Bạn được phép dùng chức năng yêu cầu De-auth để xoá quyền sử dụng tài khoản bên thứ 3 và clear cache toàn bộ History Application."
    },
    {
        id: "q24",
        category: "general",
        question: "SmartHire có tuân thủ các quy định về quyền riêng tư dữ liệu như GDPR không?",
        answer: "Vâng, Chúng tôi bảo vệ mọi cơ chế theo quy ước về California Consumer Privacy Act và General Data Protection Regulation."
    },
    {
        id: "q25",
        category: "general",
        question: "Làm cách nào để liên hệ với nhóm hỗ trợ của SmartHire?",
        answer: "Tung tin báo khẩn cấp vào support@smarthire.co để liên hệ ngay với CS hoặc tạo ticket trên giao diện support Live qua tài khoản premium."
    }
];

export function FaqsPage() {
    const [activeCategory, setActiveCategory] = useState<FaqCategory>("jobs");
    const [openIndex, setOpenIndex] = useState<string | null>(null);

    // Lọc danh sách câu hỏi theo tab
    const filteredFaqs = faqsData.filter((faq) => faq.category === activeCategory);

    // Animations cho text hero
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    };

    return (
        <div className="w-full relative min-h-screen py-24 pb-32">
            <div className="container mx-auto px-4">

                {/* 1. Hero Title */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-center mb-16"
                >
                    <motion.div variants={itemVariants}>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1C252E] dark:text-white mb-6">
                            <span className="block mt-1 bg-gradient-to-r from-[#818CF8] via-[#C084FC] to-[#FFAB00] bg-clip-text text-transparent">
                                Chúng tôi có thể giúp gì cho bạn?
                            </span>
                        </h1>
                    </motion.div>
                </motion.div>

                {/* 2. Categories Tabs */}
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-center items-center gap-4 mb-16">
                    <button
                        onClick={() => { setActiveCategory("jobs"); setOpenIndex(null); }}
                        className={`flex items-center gap-3 px-6 py-4 rounded-2xl border transition-all duration-300 ${activeCategory === "jobs"
                            ? "bg-white dark:bg-[#1C252E] border-[#22c55e] shadow-lg shadow-green-500/10 scale-105"
                            : "bg-white/50 dark:bg-[#1C252E]/50 border-[rgba(145,158,171,0.12)] hover:border-[#22c55e]/50 text-[#637381] dark:text-[#919EAB]"
                            }`}
                    >
                        <div className={`p-2 rounded-full ${activeCategory === "jobs" ? "bg-green-100 dark:bg-green-900/30 text-[#22c55e]" : "bg-gray-100 dark:bg-gray-800"}`}>
                            <Briefcase className="w-5 h-5" />
                        </div>
                        <span className={`font-semibold ${activeCategory === "jobs" ? "text-[#1C252E] dark:text-white" : ""}`}>
                            Ứng tuyển & Tìm việc
                        </span>
                    </button>

                    <button
                        onClick={() => { setActiveCategory("resume"); setOpenIndex(null); }}
                        className={`flex items-center gap-3 px-6 py-4 rounded-2xl border transition-all duration-300 ${activeCategory === "resume"
                            ? "bg-white dark:bg-[#1C252E] border-[#22c55e] shadow-lg shadow-green-500/10 scale-105"
                            : "bg-white/50 dark:bg-[#1C252E]/50 border-[rgba(145,158,171,0.12)] hover:border-[#22c55e]/50 text-[#637381] dark:text-[#919EAB]"
                            }`}
                    >
                        <div className={`p-2 rounded-full ${activeCategory === "resume" ? "bg-[#22c55e]/15 dark:bg-[#22c55e]/20 text-[#22c55e]" : "bg-gray-100 dark:bg-gray-800"}`}>
                            <FileText className="w-5 h-5" />
                        </div>
                        <span className={`font-semibold ${activeCategory === "resume" ? "text-[#1C252E] dark:text-white" : ""}`}>
                            CV & Thư xin việc
                        </span>
                    </button>

                    <button
                        onClick={() => { setActiveCategory("general"); setOpenIndex(null); }}
                        className={`flex items-center gap-3 px-6 py-4 rounded-2xl border transition-all duration-300 ${activeCategory === "general"
                            ? "bg-white dark:bg-[#1C252E] border-[#22c55e] shadow-lg shadow-green-500/10 scale-105"
                            : "bg-white/50 dark:bg-[#1C252E]/50 border-[rgba(145,158,171,0.12)] hover:border-[#22c55e]/50 text-[#637381] dark:text-[#919EAB]"
                            }`}
                    >
                        <div className={`p-2 rounded-full ${activeCategory === "general" ? "bg-yellow-100 dark:bg-yellow-900/30 text-[#FFAB00]" : "bg-gray-100 dark:bg-gray-800"}`}>
                            <User className="w-5 h-5" />
                        </div>
                        <span className={`font-semibold ${activeCategory === "general" ? "text-[#1C252E] dark:text-white" : ""}`}>
                            Chung
                        </span>
                    </button>
                </div>

                {/* 3. FAQ Accordion List */}
                <div className="max-w-3xl mx-auto space-y-3 relative min-h-[400px]">
                    <h3 className="text-2xl font-bold text-[#1C252E] dark:text-white mb-6 text-center">
                        Câu hỏi thường gặp
                    </h3>

                    <AnimatePresence mode="popLayout">
                        {filteredFaqs.map((faq, index) => (
                            <motion.div
                                key={faq.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                            >
                                <div className="bg-white dark:bg-[#1C252E] border border-[rgba(145,158,171,0.12)] rounded-2xl overflow-hidden transition-all hover:border-[rgba(145,158,171,0.32)] group">
                                    <button
                                        onClick={() => setOpenIndex(openIndex === faq.id ? null : faq.id)}
                                        className="w-full flex items-center justify-between p-5 text-left"
                                    >
                                        <span className="text-base font-semibold text-[#1C252E] dark:text-white pr-4">
                                            {faq.question}
                                        </span>
                                        <ChevronDown
                                            className={`w-5 h-5 text-[#637381] dark:text-[#919EAB] flex-shrink-0 transition-transform duration-300 ${openIndex === faq.id ? "rotate-180" : ""}`}
                                        />
                                    </button>
                                    <AnimatePresence>
                                        {openIndex === faq.id && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                            >
                                                <div className="px-5 pb-5 text-sm text-[#637381] dark:text-[#C4CDD5] leading-relaxed">
                                                    {faq.answer}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

            </div>
        </div>
    );
}

