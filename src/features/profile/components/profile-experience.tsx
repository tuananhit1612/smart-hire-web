"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, Pencil } from "lucide-react";
import { Experience } from "../types/profile";
import { Button } from "@/shared/components/ui/button";
import { ProfileEditExperience } from "./profile-edit-experience";

interface ProfileExperienceProps {
  experiences: Experience[];
  onSave?: (experiences: Experience[]) => void;
}

export function ProfileExperience({ experiences, onSave }: ProfileExperienceProps) {
  const [isEditing, setIsEditing] = React.useState(false);

  return (
    <>
      <div className="glass-card p-4 sm:p-6 md:p-8 relative group">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10">
              <Briefcase className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">Kinh nghiệm</h2>
          </div>
          {onSave && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Pencil className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="space-y-8 pl-2">
          {experiences.map((exp, index) => (
            <div key={exp.id} className="relative pl-6 sm:pl-8 border-l border-primary/20 last:border-0 pb-1">
              <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-primary glow-primary" />
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="space-y-2"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <h3 className="text-lg font-medium text-foreground">{exp.role}</h3>
                  <span className="hidden sm:inline text-muted-foreground">•</span>
                  <span className="text-primary font-medium">{exp.company}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{exp.startDate} - {exp.endDate || "Present"}</span>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed pt-1">
                  {exp.description}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {onSave && (
        <ProfileEditExperience
          open={isEditing}
          onOpenChange={setIsEditing}
          experiences={experiences}
          onSave={onSave}
        />
      )}
    </>
  );
}
