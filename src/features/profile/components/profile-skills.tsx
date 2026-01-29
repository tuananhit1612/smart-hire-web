"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
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
      <div className="glass-card p-4 sm:p-6 md:p-8">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 rounded-xl bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Skills
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.05 * index }}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-300 cursor-default",
                skill.level === "Expert" 
                  ? "bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 text-primary border-primary/30 hover:shadow-[0_0_12px_rgba(79,70,229,0.3)]" 
                  : skill.level === "Advanced" 
                    ? "bg-secondary/10 text-secondary border-secondary/30 hover:shadow-[0_0_10px_rgba(99,102,241,0.2)]" 
                    : "bg-muted text-muted-foreground border-border/50"
              )}
              title={skill.level}
            >
              {skill.name}
            </motion.div>
          ))}
          
          {skills.length === 0 && (
            <p className="text-muted-foreground text-sm italic">No skills listed yet.</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

