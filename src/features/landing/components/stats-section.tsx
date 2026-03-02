"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Building2, UserCircle, Clock, ArrowUpRight } from "lucide-react";

// CountUp Hook for Number Animation
const useCountUp = (end: number, duration: number = 2) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime: number | null = null;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / (duration * 1000), 1);

            const easeOutExpo = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);

            setCount(Math.floor(end * easeOutExpo));

            if (percentage < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration]);

    return count;
};

interface BentoCardProps {
    value: number;
    suffix: string;
    label: string;
    description: string;
    icon: any;
    colorClass: string;
    bgHoverClass: string;
    textHoverClass: string;
    delay: number;
    className?: string; // For layout grid spanning
}

const BentoCard = ({ value, suffix, label, description, icon: Icon, colorClass, bgHoverClass, textHoverClass, delay, className = "" }: BentoCardProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const count = useCountUp(isInView ? value : 0, 2.5);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
            className={`group relative overflow-hidden bg-white dark:bg-[#1C252E] rounded-2xl border border-[rgba(145,158,171,0.12)] p-6 flex flex-col justify-between transition-all duration-500 hover:shadow-xl hover:-translate-y-1 ${className}`}
        >
            {/* Dark Color Fill on Hover */}
            <div className={`absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0 ${bgHoverClass}`}></div>

            <div className="relative z-10 flex justify-between items-start mb-8">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-[rgba(145,158,171,0.06)] dark:bg-slate-800 border border-[rgba(145,158,171,0.12)] transition-colors duration-500 group-hover:bg-white group-hover:border-white/20`}>
                    <Icon className={`w-6 h-6 transition-colors duration-500 ${colorClass} ${textHoverClass}`} />
                </div>
                <div className={`w-8 h-8 rounded-full bg-[rgba(145,158,171,0.06)] dark:bg-slate-800 flex items-center justify-center transition-all duration-500 group-hover:bg-white group-hover:rotate-45`}>
                    <ArrowUpRight className={`w-4 h-4 text-[#C4CDD5] transition-colors duration-500 ${textHoverClass}`} />
                </div>
            </div>

            <div className="relative z-10">
                <h3 className={`text-4xl lg:text-[4rem] font-black text-[#1C252E] dark:text-white tracking-tight lg:leading-[1.1] mb-2 flex items-baseline gap-1 transition-colors duration-500 ${textHoverClass}`}>
                    {count}
                    <span className={`text-3xl lg:text-4xl ${colorClass.split(' ')[0]} transition-colors duration-500 ${textHoverClass}`}>{suffix}</span>
                </h3>

                <h4 className={`text-lg lg:text-xl font-bold text-[#1C252E] dark:text-white tracking-tight mb-2 transition-colors duration-500 ${textHoverClass}`}>
                    {label}
                </h4>
                <p className={`text-[#637381] dark:text-[#C4CDD5] text-sm lg:text-[15px] font-medium leading-relaxed transition-colors duration-500 group-hover:text-white/80`}>
                    {description}
                </p>
            </div>
        </motion.div>
    );
};



export function StatsSection() {
    return (
        <section className="w-full mt-6 md:mt-12 py-12 relative z-10 rounded-t-[2.5rem] overflow-hidden">
            {/* Large Typography Background Watermark - Scaled down */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-full overflow-hidden pointer-events-none select-none flex justify-center items-center opacity-[0.03] z-0">
                <span className="text-[10rem] xl:text-[14rem] font-black tracking-tighter text-[#1C252E] dark:text-white leading-none whitespace-nowrap">
                    SMARTHIRE
                </span>
            </div>

            <div className="container mx-auto px-4 max-w-7xl relative z-10">

                <div className="mb-10 md:mb-12 max-w-2xl">
                    <span className="text-[#22c55e] font-bold tracking-wider uppercase text-[10px] mb-2 block">
                        Hiệu suất thực tế
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#1C252E] dark:text-white tracking-tight mb-3">
                        Con số biết nói.
                    </h2>
                    <p className="text-lg text-[#637381] dark:text-[#C4CDD5] font-medium">
                        Không chỉ là lời hứa, SmartHire chứng minh hiệu quả qua hàng triệu kết nối thành công và sự hài lòng từ các doanh nghiệp hàng đầu.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {/* Large primary stat spanning 2 columns */}
                    <BentoCard
                        value={1}
                        suffix="M+"
                        label="Kết nối thành công"
                        description="Hơn 1 triệu lượt tương hợp hoàn hảo giữa ứng viên tài năng và doanh nghiệp."
                        icon={Users}
                        colorClass="text-sky-500"
                        bgHoverClass="bg-sky-600"
                        textHoverClass="group-hover:text-white"
                        className="md:col-span-2"
                        delay={0.1}
                    />

                    <BentoCard
                        value={40}
                        suffix="%"
                        label="Tiết kiệm thời gian"
                        description="Tự động hóa AI giúp giảm thiểu đến 40% khối lượng thời gian sàng lọc hồ sơ."
                        icon={Clock}
                        colorClass="text-rose-500"
                        bgHoverClass="bg-rose-600"
                        textHoverClass="group-hover:text-white"
                        delay={0.2}
                    />

                    <BentoCard
                        value={500}
                        suffix="+"
                        label="Doanh nghiệp"
                        description="Được tin dùng bởi hơn 500 nhà tuyển dụng trên toàn quốc."
                        icon={Building2}
                        colorClass="text-emerald-500"
                        bgHoverClass="bg-emerald-600"
                        textHoverClass="group-hover:text-white"
                        delay={0.3}
                    />

                    {/* Wide spanning stat */}
                    <BentoCard
                        value={10}
                        suffix="k+"
                        label="Cập nhật hàng ngày"
                        description="Hàng chục ngàn hồ sơ ứng viên mới được hệ thống AI xử lý và phân loại tự động mỗi ngày."
                        icon={UserCircle}
                        colorClass="text-indigo-500"
                        bgHoverClass="bg-indigo-600"
                        textHoverClass="group-hover:text-white"
                        className="md:col-span-2"
                        delay={0.4}
                    />
                </div>
            </div>
        </section>
    );
}
