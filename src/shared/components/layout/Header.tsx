"use client";

import { useState } from "react";
import Link from "next/link";
import { Layers } from "lucide-react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Button } from "@/shared/components/ui/button";
import { NotificationBell } from "@/shared/components/layout/NotificationBell";

export function Header() {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        // Only show header when at the very top of the page
        if (latest < 50) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
        setLastScrollY(latest);
    });

    const headerVariants = {
        visible: { y: 0, opacity: 1 },
        hidden: { y: -100, opacity: 0 },
    };

    return (
        <motion.header
            className="fixed top-4 inset-x-0 mx-auto w-full max-w-7xl z-40 px-4 md:px-6"
            variants={headerVariants}
            initial="visible"
            animate={isVisible ? "visible" : "hidden"}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        >
            <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-sm rounded-full h-16 px-6 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2.5 cursor-pointer group">
                    <div className="bg-gradient-to-tr from-blue-600 to-sky-500 h-9 w-9 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-200">
                        <Layers className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-lg font-bold tracking-tight text-sky-900 font-sans">SmartHire</span>
                </Link>
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-sky-700">
                    {[
                        { label: 'Sản Phẩm', href: '#' },
                        { label: 'Giải Pháp', href: '#' },
                        { label: 'Doanh Nghiệp', href: '#' },
                        { label: 'Bảng Giá', href: '#' }
                    ].map((item) => (
                        <Link key={item.label} href={item.href} className="hover:text-sky-500 transition-colors">
                            {item.label}
                        </Link>
                    ))}
                </div>
                <div className="flex items-center gap-3">
                    <NotificationBell />
                    <Link href="/login" className="text-sm font-bold text-sky-700 hover:text-sky-500 transition-colors">
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
