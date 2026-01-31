"use client";

import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowRight, Search, Zap, UserCheck, Briefcase, Layers, BarChart3, Globe2 } from "lucide-react";
import { useRef, useState } from "react";

// --- Components for the Modern Professional Blue Design ---

const ProfessionalBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-white">
      <div className="absolute top-0 inset-x-0 h-[600px] bg-gradient-to-b from-blue-50/50 to-transparent" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-multiply" />
    </div>
  );
};

const HoverButton = ({ children, className, variant = "primary", ...props }: any) => {
  return (
    <button
      className={`relative inline-flex items-center justify-center h-12 px-6 rounded-full font-semibold tracking-tight transition-all duration-200 active:scale-95 ${variant === "primary"
        ? "bg-blue-600 text-white shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:bg-blue-700 hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)]"
        : "bg-white text-sky-700 border border-sky-200 hover:bg-sky-50 hover:text-sky-900"
        } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

interface FeatureCardProps {
  icon: any;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard = ({ icon: Icon, title, description, delay }: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group p-8 rounded-2xl bg-white/60 border border-sky-100 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 hover:border-blue-200 transition-all"
    >
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mb-3 text-lg font-bold text-sky-900">{title}</h3>
      <p className="text-sky-700 leading-relaxed text-base">
        {description}
      </p>
    </motion.div>
  );
};

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative min-h-screen font-inter overflow-x-hidden text-foreground selection:bg-sky-100 selection:text-sky-900">
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-blue-600 origin-left z-50"
        style={{ scaleX }}
      />

      <ProfessionalBackground />

      {/* Modern Header */}
      {/* Header handled by RootLayout */}

      <main className="flex flex-col items-center w-full relative">
        {/* Hero Section */}
        <section className="relative w-full pt-40 pb-24 lg:pt-48 lg:pb-32 z-10">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-sky-100 bg-white/50 backdrop-blur-sm text-sky-700 text-sm font-medium mb-8 shadow-sm">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </span>
                AI Kết Nối 2.0 Đã Tích Hợp
              </div>

              <h1 className="mb-6 text-5xl md:text-7xl font-bold tracking-tight text-sky-900 leading-[1.1] drop-shadow-sm">
                Tuyển dụng <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-green-500">
                  Dễ dàng & Nhân văn.
                </span>
              </h1>

              <p className="mx-auto mb-10 max-w-2xl text-xl text-sky-700 leading-relaxed font-medium">
                Nền tảng AI thân thiện thấu hiểu con người, không chỉ từ khóa.
                Tìm kiếm ứng viên hoàn hảo cho doanh nghiệp của bạn chỉ trong vài phút.
              </p>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/cv-templates">
                  <HoverButton variant="primary" className="min-w-[180px] rounded-full bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-500 hover:to-sky-400 border-0 shadow-lg shadow-sky-500/25">
                    Tạo CV Ngay
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </HoverButton>
                </Link>
                <Link href="/post-job" className="group">
                  <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-sky-900/30 border border-sky-100 dark:border-sky-800 text-sky-700 dark:text-sky-300 font-semibold hover:bg-sky-50 dark:hover:bg-sky-900/50 transition-all">
                    <Zap className="h-4 w-4 text-green-500 group-hover:scale-110 transition-transform" />
                    Tìm kiếm Việc làm
                  </div>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Strip */}
        <section className="w-full border-y border-border bg-white/60 dark:bg-sky-950/30 backdrop-blur-sm py-12 z-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-between items-center gap-8 px-4 md:px-12 text-center md:text-left">
              {[
                { label: "Kết nối Thành công", value: "1M+", color: "text-green-500" },
                { label: "Doanh nghiệp Hài lòng", value: "500+", color: "text-sky-500" },
                { label: "Hồ sơ Ứng viên", value: "10k+", color: "text-sky-600" },
                { label: "Tiết kiệm Thời gian", value: "40%", color: "text-green-600" },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className={`text-4xl font-extrabold ${stat.color} mb-1`}>{stat.value}</span>
                  <span className="text-sm font-semibold text-sky-600 dark:text-sky-300 uppercase tracking-wider">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="container mx-auto py-24 px-4 md:px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-sky-900 dark:text-white mb-4">Tính năng Chuẩn Doanh nghiệp</h2>
            <p className="text-sky-700 dark:text-sky-200 text-lg">
              Mọi thứ bạn cần để xây dựng và quản lý đội ngũ nhân sự một cách chính xác.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={Search}
              title="Tìm kiếm Thông minh"
              description="Bộ lọc nâng cao và tìm kiếm ngữ nghĩa giúp bạn tìm đúng kỹ năng cần thiết trong vài giây."
              delay={0.1}
            />
            <FeatureCard
              icon={UserCheck}
              title="Hồ sơ Đã xác thực"
              description="Kiểm tra lý lịch tự động và đánh giá kỹ năng chuyên môn để đảm bảo chất lượng ứng viên."
              delay={0.2}
            />
            <FeatureCard
              icon={BarChart3}
              title="Phân tích & Báo cáo"
              description="Thông tin chi tiết thời gian thực về quy trình tuyển dụng và xu hướng thị trường lao động."
              delay={0.3}
            />
          </div>
        </section>
      </main>

      {/* Footer handled by RootLayout */}
    </div>
  );
}
