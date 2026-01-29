"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Languages } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Language } from "../types/profile";

interface ProfileEditLanguagesFormProps {
  languages: Language[];
  onChange: (languages: Language[]) => void;
}

const PROFICIENCY_LEVELS = ["Native", "Fluent", "Intermediate", "Basic"] as const;

export function ProfileEditLanguagesForm({
  languages,
  onChange,
}: ProfileEditLanguagesFormProps) {

  const [newLangName, setNewLangName] = React.useState("");
  const [newLangProficiency, setNewLangProficiency] = React.useState<Language["proficiency"]>("Intermediate");

  const addLanguage = () => {
    if (!newLangName.trim()) return;
    
    // Check duplicate
    if (languages.some(l => l.language.toLowerCase() === newLangName.trim().toLowerCase())) {
        return; 
    }

    const newLanguage: Language = {
      id: `lang-${Date.now()}`,
      language: newLangName.trim(),
      proficiency: newLangProficiency,
    };
    
    onChange([...languages, newLanguage]);
    setNewLangName("");
    setNewLangProficiency("Intermediate");
  };

  const removeLanguage = (id: string) => {
    onChange(languages.filter((l) => l.id !== id));
  };

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
       {/* Add Language */}
       <div className="p-4 rounded-xl bg-muted/40 border border-border/50 space-y-4">
        <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
          <Plus className="h-4 w-4 text-primary" />
          Thêm ngôn ngữ
        </h4>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            placeholder="VD: Tiếng Anh, Tiếng Việt..."
            value={newLangName}
            onChange={(e) => setNewLangName(e.target.value)}
            className="flex-1"
            onKeyDown={(e) => e.key === "Enter" && addLanguage()}
          />
          <select 
            className="h-10 rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            value={newLangProficiency}
            onChange={(e) => setNewLangProficiency(e.target.value as any)}
          >
            {PROFICIENCY_LEVELS.map(level => (
                <option key={level} value={level}>{level === "Native" ? "Bản ngữ" : level === "Fluent" ? "Thành thạo" : level === "Intermediate" ? "Trung bình" : "Cơ bản"}</option>
            ))}
          </select>
          <Button onClick={addLanguage} disabled={!newLangName.trim()}>
            Thêm
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <AnimatePresence mode="popLayout">
          {languages.map((lang) => (
            <motion.div
              key={lang.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              layout
              className="flex items-center justify-between p-3 rounded-xl border border-border/50 bg-card hover:bg-muted/50 transition-colors"
            >
              <div>
                <p className="font-medium text-sm">{lang.language}</p>
                <p className="text-xs text-muted-foreground">{lang.proficiency === "Native" ? "Bản ngữ" : lang.proficiency === "Fluent" ? "Thành thạo" : lang.proficiency === "Intermediate" ? "Trung bình" : "Cơ bản"}</p>
              </div>
              <button
                onClick={() => removeLanguage(lang.id)}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

       {languages.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Languages className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">Chưa có ngôn ngữ nào</p>
        </div>
      )}
    </div>
  );
}
