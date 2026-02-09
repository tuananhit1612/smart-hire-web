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
        color: 'from-sky-500 to-blue-600',
        bgColor: 'bg-sky-100 dark:bg-sky-900/50',
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
        bgColor: 'bg-green-100 dark:bg-green-900/50',
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
              bg-white/60 dark:bg-sky-950/40
              backdrop-blur-xl
              border border-white/20 dark:border-sky-800/30
              rounded-2xl p-5
              hover:shadow-xl hover:shadow-sky-500/10
              transition-shadow duration-300
              group
            "
                    >
                        {/* Hover Gradient */}
                        <motion.div
                            className={`
                absolute inset-0 opacity-0 group-hover:opacity-10
                bg-gradient-to-br ${feature.color}
                transition-opacity duration-300
              `}
                        />

                        <div className="relative z-10">
                            {/* Icon */}
                            <div className={`inline-flex p-3 rounded-xl ${feature.bgColor} mb-4`}>
                                <feature.icon className="w-6 h-6 text-sky-600 dark:text-sky-400" />
                            </div>

                            {/* Text */}
                            <h4 className="text-sm font-semibold text-sky-900 dark:text-sky-100 mb-1">
                                {feature.title}
                            </h4>
                            <p className="text-xs text-sky-600/70 dark:text-sky-400/70">
                                {feature.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
