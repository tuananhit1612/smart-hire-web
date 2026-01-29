"use client";

import { motion } from "framer-motion";
import { UserCircle } from "lucide-react";

interface ProfileAboutProps {
  about: string;
}

export function ProfileAbout({ about }: ProfileAboutProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="glass-card p-4 sm:p-6 md:p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-primary/10">
            <UserCircle className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            About Me
          </h2>
        </div>
        <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
          {about}
        </p>
      </div>
    </motion.div>
  );
}

