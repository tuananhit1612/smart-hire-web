"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/shared/components/ui/card";
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
      <Card className="h-full border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <CardTitle className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Experience</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {experiences.map((exp, index) => (
            <div key={exp.id} className="relative pl-6 last:pb-0">
               {/* Timeline Line */}
              {index !== experiences.length - 1 && (
                <div className="absolute left-[11px] top-8 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800" />
              )}
              
              <div className="flex gap-4">
                 {/* Timeline Dot or Logo */}
                 <div className="relative shrink-0 z-10">
                    {exp.logoUrl ? (
                        <div className="h-6 w-6 rounded flex items-center justify-center bg-white border border-zinc-200 overflow-hidden">
                             <Image src={exp.logoUrl} alt={exp.company} width={24} height={24} className="object-contain" />
                        </div>
                    ) : (
                        <div className="h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900/30 border-2 border-white dark:border-zinc-900 ring-1 ring-blue-600/20 flex items-center justify-center">
                            <div className="h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400" />
                        </div>
                    )}
                 </div>

                 <div className="flex-1 space-y-1 -mt-1">
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                        <h4 className="font-semibold text-zinc-900 dark:text-zinc-50">{exp.role}</h4>
                        <span className="text-sm text-zinc-500 font-medium tabular-nums">
                            {exp.startDate} - {exp.endDate || "Present"}
                        </span>
                    </div>
                    <div className="text-sm font-medium text-blue-600 dark:text-blue-400">{exp.company}</div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed pt-1">
                        {exp.description}
                    </p>
                 </div>
              </div>
            </div>
          ))}

          {experiences.length === 0 && (
              <p className="text-zinc-500 text-sm italic">No experience listed yet.</p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
