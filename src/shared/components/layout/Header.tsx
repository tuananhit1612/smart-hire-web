"use client";

import { useState } from "react";
import Link from "next/link";
import { Layers } from "lucide-react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Button } from "@/shared/components/ui/button";

export function Header() {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        // Show header when scrolling up, hide when scrolling down
        if (latest < lastScrollY || latest < 100) {
            setIsVisible(true);
        } else if (latest > lastScrollY && latest > 100) {
            setIsVisible(false);
        }
        setLastScrollY(latest);
    });

    return (
        <motion.header 
            className="fixed top-4 inset-x-0 mx-auto w-full max-w-7xl z-40 px-4 md:px-6"
            initial={{ y: 0, opacity: 1 }}
            animate={{ 
                y: isVisible ? 0 : -100, 
                opacity: isVisible ? 1 : 0 
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        >
            <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/20 dark:border-slate-800 shadow-sm rounded-full h-16 px-6 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2.5 cursor-pointer group">
                    <div className="bg-gradient-to-tr from-blue-600 to-sky-500 h-9 w-9 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-200">
                        <Layers className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-lg font-bold tracking-tight text-slate-800 dark:text-white font-sans">SmartHire</span>
                </Link>
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
                    {[
                        { label: 'Sản Phẩm', href: '#' },
                        { label: 'Giải Pháp', href: '#' },
                        { label: 'Doanh Nghiệp', href: '#' },
                        { label: 'Bảng Giá', href: '#' }
                    ].map((item) => (
                        <Link key={item.label} href={item.href} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            {item.label}
                        </Link>
                    ))}
                </div>
                <div className="flex items-center gap-4">
                    <Link href="/login" className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors">
                        Đăng Nhập
                    </Link>
                    <Link href="/register">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 h-10 px-6 rounded-full transition-all hover:scale-105">
                            Bắt Đầu Ngay
                        </Button>
                    </Link>
                </div>
            </div>
        </motion.header>
    );
}
