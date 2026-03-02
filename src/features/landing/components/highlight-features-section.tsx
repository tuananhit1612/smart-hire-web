"use client";

import { motion } from "framer-motion";
import { Layers, Search, CheckCheck } from "lucide-react";


const featureItems = [
    {
        icon: Layers,
        title: "Lịch Sử Tuyển Dụng",
        description: "Xem và quản lý các công việc bạn đã ứng tuyển.",
        imageSrc: "/assets/images/home/job_preferences.webp",
        imageAlt: "Job Search Histories page",
    },
    {
        icon: Search,
        title: "Chi Tiết Việc Làm",
        description: "Xem toàn bộ chi tiết và yêu cầu.",
        imageSrc: "/assets/images/home/dashboard.webp",
        imageAlt: "Matched Job Details page",
    },
    {
        icon: CheckCheck,
        title: "Chi Tiết Đơn Ứng Tuyển",
        description: "Xem lại các đơn ứng tuyển và phản hồi đã gửi.",
        imageSrc: "/assets/images/home/dashboard.webp",
        imageAlt: "AI Job Application Details page",
    },
];

export function HighlightFeaturesSection() {
    return (
        <section className="w-full py-24 relative overflow-hidden">

            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-[#1C252E] dark:text-white mb-4">
                        Chi tiết Việc Làm
                    </h2>
                </motion.div>

                {/* Feature Cards - Horizontal Scroll */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {featureItems.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.12,
                            }}
                            className="group relative bg-white dark:bg-[#1C252E] border border-[rgba(145,158,171,0.12)] rounded-2xl overflow-hidden hover:border-[rgba(145,158,171,0.32)] hover:shadow-lg transition-all duration-300"
                        >
                            {/* Card Header */}
                            <div className="p-6 pb-4 flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-emerald-500 flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
                                    <item.icon className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-[#1C252E] dark:text-white group-hover:text-[#22c55e] transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-[#637381] dark:text-[#C4CDD5] mt-1">
                                        {item.description}
                                    </p>
                                </div>
                            </div>

                            {/* Card Image */}
                            <div className="px-6 pb-6">
                                <div className="relative rounded-xl overflow-hidden border border-[rgba(145,158,171,0.12)] shadow-sm">
                                    {/* Browser dots decoration */}
                                    <div className="absolute top-0 left-0 right-0 h-7 bg-[rgba(145,158,171,0.08)] backdrop-blur-sm border-b border-[rgba(145,158,171,0.12)] flex items-center px-3 gap-1.5 z-10">
                                        <div className="w-2 h-2 rounded-full bg-red-400/60" />
                                        <div className="w-2 h-2 rounded-full bg-yellow-400/60" />
                                        <div className="w-2 h-2 rounded-full bg-green-400/60" />
                                    </div>
                                    <img
                                        src={item.imageSrc}
                                        alt={item.imageAlt}
                                        className="w-full h-auto object-cover pt-7 transition-transform duration-500 group-hover:scale-[1.02]"
                                        loading="lazy"
                                    />
                                    {/* Subtle gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
