"use client";

import Link from "next/link";
import { Layers, Globe2 } from "lucide-react";

export function Footer() {
    return (
        <footer className="w-full border-t border-sky-100 dark:border-sky-900 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm pt-20 pb-12 relative z-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
                    <div className="col-span-2 md:col-span-1 pr-8">
                        <div className="flex items-center gap-2.5 mb-6">
                            <div className="bg-gradient-to-tr from-blue-600 to-sky-500 h-8 w-8 rounded-full flex items-center justify-center shadow-md">
                                <Layers className="h-4 w-4 text-white" />
                            </div>
                            <span className="text-xl font-bold text-slate-900 dark:text-white font-sans">SmartHire</span>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                            Kết nối nhân tài với cơ hội thông qua công nghệ AI thông minh, nhân văn và minh bạch.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-6">Sản Phẩm</h4>
                        <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                            <li><Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Tính Năng</Link></li>
                            <li><Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Bảng Giá</Link></li>
                            <li><Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Doanh Nghiệp</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-6">Công Ty</h4>
                        <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                            <li><Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Về Chúng Tôi</Link></li>
                            <li><Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Tuyển Dụng</Link></li>
                            <li><Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Blog</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-6">Pháp Lý</h4>
                        <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                            <li><Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Bảo Mật</Link></li>
                            <li><Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Điều Khoản</Link></li>
                            <li><Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">An Toàn</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-sm text-slate-500 font-medium">&copy; 2030 SmartHire Inc. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <Globe2 className="h-5 w-5 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer" />
                    </div>
                </div>
            </div>
        </footer>
    );
}
