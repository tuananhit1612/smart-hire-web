'use client';

import { motion } from 'framer-motion';
import {
    SparklesIcon,
    DocumentMagnifyingGlassIcon,
    ShieldCheckIcon,
    ClockIcon,
} from '@heroicons/react/24/outline';

const features = [
    {
        icon: DocumentMagnifyingGlassIcon,
        title: 'AI Phân tích thông minh',
        description: 'Trích xuất tự động thông tin từ CV của bạn',
        color: 'from-green-500 to-emerald-600',
        bgColor: 'bg-green-500/10 dark:bg-green-500/20',
    },
    {
        icon: SparklesIcon,
        title: 'Gợi ý cải thiện',
        description: 'AI đề xuất cách tối ưu hóa CV',
        color: 'from-purple-500 to-pink-600',
        bgColor: 'bg-purple-100 dark:bg-purple-900/50',
    },
    {
        icon: ShieldCheckIcon,
        title: 'Bảo mật cao',
        description: 'Dữ liệu của bạn được mã hóa an toàn',
        color: 'from-green-500 to-emerald-600',
        bgColor: 'bg-green-500/10 dark:bg-green-500/20',
    },
    {
        icon: ClockIcon,
        title: 'Xử lý nhanh chóng',
        description: 'Kết quả phân tích chỉ trong vài giây',
        color: 'from-orange-500 to-amber-600',
        bgColor: 'bg-orange-100 dark:bg-orange-900/50',
    },
];

export function FeatureCards() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10"
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {features.map((feature, index) => (
                    <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 * index }}
                        whileHover={{ scale: 1.03, y: -5 }}
                        className="
              relative overflow-hidden
              bg-white dark:bg-[rgba(20,26,33,0.6)] border border-[rgba(145,158,171,0.12)] dark:border-[rgba(145,158,171,0.12)]
              backdrop-blur-xl
              
              rounded-2xl p-5
              hover:shadow-xl hover:border-[rgba(145,158,171,0.32)] dark:hover:border-[rgba(145,158,171,0.32)]
              transition-shadow duration-300
              group
            "
                    >
                        {/* Hover Gradient */}
                        <motion.div
                            className={`
                absolute inset-0 opacity-0 group-hover:opacity-10
                bg-[rgba(145,158,171,0.04)] dark:bg-[rgba(145,158,171,0.08)]
                transition-opacity duration-300
              `}
                        />

                        <div className="relative z-10">
                            {/* Icon */}
                            <div className={`inline-flex p-3 rounded-xl ${feature.bgColor} mb-4`}>
                                <feature.icon className="w-6 h-6 text-[#22c55e]" />
                            </div>

                            {/* Text */}
                            <h4 className="text-sm font-semibold text-[#1C252E] dark:text-white mb-1">
                                {feature.title}
                            </h4>
                            <p className="text-xs text-[#637381] dark:text-[#919EAB]">
                                {feature.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
