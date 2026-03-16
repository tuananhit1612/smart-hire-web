"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/shared/components/ui/button";



export function JobPreferencesSection() {
    return (
        <section className="w-full py-24 relative overflow-hidden">

            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
                    {/* Left Side: Image Map */}
                    <div className="w-full lg:w-1/2 relative">
                        {/* Decorative background blur */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#22c55e]/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

                        <div className="relative rounded-2xl overflow-hidden border border-gray-700/50 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] bg-[#1C252E]">
                            <div className="absolute top-0 left-0 right-0 h-10 bg-slate-800 border-b border-gray-700/40 flex items-center px-4 gap-2 z-10">
                                <div className="w-2.5 h-2.5 rounded-full bg-slate-600"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-slate-600"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-slate-600"></div>
                            </div>
                            <Image
                                src="/assets/images/home/job_preferences.webp"
                                alt="SmartHire Job Preferences Dashboard Preview"
                                width={800}
                                height={533}
                                className="w-full h-auto object-cover pt-10"
                                priority={false}
                            />
                            {/* Subtle Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 to-transparent pointer-events-none"></div>
                        </div>
                    </div>

                    {/* Right Side: Text */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center">
                        <span className="text-[#22c55e] font-bold tracking-wider uppercase text-[11px] mb-3">
                            Tuyển dụng theo cách của bạn
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                            Tiêu chí <span className="text-[#22c55e]">Tuyển dụng</span>.
                        </h2>
                        <div className="space-y-6">
                            <p className="text-lg md:text-xl text-gray-400 leading-relaxed font-medium">
                                Với công nghệ AI của SmartHire, bạn là người nắm quyền kiểm soát.
                            </p>
                            <p className="text-lg text-gray-500 leading-relaxed">
                                Định nghĩa chi tiết chân dung ứng viên lý tưởng của bạn bằng các thông số cụ thể. Công cụ AI của chúng tôi sẽ quét và mang đến những hồ sơ phù hợp nhất với văn hóa và yêu cầu của doanh nghiệp từ hàng nghìn nguồn dữ liệu.
                            </p>
                        </div>
                        <div className="mt-10">
                            <Button size="lg" variant="outline" className="h-12 text-base font-semibold border-gray-600 text-gray-300 hover:text-white hover:border-[#22c55e]" asChild>
                                <Link href="/features/ai-matching">
                                    Tìm hiểu cơ chế AI <ArrowRight className="ml-2 w-4 h-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
