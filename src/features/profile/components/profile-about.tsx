"use client";

import { motion } from "framer-motion";
import { UserCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/shared/components/ui/card";

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
      <Card className="h-full border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <UserCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <CardTitle className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">About Me</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap">
            {about}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
