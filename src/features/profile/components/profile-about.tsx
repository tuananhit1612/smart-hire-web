"use client";

import { motion } from "framer-motion";
import { User } from "lucide-react";

interface ProfileAboutProps {
  about: string;
}

export function ProfileAbout({ about }: ProfileAboutProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white dark:bg-[#1C252E] rounded-[24px] p-6 sm:p-8 shadow-[0_8px_32px_rgba(145,158,171,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.24)] border border-[rgba(145,158,171,0.12)] dark:border-white/[0.04] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(34,197,94,0.12)] group"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#22C55E] to-[#10B981] flex items-center justify-center text-white shadow-[#22C55E]/20 shadow-lg group-hover:scale-110 transition-transform">
          <User className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-extrabold text-[#1C252E] dark:text-white">Giới thiệu</h2>
      </div>
      <p className="text-[#637381] dark:text-[#919EAB] leading-relaxed text-[15px] group-hover:text-[#1C252E] dark:group-hover:text-[#DFE3E8] transition-colors duration-300">
        {about}
      </p>
    </motion.div>
  );
}


