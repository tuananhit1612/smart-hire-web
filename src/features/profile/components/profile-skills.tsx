"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Sparkles, Pencil } from "lucide-react";
import { Skill } from "../types/profile";
import { Button } from "@/shared/components/ui/button";
import { ProfileEditSkills } from "./profile-edit-skills";

interface ProfileSkillsProps {
  skills: Skill[];
  onSave?: (skills: Skill[]) => void;
}

export function ProfileSkills({ skills, onSave }: ProfileSkillsProps) {
  const [isEditing, setIsEditing] = React.useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-[#1C252E] rounded-[24px] p-6 sm:p-8 shadow-[0_8px_32px_rgba(145,158,171,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.24)] border border-[rgba(145,158,171,0.12)] dark:border-white/[0.04] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(34,197,94,0.12)] group relative"
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-extrabold text-[#1C252E] dark:text-white">Kỹ năng</h2>
          </div>
          {onSave && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="opacity-0 group-hover:opacity-100 transition-opacity h-9 px-4 rounded-xl border-[rgba(145,158,171,0.32)] dark:border-white/20 text-[#637381] dark:text-[#919EAB] hover:text-[#1C252E] dark:hover:text-white hover:bg-[#F4F6F8] dark:hover:bg-white/5 shadow-sm"
            >
              <Pencil className="h-4 w-4 mr-2" />
              Sửa
            </Button>
          )}
        </div>

        <div className="flex flex-wrap gap-2.5">
          {skills.map((skill, index) => (
            <motion.span
              key={skill.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.03 * index }}
              className={`px-4 py-2 rounded-xl text-[14px] font-bold transition-all border shadow-sm ${skill.level === "Expert"
                ? "bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/20"
                : skill.level === "Advanced"
                  ? "bg-white dark:bg-[#212B36] text-[#1C252E] dark:text-white border-[rgba(145,158,171,0.2)] dark:border-white/10 hover:border-[#22C55E]/30"
                  : skill.level === "Intermediate"
                    ? "bg-transparent text-[#637381] dark:text-[#919EAB] border-[rgba(145,158,171,0.32)] dark:border-white/20 hover:border-[#22C55E]/30 text-[13px]"
                    : "bg-transparent text-[#919EAB] dark:text-[#637381] border-transparent text-[13px]"
                }`}
            >
              {skill.name}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {onSave && (
        <ProfileEditSkills
          open={isEditing}
          onOpenChange={setIsEditing}
          skills={skills}
          onSave={onSave}
        />
      )}
    </>
  );
}


