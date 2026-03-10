"use client";

import { motion } from "framer-motion";
import Image from "next/image";



export function FeaturesGridSection() {
    return (
        <section className="w-full py-24 relative overflow-hidden">

            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    {/* Left Side: Text */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center">
                        <span className="text-[#22c55e] font-bold tracking-wider uppercase text-[11px] mb-3">
                            Hồ sơ Kỹ thuật số
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                            SmartHire <span className="text-gray-500">Persona</span>
                        </h2>
                        <div className="space-y-6">
                            <p className="text-lg md:text-xl text-gray-400 leading-relaxed font-medium">
                                SmartHire Persona là đại diện kỹ thuật số của bạn trên thị trường việc làm.
                            </p>
                            <p className="text-lg text-gray-500 leading-relaxed">
                                Nó giúp chúng tôi hiểu rõ nhu cầu của bạn, tìm kiếm những cơ hội phù hợp nhất và tự động tạo ra những câu trả lời xuất sắc cho các câu hỏi ứng tuyển, tối đa hóa cơ hội thành công của bạn. Giống như có một chuyên viên tuyển dụng cá nhân làm việc không mệt mỏi vì bạn.
                            </p>
                        </div>
                    </div>

                    {/* Right Side: Persona Card Mockup */}
                    <div className="w-full lg:w-1/2 relative">
                        {/* Decorative background blur */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#22c55e]/20 rounded-full blur-[100px] -z-10 pointer-events-none" />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                            className="relative rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-gray-700/50 bg-[#1C252E] max-w-md mx-auto"
                        >
                            <div className="p-8">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-800 shrink-0 border border-gray-700">
                                        <Image src="/assets/images/home/tony-wobo-review-photo.webp" alt="Persona Avatar" width={64} height={64} className="object-cover w-full h-full" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white leading-none mb-1">Tuấn Anh</h3>
                                        <p className="text-sm font-medium text-gray-400 mb-2">4 năm kinh nghiệm • Fullstack Developer</p>
                                        <div className="flex gap-2 flex-wrap">
                                            <span className="px-2 py-0.5 bg-[#1C252E] text-[#22c55e] border border-[#22c55e]/30 text-[10px] font-bold uppercase rounded">React</span>
                                            <span className="px-2 py-0.5 bg-emerald-900/30 text-emerald-400 border border-emerald-800/50 text-[10px] font-bold uppercase rounded">Node.js</span>
                                            <span className="px-2 py-0.5 bg-purple-900/30 text-purple-400 border border-purple-800/50 text-[10px] font-bold uppercase rounded">Startup</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-5">
                                    <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Tóm tắt</h4>
                                    <p className="text-sm text-gray-300 leading-relaxed font-medium">
                                        Tìm kiếm vai trò <span className="font-bold text-white">Tech Lead</span> trong các <span className="font-bold text-white">Startup công nghệ</span> ở mảng <span className="font-bold text-white">Fintech</span> làm việc tại <span className="font-bold text-white">Hà Nội</span>.
                                    </p>
                                </div>

                                <div>
                                    <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Chi tiết hơn</h4>
                                    <p className="text-[13px] text-gray-400 leading-relaxed">
                                        Đã từng dẫn dắt đội ngũ nhỏ ra mắt thành công 2 sản phẩm MVP cốt lõi. Ưa thích môi trường startup nhịp độ nhanh và có khả năng giải quyết các bài toán kiến trúc hệ thống phức tạp...
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

