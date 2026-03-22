"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Pencil } from "lucide-react";
import { Education } from "../types/profile";
import { Button } from "@/shared/components/ui/button";
import { ProfileEditEducation } from "./profile-edit-education";

interface ProfileEducationProps {
  educations: Education[];
  onSave?: (educations: Education[]) => void;
}

export function ProfileEducation({ educations, onSave }: ProfileEducationProps) {
  const [isEditing, setIsEditing] = React.useState(false);

  return (
    <>
      <div className="bg-white dark:bg-[#1C252E] rounded-[24px] p-6 sm:p-8 shadow-[0_8px_32px_rgba(145,158,171,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.24)] border border-[rgba(145,158,171,0.12)] dark:border-white/[0.04] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(59,130,246,0.12)] group relative">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#22c55e]/10 flex items-center justify-center text-[#22c55e] group-hover:scale-110 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-extrabold text-[#1C252E] dark:text-white">Học vấn</h2>
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

        <div className="space-y-8">
          {educations.map((edu, index) => (
            <div key={edu.id} className="relative pl-6 sm:pl-8 border-l-2 border-[rgba(145,158,171,0.2)] dark:border-white/10 last:border-transparent pb-2 mt-2">
              <span className="absolute -left-[6px] top-1.5 h-3 w-3 rounded-full bg-[#22c55e] border-2 border-white dark:border-[#1C252E] shadow-[0_0_10px_rgba(59,130,246,0.4)]" />

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * index }}
                className="space-y-2"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-[#1C252E] dark:text-white">{edu.school}</h3>
                    <p className="text-[15px] font-bold text-[#22c55e] mt-0.5">{edu.degree}</p>
                  </div>
                  <div className="text-[13px] font-semibold tracking-wide text-[#919EAB] dark:text-[#637381] shrink-0 mt-1 sm:mt-0 uppercase">
                    {edu.startDate} — {edu.endDate || "Hiện tại"}
                  </div>
                </div>

                <div className="text-[15px] text-[#637381] dark:text-[#919EAB] font-medium pt-1">
                  Chuyên ngành: <span className="text-[#1C252E] dark:text-[#DFE3E8] font-semibold">{edu.fieldOfStudy}</span>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {onSave && (
        <ProfileEditEducation
          open={isEditing}
          onOpenChange={setIsEditing}
          educations={educations}
          onSave={onSave}
        />
      )}
    </>
  );
}


