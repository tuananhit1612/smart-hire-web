"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";



export function SuccessStoriesSection() {
    return (
        <section className="w-full py-24 relative overflow-hidden">

            <div className="container mx-auto px-4 max-w-5xl relative z-10">
                <div className="flex flex-col items-center text-center mb-16">
                    <span className="text-[#22c55e] font-bold tracking-wider uppercase text-[11px] mb-3">
                        Câu chuyện Thành công
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#1C252E] dark:text-white">
                        Kết quả thực tế từ người dùng.
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                    {/* Decorative bulb behind cards */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#22c55e]/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

                    {/* Story Card 1 */}
                    <div className="bg-white dark:bg-[#1C252E] border border-[rgba(145,158,171,0.12)] rounded-3xl p-8 flex flex-col justify-between h-full hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)] hover:-translate-y-1 transition-all duration-300">
                        <div>
                            <div className="flex items-center gap-4 mb-6">
                                <Image src="/assets/images/home/tony-wobo-review-photo.webp" alt="Tuấn Anh" width={64} height={64} className="rounded-full object-cover w-16 h-16 border border-[rgba(145,158,171,0.12)]" />
                                <div>
                                    <h6 className="font-bold text-[#1C252E] dark:text-white text-lg">Tuấn Anh</h6>
                                    <span className="text-[#C4CDD5] text-sm font-medium">Product Manager</span>
                                </div>
                            </div>
                            <p className="text-[#637381] dark:text-[#C4CDD5] leading-relaxed mb-6 italic text-[15px]">
                                "Tôi từng dành 2 giờ mỗi tối để nộp đơn xin việc sau khi con trai đi ngủ. SmartHire đã trả lại cho tôi những buổi tối bên gia đình, trong khi vẫn liên tục tìm kiếm cơ hội."
                            </p>
                        </div>
                        <div className="mt-auto">
                            <span className="text-sm font-bold text-[#22c55e] block mb-4">
                                275 lượt ứng tuyển • 14 phỏng vấn
                            </span>
                            <Link href="#" className="inline-flex items-center text-sm font-bold text-[#1C252E] dark:text-white hover:text-[#22c55e] transition-colors">
                                Đọc toàn bộ câu chuyện <ArrowRight className="ml-2 w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Story Card 2 */}
                    <div className="bg-white dark:bg-[#1C252E] border border-[rgba(145,158,171,0.12)] rounded-3xl p-8 flex flex-col justify-between h-full hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-300">
                        <div>
                            <div className="flex items-center gap-4 mb-6">
                                <Image src="/assets/images/home/sarah-wobo-review-photo1.webp" alt="Mai Phương" width={64} height={64} className="rounded-full object-cover w-16 h-16 border border-[rgba(145,158,171,0.12)]" />
                                <div>
                                    <h6 className="font-bold text-[#1C252E] dark:text-white text-lg">Mai Phương</h6>
                                    <span className="text-[#C4CDD5] text-sm font-medium">Full-Stack Developer</span>
                                </div>
                            </div>
                            <p className="text-[#637381] dark:text-[#C4CDD5] leading-relaxed mb-6 italic text-[15px]">
                                "Mỗi tối tôi phải chọn: nộp đơn xin việc hoặc học thêm kỹ năng mới. SmartHire đã giải quyết việc ứng tuyển tự động, giúp tôi có 3 tháng để tập trung nâng cao chuyên môn."
                            </p>
                        </div>
                        <div className="mt-auto">
                            <span className="text-sm font-bold text-primary block mb-4">
                                452 lượt ứng tuyển • 19 phỏng vấn
                            </span>
                            <Link href="#" className="inline-flex items-center text-sm font-bold text-[#1C252E] dark:text-white hover:text-primary transition-colors">
                                Đọc toàn bộ câu chuyện <ArrowRight className="ml-2 w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
