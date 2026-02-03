import { Language } from "../types/profile";
import { Languages } from "lucide-react";

interface ProfileLanguagesProps {
  languages: Language[];
}

export function ProfileLanguages({ languages }: ProfileLanguagesProps) {
  if (!languages || languages.length === 0) return null;

  return (
    <div className="glass-card p-6 space-y-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="h-8 w-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-500">
          <Languages className="h-4 w-4" />
        </div>
        <h2 className="text-lg font-bold">Ngôn ngữ</h2>
      </div>

      <div className="grid grid-cols-1 gap-2">
        {languages.map((lang) => (
          <div 
            key={lang.id} 
            className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/50"
          >
            <span className="font-medium text-sm">{lang.language}</span>
            <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                {lang.proficiency}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
