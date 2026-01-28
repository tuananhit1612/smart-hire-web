"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/shared/components/ui/card";
import { Skill } from "../types/profile";
import { cn } from "@/lib/utils";

interface ProfileSkillsProps {
  skills: Skill[];
}

export function ProfileSkills({ skills }: ProfileSkillsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card className="h-full border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm shadow-sm">
        <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <CardTitle className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Skills</CardTitle>
            </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className={cn(
                    "px-3 py-1 rounded-full text-sm font-medium border transition-colors cursor-default",
                    skill.level === "Expert" ? "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800" :
                    skill.level === "Advanced" ? "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-300 dark:border-indigo-800" :
                    "bg-zinc-50 text-zinc-700 border-zinc-200 dark:bg-zinc-800/50 dark:text-zinc-300 dark:border-zinc-700"
                )}
                title={skill.level}
              >
                {skill.name}
              </div>
            ))}
            
             {skills.length === 0 && (
              <p className="text-zinc-500 text-sm italic">No skills listed yet.</p>
          )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
