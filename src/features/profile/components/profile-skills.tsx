"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Skill } from "../types/profile";

interface ProfileSkillsProps {
  skills: Skill[];
}

export function ProfileSkills({ skills }: ProfileSkillsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-card p-4 sm:p-6 md:p-8"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-xl bg-primary/10">
          <Sparkles className="h-5 w-5 text-primary" />
        </div>
        <h2 className="text-xl font-semibold text-foreground">Skills</h2>
      </div>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <motion.span
            key={skill.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.05 * index }}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              skill.level === "Expert"
                ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg"
                : skill.level === "Advanced"
                ? "bg-primary text-white"
                : skill.level === "Intermediate"
                ? "bg-secondary/20 text-secondary border border-secondary/30"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {skill.name}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
