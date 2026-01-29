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
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="glass-card p-4 sm:p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-secondary/10">
            <GraduationCap className="h-5 w-5 text-secondary" />
          </div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Education
          </h2>
        </div>
        
        <div className="space-y-6">
          {educations.map((edu, index) => (
            <motion.div 
              key={edu.id} 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className="relative pl-8"
            >
              {/* Timeline Line */}
              {index !== educations.length - 1 && (
                <div className="absolute left-[11px] top-8 bottom-0 w-px bg-gradient-to-b from-secondary/40 to-border/30" />
              )}
              
              <div className="flex gap-4">
                {/* Timeline Dot */}
                <div className="relative shrink-0 z-10 mt-1.5">
                  <div className="h-3 w-3 rounded-full bg-secondary/30 ring-2 ring-card shadow-[0_0_6px_rgba(99,102,241,0.3)]">
                    <div className="absolute inset-1 rounded-full bg-secondary" />
                  </div>
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <h4 className="font-semibold text-foreground">{edu.school}</h4>
                    <span className="text-xs text-muted-foreground font-medium tabular-nums uppercase tracking-wider">
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    {edu.degree}, {edu.fieldOfStudy}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {educations.length === 0 && (
            <p className="text-muted-foreground text-sm italic">No education listed yet.</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

