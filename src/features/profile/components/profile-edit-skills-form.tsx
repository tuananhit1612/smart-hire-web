"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Sparkles } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Skill } from "../types/profile";

interface ProfileEditSkillsFormProps {
  skills: Skill[];
  onChange: (newSkills: Skill[]) => void;
}

const SKILL_LEVELS = ["Beginner", "Intermediate", "Advanced", "Expert"] as const;

export function ProfileEditSkillsForm({
  skills,
  onChange,
}: ProfileEditSkillsFormProps) {
  const [newSkillName, setNewSkillName] = React.useState("");
  const [newSkillLevel, setNewSkillLevel] = React.useState<Skill["proficiencyLevel"]>("Intermediate");

  const handleAddSkill = () => {
    if (!newSkillName.trim()) return;

    const newSkill: Skill = {
      id: `new-${Date.now()}`,
      skillName: newSkillName.trim(),
      proficiencyLevel: newSkillLevel,
    };

    onChange([...skills, newSkill]);
    setNewSkillName("");
  };

  const handleRemoveSkill = (id: string) => {
    onChange(skills.filter((s) => s.id !== id));
  };

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
      {/* Add New Skill */}
      <div className="p-4 rounded-xl bg-muted/40 border border-border/50 space-y-4">
        <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
          <Plus className="h-4 w-4 text-primary" />
          Thêm kỹ năng mới
        </h4>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            placeholder="VD: React, Python, Quản lý..."
            value={newSkillName}
            onChange={(e) => setNewSkillName(e.target.value)}
            className="flex-1"
            onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
          />
          <div className="flex gap-1 p-1 bg-background rounded-lg border border-border">
            {SKILL_LEVELS.map((level) => (
              <button
                key={level}
                onClick={() => setNewSkillLevel(level)}
                className={`px-3 py-1.5 text-xs rounded-md transition-all ${
                  newSkillLevel === level
                    ? level === "Expert"
                      ? "bg-gradient-to-r from-[#22c55e] via-purple-500 to-pink-500 text-white shadow-md"
                      : "bg-primary text-white shadow-sm"
                    : "hover:bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {level === "Beginner" ? "Cơ bản" : level === "Intermediate" ? "Trung bình" : level === "Advanced" ? "Nâng cao" : "Chuyên gia"}
              </button>
            ))}
          </div>
          <Button onClick={handleAddSkill} disabled={!newSkillName.trim()}>
            Thêm
          </Button>
        </div>
      </div>

      {/* Skills List */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-muted-foreground">Kỹ năng hiện tại ({skills.length})</h4>
        <div className="flex flex-wrap gap-2 min-h-[100px] p-4 rounded-xl bg-background/50 border border-border/50">
          <AnimatePresence mode="popLayout">
            {skills.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full flex flex-col items-center justify-center text-muted-foreground py-8"
              >
                <Sparkles className="h-8 w-8 mb-2 opacity-20" />
                <p className="text-sm">Chưa có kỹ năng nào.</p>
              </motion.div>
            )}
            {skills.map((skill) => (
              <motion.div
                key={skill.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className={`group flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-full border text-sm transition-all ${
                  skill.proficiencyLevel === "Expert"
                    ? "border-purple-500/30 bg-purple-500/10 text-purple-200"
                    : "border-border bg-card text-foreground"
                }`}
              >
                <span className="font-medium">{skill.skillName}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    skill.proficiencyLevel === "Expert" ? "bg-purple-500/20 text-purple-300" : "bg-muted text-muted-foreground"
                }`}>
                  {skill.proficiencyLevel === "Beginner" ? "Cơ bản" : skill.proficiencyLevel === "Intermediate" ? "Trung bình" : skill.proficiencyLevel === "Advanced" ? "Nâng cao" : "Chuyên gia"}
                </span>
                <button
                  onClick={() => handleRemoveSkill(skill.id)}
                  className="p-0.5 rounded-full hover:bg-red-500/20 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                >
                  <X className="h-3 w-3" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

