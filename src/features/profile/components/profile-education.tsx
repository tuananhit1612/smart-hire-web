"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { Education } from "../types/profile";

interface ProfileEducationProps {
  educations: Education[];
}

export function ProfileEducation({ educations }: ProfileEducationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-card p-4 sm:p-6 md:p-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-secondary/10">
          <GraduationCap className="h-5 w-5 text-secondary" />
        </div>
        <h2 className="text-xl font-semibold text-foreground">Education</h2>
      </div>

      <div className="space-y-6">
        {educations.map((edu, index) => (
          <motion.div
            key={edu.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
            className="relative pl-6 border-l-2 border-secondary/30"
          >
            {/* Timeline Dot */}
            <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-secondary shadow-[0_0_10px_rgba(99,102,241,0.5)]" />

            <div>
              <h3 className="text-lg font-semibold text-foreground">{edu.degree}</h3>
              <p className="text-secondary font-medium">{edu.school}</p>
              <p className="text-muted-foreground">{edu.fieldOfStudy}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {edu.startDate} — {edu.endDate}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
