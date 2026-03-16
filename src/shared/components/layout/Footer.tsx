"use client";

import Link from "next/link";
import { Layers, Globe2, Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
    const footerLinks = {
        "Tính năng": [
            { label: "AI Resume Builder", href: "/cv-builder" },
            { label: "AI Cover Letter", href: "/cover-letter" },
            { label: "AI Tìm Việc", href: "/jobs" },
            { label: "ATS Checker", href: "/ats-checker" }
        ],
        "SmartHire": [
            { label: "Về Chúng Tôi", href: "/about" },
            { label: "Liên Hệ", href: "/contact" },
            { label: "Tuyển Dụng", href: "/careers" }
        ],
        "Pháp lý": [
            { label: "Điều Khoản", href: "/terms" },
            { label: "Chính Sách Bảo Mật", href: "/privacy" }
        ]
    };

    return (
        <footer className="w-full border-t border-[rgba(145,158,171,0.2)] bg-white dark:bg-[#1C252E] pt-16 pb-8 relative z-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                    <div className="col-span-2 md:col-span-1 pr-8">
                        <Link href="/" className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-600 to-green-500 flex items-center justify-center shadow-lg shadow-green-500/25">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <span className="text-xl font-bold text-[#1C252E] dark:text-white font-sans">SmartHire</span>
                        </Link>
                        <p className="text-sm text-[#637381] dark:text-[#919EAB] leading-relaxed">
                            SmartHire: Kết nối nhân tài với cơ hội việc làm hoàn hảo thông qua công nghệ AI thông minh.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold text-[#1C252E] dark:text-white mb-4">Sản Phẩm</h4>
                        <ul className="space-y-2 text-sm text-[#637381] dark:text-[#919EAB]">
                            {footerLinks["Tính năng"].map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="hover:text-[#1C252E] dark:hover:text-white transition-colors">{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-[#1C252E] dark:text-white mb-4">Công Ty</h4>
                        <ul className="space-y-2 text-sm text-[#637381] dark:text-[#919EAB]">
                            {footerLinks["SmartHire"].map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="hover:text-[#1C252E] dark:hover:text-white transition-colors">{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-[#1C252E] dark:text-white mb-4">Pháp Lý</h4>
                        <ul className="space-y-2 text-sm text-[#637381] dark:text-[#919EAB]">
                            {footerLinks["Pháp lý"].map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="hover:text-[#1C252E] dark:hover:text-white transition-colors">{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="pt-8 border-t border-[rgba(145,158,171,0.2)] flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-[#637381] dark:text-[#919EAB] font-medium">&copy; 2026 SmartHire. All rights reserved.</p>
                    <div className="flex items-center gap-4">
                        <Link href="#" className="text-[#637381] dark:text-[#919EAB] hover:text-[#1C252E] dark:hover:text-white transition-colors">
                            <Twitter className="w-5 h-5" />
                        </Link>
                        <Link href="#" className="text-[#637381] dark:text-[#919EAB] hover:text-[#1C252E] dark:hover:text-white transition-colors">
                            <Linkedin className="w-5 h-5" />
                        </Link>
                        <Link href="#" className="text-[#637381] dark:text-[#919EAB] hover:text-[#1C252E] dark:hover:text-white transition-colors">
                            <Github className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
