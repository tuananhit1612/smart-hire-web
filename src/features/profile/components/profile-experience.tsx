"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { Experience } from "../types/profile";

interface ProfileExperienceProps {
  experiences: Experience[];
}

export function ProfileExperience({ experiences }: ProfileExperienceProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="glass-card p-4 sm:p-6 md:p-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-primary/10">
          <Briefcase className="h-5 w-5 text-primary" />
        </div>
        <h2 className="text-xl font-semibold text-foreground">Experience</h2>
      </div>

      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
            className="relative pl-6 border-l-2 border-primary/30"
          >
            {/* Timeline Dot */}
            <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary glow-primary" />

            <div>
              <h3 className="text-lg font-semibold text-foreground">{exp.role}</h3>
              <p className="text-primary font-medium">{exp.company}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {exp.startDate} — {exp.endDate || "Present"}
              </p>
              <p className="text-muted-foreground mt-2 leading-relaxed">
                {exp.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
