"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { Experience } from "../types/profile";
import Image from "next/image";

interface ProfileExperienceProps {
  experiences: Experience[];
}

export function ProfileExperience({ experiences }: ProfileExperienceProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="glass-card p-4 sm:p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-primary/10">
            <Briefcase className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Experience
          </h2>
        </div>
        
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <motion.div 
              key={exp.id} 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className="relative pl-8"
            >
              {/* Timeline Line with Gradient */}
              {index !== experiences.length - 1 && (
                <div className="absolute left-[11px] top-10 bottom-0 w-px bg-gradient-to-b from-primary/40 to-border/30" />
              )}
              
              <div className="flex gap-4">
                {/* Glowing Timeline Dot */}
                <div className="relative shrink-0 z-10">
                  {exp.logoUrl ? (
                    <div className="h-6 w-6 rounded-lg flex items-center justify-center bg-card border border-border overflow-hidden shadow-sm">
                      <Image src={exp.logoUrl} alt={exp.company} width={24} height={24} className="object-contain" />
                    </div>
                  ) : (
                    <div className="h-6 w-6 rounded-full bg-primary/20 border-2 border-card ring-2 ring-primary/30 flex items-center justify-center shadow-[0_0_8px_rgba(79,70,229,0.3)]">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-1.5 -mt-1">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <h4 className="font-semibold text-foreground">{exp.role}</h4>
                    <span className="text-xs text-muted-foreground font-medium tabular-nums uppercase tracking-wider">
                      {exp.startDate} - {exp.endDate || "Present"}
                    </span>
                  </div>
                  <div className="text-sm font-medium text-primary">{exp.company}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed pt-1">
                    {exp.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}

          {experiences.length === 0 && (
            <p className="text-muted-foreground text-sm italic">No experience listed yet.</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

