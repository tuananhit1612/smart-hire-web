"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/shared/components/ui/card";
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
      <Card className="h-full border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <CardTitle className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Education</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {educations.map((edu, index) => (
             <div key={edu.id} className="relative pl-6 last:pb-0">
               {index !== educations.length - 1 && (
                 <div className="absolute left-[11px] top-8 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800" />
               )}
               
               <div className="flex gap-4">
                  <div className="relative shrink-0 z-10 mt-1">
                     <div className="h-2 w-2 rounded-full bg-zinc-300 dark:bg-zinc-600 ring-4 ring-white dark:ring-zinc-900" />
                  </div>
 
                  <div className="flex-1 space-y-1">
                     <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                         <h4 className="font-semibold text-zinc-900 dark:text-zinc-50">{edu.school}</h4>
                         <span className="text-sm text-zinc-500 font-medium tabular-nums">
                             {edu.startDate} - {edu.endDate}
                         </span>
                     </div>
                     <div className="text-sm text-zinc-700 dark:text-zinc-300 font-medium">
                         {edu.degree}, {edu.fieldOfStudy}
                     </div>
                  </div>
               </div>
             </div>
          ))}

          {educations.length === 0 && (
              <p className="text-zinc-500 text-sm italic">No education listed yet.</p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
